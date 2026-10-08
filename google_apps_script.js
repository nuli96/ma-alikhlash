/**
 * =========================================================================
 * SIMADRASAH - GOOGLE APPS SCRIPT DATABASE ENDPOINT
 * MADRASAH ALIYAH AL-IKHLASH (SINDANGSARI, CIKAUM, KABUPATEN SUBANG)
 * Arsitektur & Penulis/Pembuat Web: <nmcode/>
 * =========================================================================
 * 
 * PETUNJUK PEMASANGAN DALAM 3 MENIT:
 * 1. Buat Google Spreadsheet baru di Google Drive madrasah (https://sheets.new)
 *    Beri judul spreadsheet: "SIMADRASAH_AL_IKHLASH_DATABASE"
 * 2. Klik menu "Ekstensi" (Extensions) > "Apps Script".
 * 3. Hapus semua kode default di Apps Script, lalu TEMPEL (PASTE) seluruh kode berkas ini.
 * 4. Klik tombol "Simpan" (ikon disket) di atas.
 * 5. Klik tombol biru "Terapkan" (Deploy) > "Deployment baru" (New deployment).
 *    - Pilih Jenis: "Aplikasi Web" (Web App)
 *    - Deskripsi: "SIMADRASAH API v1"
 *    - Jalankan sebagai (Execute as): "Saya" (Me / Akun Google Madrasah)
 *    - Yang memiliki akses (Who has access): "Siapa saja" (Anyone) -> PENTING!
 * 6. Klik "Deploy", izinkan akses akun Google (Review permissions > Lanjutkan/Advanced > Izinkan).
 * 7. Salin URL Aplikasi Web (Web App URL) yang berakhiran "/exec".
 * 8. Tempelkan URL tersebut ke Panel Operator SIMADRASAH > Tab "Sinkronisasi Google Sheets & Backup".
 * =========================================================================
 */

// Tes Kesiapan Endpoint melalui Browser (GET)
function doGet(e) {
  var response = {
    status: "success",
    madrasah: "MADRASAH ALIYAH AL-IKHLASH",
    alamat: "KP KRAJAN TENGAH RT/RW 12/03 DESA SINDANGSARI KECAMATAN CIKAUM KABUPATEN SUBANG",
    penulis: "<nmcode/>",
    message: "Endpoint API SIMADRASAH Cloud Google Sheets Aktif & Siap Menerima Data!",
    timestamp: new Date().toISOString()
  };
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// Menerima Pengiriman Data dari Website SIMADRASAH (POST)
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return responseJson({ status: "error", message: "Data payload kosong" });
    }

    var data = JSON.parse(e.postData.contents);
    var action = data.action || "SYNC_ALL_DATA";
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // ==============================================================
    // AKSI 1: SINKRONKAN SELURUH DATABASE LENGKAP (SYNC_ALL_DATA)
    // ==============================================================
    if (action === "SYNC_ALL_DATA") {
      // 1. Sheet PROFIL_LEMBAGA
      if (data.schoolProfile) {
        syncSchoolProfileSheet(ss, data.schoolProfile);
      }

      // 2. Sheet DATA_GURU
      if (data.teachers && Array.isArray(data.teachers)) {
        syncTeachersSheet(ss, data.teachers);
      }

      // 3. Sheet DATA_SISWA
      if (data.students && Array.isArray(data.students)) {
        syncStudentsSheet(ss, data.students);
      }

      // 4. Sheet JURNAL_KBM (Buku Jurnal Refleksi Mengajar Dewan Guru)
      if (data.journals && Array.isArray(data.journals)) {
        syncJournalsSheet(ss, data.journals);
      }

      // 5. Sheet PRESENSI_GURU (Rekapitulasi Presensi Pendidik & Selfie)
      if (data.teacherAttendance && Array.isArray(data.teacherAttendance)) {
        syncTeacherAttendanceSheet(ss, data.teacherAttendance);
      }

      // 6. Sheet PRESENSI_SISWA (Database Arsip Kehadiran Siswa Kelas 1, 2, 3)
      if (data.studentAttendanceHistory && Array.isArray(data.studentAttendanceHistory)) {
        syncStudentHistorySheet(ss, data.studentAttendanceHistory);
      }

      return responseJson({
        status: "success",
        action: "SYNC_ALL_DATA",
        message: "Seluruh data madrasah berhasil disinkronkan ke 6 lembar Google Sheets!",
        syncedAt: new Date().toLocaleString("id-ID")
      });
    }

    // ==============================================================
    // AKSI 2: APPEND PRESENSI SISWA (SAVE_STUDENT_ATTENDANCE)
    // ==============================================================
    if (action === "SAVE_STUDENT_ATTENDANCE") {
      var sheetSiswa = getOrCreateSheet(ss, "PRESENSI_SISWA", [
        "Waktu Simpan", "Tanggal Presensi", "Rombel / Kelas", "Guru Pengisi",
        "NISN", "Nama Peserta Didik", "Jenis Kelamin", "Status Kehadiran", "Catatan Khusus Siswa"
      ]);
      
      var records = data.records || [];
      var rowsToAdd = [];
      for (var i = 0; i < records.length; i++) {
        var r = records[i];
        rowsToAdd.push([
          data.savedAt || new Date().toLocaleString("id-ID"),
          data.date,
          data.class,
          data.recordedBy || "-",
          "'" + (r.nisn || "-"),
          r.name,
          r.gender || "-",
          r.status,
          r.notes || "-"
        ]);
      }
      if (rowsToAdd.length > 0) {
        sheetSiswa.getRange(sheetSiswa.getLastRow() + 1, 1, rowsToAdd.length, rowsToAdd[0].length).setValues(rowsToAdd);
      }

      return responseJson({ status: "success", message: "Presensi siswa berhasil ditambahkan ke Google Sheets." });
    }

    // ==============================================================
    // AKSI 3: APPEND JURNAL KBM GURU (SAVE_TEACHER_JOURNAL)
    // ==============================================================
    if (action === "SAVE_TEACHER_JOURNAL") {
      var headersJurnal = [
        "No", "Tanggal", "Jam Mengajar", "Nama Pendidik", "Rombel & Mapel",
        "Materi Pokok / Capaian Pembelajaran", "Catatan & Evaluasi KBM"
      ];
      var sheetJurnal = getOrCreateSheet(ss, "JURNAL_KBM", headersJurnal);
      var lastRowJurnal = sheetJurnal.getLastRow();
      var nextNoJurnal = lastRowJurnal > 1 ? (lastRowJurnal) : 1;
      var jDate = data.date || Utilities.formatDate(new Date(), "Asia/Jakarta", "dd MMMM yyyy");

      sheetJurnal.appendRow([
        nextNoJurnal,
        jDate,
        data.time || "-",
        data.teacher || "-",
        data.classSubject || "-",
        data.topic || "-",
        data.notes || "-"
      ]);
      return responseJson({ status: "success", message: "Jurnal mengajar berhasil ditambahkan ke Google Sheets." });
    }

    // ==============================================================
    // AKSI 4: APPEND PRESENSI GURU & FOTO DRIVE (SAVE_TEACHER_ATTENDANCE)
    // ==============================================================
    if (action === "SAVE_TEACHER_ATTENDANCE") {
      var headersGuru = [
        "No", "Tanggal Presensi", "Waktu Absen", "Nama Pendidik", "NIP / NUPTK",
        "Status Kehadiran", "Jenis Presensi", "Keterangan", "Tautan Foto Drive"
      ];
      var sheetGuruAtt = getOrCreateSheet(ss, "PRESENSI_GURU", headersGuru);

      var photoUrl = "-";
      if (data.photo && data.photo.indexOf("data:image") === 0) {
        photoUrl = saveSelfiePhotoToDrive(data.teacherName, data.photo);
      }

      var lastRow = sheetGuruAtt.getLastRow();
      var nextNo = lastRow > 1 ? (lastRow) : 1;
      var itemDate = data.date || Utilities.formatDate(new Date(), "Asia/Jakarta", "dd MMMM yyyy");

      sheetGuruAtt.appendRow([
        nextNo,
        itemDate,
        data.time || "-",
        data.teacherName || "-",
        "'" + ((!data.nip || data.nip === "-" || data.nip.toLowerCase().indexOf("belum") !== -1) ? "-" : data.nip),
        data.status || "-",
        data.type || "-",
        data.notes || "-",
        photoUrl
      ]);
      return responseJson({ status: "success", message: "Presensi pendidik berhasil ditambahkan ke Google Sheets." });
    }

    return responseJson({ status: "error", message: "Aksi tidak dikenali: " + action });

  } catch (error) {
    return responseJson({
      status: "error",
      message: error.toString()
    });
  }
}

// =========================================================================
// FUNGSI SINKRONISASI MASING-MASING SHEET
// =========================================================================

function syncSchoolProfileSheet(ss, prof) {
  var sheet = getOrCreateSheet(ss, "PROFIL_LEMBAGA", ["Parameter Lembaga", "Nilai Resmi"]);
  sheet.clearContents();
  sheet.appendRow(["Parameter Lembaga", "Nilai Resmi"]);
  formatHeaderRow(sheet, 2);

  var rows = [
    ["Nama Lembaga", prof.name || "MADRASAH ALIYAH AL-IKHLASH"],
    ["NSM", "'" + (prof.nsm || "131232130037")],
    ["NPSN", "'" + (prof.npsn || "70049578")],
    ["Status Akreditasi", prof.akreditasi || "B"],
    ["Alamat Lengkap", prof.address || "KP KRAJAN TENGAH RT/RW 12/03 DESA SINDANGSARI KECAMATAN CIKAUM KABUPATEN SUBANG"],
    ["Penyelenggara", "Yayasan Al-Ikhlash (Nahdlatul Ulama)"],
    ["Terakhir Disinkronkan", new Date().toLocaleString("id-ID")]
  ];
  sheet.getRange(2, 1, rows.length, 2).setValues(rows);
  sheet.autoResizeColumns(1, 2);
}

function syncTeachersSheet(ss, teachers) {
  var headers = ["No", "Kode Mengajar", "Nama Pendidik", "Gelar & Jabatan", "NIP / NUPTK", "Mata Pelajaran Diampu", "Kode Masuk (PIN)"];
  var sheet = getOrCreateSheet(ss, "DATA_GURU", headers);
  sheet.clearContents();
  sheet.appendRow(headers);
  formatHeaderRow(sheet, headers.length);

  var rows = [];
  for (var i = 0; i < teachers.length; i++) {
    var t = teachers[i];
    rows.push([
      i + 1,
      t.code || "-",
      t.name,
      t.role || "-",
      "'" + (t.nip || "-"),
      t.mapel || "-",
      t.accessCode || "1234"
    ]);
  }
  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
  sheet.autoResizeColumns(1, headers.length);
}

function syncStudentsSheet(ss, students) {
  var headers = ["No", "NISN", "Nama Peserta Didik", "Rombel / Kelas", "Jenis Kelamin", "Catatan Khusus / Alamat"];
  var sheet = getOrCreateSheet(ss, "DATA_SISWA", headers);
  sheet.clearContents();
  sheet.appendRow(headers);
  formatHeaderRow(sheet, headers.length);

  var rows = [];
  for (var i = 0; i < students.length; i++) {
    var s = students[i];
    rows.push([
      i + 1,
      "'" + (s.nisn || "-"),
      s.name,
      s.class || "-",
      s.gender || "-",
      s.notes || "-"
    ]);
  }
  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
  sheet.autoResizeColumns(1, headers.length);
}

function syncJournalsSheet(ss, journals) {
  var headers = ["No", "Tanggal", "Jam Mengajar", "Nama Pendidik", "Rombel & Mapel", "Materi Pokok / Capaian Pembelajaran", "Catatan & Evaluasi KBM"];
  var sheet = getOrCreateSheet(ss, "JURNAL_KBM", headers);
  sheet.clearContents();
  sheet.appendRow(headers);
  formatHeaderRow(sheet, headers.length);

  var rows = [];
  for (var i = 0; i < journals.length; i++) {
    var j = journals[i];
    var jDate = j.date || Utilities.formatDate(new Date(), "Asia/Jakarta", "dd MMMM yyyy");
    rows.push([
      i + 1,
      jDate,
      j.time || "-",
      j.teacher || "-",
      j.classSubject || "-",
      j.topic || "-",
      j.notes || "-"
    ]);
  }
  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
  sheet.autoResizeColumns(1, headers.length);
}

function syncTeacherAttendanceSheet(ss, attendances) {
  var headers = ["No", "Tanggal Presensi", "Waktu Absen", "Nama Pendidik", "NIP / NUPTK", "Status Kehadiran", "Jenis Presensi", "Keterangan", "Tautan Foto Drive"];
  var sheet = getOrCreateSheet(ss, "PRESENSI_GURU", headers);
  sheet.clearContents();
  sheet.appendRow(headers);
  formatHeaderRow(sheet, headers.length);

  var rows = [];
  for (var i = 0; i < attendances.length; i++) {
    var item = attendances[i];
    var photoLink = "-";
    if (item.photo && item.photo.indexOf("data:image") === 0) {
      photoLink = saveSelfiePhotoToDrive(item.teacherName, item.photo);
    } else if (item.photo) {
      photoLink = item.photo;
    }

    var itemDate = item.date || item.dateFormatted || Utilities.formatDate(new Date(), "Asia/Jakarta", "dd MMMM yyyy");

    rows.push([
      i + 1,
      itemDate,
      item.time || "-",
      item.teacherName || "-",
      "'" + ((!item.nip || item.nip === "-" || item.nip.toLowerCase().indexOf("belum") !== -1) ? "-" : item.nip),
      item.status || "-",
      item.type || "-",
      item.notes || "-",
      photoLink
    ]);
  }
  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
  sheet.autoResizeColumns(1, headers.length);
}

function syncStudentHistorySheet(ss, history) {
  var headers = ["No", "Waktu Simpan", "Tanggal Presensi", "Rombel / Kelas", "Guru Pengisi", "NISN", "Nama Peserta Didik", "Jenis Kelamin", "Status (H/S/I/A)", "Catatan Khusus Siswa"];
  var sheet = getOrCreateSheet(ss, "PRESENSI_SISWA", headers);
  sheet.clearContents();
  sheet.appendRow(headers);
  formatHeaderRow(sheet, headers.length);

  var rows = [];
  var no = 1;
  for (var b = 0; b < history.length; b++) {
    var batch = history[b];
    var records = batch.records || [];
    for (var r = 0; r < records.length; r++) {
      var item = records[r];
      rows.push([
        no++,
        batch.savedAt || "-",
        batch.date || "-",
        batch.class || "-",
        batch.recordedBy || "-",
        "'" + (item.nisn || "-"),
        item.name || "-",
        item.gender || "-",
        item.status || "-",
        item.notes || "-"
      ]);
    }
  }
  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
  sheet.autoResizeColumns(1, headers.length);
}

// =========================================================================
// HELPER UTILITIES
// =========================================================================

function getOrCreateSheet(ss, sheetName, defaultHeaders) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    if (defaultHeaders && defaultHeaders.length > 0) {
      sheet.appendRow(defaultHeaders);
      formatHeaderRow(sheet, defaultHeaders.length);
    }
  }
  return sheet;
}

function formatHeaderRow(sheet, numCols) {
  var range = sheet.getRange(1, 1, 1, numCols);
  range.setBackground("#0f5a34"); // Hijau Resmi MA Al-Ikhlash
  range.setFontColor("#ffffff");
  range.setFontWeight("bold");
  range.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
}

function saveSelfiePhotoToDrive(teacherName, base64Photo) {
  try {
    var folderName = "BUKTI_PRESENSI_MA_AL_IKHLASH";
    var folders = DriveApp.getFoldersByName(folderName);
    var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);

    var parts = base64Photo.split(",");
    var rawData = parts.length > 1 ? parts[1] : parts[0];
    var blob = Utilities.newBlob(Utilities.base64Decode(rawData), "image/jpeg", "Presensi_" + (teacherName || "Guru").replace(/[^a-zA-Z0-9]/g, "_") + "_" + Date.now() + ".jpg");
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (e) {
    return "Gagal simpan foto: " + e.toString();
  }
}

function responseJson(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * =========================================================================
 * SIMADRASAH - GOOGLE APPS SCRIPT DATABASE ENDPOINT (v3.0 TWO-WAY REALTIME SYNC)
 * MADRASAH ALIYAH AL-IKHLASH (SINDANGSARI, CIKAUM, KABUPATEN SUBANG)
 * Arsitektur & Penulis/Pembuat Web: <nmcode/>
 * =========================================================================
 * 
 * FITUR DUA ARAH (SINKRONISASI TIMBAL BALIK):
 * 1. Web -> Spreadsheet:
 *    - Presensi siswa disimpan / diedit / dihapus di web -> Spreadsheet otomatis terupdate.
 *    - Riwayat presensi dihapus di web -> baris di sheet PRESENSI_SISWA otomatis terhapus / bersih.
 *    - 24 Siswa resmi MA Al-Ikhlash otomatis masuk ke sheet DATA_SISWA.
 * 2. Spreadsheet -> Web:
 *    - Ketika ada perubahan nama siswa, guru, status presensi di Spreadsheet,
 *      web bisa menarik (PULL) data terkini via tombol "Tarik Data dari Spreadsheet" atau otomatis.
 * 
 * DAFTAR 7 LEMBAR SHEET RESMI:
 * 1. PROFIL_LEMBAGA        : Identitas resmi, NSM, NPSN, Akreditasi, Alamat madrasah
 * 2. DATA_GURU             : Database dewan guru, kode mengajar 1-17, NIP, mapel pokok, PIN
 * 3. DATA_SISWA            : Database 24 siswa resmi MA Al-Ikhlash (Kelas 10, 11, 12)
 * 4. JURNAL_KBM            : Buku agenda & refleksi mengajar harian guru
 * 5. PRESENSI_GURU         : Rekap presensi guru, waktu kedatangan, & foto selfie Drive
 * 6. PRESENSI_SISWA        : Arsip riwayat presensi harian per kelas (10 kolom simetris)
 * 7. DOKUMENTASI_KEGIATAN  : Galeri dokumentasi kegiatan kurikulum & madrasah
 * =========================================================================
 */

// =========================================================================
// 1. PENANGANAN GET (TARIK DATA DARI SPREADSHEET KE WEBSITE)
// =========================================================================
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "GET_ALL_DATA";

    if (action === "GET_ALL_DATA" || action === "PULL_DATA") {
      var allData = readAllDataFromSpreadsheet(ss);
      return responseJson({
        status: "success",
        action: "PULL_DATA",
        message: "Alhamdulillah! Seluruh data dari Google Sheets berhasil ditarik ke Web.",
        data: allData,
        timestamp: new Date().toISOString()
      });
    }

    // Default status liveness check
    return responseJson({
      status: "success",
      madrasah: "MADRASAH ALIYAH AL-IKHLASH",
      message: "Endpoint SIMADRASAH Dua Arah Aktif & Siap Sinkronisasi!",
      sheets: [
        "PROFIL_LEMBAGA", "DATA_GURU", "DATA_SISWA", "JURNAL_KBM",
        "PRESENSI_GURU", "PRESENSI_SISWA", "DOKUMENTASI_KEGIATAN"
      ],
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return responseJson({ status: "error", message: "Gagal membaca Google Sheets: " + err.toString() });
  }
}

// =========================================================================
// 2. PENANGANAN POST (KIRIM DATA DARI WEBSITE KE SPREADSHEET)
// =========================================================================
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return responseJson({ status: "error", message: "Data payload kosong" });
    }

    var data = JSON.parse(e.postData.contents);
    var action = data.action || "SYNC_ALL_DATA";
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // AKSI 1: SINKRONISASI SELURUH 7 LEMBAR (SYNC_ALL_DATA)
    if (action === "SYNC_ALL_DATA") {
      if (data.schoolProfile) syncSchoolProfileSheet(ss, data.schoolProfile);
      if (data.teachers && Array.isArray(data.teachers)) syncTeachersSheet(ss, data.teachers);
      if (data.students && Array.isArray(data.students)) syncStudentsSheet(ss, data.students);
      if (data.journals && Array.isArray(data.journals)) syncJournalsSheet(ss, data.journals);
      if (data.teacherAttendance && Array.isArray(data.teacherAttendance)) syncTeacherAttendanceSheet(ss, data.teacherAttendance);
      if (data.studentAttendanceHistory !== undefined && Array.isArray(data.studentAttendanceHistory)) {
        syncStudentHistorySheet(ss, data.studentAttendanceHistory);
      }
      if (data.docs && Array.isArray(data.docs)) syncDocsSheet(ss, data.docs);

      return responseJson({
        status: "success",
        action: "SYNC_ALL_DATA",
        message: "Seluruh 7 lembar database madrasah berhasil diperbarui di Google Sheets secara simetris & rapi!",
        syncedAt: new Date().toLocaleString("id-ID")
      });
    }

    // AKSI 2: SINKRONISASI PRESENSI SISWA (SYNC_STUDENT_ATTENDANCE / SAVE_STUDENT_ATTENDANCE)
    if (action === "SYNC_STUDENT_ATTENDANCE" || action === "SAVE_STUDENT_ATTENDANCE") {
      // Jika dikirim array riwayat lengkap (misal setelah simpan atau setelah hapus)
      if (data.studentAttendanceHistory && Array.isArray(data.studentAttendanceHistory)) {
        syncStudentHistorySheet(ss, data.studentAttendanceHistory);
        return responseJson({
          status: "success",
          action: action,
          message: "Sheet PRESENSI_SISWA berhasil disinkronkan secara simetris sesuai riwayat web."
        });
      }

      // Jika dikirim 1 sesi tunggal (batch baru)
      if (data.records && Array.isArray(data.records)) {
        var headersSiswa = [
          "No", "Waktu Simpan", "Tanggal Presensi", "Rombel / Kelas", "Guru Pengisi",
          "NISN", "Nama Peserta Didik", "Jenis Kelamin", "Status (H/S/I/A)", "Catatan Khusus Siswa"
        ];
        var sheetSiswa = getOrCreateSheet(ss, "PRESENSI_SISWA", headersSiswa);
        normalizeStudentAttendanceSheet(sheetSiswa, headersSiswa);

        var lastRow = sheetSiswa.getLastRow();
        var nextNo = lastRow > 1 ? lastRow : 1;
        var rowsToAdd = [];

        for (var i = 0; i < data.records.length; i++) {
          var r = data.records[i];
          rowsToAdd.push([
            nextNo++,
            data.savedAt || new Date().toLocaleString("id-ID"),
            data.date || Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd"),
            data.class || "-",
            data.recordedBy || "-",
            "'" + (r.nisn || "-"),
            r.name,
            r.gender || "-",
            r.status || "H",
            r.notes || "-"
          ]);
        }

        if (rowsToAdd.length > 0) {
          sheetSiswa.getRange(sheetSiswa.getLastRow() + 1, 1, rowsToAdd.length, headersSiswa.length).setValues(rowsToAdd);
          sheetSiswa.autoResizeColumns(1, headersSiswa.length);
        }

        return responseJson({
          status: "success",
          message: "Presensi siswa berhasil ditambahkan ke lembar PRESENSI_SISWA secara simetris."
        });
      }
    }

    // AKSI 3: SINKRONISASI DATA SISWA (SYNC_STUDENTS)
    if (action === "SYNC_STUDENTS") {
      var studentsList = data.students || [];
      syncStudentsSheet(ss, studentsList);
      return responseJson({
        status: "success",
        action: "SYNC_STUDENTS",
        message: "Data siswa resmi (" + studentsList.length + " siswa) berhasil disinkronkan ke lembar DATA_SISWA."
      });
    }

    // AKSI 4: SINKRONISASI DATA GURU (SYNC_TEACHERS)
    if (action === "SYNC_TEACHERS") {
      var teachersList = data.teachers || [];
      syncTeachersSheet(ss, teachersList);
      return responseJson({
        status: "success",
        action: "SYNC_TEACHERS",
        message: "Data dewan guru berhasil disinkronkan ke lembar DATA_GURU."
      });
    }

    // AKSI 5: APPEND JURNAL KBM GURU (SAVE_TEACHER_JOURNAL)
    if (action === "SAVE_TEACHER_JOURNAL") {
      var headersJurnal = [
        "No", "Tanggal", "Jam Mengajar", "Nama Pendidik", "Rombel & Mapel",
        "Materi Pokok / Capaian Pembelajaran", "Catatan & Evaluasi KBM"
      ];
      var sheetJurnal = getOrCreateSheet(ss, "JURNAL_KBM", headersJurnal);
      var lastRowJ = sheetJurnal.getLastRow();
      var nextNoJ = lastRowJ > 1 ? lastRowJ : 1;
      var jDate = data.date || Utilities.formatDate(new Date(), "Asia/Jakarta", "dd MMMM yyyy");

      sheetJurnal.appendRow([
        nextNoJ,
        jDate,
        data.time || "-",
        data.teacher || "-",
        data.classSubject || "-",
        data.topic || "-",
        data.notes || "-"
      ]);
      sheetJurnal.autoResizeColumns(1, headersJurnal.length);
      return responseJson({ status: "success", message: "Jurnal mengajar berhasil ditambahkan ke lembar JURNAL_KBM." });
    }

    // AKSI 6: APPEND PRESENSI GURU & FOTO DRIVE (SAVE_TEACHER_ATTENDANCE)
    if (action === "SAVE_TEACHER_ATTENDANCE") {
      var headersGuru = [
        "No", "Tanggal Presensi", "Waktu Absen", "Nama Pendidik", "NIP / NUPTK",
        "Status Kehadiran", "Jenis Presensi", "Keterangan", "Tautan Foto Drive"
      ];
      var sheetGuruAtt = getOrCreateSheet(ss, "PRESENSI_GURU", headersGuru);
      normalizeTeacherAttendanceSheet(sheetGuruAtt, headersGuru);

      var photoUrl = "-";
      if (data.photo && data.photo.indexOf("data:image") === 0) {
        photoUrl = saveSelfiePhotoToDrive(data.teacherName, data.photo);
      } else if (data.photo) {
        photoUrl = data.photo;
      }

      var lastRowG = sheetGuruAtt.getLastRow();
      var nextNoG = lastRowG > 1 ? lastRowG : 1;
      var itemDate = data.date || Utilities.formatDate(new Date(), "Asia/Jakarta", "dd MMMM yyyy");

      sheetGuruAtt.appendRow([
        nextNoG,
        itemDate,
        data.time || "-",
        data.teacherName || "-",
        "'" + ((!data.nip || data.nip === "-" || data.nip.toLowerCase().indexOf("belum") !== -1) ? "-" : data.nip),
        data.status || "-",
        data.type || "-",
        data.notes || "-",
        photoUrl
      ]);
      sheetGuruAtt.autoResizeColumns(1, headersGuru.length);
      return responseJson({ status: "success", message: "Presensi pendidik berhasil ditambahkan ke lembar PRESENSI_GURU." });
    }

    // AKSI 7: SIMPAN / PERBARUI DOKUMENTASI KEGIATAN (SAVE_DOCUMENTATION / UPDATE_DOCUMENTATION)
    if (action === "SAVE_DOCUMENTATION" || action === "UPDATE_DOCUMENTATION") {
      var headersDoc = [
        "No", "ID Kegiatan", "Tanggal Kegiatan", "Judul Kegiatan", "Kategori Kurikulum",
        "Guru Penanggung Jawab", "Deskripsi & Ringkasan Kegiatan", "Tautan Foto / Video Google Drive"
      ];
      var sheetDoc = getOrCreateSheet(ss, "DOKUMENTASI_KEGIATAN", headersDoc);
      normalizeDocsSheet(sheetDoc, headersDoc);

      var fileSource = data.img || data.file || data.photo || data.driveUrl || "";
      var driveLink = saveDocFileToDrive(data.title, fileSource);
      var targetId = data.id || ("DOC" + Date.now());
      var teacherName = data.teacher || data.recordedBy || "-";

      // Cek apakah ID sudah ada di sheet (Mode Edit/Update)
      var foundRow = -1;
      var lastRowD = sheetDoc.getLastRow();
      if (lastRowD > 1) {
        var idValues = sheetDoc.getRange(2, 2, lastRowD - 1, 1).getValues();
        for (var i = 0; i < idValues.length; i++) {
          if (String(idValues[i][0]).trim() === targetId) {
            foundRow = i + 2; // baris di spreadsheet
            break;
          }
        }
      }

      if (foundRow > 0) {
        // Mode Update / Koreksi
        var existingNo = sheetDoc.getRange(foundRow, 1).getValue();
        sheetDoc.getRange(foundRow, 1, 1, headersDoc.length).setValues([[
          existingNo,
          targetId,
          data.date || Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd"),
          data.title || "-",
          data.category || "-",
          teacherName,
          data.desc || "-",
          driveLink
        ]]);
        return responseJson({
          status: "success",
          message: "Dokumentasi kegiatan berhasil diperbarui di Google Sheets!",
          driveUrl: driveLink
        });
      } else {
        // Mode Tambah Baru
        var nextNoD = lastRowD > 1 ? lastRowD : 1;
        sheetDoc.appendRow([
          nextNoD,
          targetId,
          data.date || Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd"),
          data.title || "-",
          data.category || "-",
          teacherName,
          data.desc || "-",
          driveLink
        ]);
        sheetDoc.autoResizeColumns(1, headersDoc.length);

        return responseJson({
          status: "success",
          message: "Dokumentasi kegiatan berhasil ditambahkan ke Google Sheets dan terkonversi ke Google Drive!",
          driveUrl: driveLink
        });
      }
    }

    // AKSI 8: SINKRONISASI PENUH DOKUMENTASI (SYNC_DOCS)
    if (action === "SYNC_DOCS") {
      var docsList = data.docs || [];
      syncDocsSheet(ss, docsList);
      return responseJson({
        status: "success",
        action: "SYNC_DOCS",
        message: "Seluruh dokumentasi kegiatan berhasil disinkronkan ke lembar DOKUMENTASI_KEGIATAN."
      });
    }

    return responseJson({ status: "error", message: "Aksi tidak dikenali: " + action });

  } catch (error) {
    return responseJson({ status: "error", message: error.toString() });
  }
}

// =========================================================================
// 3. FUNGSI MEMBACA SELURUH DATA DARI SPREADSHEET (READ/PULL)
// =========================================================================
function readAllDataFromSpreadsheet(ss) {
  var result = {};

  // 1. Sheet PROFIL_LEMBAGA
  var sheetProfil = ss.getSheetByName("PROFIL_LEMBAGA");
  if (sheetProfil && sheetProfil.getLastRow() >= 2) {
    var pVals = sheetProfil.getRange(2, 1, sheetProfil.getLastRow() - 1, 2).getValues();
    var pMap = {};
    for (var i = 0; i < pVals.length; i++) {
      pMap[pVals[i][0]] = pVals[i][1];
    }
    result.schoolProfile = {
      name: pMap["Nama Lembaga"] || "MADRASAH ALIYAH AL-IKHLASH",
      nsm: String(pMap["NSM"] || "131232130037").replace(/^'/, ""),
      npsn: String(pMap["NPSN"] || "70049578").replace(/^'/, ""),
      akreditasi: pMap["Status Akreditasi"] || "B",
      address: pMap["Alamat Lengkap"] || "KP KRAJAN TENGAH RT/RW 12/03 DESA SINDANGSARI KECAMATAN CIKAUM KABUPATEN SUBANG",
      penyelenggara: pMap["Penyelenggara"] || "Yayasan Al-Ikhlash",
      logo: "logo.jpeg"
    };
  }

  // 2. Sheet DATA_GURU
  var sheetGuru = ss.getSheetByName("DATA_GURU");
  if (sheetGuru && sheetGuru.getLastRow() >= 2) {
    var gVals = sheetGuru.getRange(2, 1, sheetGuru.getLastRow() - 1, sheetGuru.getLastColumn()).getValues();
    var teachers = [];
    for (var i = 0; i < gVals.length; i++) {
      var row = gVals[i];
      var name = String(row[2] || "").trim();
      if (!name) continue;
      teachers.push({
        id: "G" + String(i + 1).padStart(2, "0"),
        code: String(row[1] || "-"),
        name: name,
        nip: String(row[3] || "-").replace(/^'/, ""),
        role: String(row[4] || "Guru Pengampu"),
        mapel: String(row[5] || "-"),
        accessCode: String(row[6] || (name.split(" ")[0].toUpperCase() + "123"))
      });
    }
    if (teachers.length > 0) result.teachers = teachers;
  }

  // 3. Sheet DATA_SISWA
  var sheetSiswa = ss.getSheetByName("DATA_SISWA");
  if (sheetSiswa && sheetSiswa.getLastRow() >= 2) {
    var sVals = sheetSiswa.getRange(2, 1, sheetSiswa.getLastRow() - 1, sheetSiswa.getLastColumn()).getValues();
    var students = [];
    for (var i = 0; i < sVals.length; i++) {
      var row = sVals[i];
      var name = String(row[2] || "").trim();
      if (!name) continue;
      students.push({
        id: "S" + (100 + i + 1),
        nisn: String(row[1] || "-").replace(/^'/, ""),
        name: name,
        class: String(row[3] || "Kelas 1"),
        gender: String(row[4] || "Laki-laki"),
        status: "H",
        notes: String(row[5] || "")
      });
    }
    if (students.length > 0) result.students = students;
  }

  // 4. Sheet JURNAL_KBM
  var sheetJurnal = ss.getSheetByName("JURNAL_KBM");
  if (sheetJurnal && sheetJurnal.getLastRow() >= 2) {
    var jVals = sheetJurnal.getRange(2, 1, sheetJurnal.getLastRow() - 1, sheetJurnal.getLastColumn()).getValues();
    var journals = [];
    for (var i = 0; i < jVals.length; i++) {
      var row = jVals[i];
      var tName = String(row[3] || "").trim();
      if (!tName) continue;
      journals.push({
        id: "J" + (i + 1),
        date: String(row[1] || "-"),
        time: String(row[2] || "-"),
        teacher: tName,
        classSubject: String(row[4] || "-"),
        topic: String(row[5] || "-"),
        notes: String(row[6] || "-")
      });
    }
    result.journals = journals;
  }

  // 5. Sheet PRESENSI_GURU
  var sheetPresGuru = ss.getSheetByName("PRESENSI_GURU");
  if (sheetPresGuru && sheetPresGuru.getLastRow() >= 2) {
    var pgVals = sheetPresGuru.getRange(2, 1, sheetPresGuru.getLastRow() - 1, sheetPresGuru.getLastColumn()).getValues();
    var teacherAtt = [];
    for (var i = 0; i < pgVals.length; i++) {
      var row = pgVals[i];
      var tName = String(row[3] || "").trim();
      if (!tName) continue;
      teacherAtt.push({
        id: "TA" + (i + 1),
        date: String(row[1] || "-"),
        time: String(row[2] || "-"),
        teacherName: tName,
        nip: String(row[4] || "-").replace(/^'/, ""),
        status: String(row[5] || "Tepat Waktu"),
        type: String(row[6] || "Datang (Pagi)"),
        notes: String(row[7] || "-"),
        photo: String(row[8] || "logo.jpeg")
      });
    }
    result.teacherAttendance = teacherAtt;
  }

  // 6. Sheet PRESENSI_SISWA (Kelompokkan baris menjadi kumpulan sesi riwayat)
  var sheetPresSiswa = ss.getSheetByName("PRESENSI_SISWA");
  if (sheetPresSiswa && sheetPresSiswa.getLastRow() >= 2) {
    var psVals = sheetPresSiswa.getRange(2, 1, sheetPresSiswa.getLastRow() - 1, sheetPresSiswa.getLastColumn()).getValues();
    var batchesMap = {};

    for (var i = 0; i < psVals.length; i++) {
      var row = psVals[i];
      var savedAt = String(row[1] || "-");
      var pDate = String(row[2] || "-");
      var pClass = String(row[3] || "Kelas 1");
      var pGuru = String(row[4] || "-");
      var pNisn = String(row[5] || "-").replace(/^'/, "");
      var pName = String(row[6] || "").trim();
      var pGender = String(row[7] || "Laki-laki");
      var pStatus = String(row[8] || "-");
      var pNotes = String(row[9] || "");

      if (!pName) continue;

      var batchKey = pDate + "_" + pClass;
      if (!batchesMap[batchKey]) {
        batchesMap[batchKey] = {
          id: "HIST_" + batchKey,
          date: pDate,
          class: pClass,
          recordedBy: pGuru,
          savedAt: savedAt,
          stats: { total: 0, hadir: 0, sakit: 0, izin: 0, alpa: 0, belumDiisi: 0 },
          records: []
        };
      }

      var b = batchesMap[batchKey];
      b.records.push({
        id: "S" + (100 + b.records.length + 1),
        nisn: pNisn,
        name: pName,
        gender: pGender,
        status: pStatus,
        notes: pNotes
      });

      b.stats.total++;
      if (pStatus === "H") b.stats.hadir++;
      else if (pStatus === "S") b.stats.sakit++;
      else if (pStatus === "I") b.stats.izin++;
      else if (pStatus === "A") b.stats.alpa++;
      else b.stats.belumDiisi++;
    }

    var historyArr = Object.keys(batchesMap).map(function(k) { return batchesMap[k]; });
    result.studentAttendanceHistory = historyArr;
  } else {
    result.studentAttendanceHistory = [];
  }

  // 7. Sheet DOKUMENTASI_KEGIATAN
  var sheetDocs = ss.getSheetByName("DOKUMENTASI_KEGIATAN");
  if (sheetDocs && sheetDocs.getLastRow() >= 2) {
    var dVals = sheetDocs.getRange(2, 1, sheetDocs.getLastRow() - 1, sheetDocs.getLastColumn()).getValues();
    var docs = [];
    for (var i = 0; i < dVals.length; i++) {
      var row = dVals[i];
      var title = String(row[3] || "").trim();
      if (!title) continue;

      var teacherName = "-";
      var desc = "-";
      var driveLink = "";

      // Jika kolom >= 8 (Format Resmi Baru: No, ID, Tanggal, Judul, Kategori, Guru, Deskripsi, DriveUrl)
      if (row.length >= 8) {
        teacherName = String(row[5] || "-").trim();
        desc = String(row[6] || "-").trim();
        driveLink = String(row[7] || "").trim();
      } else {
        // Format kompatibilitas lama 7 kolom
        desc = String(row[5] || "-").trim();
        driveLink = String(row[6] || "").trim();
      }

      var imgSrc = (driveLink && driveLink !== "-" && driveLink.indexOf("http") === 0) ? driveLink : "assets/images/kegiatan-1.svg";
      docs.push({
        id: String(row[1] || ("DOC" + (i + 1))),
        date: String(row[2] || "-"),
        title: title,
        category: String(row[4] || "Kurikulum & KBM"),
        teacher: teacherName,
        desc: desc,
        img: imgSrc,
        driveUrl: driveLink
      });
    }
    if (docs.length > 0) result.docs = docs;
  }

  return result;
}

// =========================================================================
// 4. FUNGSI SINKRONISASI MASING-MASING LEMBAR (OVERWRITE BERSIH)
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
  var headers = ["No", "Kode Jadwal", "Nama Lengkap Guru", "NIP / NUPTK", "Jabatan Pokok", "Mata Pelajaran Diampu", "Kode Masuk PIN"];
  var sheet = getOrCreateSheet(ss, "DATA_GURU", headers);
  sheet.clearContents();
  sheet.appendRow(headers);
  formatHeaderRow(sheet, headers.length);

  var rows = [];
  for (var i = 0; i < teachers.length; i++) {
    var t = teachers[i];
    rows.push([
      i + 1,
      t.code || (i + 1),
      t.name,
      "'" + ((!t.nip || t.nip === "-" || t.nip.toLowerCase().indexOf("belum") !== -1) ? "-" : t.nip),
      t.role || "Guru Pengampu",
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
    var a = attendances[i];
    var aDate = a.date || Utilities.formatDate(new Date(), "Asia/Jakarta", "dd MMMM yyyy");
    var photoLink = "-";
    if (a.photo && a.photo.indexOf("http") === 0) photoLink = a.photo;
    else if (a.photo) photoLink = "Tersimpan Lokal";

    rows.push([
      i + 1,
      aDate,
      a.time || "-",
      a.teacherName || "-",
      "'" + ((!a.nip || a.nip === "-" || a.nip.toLowerCase().indexOf("belum") !== -1) ? "-" : a.nip),
      a.status || "-",
      a.type || "-",
      a.notes || "-",
      photoLink
    ]);
  }
  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
  sheet.autoResizeColumns(1, headers.length);
}

/**
 * Sinkronisasi Sheet PRESENSI_SISWA:
 * Seluruh riwayat presensi siswa dari website ditulis ulang secara bersih dan simetris (10 kolom).
 * Jika riwayat dihapus di website (history = []), lembar ini langsung dibersihkan dan hanya menyisakan header!
 */
function syncStudentHistorySheet(ss, history) {
  var headers = [
    "No", "Waktu Simpan", "Tanggal Presensi", "Rombel / Kelas", "Guru Pengisi",
    "NISN", "Nama Peserta Didik", "Jenis Kelamin", "Status (H/S/I/A)", "Catatan Khusus Siswa"
  ];
  var sheet = getOrCreateSheet(ss, "PRESENSI_SISWA", headers);
  sheet.clearContents();
  sheet.appendRow(headers);
  formatHeaderRow(sheet, headers.length);

  if (!history || !Array.isArray(history) || history.length === 0) {
    sheet.autoResizeColumns(1, headers.length);
    return;
  }

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

function syncDocsSheet(ss, docs) {
  var headers = [
    "No", "ID Kegiatan", "Tanggal Kegiatan", "Judul Kegiatan", "Kategori Kurikulum",
    "Guru Penanggung Jawab", "Deskripsi & Ringkasan Kegiatan", "Tautan Foto / Video Google Drive"
  ];
  var sheet = getOrCreateSheet(ss, "DOKUMENTASI_KEGIATAN", headers);
  sheet.clearContents();
  sheet.appendRow(headers);
  formatHeaderRow(sheet, headers.length);

  var rows = [];
  for (var i = 0; i < docs.length; i++) {
    var d = docs[i];
    var fileSource = d.img || d.file || d.photo || d.driveUrl || "";
    var driveLink = saveDocFileToDrive(d.title, fileSource);
    var teacherName = d.teacher || d.recordedBy || "-";
    rows.push([
      i + 1,
      d.id || ("DOC" + (i + 1)),
      d.date || "-",
      d.title || "-",
      d.category || "-",
      teacherName,
      d.desc || "-",
      driveLink
    ]);
  }
  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
  sheet.autoResizeColumns(1, headers.length);
}

// =========================================================================
// 5. HELPER UTILITIES & NORMALISASI OTOMATIS
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

function normalizeStudentAttendanceSheet(sheet, expectedHeaders) {
  var lastCol = sheet.getLastColumn();
  if (lastCol === 0) {
    sheet.appendRow(expectedHeaders);
    formatHeaderRow(sheet, expectedHeaders.length);
    return;
  }
  var currentHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  if (currentHeaders[0] !== "No" || currentHeaders[1] !== "Waktu Simpan") {
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    formatHeaderRow(sheet, expectedHeaders.length);
  }
}

function normalizeTeacherAttendanceSheet(sheet, expectedHeaders) {
  var lastCol = sheet.getLastColumn();
  if (lastCol === 0) {
    sheet.appendRow(expectedHeaders);
    formatHeaderRow(sheet, expectedHeaders.length);
    return;
  }

  var currentHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var colB = currentHeaders[1] ? currentHeaders[1].toString().trim().toLowerCase() : "";

  if (colB.indexOf("waktu") !== -1) {
    sheet.insertColumnBefore(2);
    sheet.getRange(1, 2).setValue("Tanggal Presensi");
    formatHeaderRow(sheet, expectedHeaders.length);

    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var dateRange = sheet.getRange(2, 2, lastRow - 1, 1);
      var dateVals = dateRange.getValues();
      var defaultDate = Utilities.formatDate(new Date(), "Asia/Jakarta", "dd MMMM yyyy");
      for (var r = 0; r < dateVals.length; r++) {
        if (!dateVals[r][0] || dateVals[r][0] === "") {
          dateVals[r][0] = defaultDate;
        }
      }
      dateRange.setValues(dateVals);
    }
  } else {
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    formatHeaderRow(sheet, expectedHeaders.length);
  }
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

function normalizeDocsSheet(sheet, expectedHeaders) {
  var lastCol = sheet.getLastColumn();
  if (lastCol === 0) {
    sheet.appendRow(expectedHeaders);
    formatHeaderRow(sheet, expectedHeaders.length);
    return;
  }
  if (lastCol < expectedHeaders.length) {
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    formatHeaderRow(sheet, expectedHeaders.length);
  }
}

function saveDocFileToDrive(docTitle, base64OrUrl) {
  if (!base64OrUrl || base64OrUrl === "-" || base64OrUrl === "" || base64OrUrl.indexOf("assets/images/") !== -1) {
    return "-";
  }

  // Jika sudah berbentuk tautan link web (Google Drive, YouTube, Cloudinary, dsb)
  if (base64OrUrl.indexOf("http://") === 0 || base64OrUrl.indexOf("https://") === 0) {
    return base64OrUrl;
  }

  // Jika berbentuk Data URL Base64 (data:image/... atau data:video/...)
  if (base64OrUrl.indexOf("data:") === 0) {
    try {
      var folderName = "DOKUMENTASI_KEGIATAN_MA_AL_IKHLASH";
      var folders = DriveApp.getFoldersByName(folderName);
      var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);

      var mimeType = "image/jpeg";
      var ext = ".jpg";
      var match = base64OrUrl.match(/^data:([^;]+);base64,/);
      if (match) {
        mimeType = match[1];
        if (mimeType.indexOf("png") !== -1) ext = ".png";
        else if (mimeType.indexOf("webp") !== -1) ext = ".webp";
        else if (mimeType.indexOf("mp4") !== -1) ext = ".mp4";
        else if (mimeType.indexOf("webm") !== -1) ext = ".webm";
        else if (mimeType.indexOf("pdf") !== -1) ext = ".pdf";
      }

      var parts = base64OrUrl.split(",");
      var rawData = parts.length > 1 ? parts[1] : parts[0];
      var cleanTitle = (docTitle || "Dokumentasi").replace(/[^a-zA-Z0-9]/g, "_").slice(0, 35);
      var fileName = "Dokumentasi_" + cleanTitle + "_" + Date.now() + ext;

      var blob = Utilities.newBlob(Utilities.base64Decode(rawData), mimeType, fileName);
      var file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      return file.getUrl();
    } catch (e) {
      return "Gagal unggah ke Drive: " + e.toString();
    }
  }

  return base64OrUrl;
}

function responseJson(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

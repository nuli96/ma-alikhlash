# PANDUAN INTEGRASI DUA ARAH (TWO-WAY SYNC) & PEMULIHAN GOOGLE SHEETS
**MADRASAH ALIYAH AL-IKHLASH (SINDANGSARI, CIKAUM, SUBANG)**  
*Penulis & Pengembang: `<nmcode/>`*

---

### 🔄 1. Hubungan Timbal Balik Dua Arah (Two-Way Sync) Antara Website & Spreadsheet

Sistem kini terhubung secara timbal balik penuh (dua arah):

#### A. Dari Website ke Google Spreadsheet (Push / Otomatis)
1. **Hapus Riwayat Absen Siswa**:
   - Ketika Anda menghapus sesi riwayat presensi di tab **Kehadiran Siswa > Database & Riwayat** (atau klik *Bersihkan Semua Riwayat*), baris pada sheet **`PRESENSI_SISWA`** di Google Spreadsheet akan **langsung terhapus bersih dan otomatis diperbarui**. Tidak ada lagi data lama yang tersisa!
2. **Pengisian Presensi Siswa**:
   - Setiap kali guru/wali kelas menyimpan presensi harian, lembar **`PRESENSI_SISWA`** langsung diperbarui dengan format 10 kolom rapi dan nomor urut yang tepat tanpa kolom bergeser.
3. **Data 24 Siswa Resmi**:
   - Seluruh 24 data siswa resmi (14 siswa Kelas 1 + 7 siswa Kelas 2 + 3 siswa Kelas 3) tersimpan di website dan otomatis disinkronkan ke sheet **`DATA_SISWA`**. Jika Anda mengedit, menambah, atau menghapus siswa di Panel Operator, sheet `DATA_SISWA` langsung terupdate!
4. **Tombol Kirim Massal (Push)**:
   - Di **Panel Operator > Sinkronisasi Google Sheets & Backup**, terdapat tombol hijau:  
     👉 **`🚀 Kirim Semua Data ke Sheets (Push)`**  
     Sekali klik, seluruh 24 siswa, dewan guru, jurnal KBM, presensi guru, dan riwayat presensi siswa yang valid langsung dikirim dan ditulis ulang secara bersih di Google Spreadsheet Anda.

#### B. Dari Google Spreadsheet ke Website (Pull / Tarik Data)
- Jika Anda atau staf tata usaha mengubah data langsung di Google Spreadsheet (misalnya menambah nama guru baru di `DATA_GURU`, mengedit nama siswa di `DATA_SISWA`, atau mengubah rekap kehadiran di sheet), Anda cukup klik tombol biru:  
  👉 **`🔄 Tarik Data Terkini dari Sheets (Pull)`**  
  *(Tombol ini tersedia di Panel Operator, di toolbar atas tab Kehadiran Siswa, dan di filter Riwayat Presensi)*.  
- Dalam hitungan detik, seluruh data terkini di spreadsheet akan ditarik masuk ke website dan seluruh tabel, grafik visual, dan statistik langsung terupdate otomatis!

---

### 🛠️ 2. Langkah Pembaruan Kode di Google Apps Script (Hanya 1 Menit)

Agar fitur **Tarik Data (GET)** dan **Pembersihan Otomatis Sheet** berjalan di Google Spreadsheet Anda, lakukan langkah singkat berikut:

1. Buka Google Spreadsheet Anda: **`SIMADRASAH_AL_IKHLASH_DATABASE`**.
2. Klik menu **Ekstensi (Extensions)** > **Apps Script**.
3. **Pilih semua teks kode lama (Ctrl + A)**, lalu hapus.
4. Buka berkas **`google_apps_script.js`** yang ada di folder proyek ini, salin (**Ctrl + C**) seluruh isinya dan tempel (**Ctrl + V**) ke dalam editor Apps Script.
5. Klik ikon **Simpan (Disket)**.
6. Klik tombol biru **Terapkan (Deploy)** di pojok kanan atas > pilih **Kelola penerapan (Manage deployments)**:
   - Klik ikon **Pensil (Edit)** di sebelah kanan penerapan aktif Anda.
   - Pada kolom Versi, klik dan pilih **Versi baru (New version)**.
   - Klik tombol **Terapkan (Deploy)**.
7. Buka kembali Website SIMADRASAH Anda:
   - Masuk ke tab **Admin / Operator** (Password: `nmcode`).
   - Masuk ke menu **Sinkronisasi Google Sheets & Backup**.
   - Klik tombol hijau: **`🚀 Kirim Semua Data ke Sheets (Push)`**.
   - Selesai! Lembar `PRESENSI_SISWA` langsung bersih dan `DATA_SISWA` langsung terisi lengkap dengan 24 siswa resmi.

---

### 📋 3. Format Standar Lembar `PRESENSI_SISWA` & `DOKUMENTASI_KEGIATAN`

#### A. Lembar `PRESENSI_SISWA` (10 Kolom Presisi):
| Kolom A | Kolom B | Kolom C | Kolom D | Kolom E | Kolom F | Kolom G | Kolom H | Kolom I | Kolom J |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **No** | **Waktu Simpan** | **Tanggal Presensi** | **Rombel / Kelas** | **Guru Pengisi** | **NISN** | **Nama Peserta Didik** | **Jenis Kelamin** | **Status (H/S/I/A)** | **Catatan Khusus Siswa** |

#### B. Lembar `DOKUMENTASI_KEGIATAN` (7 Kolom + Link Google Drive):
| Kolom A | Kolom B | Kolom C | Kolom D | Kolom E | Kolom F | Kolom G |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **No** | **ID Kegiatan** | **Tanggal Kegiatan** | **Judul Kegiatan** | **Kategori Kurikulum** | **Deskripsi & Ringkasan Kegiatan** | **Tautan Foto / Video Google Drive** |

> 💡 **Fitur Otomatis Google Drive:** Ketika Anda mengunggah foto atau video dokumentasi melalui website, Google Apps Script akan otomatis mengonversi berkas tersebut dan menyimpannya di folder **`DOKUMENTASI_KEGIATAN_MA_AL_IKHLASH`** pada Google Drive Anda, lalu menyematkan tautan link publiknya ke **Kolom G** di Spreadsheet!

---

### 🗑️ 4. Penghapusan Fitur Kotak Impor Excel

Sesuai permintaan Anda, komponen kotak:
- *"Pembaruan Database Siswa dari Berkas Excel Resmi Madrasah"*
- Tombol *"Pilih Berkas Excel Siswa (KELAS X, XI, XII)"*
- Tombol *"Muat Berkas Folder"*
- Chip rombel dan badge 18 siswa

**Telah dihapus seutuhnya dari antarmuka website.** Tampilan tab **Kehadiran Siswa** kini jauh lebih bersih, rapi, langsung menampilkan form presensi dan filter alur tanggal/guru tanpa elemen yang mengganggu.

---

### 🌟 5. Kata-Kata Penyemangat Guru & Tampilan Estetik

1. **Kata-Kata Penyemangat Random**: Muncul secara otomatis di bawah banner Beranda setiap kali halaman dibuka atau direfresh dengan kalimat-kalimat profesional yang menyemangati guru madrasah hebat.
2. **Animasi Halus & Responsif**: Website berjalan lancar, nyaman digunakan di layar HP maupun laptop, serta didukung identitas pembuat `<nmcode/>`.

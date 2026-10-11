# PANDUAN INTEGRASI DUA ARAH (TWO-WAY SYNC) & SISTEM AUTO-SYNC REALTIME
**MADRASAH ALIYAH AL-IKHLASH (SINDANGSARI, CIKAUM, SUBANG)**  
*Pemilik Hak Cipta: **NULI MAULANA, S.Pd** • Pengembang & Penulis Kode: `<nmcode/>`*

---

## ⛔ PERNYATAAN HAK CIPTA EKSKLUSIF & LARANGAN PLAGIARISME
Seluruh kode sumber (*source code*), skrip Google Apps Script, arsitektur database, dan antarmuka sistem SIMADRASAH ini adalah **karya cipta eksklusif milik NULI MAULANA, S.Pd**. Dilarang keras menjiplak, menggandakan, memodifikasi, atau menggunakan skrip ini tanpa izin tertulis resmi dari pemilik hak cipta.

---

## ⚡ 1. Arsitektur Auto-Sync 100% Otomatis & Real-Time (Multi-Device)

Sistem SIMADRASAH telah dirancang dengan arsitektur **Auto-Sync Murni Otomatis** tanpa membebani dewan guru untuk menekan tombol sinkronisasi manual:

### A. Saat Pertama Kali Membuka Website (*Silent Auto-Pull*):
* Begitu guru membuka website di HP (baik Android maupun iPhone), website langsung otomatis menyelaraskan (*silent pull*) data terbaru dari Database Cloud dalam waktu **50 milidetik**.
* Dilengkapi parameter *cache-buster* (`&_t=timestamp`), memastikan peramban HP tidak menampilkan data basi/cache lama.

### B. Sinkronisasi Antar-Perangkat Real-Time (*Multi-Device Live Sync*):
* Sistem menjalankan mesin *background polling* otomatis setiap **15 detik**.
* **Skenario Nyata**: Misalnya Ibu Guru **Tita Rosita** mengunggah foto laporan kegiatan madrasah di HP beliau. Dalam hitungan detik (maksimal 15 detik), seluruh HP dewan guru lain yang sedang membuka website akan **secara otomatis menampilkan foto dan kegiatan yang diunggah oleh Bu Tita** tanpa perlu melakukan refresh halaman secara manual!
* Ketika guru berpindah aplikasi di HP lalu kembali membuka website (*visibilitychange / window focus*), website seketika memeriksa dan memuat pembaruan data terbaru.

### C. Input Data Apapun Langsung Otomatis Tersimpan ke Cloud (*Auto-Push*):
* Setiap kali guru atau wali kelas melakukan penginputan atau perubahan data:
  1. **Dokumentasi Kegiatan** (Tambah / Edit / Hapus Foto & Laporan) $\rightarrow$ otomatis tersimpan ke Google Drive & Database Cloud.
  2. **Presensi Siswa Harian** (Simpan Presensi / Edit Presensi / Hapus Riwayat) $\rightarrow$ otomatis tersinkron ke lembar `PRESENSI_SISWA` secara simetris (10 kolom rapi).
  3. **Presensi Mandiri Guru & Selfie** $\rightarrow$ foto tersimpan ke folder Google Drive dan data kehadiran masuk ke lembar `PRESENSI_GURU`.
  4. **Jurnal KBM Harian** $\rightarrow$ otomatis tercatat ke lembar `JURNAL_KBM`.
  5. **Data Siswa & Pendidik** $\rightarrow$ langsung tersinkron ke lembar `DATA_SISWA` dan `DATA_GURU`.

### D. Indikator Status Real-Time (*Live Sync Pill*):
* Tombol manual yang membingungkan telah disingkirkan dari navigasi harian guru.
* Digantikan oleh **Badge Indikator Real-Time** beranimasi hijau berdenyut halus:
  `🟢 Auto-Sync Cloud Aktif`
* Saat data sedang dikirim/ditarik di latar belakang, badge berubah menjadi:
  `🔄 Menyinkronkan...`
  dan kembali ke hijau stabil setelah selesai.

---

## 📸 2. Solusi Anti-Blokir Gambar Google Drive di Semua HP

Agar foto dokumentasi yang diunggah ke Google Drive dapat dimuat secara instan oleh seluruh merek HP tanpa masalah *403 Forbidden* atau pembatasan *cross-origin*:

1. **Google Drive Thumbnail API Beresolusi Tinggi (`sz=w1200`)**:
   - Sistem secara otomatis mengonversi tautan berkas Google Drive menjadi endpoint gambar berkecepatan tinggi:  
     `https://drive.google.com/thumbnail?id=FILE_ID&sz=w1200`
2. **Atribut `referrerpolicy="no-referrer"`**:
   - Seluruh tag `<img>` galeri dilengkapi kebijakan *no-referrer* untuk mencegah server Google memblokir pemuatan gambar eksternal di peramban seluler.
3. **Mekanisme *Cascading Multi-Step Fallback***:
   - Jika satu tautan mengalami kendala jaringan, gambar secara otomatis mencoba alternatif:  
     `Thumbnail Google` $\rightarrow$ `Google Usercontent LH3 CDN` $\rightarrow$ `Drive UC View` $\rightarrow$ `Ikon Lokal`.
4. **Tombol Tautan Drive Langsung**:
   - Setiap kartu dokumentasi dilengkapi tombol hijau **`Drive`** sehingga dewan guru dapat langsung membuka dan mengunduh berkas gambar asli beresolusi penuh di Google Drive dengan satu sentuhan.

---

## 🛠️ 3. Langkah Pembaruan Kode di Google Apps Script (Hanya 1 Menit)

Untuk memastikan endpoint Google Spreadsheet & Google Drive Anda mendukung fitur terbaru:

1. Buka Google Spreadsheet madrasah Anda: **`SIMADRASAH_AL_IKHLASH_DATABASE`**.
2. Klik menu **Ekstensi (Extensions)** > **Apps Script**.
3. **Pilih semua teks kode lama (Ctrl + A)**, lalu hapus.
4. Buka berkas **`google_apps_script.js`** di folder proyek ini, salin (**Ctrl + C**) seluruh isinya dan tempel (**Ctrl + V**) ke dalam editor Apps Script.
5. Klik ikon **Simpan (Disket)**.
6. Klik tombol biru **Terapkan (Deploy)** di pojok kanan atas > pilih **Kelola penerapan (Manage deployments)**:
   - Klik ikon **Pensil (Edit)** di sebelah kanan penerapan aktif Anda.
   - Pada kolom Versi, klik dan pilih **Versi baru (New version)**.
   - Pastikan *Akses* disetel ke: **Siapa saja (Anyone)**.
   - Klik tombol **Terapkan (Deploy)**.
7. Selesai! Web App Google Spreadsheet siap melayani auto-sinkronisasi dua arah secara real-time.

---

## 📋 4. Format Tabel Database Resmi

### A. Lembar `PRESENSI_SISWA` (10 Kolom Presisi):
| Kolom A | Kolom B | Kolom C | Kolom D | Kolom E | Kolom F | Kolom G | Kolom H | Kolom I | Kolom J |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **No** | **Waktu Simpan** | **Tanggal Presensi** | **Rombel / Kelas** | **Guru Pengisi** | **NISN** | **Nama Peserta Didik** | **Jenis Kelamin** | **Status (H/S/I/A)** | **Catatan Khusus Siswa** |

### B. Lembar `DOKUMENTASI_KEGIATAN` (8 Kolom Standar + Guru Penanggung Jawab + Link Google Drive):
| Kolom A | Kolom B | Kolom C | Kolom D | Kolom E | Kolom F | Kolom G | Kolom H |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **No** | **ID Kegiatan** | **Tanggal Kegiatan** | **Judul Kegiatan** | **Kategori Kurikulum** | **Guru Penanggung Jawab** | **Deskripsi & Ringkasan Kegiatan** | **Tautan Foto / Video Google Drive** |

---

## 🛡️ Hak Cipta & Integritas Sistem

* **Pemilik Hak Cipta Sah**: **NULI MAULANA, S.Pd**
* **Pengembang & Penulis Sistem**: **`<nmcode/>`**
* Sistem ini didedikasikan secara eksklusif untuk kemajuan pendidikan **Madrasah Aliyah Al-Ikhlash Sindangsari, Cikaum, Kabupaten Subang**.

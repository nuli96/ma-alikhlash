# PANDUAN PENGGUNAAN SISTEM INFORMASI & PRESENSI MADRASAH (SIMADRASAH)
**MADRASAH ALIYAH AL-IKHLASH — SINDANGSARI, CIKAUM, KABUPATEN SUBANG**  
*Bidang Kurikulum & Kependidikan Madrasah (Tahun Ajaran 2026/2027 - Ganjil)*  
*Arsitektur & Penulis/Pembuat Web: `nmcode`*

---

Selamat datang, Bapak/Ibu Wakil Kepala Madrasah Bidang Kurikulum dan Operator Madrasah.  
Sistem Informasi & Presensi Terpadu **MA Al-Ikhlash** telah disesuaikan secara menyeluruh dengan:
1. **Lambang Resmi Yayasan Al-Ikhlash**: Perisai segilima hijau, bintang, padi & kapas, Al-Qur'an terbuka, kaligrafi Allah, tahun 2007, dan semboyan *Ilmu Amaliyah Amal Ilmiah*.
2. **Alamat Resmi Lembaga**: `KP KRAJAN TENGAH RT/RW 12/03 DESA SINDANGSARI KECAMATAN CIKAUM KABUPATEN SUBANG`.
3. **Pemberlakuan Sistem Keamanan Ganda**:
   - **Admin Gate (Operator & Kurikulum)**: Melindungi perubahan master data guru, siswa, dan profil madrasah.
   - **Teacher Gate (Pintu Masuk Presensi Guru)**: Melindungi absensi selfie dan jurnal mengajar khusus bagi dewan guru terdaftar.
4. **Fitur Rekap Presensi Siswa Fleksibel**: Pemilihan tanggal (hari/bulan/tahun), identitas guru pengisi absensi harian, dan fitur ekspor langsung ke berkas Microsoft Excel (.xls).

---

## 🏛️ Identitas Resmi Lembaga (Sesuai EMIS & Kemenag)

| Parameter | Data Resmi Madrasah |
| :--- | :--- |
| **Nama Madrasah** | **MADRASAH ALIYAH AL-IKHLASH** |
| **Status Lembaga** | Swasta (Bentuk SP: MA) |
| **NSM** | `131232130037` |
| **NPSN** | `70049578` |
| **Peringkat Akreditasi** | **B** |
| **Tahun Pelajaran** | 2026/2027 - Ganjil |
| **Lembaga Penyelenggara** | Yayasan Al-Ikhlash |
| **Afiliasi Keagamaan** | Nahdlatul Ulama (NU) |
| **Waktu Belajar** | Pagi |
| **Alamat Lengkap** | **KP KRAJAN TENGAH RT/RW 12/03 DESA SINDANGSARI KECAMATAN CIKAUM KABUPATEN SUBANG** |
| **Titik Koordinat** | `-6.4600709, 107.7299263` |
| **Ijin Operasional** | SK No. 962 TAHUN 2023 (Tgl: 2023-11-03) |
| **SK Kemenkumham** | AHU-0017151.AH.01.12.TAHUN 2021 |
| **Kontak WhatsApp/Telp** | `085119912112` |
| **Email Resmi** | `MAALIKHLASHSINDANGSARI@GMAIL.COM` |

---

## 🔐 1. Akses Keamanan Operator (Admin Gate)

Kotak petunjuk username/password di layar popup telah **dihapus** demi privasi, sehingga hanya pihak Administrator / Waka Kurikulum yang mengetahui kredensial masuk:

- **Username**: `admin`
- **Password**: `nmcode`

### Tata Cara Masuk:
1. Klik tombol **"Admin / Operator"** di pojok kanan atas.
2. Masukkan Username (`admin`) dan Password (`nmcode`).
3. Klik tombol **"Buka Panel Operator"**.
4. Setelah selesai mengelola data, klik tombol **"Kunci & Keluar"** untuk mengamankan kembali akses.

---

## 🔑 2. Akses Pintu Masuk Guru (Teacher Gate)

Setiap kali menu **"Absensi Guru"** diakses, sistem akan meminta verifikasi dewan guru terdaftar:

1. **Pilih Nama Guru**: Pilih nama Anda dari daftar dewan guru yang terdaftar.
2. **Kode Masuk Guru (PIN)**: Masukkan kode akses unik Anda (contoh kode bawaan: nama depan + `123` seperti `TITA123`, `MIMI123`, `RIZKI123`, `CAHAYA123`, dsb).
3. Setelah berhasil masuk, bilah hijau atas akan menampilkan:  
   `Pendidik Terautentikasi: [Nama Guru]`  
   dan form selfie maupun agenda KBM otomatis terisi sesuai identitas guru yang aktif.
4. Tersedia tombol **"Ganti Pendidik / Kunci"** untuk berganti ke guru lainnya.

### Pengelolaan Kode Masuk Guru oleh Operator:
- Buka menu **Admin / Operator** > Tab **"Kelola Kode Masuk Guru"**.
- Operator dapat melihat seluruh kode masuk dewan guru, mengubah kode secara manual, atau mengklik tombol **"Acak"** / **"Buat Ulang Semua Kode Otomatis"**.
- Saat menambah guru baru, kolom *Kode Masuk Guru (PIN)* otomatis disediakan tombol *Acak Kode*.

---

## 📊 3. Fitur Database & Riwayat Kehadiran Siswa (Alur Logika Kurikulum)

Pada menu **"Cek Kehadiran Siswa"**, sistem kini dilengkapi dengan **List Database & Riwayat Presensi Tersimpan** dengan alur logika terstruktur sesuai arahan kurikulum madrasah:

```
[1. Atur Tanggal] ➔ [2. Atur Guru Pengisi] ➔ [3. Pilih Kelas 1/2/3] ➔ [4. Input Kehadiran] ➔ [5. Klik Simpan]
                                                                                            │
                                                  [6. Riwayat Tersimpan & Fitur Edit Kesalahan] ◄─┘
```

### A. Alur Kerja Penginputan & Pengecekan Presensi:
1. **Langkah 1 (Atur Tanggal)**:
   - Pilih tanggal presensi pada pemilih kalender.
   - **Logika Otomatis Pengecekan Tanggal**:
     - Jika memilih tanggal yang **sudah pernah disimpan** (misalnya tanggal **07/10/2026**), sistem langsung secara otomatis memuat rekaman kehadiran siswa, guru yang mencatat, serta waktu penyimpanan, disertai penanda hijau:  
       `✓ Status Presensi: TERDATA & TERSIMPAN DI DATABASE`.
     - Jika memilih tanggal yang **belum ada kehadiran** (misalnya tanggal hari ini atau **10/10/2026**), data siswa **otomatis KOSONG** (semua tombol H/S/I/A tidak tercentang, status `- Belum Diisi`), disertai penanda peringatan:  
       `⚠️ Status Presensi: DATA KOSONG (Belum Ada Kehadiran Siswa)`.
2. **Langkah 2 (Atur Guru Pengisi)**:
   - Pilih nama pendidik / wali kelas / guru piket yang bertanggung jawab mencatat presensi pada hari tersebut.
3. **Langkah 3 (Pilih Rombongan Belajar)**:
   - Klik tab **Kelas 1 (X)**, **Kelas 2 (XI)**, atau **Kelas 3 (XII)**.
   - Antarmuka kini difokuskan pada kotak pencarian cepat (*Live Search NISN & Nama Siswa*). Tulisan "A-Z" dan bilah alfabet telah disederhanakan agar tampilan lebih bersih, profesional, dan to-the-point.
4. **Langkah 4 (Input Kehadiran Siswa)**:
   - Klik tombol cepat status kehadiran per siswa: **H** (Hadir), **S** (Sakit), **I** (Izin), atau **A** (Alpa).
   - Menekan tombol yang sama untuk kedua kalinya akan membatalkan pilihan (kembali netral/kosong).
   - Terdapat tombol praktis **"Tandai Semua Hadir (H)"** untuk efisiensi waktu, serta tombol **"Kosongkan Semua Pilihan"** jika ingin mereset.
   - Kolom **Catatan Khusus Siswa** dapat diisi keterangan (misal: "Sakit demam, surat terlampir").
5. **Langkah 5 (Klik Simpan Data Presensi)**:
   - Klik tombol hijau **"💾 Simpan Data Presensi"** di bagian bawah tabel.
   - Data langsung tersimpan secara permanen ke Database Arsip LocalStorage, memunculkan notifikasi sukses, dan memperbarui rekapitulasi kehadiran.

### B. List Database Arsip & Fitur Koreksi (Edit Kesalahan):
1. Klik tab **"2. Database & Riwayat Presensi Tersimpan"** di bagian atas menu kehadiran siswa.
2. Anda akan melihat seluruh arsip sesi presensi yang pernah disimpan, lengkap dengan:
   - Tanggal Presensi (Masehi & format kalender)
   - Rombel / Kelas (Kelas 1, Kelas 2, Kelas 3)
   - Nama Guru Pengisi / Piket
   - Rekap Kehadiran (Jumlah Hadir, Sakit, Izin, Alpa)
   - Waktu & Jam Penyimpanan
3. **Fitur "✏️ Buka & Edit"**:
   - Jika terdapat kesalahan data (misal siswa yang semula ditandai Alpa ternyata mengirimkan surat izin atau sakit), klik tombol **"Buka & Edit"** pada baris tanggal tersebut.
   - Sistem akan langsung membuka kembali sesi presensi tersebut pada formulir input, memuat data yang tersimpan, dan mengaktifkan mode **"✏️ Perbarui Data Presensi"**.
   - Lakukan perbaikan status siswa, lalu klik **"Perbarui Data Presensi"** untuk menyimpan revisi ke database.
4. **Fitur "📥 Unduh Excel (.xls)"**:
   - Dapat diunduh langsung baik dari sesi aktif maupun dari setiap baris di tabel arsip database.
   - Menghasilkan format berkas spreadsheet resmi dengan kop MA Al-Ikhlash, NISN teks utuh, dan rincian kehadiran lengkap.
5. **Filter Arsip**:
   - Disediakan filter cepat berdasarkan Kelas maupun Tanggal tertentu untuk mempermudah audit kurikulum.

---

## 📋 4. Pemisahan Hak Akses & Supervisi Kurikulum (Menu Admin vs Absensi Guru)

Sesuai instruksi kebijakan kurikulum madrasah, SIMADRASAH memisahkan hak akses dan visibilitas data secara ketat antara **Menu Admin / Operator** dan **Menu Absensi Guru**:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           SUPERVISI KURIKULUM MADRASAH                          │
├──────────────────────────────────────┬──────────────────────────────────────────┤
│        MENU OPERATOR / ADMIN         │            MENU ABSENSI GURU             │
│    (Semua Agenda Seluruh Guru)       │        (Hanya Guru Itu Sendiri)          │
├──────────────────────────────────────┼──────────────────────────────────────────┤
│ 1. Full Jurnal Refleksi Dewan Guru   │ 1. Presensi Mandiri (Selfie)             │
│    (Seluruh catatan KBM semua guru)  │    (Nama terkunci ke guru yang login)    │
│ 2. Full Rekap Presensi Pendidik      │ 2. Catat Aktivitas KBM                   │
│    (Seluruh foto selfie & jam hadir) │    (Nama terkunci ke guru yang login)    │
│ 3. Matriks Guru & Mapel (Kode 1-17)  │ 3. Jurnal Refleksi Mengajar Saya         │
│    (Master SK pembagian tugas)       │    (Hanya rekaman KBM guru yang login)   │
│ 4. Koreksi Data & Gelar Guru         │ 4. Riwayat Presensi Saya Hari Ini        │
│ 5. Kelola Kode Masuk Guru (PIN)      │    (Hanya rekaman selfie guru yang login)│
│ 6. Koreksi & Kelola Nama Siswa       │ 5. Matriks Jadwal Saya (Kode 1-17)       │
│ 7. Identitas Lembaga & Upload Logo   │    (Highlight tugas & kode guru aktif)   │
└──────────────────────────────────────┴──────────────────────────────────────────┘
```

### A. Fitur pada Menu Absensi Guru (Portal Guru Terautentikasi):
1. **Keamanan Teacher Gate**: Pendidik wajib memilih nama dan memasukkan PIN / kode masuk pribadi.
2. **Formulir Terkunci Mandiri**: Pilihan pendidik pada form foto selfie presensi dan form pencatatan aktivitas KBM otomatis terkunci pada nama guru yang sedang login. Nama guru lain tidak dimunculkan di dalam daftar pilihan untuk mencegah salah pilih.
3. **Sub 3: Jurnal Refleksi Mengajar Saya**: Hanya menampilkan daftar jurnal pembelajaran yang diinput oleh guru yang bersangkutan.
4. **Sub 4: Riwayat Presensi Saya Hari Ini**: Hanya menampilkan riwayat kehadiran dan foto selfie milik guru yang bersangkutan.
5. **Sub 5: Matriks Jadwal Saya (Kode 1-17)**: Menampilkan banner sambutan personal berisi kode mengajar dan mata pelajaran yang diampu, serta menandai baris tugas mengajar guru dengan highlight hijau khusus pada tabel matriks.

### B. Fitur pada Menu Admin / Operator Kurikulum:
1. **Keamanan Admin Gate**: Terlindungi dengan Username: `admin` dan Password: `nmcode`.
2. **Full Jurnal Refleksi Dewan Guru**:
   - Menampilkan seluruh catatan jurnal pembelajaran dari seluruh dewan guru.
   - Dilengkapi filter pencarian berdasarkan nama dewan guru dan filter rombongan belajar (Kelas 1, 2, 3).
   - Dilengkapi penghitung total catatan jurnal KBM.
   - Dilengkapi tombol cetak laporan resmi dan opsi hapus jika terdapat kesalahan entri.
3. **Full Rekapitulasi Presensi Pendidik**:
   - Menampilkan seluruh riwayat presensi selfie, jam kehadiran/kepulangan, dan dinas luar seluruh guru hari ini.
   - Dilengkapi filter per dewan guru dan filter status presensi (Tepat Waktu, Terlambat, Dinas Luar, Izin/Sakit).
   - Menampilkan foto selfie, NIP, jam rekam, dan status geotagging.
   - Dilengkapi tombol cetak rekapitulasi harian dan tombol hapus rekaman presensi.
4. **Matriks Resmi Guru & Mapel (Kode 1-17)**:
   - Menampilkan master tabel pembagian tugas mengajar Kelompok 1 (Kode 1-9) dan Kelompok 2 (Kode 10-17) untuk keperluan administrasi dan SK kurikulum madrasah.
5. **Fleksibilitas Pengisian NIP Pendidik (Opsional / Boleh Kosong)**:
   - Mengakomodasi fakta bahwa tidak semua dewan guru madrasah berstatus PNS atau sudah memiliki NIP/NUPTK.
   - Operator dapat mengisi nomor NIP atau mengosongkannya dengan mengklik tombol **"Kosongkan NIP (-)"**.
   - Pendidik tanpa NIP akan ditampilkan rapi dengan badge `Belum Memiliki NIP (-)` pada master data, tabel presensi, maupun formulir absensi harian.

---

## ☁️ 5. Panduan Sinkronisasi & Backup Database ke Google Sheets & Google Drive

SIMADRASAH kini telah terintegrasi dengan **Pusat Sinkronisasi Google Sheets & Backup Cloud** (100% Gratis tanpa biaya hosting):

### A. Fitur yang Disediakan di Panel Operator:
1. **Tombol "🚀 Sinkronkan & Backup Semua Data ke Google Sheets"**:
   - Sekali klik, seluruh data madrasah (Profil Madrasah, Data Guru, Data Siswa, Jurnal KBM, Presensi Guru, dan Arsip Presensi Siswa) langsung terkirim dan tersimpan rapi ke 6 lembar Google Sheets yang berbeda.
2. **Auto-Sync Realtime (Otomatis)**:
   - Jika centang *Auto-Sync Realtime* diaktifkan, setiap kali guru/wali kelas menekan tombol simpan presensi atau jurnal mengajar, sistem langsung otomatis mencadangkannya detik itu juga ke Google Sheets.
3. **Pencadangan Foto Selfie ke Google Drive**:
   - Foto selfie guru otomatis disimpan sebagai file gambar `.jpg` di Google Drive madrasah dalam folder `BUKTI_PRESENSI_MA_AL_IKHLASH`, dan link fotonya dicatat di baris spreadsheet.
4. **Tombol "📥 Unduh Backup Lengkap (.JSON)"**:
   - Mengunduh salinan cadangan offline 1 file `.json` lengkap ke komputer atau flashdisk.
5. **Tombol "📤 Pulihkan / Restore dari (.JSON)"**:
   - Jika berganti komputer atau laptop diinstal ulang, cukup upload berkas `.json` tersebut dan 100% seluruh data langsung kembali seperti semula.

### B. Cara Memasang Google Sheets dalam 3 Menit:
1. Buat Google Spreadsheet baru di akun Google madrasah: [sheets.new](https://sheets.new), beri judul: `SIMADRASAH_AL_IKHLASH_DATABASE`.
2. Klik menu **Ekstensi** > **Apps Script**.
3. Buka berkas [google_apps_script.js](file:///c:/Users/DELL/Downloads/PROJECT%20WEBSITE%20SEKOLAH/google_apps_script.js) di folder proyek ini, salin seluruh kodenya, lalu tempel (*paste*) ke editor Apps Script dan klik **Simpan** (ikon disket).
4. Klik tombol biru **Deploy (Terapkan)** > **Deployment baru (New deployment)**:
   - Pilih Jenis: **Aplikasi Web (Web App)**
   - Jalankan sebagai: **Saya (Akun Google Madrasah)**
   - Akses: **Siapa Saja (Anyone)** -> *Penting agar peramban bisa mengirim data*
5. Klik **Deploy**, beri izin Google jika diminta.
6. Salin URL Web App yang berakhiran `/exec`.
7. Buka portal SIMADRASAH > Masuk menu **Admin / Operator** > Tab **"Backup Google Sheets"**, tempel URL tersebut lalu klik **"Simpan URL"**.
8. Klik tombol **"🚀 Sinkronkan & Backup Semua Data ke Google Sheets"**. Buka spreadsheet Anda, dan 6 tab data madrasah akan langsung terisi rapi!

### C. Struktur Kolom Lembar Laporan Google Sheets (Lengkap dengan Tanggal):
1. **Sheet `PRESENSI_GURU`**:
   `No` | **`Tanggal Presensi`** (misal: *08 Oktober 2026*) | `Waktu Absen` (misal: *06:45 WIB*) | `Nama Pendidik` | `NIP / NUPTK` | `Status Kehadiran` | `Jenis Presensi` | `Keterangan` | `Tautan Foto Drive`
2. **Sheet `JURNAL_KBM`**:
   `No` | **`Tanggal`** (misal: *08 Oktober 2026*) | `Jam Mengajar` | `Nama Pendidik` | `Rombel & Mapel` | `Materi Pokok / Capaian Pembelajaran` | `Catatan & Evaluasi KBM`
3. **Sheet `PRESENSI_SISWA`**:
   `No` | `Waktu Simpan` | **`Tanggal Presensi`** (misal: *08/10/2026*) | `Rombel / Kelas` | `Guru Pengisi` | `NISN` | `Nama Peserta Didik` | `Jenis Kelamin` | `Status (H/S/I/A)` | `Catatan Khusus Siswa`

> [!TIP]
> **Cara Memperbarui Google Apps Script Lama:**  
> Jika Anda sebelumnya sudah memasang skrip di Google Spreadsheet:
> 1. Buka kembali Google Spreadsheet > menu **Ekstensi** > **Apps Script**.
> 2. Ganti seluruh kodenya dengan isi berkas [`google_apps_script.js`](file:///c:/Users/DELL/Downloads/PROJECT%20WEBSITE%20SEKOLAH/google_apps_script.js) terbaru.
> 3. Klik tombol **Simpan**, lalu klik tombol biru **Deploy** > **Kelola deployment** (Manage deployments) > ikon pensil **Edit** > ubah Versi ke **Versi baru (New version)** > klik **Deploy**.
> 4. Buka kembali website SIMADRASAH dan klik **"🚀 Sinkronkan & Backup Semua Data ke Google Sheets"**. Kolom **Tanggal Presensi** akan otomatis muncul dan terisi rapi!

---

## 📁 Struktur Berkas Proyek

```
PROJECT WEBSITE SEKOLAH/
├── index.html                   # Halaman utama portal SIMADRASAH
├── PETUNJUK_PENGGUNAAN.md       # Buku panduan lengkap (berkas ini)
├── google_apps_script.js        # Skrip endpoint siap pakai untuk Google Sheets & Drive
├── css/
│   └── style.css               # Desain visual tema hijau madrasah & putih sejuk
├── js/
│   └── app.js                  # Logika presensi kamera, Admin Gate, & Cloud Sync API
└── assets/
    └── images/                 # Folder lokal lambang & dokumentasi madrasah
        ├── logo-madrasah.svg   # Lambang resmi Yayasan Al-Ikhlash (vektor tajam)
        ├── kegiatan-1.svg      # Dokumentasi Supervisi KMA 450
        ├── kegiatan-2.svg      # Dokumentasi Apel Hari Santri
        ├── kegiatan-3.svg      # Dokumentasi Asesmen Berbasis Komputer
        └── kegiatan-4.svg      # Dokumentasi Tahfidzul Qur'an & Tilawah
```

---

## 🌐 6. Panduan Meng-Online-kan Website SIMADRASAH (Akses Seluruh Guru dari HP & Laptop)

Website SIMADRASAH dibangun dengan arsitektur **Client-Side Web Application** (HTML5 murni, CSS3, dan Vanilla JavaScript). Artinya:
- **100% Gratis Selamanya** — Tidak memerlukan sewa server bulanan atau database MySQL rumit.
- **Kamera HP Wajib HTTPS** — Fitur presensi selfie kamera di HP guru (Google Chrome / Safari) membutuhkan protokol aman berawalan `https://`. Seluruh platform hosting gratis di bawah ini sudah menyediakan **HTTPS / SSL resmi otomatis**.

---

### ⚠️ Langkah Wajib Sebelum Di-Online-kan (1 Menit):
Agar seluruh HP guru langsung otomatis terkoneksi ke Google Sheets madrasah tanpa perlu menyetel URL satu per satu di HP masing-masing:
1. Buka berkas [`js/app.js`](file:///c:/Users/DELL/Downloads/PROJECT%20WEBSITE%20SEKOLAH/js/app.js) pada baris **2569**.
2. Cari kode:
   ```javascript
   const DEFAULT_GAS_ENDPOINT_URL = "";
   ```
3. Tempelkan URL Web App Google Apps Script madrasah Anda di antara tanda kutip, contoh:
   ```javascript
   const DEFAULT_GAS_ENDPOINT_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
   ```
4. Simpan berkas (`Ctrl + S`).

---

### Opsi 1: Paling Mudah & Cepat (< 1 Menit, Tanpa Koding) — Netlify Drop
Metode ini adalah cara paling instan dan paling disukai karena tidak memerlukan instalasi aplikasi apa pun.

1. Buka situs [app.netlify.com/drop](https://app.netlify.com/drop) di peramban komputer/laptop.
2. Buat akun gratis (bisa menggunakan *Sign in with Google*).
3. Seret (*drag and drop*) seluruh folder proyek **`PROJECT WEBSITE SEKOLAH`** langsung ke kotak bertuliskan *"Drag and drop your site output folder here"*.
4. Tunggu proses unggah sekitar 10–20 detik.
5. **Website langsung online!** Netlify akan memberikan alamat tautan aktif berprotokol `https://`.
6. **Kustomisasi Nama Link (Gratis)**:
   - Klik menu **Site Configuration** > **Change site name**.
   - Ubah nama menjadi, misalnya: `simadrasah-alikhlash.netlify.app`.
   - Klik **Save**.
7. Salin link tersebut dan bagikan ke grup WhatsApp dewan guru madrasah!

---

### Opsi 2: Super Cepat & Performa Tinggi — Vercel
1. Buka situs [vercel.com](https://vercel.com) dan masuk menggunakan akun Google / GitHub.
2. Klik tombol **"Add New..."** > **"Project"**.
3. Jika menggunakan GitHub, hubungkan repositori Anda, atau unggah folder proyek.
4. Klik **Deploy**.
5. Dalam 15 detik website Anda telah aktif di link seperti `https://simadrasah-alikhlash.vercel.app`.

---

### Opsi 3: Portofolio Developer & Permanen — GitHub Pages
1. Buat akun di [github.com](https://github.com).
2. Buat repositori baru, misalnya beri nama `simadrasah-alikhlash` (setel menjadi *Public*).
3. Unggah seluruh isi berkas dari folder `PROJECT WEBSITE SEKOLAH` (`index.html`, folder `css`, folder `js`, folder `assets`, dll) ke repositori tersebut.
4. Buka tab **Settings** di repositori GitHub > klik menu **Pages** di bilah kiri.
5. Pada bagian **Build and deployment** > **Branch**, pilih `main` (atau `master`) dan folder `/ (root)`, lalu klik **Save**.
6. Tunggu sekitar 1-2 menit, website madrasah akan aktif di alamat:  
   `https://[username-github-anda].github.io/simadrasah-alikhlash/`

---

### Opsi 4: Domain Resmi Madrasah (cPanel / Subdomain `.sch.id`)
Jika MA Al-Ikhlash sudah memiliki website resmi madrasah (misalnya `maalikhlash.sch.id`):
1. Masuk ke cPanel hosting madrasah.
2. Buat subdomain baru (misal: `presensi.maalikhlash.sch.id`).
3. Buka **File Manager** cPanel dan masuk ke folder subdomain tersebut (atau `public_html`).
4. Kompres folder `PROJECT WEBSITE SEKOLAH` menjadi file `.zip`, lalu unggah (*upload*) ke File Manager.
5. Ekstrak file `.zip` tersebut sehingga berkas `index.html` berada tepat di dalam folder subdomain.
6. Website madrasah kini resmi dapat diakses di `https://presensi.maalikhlash.sch.id`.

---

### 📱 7. Tata Cara Dewan Guru Mengakses Melalui HP (Android & iPhone)

Setelah link online dibagikan ke grup WhatsApp madrasah:

1. **Buka Tautan di Browser HP**:
   - Guru membuka link (misal: `https://simadrasah-alikhlash.netlify.app`) di **Google Chrome** (Android) atau **Safari** (iPhone).
2. **Pilih Menu "Absensi Guru"**:
   - Guru memilih namanya di daftar pendidik.
   - Masukkan **Kode Masuk Guru (PIN)** masing-masing (contoh: `TITA123`, `MIMI123`, dsb).
3. **Izinkan Akses Kamera**:
   - Saat pertama kali mengambil selfie presensi, browser HP akan menampilkan dialog *"Izinkan situs ini menggunakan kamera Anda?"*.
   - Pilih **"Izinkan" / "Allow"**.
4. **Presensi & Jurnal KBM**:
   - Ambil foto selfie, pilih status (Hadir/Dinas Luar), klik simpan.
   - Isi materi KBM di formulir jurnal mengajar, klik simpan.
   - Data otomatis terkirim dan tercatat di Google Sheets & Google Drive madrasah!

> [!TIP]
> **Cara Pasang Aplikasi di Layar Utama HP Guru (Tanpa Install dari Playstore):**  
> Agar guru tidak perlu repot mencari link WhatsApp setiap hari:  
> - Di **Android (Google Chrome)**: Buka web > tekan tanda titik tiga (⋮) di pojok kanan atas browser > pilih **"Tambahkan ke Layar Utama" (Add to Home screen)**.  
> - Di **iPhone (Safari)**: Buka web > tekan tombol Bagikan (ikon kotak panah ke atas) > pilih **"Tambahkan ke Layar Utama" (Add to Home Screen)**.  
> - Ikon resmi MA Al-Ikhlash akan langsung muncul di menu HP guru seperti aplikasi native!

---

## 🚀 Cara Menjalankan Secara Offline / Lokal

1. Buka folder `c:\Users\DELL\Downloads\PROJECT WEBSITE SEKOLAH`.
2. Klik ganda berkas [`index.html`](file:///c:/Users/DELL/Downloads/PROJECT%20WEBSITE%20SEKOLAH/index.html).
3. Halaman portal madrasah langsung terbuka di peramban tanpa memerlukan koneksi internet tambahan.
4. Seluruh arsitektur sistem dikembangkan oleh: `<code><nmcode/></code>`.


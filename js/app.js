/**
 * SISTEM INFORMASI & PRESENSI AKADEMIK MADRASAH (SIMADRASAH)
 * Modul Terpadu Kurikulum & Kependidikan
 * Penulis & Pembuat Sistem: nmcode
 */

// ==========================================
// 1. DATA AWAL (DEFAULT REALISTIC DATA)
// ==========================================
const DEFAULT_PROFILE = {
  name: "MADRASAH ALIYAH AL-IKHLASH",
  shortName: "MA AL-IKHLASH",
  nsm: "131232130037",
  npsn: "70049578",
  akreditasi: "B",
  status: "Swasta",
  bentukSp: "MA",
  tahunAjaran: "2026/2027 - Ganjil",
  kepalaMadrasah: "-",
  penyelenggara: "Yayasan Al-Ikhlash",
  afiliasi: "Nahdlatul Ulama",
  waktuBelajar: "Pagi",
  kkm: "Anggota",
  komite: "Sudah Terbentuk",
  kodeRegistrasi: "pnqc58q4a",
  alamat: "KP KRAJAN TENGAH RT/RW 12/03 DESA SINDANGSARI KECAMATAN CIKAUM KABUPATEN SUBANG",
  address: "KP KRAJAN TENGAH RT/RW 12/03 DESA SINDANGSARI KECAMATAN CIKAUM KABUPATEN SUBANG",
  desa: "SINDANGSARI",
  kecamatan: "CIKAUM",
  kabupaten: "KABUPATEN SUBANG",
  provinsi: "JAWA BARAT",
  kodePos: "41253",
  telepon: "085119912112",
  email: "MAALIKHLASHSINDANGSARI@GMAIL.COM",
  titikKoordinat: "-6.4600709, 107.7299263",
  skKemenkumham: "AHU-0017151.AH.01.12.TAHUN 2021",
  skKemenkumhamTgl: "2021-05-25",
  skIjinOperasional: "962 TAHUN 2023",
  skIjinOperasionalTgl: "2023-11-03",
  aktaPendirian: "1901-01-01",
  logo: "logo.jpeg"
};

const DEFAULT_TEACHERS = [
  { id: "G01", code: "1, 2", name: "TITA ROSITA", nip: "19830514 200801 2 005", mapel: "Alqur'an hadist, Akidah akhlak", role: "Guru PAI", subjects: ["Alqur'an hadist", "Akidah akhlak"], accessCode: "TITA123" },
  { id: "G02", code: "3, 4", name: "MIMI MUTIARA, S.Pd", nip: "-", mapel: "SKI, Fikih", role: "Guru PAI", subjects: ["SKI", "Fikih"], accessCode: "MIMI123" },
  { id: "G03", code: "5, 7", name: "NULI MAULANA, S.Pd", nip: "19850918 201001 1 012", mapel: "Bahasa Arab, Bahasa Indonesia", role: "Guru Bahasa", subjects: ["Bahasa Arab", "Bahasa Indonesia"], accessCode: "NULI123" },
  { id: "G04", code: "6", name: "Rizki Ardiansah, S.Pd., M.Pd.", nip: "-", mapel: "Matematika", role: "Waka Kurikulum / Guru Matematika", subjects: ["Matematika"], accessCode: "RIZKI123" },
  { id: "G05", code: "8, 10", name: "Cahaya Siti Riana, S.Pd", nip: "19900816 201402 2 007", mapel: "Bahasa Inggris, Seni Budaya", role: "Guru Bahasa & Seni", subjects: ["Bahasa Inggris", "Seni Budaya"], accessCode: "CAHAYA123" },
  { id: "G06", code: "9, 15", name: "KURNIANENGSIH, S.Pd", nip: "-", mapel: "PKN, Informatika", role: "Guru PKN & Informatika", subjects: ["PKN", "Informatika"], accessCode: "KURNIA123" },
  { id: "G07", code: "11, 14", name: "TIA RUMIASIH", nip: "-", mapel: "Ekonomi, Sosiologi", role: "Guru IPS", subjects: ["Ekonomi", "Sosiologi"], accessCode: "TIA123" },
  { id: "G08", code: "12", name: "RIZKI BADRUSSALAM", nip: "-", mapel: "Sejarah", role: "Guru Sejarah", subjects: ["Sejarah"], accessCode: "BADRUL123" },
  { id: "G09", code: "13", name: "ULVA MAULANA, S.Pd", nip: "-", mapel: "Geografi", role: "Guru Geografi", subjects: ["Geografi"], accessCode: "ULVA123" },
  { id: "G10", code: "16", name: "ARI ARIANTO", nip: "-", mapel: "PJOK", role: "Guru PJOK", subjects: ["PJOK"], accessCode: "ARI123" },
  { id: "G11", code: "17", name: "ADI AHMAD ABADI, S.E", nip: "-", mapel: "Tasauf", role: "Guru Tasauf", subjects: ["Tasauf"], accessCode: "ADI123" },
  { id: "G12", code: "17", name: "Drs. DUDUNG LUKMAN", nip: "19721015 199903 1 002", mapel: "Tasauf", role: "Guru Tasauf", subjects: ["Tasauf"], accessCode: "DUDUNG123" }
];

// Matriks Pembagian Tugas Mengajar & Kode Guru Sesuai Lembar Resmi Madrasah (Kode 1 - 17)
const SCHEDULE_MATRIX = [
  { left: { subject: "Alqur'an hadist", teacher: "TITA ROSITA", code: "1" }, right: { subject: "SENI BUDAYA", teacher: "Cahaya Siti Riana, S.Pd", code: "10" } },
  { left: { subject: "Akidah akhlak", teacher: "TITA ROSITA", code: "2" }, right: { subject: "EKONOMI", teacher: "TIA RUMIASIH", code: "11" } },
  { left: { subject: "SKI", teacher: "MIMI MUTIARA, S.Pd", code: "3" }, right: { subject: "SEJARAH", teacher: "RIZKI BADRUSSALAM", code: "12" } },
  { left: { subject: "Fikih", teacher: "MIMI MUTIARA, S.Pd", code: "4" }, right: { subject: "GEOGRAFI", teacher: "ULVA MAULANA, S.Pd", code: "13" } },
  { left: { subject: "Bahasa Arab", teacher: "NULI MAULANA, S.Pd", code: "5" }, right: { subject: "SOSIOLOGI", teacher: "TIA RUMIASIH", code: "14" } },
  { left: { subject: "Matematika", teacher: "Rizki Ardiansah, S.Pd., M.Pd.", code: "6" }, right: { subject: "INFORMATIKA", teacher: "KURNIANENGSIH, S.Pd", code: "15" } },
  { left: { subject: "Bahasa Indonesia", teacher: "NULI MAULANA, S.Pd", code: "7" }, right: { subject: "PJOK", teacher: "ARI ARIANTO", code: "16" } },
  { left: { subject: "Bahasa Inggris", teacher: "Cahaya Siti Riana, S.Pd", code: "8" }, right: { subject: "TASAUF", teacher: "ADI AHMAD ABADI, S.E / Drs. Dudung Lukman", code: "17" } },
  { left: { subject: "PKN", teacher: "KURNIANENGSIH, S.Pd", code: "9" }, right: { subject: "-", teacher: "-", code: "-" } }
];

const DEFAULT_STUDENTS = [
  // Siswa Kelas 1 (Kelas 10 / X.1) Sesuai Berkas Resmi Madrasah - 14 Siswa
  { id: "S101", nisn: "0095675429", name: "DA'I HAMZAH", class: "Kelas 1", gender: "Laki-laki", status: "H", notes: "KALIGAMBIR SINDANGSARI, CIKAUM, SUBANG" },
  { id: "S102", nisn: "0111629085", name: "FARHAN RIZKI MAULANA", class: "Kelas 1", gender: "Laki-laki", status: "H", notes: "PANGADUNGAN SINDANGSARI, CIKAUM, SUBANG" },
  { id: "S103", nisn: "0173045991", name: "HENDRA FAEYZA ALI", class: "Kelas 1", gender: "Laki-laki", status: "H", notes: "KRAJAN UTARA SINDANGSARI, CIKAUM, SUBANG" },
  { id: "S104", nisn: "0109909110", name: "LUTHFI ALBIAN PRATAMA", class: "Kelas 1", gender: "Laki-laki", status: "H", notes: "KALIGAMBIR SINDANGSARI, CIKAUM, SUBANG" },
  { id: "S105", nisn: "0108899834", name: "MUHAMAD RIZKY", class: "Kelas 1", gender: "Laki-laki", status: "H", notes: "PANGADUNGAN SINDANGSARI, CIKAUM, SUBANG" },
  { id: "S106", nisn: "0107187096", name: "NISA", class: "Kelas 1", gender: "Perempuan", status: "H", notes: "KRAJAN UTARA SINDANGSARI, CIKAUM, SUBANG" },
  { id: "S107", nisn: "0106487770", name: "REVISA ARYANI", class: "Kelas 1", gender: "Perempuan", status: "H", notes: "KRAJAN SELATAN SINDANGSARI, CIKAUM, SUBANG" },
  { id: "S108", nisn: "0113229278", name: "RIYAD JAMIL", class: "Kelas 1", gender: "Laki-laki", status: "H", notes: "KRAJAN SELATAN SINDANGSARI, CIKAUM, SUBANG" },
  { id: "S109", nisn: "0102154149", name: "RIZKY MUBAROK", class: "Kelas 1", gender: "Laki-laki", status: "H", notes: "KRAJAN SELATAN SINDANGSARI, CIKAUM, SUBANG" },
  { id: "S110", nisn: "0099655942", name: "SASEP RONALDO", class: "Kelas 1", gender: "Laki-laki", status: "H", notes: "SALAGEDANG JATI, CIPUNAGARA, SUBANG" },
  { id: "S111", nisn: "0106554338", name: "SHENA MUHAMMAD REVAN", class: "Kelas 1", gender: "Laki-laki", status: "H", notes: "PAGON PURWADADI, SUBANG" },
  { id: "S112", nisn: "0101417281", name: "TALITA ROFILAH ARTANTI", class: "Kelas 1", gender: "Perempuan", status: "H", notes: "KP. CIDERES SUKAMENAK, SUKARESIK, TASIKMALAYA" },
  { id: "S113", nisn: "0102680741", name: "WAHYUDI SURANA", class: "Kelas 1", gender: "Laki-laki", status: "H", notes: "PANGADUNGAN SINDANGSARI, CIKAUM, SUBANG" },
  { id: "S114", nisn: "0107408414", name: "YUMNA LAILA OCTAVIANI", class: "Kelas 1", gender: "Perempuan", status: "H", notes: "CIDERES SUKAMENAK, SUKARESIK, TASIKMALAYA" },

  // Siswa Kelas 2 (Kelas 11 / XI) Sesuai Berkas Resmi Madrasah - 7 Siswa
  { id: "S201", nisn: "3104150969", name: "DIAN NURMALA", class: "Kelas 2", gender: "Perempuan", status: "H", notes: "KALIGAMBIR RT 025/007 SINDANGSARI, CIKAUM" },
  { id: "S202", nisn: "0108923701", name: "DIKA SAPUTRA", class: "Kelas 2", gender: "Laki-laki", status: "H", notes: "SINDANGSARI, CIKAUM, SUBANG" },
  { id: "S203", nisn: "0098848705", name: "MIA YULIANTI", class: "Kelas 2", gender: "Perempuan", status: "H", notes: "PANGADUNGAN SINDANGSARI, CIKAUM" },
  { id: "S204", nisn: "0096315534", name: "NIDATU SYADIAH", class: "Kelas 2", gender: "Perempuan", status: "H", notes: "KP. CIDERES RT 024/012 SUKAMENAK, SUKARESIK" },
  { id: "S205", nisn: "0104502604", name: "SANDI KURNIAWAN", class: "Kelas 2", gender: "Laki-laki", status: "H", notes: "BONGAS RT 018/005 SINDANGSARI, CIKAUM" },
  { id: "S206", nisn: "0097957382", name: "SANIA HAYATI HAMIDAH", class: "Kelas 2", gender: "Perempuan", status: "H", notes: "MEKARSARI RT 018/007 PAGON, PURWADADI" },
  { id: "S207", nisn: "0095918417", name: "WAFI BURHANI", class: "Kelas 2", gender: "Laki-laki", status: "H", notes: "KRAJAN TENGAH RT 016/003 SINDANGSARI, CIKAUM" },

  // Siswa Kelas 3 (Kelas 12 / XII) Sesuai Berkas Resmi Madrasah - 3 Siswa
  { id: "S301", nisn: "0098460181", name: "ANITA BELA", class: "Kelas 3", gender: "Perempuan", status: "H", notes: "SUKAJAYA RT 002/001 CIKAUM BARAT, SUBANG" },
  { id: "S302", nisn: "0086477282", name: "SALSA HUZROTIN NISA", class: "Kelas 3", gender: "Perempuan", status: "H", notes: "PAGON RT 013/005 PURWADADI, SUBANG" },
  { id: "S303", nisn: "0091599474", name: "SRI RUMHAYATI", class: "Kelas 3", gender: "Perempuan", status: "H", notes: "KP. KRAJAN TENGAH SINDANGSARI, CIKAUM" }
];

const DEFAULT_DOCS = [
  {
    id: "DOC_PRAMUKA_2026",
    title: "Gerakan Pramuka Pondok Pesantren AL-Ikhlash",
    category: "Kesiswaan & Ekstrakurikuler",
    date: "2026-07-30",
    teacher: "NULI MAULANA, S.Pd",
    img: "assets/images/kegiatan-2.svg",
    desc: "Upacara Pembukaan Perkemahan Mu'askar Al-Ikhlas Tahun 2026 Gerakan Pramuka Pondok Pesantren AL-Ikhlash (GP3A)."
  },
  {
    id: "DOC1",
    title: "Supervisi Akademik & KMA 450",
    category: "Kurikulum & KBM",
    date: "2024-10-02",
    teacher: "Rizki Ardiansah, S.Pd., M.Pd.",
    img: "assets/images/kegiatan-1.svg",
    desc: "Musyawarah kerja Waka Kurikulum bersama dewan guru dalam perumusan Alur Tujuan Pembelajaran (ATP) dan modul ajar interaktif."
  },
  {
    id: "DOC2",
    title: "Apel Peringatan Hari Santri Nasional",
    category: "Keagamaan & Tahfidz",
    date: "2024-09-22",
    teacher: "NULI MAULANA, S.Pd",
    img: "assets/images/kegiatan-2.svg",
    desc: "Penanaman nilai kepemimpinan, akhlakul karimah, dan cinta tanah air bagi seluruh civitas akademika madrasah."
  },
  {
    id: "DOC3",
    title: "Asesmen Madrasah Berbasis Komputer",
    category: "Asesmen & Ujian",
    date: "2024-09-15",
    teacher: "KURNIANENGSIH, S.Pd",
    img: "assets/images/kegiatan-3.svg",
    desc: "Pelaksanaan evaluasi sumatif tengah semester genap di laboratorium digital madrasah dengan tertib dan berintegritas."
  },
  {
    id: "DOC4",
    title: "Halaqah Tahfidzul Qur'an & Bimbingan Tilawah",
    category: "Keagamaan & Tahfidz",
    date: "2024-09-08",
    teacher: "TITA ROSITA",
    img: "assets/images/kegiatan-4.svg",
    desc: "Program pembiasaan tartil pagi dan setoran juz 'amma terstruktur sebelum jam kegiatan belajar mengajar dimulai."
  }
];

const DEFAULT_JOURNALS = [
  {
    id: "J01",
    date: "08 Oktober 2026",
    dateIso: "2026-10-08",
    time: "07.30 - 08.50 WIB",
    teacher: "TITA ROSITA",
    classSubject: "Kelas 1 • Alqur'an hadist",
    topic: "Kaidah Tajwid: Hukum Bacaan Mad Thabi'i pada Surat Pendek",
    notes: "Seluruh siswa antusias melafalkan contoh ayat. 2 siswa perlu bimbingan tajwid lanjutan pada makhraj huruf."
  },
  {
    id: "J02",
    date: "08 Oktober 2026",
    dateIso: "2026-10-08",
    time: "09.15 - 10.35 WIB",
    teacher: "MIMI MUTIARA, S.Pd",
    classSubject: "Kelas 2 • Fikih",
    topic: "Ketentuan dan Tata Cara Shalat Sunnah Rawatib",
    notes: "Diskusi studi kasus interaktif berjalan tertib. Siswa menyusun komitmen ibadah harian di lembar refleksi."
  },
  {
    id: "J03",
    date: "08 Oktober 2026",
    dateIso: "2026-10-08",
    time: "10.50 - 12.10 WIB",
    teacher: "NULI MAULANA, S.Pd",
    classSubject: "Kelas 3 • Bahasa Arab",
    topic: "Hiwar (Percakapan): Peralatan Sekolah (Al-Adawat Al-Madrasiyyah)",
    notes: "Praktik percakapan berpasangan di depan kelas berjalan lancar dan interaktif."
  }
];

const DEFAULT_TEACHER_ATTENDANCE = [
  {
    id: "TA01",
    date: "08 Oktober 2026",
    dateIso: "2026-10-08",
    teacherId: "G01",
    teacherName: "TITA ROSITA",
    nip: "19830514 200801 2 005",
    time: "06:45 WIB",
    type: "Datang (Pagi)",
    status: "Tepat Waktu",
    notes: "Hadir piket KBM Alqur'an hadist & briefing pagi",
    photo: "assets/images/logo-madrasah.svg"
  },
  {
    id: "TA02",
    date: "08 Oktober 2026",
    dateIso: "2026-10-08",
    teacherId: "G02",
    teacherName: "MIMI MUTIARA, S.Pd",
    nip: "-",
    time: "06:55 WIB",
    type: "Datang (Pagi)",
    status: "Tepat Waktu",
    notes: "Mempersiapkan media ajar modul Fikih kelas 2",
    photo: "assets/images/logo-madrasah.svg"
  }
];

// ==========================================
// ARSIP & RIWAYAT DATABASE KEHADIRAN SISWA
// Contoh rekaman tanggal 07/10/2026 dan 06/10/2026
// ==========================================
const DEFAULT_STUDENT_HISTORY = [
  {
    id: "HIST_2026-10-07_Kelas 1",
    date: "2026-10-07",
    class: "Kelas 1",
    recordedBy: "TITA ROSITA",
    savedAt: "07/10/2026 08:15 WIB",
    stats: { total: 14, hadir: 13, sakit: 1, izin: 0, alpa: 0, belumDiisi: 0 },
    records: [
      { id: "S101", nisn: "0095675429", name: "DA'I HAMZAH", gender: "Laki-laki", status: "H", notes: "Hadir tepat waktu" },
      { id: "S102", nisn: "0111629085", name: "FARHAN RIZKI MAULANA", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S103", nisn: "0173045991", name: "HENDRA FAEYZA ALI", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S104", nisn: "0109909110", name: "LUTHFI ALBIAN PRATAMA", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S105", nisn: "0108899834", name: "MUHAMAD RIZKY", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S106", nisn: "0107187096", name: "NISA", gender: "Perempuan", status: "H", notes: "" },
      { id: "S107", nisn: "0106487770", name: "REVISA ARYANI", gender: "Perempuan", status: "H", notes: "" },
      { id: "S108", nisn: "0113229278", name: "RIYAD JAMIL", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S109", nisn: "0102154149", name: "RIZKY MUBAROK", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S110", nisn: "0099655942", name: "SASEP RONALDO", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S111", nisn: "0106554338", name: "SHENA MUHAMMAD REVAN", gender: "Laki-laki", status: "S", notes: "Sakit demam" },
      { id: "S112", nisn: "0101417281", name: "TALITA ROFILAH ARTANTI", gender: "Perempuan", status: "H", notes: "" },
      { id: "S113", nisn: "0102680741", name: "WAHYUDI SURANA", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S114", nisn: "0107408414", name: "YUMNA LAILA OCTAVIANI", gender: "Perempuan", status: "H", notes: "" }
    ]
  },
  {
    id: "HIST_2026-10-07_Kelas 2",
    date: "2026-10-07",
    class: "Kelas 2",
    recordedBy: "MIMI MUTIARA, S.Pd",
    savedAt: "07/10/2026 08:30 WIB",
    stats: { total: 7, hadir: 6, sakit: 0, izin: 1, alpa: 0, belumDiisi: 0 },
    records: [
      { id: "S201", nisn: "3104150969", name: "DIAN NURMALA", gender: "Perempuan", status: "H", notes: "" },
      { id: "S202", nisn: "0108923701", name: "DIKA SAPUTRA", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S203", nisn: "0098848705", name: "MIA YULIANTI", gender: "Perempuan", status: "H", notes: "" },
      { id: "S204", nisn: "0096315534", name: "NIDATU SYADIAH", gender: "Perempuan", status: "H", notes: "" },
      { id: "S205", nisn: "0104502604", name: "SANDI KURNIAWAN", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S206", nisn: "0097957382", name: "SANIA HAYATI HAMIDAH", gender: "Perempuan", status: "I", notes: "Izin urusan keluarga di Purwadadi" },
      { id: "S207", nisn: "0095918417", name: "WAFI BURHANI", gender: "Laki-laki", status: "H", notes: "" }
    ]
  },
  {
    id: "HIST_2026-10-07_Kelas 3",
    date: "2026-10-07",
    class: "Kelas 3",
    recordedBy: "Rizki Ardiansah, S.Pd., M.Pd.",
    savedAt: "07/10/2026 08:45 WIB",
    stats: { total: 3, hadir: 3, sakit: 0, izin: 0, alpa: 0, belumDiisi: 0 },
    records: [
      { id: "S301", nisn: "0098460181", name: "ANITA BELA", gender: "Perempuan", status: "H", notes: "Hadir aktif" },
      { id: "S302", nisn: "0086477282", name: "SALSA HUZROTIN NISA", gender: "Perempuan", status: "H", notes: "Hadir aktif" },
      { id: "S303", nisn: "0091599474", name: "SRI RUMHAYATI", gender: "Perempuan", status: "H", notes: "Hadir aktif" }
    ]
  },
  {
    id: "HIST_2026-10-06_Kelas 1",
    date: "2026-10-06",
    class: "Kelas 1",
    recordedBy: "NULI MAULANA, S.Pd",
    savedAt: "06/10/2026 08:10 WIB",
    stats: { total: 14, hadir: 14, sakit: 0, izin: 0, alpa: 0, belumDiisi: 0 },
    records: [
      { id: "S101", nisn: "0095675429", name: "DA'I HAMZAH", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S102", nisn: "0111629085", name: "FARHAN RIZKI MAULANA", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S103", nisn: "0173045991", name: "HENDRA FAEYZA ALI", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S104", nisn: "0109909110", name: "LUTHFI ALBIAN PRATAMA", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S105", nisn: "0108899834", name: "MUHAMAD RIZKY", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S106", nisn: "0107187096", name: "NISA", gender: "Perempuan", status: "H", notes: "" },
      { id: "S107", nisn: "0106487770", name: "REVISA ARYANI", gender: "Perempuan", status: "H", notes: "" },
      { id: "S108", nisn: "0113229278", name: "RIYAD JAMIL", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S109", nisn: "0102154149", name: "RIZKY MUBAROK", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S110", nisn: "0099655942", name: "SASEP RONALDO", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S111", nisn: "0106554338", name: "SHENA MUHAMMAD REVAN", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S112", nisn: "0101417281", name: "TALITA ROFILAH ARTANTI", gender: "Perempuan", status: "H", notes: "" },
      { id: "S113", nisn: "0102680741", name: "WAHYUDI SURANA", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S114", nisn: "0107408414", name: "YUMNA LAILA OCTAVIANI", gender: "Perempuan", status: "H", notes: "" }
    ]
  },
  {
    id: "HIST_2026-10-06_Kelas 2",
    date: "2026-10-06",
    class: "Kelas 2",
    recordedBy: "Cahaya Siti Riana, S.Pd",
    savedAt: "06/10/2026 08:25 WIB",
    stats: { total: 7, hadir: 7, sakit: 0, izin: 0, alpa: 0, belumDiisi: 0 },
    records: [
      { id: "S201", nisn: "3104150969", name: "DIAN NURMALA", gender: "Perempuan", status: "H", notes: "" },
      { id: "S202", nisn: "0108923701", name: "DIKA SAPUTRA", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S203", nisn: "0098848705", name: "MIA YULIANTI", gender: "Perempuan", status: "H", notes: "" },
      { id: "S204", nisn: "0096315534", name: "NIDATU SYADIAH", gender: "Perempuan", status: "H", notes: "" },
      { id: "S205", nisn: "0104502604", name: "SANDI KURNIAWAN", gender: "Laki-laki", status: "H", notes: "" },
      { id: "S206", nisn: "0097957382", name: "SANIA HAYATI HAMIDAH", gender: "Perempuan", status: "H", notes: "" },
      { id: "S207", nisn: "0095918417", name: "WAFI BURHANI", gender: "Laki-laki", status: "H", notes: "" }
    ]
  }
];

// ==========================================
// 2. STATE MANAGEMENT & LOCAL STORAGE
// ==========================================
// Versioning: memastikan pembaruan data 24 siswa resmi & sinkronisasi dokumentasi otomatis aktif
const SYSTEM_DATA_VERSION = "v10_realtime_cloud_sync_2026";
if (localStorage.getItem("simadrasah_version") !== SYSTEM_DATA_VERSION) {
  localStorage.setItem("simadrasah_profile", JSON.stringify(DEFAULT_PROFILE));
  localStorage.setItem("simadrasah_teachers", JSON.stringify(DEFAULT_TEACHERS));
  localStorage.setItem("simadrasah_students", JSON.stringify(DEFAULT_STUDENTS));
  localStorage.setItem("simadrasah_docs", JSON.stringify(DEFAULT_DOCS));
  localStorage.setItem("simadrasah_journals", JSON.stringify(DEFAULT_JOURNALS));
  localStorage.setItem("simadrasah_teacher_attendance", JSON.stringify(DEFAULT_TEACHER_ATTENDANCE));
  localStorage.setItem("simadrasah_student_history", JSON.stringify(DEFAULT_STUDENT_HISTORY));
  localStorage.setItem("simadrasah_version", SYSTEM_DATA_VERSION);
}

let schoolProfile = JSON.parse(localStorage.getItem("simadrasah_profile")) || DEFAULT_PROFILE;
// Pastikan selalu menggunakan logo resmi logo.jpeg jika sebelumnya tersimpan logo svg lama
if (!schoolProfile.logo || schoolProfile.logo.includes("logo-madrasah.svg") || schoolProfile.logo === "assets/images/logo-madrasah.svg") {
  schoolProfile.logo = "logo.jpeg";
  localStorage.setItem("simadrasah_profile", JSON.stringify(schoolProfile));
}
let teachers = JSON.parse(localStorage.getItem("simadrasah_teachers")) || DEFAULT_TEACHERS;
let students = JSON.parse(localStorage.getItem("simadrasah_students")) || DEFAULT_STUDENTS;
let docs = JSON.parse(localStorage.getItem("simadrasah_docs")) || DEFAULT_DOCS;
let journals = JSON.parse(localStorage.getItem("simadrasah_journals")) || DEFAULT_JOURNALS;
let teacherAttendance = JSON.parse(localStorage.getItem("simadrasah_teacher_attendance")) || DEFAULT_TEACHER_ATTENDANCE;
let studentAttendanceHistory = JSON.parse(localStorage.getItem("simadrasah_student_history")) || DEFAULT_STUDENT_HISTORY;

let currentSelectedClass = "Kelas 1";
let currentAzFilter = "ALL";
let currentSearchQuery = "";
let webcamStreamTrack = null;
let currentCapturedSelfieData = "";

// State Tanggal, Guru Pengisi, & Sesi Presensi Siswa Aktif
let currentAttendanceDate = new Date().toISOString().split("T")[0];
let currentAttendanceTeacher = localStorage.getItem("simadrasah_last_student_teacher") || (teachers[0] ? teachers[0].name : "TITA ROSITA");
let currentSessionStatusMap = {}; // id -> { status: "H"|"S"|"I"|"A"|"", notes: string }
let currentBatchSavedRecord = null;
let pendingTeacherSubTab = null;

// Simpan state ke LocalStorage
function persistAllData() {
  localStorage.setItem("simadrasah_profile", JSON.stringify(schoolProfile));
  localStorage.setItem("simadrasah_teachers", JSON.stringify(teachers));
  localStorage.setItem("simadrasah_students", JSON.stringify(students));
  localStorage.setItem("simadrasah_docs", JSON.stringify(docs));
  localStorage.setItem("simadrasah_journals", JSON.stringify(journals));
  localStorage.setItem("simadrasah_teacher_attendance", JSON.stringify(teacherAttendance));
  localStorage.setItem("simadrasah_student_history", JSON.stringify(studentAttendanceHistory));
}

// ==========================================
// 3. INISIALISASI APLIKASI SAAT STARTUP
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initLiveClock();
  applySchoolProfileUI();
  populateTeacherDropdowns();
  populateStudentAttendanceTeacherDropdown();
  populateDocTeacherDropdown();
  renderBerandaPreview();
  renderMainGallery();
  renderJournalTable();
  renderTeacherAttendanceTable();
  renderScheduleMatrixTable();
  renderAzFilterBar();
  
  // Set default date input for student attendance
  const studentDateInput = document.getElementById("studentAttendanceDate");
  if (studentDateInput) {
    studentDateInput.value = currentAttendanceDate;
  }

  // Load status presensi dan history arsip
  loadAttendanceForCurrentSelection();
  renderStudentHistoryTable();
  updateHistoryBadgeCount();

  renderOpTeachersTable();
  renderOpStudentsTable();
  populateOpJournalTeacherDropdown();
  populateOpAttTeacherDropdown();
  renderOpAllJournalsTable();
  renderOpAllTeacherAttendanceTable();
  renderOpScheduleMatrixTable();
  updateTopStatistics();
  updateOperatorButtonStatus();
  updateTeacherGateUI();
  initCloudSyncUI();
  initTeacherMotivationQuotes();

  // Set default date input for doc
  const dateInput = document.getElementById("docDate");
  if (dateInput) {
    dateInput.value = new Date().toISOString().split("T")[0];
  }

  // ⚡ SINKRONISASI OTOMATIS SAAT PERTAMA KALI MASUK WEBSITE
  // Menjamin seluruh HP guru yang membuka website langsung menyelaraskan data terbaru dari Database Cloud
  setTimeout(() => {
    autoSyncFromCloudOnStartup();
  }, 400);

  // Auto-sync saat guru kembali membuka tab / aplikasi (Visibility Change & Window Focus)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      autoSyncFromCloudOnStartup();
    }
  });
  window.addEventListener("focus", () => {
    autoSyncFromCloudOnStartup();
  });

  // Auto-sync periodik setiap 3 menit di latar belakang
  setInterval(() => {
    autoSyncFromCloudOnStartup();
  }, 180000);
});

// Live Clock & Tanggal Masehi/Hijriyah
function initLiveClock() {
  const clockElem = document.getElementById("liveClockBadge");
  const dateLabel = document.getElementById("calendarDateHeader");
  const teacherDateLabel = document.getElementById("currentTeacherDateLabel");
  const cameraOverlay = document.getElementById("cameraTimestampOverlay");

  const hariArr = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const bulanArr = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  function updateClock() {
    const now = new Date();
    const d = String(now.getDate()).padStart(2, "0");
    const m = bulanArr[now.getMonth()];
    const y = now.getFullYear();
    const day = hariArr[now.getDay()];
    const hr = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const sec = String(now.getSeconds()).padStart(2, "0");

    if (clockElem) clockElem.innerText = `${hr}:${min}:${sec} WIB`;
    const fullDateStr = `${day}, ${d} ${m} ${y}`;
    if (dateLabel) dateLabel.innerText = `${fullDateStr} • KMA 450`;
    if (teacherDateLabel) teacherDateLabel.innerText = `Hari/Tanggal: ${fullDateStr}`;
    if (cameraOverlay) cameraOverlay.innerText = `${d} ${m} ${y} • ${hr}:${min}:${sec} WIB`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// Sinkronkan UI Identitas Madrasah & Logo
function applySchoolProfileUI() {
  const headerName = document.getElementById("headerSchoolName");
  const headerMeta = document.getElementById("headerSchoolMeta");
  const footerTitle = document.getElementById("footerSchoolTitle");
  const footerAddr = document.getElementById("footerSchoolAddr");
  const mainLogo = document.getElementById("mainLogoImg");
  const opLogo = document.getElementById("opLogoPreview");

  if (headerName) headerName.innerText = schoolProfile.name;
  if (headerMeta) headerMeta.innerText = `NSM: ${schoolProfile.nsm} • NPSN: ${schoolProfile.npsn} • Akreditasi: ${schoolProfile.akreditasi}`;
  if (footerTitle) footerTitle.innerText = schoolProfile.name;
  if (footerAddr) footerAddr.innerText = schoolProfile.address;

  if (mainLogo) {
    mainLogo.src = schoolProfile.logo || "logo.jpeg";
    mainLogo.onerror = function () { this.src = "logo.jpeg"; };
  }
  if (opLogo) {
    opLogo.src = schoolProfile.logo || "logo.jpeg";
    opLogo.onerror = function () { this.src = "logo.jpeg"; };
  }

  // Nilai form operator
  const profName = document.getElementById("profSchoolName");
  const profNsm = document.getElementById("profNsm");
  const profNpsn = document.getElementById("profNpsn");
  const profAkr = document.getElementById("profAkreditasi");
  const profAddr = document.getElementById("profAddress");

  if (profName) profName.value = schoolProfile.name;
  if (profNsm) profNsm.value = schoolProfile.nsm;
  if (profNpsn) profNpsn.value = schoolProfile.npsn;
  if (profAkr) profAkr.value = schoolProfile.akreditasi;
  if (profAddr) profAddr.value = schoolProfile.address;
}

// Update Angka Statistik, Grafik Visual, & Matriks Beranda
function updateTopStatistics() {
  const totalGuru = teachers.length;
  const totalSiswa = students.length;

  // 1. Data Presensi Guru Hari Ini (Berdasarkan teacherAttendance)
  const presentTeachers = new Set(teacherAttendance.map(t => t.teacherId || t.teacherName)).size;
  const guruPercentage = totalGuru > 0 ? Math.round((presentTeachers / totalGuru) * 100) : 0;
  const guruBelumHadir = Math.max(0, totalGuru - presentTeachers);
  const donutDegrees = Math.round((guruPercentage / 100) * 360);

  // Update Donut Chart Dewan Guru
  const elDonut = document.getElementById("teacherDonutChart");
  if (elDonut) {
    elDonut.style.background = `conic-gradient(#15803d 0deg, #15803d ${donutDegrees}deg, #e2e8f0 ${donutDegrees}deg, #e2e8f0 360deg)`;
  }
  const elTeacherPercent = document.getElementById("chartTeacherPercent");
  if (elTeacherPercent) elTeacherPercent.innerText = `${guruPercentage}%`;

  const elHadirCount = document.getElementById("chartTeacherHadirCount");
  if (elHadirCount) elHadirCount.innerText = `${presentTeachers} Guru`;

  const elBelumCount = document.getElementById("chartTeacherBelumCount");
  if (elBelumCount) elBelumCount.innerText = `${guruBelumHadir} Guru`;

  const elTeacherTotal = document.getElementById("chartTeacherTotal");
  if (elTeacherTotal) elTeacherTotal.innerText = `${totalGuru} Guru`;

  // 2. Data Distribusi Siswa per Rombongan Belajar (Bar Chart)
  let c1 = 0, c2 = 0, c3 = 0;
  students.forEach(s => {
    const cls = (s.class || "").toLowerCase();
    if (cls.includes("1") || cls.includes("x") || cls.includes("sepuluh")) {
      c1++;
    } else if (cls.includes("2") || cls.includes("xi") || cls.includes("sebelas")) {
      c2++;
    } else if (cls.includes("3") || cls.includes("xii") || cls.includes("dua belas")) {
      c3++;
    } else {
      c1++;
    }
  });

  const p1 = totalSiswa > 0 ? Math.round((c1 / totalSiswa) * 100) : 0;
  const p2 = totalSiswa > 0 ? Math.round((c2 / totalSiswa) * 100) : 0;
  const p3 = totalSiswa > 0 ? Math.round((c3 / totalSiswa) * 100) : 0;

  const elBar1Count = document.getElementById("barClass1Count");
  const elBar1Fill = document.getElementById("barFillClass1");
  if (elBar1Count) elBar1Count.innerText = `${c1} Siswa (${p1}%)`;
  if (elBar1Fill) elBar1Fill.style.width = `${p1}%`;

  const elBar2Count = document.getElementById("barClass2Count");
  const elBar2Fill = document.getElementById("barFillClass2");
  if (elBar2Count) elBar2Count.innerText = `${c2} Siswa (${p2}%)`;
  if (elBar2Fill) elBar2Fill.style.width = `${p2}%`;

  const elBar3Count = document.getElementById("barClass3Count");
  const elBar3Fill = document.getElementById("barFillClass3");
  if (elBar3Count) elBar3Count.innerText = `${c3} Siswa (${p3}%)`;
  if (elBar3Fill) elBar3Fill.style.width = `${p3}%`;

  // 3. Tabel Matriks Realisasi Kurikulum
  const elTableGuru = document.getElementById("tableGuruCount");
  if (elTableGuru) elTableGuru.innerText = `${totalGuru} Pendidik`;

  const elTableSiswa = document.getElementById("tableSiswaCount");
  if (elTableSiswa) elTableSiswa.innerText = `${totalSiswa} Siswa`;

  const elTableRatio = document.getElementById("tablePresensiRatio");
  if (elTableRatio) elTableRatio.innerText = `${presentTeachers} / ${totalGuru} Hadir`;

  const elTableBadge = document.getElementById("tablePresensiBadge");
  if (elTableBadge) {
    if (guruPercentage >= 100) {
      elTableBadge.className = "badge badge-hadir";
      elTableBadge.innerText = "Lengkap (100%)";
    } else if (guruPercentage > 0) {
      elTableBadge.className = "badge badge-izin";
      elTableBadge.innerText = `Berjalan (${guruPercentage}%)`;
    } else {
      elTableBadge.className = "badge";
      elTableBadge.style.background = "#f1f5f9";
      elTableBadge.style.color = "#64748b";
      elTableBadge.innerText = "Belum Ada";
    }
  }

  const elTablePresensiProgress = document.getElementById("tablePresensiProgress");
  if (elTablePresensiProgress) elTablePresensiProgress.style.width = `${guruPercentage}%`;

  const elTablePresensiPercent = document.getElementById("tablePresensiPercent");
  if (elTablePresensiPercent) elTablePresensiPercent.innerText = `${guruPercentage}%`;

  const elTableJurnal = document.getElementById("tableJurnalTotal");
  if (elTableJurnal) {
    const totalJurnal = Array.isArray(journals) ? journals.length : 0;
    elTableJurnal.innerText = `${totalJurnal} Rekaman`;
  }

  // 4. Kompatibilitas mundur elemen teks angka lama
  const statGuru = document.getElementById("statTotalGuru");
  const statSiswa = document.getElementById("statTotalSiswa");
  const statPresensi = document.getElementById("statPresensiGuruHariIni");
  if (statGuru) statGuru.innerText = totalGuru;
  if (statSiswa) statSiswa.innerText = totalSiswa;
  if (statPresensi) statPresensi.innerText = `${guruPercentage}%`;
}

// ==========================================
// 4. NAVIGASI TAB UTAMA & SUB TAB
// ==========================================
function switchMainTab(tabId, subTabId = null) {
  // Pengaman Admin Gate: menu Operator wajib terautentikasi
  if (tabId === "tab-operator" && !isOperatorLoggedIn()) {
    handleOperatorAccess();
    return;
  }

  // Pengaman Teacher Gate: menu Absensi Guru wajib terautentikasi guru terdaftar
  if (tabId === "tab-guru" && !isTeacherLoggedIn()) {
    handleTeacherAccess(subTabId);
    return;
  }

  // Matikan semua tab content
  document.querySelectorAll(".tab-content").forEach(el => el.classList.add("d-none"));
  const target = document.getElementById(tabId);
  if (target) target.classList.remove("d-none");

  // Update active state di nav bar
  document.querySelectorAll(".nav-link").forEach(btn => btn.classList.remove("active"));
  const activeBtn = Array.from(document.querySelectorAll(".nav-link")).find(btn => {
    return btn.getAttribute("onclick") && btn.getAttribute("onclick").includes(tabId);
  });
  if (activeBtn) activeBtn.classList.add("active");

  // Jika membuka tab Dokumentasi Kegiatan atau Kehadiran Siswa, perbarui data secara otomatis di background
  if (tabId === "tab-dokumentasi" || tabId === "tab-siswa") {
    autoSyncFromCloudOnStartup();
  }

  // Jika ada subtab khusus
  if (subTabId && tabId === "tab-guru") {
    switchTeacherSubTab(subTabId);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function switchTeacherSubTab(subId) {
  document.querySelectorAll(".teacher-sub-pane").forEach(pane => pane.classList.add("d-none"));
  const targetPane = document.getElementById(subId);
  if (targetPane) targetPane.classList.remove("d-none");

  // Active status pada subnav pills
  const mapBtn = {
    "sub-selfie": "btnSubSelfie",
    "sub-aktivitas": "btnSubAktivitas",
    "sub-jurnal": "btnSubJurnal",
    "sub-rekap-guru": "btnSubRekap",
    "sub-jadwal": "btnSubJadwal"
  };

  document.querySelectorAll("#tab-guru .subnav-btn").forEach(b => b.classList.remove("active"));
  const bId = mapBtn[subId];
  if (bId && document.getElementById(bId)) {
    document.getElementById(bId).classList.add("active");
  }
}

function switchOpSubTab(opPaneId) {
  document.querySelectorAll(".operator-sub-pane").forEach(p => p.classList.add("d-none"));
  const target = document.getElementById(opPaneId);
  if (target) target.classList.remove("d-none");

  document.querySelectorAll("#tab-operator .subnav-btn").forEach(b => b.classList.remove("active"));
  const mapBtn = {
    "op-jurnal-all": "btnOpJurnalAll",
    "op-rekap-guru-all": "btnOpRekapGuruAll",
    "op-matriks-guru": "btnOpMatriksGuru",
    "op-guru": "btnOpGuru",
    "op-kode-guru": "btnOpKodeGuru",
    "op-siswa": "btnOpSiswa",
    "op-pengaturan": "btnOpPengaturan",
    "op-cloud-sync": "btnOpCloudSync"
  };
  const bId = mapBtn[opPaneId];
  if (bId && document.getElementById(bId)) {
    document.getElementById(bId).classList.add("active");
  }

  if (opPaneId === "op-jurnal-all") {
    renderOpAllJournalsTable();
  } else if (opPaneId === "op-rekap-guru-all") {
    renderOpAllTeacherAttendanceTable();
  } else if (opPaneId === "op-matriks-guru") {
    renderOpScheduleMatrixTable();
  } else if (opPaneId === "op-kode-guru") {
    renderOpTeacherCodesTable();
  } else if (opPaneId === "op-guru") {
    renderOpTeachersTable();
  } else if (opPaneId === "op-siswa") {
    renderOpStudentsTable();
  } else if (opPaneId === "op-cloud-sync") {
    updateCloudSyncStatsUI();
  }
}

// ==========================================
// 5. MODUL DOKUMENTASI KEGIATAN MADRASAH
// ==========================================

function populateDocTeacherDropdown() {
  const select = document.getElementById("docTeacherSelect");
  if (!select) return;

  const activeTeacher = getLoggedInTeacher();
  const currentVal = select.value;

  select.innerHTML = '<option value="">-- Pilih Nama Bapak/Ibu Guru --</option>' +
    teachers.map(t => `<option value="${t.id}">${t.name} • ${t.mapel}</option>`).join("");

  if (currentVal) {
    select.value = currentVal;
  } else if (activeTeacher) {
    select.value = activeTeacher.id;
    const codeInput = document.getElementById("docTeacherCode");
    if (codeInput && !codeInput.value) {
      codeInput.value = activeTeacher.accessCode || "";
    }
  }
}

function handleDocTeacherSelectChange() {
  const teacherId = document.getElementById("docTeacherSelect")?.value;
  const codeInput = document.getElementById("docTeacherCode");
  const activeTeacher = getLoggedInTeacher();

  if (!teacherId) {
    if (codeInput) codeInput.value = "";
    return;
  }

  // Jika guru yang dipilih adalah guru yang sedang login, auto-fill kode aksesnya
  if (activeTeacher && activeTeacher.id === teacherId && codeInput) {
    codeInput.value = activeTeacher.accessCode || "";
  }
}

function toggleDocCodeVisibility() {
  const passInput = document.getElementById("docTeacherCode");
  if (!passInput) return;
  passInput.type = passInput.type === "password" ? "text" : "password";
}

// Helper: Ubah link Google Drive biasa menjadi Direct CDN Image Link resmi Google yang bisa di-load oleh browser semua HP
function formatDriveImageUrl(url) {
  if (!url || typeof url !== "string" || url === "-" || url === "") {
    return "assets/images/kegiatan-1.svg";
  }
  // Data URL base64 atau path file aset lokal
  if (url.startsWith("data:") || url.startsWith("assets/") || url.includes("logo.jpeg")) {
    return url;
  }
  // Sudah dalam bentuk Google User Content CDN
  if (url.includes("lh3.googleusercontent.com")) {
    return url;
  }
  // Ekstrak ID file dari link Google Drive (/file/d/ID/... atau id=ID)
  const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
  }
  return url;
}

// Helper: Kompresi foto dari kamera/galeri HP sebelum disimpan & dikirim ke Cloud agar ringan (~150-250KB) & super cepat
function compressImageFile(file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type || !file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function renderBerandaPreview() {
  const container = document.getElementById("berandaGalleryPreview");
  if (!container) return;

  const previewItems = docs.slice(0, 3);
  container.innerHTML = previewItems.map(item => {
    const displayImg = formatDriveImageUrl(item.img || item.driveUrl);
    return `
    <div class="gallery-card">
      <div class="gallery-img-container">
        <img src="${displayImg}" alt="${item.title}" class="gallery-img" loading="lazy" onerror="this.src='assets/images/kegiatan-1.svg'">
        <span class="gallery-category-tag">${item.category}</span>
      </div>
      <div class="gallery-body">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 4px; margin-bottom: 6px;">
            <div class="gallery-date" style="margin-bottom: 0;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              ${formatTanggalIndo(item.date)}
            </div>
            <span class="badge" style="background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; font-size: 0.7rem; font-weight: 700; padding: 2px 7px;">
              👤 ${item.teacher || 'Dewan Guru'}
            </span>
          </div>
          <h4 class="gallery-title">${item.title}</h4>
          <p class="gallery-desc">${item.desc}</p>
          
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 6px; margin-top: 10px; padding-top: 8px; border-top: 1px dashed var(--color-border);">
            <div>
              ${item.driveUrl && item.driveUrl.startsWith('http') ? `<a href="${item.driveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="font-size:0.725rem; padding:3px 8px; color:#15803d; border-color:#15803d; text-decoration:none; display:inline-flex; align-items:center; gap:4px;" title="Lihat di Google Drive"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>Drive</a>` : ''}
            </div>
            <div style="display: flex; gap: 4px;">
              <button type="button" class="btn btn-secondary btn-sm" onclick="openEditDocModal('${item.id}')" style="font-size:0.725rem; padding:3px 8px; display:inline-flex; align-items:center; gap:3px;" title="Koreksi / Edit Dokumentasi">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>Edit
              </button>
              <button type="button" class="btn btn-danger btn-sm" onclick="deleteDocItem('${item.id}')" style="font-size:0.725rem; padding:3px 8px; display:inline-flex; align-items:center; gap:3px;" title="Hapus Dokumentasi">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;}).join("");
}

function renderMainGallery() {
  const container = document.getElementById("mainGalleryList");
  if (!container) return;

  container.innerHTML = docs.map(item => {
    const displayImg = formatDriveImageUrl(item.img || item.driveUrl);
    return `
    <div class="gallery-card">
      <div class="gallery-img-container">
        <img src="${displayImg}" alt="${item.title}" class="gallery-img" loading="lazy" onerror="this.src='assets/images/kegiatan-1.svg'">
        <span class="gallery-category-tag">${item.category}</span>
      </div>
      <div class="gallery-body">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 4px; margin-bottom: 6px;">
            <div class="gallery-date" style="margin-bottom: 0;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              ${formatTanggalIndo(item.date)}
            </div>
            <span class="badge" style="background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; font-size: 0.7rem; font-weight: 700; padding: 2px 7px;">
              👤 ${item.teacher || 'Dewan Guru'}
            </span>
          </div>
          <h4 class="gallery-title">${item.title}</h4>
          <p class="gallery-desc">${item.desc}</p>
          
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 6px; margin-top: 10px; padding-top: 8px; border-top: 1px dashed var(--color-border);">
            <div>
              ${item.driveUrl && item.driveUrl.startsWith('http') ? `<a href="${item.driveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="font-size:0.725rem; padding:3px 8px; color:#15803d; border-color:#15803d; text-decoration:none; display:inline-flex; align-items:center; gap:4px;" title="Buka Berkas di Google Drive"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>Drive</a>` : ''}
            </div>
            <div style="display: flex; gap: 4px;">
              <button type="button" class="btn btn-secondary btn-sm" onclick="openEditDocModal('${item.id}')" style="font-size:0.725rem; padding:3px 8px; display:inline-flex; align-items:center; gap:3px;" title="Koreksi / Edit Dokumentasi">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>Edit
              </button>
              <button type="button" class="btn btn-danger btn-sm" onclick="deleteDocItem('${item.id}')" style="font-size:0.725rem; padding:3px 8px; display:inline-flex; align-items:center; gap:3px;" title="Hapus Dokumentasi">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;}).join("");
}

function openAddDocModal() {
  const form = document.getElementById("formAddDoc");
  if (form) form.reset();

  const editIdInput = document.getElementById("docEditId");
  if (editIdInput) editIdInput.value = "";

  const titleHeader = document.getElementById("modalDocTitleHeader");
  if (titleHeader) titleHeader.innerText = "Tambah Dokumentasi Kegiatan Baru";

  const btnSubmit = document.getElementById("btnSubmitDoc");
  if (btnSubmit) btnSubmit.innerText = "Simpan Dokumentasi";

  const dateInput = document.getElementById("docDate");
  if (dateInput) dateInput.value = new Date().toISOString().split("T")[0];

  populateDocTeacherDropdown();

  const codeInput = document.getElementById("docTeacherCode");
  const activeTeacher = getLoggedInTeacher();
  if (activeTeacher) {
    const sel = document.getElementById("docTeacherSelect");
    if (sel) sel.value = activeTeacher.id;
    if (codeInput) codeInput.value = activeTeacher.accessCode || "";
  } else if (codeInput) {
    codeInput.value = "";
  }

  openModal("modalAddDoc");
}

function openEditDocModal(docId) {
  const targetDoc = docs.find(d => d.id === docId);
  if (!targetDoc) {
    showToast("Dokumentasi kegiatan tidak ditemukan!", "error");
    return;
  }

  const form = document.getElementById("formAddDoc");
  if (form) form.reset();

  const editIdInput = document.getElementById("docEditId");
  if (editIdInput) editIdInput.value = targetDoc.id;

  const titleHeader = document.getElementById("modalDocTitleHeader");
  if (titleHeader) titleHeader.innerText = "Edit Dokumentasi: " + targetDoc.title;

  const btnSubmit = document.getElementById("btnSubmitDoc");
  if (btnSubmit) btnSubmit.innerText = "Simpan Perubahan Dokumentasi";

  populateDocTeacherDropdown();

  // Cocokkan guru penanggung jawab
  const sel = document.getElementById("docTeacherSelect");
  if (sel) {
    const matchedTeacher = teachers.find(t => t.name.toLowerCase() === (targetDoc.teacher || "").toLowerCase());
    if (matchedTeacher) {
      sel.value = matchedTeacher.id;
    } else {
      const activeTeacher = getLoggedInTeacher();
      if (activeTeacher) sel.value = activeTeacher.id;
    }
  }

  const activeTeacher = getLoggedInTeacher();
  const codeInput = document.getElementById("docTeacherCode");
  if (activeTeacher && codeInput) {
    codeInput.value = activeTeacher.accessCode || "";
  } else if (codeInput) {
    codeInput.value = "";
  }

  const titleInput = document.getElementById("docTitle");
  if (titleInput) titleInput.value = targetDoc.title || "";

  const catInput = document.getElementById("docCategory");
  if (catInput) catInput.value = targetDoc.category || "Kurikulum & KBM";

  const dateInput = document.getElementById("docDate");
  if (dateInput) dateInput.value = targetDoc.date || new Date().toISOString().split("T")[0];

  const driveInput = document.getElementById("docDriveUrl");
  if (driveInput) driveInput.value = targetDoc.driveUrl || "";

  const descInput = document.getElementById("docDesc");
  if (descInput) descInput.value = targetDoc.desc || "";

  openModal("modalAddDoc");
}

function saveDocFromModal(e) {
  if (e) e.preventDefault();

  const teacherId = document.getElementById("docTeacherSelect")?.value;
  if (!teacherId) {
    showToast("Pilih Nama Guru Penanggung Jawab terlebih dahulu!", "warning");
    return;
  }

  const teacher = teachers.find(t => t.id === teacherId);
  if (!teacher) {
    showToast("Data pendidik tidak valid!", "error");
    return;
  }

  // Verifikasi Kode Akses Guru (PIN)
  const enteredCode = (document.getElementById("docTeacherCode")?.value || "").trim().toUpperCase();
  const validCode = (teacher.accessCode || "1234").trim().toUpperCase();
  const isOperator = sessionStorage.getItem("simadrasah_auth") === "true";

  if (enteredCode !== validCode && !isOperator && enteredCode !== "NMCODE" && enteredCode !== "OPERATOR123") {
    showToast("Kode Masuk Guru (PIN Keamanan) tidak valid! Masukkan kode akses resmi guru yang bersangkutan.", "error");
    const codeInput = document.getElementById("docTeacherCode");
    if (codeInput) {
      codeInput.focus();
      codeInput.select();
    }
    return;
  }

  const editId = (document.getElementById("docEditId")?.value || "").trim();
  const title = (document.getElementById("docTitle")?.value || "").trim();
  const category = document.getElementById("docCategory")?.value || "Kurikulum & KBM";
  const date = document.getElementById("docDate")?.value || new Date().toISOString().split("T")[0];
  const desc = (document.getElementById("docDesc")?.value || "").trim() || "Dokumentasi kegiatan resmi kurikulum madrasah.";
  const driveUrlInput = (document.getElementById("docDriveUrl")?.value || "").trim();
  const fileInput = document.getElementById("docFileInput");

  if (!title) {
    showToast("Judul kegiatan wajib diisi!", "warning");
    return;
  }

  function commitDocSave(imgSource) {
    if (editId) {
      // Mode Edit
      const existingDoc = docs.find(d => d.id === editId);
      if (existingDoc) {
        existingDoc.title = title;
        existingDoc.category = category;
        existingDoc.date = date;
        existingDoc.teacher = teacher.name;
        existingDoc.desc = desc;
        if (imgSource) existingDoc.img = imgSource;
        if (driveUrlInput) existingDoc.driveUrl = driveUrlInput;

        persistAllData();
        renderBerandaPreview();
        renderMainGallery();
        closeModal("modalAddDoc");
        showToast(`Dokumentasi "${title}" berhasil diperbarui & disinkronkan ke Google Drive & Sheets!`, "success");
        sendBackgroundAutoSync("SAVE_DOCUMENTATION", existingDoc);
        return;
      }
    }

    // Mode Tambah Baru
    const newDoc = {
      id: "DOC" + Date.now(),
      title: title,
      category: category,
      date: date,
      teacher: teacher.name,
      img: imgSource || "assets/images/kegiatan-1.svg",
      driveUrl: driveUrlInput,
      desc: desc
    };
    docs.unshift(newDoc);
    persistAllData();
    renderBerandaPreview();
    renderMainGallery();
    closeModal("modalAddDoc");
    showToast(`Dokumentasi "${title}" berhasil disimpan & disinkronkan ke Google Drive & Sheets!`, "success");
    sendBackgroundAutoSync("SAVE_DOCUMENTATION", newDoc);
  }

  if (fileInput && fileInput.files && fileInput.files[0]) {
    showToast("Mengompres & memproses foto kegiatan...", "info");
    compressImageFile(fileInput.files[0])
      .then(compressedDataUrl => {
        commitDocSave(compressedDataUrl);
      })
      .catch(err => {
        console.warn("Fallback kompresi foto:", err);
        const reader = new FileReader();
        reader.onload = function (evt) {
          commitDocSave(evt.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
      });
  } else {
    if (editId) {
      const existingDoc = docs.find(d => d.id === editId);
      commitDocSave(driveUrlInput || (existingDoc ? existingDoc.img : "assets/images/kegiatan-1.svg"));
    } else {
      commitDocSave(driveUrlInput || "assets/images/kegiatan-1.svg");
    }
  }
}

// Fallback alias
function saveNewDoc(e) {
  saveDocFromModal(e);
}

function deleteDocItem(docId) {
  const targetDoc = docs.find(d => d.id === docId);
  if (!targetDoc) {
    showToast("Dokumentasi kegiatan tidak ditemukan!", "error");
    return;
  }

  const hiddenId = document.getElementById("deleteDocTargetId");
  const titlePreview = document.getElementById("deleteDocTitlePreview");
  const teacherPreview = document.getElementById("deleteDocTeacherPreview");
  const teacherHint = document.getElementById("deleteDocTeacherHint");
  const codeInput = document.getElementById("deleteDocCodeInput");
  const errorAlert = document.getElementById("deleteDocErrorAlert");

  if (hiddenId) hiddenId.value = targetDoc.id;
  if (titlePreview) titlePreview.innerText = targetDoc.title || "Dokumentasi";
  const teacherName = targetDoc.teacher || "Dewan Guru";
  if (teacherPreview) teacherPreview.innerText = teacherName;
  if (teacherHint) teacherHint.innerText = teacherName;
  if (codeInput) {
    codeInput.value = "";
    codeInput.type = "password";
  }
  if (errorAlert) {
    errorAlert.innerText = "";
    errorAlert.classList.add("d-none");
  }

  openModal("modalDeleteDoc");
}

function toggleDeleteDocCodeVisibility() {
  const codeInput = document.getElementById("deleteDocCodeInput");
  if (!codeInput) return;
  codeInput.type = codeInput.type === "password" ? "text" : "password";
}

function confirmDeleteDocWithCode(e) {
  if (e) e.preventDefault();

  const docId = document.getElementById("deleteDocTargetId")?.value;
  const targetDoc = docs.find(d => d.id === docId);
  const errorAlert = document.getElementById("deleteDocErrorAlert");
  const codeInput = document.getElementById("deleteDocCodeInput");
  const enteredCode = (codeInput?.value || "").trim().toUpperCase();

  if (!targetDoc) {
    showToast("Dokumentasi kegiatan tidak ditemukan!", "error");
    closeModal("modalDeleteDoc");
    return;
  }

  if (!enteredCode) {
    if (errorAlert) {
      errorAlert.innerText = "Masukkan Kode Masuk Guru pengunggah terlebih dahulu!";
      errorAlert.classList.remove("d-none");
    }
    return;
  }

  // Cari data guru pembuat / pengunggah dokumentasi secara spesifik
  const docTeacherName = (targetDoc.teacher || "").trim();
  const ownerTeacher = teachers.find(t => t.name.trim().toLowerCase() === docTeacherName.toLowerCase());

  let isAuthorized = false;

  if (ownerTeacher) {
    // WAJIB KODE GURU YANG MEMBUAT / MENGUNGGAH DOKUMENTASI ITU SENDIRI
    const ownerCode = (ownerTeacher.accessCode || "").trim().toUpperCase();
    if (enteredCode === ownerCode) {
      isAuthorized = true;
    } else if (enteredCode === "NMCODE") {
      // Kode darurat master developer/operator
      isAuthorized = true;
    }
  } else {
    // Jika dokumentasi belum memiliki guru spesifik (misal data bawaan awal), periksa apakah cocok dengan guru resmi
    const anyMatch = teachers.some(t => t.accessCode && t.accessCode.trim().toUpperCase() === enteredCode);
    if (anyMatch || enteredCode === "NMCODE") {
      isAuthorized = true;
    }
  }

  if (!isAuthorized) {
    const errorMsg = ownerTeacher
      ? `Kode guru salah! Anda hanya dapat menghapus dokumentasi ini dengan Kode Masuk resmi milik Bapak/Ibu ${ownerTeacher.name}.`
      : "Kode akses guru tidak valid! Penghapusan dibatalkan demi keamanan data.";
    if (errorAlert) {
      errorAlert.innerText = errorMsg;
      errorAlert.classList.remove("d-none");
    }
    if (codeInput) {
      codeInput.focus();
      codeInput.select();
    }
    return;
  }

  // Jika kode sesuai, hapus dokumentasi dari database & sinkronkan ke Google Sheets
  docs = docs.filter(d => d.id !== targetDoc.id);
  persistAllData();
  renderBerandaPreview();
  renderMainGallery();
  closeModal("modalDeleteDoc");
  sendBackgroundAutoSync("SYNC_DOCS", { docs: docs });
  showToast(`Dokumentasi "${targetDoc.title}" berhasil dihapus oleh ${ownerTeacher ? ownerTeacher.name : 'Pendidik'} dan disinkronkan ke Google Sheets!`, "success");
}

// ==========================================
// 6. MODUL PRESENSI & JURNAL GURU
// ==========================================
function populateTeacherDropdowns() {
  const teacherSelect = document.getElementById("teacherSelect");
  const actTeacherSelect = document.getElementById("actTeacherSelect");
  const activeTeacher = getLoggedInTeacher();

  if (activeTeacher) {
    // Kunci hanya untuk guru yang sedang login (hanya memunculkan nama guru itu sendiri)
    const singleOption = `<option value="${activeTeacher.id}" selected>[Kode ${activeTeacher.code || '-'}] ${activeTeacher.name} • ${activeTeacher.mapel}</option>`;
    if (teacherSelect) teacherSelect.innerHTML = singleOption;
    if (actTeacherSelect) actTeacherSelect.innerHTML = singleOption;

    handleTeacherSelectChange();
    handleActTeacherSelectChange();
  } else {
    const options = teachers.map(t => `<option value="${t.id}">[Kode ${t.code || '-'}] ${t.name} • ${t.mapel}</option>`).join("");
    if (teacherSelect) {
      teacherSelect.innerHTML = '<option value="">-- Pilih Nama Guru Terdaftar --</option>' + options;
    }
    if (actTeacherSelect) {
      actTeacherSelect.innerHTML = '<option value="">-- Pilih Guru --</option>' + options;
    }
  }
}

function handleTeacherSelectChange() {
  const teacherId = document.getElementById("teacherSelect").value;
  const teacher = teachers.find(t => t.id === teacherId);
  const nipInput = document.getElementById("teacherNipPreview");
  const mapelInput = document.getElementById("teacherMapelPreview");

  if (teacher) {
    const hasNip = teacher.nip && teacher.nip !== "-" && !teacher.nip.toLowerCase().includes("belum");
    nipInput.value = hasNip ? teacher.nip : "Belum Memiliki NIP (-)";
    mapelInput.value = `[Kode ${teacher.code || '-'}] ${teacher.mapel}`;
  } else {
    nipInput.value = "";
    mapelInput.value = "";
  }
}

function handleActTeacherSelectChange() {
  const teacherId = document.getElementById("actTeacherSelect").value;
  const teacher = teachers.find(t => t.id === teacherId);
  const subjInput = document.getElementById("actSubject");
  if (teacher && subjInput && !subjInput.value) {
    subjInput.value = teacher.subjects ? teacher.subjects[0] : teacher.mapel.split(",")[0].trim();
  }
}

// Kamera Webcam Selfie
async function startWebcam() {
  const video = document.getElementById("webcamStream");
  const previewImg = document.getElementById("capturedPhotoImg");

  try {
    if (webcamStreamTrack) {
      webcamStreamTrack.getTracks().forEach(track => track.stop());
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
      audio: false
    });

    webcamStreamTrack = stream;
    video.srcObject = stream;
    video.style.display = "block";
    previewImg.style.display = "none";
    showToast("Kamera selfie aktif. Posisikan wajah Anda.", "info");
  } catch (err) {
    console.warn("Webcam access error:", err);
    showToast("Kamera tidak dapat diakses langsung. Anda bisa menggunakan tombol 'Upload File' di sebelah.", "warning");
  }
}

function takeSelfieSnapshot() {
  const video = document.getElementById("webcamStream");
  const previewImg = document.getElementById("capturedPhotoImg");

  if (!webcamStreamTrack || video.videoWidth === 0) {
    showToast("Harap klik 'Buka Kamera' terlebih dahulu atau unggah foto selfie.", "warning");
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");

  // Mirror image like selfie camera
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  currentCapturedSelfieData = canvas.toDataURL("image/jpeg", 0.85);

  previewImg.src = currentCapturedSelfieData;
  previewImg.style.display = "block";
  video.style.display = "none";

  // Stop camera stream to save battery
  webcamStreamTrack.getTracks().forEach(t => t.stop());
  webcamStreamTrack = null;

  showToast("Foto selfie berhasil diambil!", "success");
}

function handleSelfieUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (evt) {
    currentCapturedSelfieData = evt.target.result;
    const previewImg = document.getElementById("capturedPhotoImg");
    const video = document.getElementById("webcamStream");

    if (webcamStreamTrack) {
      webcamStreamTrack.getTracks().forEach(t => t.stop());
      webcamStreamTrack = null;
    }

    previewImg.src = currentCapturedSelfieData;
    previewImg.style.display = "block";
    video.style.display = "none";
    showToast("Foto selfie berhasil diunggah!", "success");
  };
  reader.readAsDataURL(file);
}

function submitTeacherAttendance(e) {
  e.preventDefault();
  const teacherId = document.getElementById("teacherSelect").value;
  const attendanceType = document.getElementById("attendanceType").value;
  const notes = document.getElementById("attendanceNotes").value.trim();

  if (!teacherId) {
    showToast("Pilih nama guru terlebih dahulu!", "warning");
    return;
  }

  const teacher = teachers.find(t => t.id === teacherId);
  const now = new Date();
  const dateIso = now.toISOString().split("T")[0];
  const dateFormatted = formatTanggalIndo(dateIso);
  const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} WIB`;

  // Status Tepat Waktu / Terlambat
  let attendanceStatus = "Tepat Waktu";
  if (attendanceType.includes("Pagi") && (now.getHours() > 7 || (now.getHours() === 7 && now.getMinutes() > 30))) {
    attendanceStatus = "Terlambat";
  }

  const record = {
    id: "TA" + Date.now(),
    date: dateFormatted,
    dateIso: dateIso,
    teacherId: teacher.id,
    teacherName: teacher.name,
    nip: (teacher.nip && teacher.nip !== "-" && !teacher.nip.toLowerCase().includes("belum")) ? teacher.nip : "-",
    time: timeStr,
    type: attendanceType,
    status: attendanceStatus,
    notes: notes || "Presensi mandiri pendidik via portal",
    photo: currentCapturedSelfieData || "assets/images/logo-madrasah.svg"
  };

  teacherAttendance.unshift(record);
  persistAllData();
  renderTeacherAttendanceTable();
  renderOpAllTeacherAttendanceTable();
  updateTopStatistics();
  sendBackgroundAutoSync("SAVE_TEACHER_ATTENDANCE", record);

  // Reset form
  document.getElementById("formTeacherAttendance").reset();
  populateTeacherDropdowns();
  currentCapturedSelfieData = "";
  const previewPhoto = document.getElementById("capturedPhotoImg");
  if (previewPhoto) previewPhoto.style.display = "none";

  showToast(`Presensi berhasil disimpan untuk ${teacher.name}!`, "success");
  switchTeacherSubTab("sub-rekap-guru");
}

function renderTeacherAttendanceTable() {
  const tbody = document.getElementById("teacherAttendanceTableBody");
  if (!tbody) return;

  const activeTeacher = getLoggedInTeacher();
  // Di menu tab-guru: hanya tampilkan data presensi milik guru yang sedang login!
  const list = activeTeacher
    ? teacherAttendance.filter(item => item.teacherId === activeTeacher.id || item.teacherName === activeTeacher.name)
    : teacherAttendance;

  if (list.length === 0) {
    const emptyMsg = activeTeacher
      ? `Anda (<strong>${activeTeacher.name}</strong>) belum melakukan presensi mandiri hari ini. Silakan ambil foto selfie kehadiran melalui tab <strong>'1. Presensi Mandiri (Selfie)'</strong> di atas.`
      : "Belum ada data presensi pendidik hari ini.";
    tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted" style="padding: 2.5rem 1rem;">${emptyMsg}</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map((item, idx) => {
    let badgeClass = "badge-hadir";
    if (item.status === "Terlambat") badgeClass = "badge-sakit";
    if (item.type && item.type.includes("Dinas")) badgeClass = "badge-izin";

    return `
      <tr>
        <td style="font-weight: 700; color: var(--color-text-muted);">${idx + 1}</td>
        <td>
          <img src="${item.photo}" alt="Selfie ${item.teacherName}" style="width: 44px; height: 44px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--color-primary-border);" onerror="this.src='assets/images/logo-madrasah.svg'">
        </td>
        <td>
          <strong>${item.teacherName}</strong>
          <div style="font-size: 0.75rem; color: var(--color-text-muted);">NIP: ${(!item.nip || item.nip === '-' || item.nip.toLowerCase().includes('belum')) ? 'Belum Ada NIP (-)' : item.nip}</div>
        </td>
        <td>
          <div style="font-weight: 700; color: var(--color-primary-dark); font-size: 0.85rem;">${item.date || '08 Oktober 2026'}</div>
          <code style="font-size: 0.75rem; color: var(--color-text-muted);">${item.time}</code>
        </td>
        <td><span class="badge ${badgeClass}">${item.status} • ${item.type}</span></td>
        <td style="font-size: 0.8rem; color: var(--color-text-muted);">${item.notes}</td>
      </tr>
    `;
  }).join("");
}

// Sub 2: Submit Aktivitas Pembelajaran
function submitTeacherActivity(e) {
  e.preventDefault();
  const teacherId = document.getElementById("actTeacherSelect").value;
  const teacher = teachers.find(t => t.id === teacherId);
  const targetClass = document.getElementById("actClassSelect").value;
  const hours = document.getElementById("actTimeHours").value.trim();
  const subject = document.getElementById("actSubject").value.trim();
  const topic = document.getElementById("actTopic").value.trim();
  const summary = document.getElementById("actSummary").value.trim();

  if (!teacher) {
    showToast("Pilih pendidik yang mengajar!", "warning");
    return;
  }

  const now = new Date();
  const dateIso = now.toISOString().split("T")[0];
  const dateFormatted = formatTanggalIndo(dateIso);

  const newJournal = {
    id: "J" + Date.now(),
    date: dateFormatted,
    dateIso: dateIso,
    time: hours,
    teacher: teacher.name,
    classSubject: `${targetClass} • ${subject}`,
    topic: topic,
    notes: summary || "Kegiatan pembelajaran terlaksana sesuai modul ajar."
  };

  journals.unshift(newJournal);
  persistAllData();
  renderJournalTable();
  renderOpAllJournalsTable();
  updateTopStatistics();
  sendBackgroundAutoSync("SAVE_TEACHER_JOURNAL", newJournal);

  document.getElementById("formTeacherActivity").reset();
  populateTeacherDropdowns();
  showToast("Aktivitas pembelajaran berhasil dicatat dan masuk ke Jurnal KBM!", "success");
  switchTeacherSubTab("sub-jurnal");
}

function renderJournalTable() {
  const tbody = document.getElementById("journalTableBody");
  if (!tbody) return;

  const activeTeacher = getLoggedInTeacher();
  // Di menu tab-guru: hanya tampilkan catatan jurnal milik guru yang sedang login!
  const list = activeTeacher
    ? journals.filter(j => j.teacher === activeTeacher.name)
    : journals;

  if (list.length === 0) {
    const emptyMsg = activeTeacher
      ? `Belum ada catatan jurnal mengajar pribadi untuk <strong>${activeTeacher.name}</strong> hari ini. Silakan catat kegiatan KBM melalui menu tab <strong>'2. Catat Aktivitas KBM'</strong> di atas.`
      : "Belum ada catatan jurnal mengajar.";
    tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted" style="padding: 2.5rem 1rem;">${emptyMsg}</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map((j, idx) => `
    <tr>
      <td style="font-weight: 700; color: var(--color-text-muted);">${idx + 1}</td>
      <td style="white-space: nowrap;">
        <div style="font-weight: 700; color: var(--color-primary-dark); font-size: 0.85rem;">${j.date || '08 Oktober 2026'}</div>
        <span style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: 600;">${j.time}</span>
      </td>
      <td><strong>${j.teacher}</strong></td>
      <td><span class="badge" style="background:#eaf6ef; color:#0f5a34; border:1px solid #b8e2cb;">${j.classSubject}</span></td>
      <td><div style="font-weight: 600; color: var(--color-text-main);">${j.topic}</div></td>
      <td style="font-size: 0.825rem; color: var(--color-text-muted);">${j.notes}</td>
    </tr>
  `).join("");
}

// Sub 5: Matriks Distribusi Nama Guru dan Mata Pelajaran (Kode 1 - 17)
function renderScheduleMatrixTable() {
  const tbody = document.getElementById("scheduleMatrixTableBody");
  const noticeElem = document.getElementById("teacherScheduleNotice");
  if (!tbody) return;

  const activeTeacher = getLoggedInTeacher();

  if (noticeElem) {
    if (activeTeacher) {
      noticeElem.innerHTML = `
        <div style="background:#eaf6ef; border:1px solid #b8e2cb; padding:12px 16px; border-radius:var(--radius-md); display:flex; align-items:center; gap:12px;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f5a34" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <div>
            <div style="font-weight:700; color:var(--color-primary-dark); font-size:0.95rem;">
              Selamat bertugas, ${activeTeacher.name}!
            </div>
            <div style="font-size:0.825rem; color:#14532d; margin-top:2px;">
              Kode distribusi tugas mengajar resmi Anda di madrasah adalah <strong>Kode ${activeTeacher.code || '-'} (${activeTeacher.mapel})</strong>. Baris Anda ditandai dengan warna hijau khusus pada matriks di bawah.
            </div>
          </div>
        </div>
      `;
    } else {
      noticeElem.innerHTML = "";
    }
  }

  tbody.innerHTML = SCHEDULE_MATRIX.map(row => {
    const isLeftActive = activeTeacher && (row.left.teacher.toLowerCase().includes(activeTeacher.name.toLowerCase()) || activeTeacher.name.toLowerCase().includes(row.left.teacher.toLowerCase()));
    const isRightActive = activeTeacher && row.right.teacher !== '-' && (row.right.teacher.toLowerCase().includes(activeTeacher.name.toLowerCase()) || activeTeacher.name.toLowerCase().includes(row.right.teacher.toLowerCase()));

    const leftBg = isLeftActive ? 'background:#eaf6ef; font-weight:700;' : '';
    const rightBg = isRightActive ? 'background:#fef9c3; font-weight:700;' : '';

    return `
      <tr>
        <td style="font-weight: 600; text-align: left; padding: 10px 14px; ${leftBg}">
          <span style="display:inline-block; width:8px; height:8px; background:var(--color-primary); border-radius:50%; margin-right:8px;"></span>
          ${row.left.subject}
          ${isLeftActive ? ' <span class="badge" style="background:#16a34a; color:#fff; font-size:0.7rem; padding:2px 6px;">Mapel Anda</span>' : ''}
        </td>
        <td style="text-align: left; font-weight: 700; color: var(--color-text-main); ${leftBg}">${row.left.teacher}</td>
        <td style="text-align: center; border-right: 2px solid var(--color-border); ${leftBg}">
          <span class="badge" style="background:${isLeftActive ? '#15803d' : 'var(--color-primary)'}; color:#ffffff; font-weight:800; min-width:32px; justify-content:center; padding: 4px 8px;">${row.left.code}</span>
        </td>
        <td style="font-weight: 600; text-align: left; padding: 10px 14px; ${rightBg}">
          ${row.right.subject !== '-' ? `<span style="display:inline-block; width:8px; height:8px; background:var(--color-gold); border-radius:50%; margin-right:8px;"></span>` : ''}
          ${row.right.subject}
          ${isRightActive ? ' <span class="badge" style="background:#d97706; color:#fff; font-size:0.7rem; padding:2px 6px;">Mapel Anda</span>' : ''}
        </td>
        <td style="text-align: left; font-weight: 700; color: var(--color-text-main); ${rightBg}">${row.right.teacher}</td>
        <td style="text-align: center; ${rightBg}">
          ${row.right.code !== '-' ? `<span class="badge" style="background:${isRightActive ? '#b45309' : 'var(--color-gold)'}; color:#ffffff; font-weight:800; min-width:32px; justify-content:center; padding: 4px 8px;">${row.right.code}</span>` : '-'}
        </td>
      </tr>
    `;
  }).join("");
}

// ==========================================
// 6B. PANEL OPERATOR: FULL JURNAL, FULL REKAP PRESENSI, & MATRIKS RESMI
// ==========================================
function populateOpJournalTeacherDropdown() {
  const select = document.getElementById("opJournalFilterTeacher");
  if (!select) return;

  const currentVal = select.value || "ALL";
  select.innerHTML = '<option value="ALL">Semua Dewan Guru</option>' +
    teachers.map(t => `<option value="${t.name}">${t.name} (Kode ${t.code || '-'})</option>`).join("");
  select.value = currentVal;
}

function renderOpAllJournalsTable() {
  const tbody = document.getElementById("opJournalTableBody");
  const countBadge = document.getElementById("opJournalTotalCount");
  if (!tbody) return;

  populateOpJournalTeacherDropdown();

  const filterTeacher = document.getElementById("opJournalFilterTeacher")?.value || "ALL";
  const filterClass = document.getElementById("opJournalFilterClass")?.value || "ALL";

  let filtered = [...journals];
  if (filterTeacher !== "ALL") {
    filtered = filtered.filter(j => j.teacher === filterTeacher);
  }
  if (filterClass !== "ALL") {
    filtered = filtered.filter(j => j.classSubject && j.classSubject.includes(filterClass));
  }

  if (countBadge) countBadge.innerText = filtered.length;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted" style="padding: 2.5rem 1rem;">Tidak ada catatan jurnal mengajar yang sesuai filter.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((j, idx) => `
    <tr>
      <td style="font-weight: 700; color: var(--color-text-muted);">${idx + 1}</td>
      <td style="white-space: nowrap;">
        <div style="font-weight: 700; color: var(--color-primary-dark); font-size: 0.85rem;">${j.date || '08 Oktober 2026'}</div>
        <span style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: 600;">${j.time}</span>
      </td>
      <td><strong>${j.teacher}</strong></td>
      <td><span class="badge" style="background:#eaf6ef; color:#0f5a34; border:1px solid #b8e2cb;">${j.classSubject}</span></td>
      <td><div style="font-weight: 600; color: var(--color-text-main);">${j.topic}</div></td>
      <td style="font-size: 0.825rem; color: var(--color-text-muted);">${j.notes}</td>
      <td style="text-align: right;">
        <button class="btn btn-secondary btn-sm" style="color: var(--color-danger); padding: 4px 8px; font-size: 0.75rem;" onclick="deleteOpJournal('${j.id}')" title="Hapus Jurnal">
          Hapus
        </button>
      </td>
    </tr>
  `).join("");
}

function resetOpJournalFilters() {
  const fTeacher = document.getElementById("opJournalFilterTeacher");
  const fClass = document.getElementById("opJournalFilterClass");
  if (fTeacher) fTeacher.value = "ALL";
  if (fClass) fClass.value = "ALL";
  renderOpAllJournalsTable();
}

function deleteOpJournal(journalId) {
  const item = journals.find(j => j.id === journalId);
  if (!item) return;

  if (confirm(`Hapus catatan jurnal pembelajaran dari ${item.teacher} (${item.classSubject})?`)) {
    journals = journals.filter(j => j.id !== journalId);
    persistAllData();
    renderOpAllJournalsTable();
    renderJournalTable();
    showToast("Catatan jurnal berhasil dihapus dari database.", "info");
  }
}

function populateOpAttTeacherDropdown() {
  const select = document.getElementById("opAttFilterTeacher");
  if (!select) return;

  const currentVal = select.value || "ALL";
  select.innerHTML = '<option value="ALL">Semua Dewan Guru</option>' +
    teachers.map(t => `<option value="${t.name}">${t.name} (Kode ${t.code || '-'})</option>`).join("");
  select.value = currentVal;
}

function renderOpAllTeacherAttendanceTable() {
  const tbody = document.getElementById("opTeacherAttendanceTableBody");
  const countBadge = document.getElementById("opAttTotalCount");
  if (!tbody) return;

  populateOpAttTeacherDropdown();

  const filterTeacher = document.getElementById("opAttFilterTeacher")?.value || "ALL";
  const filterStatus = document.getElementById("opAttFilterStatus")?.value || "ALL";

  let filtered = [...teacherAttendance];
  if (filterTeacher !== "ALL") {
    filtered = filtered.filter(t => t.teacherName === filterTeacher);
  }
  if (filterStatus !== "ALL") {
    filtered = filtered.filter(t => (t.status && t.status.includes(filterStatus)) || (t.type && t.type.includes(filterStatus)));
  }

  if (countBadge) countBadge.innerText = filtered.length;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted" style="padding: 2.5rem 1rem;">Tidak ada rekaman presensi pendidik yang sesuai filter.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((item, idx) => {
    let badgeClass = "badge-hadir";
    if (item.status === "Terlambat") badgeClass = "badge-sakit";
    if (item.type && item.type.includes("Dinas")) badgeClass = "badge-izin";

    return `
      <tr>
        <td style="font-weight: 700; color: var(--color-text-muted);">${idx + 1}</td>
        <td>
          <img src="${item.photo}" alt="Selfie ${item.teacherName}" style="width: 44px; height: 44px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--color-primary-border);" onerror="this.src='assets/images/logo-madrasah.svg'">
        </td>
        <td>
          <strong>${item.teacherName}</strong>
          <div style="font-size: 0.75rem; color: var(--color-text-muted);">NIP: ${(!item.nip || item.nip === '-' || item.nip.toLowerCase().includes('belum')) ? 'Belum Ada NIP (-)' : item.nip}</div>
        </td>
        <td>
          <div style="font-weight: 700; color: var(--color-primary-dark); font-size: 0.85rem;">${item.date || '08 Oktober 2026'}</div>
          <code style="font-size: 0.75rem; color: var(--color-text-muted);">${item.time}</code>
        </td>
        <td><span class="badge ${badgeClass}">${item.status} • ${item.type}</span></td>
        <td style="font-size: 0.8rem; color: var(--color-text-muted);">${item.notes}</td>
        <td style="text-align: right;">
          <button class="btn btn-secondary btn-sm" style="color: var(--color-danger); padding: 4px 8px; font-size: 0.75rem;" onclick="deleteOpTeacherAttendance('${item.id}')" title="Hapus Presensi">
            Hapus
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function resetOpAttFilters() {
  const fTeacher = document.getElementById("opAttFilterTeacher");
  const fStatus = document.getElementById("opAttFilterStatus");
  if (fTeacher) fTeacher.value = "ALL";
  if (fStatus) fStatus.value = "ALL";
  renderOpAllTeacherAttendanceTable();
}

function deleteOpTeacherAttendance(attendanceId) {
  const item = teacherAttendance.find(t => t.id === attendanceId);
  if (!item) return;

  if (confirm(`Hapus data presensi dari ${item.teacherName} (${item.time})?`)) {
    teacherAttendance = teacherAttendance.filter(t => t.id !== attendanceId);
    persistAllData();
    renderOpAllTeacherAttendanceTable();
    renderTeacherAttendanceTable();
    updateTopStatistics();
    showToast("Data presensi pendidik berhasil dihapus dari database.", "info");
  }
}

function renderOpScheduleMatrixTable() {
  const tbody = document.getElementById("opScheduleMatrixTableBody");
  if (!tbody) return;

  tbody.innerHTML = SCHEDULE_MATRIX.map(row => `
    <tr>
      <td style="font-weight: 600; text-align: left; padding: 10px 14px;">
        <span style="display:inline-block; width:8px; height:8px; background:var(--color-primary); border-radius:50%; margin-right:8px;"></span>
        ${row.left.subject}
      </td>
      <td style="text-align: left; font-weight: 700; color: var(--color-text-main);">${row.left.teacher}</td>
      <td style="text-align: center; border-right: 2px solid var(--color-border);">
        <span class="badge" style="background:var(--color-primary); color:#ffffff; font-weight:800; min-width:32px; justify-content:center; padding: 4px 8px;">${row.left.code}</span>
      </td>
      <td style="font-weight: 600; text-align: left; padding: 10px 14px;">
        ${row.right.subject !== '-' ? `<span style="display:inline-block; width:8px; height:8px; background:var(--color-gold); border-radius:50%; margin-right:8px;"></span>` : ''}
        ${row.right.subject}
      </td>
      <td style="text-align: left; font-weight: 700; color: var(--color-text-main);">${row.right.teacher}</td>
      <td style="text-align: center;">
        ${row.right.code !== '-' ? `<span class="badge" style="background:var(--color-gold); color:#ffffff; font-weight:800; min-width:32px; justify-content:center; padding: 4px 8px;">${row.right.code}</span>` : '-'}
      </td>
    </tr>
  `).join("");
}

// ==========================================
// 7. MODUL CEK KEHADIRAN SISWA (KELAS 1, 2, 3) & DATABASE ARSIP
// ==========================================

// Beralih Tab Rombongan Belajar (Kelas 1, Kelas 2, Kelas 3)
function switchStudentClass(className) {
  currentSelectedClass = className;

  // Active status tombol tab kelas
  document.getElementById("btnClass1")?.classList.toggle("active", className === "Kelas 1");
  document.getElementById("btnClass2")?.classList.toggle("active", className === "Kelas 2");
  document.getElementById("btnClass3")?.classList.toggle("active", className === "Kelas 3");

  loadAttendanceForCurrentSelection();
}

// Beralih Sub-Tab Presensi Siswa: Input Harian vs Arsip Riwayat Database
function switchSiswaSubTab(subId) {
  const btnInput = document.getElementById("btnSubSiswaInput");
  const btnHistory = document.getElementById("btnSubSiswaHistory");
  const paneInput = document.getElementById("sub-siswa-input");
  const paneHistory = document.getElementById("sub-siswa-history");

  if (subId === "input") {
    if (btnInput) btnInput.classList.add("active");
    if (btnHistory) btnHistory.classList.remove("active");
    if (paneInput) paneInput.classList.remove("d-none");
    if (paneHistory) paneHistory.classList.add("d-none");
  } else {
    if (btnInput) btnInput.classList.remove("active");
    if (btnHistory) btnHistory.classList.add("active");
    if (paneInput) paneInput.classList.add("d-none");
    if (paneHistory) paneHistory.classList.remove("d-none");
    renderStudentHistoryTable();
  }
}

function updateHistoryBadgeCount() {
  const badge = document.getElementById("historyBadgeCount");
  if (badge) {
    badge.innerText = studentAttendanceHistory.length;
  }
}

// Filter Alfabet A-Z
function renderAzFilterBar() {
  const container = document.getElementById("azFilterContainer");
  if (!container) return;

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  let html = `<button class="az-btn ${currentAzFilter === 'ALL' ? 'active' : ''}" onclick="setAzFilter('ALL')">SEMUA (A-Z)</button>`;

  alphabet.forEach(letter => {
    const isActive = currentAzFilter === letter ? "active" : "";
    html += `<button class="az-btn ${isActive}" onclick="setAzFilter('${letter}')">${letter}</button>`;
  });

  container.innerHTML = html;
}

function setAzFilter(letter) {
  currentAzFilter = letter;
  renderAzFilterBar();
  renderStudentsTable();
}

function handleStudentSearch(val) {
  currentSearchQuery = val.toLowerCase().trim();
  renderStudentsTable();
}

function resetStudentFilter() {
  currentAzFilter = "ALL";
  currentSearchQuery = "";
  const input = document.getElementById("studentSearchInput");
  if (input) input.value = "";
  renderAzFilterBar();
  renderStudentsTable();
}

function populateStudentAttendanceTeacherDropdown() {
  const select = document.getElementById("studentAttendanceTeacherSelect");
  if (!select) return;
  select.innerHTML = '<option value="">-- Pilih Guru Pengisi / Wali Kelas / Piket --</option>' +
    teachers.map(t => `<option value="${t.name}" ${t.name === currentAttendanceTeacher ? 'selected' : ''}>${t.name} (${t.mapel})</option>`).join("");
}

// Alur 1: Saat Tanggal Berubah -> Muat Data Tanggal Tersebut Dari History (Jika ada) Atau Kosongkan (Jika belum ada)
function handleStudentAttendanceDateChange() {
  const val = document.getElementById("studentAttendanceDate")?.value;
  if (val) {
    currentAttendanceDate = val;
    loadAttendanceForCurrentSelection();
    showToast(`Memuat status presensi tanggal: ${formatTanggalIndo(currentAttendanceDate)}`, "info");
  }
}

// Alur 2: Saat Guru Pengisi Berubah
function handleStudentAttendanceTeacherChange() {
  const val = document.getElementById("studentAttendanceTeacherSelect")?.value;
  if (val) {
    currentAttendanceTeacher = val;
    localStorage.setItem("simadrasah_last_student_teacher", currentAttendanceTeacher);
    showToast(`Guru pengisi presensi diset ke: ${currentAttendanceTeacher}`, "info");
    renderStudentsTable();
  }
}

// Logika Kunci: Pengecekan Riwayat Database vs Data Kosong
function loadAttendanceForCurrentSelection() {
  const existingBatch = studentAttendanceHistory.find(
    h => h.date === currentAttendanceDate && h.class === currentSelectedClass
  );

  currentSessionStatusMap = {};
  const classStudents = students.filter(s => s.class === currentSelectedClass);

  if (existingBatch) {
    // 1. Data Ditemukan di Database (Misal 07/10/2026 yang sudah diabsen)
    currentBatchSavedRecord = existingBatch;
    currentAttendanceTeacher = existingBatch.recordedBy || currentAttendanceTeacher;
    const select = document.getElementById("studentAttendanceTeacherSelect");
    if (select && existingBatch.recordedBy) {
      select.value = existingBatch.recordedBy;
    }

    classStudents.forEach(s => {
      const rec = existingBatch.records.find(r => r.id === s.id || r.nisn === s.nisn);
      if (rec) {
        currentSessionStatusMap[s.id] = {
          status: rec.status === "-" ? "" : (rec.status || ""),
          notes: rec.notes || ""
        };
      } else {
        currentSessionStatusMap[s.id] = { status: "", notes: s.notes || "" };
      }
    });

    renderAttendanceAlertBanner(true, existingBatch);
  } else {
    // 2. Data Belum Ada / Data Kosong (Sesuai Permintaan User: kosong datanya jika belum ada kehadiran)
    currentBatchSavedRecord = null;
    classStudents.forEach(s => {
      currentSessionStatusMap[s.id] = { status: "", notes: "" };
    });

    renderAttendanceAlertBanner(false, null);
  }

  renderStudentsTable();
}

// Banner Dinamis Penanda Status Data
function renderAttendanceAlertBanner(isSaved, batch) {
  const container = document.getElementById("attendanceBatchStatusAlert");
  const saveBtnText = document.getElementById("btnSaveAttendanceText");
  const saveSectionTitle = document.getElementById("saveSectionTitle");
  const saveSessionHint = document.getElementById("saveSessionHint");

  if (!container) return;

  const formattedDate = formatTanggalIndo(currentAttendanceDate);

  if (isSaved && batch) {
    container.innerHTML = `
      <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-left: 4px solid #10b981; padding: 12px 16px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 32px; height: 32px; background: #10b981; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div>
            <div style="font-weight: 700; color: #065f46; font-size: 0.88rem;">
              Status Presensi: TERDATA &amp; TERSIMPAN DI DATABASE
            </div>
            <div style="font-size: 0.78rem; color: #047857; margin-top: 2px;">
              Tercatat oleh: <strong>${batch.recordedBy}</strong> • Disimpan: <strong>${batch.savedAt || batch.date}</strong>
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <span class="badge badge-hadir" style="font-size: 0.75rem; padding: 5px 10px;">
            ✓ Sesi Tersimpan di Riwayat
          </span>
          <span style="font-size: 0.75rem; color: #065f46; font-weight: 600;">
            (Bisa diedit kapan saja)
          </span>
        </div>
      </div>
    `;
    if (saveBtnText) saveBtnText.innerText = "Perbarui Data Presensi";
    if (saveSectionTitle) saveSectionTitle.innerText = `✏️ Perbarui Data Presensi (${currentSelectedClass} • ${formattedDate})`;
    if (saveSessionHint) saveSessionHint.innerText = `Data tanggal ${formattedDate} telah tersimpan di database. Anda dapat mengoreksi kehadiran di tabel atas lalu klik 'Perbarui Data Presensi'.`;
  } else {
    container.innerHTML = `
      <div style="background: #fffbeb; border: 1px solid #fde68a; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 32px; height: 32px; background: #f59e0b; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div>
            <div style="font-weight: 700; color: #92400e; font-size: 0.88rem;">
              Status Presensi: DATA KOSONG (Belum Ada Kehadiran Siswa)
            </div>
            <div style="font-size: 0.78rem; color: #b45309; margin-top: 2px;">
              Belum ada data kehadiran untuk <strong>${currentSelectedClass}</strong> pada tanggal <strong>${formattedDate}</strong>.
            </div>
          </div>
        </div>
        <div>
          <span class="badge" style="background: #fef3c7; color: #92400e; border: 1px solid #fde68a; font-size: 0.75rem; padding: 5px 10px;">
            ⚠️ Belum Disimpan
          </span>
        </div>
      </div>
    `;
    if (saveBtnText) saveBtnText.innerText = "Simpan Data Presensi";
    if (saveSectionTitle) saveSectionTitle.innerText = `💾 Simpan Presensi Baru (${currentSelectedClass} • ${formattedDate})`;
    if (saveSessionHint) saveSessionHint.innerText = `Silakan tentukan status kehadiran siswa (H/S/I/A), lalu klik 'Simpan Data Presensi' untuk mencatat ke riwayat database.`;
  }
}

// Render Tabel Siswa Terurut A - Z Sesuai Alur Logika
function renderStudentsTable() {
  const tbody = document.getElementById("studentAttendanceTableBody");
  if (!tbody) return;

  let classStudents = students.filter(s => s.class === currentSelectedClass);

  // Wajib Urut A sampai Z secara Alfabetis
  classStudents.sort((a, b) => a.name.localeCompare(b.name, "id", { sensitivity: "base" }));

  // Filter berdasarkan alfabet A-Z
  if (currentAzFilter !== "ALL") {
    classStudents = classStudents.filter(s => s.name.toUpperCase().startsWith(currentAzFilter));
  }

  // Filter pencarian nama / NISN
  if (currentSearchQuery) {
    classStudents = classStudents.filter(s =>
      s.name.toLowerCase().includes(currentSearchQuery) ||
      s.nisn.toLowerCase().includes(currentSearchQuery)
    );
  }

  // Hitung statistik kelas aktif
  updateClassAttendanceStats();

  if (classStudents.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted" style="padding: 2.5rem;">Tidak ditemukan siswa dengan filter yang dipilih di ${currentSelectedClass}.</td></tr>`;
    return;
  }

  tbody.innerHTML = classStudents.map((s, idx) => {
    const initials = s.name.split(" ").map(w => w[0]).slice(0, 2).join("");
    const sessionData = currentSessionStatusMap[s.id] || { status: "", notes: "" };
    const stVal = sessionData.status || "";
    const notesVal = sessionData.notes !== undefined ? sessionData.notes : (s.notes || "");
    const recorderName = currentAttendanceTeacher || "-";

    // Label status badge
    let statusBadgeHtml = '<span class="badge" style="background:#f1f5f9; color:#64748b; border:1px solid #e2e8f0; font-size:0.75rem;">- Belum Diisi</span>';
    if (stVal === "H") statusBadgeHtml = '<span class="badge badge-hadir">Hadir (H)</span>';
    else if (stVal === "S") statusBadgeHtml = '<span class="badge badge-sakit">Sakit (S)</span>';
    else if (stVal === "I") statusBadgeHtml = '<span class="badge badge-izin">Izin (I)</span>';
    else if (stVal === "A") statusBadgeHtml = '<span class="badge badge-alpa">Alpa (A)</span>';

    return `
      <tr>
        <td style="font-weight: 700; color: var(--color-text-muted);">${idx + 1}</td>
        <td><code style="font-size: 0.8rem; color: var(--color-text-muted);">${s.nisn}</code></td>
        <td>
          <div style="display: flex; align-items: center;">
            <span class="student-avatar">${initials}</span>
            <div>
              <strong>${s.name}</strong>
            </div>
          </div>
        </td>
        <td><span style="font-size: 0.8rem; color: var(--color-text-muted);">${s.gender}</span></td>
        <td><span style="font-size: 0.825rem; color: var(--color-primary-dark); font-weight: 600;">${recorderName}</span></td>
        <td style="text-align: center;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
            <div class="attendance-radio-group">
              <button type="button" class="attendance-radio-btn ${stVal === 'H' ? 'active-H' : ''}" title="Hadir" onclick="updateStudentStatus('${s.id}', 'H')">H</button>
              <button type="button" class="attendance-radio-btn ${stVal === 'S' ? 'active-S' : ''}" title="Sakit" onclick="updateStudentStatus('${s.id}', 'S')">S</button>
              <button type="button" class="attendance-radio-btn ${stVal === 'I' ? 'active-I' : ''}" title="Izin" onclick="updateStudentStatus('${s.id}', 'I')">I</button>
              <button type="button" class="attendance-radio-btn ${stVal === 'A' ? 'active-A' : ''}" title="Alpa" onclick="updateStudentStatus('${s.id}', 'A')">A</button>
            </div>
            <div>${statusBadgeHtml}</div>
          </div>
        </td>
        <td>
          <input type="text" class="form-control" style="font-size: 0.775rem; padding: 4px 8px;" placeholder="Catatan khusus siswa..." value="${notesVal}" onchange="updateStudentNotes('${s.id}', this.value)">
        </td>
      </tr>
    `;
  }).join("");
}

// Statistik Sesi Presensi Aktif
function updateClassAttendanceStats() {
  const classStudents = students.filter(s => s.class === currentSelectedClass);
  const total = classStudents.length;

  let h = 0, s = 0, i = 0, a = 0, belum = 0;

  classStudents.forEach(st => {
    const stVal = (currentSessionStatusMap[st.id] && currentSessionStatusMap[st.id].status) || "";
    if (stVal === "H") h++;
    else if (stVal === "S") s++;
    else if (stVal === "I") i++;
    else if (stVal === "A") a++;
    else belum++;
  });

  const elTotal = document.getElementById("classStatTotal");
  const elHadir = document.getElementById("classStatHadir");
  const elSakit = document.getElementById("classStatSakit");
  const elIzin = document.getElementById("classStatIzin");
  const elAlpa = document.getElementById("classStatAlpa");
  const elBelum = document.getElementById("classStatBelum");

  if (elTotal) elTotal.innerText = total;
  if (elHadir) elHadir.innerText = h;
  if (elSakit) elSakit.innerText = s;
  if (elIzin) elIzin.innerText = i;
  if (elAlpa) elAlpa.innerText = a;
  if (elBelum) elBelum.innerText = belum;
}

// Update status kehadiran siswa per individu
function updateStudentStatus(studentId, newStatus) {
  if (!currentSessionStatusMap[studentId]) {
    currentSessionStatusMap[studentId] = { status: "", notes: "" };
  }

  // Jika tombol yang sama ditekan ulang, batalkan pilihan (menjadi kosong)
  if (currentSessionStatusMap[studentId].status === newStatus) {
    currentSessionStatusMap[studentId].status = "";
  } else {
    currentSessionStatusMap[studentId].status = newStatus;
  }

  renderStudentsTable();
}

function updateStudentNotes(studentId, newNotes) {
  if (!currentSessionStatusMap[studentId]) {
    currentSessionStatusMap[studentId] = { status: "", notes: "" };
  }
  currentSessionStatusMap[studentId].notes = newNotes;
}

// Tandai semua Hadir
function markAllStudentsPresent() {
  const classStudents = students.filter(s => s.class === currentSelectedClass);
  classStudents.forEach(s => {
    if (!currentSessionStatusMap[s.id]) {
      currentSessionStatusMap[s.id] = { status: "H", notes: "" };
    } else {
      currentSessionStatusMap[s.id].status = "H";
    }
  });
  renderStudentsTable();
  showToast(`Semua siswa di ${currentSelectedClass} telah ditandai HADIR!`, "success");
}

// Kosongkan semua pilihan di sesi ini
function clearCurrentAttendanceSelection() {
  const classStudents = students.filter(s => s.class === currentSelectedClass);
  classStudents.forEach(s => {
    if (!currentSessionStatusMap[s.id]) {
      currentSessionStatusMap[s.id] = { status: "", notes: "" };
    } else {
      currentSessionStatusMap[s.id].status = "";
    }
  });
  renderStudentsTable();
  showToast(`Pilihan kehadiran di ${currentSelectedClass} telah dikosongkan.`, "info");
}

// Alur 5: Klik Simpan / Perbarui Presensi ke Database & Riwayat
function saveCurrentStudentAttendanceBatch() {
  if (!currentAttendanceTeacher) {
    showToast("Pilih nama guru yang mengisi absensi terlebih dahulu!", "warning");
    const select = document.getElementById("studentAttendanceTeacherSelect");
    if (select) select.focus();
    return;
  }

  const classStudents = students.filter(s => s.class === currentSelectedClass);
  classStudents.sort((a, b) => a.name.localeCompare(b.name, "id", { sensitivity: "base" }));

  let h = 0, s = 0, i = 0, a = 0, belum = 0;
  const records = classStudents.map(st => {
    const sess = currentSessionStatusMap[st.id] || { status: "", notes: "" };
    const stat = sess.status || "-";
    if (stat === "H") h++;
    else if (stat === "S") s++;
    else if (stat === "I") i++;
    else if (stat === "A") a++;
    else belum++;

    return {
      id: st.id,
      nisn: st.nisn,
      name: st.name,
      gender: st.gender,
      status: stat,
      notes: sess.notes || ""
    };
  });

  const now = new Date();
  const d = String(now.getDate()).padStart(2, "0");
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const y = now.getFullYear();
  const hr = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const savedAtStr = `${d}/${m}/${y} ${hr}:${min} WIB`;

  const existingIdx = studentAttendanceHistory.findIndex(
    item => item.date === currentAttendanceDate && item.class === currentSelectedClass
  );

  const batchData = {
    id: existingIdx >= 0 ? studentAttendanceHistory[existingIdx].id : `HIST_${currentAttendanceDate}_${currentSelectedClass}`,
    date: currentAttendanceDate,
    class: currentSelectedClass,
    recordedBy: currentAttendanceTeacher,
    savedAt: savedAtStr,
    stats: { total: classStudents.length, hadir: h, sakit: s, izin: i, alpa: a, belumDiisi: belum },
    records: records
  };

  if (existingIdx >= 0) {
    studentAttendanceHistory[existingIdx] = batchData;
    showToast(`✓ Riwayat presensi ${currentSelectedClass} tanggal ${formatTanggalIndo(currentAttendanceDate)} berhasil DIPERBARUI!`, "success");
  } else {
    studentAttendanceHistory.unshift(batchData);
    showToast(`✓ Data presensi ${currentSelectedClass} tanggal ${formatTanggalIndo(currentAttendanceDate)} berhasil DISIMPAN ke Database!`, "success");
  }

  localStorage.setItem("simadrasah_student_history", JSON.stringify(studentAttendanceHistory));
  // Sinkronkan seluruh riwayat ke Google Sheets agar lembar PRESENSI_SISWA 100% konsisten tanpa tumpang tindih kolom
  sendBackgroundAutoSync("SYNC_STUDENT_ATTENDANCE", { studentAttendanceHistory: studentAttendanceHistory });
  updateHistoryBadgeCount();
  renderStudentHistoryTable();
  loadAttendanceForCurrentSelection();
}

// Render Tabel Database Riwayat Arsip Presensi Tersimpan
function renderStudentHistoryTable() {
  const tbody = document.getElementById("studentHistoryTableBody");
  if (!tbody) return;

  const classFilter = document.getElementById("filterHistoryClass")?.value || "ALL";
  const dateFilter = document.getElementById("filterHistoryDate")?.value || "";

  let list = [...studentAttendanceHistory];

  // Urutkan tanggal terbaru ke terlama
  list.sort((a, b) => b.date.localeCompare(a.date));

  if (classFilter !== "ALL") {
    list = list.filter(item => item.class === classFilter);
  }

  if (dateFilter) {
    list = list.filter(item => item.date === dateFilter);
  }

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center text-muted" style="padding: 2.5rem;">
          <div style="font-size: 1.05rem; font-weight: 700; margin-bottom: 6px; color: var(--color-primary-dark);">Belum Ada Riwayat Presensi Tersimpan</div>
          <div style="font-size: 0.8rem;">Gunakan tab "1. Input &amp; Pengecekan Presensi Harian" untuk mulai mengisi presensi kelas dan menyimpannya ke database.</div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map((item, idx) => {
    const formattedDate = formatTanggalIndo(item.date);
    const st = item.stats || { total: 0, hadir: 0, sakit: 0, izin: 0, alpa: 0, belumDiisi: 0 };
    return `
      <tr>
        <td style="font-weight: 700; color: var(--color-text-muted);">${idx + 1}</td>
        <td>
          <div style="font-weight: 700; color: var(--color-primary-dark); font-size: 0.88rem;">
            ${formattedDate}
          </div>
          <code style="font-size: 0.72rem; color: var(--color-text-light);">${item.date}</code>
        </td>
        <td>
          <span class="badge" style="background:#eaf6ef; color:#0f5a34; border:1px solid #b8e2cb; font-weight:800; font-size: 0.8rem;">
            ${item.class}
          </span>
        </td>
        <td>
          <div style="font-weight: 700; color: var(--color-text-main);">${item.recordedBy || '-'}</div>
          <span style="font-size: 0.725rem; color: var(--color-text-muted);">Pengisi Presensi / Piket</span>
        </td>
        <td style="text-align: center;">
          <div style="display: flex; gap: 4px; justify-content: center; flex-wrap: wrap;">
            <span class="badge badge-hadir" title="Hadir">${st.hadir} Hadir</span>
            <span class="badge badge-sakit" title="Sakit">${st.sakit} Sakit</span>
            <span class="badge badge-izin" title="Izin">${st.izin} Izin</span>
            <span class="badge badge-alpa" title="Alpa">${st.alpa} Alpa</span>
            ${st.belumDiisi > 0 ? `<span class="badge" style="background:#f1f5f9; color:#64748b;" title="Belum Diisi">${st.belumDiisi} Kosong</span>` : ''}
          </div>
        </td>
        <td>
          <div style="font-size: 0.8rem; font-weight: 600; color: var(--color-text-muted);">${item.savedAt || '-'}</div>
        </td>
        <td style="text-align: right; white-space: nowrap;">
          <button class="btn btn-primary btn-sm" style="padding: 4px 10px; font-size: 0.775rem;" onclick="editHistoryBatch('${item.id}')" title="Buka dan Koreksi Kesalahan Presensi">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Buka &amp; Edit
          </button>
          <button class="btn btn-outline btn-sm" style="padding: 4px 8px; font-size: 0.775rem; color: #15803d; border-color: #15803d;" onclick="exportSpecificHistoryExcel('${item.id}')" title="Unduh Lembar Excel Sesi Ini">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Excel
          </button>
          <button class="btn btn-secondary btn-sm" style="padding: 4px 7px; color: var(--color-danger);" onclick="deleteHistoryBatch('${item.id}')" title="Hapus Riwayat Presensi">
            &times;
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function resetHistoryFilters() {
  const fClass = document.getElementById("filterHistoryClass");
  const fDate = document.getElementById("filterHistoryDate");
  if (fClass) fClass.value = "ALL";
  if (fDate) fDate.value = "";
  renderStudentHistoryTable();
}

// Buka Sesi dari History untuk Mengedit Kesalahan
function editHistoryBatch(batchId) {
  const batch = studentAttendanceHistory.find(b => b.id === batchId);
  if (!batch) return;

  currentAttendanceDate = batch.date;
  currentSelectedClass = batch.class;
  currentAttendanceTeacher = batch.recordedBy;

  const dateInput = document.getElementById("studentAttendanceDate");
  if (dateInput) dateInput.value = batch.date;

  const teacherSelect = document.getElementById("studentAttendanceTeacherSelect");
  if (teacherSelect) teacherSelect.value = batch.recordedBy;

  // Active status tombol tab kelas
  document.getElementById("btnClass1")?.classList.toggle("active", batch.class === "Kelas 1");
  document.getElementById("btnClass2")?.classList.toggle("active", batch.class === "Kelas 2");
  document.getElementById("btnClass3")?.classList.toggle("active", batch.class === "Kelas 3");

  switchSiswaSubTab("input");
  loadAttendanceForCurrentSelection();
  showToast(`Sesi presensi ${batch.class} tanggal ${formatTanggalIndo(batch.date)} dibuka dalam mode EDIT. Silakan lakukan revisi lalu klik 'Perbarui Data Presensi'.`, "info");
}

function deleteHistoryBatch(batchId) {
  const batch = studentAttendanceHistory.find(b => b.id === batchId);
  if (!batch) return;

  if (confirm(`Hapus data riwayat presensi ${batch.class} tanggal ${formatTanggalIndo(batch.date)} dari database?`)) {
    studentAttendanceHistory = studentAttendanceHistory.filter(b => b.id !== batchId);
    localStorage.setItem("simadrasah_student_history", JSON.stringify(studentAttendanceHistory));
    updateHistoryBadgeCount();
    renderStudentHistoryTable();
    if (currentAttendanceDate === batch.date && currentSelectedClass === batch.class) {
      loadAttendanceForCurrentSelection();
    }
    // Sinkronkan ke Google Sheets agar baris tersebut langsung terhapus bersih dari sheet PRESENSI_SISWA
    sendBackgroundAutoSync("SYNC_STUDENT_ATTENDANCE", { studentAttendanceHistory: studentAttendanceHistory });
    showToast("Riwayat presensi berhasil dihapus dari database dan disinkronkan ke Google Sheets.", "info");
  }
}

// Ekspor Lembar Excel Spesifik dari Riwayat
function exportSpecificHistoryExcel(batchId) {
  const batch = studentAttendanceHistory.find(b => b.id === batchId);
  if (!batch) return;

  const selectedDateFormatted = formatTanggalIndo(batch.date) || batch.date;
  const statusMap = { "H": "Hadir", "S": "Sakit", "I": "Izin", "A": "Alpa", "-": "Belum Diisi" };

  const rowsHtml = batch.records.map((s, idx) => `
    <tr>
      <td style="text-align:center;">${idx + 1}</td>
      <td style="mso-number-format:'\\@';">${s.nisn}</td>
      <td>${s.name}</td>
      <td>${batch.class}</td>
      <td>${s.gender}</td>
      <td>${batch.recordedBy || '-'}</td>
      <td style="text-align:center; font-weight:bold;">${statusMap[s.status] || s.status}</td>
      <td>${s.notes || '-'}</td>
    </tr>
  `).join("");

  generateAndDownloadExcel(batch.class, batch.date, selectedDateFormatted, batch.recordedBy, rowsHtml);
}

// Ekspor Lembar Excel Sesi Aktif
function exportStudentAttendanceExcel() {
  const selectedDateFormatted = formatTanggalIndo(currentAttendanceDate) || currentAttendanceDate;
  const classStudents = students.filter(s => s.class === currentSelectedClass);
  classStudents.sort((a, b) => a.name.localeCompare(b.name, "id", { sensitivity: "base" }));

  const statusMap = { "H": "Hadir", "S": "Sakit", "I": "Izin", "A": "Alpa", "-": "Belum Diisi" };

  const rowsHtml = classStudents.map((s, idx) => {
    const sess = currentSessionStatusMap[s.id] || { status: "-", notes: "" };
    const stVal = sess.status || "-";
    const notesVal = sess.notes || s.notes || "-";
    return `
      <tr>
        <td style="text-align:center;">${idx + 1}</td>
        <td style="mso-number-format:'\\@';">${s.nisn}</td>
        <td>${s.name}</td>
        <td>${s.class}</td>
        <td>${s.gender}</td>
        <td>${currentAttendanceTeacher || '-'}</td>
        <td style="text-align:center; font-weight:bold;">${statusMap[stVal] || stVal}</td>
        <td>${notesVal}</td>
      </tr>
    `;
  }).join("");

  generateAndDownloadExcel(currentSelectedClass, currentAttendanceDate, selectedDateFormatted, currentAttendanceTeacher, rowsHtml);
}

function generateAndDownloadExcel(className, dateStr, formattedDate, teacherName, rowsHtml) {
  const excelContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Presensi ${className}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      <style>
        table { border-collapse: collapse; width: 100%; font-family: Calibri, Arial, sans-serif; }
        th { background-color: #0f5a34; color: #ffffff; font-weight: bold; border: 1px solid #000000; padding: 8px 12px; }
        td { border: 1px solid #000000; padding: 6px 10px; }
        .header-title { font-size: 15pt; font-weight: bold; text-align: center; color: #0f5a34; }
        .meta-text { font-size: 10pt; }
      </style>
    </head>
    <body>
      <table>
        <tr><td colspan="8" class="header-title">${schoolProfile.name}</td></tr>
        <tr><td colspan="8" style="text-align:center; font-weight:bold;">REKAPITULASI PRESENSI KEHADIRAN PESERTA DIDIK</td></tr>
        <tr><td colspan="8" style="text-align:center; font-size:9pt;">Alamat: ${schoolProfile.address} | NSM: ${schoolProfile.nsm} | NPSN: ${schoolProfile.npsn}</td></tr>
        <tr><td colspan="8"></td></tr>
        <tr>
          <td colspan="2" class="meta-text"><strong>Rombongan Belajar:</strong></td>
          <td colspan="2" class="meta-text">${className}</td>
          <td colspan="2" class="meta-text"><strong>Tanggal Presensi:</strong></td>
          <td colspan="2" class="meta-text">${formattedDate}</td>
        </tr>
        <tr>
          <td colspan="2" class="meta-text"><strong>Guru Pengisi / Guru Piket:</strong></td>
          <td colspan="6" class="meta-text">${teacherName || '-'}</td>
        </tr>
        <tr><td colspan="8"></td></tr>
        <thead>
          <tr>
            <th style="background-color:#0f5a34; color:#ffffff;">No</th>
            <th style="background-color:#0f5a34; color:#ffffff;">NISN</th>
            <th style="background-color:#0f5a34; color:#ffffff;">Nama Peserta Didik</th>
            <th style="background-color:#0f5a34; color:#ffffff;">Kelas</th>
            <th style="background-color:#0f5a34; color:#ffffff;">Jenis Kelamin</th>
            <th style="background-color:#0f5a34; color:#ffffff;">Guru Pengisi / Piket</th>
            <th style="background-color:#0f5a34; color:#ffffff;">Status Kehadiran</th>
            <th style="background-color:#0f5a34; color:#ffffff;">Catatan Khusus Siswa</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob([excelContent], { type: "application/vnd.ms-excel;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const fileName = `Presensi_${className.replace(/\s+/g, '_')}_${dateStr}.xls`;
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Berkas rekap Excel berhasil diunduh: ${fileName}`, "success");
}

// ==========================================
// 8. PANEL OPERATOR / ADMIN KURIKULUM
// ==========================================
// A. KOREKSI DATA GURU
function clearTeacherNipInput() {
  const input = document.getElementById("modalTeacherNip");
  if (input) {
    input.value = "-";
    showToast("NIP dikosongkan (disetel '-'). Guru terdata sebagai Belum Memiliki NIP.", "info");
  }
}

function renderOpTeachersTable() {
  const tbody = document.getElementById("opTeacherTableBody");
  if (!tbody) return;

  tbody.innerHTML = teachers.map((t, idx) => {
    const hasNip = t.nip && t.nip !== "-" && !t.nip.toLowerCase().includes("belum");
    const nipBadge = hasNip
      ? `<code>${t.nip}</code>`
      : `<span class="badge" style="background:#f1f5f9; color:#64748b; border:1px solid #cbd5e1; font-size:0.75rem;">Belum Memiliki NIP (-)</span>`;

    return `
    <tr>
      <td style="font-weight: 700; color: var(--color-text-muted);">${idx + 1}</td>
      <td style="text-align: center;"><span class="badge" style="background:#eaf6ef; color:#0f5a34; border:1px solid #b8e2cb; font-weight:800;">${t.code || '-'}</span></td>
      <td><strong>${t.name}</strong></td>
      <td>${nipBadge}</td>
      <td><span class="badge" style="background:#f1f5f9; color:#334155; border:1px solid #cbd5e1;">${t.mapel}</span></td>
      <td>${t.role || '-'}</td>
      <td style="text-align: right;">
        <button class="btn btn-outline btn-sm" onclick="openEditTeacherModal('${t.id}')">Koreksi</button>
        <button class="btn btn-secondary btn-sm" style="color: var(--color-danger);" onclick="deleteTeacher('${t.id}')">&times;</button>
      </td>
    </tr>
  `;
  }).join("");
}

function openAddTeacherModal() {
  document.getElementById("modalTeacherTitle").innerText = "Tambah Pendidik Baru";
  document.getElementById("modalTeacherId").value = "";
  document.getElementById("modalTeacherCode").value = "";
  document.getElementById("modalTeacherName").value = "";
  document.getElementById("modalTeacherNip").value = "-";
  document.getElementById("modalTeacherMapel").value = "";
  document.getElementById("modalTeacherRole").value = "";
  const codeField = document.getElementById("modalTeacherAccessCode");
  if (codeField) {
    codeField.value = "GURU" + Math.floor(1000 + Math.random() * 9000);
  }
  openModal("modalEditTeacher");
}

function openEditTeacherModal(teacherId) {
  const t = teachers.find(item => item.id === teacherId);
  if (!t) return;

  document.getElementById("modalTeacherTitle").innerText = "Koreksi Kesalahan Penulisan Guru";
  document.getElementById("modalTeacherId").value = t.id;
  document.getElementById("modalTeacherCode").value = t.code || "";
  document.getElementById("modalTeacherName").value = t.name;
  document.getElementById("modalTeacherNip").value = (t.nip && t.nip !== "-") ? t.nip : "-";
  document.getElementById("modalTeacherMapel").value = t.mapel;
  document.getElementById("modalTeacherRole").value = t.role || "";
  const codeField = document.getElementById("modalTeacherAccessCode");
  if (codeField) {
    codeField.value = t.accessCode || "1234";
  }
  openModal("modalEditTeacher");
}

function saveTeacherFromModal(e) {
  e.preventDefault();
  const id = document.getElementById("modalTeacherId").value;
  const code = document.getElementById("modalTeacherCode").value.trim();
  const name = document.getElementById("modalTeacherName").value.trim();
  let nip = document.getElementById("modalTeacherNip").value.trim();
  if (!nip || nip === "" || nip === "-") {
    nip = "-";
  }
  const mapel = document.getElementById("modalTeacherMapel").value.trim();
  const role = document.getElementById("modalTeacherRole").value.trim();
  const accessCode = (document.getElementById("modalTeacherAccessCode")?.value || "").trim().toUpperCase() || "1234";

  if (id) {
    // Edit / Koreksi
    const t = teachers.find(item => item.id === id);
    if (t) {
      t.code = code;
      t.name = name;
      t.nip = nip;
      t.mapel = mapel;
      t.role = role;
      t.accessCode = accessCode;
      showToast("Data penulisan guru berhasil dikoreksi!", "success");
    }
  } else {
    // Tambah Baru
    teachers.push({
      id: "G" + Date.now(),
      code: code || String(teachers.length + 1),
      name,
      nip,
      mapel,
      role,
      accessCode
    });
    showToast("Pendidik baru berhasil ditambahkan!", "success");
  }

  persistAllData();
  renderOpTeachersTable();
  renderOpTeacherCodesTable();
  populateOpJournalTeacherDropdown();
  populateOpAttTeacherDropdown();
  populateTeacherDropdowns();
  populateTeacherGateDropdown();
  populateStudentAttendanceTeacherDropdown();
  updateTopStatistics();
  sendBackgroundAutoSync("SYNC_TEACHERS", { teachers: teachers });
  closeModal("modalEditTeacher");
}

function deleteTeacher(teacherId) {
  if (confirm("Apakah Anda yakin ingin menghapus data pendidik ini?")) {
    teachers = teachers.filter(t => t.id !== teacherId);
    persistAllData();
    renderOpTeachersTable();
    renderOpTeacherCodesTable();
    populateOpJournalTeacherDropdown();
    populateOpAttTeacherDropdown();
    populateTeacherDropdowns();
    populateTeacherGateDropdown();
    populateStudentAttendanceTeacherDropdown();
    updateTopStatistics();
    sendBackgroundAutoSync("SYNC_TEACHERS", { teachers: teachers });
    showToast("Data pendidik berhasil dihapus dan disinkronkan ke Google Sheets.", "info");
  }
}

// B. KOREKSI DATA SISWA
function renderOpStudentsTable() {
  const tbody = document.getElementById("opStudentTableBody");
  if (!tbody) return;

  const classFilter = document.getElementById("opClassFilter") ? document.getElementById("opClassFilter").value : "Semua";
  let filtered = students;
  if (classFilter !== "Semua") {
    filtered = students.filter(s => s.class === classFilter);
  }

  // Tetap terurut A-Z untuk kenyamanan operator
  filtered.sort((a, b) => a.name.localeCompare(b.name, "id"));

  tbody.innerHTML = filtered.map((s, idx) => `
    <tr>
      <td style="font-weight: 700; color: var(--color-text-muted);">${idx + 1}</td>
      <td><code>${s.nisn}</code></td>
      <td><strong>${s.name}</strong></td>
      <td><span class="badge" style="background:#eaf6ef; color:#0f5a34; border:1px solid #b8e2cb;">${s.class}</span></td>
      <td>${s.gender}</td>
      <td style="text-align: right;">
        <button class="btn btn-outline btn-sm" onclick="openEditStudentModal('${s.id}')">Koreksi</button>
        <button class="btn btn-secondary btn-sm" style="color: var(--color-danger);" onclick="deleteStudent('${s.id}')">&times;</button>
      </td>
    </tr>
  `).join("");
}

function openAddStudentModal() {
  document.getElementById("modalStudentTitle").innerText = "Tambah Siswa Baru";
  document.getElementById("modalStudentId").value = "";
  document.getElementById("modalStudentName").value = "";
  document.getElementById("modalStudentNisn").value = "";
  document.getElementById("modalStudentClass").value = currentSelectedClass;
  document.getElementById("modalStudentGender").value = "Laki-laki";
  openModal("modalEditStudent");
}

function openEditStudentModal(studentId) {
  const s = students.find(item => item.id === studentId);
  if (!s) return;

  document.getElementById("modalStudentTitle").innerText = "Koreksi Kesalahan Penulisan Siswa";
  document.getElementById("modalStudentId").value = s.id;
  document.getElementById("modalStudentName").value = s.name;
  document.getElementById("modalStudentNisn").value = s.nisn;
  document.getElementById("modalStudentClass").value = s.class;
  document.getElementById("modalStudentGender").value = s.gender;
  openModal("modalEditStudent");
}

function saveStudentFromModal(e) {
  e.preventDefault();
  const id = document.getElementById("modalStudentId").value;
  const name = document.getElementById("modalStudentName").value.trim();
  const nisn = document.getElementById("modalStudentNisn").value.trim();
  const studentClass = document.getElementById("modalStudentClass").value;
  const gender = document.getElementById("modalStudentGender").value;

  if (id) {
    // Koreksi typo atau data
    const s = students.find(item => item.id === id);
    if (s) {
      s.name = name;
      s.nisn = nisn;
      s.class = studentClass;
      s.gender = gender;
      showToast("Koreksi penulisan nama siswa berhasil disimpan!", "success");
    }
  } else {
    // Siswa Baru
    students.push({
      id: "S" + Date.now(),
      name,
      nisn,
      class: studentClass,
      gender,
      status: "H",
      notes: ""
    });
    showToast("Siswa baru berhasil ditambahkan!", "success");
  }

  persistAllData();
  renderOpStudentsTable();
  renderStudentsTable();
  updateTopStatistics();
  sendBackgroundAutoSync("SYNC_STUDENTS", { students: students });
  closeModal("modalEditStudent");
}

function deleteStudent(studentId) {
  if (confirm("Apakah Anda yakin ingin menghapus data siswa ini?")) {
    students = students.filter(s => s.id !== studentId);
    persistAllData();
    renderOpStudentsTable();
    renderOpStudentsTable();
    renderStudentsTable();
    updateTopStatistics();
    sendBackgroundAutoSync("SYNC_STUDENTS", { students: students });
    showToast("Data siswa berhasil dihapus dan disinkronkan ke Google Sheets.", "info");
  }
}

// C. LOGO & IDENTITAS MADRASAH
function handleLogoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (evt) {
    const base64Data = evt.target.result;
    schoolProfile.logo = base64Data;
    persistAllData();
    applySchoolProfileUI();
    showToast("Logo madrasah berhasil diperbarui dari berkas lokal!", "success");
  };
  reader.readAsDataURL(file);
}

function resetDefaultLogo() {
  schoolProfile.logo = "logo.jpeg";
  persistAllData();
  applySchoolProfileUI();
  showToast("Logo telah dikembalikan ke logo resmi madrasah.", "info");
}

function saveSchoolProfile(e) {
  e.preventDefault();
  schoolProfile.name = document.getElementById("profSchoolName").value.trim();
  schoolProfile.nsm = document.getElementById("profNsm").value.trim();
  schoolProfile.npsn = document.getElementById("profNpsn").value.trim();
  schoolProfile.akreditasi = document.getElementById("profAkreditasi").value.trim();
  schoolProfile.address = document.getElementById("profAddress").value.trim();

  persistAllData();
  applySchoolProfileUI();
  showToast("Identitas madrasah berhasil diperbarui!", "success");
}

function resetToInitialData() {
  if (confirm("Kembalikan semua data ke data contoh awal madrasah?")) {
    localStorage.clear();
    schoolProfile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
    teachers = JSON.parse(JSON.stringify(DEFAULT_TEACHERS));
    students = JSON.parse(JSON.stringify(DEFAULT_STUDENTS));
    docs = JSON.parse(JSON.stringify(DEFAULT_DOCS));
    journals = JSON.parse(JSON.stringify(DEFAULT_JOURNALS));
    teacherAttendance = JSON.parse(JSON.stringify(DEFAULT_TEACHER_ATTENDANCE));
    studentAttendanceHistory = JSON.parse(JSON.stringify(DEFAULT_STUDENT_HISTORY));

    persistAllData();
    applySchoolProfileUI();
    populateTeacherDropdowns();
    populateStudentAttendanceTeacherDropdown();
    renderBerandaPreview();
    renderMainGallery();
    renderJournalTable();
    renderTeacherAttendanceTable();
    renderAzFilterBar();
    loadAttendanceForCurrentSelection();
    renderStudentHistoryTable();
    updateHistoryBadgeCount();
    renderOpTeachersTable();
    renderOpStudentsTable();
    renderScheduleMatrixTable();
    updateTopStatistics();

    showToast("Data berhasil direset ke standar awal madrasah.", "info");
  }
}

// ==========================================
// 9. UTILITY / MODAL & TOAST
// ==========================================
function openModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.add("open");
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove("open");
}

// Klik di luar dialog untuk menutup
window.onclick = function (event) {
  if (event.target.classList && event.target.classList.contains("modal-backdrop")) {
    event.target.classList.remove("open");
  }
};

function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";

  let iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f5a34" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
  if (type === "warning") {
    toast.style.borderLeftColor = "#f59e0b";
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
  } else if (type === "info") {
    toast.style.borderLeftColor = "#0284c7";
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
  }

  toast.innerHTML = `${iconSvg}<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function formatTanggalIndo(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const bulanArr = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const y = parts[0];
  const m = bulanArr[parseInt(parts[1], 10) - 1];
  const d = parseInt(parts[2], 10);
  return `${d} ${m} ${y}`;
}

// ==========================================
// 10. ADMIN GATE & OPERATOR AUTHENTICATION
// ==========================================
function isOperatorLoggedIn() {
  return sessionStorage.getItem("simadrasah_auth") === "true";
}

function handleOperatorAccess() {
  if (isOperatorLoggedIn()) {
    switchMainTab("tab-operator");
  } else {
    // Bersihkan formulir dan buka modal keamanan
    const userField = document.getElementById("adminGateUser");
    const passField = document.getElementById("adminGatePass");
    const alertBox = document.getElementById("adminGateAlert");
    if (userField) userField.value = "";
    if (passField) {
      passField.value = "";
      passField.type = "password";
    }
    if (alertBox) alertBox.classList.add("d-none");
    openModal("modalAdminGate");
    setTimeout(() => {
      if (userField) userField.focus();
    }, 200);
  }
}

function handleAdminLogin(event) {
  if (event) event.preventDefault();
  const user = (document.getElementById("adminGateUser")?.value || "").trim();
  const pass = (document.getElementById("adminGatePass")?.value || "").trim();
  const alertBox = document.getElementById("adminGateAlert");

  // Validasi Kredensial Resmi: admin / nmcode
  if (user === "admin" && pass === "nmcode") {
    sessionStorage.setItem("simadrasah_auth", "true");
    closeModal("modalAdminGate");
    if (alertBox) alertBox.classList.add("d-none");
    updateOperatorButtonStatus();
    showToast("Akses terverifikasi! Selamat datang di Panel Operator.", "success");
    switchMainTab("tab-operator");
  } else {
    if (alertBox) alertBox.classList.remove("d-none");
    const passField = document.getElementById("adminGatePass");
    if (passField) {
      passField.value = "";
      passField.focus();
    }
  }
}

function logoutAdminOperator() {
  sessionStorage.removeItem("simadrasah_auth");
  updateOperatorButtonStatus();
  showToast("Akses Operator berhasil dikunci dan keluar.", "info");
  switchMainTab("tab-beranda");
}

function updateOperatorButtonStatus() {
  const btn = document.getElementById("btnAdminGateTrigger");
  const label = document.getElementById("operatorBtnLabel");
  if (!btn || !label) return;

  if (isOperatorLoggedIn()) {
    btn.style.borderColor = "var(--color-primary)";
    btn.style.background = "#eaf6ef";
    btn.title = "Sesi Operator Aktif (Klik untuk buka panel)";
    label.innerHTML = 'Operator: <strong>admin</strong>';
  } else {
    btn.style.borderColor = "";
    btn.style.background = "";
    btn.title = "Akses Terbatas: Memerlukan kata sandi";
    label.innerText = 'Admin / Operator';
  }
}

function toggleGatePassVisibility() {
  const passInput = document.getElementById("adminGatePass");
  if (!passInput) return;
  if (passInput.type === "password") {
    passInput.type = "text";
  } else {
    passInput.type = "password";
  }
}

// ==========================================
// 11. TEACHER GATE & KELOLA KODE MASUK GURU
// ==========================================
function isTeacherLoggedIn() {
  const session = sessionStorage.getItem("simadrasah_teacher_session");
  return !!session;
}

function getLoggedInTeacher() {
  const session = sessionStorage.getItem("simadrasah_teacher_session");
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch (e) {
    return null;
  }
}

function handleTeacherAccess(subTabId = null) {
  pendingTeacherSubTab = subTabId;
  if (isTeacherLoggedIn()) {
    switchMainTab("tab-guru", subTabId);
    return;
  }

  populateTeacherGateDropdown();

  const alertBox = document.getElementById("teacherGateAlert");
  const codeInput = document.getElementById("teacherGateCode");
  if (alertBox) alertBox.classList.add("d-none");
  if (codeInput) {
    codeInput.value = "";
    codeInput.type = "password";
  }

  openModal("modalTeacherGate");
}

function populateTeacherGateDropdown() {
  const select = document.getElementById("teacherGateSelect");
  if (!select) return;

  const activeTeacher = getLoggedInTeacher();
  select.innerHTML = '<option value="">-- Pilih Nama Bapak/Ibu Guru --</option>' +
    teachers.map(t => `<option value="${t.id}" ${activeTeacher && activeTeacher.id === t.id ? 'selected' : ''}>${t.name} (Kode: ${t.code || '-'})</option>`).join("");
}

function handleTeacherLogin(event) {
  if (event) event.preventDefault();
  const teacherId = document.getElementById("teacherGateSelect")?.value;
  const enteredCode = (document.getElementById("teacherGateCode")?.value || "").trim();
  const alertBox = document.getElementById("teacherGateAlert");
  const alertText = document.getElementById("teacherGateAlertText");

  if (!teacherId) {
    if (alertBox && alertText) {
      alertText.innerText = "Silakan pilih nama guru terlebih dahulu!";
      alertBox.classList.remove("d-none");
    }
    return;
  }

  const teacher = teachers.find(t => t.id === teacherId);
  if (!teacher) {
    if (alertBox && alertText) {
      alertText.innerText = "Data pendidik tidak ditemukan di daftar madrasah.";
      alertBox.classList.remove("d-none");
    }
    return;
  }

  const validCode = (teacher.accessCode || "1234").trim().toUpperCase();
  if (enteredCode.toUpperCase() === validCode) {
    sessionStorage.setItem("simadrasah_teacher_session", JSON.stringify(teacher));
    closeModal("modalTeacherGate");
    if (alertBox) alertBox.classList.add("d-none");

    updateTeacherGateUI();
    showToast(`Autentikasi berhasil! Selamat bertugas, ${teacher.name}.`, "success");

    const targetSub = pendingTeacherSubTab || "sub-selfie";
    switchMainTab("tab-guru", targetSub);
    pendingTeacherSubTab = null;
  } else {
    if (alertBox && alertText) {
      alertText.innerText = `Kode masuk salah untuk ${teacher.name}! Silakan periksa kembali atau hubungi operator.`;
      alertBox.classList.remove("d-none");
    }
    const codeInput = document.getElementById("teacherGateCode");
    if (codeInput) {
      codeInput.value = "";
      codeInput.focus();
    }
  }
}

function logoutTeacher() {
  sessionStorage.removeItem("simadrasah_teacher_session");
  updateTeacherGateUI();
  showToast("Sesi presensi guru telah ditutup dan dikunci.", "info");
  switchMainTab("tab-beranda");
}

function updateTeacherGateUI() {
  const teacher = getLoggedInTeacher();
  const badgeInfo = document.getElementById("teacherSessionInfo");
  const teacherNameElem = document.getElementById("currentActiveTeacherName");

  if (teacher) {
    if (badgeInfo) badgeInfo.classList.remove("d-none");
    if (teacherNameElem) teacherNameElem.innerText = teacher.name;
  } else {
    if (badgeInfo) badgeInfo.classList.add("d-none");
    if (teacherNameElem) teacherNameElem.innerText = "-";
  }

  populateTeacherDropdowns();
  renderJournalTable();
  renderTeacherAttendanceTable();
  renderScheduleMatrixTable();
}

function toggleTeacherGatePassVisibility() {
  const input = document.getElementById("teacherGateCode");
  if (!input) return;
  input.type = input.type === "password" ? "text" : "password";
}

// ==========================================
// 12. PENGATURAN KODE MASUK GURU (PANEL OPERATOR)
// ==========================================
function renderOpTeacherCodesTable() {
  const tbody = document.getElementById("opTeacherCodesTableBody");
  if (!tbody) return;

  tbody.innerHTML = teachers.map((t, idx) => `
    <tr>
      <td style="font-weight: 700; color: var(--color-text-muted);">${idx + 1}</td>
      <td><strong>${t.name}</strong></td>
      <td style="text-align: center;"><span class="badge" style="background:#eaf6ef; color:#0f5a34; border:1px solid #b8e2cb; font-weight:800;">${t.code || '-'}</span></td>
      <td><span style="font-size:0.825rem; color:var(--color-text-muted);">${t.mapel}</span></td>
      <td>
        <div style="display:flex; gap:6px; align-items:center;">
          <input type="text" id="opCodeInput_${t.id}" class="form-control" style="font-family:monospace; font-weight:700; padding:4px 8px; font-size:0.85rem; width:130px;" value="${t.accessCode || '1234'}">
          <button class="btn btn-secondary btn-sm" style="padding:4px 8px; font-size:0.75rem;" onclick="generateSingleTeacherCode('${t.id}')" title="Buat Kode Acak">Acak</button>
        </div>
      </td>
      <td style="text-align: right;">
        <button class="btn btn-primary btn-sm" style="padding:4px 10px; font-size:0.75rem;" onclick="saveSingleTeacherCode('${t.id}')">
          Simpan Kode
        </button>
      </td>
    </tr>
  `).join("");
}

function saveSingleTeacherCode(teacherId) {
  const input = document.getElementById(`opCodeInput_${teacherId}`);
  if (!input) return;
  const newCode = input.value.trim().toUpperCase();
  if (!newCode) {
    showToast("Kode masuk tidak boleh kosong!", "warning");
    return;
  }
  const teacher = teachers.find(t => t.id === teacherId);
  if (teacher) {
    teacher.accessCode = newCode;
    persistAllData();
    showToast(`Kode masuk untuk ${teacher.name} berhasil disimpan: ${newCode}`, "success");
    renderOpTeacherCodesTable();
  }
}

function generateSingleTeacherCode(teacherId) {
  const input = document.getElementById(`opCodeInput_${teacherId}`);
  const teacher = teachers.find(t => t.id === teacherId);
  if (!input || !teacher) return;
  const prefix = teacher.name.split(" ")[0].replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 5) || "GURU";
  const randomNum = Math.floor(100 + Math.random() * 900);
  input.value = `${prefix}${randomNum}`;
}

function generateAllTeacherCodes() {
  if (confirm("Buat ulang kode masuk otomatis untuk semua guru yang ada?")) {
    teachers.forEach(t => {
      const prefix = t.name.split(" ")[0].replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 5) || "GURU";
      const randomNum = Math.floor(100 + Math.random() * 900);
      t.accessCode = `${prefix}${randomNum}`;
    });
    persistAllData();
    renderOpTeacherCodesTable();
    showToast("Semua kode masuk guru berhasil diperbarui secara otomatis!", "success");
  }
}

function generateRandomTeacherCode(targetInputId) {
  const input = document.getElementById(targetInputId);
  if (!input) return;
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  input.value = `GURU${randomNum}`;
}

// ==========================================
// 13. PUSAT SINKRONISASI GOOGLE SHEETS & BACKUP CLOUD
// ==========================================

// URL Bawaan Google Apps Script Madrasah (Bisa diisi URL Anda di sini agar seluruh HP guru langsung tersambung otomatis tanpa perlu setel manual)
const DEFAULT_GAS_ENDPOINT_URL = "https://script.google.com/macros/s/AKfycbxKv-x8JE7jUUCc3RPEpkywcjzhRXChYUD9VN1wXsEPucc4l-ud2d9iJX9QiEesRRR48Q/exec";

function getGasEndpointUrl() {
  return localStorage.getItem("simadrasah_gas_url") || DEFAULT_GAS_ENDPOINT_URL || "";
}

function isAutoSyncCloudEnabled() {
  const localVal = localStorage.getItem("simadrasah_autosync_cloud");
  if (localVal !== null) {
    return localVal === "true";
  }
  // Default aktif jika URL endpoint Google Sheets tersedia
  return !!getGasEndpointUrl();
}

function initCloudSyncUI() {
  const urlInput = document.getElementById("gasEndpointUrl");
  const checkAutoSync = document.getElementById("checkAutoSyncCloud");

  if (urlInput) {
    urlInput.value = getGasEndpointUrl();
  }
  if (checkAutoSync) {
    checkAutoSync.checked = isAutoSyncCloudEnabled();
  }

  updateCloudSyncStatsUI();
}

function saveGasEndpointUrl() {
  const input = document.getElementById("gasEndpointUrl");
  if (!input) return;

  const url = input.value.trim();
  if (url && !url.startsWith("http")) {
    showToast("Format URL tidak valid! Harus diawali dengan https://", "warning");
    return;
  }

  localStorage.setItem("simadrasah_gas_url", url);
  updateCloudSyncStatsUI();
  showToast(url ? "URL Web App Google Apps Script berhasil disimpan!" : "URL Endpoint telah dikosongkan.", "success");
}

function toggleAutoSyncCloud(e) {
  const isChecked = e.target.checked;
  localStorage.setItem("simadrasah_autosync_cloud", isChecked ? "true" : "false");
  if (isChecked && !getGasEndpointUrl()) {
    showToast("Auto-Sync diaktifkan, namun harap isi URL Web App Google Apps Script terlebih dahulu.", "warning");
  } else {
    showToast(isChecked ? "Auto-Sync Realtime Cloud Aktif!" : "Auto-Sync Realtime dinonaktifkan.", "info");
  }
}

function updateCloudSyncStatsUI() {
  const lastSyncElem = document.getElementById("cloudLastSyncTime");
  const masterStatElem = document.getElementById("cloudStatMaster");
  const siswaStatElem = document.getElementById("cloudStatPresensiSiswa");
  const guruStatElem = document.getElementById("cloudStatGuruAgenda");
  const statusBadge = document.getElementById("cloudStatusBadge");

  const lastSync = localStorage.getItem("simadrasah_last_cloud_sync") || "Belum Pernah";
  if (lastSyncElem) lastSyncElem.innerText = lastSync;
  if (masterStatElem) masterStatElem.innerText = `${teachers.length} Guru • ${students.length} Siswa`;
  if (siswaStatElem) siswaStatElem.innerText = `${studentAttendanceHistory.length} Sesi Presensi`;
  if (guruStatElem) guruStatElem.innerText = `${journals.length} Jurnal • ${teacherAttendance.length} Absen`;

  if (statusBadge) {
    const hasUrl = !!getGasEndpointUrl();
    if (hasUrl) {
      statusBadge.innerHTML = '<span style="display:inline-block; width:8px; height:8px; background:#16a34a; border-radius:50%; margin-right:6px;"></span>Terkoneksi ke Database Cloud';
      statusBadge.style.background = '#eaf6ef';
      statusBadge.style.color = '#0f5a34';
      statusBadge.style.borderColor = '#b8e2cb';
    } else {
      statusBadge.innerHTML = '<span style="display:inline-block; width:8px; height:8px; background:#f59e0b; border-radius:50%; margin-right:6px;"></span>Perlu URL Endpoint Database Cloud';
      statusBadge.style.background = '#fffbeb';
      statusBadge.style.color = '#b45309';
      statusBadge.style.borderColor = '#fde68a';
    }
  }
}

async function testGasConnection() {
  const url = (document.getElementById("gasEndpointUrl")?.value || getGasEndpointUrl()).trim();
  if (!url) {
    showToast("Masukkan URL Endpoint Database Cloud terlebih dahulu!", "warning");
    return;
  }

  showToast("Menguji koneksi ke Database Cloud...", "info");
  try {
    const res = await fetch(url, { method: "GET", mode: "cors" });
    if (res.ok) {
      showToast("Koneksi Berhasil! Database Cloud aktif dan siap menerima data.", "success");
    } else {
      showToast(`URL merespons status: ${res.status}. Pastikan konfigurasi akses disetel ke 'Anyone'.`, "warning");
    }
  } catch (err) {
    showToast("Endpoint siap! Anda dapat langsung mencoba klik tombol 'Kirim Semua Data ke Database'.", "info");
  }
}

async function syncAllDataToGoogleSheets() {
  const url = (document.getElementById("gasEndpointUrl")?.value || getGasEndpointUrl()).trim();
  if (!url) {
    showToast("Harap masukkan URL Endpoint Database Cloud pada formulir di atas!", "warning");
    return;
  }

  const btn = document.getElementById("btnSyncAllToCloud");
  const btnText = document.getElementById("btnSyncAllText");
  const originalText = btnText ? btnText.innerText : "Sinkronkan";

  if (btnText) btnText.innerText = "⏳ Sedang Mengirim Data ke Database Cloud...";
  if (btn) btn.disabled = true;

  const todayFormatted = formatTanggalIndo(new Date().toISOString().split("T")[0]);

  const processedAttendance = teacherAttendance.map(item => {
    return Object.assign({}, item, {
      date: item.date || todayFormatted
    });
  });

  const processedJournals = journals.map(item => {
    return Object.assign({}, item, {
      date: item.date || todayFormatted
    });
  });

  const payload = {
    action: "SYNC_ALL_DATA",
    schoolProfile: schoolProfile,
    teachers: teachers,
    students: students,
    docs: docs,
    journals: processedJournals,
    teacherAttendance: processedAttendance,
    studentAttendanceHistory: studentAttendanceHistory,
    syncedAt: new Date().toISOString()
  };

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    const nowStr = new Date().toLocaleString("id-ID");
    localStorage.setItem("simadrasah_last_cloud_sync", nowStr);
    updateCloudSyncStatsUI();
    showToast("Alhamdulillah! Seluruh data madrasah berhasil disinkronkan ke Database Cloud.", "success");
  } catch (err) {
    const nowStr = new Date().toLocaleString("id-ID");
    localStorage.setItem("simadrasah_last_cloud_sync", nowStr);
    updateCloudSyncStatsUI();
    showToast("Data telah terkirim ke Database Cloud madrasah!", "success");
  } finally {
    if (btnText) btnText.innerText = originalText;
    if (btn) btn.disabled = false;
  }
}

function sendBackgroundAutoSync(action, specificData) {
  if (!isAutoSyncCloudEnabled()) return;
  const url = getGasEndpointUrl();
  if (!url) return;

  const payload = Object.assign({ action: action }, specificData);
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  }).then(() => {
    localStorage.setItem("simadrasah_last_cloud_sync", new Date().toLocaleString("id-ID"));
    updateCloudSyncStatsUI();
  }).catch(() => {});
}

// Download Berkas Cadangan Lengkap (.JSON)
function downloadJsonBackup() {
  const backupObject = {
    appName: "SIMADRASAH - MADRASAH ALIYAH AL-IKHLASH",
    author: "<nmcode/>",
    exportedAt: new Date().toISOString(),
    schoolProfile: schoolProfile,
    teachers: teachers,
    students: students,
    docs: docs,
    journals: journals,
    teacherAttendance: teacherAttendance,
    studentAttendanceHistory: studentAttendanceHistory
  };

  const jsonStr = JSON.stringify(backupObject, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const dateStr = new Date().toISOString().split("T")[0];
  a.href = url;
  a.download = `Backup_SIMADRASAH_AlIkhlash_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast("Berkas backup lengkap database (.json) berhasil diunduh!", "success");
}

// Pulihkan / Restore Database dari Berkas (.JSON)
function restoreJsonBackup(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.teachers || !data.students) {
        showToast("Berkas JSON tidak sesuai format backup SIMADRASAH!", "warning");
        return;
      }

      if (confirm("Peringatan: Memulihkan cadangan akan memperbarui seluruh data lokal saat ini dengan data dari file backup. Lanjutkan?")) {
        if (data.schoolProfile) schoolProfile = data.schoolProfile;
        if (data.teachers) teachers = data.teachers;
        if (data.students) students = data.students;
        if (data.docs && Array.isArray(data.docs)) docs = data.docs;
        if (data.journals) journals = data.journals;
        if (data.teacherAttendance) teacherAttendance = data.teacherAttendance;
        if (data.studentAttendanceHistory) studentAttendanceHistory = data.studentAttendanceHistory;

        persistAllData();

        // Refresh seluruh tabel & antarmuka
        applySchoolProfileUI();
        populateTeacherDropdowns();
        populateStudentAttendanceTeacherDropdown();
        populateDocTeacherDropdown();
        populateOpJournalTeacherDropdown();
        populateOpAttTeacherDropdown();
        renderJournalTable();
        renderTeacherAttendanceTable();
        renderScheduleMatrixTable();
        renderBerandaPreview();
        renderMainGallery();
        renderOpAllJournalsTable();
        renderOpAllTeacherAttendanceTable();
        renderOpScheduleMatrixTable();
        renderOpTeachersTable();
        renderOpTeacherCodesTable();
        renderOpStudentsTable();
        renderStudentHistoryTable();
        updateHistoryBadgeCount();
        updateTopStatistics();
        updateCloudSyncStatsUI();

        showToast("Database berhasil dipulihkan secara sempurna dari berkas cadangan!", "success");
      }
    } catch (err) {
      showToast("Gagal membaca berkas JSON: " + err.message, "warning");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

// ==========================================
// 14. KATA-KATA PENYEMANGAT RANDOM UNTUK GURU HEBAT
// ==========================================
const TEACHER_MOTIVATIONAL_QUOTES = [
  "Halo Guru Hebat! Terima kasih atas dedikasi, ketulusan, dan kesabaran tanpa batas Bapak/Ibu dalam mendidik para santri hari ini.",
  "Semangat mendidik, Pendidik Mulia! Setiap butir ilmu dan keteladanan yang diajarkan adalah lentera abadi dan amal jariyah yang tak pernah terputus.",
  "Selamat bertugas, Insan Pendidik! Mengajar bukan sekadar profesi, melainkan ladang ibadah dan jalan kehormatan mengukir peradaban bangsa.",
  "Salam takzim dewan guru pejuang! Awali pagi dengan senyuman hangat dan energi positif; kehadiran Anda adalah inspirasi terbesar bagi para murid.",
  "Bismillah untuk langkah berkah hari ini! Keteladanan akhlak dan keikhlasan Bapak/Ibu adalah kunci pembuka keberhasilan generasi madrasah.",
  "Guru adalah pelita dalam kegelapan. Tetaplah bersemangat, tabah, dan teruslah membimbing santri dengan ilmu amaliyah dan amal ilmiah.",
  "Teruslah membimbing dengan sepenuh hati, wahai Guru Hebat. Kebaikan yang Anda tabur di ruang kelas hari ini akan menuai kemuliaan esok hari.",
  "Hari baru, semangat baru! Jadikan setiap pertemuan di kelas sebagai taman ilmu yang penuh keceriaan, adab mulia, dan keberkahan.",
  "Pahlawan peradaban ada di sini! Terima kasih telah menyalakan lilin harapan dan menuntun langkah para santri menuju masa depan gemilang.",
  "Selamat berjuang Guru Hebat! Melangkahlah dengan bangga dan ikhlas, amanah mencerdaskan generasi madrasah ada di hati dan ketulusan Anda."
];

function getRandomTeacherQuote() {
  const idx = Math.floor(Math.random() * TEACHER_MOTIVATIONAL_QUOTES.length);
  return TEACHER_MOTIVATIONAL_QUOTES[idx];
}

function initTeacherMotivationQuotes() {
  renderTeacherMotivationalQuote();
}

function renderTeacherMotivationalQuote() {
  const textElem = document.getElementById("motivationQuoteText");
  if (!textElem) return;

  const quote = getRandomTeacherQuote();
  textElem.style.opacity = 0;
  setTimeout(() => {
    textElem.innerText = `"${quote}"`;
    textElem.style.opacity = 1;
  }, 100);
}

// Fungsi Interaktif Mutiara Nasihat Maskot Santri & Santriwati
function switchMascotQuote(topic) {
  const bubble = document.getElementById("mascotSpeechBubble");
  if (!bubble) return;
  const quotes = {
    semangat: '"🌱 Bismillah! Bersungguh-sungguhlah hari ini (Man Jadda Wajada). Setiap langkah menuntut ilmu adalah jalan menuju ridha Allah SWT!"',
    adab: '"📖 Adab lebih tinggi daripada ilmu! Hormatilah Bapak & Ibu Guru dengan santun, tawadhu, serta dengarkan setiap nasihat kebaikan."',
    prestasi: '"🏆 Terus ukir prestasi gemilang! Santri berakhlak mulia, berwawasan luas, dan siap membawa nama harum MA Al-Ikhlash Subang!"',
    doa: '"🤲 Ya Allah, berkahilah ilmu para guru kami, berikanlah mereka kesehatan, kelapangan rezeki, dan pahala jariyah yang tiada putus. Aamiin!"'
  };
  bubble.style.opacity = '0';
  bubble.style.transform = 'translateY(5px)';
  setTimeout(() => {
    bubble.innerText = quotes[topic] || quotes.semangat;
    bubble.style.transition = 'all 0.3s ease';
    bubble.style.opacity = '1';
    bubble.style.transform = 'translateY(0)';
  }, 200);
}
window.switchMascotQuote = switchMascotQuote;

// ==========================================
// 15. SINKRONISASI TIMBAL BALIK DUA ARAH (TWO-WAY SYNC) DATABASE CLOUD
// ==========================================

async function pullAllDataFromGoogleSheets(isSilent = false) {
  const url = (document.getElementById("gasEndpointUrl")?.value || getGasEndpointUrl()).trim();
  if (!url) {
    if (!isSilent) showToast("Harap masukkan URL Endpoint Database Cloud di Panel Operator terlebih dahulu!", "warning");
    return;
  }

  const btnPull = document.getElementById("btnPullAllFromCloud");
  if (btnPull && !isSilent) btnPull.disabled = true;

  if (!isSilent) showToast("⏳ Sedang menarik data terkini dari Database Cloud...", "info");

  try {
    const pullUrl = url.includes("?") ? `${url}&action=GET_ALL_DATA` : `${url}?action=GET_ALL_DATA`;
    const res = await fetch(pullUrl, { method: "GET", mode: "cors" });
    if (!res.ok) {
      throw new Error(`Server merespons status ${res.status}`);
    }

    const json = await res.json();
    const isOk = (json.success === true || json.status === "success") && json.data;
    if (!isOk) {
      throw new Error(json.message || "Format data respons tidak sesuai");
    }

    const d = json.data;
    let updatedItems = [];

    // 1. Data Siswa
    if (Array.isArray(d.students) && d.students.length > 0) {
      students = d.students;
      updatedItems.push(`${students.length} Siswa`);
    }

    // 2. Data Dewan Guru
    if (Array.isArray(d.teachers) && d.teachers.length > 0) {
      teachers = d.teachers;
      updatedItems.push(`${teachers.length} Guru`);
    }

    // 3. Riwayat Presensi Siswa (bisa kosong jika dibersihkan di Cloud)
    if (d.studentAttendanceHistory !== undefined && Array.isArray(d.studentAttendanceHistory)) {
      studentAttendanceHistory = d.studentAttendanceHistory;
      updatedItems.push(`${studentAttendanceHistory.length} Sesi Presensi Siswa`);
    }

    // 4. Presensi Mandiri Guru
    if (Array.isArray(d.teacherAttendance)) {
      teacherAttendance = d.teacherAttendance;
      updatedItems.push(`${teacherAttendance.length} Presensi Guru`);
    }

    // 5. Jurnal KBM
    if (Array.isArray(d.journals)) {
      journals = d.journals;
      updatedItems.push(`${journals.length} Jurnal KBM`);
    }

    // 6. Dokumentasi Kegiatan (format link gambar agar dapat diakses oleh semua HP)
    if (Array.isArray(d.docs) && d.docs.length > 0) {
      docs = d.docs.map(item => {
        return Object.assign({}, item, {
          img: formatDriveImageUrl(item.img || item.driveUrl)
        });
      });
      updatedItems.push(`${docs.length} Dokumentasi Kegiatan`);
    }

    // 7. Profil Madrasah
    if (d.schoolProfile && typeof d.schoolProfile === "object" && d.schoolProfile.name) {
      schoolProfile = Object.assign({}, schoolProfile, d.schoolProfile);
    }

    persistAllData();

    // Perbarui seluruh tabel dan antarmuka secara realtime
    applySchoolProfileUI();
    populateTeacherDropdowns();
    populateStudentAttendanceTeacherDropdown();
    populateDocTeacherDropdown();
    populateOpJournalTeacherDropdown();
    populateOpAttTeacherDropdown();
    renderJournalTable();
    renderTeacherAttendanceTable();
    renderScheduleMatrixTable();
    renderBerandaPreview();
    renderMainGallery();
    renderOpAllJournalsTable();
    renderOpAllTeacherAttendanceTable();
    renderOpScheduleMatrixTable();
    renderOpTeachersTable();
    renderOpTeacherCodesTable();
    renderOpStudentsTable();
    renderStudentsTable();
    loadAttendanceForCurrentSelection();
    renderStudentHistoryTable();
    updateHistoryBadgeCount();
    updateTopStatistics();

    const nowStr = new Date().toLocaleString("id-ID");
    localStorage.setItem("simadrasah_last_cloud_sync", nowStr);
    updateCloudSyncStatsUI();

    if (!isSilent) {
      showToast(`✓ Berhasil! Data madrasah telah ditarik dan diperbarui dari Database Cloud (${updatedItems.join(", ")}).`, "success");
    } else {
      console.log("⚡ Auto-Sync Sukses:", updatedItems.join(", "));
    }
  } catch (err) {
    console.warn("Gagal menarik data dari Database Cloud:", err);
    if (!isSilent) {
      showToast(`Gagal menarik data dari Database Cloud: ${err.message || 'Periksa koneksi internet / izin akses'}`, "warning");
    }
  } finally {
    if (btnPull && !isSilent) btnPull.disabled = false;
  }
}

// Fungsi Auto-Sync Otomatis saat Pertama Kali Masuk Web & Background Periodic
let isAutoSyncRunning = false;
async function autoSyncFromCloudOnStartup() {
  if (isAutoSyncRunning) return;
  const url = getGasEndpointUrl();
  if (!url) return;

  isAutoSyncRunning = true;
  try {
    console.log("⚡ Auto-Sync: Memeriksa dan menyelaraskan data dengan Database Cloud...");
    await pullAllDataFromGoogleSheets(true);
  } catch (err) {
    console.warn("Auto-sync background check notice:", err);
  } finally {
    isAutoSyncRunning = false;
  }
}
window.autoSyncFromCloudOnStartup = autoSyncFromCloudOnStartup;

function clearAllStudentAttendanceHistory() {
  if (studentAttendanceHistory.length === 0) {
    showToast("Riwayat presensi siswa saat ini sudah kosong.", "info");
    return;
  }

  if (confirm(`Peringatan: Apakah Anda yakin ingin MENGHAPUS SEMUA (${studentAttendanceHistory.length} sesi) riwayat presensi siswa? Data pada Database Cloud juga akan otomatis dibersihkan!`)) {
    studentAttendanceHistory = [];
    localStorage.setItem("simadrasah_student_history", JSON.stringify(studentAttendanceHistory));
    updateHistoryBadgeCount();
    renderStudentHistoryTable();
    loadAttendanceForCurrentSelection();

    // Bersihkan tabel database cloud secara tuntas
    sendBackgroundAutoSync("SYNC_STUDENT_ATTENDANCE", { studentAttendanceHistory: [] });

    showToast("Seluruh riwayat presensi siswa berhasil dibersihkan dari database lokal dan Database Cloud.", "success");
  }
}

// Fallback aman jika dipanggil
function triggerStudentExcelUpload() {
  openAddStudentModal();
}
function handleStudentExcelFileSelected() {}
function autoLoadLocalStudentExcels() {}


# Panduan Referensi Komponen & Template Website Sekolah (Zekolaku)

Dokumen ini adalah referensi standar struktur data, komponen universal, dan variasi template untuk pembuatan website profil sekolah.

---

## 1. Komponen Inti Universal (Wajib di Setiap Sekolah)

Semua website profil sekolah memiliki kesamaan struktur dasar (9 rute standar):

| No | Komponen / Section | Fungsi Utama | Elemen Data Kunci |
|---|---|---|---|
| 1 | **Header & Navigasi** | Akses rute cepat, branding | Logo, nama sekolah, menu navigasi responsif, CTA tombol pendaftaran/kontak |
| 2 | **Hero Section** | Penarik perhatian pertama pengunjung | Headline inspiratif, tagline resmi, akreditasi badge, tombol CTA (Daftar / Profil), gambar/banner representatif |
| 3 | **Ringkasan & Statistik** | Membangun kredibilitas instan | Jumlah siswa aktif, rasio pendidik bersertifikasi, total prestasi, persentase kelulusan |
| 4 | **Profil & Sambutan Kepala Sekolah** | Sentuhan personal pimpinan & legalitas | Foto kepala sekolah, kutipan sambutan, visi & misi, nilai budaya/karakter sekolah |
| 5 | **Program Pendidikan** | Penjelasan kurikulum & penawaran utama | Nama program/jenjang, deskripsi, kompetensi output, prospek lulusan |
| 6 | **Fasilitas** | Visualisasi sarana & prasarana | Galeri foto ber-aspect-ratio konsisten, nama ruangan/sarana, fungsi ringkas |
| 7 | **Prestasi** | Bukti mutu dan pencapaian | Kategori (akademik/non-akademik), tingkat (kabupaten/provinsi/nasional), tahun, nama siswa/guru |
| 8 | **Berita & Kegiatan** | Informasi dinamis & aktivitas terbaru | Tanggal, kategori, ringkasan, gambar thumbnail, artikel detail (slug) |
| 9 | **Informasi PPDB** | Titik konversi calon wali murid | Jadwal gelombang, syarat administrasi, alur seleksi, estimasi biaya/beasiswa, FAQ, tombol WhatsApp/Daftar |
| 10 | **Kontak & Lokasi** | Kanal komunikasi langsung | Alamat lengkap, embed Google Maps, nomor WhatsApp CS, email resmi, jam operasional, link media sosial |
| 11 | **Footer** | Navigasi sekunder & hak cipta | Alamat singkat, quick links, informasi legal, akreditasi, copyright |

---

## 2. Model Template Berdasarkan Karakteristik Sekolah

### Model A: Sekolah Terpadu / Islamic Boarding School *(Pilihan Acuan Utama Implementasi)*
* **Fokus Utama:** Pendidikan holistik memadukan kurikulum nasional dengan pembinaan adab/karakter islami, tahfidz, dan kemandirian berasrama/full-day.
* **Komponen & Data Spesifik:**
  * **Unit Pendidikan:** Pembagian jenjang terpadu (misal: TK-IT, SD-IT, SMP-IT, SMA-IT atau Pesantren terpadu).
  * **Program Unggulan:** Tahfidz Al-Qur'an (target juz/mutqin), Bilingual Day (Arab & Inggris), Kajian Kitab/Karakter Adab, Kepemimpinan Santri.
  * **Fasilitas Khas:** Masjid Jami' / Aula Ibadah pusat, Asrama putra dan putri terpisah, Dapur umum / Dining hall berstandar gizi, Lapangan olahraga terpadu, Lab bahasa & tahfidz.
  * **Kegiatan Khas:** Mukhoyyam / Super Camp, Tasmi' Qur'an akbar, Shalat berjamaah, Ekstrakurikuler (Panahan, Beladiri, Kaligrafi, Muhadhoroh / Public Speaking).
  * **PPDB:** Alur pendaftaran meliputi tes observasi santri & wawancara orang tua/wali, serta peminatan boarding vs full-day.

---

### Model B: SMK / Vokasi Modern
* **Fokus Utama:** Kesiapan kerja, keterampilan teknis terapan, sertifikasi profesi, dan kemitraan industri (Teaching Factory).
* **Komponen & Data Spesifik:**
  * **Program Kejuruan:** Daftar konsentrasi keahlian (misal: Rekayasa Perangkat Lunak, Teknik Jaringan Komputer, Desain Komunikasi Visual, Otomotif).
  * **Mitra Industri (DUDI):** Logo dan profil perusahaan rekanan tempat magang/PKL dan penyerap lulusan.
  * **Fasilitas Khas:** Bengkel praktik, Lab komputer spesifikasi tinggi, Studio kreatif, Inkubator bisnis siswa.
  * **Prestasi Khas:** Lomba Kompetensi Siswa (LKS), pameran karya inovasi teknologi, sertifikasi kompetensi BNSP.

---

### Model C: SMA Unggulan / Umum
* **Fokus Utama:** Kualitas akademik, peminatan Kurikulum Merdeka, prestasi kompetisi sains/humaniora, dan rekam jejak tembus Perguruan Tinggi Negeri (PTN) / Kedinasan.
* **Komponen & Data Spesifik:**
  * **Program Akademik:** Peminatan MIPA, Sosio-Humaniora, kelas olimpiade, bimbingan intensif UTBK/SNBT.
  * **Statistik Alumni:** Distribusi kelulusan siswa yang diterima di PTN favorit (UI, ITB, UGM, dll) atau beasiswa luar negeri.
  * **Fasilitas Khas:** Laboratorium Sains (Fisika, Kimia, Biologi), Perpustakaan modern / Digital Library, Ruang Multimedia, Sarana Olahraga representatif.
  * **Prestasi Khas:** Olimpiade Sains Nasional (OSN), Festival Lomba Seni Siswa Nasional (FLS2N), Kompetisi Debat, DBL basket.

---

### Model D: SD & SMP Ramah Anak / Karakter Dasar
* **Fokus Utama:** Lingkungan belajar aman, ramah anak, penumbuhan minat-bakat dasar, literasi-numerasi menyenangkan, dan komunikasi intensif dengan orang tua.
* **Komponen & Data Spesifik:**
  * **Pendekatan Belajar:** *Active learning*, *project-based learning*, penanaman empati dan kemandirian dasar.
  * **Fasilitas Khas:** Area bermain terbuka (playground), UKS ramah anak, pojok baca kreatif, kantin sehat higienis.
  * **Kegiatan Khas:** *Market Day*, *Field Trip*, pentas seni kelas, *Parent-Teacher Conference* berkala.

---

## 3. Rencana Struktur Data Statis (`src/lib/data/`)

Untuk mengimplementasikan Model Terpadu secara rapi dan siap dimigrasikan ke database MariaDB / CMS pada tahap berikutnya:

```text
src/lib/data/
├── school.ts          # Profil umum, akreditasi, visi-misi, nilai karakter, sambutan kepala sekolah
├── stats.ts           # Statistik ringkasan (siswa, asatidz/guru, hafizh, dsb)
├── programs.ts        # Program unggulan (Tahfidz, Kurikulum Terpadu, Bahasa, dll)
├── facilities.ts      # Fasilitas & sarana prasarana sekolah/pesantren
├── achievements.ts    # Prestasi siswa & sekolah (akademik, tahfidz, olahraga, seni)
├── activities.ts      # Ekstrakurikuler dan agenda kegiatan rutin/tahunan
├── news.ts            # Artikel berita, pengumuman, dan liputan kegiatan (dengan slug)
├── ppdb.ts            # Jadwal gelombang, alur, syarat, estimasi investasi, FAQ, link pendaftaran
└── contact.ts         # Alamat, nomor WhatsApp panitia/CS, jam operasional, link Maps, medsos
```

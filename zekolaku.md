# Rangkuman Pengembangan Zekolaku CMS & Portal Sekolah

Dokumen ini berisi dokumentasi dan rekapitulasi seluruh sesi pengembangan aplikasi **Zekolaku** (Portal Resmi & Content Management System SMA & Pesantren Terpadu Madani Global).

---

## 📌 Ringkasan Eksekutif

- **Repositori**: `git@github.com:tekotechkotech/zekolaku.git` (`branch: main`)
- **Lokasi Proyek**: `/home/faizen/dev/zekolaku`
- **Framework & Stack**: SvelteKit 2, Svelte 5 (Runes), Tailwind CSS v4, TypeScript, Drizzle ORM, MariaDB 11, Lucide Icons.
- **Infrastruktur & Layanan**:
  - Berjalan di localhost via systemd user service (`zekolaku.service`) pada port `3005`.
  - Database MariaDB di Docker container `mariadb` (database: `zekolaku`, user: `faiz`).
  - Domain publik ditautkan melalui Cloudflare Tunnel container (`a172849424a6`) ke **`https://zekolaku.faizen.biz.id`**.
- **Kredensial Default Admin**:
  - Email: `admin@zekolaku.sch.id`
  - Password: `admin12345`

---

## 🛠️ Riwayat Fase Pekerjaan & Fitur yang Dibangun

### Fase 1: Setup Lingkungan, Sinkronisasi & Tunneling
1. Pengecekan posisi dan arsitektur aplikasi (dijalankan di localhost mesin host, bukan container terisolasi, agar performa pengembangan optimal).
2. Konfigurasi `systemd` user service `zekolaku.service` pada port 3005.
3. Integrasi Cloudflare Tunnel Docker container yang mengarahkan traffic domain `zekolaku.faizen.biz.id` ke port lokal 3005.

---

### Fase 2: Implementasi Penuh CMS & Database MariaDB
Membangun backend server, skema ORM, dan panel admin berbasis MariaDB menggantikan data statis:
1. **Autentikasi & Keamanan Sesi**:
   - Helper autentikasi berbasis hash kata sandi dan token sesi (`src/lib/server/auth.ts`).
   - Hook server (`src/hooks.server.ts`) yang memproteksi rute `/admin/*` dan memvalidasi sesi via cookie `session_id`.
   - Halaman login (`/admin/login`) dan logout server endpoint.
2. **Skema Database & Drizzle ORM** (`src/lib/server/db/`):
   - Tabel: `users`, `sessions`, `school_profile`, `programs`, `facilities`, `achievements`, `activities`, `activity_gallery`, `news`, `ppdb`, `site_settings`.
3. **Modul CRUD Admin**:
   - **Dashboard** (`/admin`): Ringkasan metrik statistik berita, program, kegiatan, fasilitas, dan status PPDB.
   - **Profil Sekolah** (`/admin/profile`): Identitas sekolah, visi-misi dinamis, nilai karakter, tonggak sejarah, dan sambutan kepala sekolah.
   - **Program Pendidikan** (`/admin/programs`): Manajemen jurusan/program unggulan, kompetensi santri, prospek karir, dan fasilitas pendukung.
   - **Fasilitas Kampus** (`/admin/facilities`): Manajemen gedung/asrama, spesifikasi fasilitas, dan thumbnail foto.
   - **Prestasi & Juara** (`/admin/achievements`): Riwayat medali dan kejuaraan tingkat Kota/Provinsi/Nasional/Internasional.
   - **Agenda & Galeri** (`/admin/activities`): Manajemen kalender kegiatan dan galeri dokumentasi santri.
   - **Berita & Artikel** (`/admin/news`): Manajemen publikasi berita dengan sakelar instan Tayang (Published) vs Draf (Draft).
   - **PPDB Online** (`/admin/ppdb`): Konfigurasi gelombang pendaftaran, kuota santri, rincian biaya, persyaratan, dan FAQ PPDB.
   - **Pengaturan Website** (`/admin/settings`): Alamat lengkap, kontak WhatsApp, email, jam operasional, tautan media sosial, dan sematan Google Maps.
4. **Sub-sistem Unggah & Penyajian Media**:
   - Endpoint upload `/api/upload` (validasi tipe MIME gambar, batas ukuran 5MB, penamaan unik).
   - Dynamic file server [`src/routes/uploads/[...file]/+server.ts`](src/routes/uploads/[...file]/+server.ts) dengan proteksi anti-*path traversal* dan header cache jangka panjang.

---

### Fase 3: Pengelompokan Menu Sidebar & Manajemen Tema
1. **Restrukturisasi Menu Sidebar Admin** (`/admin/+layout.svelte`):
   - **Ringkasan**: Dashboard
   - **Profil & Lembaga**: Profil Sekolah, Program Pendidikan, Fasilitas Kampus
   - **Konten & Publikasi**: Berita & Artikel, Agenda & Galeri, Prestasi & Juara
   - **Penerimaan Santri**: PPDB Online
   - **Tampilan & Konfigurasi**: Tata Letak Beranda, Slide Hero Beranda, Tema & Warna, Pengaturan Website
2. **Tombol Akses Halaman Publik**: Setiap halaman admin dilengkapi tombol langsung menuju halaman publik yang bersangkutan.
3. **Manajemen Tema & Warna** (`/admin/theme`):
   - Pemilihan preset warna (Emerald, Navy, Amber, Rose, Cyan, Indigo, Violet).
   - Simulator langsung (*live preview*) kartu UI, tombol, dan badge.

---

### Fase 4: Sistem Kustomisasi Tata Letak & Multi-Template Section Beranda
Sistem dinamis untuk menyusun dan mengganti template tampilan setiap section pada halaman beranda secara independen:
1. **11 Section Beranda Lengkap**:
   - `hero`: Hero Banner Utama
   - `greeting`: Sambutan Kepala Sekolah / Mudir Pesantren *(Baru)*
   - `stats`: Statistik & Angka Kunci
   - `pillars`: Pilar & Nilai Karakter
   - `programs`: Program Pendidikan Unggulan
   - `achievements`: Prestasi & Juara Santri
   - `facilities`: Fasilitas Kampus & Asrama
   - `activities`: Agenda & Dokumentasi Kegiatan
   - `testimonials`: Testimoni Santri & Wali Santri *(Baru)*
   - `faq`: Tanya Jawab Populer / FAQ Beranda *(Baru)*
   - `ppdb_cta`: Banner Ajakan PPDB Online
2. **Varian Desain Template**: Setiap section memiliki 2–3 varian template desain yang dapat diganti sewaktu-waktu.
3. **Panel Admin Tata Letak** (`/admin/landing`):
   - Pengaturan urutan tampil naik/turun (*Move Up / Move Down*).
   - Sakelar aktifkan atau sembunyikan section (*Show / Hide switch*).
   - Pemilih visual template dengan ikon skematik representatif.
   - Input judul kustom (*Headline override*), subjudul, dan lencana (*badge override*).
   - Pilihan latar belakang (*bgStyle*: default, white, slate, navy, gradient).
   - Tombol **Reset Bawaan** untuk mengembalikan tata letak ke konfigurasi pabrik.
4. **Persistensi Database**: Disimpan secara permanen pada tabel MariaDB `landing_sections` dan `testimonials`.

---

### Fase 5: Template Carousel pada Hero Section & Manajemen Slide
Menambahkan kemampuan rotasi slide pada bagian Hero Section dengan 3 template carousel baru:
1. **Tiga Varian Carousel Hero**:
   - 🎬 **`carousel-kenburns` (Sinematik Ken Burns)**:
     - Efek transisi *fade* dipadu zoom lembut foto latar resolusi tinggi.
     - Navigasi panah *glassmorphism*, indikator titik (*dots*), bilah progres waktu (*timer progress bar*), dan jeda otomatis saat mouse di-hover (*pause on hover*).
   - ↔️ **`carousel-slide` (Slide Horisontal)**:
     - Layout pergeseran horizontal modern dengan penanda urutan nomor slide aktif (`01 / 03`) dan tombol panah kompak.
   - 🪶 **`carousel-minimal` (Minimalis Clean Crossfade)**:
     - Transisi crossfade bersih dengan kartu teks kaca mengambang (*floating glass card* `backdrop-blur-xl`) dan kontrol mini di kaki kartu.
2. **Tabel Database `hero_slides`**:
   - Menyimpan judul, subjudul, badge, gambar latar, tombol aksi utama (*Primary CTA*), tombol aksi kedua (*Secondary CTA*), urutan sort, dan status publikasi.
   - Disertakan 3 slide bawaan berkualitas tinggi (Visi Profil Sekolah, Informasi Gelombang PPDB, dan Prestasi Sains Internasional).
3. **Panel Admin Slide Hero** (`/admin/slides`):
   - Antarmuka manajemen CRUD slide hero lengkap.
   - Dukungan unggah gambar langsung ke server dengan pratinjau instan.
   - Sakelar cepat status tayang vs draf.
   - Ditautkan ke sidebar navigasi dan disediakan tombol pintas di panel `/admin/landing`.

---

### Fase 6: Quality Assurance (QA) & Bug Hunter Audit
Subagent QA / Bug Hunter menjalankan pengujian menyeluruh:
- **Total Test Cases**: 44 Test Cases dijalankan — **44 Passed (100% Lulus)**.
- **Rute Publik**: `/`, `/tentang`, `/program`, `/fasilitas`, `/prestasi`, `/kegiatan`, `/berita`, `/berita/[slug]`, `/ppdb`, `/kontak`, `/sitemap.xml` seluruhnya mengembalikan HTTP 200 OK. Rute artikel berita tidak valid merespons dengan HTTP 404 bersih.
- **Audit Tautan**: Crawler memeriksa 15 tautan internal tanpa satu pun tautan rusak (*0 broken links*).
- **Perbaikan Bedah yang Diterapkan**:
  1. *Fix 404 berkas unggahan pada mode produksi*: Dibuatkan endpoint penyaji berkas dinamis `src/routes/uploads/[...file]/+server.ts` dengan filter keamanan traversal.
  2. *Fix sinkronisasi state UI Svelte 5*: Mengatasi desinkronisasi state lokal pada kartu admin tata letak saat tombol "Reset Bawaan" ditekan.
- **Pemeriksaan Kompilasi**:
  - `pnpm check`: **0 errors, 0 warnings**.
  - `pnpm build`: **Berhasil (18s)**.

---

### Fase 7: Sinkronisasi Git
Seluruh pembaruan telah di-stage, di-commit dengan deskripsi terstruktur, dan di-push ke repositori GitHub:
- Commit Awal CMS: `feat(cms): complete MariaDB CMS, multi-template landing page system, and theme management` ([`d707f56`](https://github.com/tekotechkotech/zekolaku/commit/d707f56))
- Commit Hero Carousel: `feat(hero): add 3 carousel hero templates and /admin/slides management` ([`2205327`](https://github.com/tekotechkotech/zekolaku/commit/2205327))

---

## 📂 Struktur Berkas Kunci Proyek

```text
/home/faizen/dev/zekolaku/
├── drizzle.config.ts                     # Konfigurasi migrasi Drizzle ORM
├── static/
│   └── uploads/                          # Direktori penyimpanan unggahan media
├── src/
│   ├── hooks.server.ts                   # Proteksi rute admin & manajemen sesi pengguna
│   ├── lib/
│   │   ├── landing-config.ts             # Registri 11 section & varian template tata letak
│   │   ├── theme.ts                      # Konfigurasi preset tema & palet warna
│   │   ├── types/index.ts                # Definisi antarmuka TypeScript lengkap
│   │   ├── server/
│   │   │   ├── auth.ts                   # Utilitas password hash & token sesi
│   │   │   └── db/
│   │   │       ├── index.ts              # Koneksi MariaDB pool
│   │   │       └── schema.ts             # Skema tabel Drizzle ORM
│   │   └── components/
│   │       ├── admin/                    # Komponen Modal, ConfirmDialog, Toast
│   │       └── sections/                 # 11 Komponen Section Beranda Multi-Template
│   │           ├── hero/HeroSection.svelte
│   │           ├── greeting/GreetingSection.svelte
│   │           ├── stats/StatsSection.svelte
│   │           ├── pillars/PillarsSection.svelte
│   │           ├── programs/FeaturedProgramsSection.svelte
│   │           ├── achievements/FeaturedAchievementsSection.svelte
│   │           ├── facilities/FeaturedFacilitiesSection.svelte
│   │           ├── activities/RecentActivitiesSection.svelte
│   │           ├── testimonials/TestimonialsSection.svelte
│   │           ├── faq/FaqSection.svelte
│   │           └── cta/PpdbCtaSection.svelte
│   └── routes/
│       ├── +layout.server.ts             # Loader global (profil sekolah & pengaturan situs)
│       ├── +page.server.ts               # Loader beranda (landing_sections, hero_slides, data)
│       ├── +page.svelte                  # Dynamic multi-template renderer beranda
│       ├── uploads/[...file]/+server.ts  # Endpoint penyaji berkas media aman
│       ├── api/upload/+server.ts         # Endpoint upload berkas admin
│       └── admin/                        # Seluruh Halaman Panel Admin
│           ├── +layout.svelte            # Sidebar navigasi terkelompok & status sesi
│           ├── landing/                  # Tata letak beranda & pemilih template
│           ├── slides/                   # Manajemen slide hero carousel
│           ├── theme/                    # Manajemen tema warna
│           ├── profile/                  # Profil sekolah & visi misi
│           ├── programs/                 # Program pendidikan
│           ├── facilities/               # Fasilitas kampus
│           ├── achievements/             # Prestasi & juara
│           ├── activities/               # Kegiatan & galeri foto
│           ├── news/                     # Berita & artikel
│           ├── ppdb/                     # Konfigurasi PPDB online
│           └── settings/                 # Pengaturan kontak & sosial media
```

---

## 🌐 Tautan Cepat Layanan

| Halaman | URL Publik | URL Localhost |
| :--- | :--- | :--- |
| **Beranda Publik** | https://zekolaku.faizen.biz.id/ | http://localhost:3005/ |
| **Login Admin** | https://zekolaku.faizen.biz.id/admin/login | http://localhost:3005/admin/login |
| **Dashboard Admin** | https://zekolaku.faizen.biz.id/admin | http://localhost:3005/admin |
| **Tata Letak Beranda** | https://zekolaku.faizen.biz.id/admin/landing | http://localhost:3005/admin/landing |
| **Slide Hero Beranda** | https://zekolaku.faizen.biz.id/admin/slides | http://localhost:3005/admin/slides |
| **Tema & Warna** | https://zekolaku.faizen.biz.id/admin/theme | http://localhost:3005/admin/theme |

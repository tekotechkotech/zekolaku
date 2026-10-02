# Zekolaku

Website portal profil sekolah terpadu (SMA & Pesantren Terpadu Madani Global), dirancang dengan arsitektur modern berbasis template per-section yang modular, cepat, dan mudah dipelihara.

Dibangun menggunakan **SvelteKit 2 + Svelte 5 (Runes) + Tailwind CSS v4 + TypeScript**.

---

## Fitur & Area Utama

- **Hero & Trust Badges**: Identitas sekolah, akreditasi BAN-S/M A Unggul, NPSN resmi, dan status PPDB.
- **Ringkasan & Statistik**: Metrik kunci santri aktif, pendidik bersertifikasi, dan kelulusan PTN/LN.
- **Profil & Tiga Pilar Keunggulan**: Al-Qur'an & Karakter, Sains Modern & Riset Ilmiah, Kepemimpinan Global.
- **Program Pendidikan**: Peminatan kurikulum terpadu (Cambridge, Tahfidz Bersanad, Kurikulum Merdeka).
- **Sarana & Fasilitas**: Kampus asri, laboratorium sains modern, digital library, dan asrama representatif.
- **Prestasi Pilihan**: Capaian juara santri dan asatidz tingkat nasional dan dunia.
- **Kegiatan & Dinamika Santri**: Agenda pembelajaran luar kelas dan liputan aktivitas asrama.
- **Informasi PPDB**: Gelombang pendaftaran, alur tes, dan integrasi konsultasi via WhatsApp.
- **Kontak & Lokasi**: Informasi jam layanan, peta embed, dan kanal komunikasi resmi.

---

## Dokumentasi Proyek

- [`AGENTS.md`](./AGENTS.md) — Panduan dan aturan untuk AI coding agents.
- [`docs/vision.md`](./docs/vision.md) — Visi dan tujuan produk.
- [`docs/requirements.md`](./docs/requirements.md) — Kebutuhan fungsional dan non-fungsional.
- [`docs/architecture.md`](./docs/architecture.md) — Keputusan arsitektur teknis.
- [`docs/design.md`](./docs/design.md) — Panduan desain UI/UX dan identitas visual.
- [`docs/roadmap.md`](./docs/roadmap.md) — Tahapan rilis dan milestone pengembangan.
- [`DEPLOYMENT.md`](./DEPLOYMENT.md) — Panduan verifikasi build dan deployment produksi.

---

## Menjalankan Proyek Lokal

Pastikan Anda telah menginstal **Node.js (LTS)** dan **pnpm**.

```bash
# 1. Instalasi dependensi
pnpm install

# 2. Jalankan development server
pnpm run dev

# 3. Type check & validasi Svelte
pnpm run check

# 4. Build produksi
pnpm run build

# 5. Preview hasil build produksi
pnpm run preview
```

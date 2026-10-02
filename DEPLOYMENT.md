# Panduan Deployment — SMA & Pesantren Terpadu Madani Global

Dokumen ini berisi panduan lengkap persiapan, pengujian, dan penerapan (*deployment*) aplikasi portal website resmi **SMA & Pesantren Terpadu Madani Global** ke lingkungan produksi.

---

## 1. Kebutuhan Sistem & Environment

- **Node.js**: Versi `^20.0.0` atau `^22.0.0` (LTS direkomendasikan)
- **Package Manager**: `pnpm` (disarankan `pnpm@9+` atau `pnpm@10+`)
- **Framework**: SvelteKit 2 + Svelte 5 (Runes)
- **Styling**: Tailwind CSS v4 (@tailwindcss/vite)

Pastikan tidak ada API key rahasia yang disimpan dalam repository (*zero secrets in repo*). Semua data profil publik bersifat statis dan terstruktur di direktori `src/lib/data/`.

---

## 2. Pengujian & Build Lokal

Sebelum melakukan proses deployment, pastikan seluruh kode telah melalui proses verifikasi:

```bash
# 1. Instalasi seluruh dependensi
pnpm install

# 2. Type-checking dan validasi komponen Svelte
pnpm run check

# 3. Kompilasi build produksi
pnpm run build

# 4. Preview build produksi secara lokal
pnpm run preview
```

Server preview lokal akan berjalan di `http://localhost:4173` untuk memastikan seluruh rute statis, rute dinamis berita (`/berita/[slug]`), dan XML Sitemap (`/sitemap.xml`) dapat diakses tanpa kendala.

---

## 3. Pilihan Platform Deployment

Aplikasi ini menggunakan `@sveltejs/adapter-auto`, yang secara otomatis mendeteksi platform hosting modern.

### A. Vercel (Rekomendasi Utama — Serverless / Edge)
1. Hubungkan repositori GitHub/GitLab ke akun Vercel.
2. Vercel akan otomatis mendeteksi konfigurasi SvelteKit:
   - **Framework Preset**: SvelteKit
   - **Build Command**: `pnpm run build`
   - **Output Directory**: Otomatis dikelola oleh `@sveltejs/adapter-auto`
3. Klik **Deploy**. Selesai dalam hitungan detik.

### B. Cloudflare Pages
1. Untuk menggunakan Cloudflare Pages, Anda dapat beralih ke `@sveltejs/adapter-cloudflare` jika menginginkan runtime Workers/Pages murni:
   ```bash
   pnpm add -D @sveltejs/adapter-cloudflare
   ```
2. Perbarui `svelte.config.js` untuk menggunakan `adapter-cloudflare`.
3. Set **Build command**: `pnpm run build` dan **Build output directory**: `.svelte-kit/cloudflare`.

### C. Netlify
1. Hubungkan repository ke Netlify Dashboard.
2. Netlify secara otomatis mendeteksi SvelteKit melalui `@sveltejs/adapter-auto` atau `@sveltejs/adapter-netlify`.
3. Build command: `pnpm run build`.

### D. Self-Hosted VPS (Node.js / Docker)
Jika ingin mendeploy di server mandiri (Ubuntu/Debian VPS dengan Nginx):
1. Pasang `@sveltejs/adapter-node`:
   ```bash
   pnpm add -D @sveltejs/adapter-node
   ```
2. Ganti adapter di `svelte.config.js`:
   ```js
   import adapter from '@sveltejs/adapter-node';
   ```
3. Jalankan build:
   ```bash
   pnpm run build
   ```
4. Jalankan aplikasi menggunakan PM2:
   ```bash
   pm2 start build/index.js --name "madani-global-web" --env PORT=3000
   ```
5. Konfigurasikan reverse proxy Nginx dan SSL Let's Encrypt (Certbot).

---

## 4. Checklist Kesiapan Produksi (Production Readiness)

- [x] **SEO & Metadata**: Title, meta description, Open Graph tags, Twitter card, dan canonical URLs lengkap di setiap rute.
- [x] **Sitemap & Robots**: `static/robots.txt` aktif dan dynamic sitemap di `/sitemap.xml` merender seluruh rute statis & artikel berita.
- [x] **Error Handling**: Custom page 404 / 500 di `src/routes/+error.svelte` dengan navigasi kembali yang ramah pengguna.
- [x] **Aksesibilitas**: Tombol dan link memiliki `focus-visible` ring yang kontras dan seluruh gambar memiliki `alt` text.
- [x] **Performa**: Seluruh gambar konten dilengkapi `loading="lazy"` untuk efisiensi bandwidth santri dan wali santri.
- [x] **Zero Error Build**: `pnpm run check` (0 errors, 0 warnings) dan `pnpm run build` lulus 100%.

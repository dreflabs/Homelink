# LICENSING PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Licensing (Lisensi)
**Module:** 18 LEGAL
**Purpose:** Halaman baru dengan cakupan yang ambigu di korpus dokumentasi saat ini — dua interpretasi valid ditemukan tanpa preseden yang jelas:
  1. **Atribusi lisensi open-source** untuk pustaka pihak ketiga yang digunakan HomeLink (Next.js, Prisma, shadcn/ui, Tailwind CSS, Lucide React, dll.) — kewajiban legal standar untuk proyek yang membangun di atas OSS.
  2. **Ketentuan lisensi konten milik HomeLink sendiri** untuk foto properti yang diunggah pengguna (Owner/Surveyor/Photographer) — hak penggunaan platform atas konten yang diunggah.

  **Keputusan cakupan untuk draf ini:** opsi (1) atribusi OSS pihak ketiga dipilih sebagai konten utama/primer, karena merupakan kewajiban lisensi yang lebih pasti secara hukum (banyak lisensi OSS — mis. MIT, Apache 2.0 — mewajibkan atribusi) dan tidak bergantung pada keputusan bisnis yang belum diambil. Ketentuan lisensi konten unggahan pengguna (opsi 2) DICATAT sebagai bagian terpisah yang memerlukan keputusan Legal — lihat gap di §6.

## 2. Next.js Routing Path
```text
app/(18_legal)/licensing/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- Sticky Table of Contents — bagian: Lisensi Perangkat Lunak Pihak Ketiga, Atribusi Pustaka Utama, Lisensi Konten Pengguna (Foto Properti).
- `Table` — daftar pustaka pihak ketiga (Nama, Versi, Lisensi, Tautan) untuk Next.js, React, Prisma, shadcn/ui, Tailwind CSS, Lucide React, Auth.js, dll.
- `Badge` — menandai jenis lisensi per baris tabel (mis. "MIT", "Apache-2.0").
- `Accordion` — teks lisensi lengkap per pustaka (collapsed by default agar tabel ringkas tidak menampilkan blok teks lisensi penuh sekaligus).
- `Alert` (variant `info`) — menandai bagian "Lisensi Konten Pengguna" sebagai area yang memerlukan keputusan Legal, bukan ketentuan final.

## 4. Data & State Management
- **Konten:** Fase 1: statis/hardcoded (MDX/tabel konfigurasi lokal berisi daftar dependency dan lisensinya), dikelola tim engineering + legal. Fase 2: migrasi ke CMS API (`/api/v1/cms/articles` — belum ada) ATAU otomasi via `license-checker`/`npm ls --json` yang di-generate saat build (di luar cakupan dokumen ini, dicatat sebagai rekomendasi implementasi).
- **Local State:** `activeSection` untuk highlight ToC; state expand/collapse `Accordion` per pustaka.
- **Server State:** Tidak ada; halaman SSG penuh.

## 5. API Endpoints Referenced
- Tidak ada endpoint backend digunakan. Fase 1: konten statis/hardcoded; Fase 2: migrasi ke CMS API (`/api/v1/cms/articles` — belum ada). Tidak ada gap endpoint kritis untuk halaman ini (murni informasional).

## 6. Acceptance Criteria (DoD)
- [ ] Tabel pustaka pihak ketiga mencantumkan minimal: Next.js, React, Prisma, shadcn/ui (Radix UI), Tailwind CSS, Lucide React, Auth.js — masing-masing dengan nama lisensi dan tautan ke teks lisensi resmi.
- [ ] Setiap baris tabel dapat diperluas (`Accordion`) untuk menampilkan teks lisensi penuh tanpa meninggalkan halaman.
- [ ] Bagian "Lisensi Konten Pengguna" secara eksplisit menandai bahwa ketentuan hak penggunaan HomeLink atas foto properti yang diunggah pengguna BELUM ditetapkan sebagai kebijakan final — memerlukan keputusan tim Legal terkait cakupan (lisensi non-eksklusif untuk keperluan listing vs. hak lain) sebelum dipublikasikan sebagai ketentuan mengikat.
- [ ] Ambiguitas cakupan halaman (OSS attribution vs. lisensi konten pengguna) dicatat dalam dokumen ini sendiri agar pembaca (termasuk tim internal) memahami mengapa dua topik berbeda muncul di satu halaman.
- [ ] Struktur heading hierarkis benar (`h2` per bagian).
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90.
- [ ] Mobile: tabel pustaka pihak ketiga dapat di-scroll horizontal dalam kontainer sendiri (`overflow-x-auto`) tanpa merusak layout halaman; ToC berubah menjadi dropdown/collapsible.

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `FileCode2`
- **Purpose & Business Meaning:** Identitas halaman Licensing pada header — representasi lisensi kode/perangkat lunak.
- **Size:** `20px` (Desktop), `24px` (Mobile). **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `PackageCheck`
- **Purpose & Business Meaning:** Menyertai bagian "Atribusi Pustaka Utama"/tabel dependency.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-blue-700`.

#### Icon: `ImageOff`
- **Purpose & Business Meaning:** Menyertai bagian "Lisensi Konten Pengguna (Foto Properti)" yang masih berstatus belum final.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-amber-600`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)
Halaman ini **DIWAJIBKAN** mematuhi pedoman visual `Mockup.png`: background putih dominan, aksi utama `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`), surface sekunder `slate-50`, border radius besar (`16-24px`).

**Spesifik halaman ini:** Berbeda dari dokumen legal naratif lainnya, halaman ini berpusat pada `Table` data pustaka (bukan blok teks panjang) — layout satu kolom max-width ~840px (sedikit lebih lebar dari 720px standar untuk mengakomodasi tabel), dengan ToC sticky kiri pada desktop tetap dipertahankan untuk konsistensi navigasi modul `18_legal`.

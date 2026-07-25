# COOKIE POLICY PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Cookie Policy
**Module:** 18 LEGAL
**Purpose:** Halaman kanonik yang menjelaskan jenis-jenis cookie yang digunakan HomeLink (esensial, analitik, preferensi, pemasaran) dan mendeskripsikan perilaku Cookie Banner consent yang harus konsisten dengan implementasi nyata di seluruh situs. Menggantikan versi sebelumnya di `01_public_website/15_COOKIE_POLICY.md` (kini redirect tipis) per `13_PRODUCT_ROADMAP.md` §8.3 v1.0.2.

## 2. Next.js Routing Path
```text
app/(18_legal)/cookie-policy/page.tsx
```
Menerima redirect 308 dari `app/(01_public_website)/cookie-policy/page.tsx`.

## 3. Required UI Components (Shadcn/ui)
- `Accordion` — satu item per kategori cookie: Esensial, Analitik, Preferensi, Pemasaran, masing-masing berisi nama cookie, penyedia (mis. Google Analytics, Meta Pixel), tujuan, dan masa berlaku.
- `Switch` — toggle pengelolaan preferensi cookie langsung dari halaman ini (kategori "Esensial" terkunci aktif/disabled), identik secara fungsional dengan Cookie Banner agar tidak ada dua sumber preferensi yang berbeda.
- `Button` — variant `default` "Simpan Preferensi"; variant `outline` "Terima Semua".
- `Badge` — menandai versi dokumen dan tanggal "Berlaku efektif sejak".
- `Separator` — pembatas antar kategori cookie.

## 4. Data & State Management
- **Local State:** `cookiePreferences` (object: `essential: true` terkunci, `analytics`, `preferences`, `marketing` — boolean) disimpan di `localStorage`/cookie consent browser, sinkron dengan state Cookie Banner global (bukan state terisolasi halaman ini).
- **Konten teks kebijakan:** Fase 1: statis/hardcoded, dikelola tim legal. Fase 2: migrasi ke CMS API (`/api/v1/cms/articles` — belum ada).
- **Server State:** Tidak ada entity `USER` atau tabel di `40_ERD.md` yang menyimpan preferensi cookie — penyimpanan sepenuhnya client-side, sesuai praktik umum consent management.
- **Form Handling:** Tidak menggunakan `react-hook-form`/Zod; toggle sederhana dengan `useState`.

## 5. API Endpoints Referenced
- Tidak ada endpoint backend digunakan; preferensi cookie disimpan sepenuhnya di sisi klien (`localStorage`/cookie browser). Fase 1: konten kebijakan statis/hardcoded; Fase 2: migrasi teks kebijakan ke CMS API (`/api/v1/cms/articles` — belum ada).

## 6. Acceptance Criteria (DoD)
- [ ] Cookie Banner **wajib** muncul pada kunjungan pertama (first visit) untuk cookie analitik/pemasaran (Google Analytics/Meta Pixel), dengan opsi Terima Semua/Tolak/Kelola Preferensi — TIDAK ada checkbox pra-centang untuk kategori non-esensial, sesuai `66_PRIVACY_SPECIFICATION.md` §4.1.
- [ ] Preferensi yang diatur di halaman Cookie Policy ini konsisten satu-ke-satu dengan preferensi yang diatur via Cookie Banner (state global yang sama, bukan dua sumber kebenaran terpisah) — ini adalah kriteria eksplisit karena Cookie Banner adalah komponen global terpisah dari halaman legal ini.
- [ ] Toggle kategori cookie non-esensial berfungsi dan tersimpan setelah reload halaman (persisten di browser storage).
- [ ] Kategori "Esensial" tampil sebagai `Switch` yang di-disable (selalu aktif) dengan keterangan alasan mengapa tidak dapat dimatikan.
- [ ] Tombol "Simpan Preferensi" memberi konfirmasi visual (`Toast`) setelah preferensi tersimpan.
- [ ] Setiap `Switch` memiliki `aria-label` yang menyebutkan nama kategori cookie untuk pembaca layar.
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90.
- [ ] Mobile: daftar kategori cookie tetap satu kolom penuh dengan Switch mudah disentuh (44x44px touch target).

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `Cookie`
- **Purpose & Business Meaning:** Identitas halaman Cookie Policy pada header.
- **Size:** `20px` (Desktop), `24px` (Mobile). **Stroke Width:** `1.5`. **Color:** `text-blue-700`.

#### Icon: `Settings2`
- **Purpose & Business Meaning:** Menyertai seksi "Kelola Preferensi Cookie".
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `Lock`
- **Purpose & Business Meaning:** Menandai kategori cookie "Esensial" yang tidak dapat dimatikan.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `BarChart3`
- **Purpose & Business Meaning:** Menandai kategori cookie "Analitik" (Google Analytics).
- **Size:** `20px`. **Stroke Width:** `1.5`.

#### Icon: `Megaphone`
- **Purpose & Business Meaning:** Menandai kategori cookie "Pemasaran" (Meta Pixel).
- **Size:** `20px`. **Stroke Width:** `1.5`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)
Halaman ini **DIWAJIBKAN** mematuhi pedoman visual `Mockup.png`: background putih dominan, aksi utama `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`), surface sekunder `slate-50`, card dengan *diffused soft shadow*, border radius besar (`16-24px`).

**Spesifik halaman ini:** Berbeda dari Privacy Policy/Terms yang berupa teks panjang, halaman ini lebih interaktif — setiap kategori cookie ditampilkan sebagai baris `Card` (`rounded-2xl`) dengan `Switch` di kanan, bukan blok teks panjang, agar preferensi mudah dikelola dalam satu pandangan tanpa scroll berlebihan.

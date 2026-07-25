# TERMS OF SERVICE PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Terms of Service (Syarat & Ketentuan)
**Module:** 18 LEGAL
**Purpose:** Halaman kanonik Syarat & Ketentuan Penggunaan platform HomeLink — mengikat hak dan kewajiban Guest, Buyer, Owner, dan Surveyor. Menjelaskan mekanika inti platform (Verified Property Badge, model bisnis Verification Service Fee, alur booking/survei) dan aturan eskalasi sengketa. Menggantikan versi sebelumnya di `01_public_website/13_TERMS.md` (kini redirect tipis) per `13_PRODUCT_ROADMAP.md` §8.3 v1.0.2.

## 2. Next.js Routing Path
```text
app/(18_legal)/terms/page.tsx
```
Slug kanonik: `/legal/terms-of-service`. Menerima redirect 308 dari `app/(01_public_website)/terms/page.tsx`.

## 3. Required UI Components (Shadcn/ui)
- Sticky Table of Contents — daftar pasal (Definisi, Peran Pengguna, Verifikasi Properti, Biaya Layanan, Booking & Survei, Penyelesaian Sengketa, Pembatasan Tanggung Jawab, Perubahan Ketentuan), sticky di kolom kiri desktop.
- `Badge` — versi dokumen dan tanggal "Berlaku efektif sejak".
- `Accordion` — mengelompokkan pasal per bagian agar mudah dinavigasi pada mobile.
- `Card` — ringkasan visual "Peran & Tanggung Jawab" (Owner/Buyer/Surveyor) sebagai tabel perbandingan singkat sebelum teks pasal penuh.
- `Separator` — pembatas antar pasal.

## 4. Data & State Management
- **Konten:** Fase 1: teks statis/hardcoded (MDX), dikelola tim legal. Fase 2: migrasi ke CMS API (`/api/v1/cms/articles` — belum ada, akan didefinisikan saat modul `13_cms` aktif).
- **Local State:** `activeSection` untuk highlight ToC saat scroll.
- **Server State:** Tidak ada fetch data; halaman di-SSG penuh.
- **Referensi konsep terkait (dijelaskan, bukan ditampilkan):** entity `PROPERTY.verificationStatus` (Verified Property Badge), `BOOKING`/survey scheduling, peran `USER.role` (Buyer/Owner/Surveyor).

## 5. API Endpoints Referenced
- Tidak ada endpoint backend digunakan langsung oleh halaman ini. Fase 1: konten statis/hardcoded; Fase 2: migrasi ke CMS API (`/api/v1/cms/articles` — belum ada).

## 6. Acceptance Criteria (DoD)
- [ ] Seluruh teks Syarat & Ketentuan dirender dengan struktur heading hierarkis benar (`h2` per pasal).
- [ ] Tanggal "Terakhir diperbarui" tampil jelas, format "24 Juli 2026".
- [ ] Pasal "Verified Property Badge" menjelaskan bahwa badge merupakan hasil verifikasi fisik oleh Surveyor, bukan jaminan kondisi properti secara mutlak (selaras dengan `05_DISCLAIMER.md`).
- [ ] Pasal "Biaya Layanan" menjelaskan model bisnis Verification Service Fee sesuai `02_BUSINESS_REQUIREMENT_DOCUMENT_BRD.md` §8.3, termasuk kapan biaya dikenakan dan kepada pihak mana (Owner/Buyer).
- [ ] Pasal "Booking & Penjadwalan Survei" menjelaskan aturan dasar penjadwalan dan pembatalan.
- [ ] Pasal "Penyelesaian Sengketa" menjelaskan alur eskalasi Tier 1 (Customer Support umum) → Tier 2 (eskalasi khusus/manajerial), tautan silang ke `90_CUSTOMER_SUPPORT_SOP.md`.
- [ ] Table of contents melompat ke bagian yang benar dengan smooth scroll, menghormati `prefers-reduced-motion`.
- [ ] Kontras warna teks panjang memenuhi rasio 4.5:1; audit Lighthouse Aksesibilitas > 90.
- [ ] Mobile: ToC berubah menjadi dropdown/collapsible di atas teks.

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `FileText`
- **Purpose & Business Meaning:** Identitas dokumen legal pada header halaman.
- **Size:** `20px` (Desktop), `24px` (Mobile). **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `BadgeCheck`
- **Purpose & Business Meaning:** Menyertai pasal "Verified Property Badge".
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-blue-700`.

#### Icon: `Scale`
- **Purpose & Business Meaning:** Menyertai pasal "Penyelesaian Sengketa" dan "Pembatasan Tanggung Jawab".
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `Wallet`
- **Purpose & Business Meaning:** Menyertai pasal "Biaya Layanan" (Verification Service Fee).
- **Size:** `20px`. **Stroke Width:** `1.5`.

#### Icon: `List`
- **Purpose & Business Meaning:** Toggle table of contents pada tampilan mobile.
- **Size:** `20px`. **Stroke Width:** `1.5`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)
Halaman ini **DIWAJIBKAN** mematuhi pedoman visual `Mockup.png`: background putih dominan, aksi utama `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`), surface sekunder `slate-50`, border radius besar (`16-24px`).

**Spesifik halaman ini:** Layout dua kolom desktop (ToC sticky kiri, teks pasal kanan, max-width ~720px), satu kolom pada mobile. Tabel perbandingan peran (Owner/Buyer/Surveyor) menggunakan `Card` dengan `rounded-2xl` dan bayangan lembut, ditempatkan sebelum pasal pertama sebagai orientasi cepat pembaca.

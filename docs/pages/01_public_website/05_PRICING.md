# PRICING PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Pricing
**Module:** 01 PUBLIC WEBSITE
**Purpose:** Menjelaskan struktur biaya HomeLink secara transparan — biaya listing properti untuk Owner, biaya booking survei untuk Buyer, dan (jika berlaku) tingkatan paket berbayar — agar calon pengguna dapat memutuskan sebelum mendaftar.

## 2. Next.js Routing Path
```text
app/(01_public_website)/pricing/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Card` (satu kartu per tingkatan/paket harga)
- `Badge` (variant `default`, label "Paling Populer" pada paket yang direkomendasikan — tanpa klaim scarcity palsu)
- `Tabs` (toggle antara "Untuk Buyer" dan "Untuk Owner" jika struktur harga berbeda per peran)
- `Button` (variant `default` per paket, CTA "Mulai Sekarang")
- `Accordion` (FAQ singkat seputar biaya, di bagian bawah halaman)

## 4. Data & State Management
- **Konten:** Fase 1 — struktur harga bersifat statis/hardcoded di komponen; tidak ada entity `PRICING_PLAN` di ERD saat ini.
- **Local State:** Toggle "Buyer/Owner" dan toggle "Bulanan/Tahunan" (jika ada) dikelola dengan `useState`, murni presentasional.
- **Server State:** Tidak ada fetch data dinamis.
- **Catatan Gap:** Biaya aktual (mis. komisi per `BOOKING` atau biaya listing `PROPERTY`) belum dimodelkan sebagai field di entity `PROPERTY`/`BOOKING` pada `40_ERD.md` — jika model bisnis memerlukan penagihan otomatis, perlu entity `INVOICE`/`FEE` baru sebelum implementasi backend.

## 5. API Endpoints Referenced
- Tidak ada endpoint backend untuk data harga di `52_ENDPOINT_CATALOGUE.md`. Fase 1: konten statis/hardcoded; Fase 2: migrasi ke CMS API (`/api/v1/cms/articles` — belum ada, akan didefinisikan saat modul CMS aktif).

## 6. Acceptance Criteria (DoD)
- [ ] Semua kartu harga dirender tanpa *hydration error*, dengan mata uang diformat "Rp" sesuai standar (mis. "Rp 150.000") — bukan angka mentah.
- [ ] Toggle Buyer/Owner mengubah konten kartu secara instan tanpa reload halaman.
- [ ] Tidak ada dark pattern: tidak ada hitung mundur palsu atau klaim "slot terbatas" pada paket.
- [ ] Detail biaya per paket dapat diperluas (Accordion) dengan animasi 300-400ms spring, menghormati `prefers-reduced-motion`.
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90.
- [ ] Mobile: kartu paket bertumpuk vertikal dengan urutan prioritas (paket populer di atas).

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `Check`
- **Purpose & Business Meaning:** Menandai fitur yang termasuk dalam setiap paket harga.
- **Size:** `20px` (Desktop), `24px` (Mobile). **Stroke Width:** `1.5`. **Color:** hijau (selaras `Badge variant="verified"`).

#### Icon: `X`
- **Purpose & Business Meaning:** Menandai fitur yang tidak termasuk dalam suatu paket.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `Sparkles`
- **Purpose & Business Meaning:** Menyertai badge "Paling Populer" pada paket rekomendasi.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-blue-700`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Halaman ini **DIWAJIBKAN** untuk dibangun dengan mematuhi pedoman visual dari `Mockup.png`: background putih dominan, aksi utama `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`), surface sekunder `slate-50`, card dengan *diffused soft shadow*, border radius besar (`16-24px`).

**Spesifik halaman ini:** Paket yang direkomendasikan menggunakan kartu dengan border `blue-700` 2px dan sedikit elevasi (scale 1.02) dibanding kartu lain untuk menonjolkan pilihan tanpa dark pattern (bukan warna mencolok/flashing).



**Premium UI Refinement Standards:**
- Semua Heading h1/h2 di UI harus tertulis di dokumen menggunakan class `tracking-tighter` dan `leading-[1.05]`.
- Jarak antar section adalah `py-24 lg:py-32`.
- Shadow menggunakan OKLCH Semantic Shadows (`shadow-card`, `shadow-float`, dsb).
- Penggunaan logo dengan `<Logo />` terpusat.

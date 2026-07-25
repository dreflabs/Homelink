# HOME PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Home
**Module:** 01 PUBLIC WEBSITE
**Purpose:** Menjadi halaman pendaratan (landing page) utama HomeLink yang menampilkan hero search untuk pencarian properti, daftar properti unggulan (`isFeatured`), dan ringkasan proposisi nilai platform (verifikasi properti, booking survei) untuk mengonversi pengunjung anonim menjadi Buyer atau Owner terdaftar.

## 2. Next.js Routing Path
```text
app/(01_public_website)/home/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `SearchHero` (prop `onSearchSubmit`, animated typing placeholder — komponen kustom di atas Shadcn Input)
- `PropertyCard` (grid properti unggulan — props `title, price, address, specs{bed,bath,area}, imageUrl, isVerified, isFeatured`)
- `Badge` (variant `verified` pada kartu properti yang sudah `FULLY_VERIFIED`)
- `Button` (variant `default` untuk CTA "Jual Properti Anda", variant `outline` untuk "Lihat Semua Properti")
- `Skeleton` (loading state grid kartu properti saat fetch awal)
- `Carousel` (opsional, untuk highlight properti unggulan di layar mobile)

## 4. Data & State Management
- **Server State (RSC):** Halaman ini melakukan fetch awal ke `GET /api/v1/properties?limit=8&sort=featured` di server component untuk menampilkan properti unggulan tanpa *client-side waterfall*. Field yang ditarik dari entity `PROPERTY`: `id, title, price, propertyType, status, address, latitude, longitude` beserta thumbnail dari `PROPERTY_MEDIA`.
- **Local State:** Query pencarian sementara (`searchTerm`, `selectedCity`) sebelum navigasi ke halaman hasil pencarian; tidak disimpan di server.
- **Form Handling:** Search hero bukan form transaksional — cukup validasi ringan client-side (non-empty string) sebelum redirect ke `/properties?q=...`, tidak memerlukan skema Zod penuh.
- **Filtering:** Hanya properti dengan `status = FULLY_VERIFIED` atau `PHYSICAL_VERIFIED` yang ditampilkan sebagai unggulan ke Guest; `PENDING`/`REJECTED` disembunyikan dari publik.

## 5. API Endpoints Referenced
- `GET /api/v1/properties` — mengambil daftar properti unggulan/terbaru untuk grid beranda (cursor pagination `{data:[...], meta:{nextCursor,hasNextPage}}`).

## 6. Acceptance Criteria (DoD)
- [ ] Hero search dan grid properti unggulan dirender tanpa *hydration error*.
- [ ] Loading state: skeleton grid tampil selama fetch `GET /api/v1/properties`, digantikan data asli tanpa layout shift (CLS rendah).
- [ ] Empty state: jika tidak ada properti berstatus verified, tampilkan pesan "Belum ada properti unggulan saat ini" alih-alih grid kosong.
- [ ] Error state: jika API gagal (`INTERNAL_ERROR`/`DATABASE_TIMEOUT`), tampilkan pesan ramah dan tombol "Coba lagi", bukan halaman kosong.
- [ ] Submit search hero mengarahkan ke halaman hasil pencarian dengan query string yang benar.
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90; hero memiliki heading `<h1>` tunggal.
- [ ] Mobile: hero search dan kartu properti bertumpuk vertikal, touch target tombol minimal 44x44px.

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `Search`
- **Purpose & Business Meaning:** Memicu aksi pencarian properti di dalam `SearchHero`.
- **Size:** `20px` (Desktop), `24px` (Mobile). **Stroke Width:** `1.5`.
- **Color:** `text-muted-foreground` default, berubah `text-blue-700` saat input fokus.
- **Accessibility:** `aria-hidden="true"` karena berdampingan dengan label "Cari properti".

#### Icon: `ShieldCheck`
- **Purpose & Business Meaning:** Menandakan properti berstatus `FULLY_VERIFIED` pada `PropertyCard`.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** hijau (selaras dengan `Badge variant="verified"`).
- **Accessibility:** `aria-hidden="true"`, teks "Terverifikasi" tetap ada sebagai label.

#### Icon: `ArrowRight`
- **Purpose & Business Meaning:** CTA "Jual Properti Anda" dan "Lihat Semua Properti".
- **Size:** `20px`. **Stroke Width:** `1.5`. **Hover:** translate-x 2px, transisi 150-200ms ease-out.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Halaman ini **DIWAJIBKAN** untuk dibangun dengan mematuhi pedoman visual dari `Mockup.png` guna mencapai standar desain "Apple × Airbnb × Stripe × Zillow":

- **Background Utama:** Dominan `White` (Putih Bersih) untuk memberi ruang bernapas (*Whitespace*).
- **Warna Aksi Utama:** `Royal Blue` (Ekivalen Tailwind `blue-700`) untuk tombol dan tautan aktif.
- **Teks Utama & Heading:** `Dark Navy` (`slate-900`). Dilarang keras menggunakan hitam pekat `#000000`.
- **Warna Sekunder/Surface:** `Light Gray` (`slate-50`/`#F7F9FC`) untuk pembatas seksi atau *background card* sekunder.
- **Card & Elevation:** *Card* putih harus menggunakan efek bayangan ultra-lembut (*Diffused Soft Shadow*, `shadow-[0_8px_30px_rgb(0,0,0,0.04)]`).
- **Bentuk (Shape):** Sudut elemen besar (Card, Modal, Gambar) wajib menggunakan *Border Radius* besar `16-24px`.
- **Fotografi:** Hero image dan foto properti harus besar, jelas, dan memiliki *Warm Lighting* (Pencahayaan Hangat).

**Spesifik halaman ini:**
- Hero section menggunakan layout **full-bleed** (lebar penuh viewport) dengan search bar mengambang (floating) di atas gambar hero, mengikuti pola Airbnb.
- `PropertyCard` pada hover men-scale gambar 1.05x disertai `shadow-xl`, transisi medium (300-400ms spring), dan dinonaktifkan pada perangkat sentuh (`@media (hover:none)`).

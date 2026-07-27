# PRESS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Press
**Module:** 01 PUBLIC WEBSITE
**Purpose:** Menyediakan kit media (logo, tangkapan layar produk, siaran pers, kontak humas) bagi jurnalis dan mitra media yang ingin meliput HomeLink.

## 2. Next.js Routing Path
```text
app/(01_public_website)/press/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Card` (kartu unduhan aset: logo, screenshot, brand guideline)
- `Button` (variant `outline`, aksi "Unduh Media Kit" / "Unduh Logo")
- `Separator` (pembatas antara seksi aset media dan seksi siaran pers)
- `Card` (daftar siaran pers/press release, mirip pola News dengan tanggal + judul)

## 4. Data & State Management
- **Konten:** Fase 1 — konten statis/hardcoded (tautan unduhan file disimpan di storage statis/CDN, bukan database); tidak ada entity `PRESS_RELEASE` di ERD saat ini.
- **Local State:** Tidak ada state interaktif signifikan selain trigger unduhan file.
- **Server State:** Tidak ada fetch data dinamis pada Fase 1.

## 5. API Endpoints Referenced
- Tidak ada endpoint backend untuk Press di Fase 1. Aset media (logo, screenshot) disajikan sebagai file statis, bukan lewat `POST /api/v1/media/presigned-url` (endpoint tersebut khusus untuk unggahan `PROPERTY_MEDIA`, bukan aset korporat). Fase 2: migrasi konten siaran pers ke CMS API (`/api/v1/cms/articles` — belum ada, akan didefinisikan saat modul CMS aktif).

## 6. Acceptance Criteria (DoD)
- [ ] Tautan unduhan aset media berfungsi dan membuka/mengunduh file yang benar tanpa error 404.
- [ ] Empty state: jika belum ada siaran pers yang dipublikasikan, tampilkan pesan "Belum ada siaran pers saat ini" alih-alih daftar kosong.
- [ ] Setiap aset unduhan memiliki label jelas (nama file + format, mis. "Logo HomeLink (PNG, Latar Transparan)").
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90.
- [ ] Mobile: kartu aset media bertumpuk 1 kolom, tombol unduh minimal 44x44px.

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `Download`
- **Purpose & Business Meaning:** Memicu unduhan aset media (logo, screenshot, kit media).
- **Size:** `20px` (Desktop), `24px` (Mobile). **Stroke Width:** `1.5`. **Color:** `text-blue-700`.

#### Icon: `Image`
- **Purpose & Business Meaning:** Menandai kartu aset visual (logo/screenshot).
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `FileText`
- **Purpose & Business Meaning:** Menandai entri siaran pers/press release.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Halaman ini **DIWAJIBKAN** untuk dibangun dengan mematuhi pedoman visual dari `Mockup.png`: background putih dominan, aksi utama `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`), surface sekunder `slate-50`, card dengan *diffused soft shadow*, border radius besar (`16-24px`).

**Spesifik halaman ini:** Seksi aset media menggunakan grid kartu dengan pratinjau thumbnail besar (logo di atas latar `slate-50` untuk kontras), terpisah jelas secara visual dari daftar siaran pers berbasis teks di bawahnya.



**Premium UI Refinement Standards:**
- Semua Heading h1/h2 di UI harus tertulis di dokumen menggunakan class `tracking-tighter` dan `leading-[1.05]`.
- Jarak antar section adalah `py-24 lg:py-32`.
- Shadow menggunakan OKLCH Semantic Shadows (`shadow-card`, `shadow-float`, dsb).
- Penggunaan logo dengan `<Logo />` terpusat.

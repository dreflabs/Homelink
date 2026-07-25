# SITEMAP PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Sitemap
**Module:** 01 PUBLIC WEBSITE
**Purpose:** Menyediakan daftar tautan terstruktur ke seluruh halaman publik HomeLink (Beranda, Tentang Kami, Blog, Legal, dll.) untuk membantu navigasi pengguna dan crawling mesin pencari.

## 2. Next.js Routing Path
```text
app/(01_public_website)/sitemap/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Card` (satu kartu per kategori tautan: "Perusahaan", "Produk", "Legal", "Sumber Daya")
- `Separator` (pembatas antar kategori)
- (Tidak memerlukan `Button`/`Input`/`Skeleton` — halaman ini murni daftar tautan statis)

## 4. Data & State Management
- **Konten:** Sepenuhnya statis — daftar tautan navigasi disusun manual mengikuti struktur routing aktual aplikasi (mengacu pada `20_NAVIGATION_MAP.md`), bukan hasil query database.
- **Local State:** Tidak ada.
- **Server State:** Tidak ada fetch data dinamis; halaman di-SSG penuh.
- **Catatan:** Halaman ini terpisah dari `sitemap.xml` teknis untuk mesin pencari (yang digenerate otomatis oleh Next.js `app/sitemap.ts`) — ini adalah versi HTML yang dapat dibaca manusia.

## 5. API Endpoints Referenced
- Tidak ada endpoint backend digunakan; seluruh tautan bersifat statis mengikuti struktur routing aplikasi.

## 6. Acceptance Criteria (DoD)
- [ ] Semua tautan pada halaman mengarah ke rute yang valid (tidak ada tautan 404) — perlu audit tautan berkala mengikuti perubahan struktur routing.
- [ ] Tautan dikelompokkan per kategori dengan heading yang jelas (`h2` per kategori).
- [ ] Setiap tautan dapat diakses via keyboard dengan urutan tab yang logis mengikuti struktur visual.
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90.
- [ ] Mobile: kategori tautan bertumpuk satu kolom penuh, tetap mudah dipindai (scannable).

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `Map`
- **Purpose & Business Meaning:** Ikon identitas halaman Sitemap pada header.
- **Size:** `20px` (Desktop), `24px` (Mobile). **Stroke Width:** `1.5`. **Color:** `text-blue-700`.

#### Icon: `Link`
- **Purpose & Business Meaning:** Ikon dekoratif kecil di samping setiap tautan dalam daftar.
- **Size:** `16px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`. **Accessibility:** `aria-hidden="true"`.

#### Icon: `ChevronRight`
- **Purpose & Business Meaning:** Menandakan navigasi ke halaman tujuan saat tautan diklik.
- **Size:** `16px`. **Stroke Width:** `1.5`. **Hover:** translate-x 2px.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Halaman ini **DIWAJIBKAN** untuk dibangun dengan mematuhi pedoman visual dari `Mockup.png`: background putih dominan, aksi utama `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`), surface sekunder `slate-50`, card dengan *diffused soft shadow*, border radius besar (`16-24px`).

**Spesifik halaman ini:** Layout grid kolom multi-kategori (mirip footer situs besar seperti Airbnb/Stripe), tanpa gambar atau elemen visual berat — fokus pada kepadatan informasi tautan yang mudah dipindai.

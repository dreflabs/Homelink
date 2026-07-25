# BLOG PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Blog
**Module:** 01 PUBLIC WEBSITE
**Purpose:** Menampilkan daftar artikel blog (tips properti, panduan investasi, edukasi verifikasi) dalam grid berpaginasi untuk mendukung SEO dan edukasi calon pengguna sebelum mereka menggunakan platform.

## 2. Next.js Routing Path
```text
app/(01_public_website)/blog/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Card` (satu kartu per artikel: gambar sampul, judul, ringkasan, tanggal terbit)
- `Badge` (kategori/tag artikel, mis. "Investasi", "Tips Rumah")
- `Pagination` (navigasi antar halaman daftar artikel)
- `Skeleton` (loading state grid artikel)
- `Input` (search bar pencarian judul artikel, opsional)

## 4. Data & State Management
- **Konten:** Fase 1 — konten statis/hardcoded (MDX lokal atau array artikel); tidak ada entity `ARTICLE`/`BLOG_POST` di ERD saat ini.
- **Local State:** `currentPage` untuk paginasi client-side jika data statis; `searchQuery` untuk filter judul.
- **Server State:** Jika Fase 1 menggunakan MDX di server, RSC membaca dan men-generate daftar artikel saat build (SSG); tidak ada runtime fetch ke backend.
- **Catatan Gap:** Sesuai SSOT, tidak ada backend CMS/Blog di Phase 1 (`52_ENDPOINT_CATALOGUE.md`). Fase 1: konten statis/hardcoded; Fase 2: migrasi ke CMS API (`/api/v1/cms/articles` — belum ada, akan didefinisikan saat modul CMS aktif, lihat `89_CMS_MANUAL.md`).

## 5. API Endpoints Referenced
- Tidak ada endpoint backend aktif untuk Blog di Fase 1. Fase 2: `/api/v1/cms/articles` (belum ada) akan menyediakan cursor pagination `{data:[...], meta:{nextCursor,hasNextPage}}` sesuai standar JSend platform.

## 6. Acceptance Criteria (DoD)
- [ ] Grid artikel dirender tanpa *hydration error*; gambar sampul menggunakan `next/image` dengan `alt` deskriptif.
- [ ] Loading state: skeleton grid tampil saat navigasi antar halaman paginasi.
- [ ] Empty state: jika kategori/pencarian tidak menghasilkan artikel, tampilkan pesan jelas, bukan grid kosong.
- [ ] Paginasi dapat dinavigasi via keyboard, halaman aktif memiliki `aria-current="page"`.
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90.
- [ ] Mobile: grid 3 kolom desktop berubah menjadi 1 kolom, paginasi menjadi tombol "Sebelumnya/Berikutnya" sederhana.

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `Newspaper`
- **Purpose & Business Meaning:** Ikon identitas halaman Blog pada header/navigasi.
- **Size:** `24px` (Desktop hero), `20px` (kontekstual). **Stroke Width:** `1.5`. **Color:** `text-blue-700`.

#### Icon: `Calendar`
- **Purpose & Business Meaning:** Menunjukkan tanggal terbit pada setiap kartu artikel (format "24 Juli 2026").
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `ArrowRight`
- **Purpose & Business Meaning:** CTA "Baca Selengkapnya" pada kartu artikel.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Hover:** translate-x 2px.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Halaman ini **DIWAJIBKAN** untuk dibangun dengan mematuhi pedoman visual dari `Mockup.png`: background putih dominan, aksi utama `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`), surface sekunder `slate-50`, card dengan *diffused soft shadow*, border radius besar (`16-24px`), fotografi hangat pada gambar sampul artikel.

**Spesifik halaman ini:** Artikel unggulan (featured) ditampilkan sebagai kartu besar full-width di bagian atas grid, diikuti grid 3 kolom untuk artikel reguler — mengikuti pola tata letak blog editorial modern.

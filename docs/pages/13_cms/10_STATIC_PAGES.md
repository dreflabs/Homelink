# STATIC PAGES PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Static Pages (Halaman Statis Generik)
**Module:** 13 CMS
**Role:** CMS Editor
**Purpose:** Mengelola halaman konten bebas yang belum punya slot khusus di modul lain (mis. halaman kampanye musiman, landing page promosi) — **bukan** untuk halaman legal (`18_legal` tetap satu-satunya sumber kebenaran Privacy/Terms/Refund) maupun halaman marketing tetap (`01_public_website` tetap sumber kebenaran About/Contact/Careers, per keputusan de-duplikasi `13_PRODUCT_ROADMAP.md` §8.3).

## 2. Next.js Routing Path
```text
app/(dashboard)/cms/static-pages/page.tsx
```
Sidebar label: "Halaman Statis".

## 3. Required UI Components (Shadcn/ui)
- `Table` — judul, slug, status.
- Editor Tiptap — isi halaman.

## 4. Data & State Management
- **Menggunakan struktur yang sama dengan `Article`** (`01_DASHBOARD.md` §4) tapi tanpa kategori/tag/tanggal publikasi — cukup `slug/title/body/status`, bisa memakai tabel `Article` yang sama dengan `categoryId = NULL` daripada membuat entity `StaticPage` terpisah, mencegah duplikasi skema untuk kebutuhan yang sangat mirip.

## 5. API Endpoints Referenced
- Sama dengan `02_ARTICLES.md`, difilter berdasarkan tipe/absennya kategori.

## 6. Acceptance Criteria (DoD)
- [ ] Tidak membuat entity `StaticPage` kedua yang terpisah dari `Article` — satu skema, dua konteks pemakaian.
- [ ] Slug halaman statis tidak boleh bentrok dengan rute yang sudah ada di `01_public_website`/`18_legal` — validasi Zod wajib memeriksa daftar slug terpakai.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `FileStack` | Header halaman | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Modul ini bukan salah satu dari 8 dashboard berbasis peran, sehingga tidak memiliki bagian khusus di `27_DASHBOARD_DESIGN_GUIDELINES.md` — mewarisi langsung arketipe Dashboard dari `21_WIREFRAME_SPECIFICATION.md` §8.4, token dari `15_DESIGN_SYSTEM.md`, dan komponen dari `17_COMPONENT_LIBRARY.md`.

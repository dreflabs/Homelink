# SEO PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** SEO (Kelola Metadata SEO)
**Module:** 13 CMS
**Role:** CMS Editor
**Purpose:** Meninjau/mengedit metadata SEO (title tag, meta description) untuk artikel dan halaman statis — bukan sistem terpisah, melainkan tampilan terfokus atas field `seoTitle`/`seoDescription` yang sudah ada di `Article` (`01_DASHBOARD.md` §4).

## 2. Next.js Routing Path
```text
app/(dashboard)/cms/seo/page.tsx
```
Sidebar label: "SEO".

## 3. Required UI Components (Shadcn/ui)
- `Table` — daftar artikel/halaman dengan status kelengkapan SEO (judul/deskripsi terisi atau kosong).
- Preview kartu — simulasi tampilan hasil pencarian Google (judul + deskripsi + URL).

## 4. Data & State Management
- **Tidak ada entity baru** — `seoTitle`/`seoDescription` sudah menjadi bagian dari `Article` yang diusulkan di `01_DASHBOARD.md` §4. Halaman ini murni tampilan agregat/filter atas field yang sudah ada, mencegah godaan membuat tabel `SeoMetadata` terpisah yang sebenarnya tidak perlu.
- Untuk halaman statis Next.js non-CMS (mis. Search Result, Property Detail), metadata SEO diatur langsung via Next.js Metadata API di kode, bukan dari CMS — halaman ini hanya mencakup konten yang memang dikelola CMS Editor.

## 5. API Endpoints Referenced
- Sama dengan `02_ARTICLES.md`/`10_STATIC_PAGES.md` — tidak ada endpoint baru.

## 6. Acceptance Criteria (DoD)
- [ ] Tidak membuat entity `SeoMetadata` terpisah — field SEO tetap melekat pada `Article`.
- [ ] Preview hasil pencarian memotong judul/deskripsi sesuai batas karakter Google (±60/155 karakter) agar CMS Editor tidak menulis metadata yang terpotong di hasil pencarian nyata.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Search` | Header halaman | 20px |
| `AlertCircle` | Penanda SEO belum lengkap | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Modul ini bukan salah satu dari 8 dashboard berbasis peran, sehingga tidak memiliki bagian khusus di `27_DASHBOARD_DESIGN_GUIDELINES.md` — mewarisi langsung arketipe Dashboard dari `21_WIREFRAME_SPECIFICATION.md` §8.4, token dari `15_DESIGN_SYSTEM.md`, dan komponen dari `17_COMPONENT_LIBRARY.md`.

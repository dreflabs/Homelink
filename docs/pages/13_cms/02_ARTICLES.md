# ARTICLES PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Articles (Kelola Artikel)
**Module:** 13 CMS
**Role:** CMS Editor
**Purpose:** Membuat/mengedit/mempublikasikan artikel Blog dan News yang tampil di `01_public_website/08_BLOG.md`/`09_NEWS.md` — kedua halaman publik itu sudah mencatat gap `ARTICLE`/`BLOG_POST` yang belum ada; halaman ini adalah sisi editorial dari entity yang sama.

## 2. Next.js Routing Path
```text
app/(dashboard)/cms/articles/page.tsx
```
Sidebar label: "Artikel".

## 3. Required UI Components (Shadcn/ui)
- `Table` (`17_COMPONENT_LIBRARY.md` §8.3) — judul, kategori, status, tanggal publikasi.
- Editor Tiptap (per `89_CMS_MANUAL.md`) — rich text editor untuk `body`.
- `Select` — pilih `Category`, multi-select `Tag`.
- `Dropzone` — cover image (`coverImageUrl`), spesifikasi 1200×630px OpenGraph per `89_CMS_MANUAL.md`.

## 4. Data & State Management
- Menggunakan `Article`/`Category`/`Tag`/`ArticleTag` yang diusulkan di `01_DASHBOARD.md` §4 — tidak didefinisikan ulang di sini.
- **Aturan penting dari `89_CMS_MANUAL.md`:** `slug` immutable setelah `status = PUBLISHED` (tidak boleh diedit lagi, demi SEO) — validasi Zod harus menolak perubahan `slug` pada artikel published.
- On-demand revalidation (`89_CMS_MANUAL.md`) memicu purge cache Cloudflare saat artikel disimpan — bukan menunggu build ulang penuh.

## 5. API Endpoints Referenced
- Diusulkan `/api/v1/cms/articles` (CRUD), menunggu skema di `01_DASHBOARD.md`.

## 6. Acceptance Criteria (DoD)
- [ ] Field `slug` dikunci (read-only) setelah artikel berstatus `PUBLISHED`.
- [ ] Cover image divalidasi rasio 1200×630px sebelum diterima, sesuai spesifikasi OpenGraph di `89_CMS_MANUAL.md`.
- [ ] Draft tidak tampil di `01_public_website/08_BLOG.md`/`09_NEWS.md` — hanya `status = PUBLISHED`.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `FileText` | Header halaman | 20px |
| `Pencil` | Aksi edit per baris | 16px |
| `Eye` | Pratinjau artikel sebelum publish | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Modul ini bukan salah satu dari 8 dashboard berbasis peran, sehingga tidak memiliki bagian khusus di `27_DASHBOARD_DESIGN_GUIDELINES.md` — mewarisi langsung arketipe Dashboard dari `21_WIREFRAME_SPECIFICATION.md` §8.4, token dari `15_DESIGN_SYSTEM.md`, dan komponen dari `17_COMPONENT_LIBRARY.md`.

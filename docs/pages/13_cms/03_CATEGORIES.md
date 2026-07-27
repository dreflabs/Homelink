# CATEGORIES PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Categories (Kategori Artikel)
**Module:** 13 CMS
**Role:** CMS Editor
**Purpose:** Mengelola kategori yang mengelompokkan `Article` (Blog/News) — entity `Category` yang **sudah diantisipasi** di `43_RELATIONSHIP_SPECIFICATION.md` (aturan cascade `Category → Article : SET NULL`) meski belum benar-benar dimodel di `40_ERD.md`.

## 2. Next.js Routing Path
```text
app/(dashboard)/cms/categories/page.tsx
```
Sidebar label: "Kategori".

## 3. Required UI Components (Shadcn/ui)
- `Table` — nama, slug, jumlah artikel per kategori.
- `Input` — nama kategori (slug auto-generated).

## 4. Data & State Management
- Menggunakan `Category` yang diusulkan di `01_DASHBOARD.md` §4 — tidak didefinisikan ulang.
- **Aturan hapus kategori:** mengikuti `43_RELATIONSHIP_SPECIFICATION.md` — menghapus `Category` men-set `Article.categoryId = NULL` (bukan menghapus artikelnya), sesuai aturan yang sudah tertulis di sana.

## 5. API Endpoints Referenced
- Diusulkan `/api/v1/cms/categories`, menunggu skema §4.

## 6. Acceptance Criteria (DoD)
- [ ] Menghapus kategori yang masih dipakai artikel menampilkan konfirmasi eksplisit yang menjelaskan efeknya (`Article.categoryId` menjadi null, bukan artikel terhapus).
- [ ] Slug kategori unik, auto-generated dari nama tapi dapat diedit manual sebelum disimpan pertama kali.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `FolderTree` | Header halaman | 20px |
| `Trash2` | Hapus kategori | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Modul ini bukan salah satu dari 8 dashboard berbasis peran, sehingga tidak memiliki bagian khusus di `27_DASHBOARD_DESIGN_GUIDELINES.md` — mewarisi langsung arketipe Dashboard dari `21_WIREFRAME_SPECIFICATION.md` §8.4, token dari `15_DESIGN_SYSTEM.md`, dan komponen dari `17_COMPONENT_LIBRARY.md`.

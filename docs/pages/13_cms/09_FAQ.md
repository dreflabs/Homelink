# FAQ PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** FAQ (Kelola Pertanyaan Umum)
**Module:** 13 CMS
**Role:** CMS Editor
**Purpose:** Mengelola daftar pertanyaan umum yang tampil di `01_public_website/06_FAQ.md` — halaman publik itu sudah mencatat gap `FAQ_ITEM` yang belum ada; halaman ini adalah sisi editorial dari entity yang sama.

## 2. Next.js Routing Path
```text
app/(dashboard)/cms/faq/page.tsx
```
Sidebar label: "FAQ".

## 3. Required UI Components (Shadcn/ui)
- `Table` — pertanyaan, kategori, urutan.
- `Input`/`Textarea` — pertanyaan/jawaban.
- Drag handle — atur `order` manual (urutan tampil di publik).

## 4. Data & State Management
- Menggunakan `FaqItem` yang diusulkan di `01_DASHBOARD.md` §4 — tidak didefinisikan ulang.

## 5. API Endpoints Referenced
- Diusulkan `/api/v1/cms/faq`, menunggu skema §4.

## 6. Acceptance Criteria (DoD)
- [ ] Urutan FAQ di CMS langsung tercermin di urutan tampil publik (`order` field), tanpa perlu redeploy.
- [ ] Kategori FAQ (jika diisi) dipakai untuk pengelompokan tampilan di `01_public_website/06_FAQ.md`, bukan field kosmetik semata.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `HelpCircle` | Header halaman | 20px |
| `GripVertical` | Drag handle urutan | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Modul ini bukan salah satu dari 8 dashboard berbasis peran, sehingga tidak memiliki bagian khusus di `27_DASHBOARD_DESIGN_GUIDELINES.md` — mewarisi langsung arketipe Dashboard dari `21_WIREFRAME_SPECIFICATION.md` §8.4, token dari `15_DESIGN_SYSTEM.md`, dan komponen dari `17_COMPONENT_LIBRARY.md`.

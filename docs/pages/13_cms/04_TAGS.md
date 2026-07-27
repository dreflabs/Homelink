# TAGS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Tags (Label Artikel)
**Module:** 13 CMS
**Role:** CMS Editor
**Purpose:** Mengelola label bebas (many-to-many) yang bisa dilekatkan ke `Article` untuk penemuan konten lintas kategori (mis. artikel di kategori "Panduan Membeli" dan "Panduan Menjual" sama-sama bisa bertag "KPR").

## 2. Next.js Routing Path
```text
app/(dashboard)/cms/tags/page.tsx
```
Sidebar label: "Tags".

## 3. Required UI Components (Shadcn/ui)
- `Table` — nama tag, jumlah artikel terkait.
- `Input` — tambah tag cepat.

## 4. Data & State Management
- Menggunakan `Tag`/`ArticleTag` yang diusulkan di `01_DASHBOARD.md` §4 — relasi many-to-many, tidak didefinisikan ulang.

## 5. API Endpoints Referenced
- Diusulkan `/api/v1/cms/tags`, menunggu skema §4.

## 6. Acceptance Criteria (DoD)
- [ ] Menghapus tag yang masih dipakai artikel hanya menghapus baris `ArticleTag` terkait, tidak memengaruhi `Article` itu sendiri.
- [ ] Tag duplikat (nama sama, huruf besar/kecil berbeda) dicegah di validasi Zod.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Tag` | Header halaman | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Modul ini bukan salah satu dari 8 dashboard berbasis peran, sehingga tidak memiliki bagian khusus di `27_DASHBOARD_DESIGN_GUIDELINES.md` — mewarisi langsung arketipe Dashboard dari `21_WIREFRAME_SPECIFICATION.md` §8.4, token dari `15_DESIGN_SYSTEM.md`, dan komponen dari `17_COMPONENT_LIBRARY.md`.

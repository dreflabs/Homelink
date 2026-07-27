# MEDIA PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Media (Pustaka Media CMS)
**Module:** 13 CMS
**Role:** CMS Editor
**Purpose:** Pustaka aset gambar untuk kebutuhan konten marketing (cover artikel, banner, avatar testimoni) — **berbeda dari `PROPERTY_MEDIA`** (yang khusus foto/dokumen properti dengan aturan verifikasi ketat). Media CMS tidak terkait properti, tidak butuh alur verifikasi.

## 2. Next.js Routing Path
```text
app/(dashboard)/cms/media/page.tsx
```
Sidebar label: "Media".

## 3. Required UI Components (Shadcn/ui)
- Grid galeri (mirip `17_COMPONENT_LIBRARY.md` §8.7 Photographer Gallery pattern, tanpa Card wrapper tebal per thumbnail).
- `Dropzone` — unggah gambar baru langsung ke Cloudflare R2.

## 4. Data & State Management
- **Gap kecil, terpisah dari skema CMS utama:** upload dapat memakai pola presigned-URL yang sama dengan `PROPERTY_MEDIA` (`52_ENDPOINT_CATALOGUE.md`), tapi disimpan di folder R2 terpisah (mis. `cms/` bukan `properties/`) dan **tidak memerlukan entity Prisma sendiri** jika hanya dipakai sebagai referensi URL langsung di `Article.coverImageUrl`/`Banner.imageUrl`/`Testimonial.avatarUrl` — daftar file dapat diambil langsung dari R2 API (list objects), bukan tabel database.

## 5. API Endpoints Referenced
- `POST /api/v1/media/presigned-url` — sudah ada, dipakai ulang dengan folder tujuan berbeda.

## 6. Acceptance Criteria (DoD)
- [ ] Media CMS tidak tercampur secara visual/struktural dengan `PROPERTY_MEDIA` (folder R2 terpisah).
- [ ] Tidak membangun tabel `CmsMedia` baru jika daftar file dari R2 API sudah cukup — hindari over-engineering untuk kebutuhan sederhana ini.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Image` | Header halaman | 20px |
| `UploadCloud` | Dropzone idle state | 48px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Modul ini bukan salah satu dari 8 dashboard berbasis peran, sehingga tidak memiliki bagian khusus di `27_DASHBOARD_DESIGN_GUIDELINES.md` — mewarisi langsung arketipe Dashboard dari `21_WIREFRAME_SPECIFICATION.md` §8.4, token dari `15_DESIGN_SYSTEM.md`, dan komponen dari `17_COMPONENT_LIBRARY.md`.

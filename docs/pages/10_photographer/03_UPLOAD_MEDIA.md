# UPLOAD MEDIA PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Upload Media
**Module:** 10 PHOTOGRAPHER
**Role:** Photographer
**Purpose:** Mengunggah hasil foto/video/360 sebuah properti untuk penugasan aktif, langsung ke Cloudflare R2 via presigned URL — pola yang sama dengan `09_surveyor/04_UPLOAD_PHOTO.md`.

## 2. Next.js Routing Path
```text
app/(dashboard)/photographer/assignments/[id]/upload/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Dropzone` (`17_COMPONENT_LIBRARY.md` §8.5) — progress per-file, bukan satu progress bar global.
- `Badge` — jenis media (Foto/Video/360).

## 4. Data & State Management
- **Foto — sudah bisa diimplementasikan hari ini:** `PROPERTY_MEDIA.mediaType = IMAGE` sudah ada di `40_ERD.md`, presigned-URL upload flow sudah ada di `POST /api/v1/media/presigned-url` (`52_ENDPOINT_CATALOGUE.md`).
- **Video/360 — gap sudah tercatat, tidak diduplikasi:** `PROPERTY_MEDIA.mediaType` hanya mendukung `IMAGE`/`PDF_CERTIFICATE` — gap yang sama persis dengan yang sudah diidentifikasi di `09_surveyor/05_UPLOAD_VIDEO.md`, ditandai sebagai *go-live blocker* di sana. Halaman ini mewarisi status gap yang sama, tidak menyatakan ulang seolah masalah baru.
- Bergantung juga pada gap `PhotographerAssignment` (`02_ASSIGNMENT.md`) untuk tahu properti mana yang sedang aktif diunggah.

## 5. API Endpoints Referenced
- `POST /api/v1/media/presigned-url`, kemudian `PUT` langsung ke R2 — sudah ada, berfungsi untuk foto.
- Video/360: menunggu perluasan `mediaType`, tidak ada endpoint baru yang dibutuhkan di luar itu.

## 6. Acceptance Criteria (DoD)
- [ ] Upload foto berfungsi penuh hari ini tanpa menunggu gap lain.
- [ ] UI jelas menonaktifkan pilihan "Video"/"360" dengan label "Segera hadir" sampai `mediaType` diperluas — bukan menerima upload video lalu gagal diam-diam di backend.
- [ ] Setiap file progress independen (`17` §8.5 Dropzone anti-pattern) — kegagalan satu file tidak menggagalkan seluruh batch.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `UploadCloud` | Dropzone idle state | 48px |
| `ImageIcon` | Badge jenis media Foto | 16px |
| `Video` | Badge jenis media Video (dinonaktifkan) | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.7 Photographer Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

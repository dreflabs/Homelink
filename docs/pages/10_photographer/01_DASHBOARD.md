# DASHBOARD PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Dashboard (Ringkasan)
**Module:** 10 PHOTOGRAPHER
**Role:** Photographer (`13_PRODUCT_ROADMAP.md` §8.3 Fase 2)
**Purpose:** Landing page bagi Photographer — Hero menampilkan penugasan hari ini (properti mana yang harus difoto/direkam), diikuti status upload/pengiriman galeri, sesuai `27_DASHBOARD_DESIGN_GUIDELINES.md` §8.7.

**⚠️ Catatan gap fondasional (berlaku untuk seluruh modul ini):** `USER.role` di `40_ERD.md` hanya berisi `GUEST, BUYER, OWNER, ADMIN, SURVEYOR` — **tidak ada `PHOTOGRAPHER`**. Berbeda dari Partner Agent/Internal Agent/Super Admin (yang memang sengaja ditunda ke Fase 2/3 dan gap-nya konsisten dengan roadmap), role `PHOTOGRAPHER` **sudah punya endpoint aktif di `52_ENDPOINT_CATALOGUE.md` §8.6** (`GET /assignments`, `POST /:id/deliver`) **dan sudah punya baris izin di `56_AUTHORIZATION_MATRIX.md`** — artinya lapisan API/otorisasi sudah menganggap role ini aktif di Fase 1, tapi lapisan data (`USER.role` enum) belum diperbarui untuk mendukungnya. Ini satu-satunya gap peran di seluruh dokumentasi yang tidak punya alasan penundaan fase — perlu diperbaiki di ERD sebelum modul ini benar-benar bisa berfungsi dengan autentikasi nyata.

## 2. Next.js Routing Path
```text
app/(dashboard)/photographer/page.tsx
```
Sidebar label: "Ringkasan" — sidebar modul ini paling sederhana dari semua peran (`27` §8.7: Dashboard, Assignment, Gallery, Delivery, Schedule, Profile saja).

## 3. Required UI Components (Shadcn/ui)
- `Hero Card` (`17_COMPONENT_LIBRARY.md` §8.4) — penugasan hari ini: properti, alamat, jenis media diminta (foto/video).
- `Metric Card` — jumlah item dalam antrian upload, jumlah pengiriman menunggu konfirmasi klien.
- `Skeleton` — loading Hero.
- `EmptyState` — tidak ada penugasan hari ini.

## 4. Data & State Management
- **Gap ganda:** selain gap role di atas, tidak ada entity `PhotographerAssignment` yang terlihat di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — padahal endpoint `GET /api/v1/photography/assignments` sudah terdokumentasi di `52_ENDPOINT_CATALOGUE.md` §8.6. Diusulkan skema minimal:
  ```
  PhotographerAssignment {
    id            String   @id @default(uuid())
    photographerId String  // FK -> USER (role PHOTOGRAPHER, menunggu enum di atas)
    propertyId    String   // FK -> PROPERTY
    mediaTypesRequested String[] // ["PHOTO","VIDEO","360"]
    scheduledAt   DateTime
    status        AssignmentStatus // ASSIGNED | IN_PROGRESS | DELIVERED
  }
  ```
- Media hasil pemotretan disimpan di `PROPERTY_MEDIA` yang sudah ada — lihat gap `mediaType` (hanya `IMAGE`/`PDF_CERTIFICATE`, belum `VIDEO`/`360`) yang sudah tercatat di `09_surveyor/05_UPLOAD_VIDEO.md`, berlaku sama di sini, tidak diduplikasi.

## 5. API Endpoints Referenced
- `GET /api/v1/photography/assignments` — **nama endpoint sudah ada di `52_ENDPOINT_CATALOGUE.md` §8.6**, tapi belum ada skema `PhotographerAssignment` yang mendasarinya di ERD — gap konkret yang dicatat di sini, bukan diasumsikan berfungsi.

## 6. Acceptance Criteria (DoD)
- [ ] Halaman ini secara eksplisit menyatakan gap role `PHOTOGRAPHER` di dokumentasi (bukan disembunyikan) — lihat catatan di atas.
- [ ] Hero merender `EmptyState` jika tidak ada penugasan, bukan data dummy.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Camera` | Hero — penugasan hari ini | 20px |
| `UploadCloud` | Metric Card antrian upload | 20px |
| `Send` | Metric Card pengiriman menunggu konfirmasi | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.7 Photographer Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

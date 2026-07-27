# ASSIGNMENT PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Assignment (Daftar Penugasan)
**Module:** 10 PHOTOGRAPHER
**Role:** Photographer
**Purpose:** Daftar seluruh properti yang ditugaskan ke Photographer untuk difoto/direkam, dengan status (ditugaskan/sedang dikerjakan/terkirim).

## 2. Next.js Routing Path
```text
app/(dashboard)/photographer/assignments/page.tsx
```
Sidebar label: "Penugasan".

## 3. Required UI Components (Shadcn/ui)
- `Table` (`17_COMPONENT_LIBRARY.md` §8.3) — properti, alamat, jenis media diminta, `Badge` status.
- `EmptyState`.

## 4. Data & State Management
- **Ini adalah halaman anchor untuk gap `PhotographerAssignment`** yang diusulkan di `01_DASHBOARD.md` §4 — endpoint `GET /api/v1/photography/assignments` sudah terdokumentasi di `52_ENDPOINT_CATALOGUE.md` §8.6, tapi skema data pendukungnya belum ada di `40_ERD.md`. Halaman ini adalah tempat skema tersebut pertama kali dibutuhkan secara konkret.
- Sampai skema tersedia, halaman merender `EmptyState` dengan pesan jelas, bukan tabel kosong tanpa konteks.

## 5. API Endpoints Referenced
- `GET /api/v1/photography/assignments` — nama sudah ada di catalogue, menunggu skema `PhotographerAssignment`.

## 6. Acceptance Criteria (DoD)
- [ ] Photographer hanya melihat penugasan miliknya sendiri begitu skema tersedia (BOLA test wajib).
- [ ] Status penugasan konsisten dengan status yang sama dipakai di `04_GALLERY.md`/`05_DELIVERY.md` — satu sumber kebenaran status, tidak didefinisikan ulang per halaman.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Camera` | Header halaman | 20px |
| `MapPin` | Alamat properti per baris | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.7 Photographer Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

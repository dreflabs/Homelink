# SCHEDULE PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Schedule (Jadwal Pemotretan)
**Module:** 10 PHOTOGRAPHER
**Role:** Photographer
**Purpose:** Kalender penugasan mendatang — kapan dan di mana Photographer harus memotret properti berikutnya.

## 2. Next.js Routing Path
```text
app/(dashboard)/photographer/schedule/page.tsx
```
Sidebar label: "Jadwal".

## 3. Required UI Components (Shadcn/ui)
- `DatePicker`/kalender grid (`17_COMPONENT_LIBRARY.md` §8.5).
- Timeline Card — penugasan hari terpilih (alamat, jenis media diminta).
- `EmptyState`.

## 4. Data & State Management
- **Bergantung penuh pada skema `PhotographerAssignment`** yang diusulkan di `01_DASHBOARD.md`/`02_ASSIGNMENT.md` (`scheduledAt`) — tidak ada gap tambahan di luar itu; halaman ini murni tampilan kalender dari data yang sama dengan `02_ASSIGNMENT.md`, bukan sumber data terpisah.

## 5. API Endpoints Referenced
- Sama dengan `02_ASSIGNMENT.md`: `GET /api/v1/photography/assignments`, menunggu skema.

## 6. Acceptance Criteria (DoD)
- [ ] Tidak mendefinisikan ulang data penugasan secara terpisah dari `02_ASSIGNMENT.md` — satu sumber data, dua tampilan (daftar vs kalender).
- [ ] Merender `EmptyState` untuk hari tanpa penugasan.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `CalendarClock` | Header halaman | 20px |
| `MapPin` | Lokasi penugasan per hari | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.7 Photographer Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

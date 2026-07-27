# CALENDAR PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Calendar (Agenda)
**Module:** 07 PARTNER AGENT DASHBOARD
**Role:** Partner Agent
**Purpose:** Menampilkan agenda gabungan Partner Agent — jadwal survei properti kelolaan (dari `BOOKING`, entity yang sudah ada) dan pertemuan klien non-survei (mis. presentasi penawaran), dalam satu tampilan kalender.

## 2. Next.js Routing Path
```text
app/(dashboard)/partner-agent/calendar/page.tsx
```
Sidebar label: "Kalender".

## 3. Required UI Components (Shadcn/ui)
- `DatePicker`/kalender grid (`17_COMPONENT_LIBRARY.md` §8.5) — tampilan bulan/minggu.
- Timeline Card — daftar agenda hari terpilih.
- `Badge` — jenis agenda (Survei vs Pertemuan Klien).
- `EmptyState` — hari tanpa agenda.

## 4. Data & State Management
- **Sebagian sudah bisa diimplementasikan:** jadwal survei properti kelolaan dapat diambil dari `BOOKING` (entity yang sudah ada di `40_ERD.md`, fields `surveyDate`/`timeSlot`) — setelah relasi Agent↔Property tersedia (`02_PROPERTY_MANAGEMENT.md` §4).
- **Gap skema:** pertemuan klien non-survei (mis. "presentasi penawaran ke calon pembeli") tidak punya entity — `BOOKING` di ERD spesifik untuk survei properti (buyer-owner-surveyor), bukan agenda generik. Diusulkan entity `AgentMeeting { id, agentId, leadId?, title, scheduledAt, location }` sebagai perluasan kecil, bukan menumpangkan pada `BOOKING`.
- Sampai skema pertemuan tersedia, kalender hanya menampilkan agenda survei (dari `BOOKING`) dan merender slot kosong untuk hari tanpa survei — tidak memalsukan data pertemuan.

## 5. API Endpoints Referenced
- `GET /api/v1/bookings` — sudah ada, dipakai untuk agenda survei (setelah relasi Agent↔Property tersedia).
- Belum ada endpoint untuk `AgentMeeting` — diusulkan, dicatat sebagai gap.

## 6. Acceptance Criteria (DoD)
- [ ] Agenda survei dan pertemuan klien dibedakan dengan Badge warna berbeda, tidak disamakan secara visual.
- [ ] Selama `AgentMeeting` belum ada, halaman tidak menyembunyikan seluruh kalender — tetap menampilkan agenda survei yang sudah bisa diambil dari `BOOKING`.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `CalendarClock` | Header halaman | 20px |
| `MapPin` | Agenda survei (lokasi properti) | 16px |
| `Handshake` | Agenda pertemuan klien | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.4 Partner Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

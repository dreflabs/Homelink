# CALENDAR PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Calendar (Agenda Kerja)
**Module:** 08 INTERNAL HOMELINK AGENT
**Role:** Internal HomeLink Agent
**Purpose:** Agenda kerja internal — sesi tinjauan verifikasi terjadwal dan panggilan follow-up lead. Sama pola dan gap dengan `07_partner_agent_dashboard/06_CALENDAR.md`.

## 2. Next.js Routing Path
```text
app/(dashboard)/internal-agent/calendar/page.tsx
```
Sidebar label: "Kalender".

## 3. Required UI Components (Shadcn/ui)
- `DatePicker`/kalender grid (`17_COMPONENT_LIBRARY.md` §8.5).
- Timeline Card — agenda hari terpilih.
- `EmptyState`.

## 4. Data & State Management
- **Gap skema yang sama dengan Partner Agent:** memakai entity `AgentMeeting` yang diusulkan di `07_partner_agent_dashboard/06_CALENDAR.md` — bukan entity baru terpisah. Konteks agenda di sini adalah sesi tinjauan verifikasi dan follow-up lead, bukan pertemuan penjualan, tapi struktur datanya identik (`agentId, leadId?/propertyId?, title, scheduledAt`).

## 5. API Endpoints Referenced
- Sama proposal dengan `07_partner_agent_dashboard/06_CALENDAR.md`, menunggu skema `AgentMeeting`.

## 6. Acceptance Criteria (DoD)
- [ ] Tidak mendefinisikan entity agenda kedua yang terpisah dari proposal Partner Agent.
- [ ] Merender `EmptyState` yang jelas selama backend belum tersedia.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `CalendarClock` | Header halaman | 20px |
| `ShieldAlert` | Agenda sesi tinjauan verifikasi | 16px |
| `PhoneCall` | Agenda follow-up lead | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.5 Internal Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

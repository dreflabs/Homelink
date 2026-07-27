# LEAD MANAGEMENT PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Lead Management
**Module:** 08 INTERNAL HOMELINK AGENT
**Role:** Internal HomeLink Agent
**Purpose:** Mengelola leads yang masuk langsung ke HomeLink (bukan melalui Partner Agent eksternal) — calon pembeli/penyewa yang menghubungi platform langsung, ditugaskan ke Internal Agent untuk ditindaklanjuti. Menggunakan pola pipeline yang sama seperti `07_partner_agent_dashboard/03_LEADS.md`.

## 2. Next.js Routing Path
```text
app/(dashboard)/internal-agent/leads/page.tsx
```
Sidebar label: "Leads", di bawah grup nav "Sales" (`27_DASHBOARD_DESIGN_GUIDELINES.md` §8.5).

## 3. Required UI Components (Shadcn/ui)
- `Action Card` (`17_COMPONENT_LIBRARY.md` §8.4) — pipeline per tahap, identik pola dengan `07_partner_agent_dashboard/03_LEADS.md`.
- `Badge` — tahap lead (Info→Warning→Success).
- `EmptyState` per kolom.

## 4. Data & State Management
- **Gap skema (sama dengan Partner Agent, satu entity bersama):** menggunakan `Lead` yang diusulkan di `07_partner_agent_dashboard/03_LEADS.md` — **bukan entity terpisah**. Perbedaannya hanya pada asal (`leadSource: DIRECT | PARTNER_AGENT_REFERRAL`) dan siapa yang ditugaskan (`agentId` dapat menunjuk ke `USER` berperan `PARTNER_AGENT` maupun Internal Agent — catatan: role Internal Agent sendiri juga belum ada di `USER.role` enum, sama seperti gap `PARTNER_AGENT`).
- **Keputusan produk terbuka:** apakah lead yang masuk langsung (`DIRECT`) secara otomatis ditugaskan ke Internal Agent, atau bisa juga dialihkan ke Partner Agent — ini menentukan aturan routing di endpoint `POST /api/v1/leads`, belum diputuskan, dicatat sebagai gap keputusan bukan gap teknis.
- Sampai `Lead` tersedia, halaman merender 4 kolom `EmptyState`.

## 5. API Endpoints Referenced
- Sama dengan `07_partner_agent_dashboard/03_LEADS.md`: `GET/PATCH /api/v1/leads` (bukan namespace `/agents/me/leads` yang scoped-Partner-Agent, karena Internal Agent butuh visibilitas lintas-lead) — perbedaan namespace ini sendiri adalah bagian dari keputusan skema yang belum final.

## 6. Acceptance Criteria (DoD)
- [ ] Tidak mengimplementasikan entity `Lead` kedua yang terpisah dari `07_partner_agent_dashboard/03_LEADS.md` — satu skema, dua konteks penggunaan.
- [ ] Kolom pipeline identik secara visual dengan versi Partner Agent (one Design DNA, `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` §8.1 Principle 6).
- [ ] Merender `EmptyState` per kolom selama backend belum ada.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `UserPlus` | Kolom "Baru" | 20px |
| `PhoneCall` | Kolom "Dihubungi" | 20px |
| `Handshake` | Kolom "Negosiasi" | 20px |
| `CheckCircle2` | Kolom "Closing" | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.5 Internal Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

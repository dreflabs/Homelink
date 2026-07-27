# ANALYTICS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Analytics (Analitik Kinerja)
**Module:** 08 INTERNAL HOMELINK AGENT
**Role:** Internal HomeLink Agent
**Purpose:** Tren throughput verifikasi (berapa properti/owner diverifikasi per minggu, rata-rata waktu putus) dan tren konversi lead — gabungan metrik dari dua mandat modul ini (Sales & Verification).

## 2. Next.js Routing Path
```text
app/(dashboard)/internal-agent/analytics/page.tsx
```
Sidebar label: "Analitik".

## 3. Required UI Components (Shadcn/ui)
- `Analytics Card` (`17_COMPONENT_LIBRARY.md` §8.4) — dua grafik terpisah: throughput verifikasi, dan funnel konversi lead.
- `Select` — rentang waktu.

## 4. Data & State Management
- **Throughput verifikasi — sudah bisa diimplementasikan hari ini:** dihitung dari `VERIFICATION_AUDIT` (yang sudah ada di ERD), agregasi `COUNT()`/`AVG(waktu antara createdAt dan resolvedAt)` per minggu — tidak ada gap skema untuk metrik ini.
- **Funnel konversi lead — bergantung pada gap `Lead`** (`02_LEAD_MANAGEMENT.md`) — tidak dapat dihitung sampai entity tersedia.
- Halaman ini secara sengaja memisahkan dua metrik dengan status berbeda (satu real, satu blocked) alih-alih menyembunyikan keduanya di balik satu banner "coming soon" generik.

## 5. API Endpoints Referenced
- Verifikasi: dihitung dari `GET /api/v1/verification-audits` (proposal, mengikuti pola `11_admin/07_ANALYTICS.md` yang juga belum punya endpoint agregasi khusus, dihitung on-the-fly).
- Lead: menunggu skema, lihat `02_LEAD_MANAGEMENT.md`.

## 6. Acceptance Criteria (DoD)
- [ ] Grafik throughput verifikasi menampilkan data nyata (bukan dummy) karena entity pendukungnya sudah ada.
- [ ] Grafik funnel lead menampilkan `EmptyState`/banner gap yang jelas, terpisah dari grafik verifikasi yang berfungsi.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `BarChart3` | Analytics Card throughput verifikasi | 20px |
| `TrendingUp` | Analytics Card funnel lead | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.5 Internal Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

# REPORTS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Reports (Laporan Performa)
**Module:** 07 PARTNER AGENT DASHBOARD
**Role:** Partner Agent
**Purpose:** Ringkasan performa penjualan agent — jumlah lead masuk, tingkat konversi ke closing, dan estimasi komisi — untuk membantu agent mengevaluasi produktivitasnya sendiri secara berkala (bukan harian).

## 2. Next.js Routing Path
```text
app/(dashboard)/partner-agent/reports/page.tsx
```
Sidebar label: "Laporan".

## 3. Required UI Components (Shadcn/ui)
- `Analytics Card` (`17_COMPONENT_LIBRARY.md` §8.4) — grafik tren lead masuk & konversi per bulan.
- `Metric Card` — tingkat konversi (%), total closing, total komisi periode terpilih.
- `Select` — pemilih rentang waktu (bulan ini/3 bulan/tahun ini).

## 4. Data & State Management
- **Bergantung penuh pada dua gap yang sama seperti halaman lain di modul ini:** entity `Lead` (`03_LEADS.md`) untuk menghitung funnel/konversi, dan entity `Commission` (`05_COMMISSION.md`) untuk nilai komisi. Halaman ini tidak memperkenalkan entity baru — murni agregasi dari keduanya, mengikuti pola honest-gap yang sama seperti `06_owner_dashboard/07_ANALYTICS.md`.
- Tidak ada entity agregasi/materialized view terpisah yang diusulkan di sini — metrik dihitung on-the-fly dari `Lead`/`Commission` begitu keduanya tersedia, konsisten dengan pendekatan `11_admin/06_REPORTS.md`.

## 5. API Endpoints Referenced
- Tidak ada endpoint khusus laporan diusulkan — dihitung dari `GET /api/v1/agents/me/leads` dan `GET /api/v1/agents/me/commissions` begitu keduanya ada (lihat `03_LEADS.md`, `05_COMMISSION.md`).

## 6. Acceptance Criteria (DoD)
- [ ] Halaman ini secara eksplisit menyatakan ketergantungannya pada `Lead`/`Commission` di UI (banner info), bukan diam-diam menampilkan grafik kosong.
- [ ] Tingkat konversi dihitung dari data nyata begitu tersedia, tidak pernah di-hardcode sebagai contoh angka.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `TrendingUp` | Metric Card tingkat konversi | 24px |
| `BarChart3` | Analytics Card tren bulanan | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.4 Partner Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

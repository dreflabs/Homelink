# COMMISSION PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Commission (Insentif Kinerja)
**Module:** 08 INTERNAL HOMELINK AGENT
**Role:** Internal HomeLink Agent
**Purpose:** Menampilkan insentif/bonus kinerja yang diperoleh Internal Agent dari lead langsung yang berhasil dikonversi — berbeda konteks dari komisi Partner Agent (referal eksternal B2B), tapi memakai skema data yang sama.

## 2. Next.js Routing Path
```text
app/(dashboard)/internal-agent/commission/page.tsx
```
Sidebar label: "Komisi", di bawah grup nav "Sales".

## 3. Required UI Components (Shadcn/ui)
- `Metric Card` — total insentif bulan berjalan.
- `Table` — rincian per lead yang closing.
- `EmptyState`.

## 4. Data & State Management
- **Gap skema yang sama dengan `07_partner_agent_dashboard/05_COMMISSION.md`** — entity `Commission` belum ada (sengaja ditunda bersama Billing per catatan ERD §11). Halaman ini **menggunakan skema `Commission` yang sama**, difilter `agentId = session.userId` untuk lead berjenis `leadSource=DIRECT`.
- Tidak ada perluasan skema tambahan yang dibutuhkan khusus halaman ini di luar yang sudah diusulkan di `07_partner_agent_dashboard/05_COMMISSION.md`.

## 5. API Endpoints Referenced
- `GET /api/v1/agents/me/commissions` — sama proposal dengan Partner Agent, menunggu skema §4.

## 6. Acceptance Criteria (DoD)
- [ ] Halaman secara eksplisit menyatakan status "Fase 2" sampai `Commission` tersedia, konsisten dengan pola `06_owner_dashboard/10_BILLING.md`.
- [ ] Tidak mendefinisikan skema `Commission` kedua yang berbeda dari Partner Agent — satu entity, konteks berbeda.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Wallet` | Metric Card total insentif | 24px |
| `TrendingUp` | Indikator tren bulanan | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.5 Internal Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

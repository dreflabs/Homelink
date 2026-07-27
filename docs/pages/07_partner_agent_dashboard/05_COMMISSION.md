# COMMISSION PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Commission (Komisi)
**Module:** 07 PARTNER AGENT DASHBOARD
**Role:** Partner Agent
**Purpose:** Menampilkan riwayat dan estimasi komisi yang diperoleh Partner Agent dari transaksi yang berhasil ditutup — bagian dari monetisasi Tier-3 SaaS B2B (`02_BUSINESS_REQUIREMENT_DOCUMENT_BRD.md`), dijadwalkan Fase 2 per `13_PRODUCT_ROADMAP.md` §8.3.

## 2. Next.js Routing Path
```text
app/(dashboard)/partner-agent/commission/page.tsx
```
Sidebar label: "Komisi".

## 3. Required UI Components (Shadcn/ui)
- `Metric Card` (`17_COMPONENT_LIBRARY.md` §8.3/§8.4) — total komisi bulan berjalan, dengan tabular figures (`15_DESIGN_SYSTEM.md` §8.7).
- `Table` — rincian komisi per transaksi (properti, tanggal closing, nilai komisi, status pembayaran).
- `EmptyState` — jika belum ada komisi tercatat.

## 4. Data & State Management
- **Gap skema (fondasional):** Tidak ada entity `Commission` di `40_ERD.md` — sengaja belum dimodel bersamaan dengan modul Billing (`06_owner_dashboard/10_BILLING.md`), sesuai catatan ERD §11 bahwa entitas Billing/Commission ditunda agar ERD Fase 1 tetap ramping. Diusulkan skema (Fase 2, bukan sekarang):
  ```
  Commission {
    id          String   @id @default(uuid())
    agentId     String   // FK -> USER
    leadId      String   // FK -> Lead (lihat 03_LEADS.md)
    amount      Decimal  @db.Decimal(12,2)
    status      CommissionStatus // PENDING | PAID
    paidAt      DateTime?
    createdAt   DateTime @default(now())
  }
  ```
- Halaman ini bergantung pada `Lead` (untuk tahu transaksi mana yang closing) dan skema `Commission` di atas — dua lapis gap, bukan satu.
- Sampai tersedia, halaman merender `EmptyState` eksplisit: "Modul Komisi dijadwalkan aktif Fase 2 bersamaan dengan peluncuran Partner Agent SaaS."

## 5. API Endpoints Referenced
- Tidak ada di `52_ENDPOINT_CATALOGUE.md` — diusulkan `GET /api/v1/agents/me/commissions` menunggu skema §4.

## 6. Acceptance Criteria (DoD)
- [ ] Halaman secara eksplisit menyatakan status "Fase 2" di UI (bukan generic empty state) — konsisten dengan pola `06_owner_dashboard/10_BILLING.md`.
- [ ] Tidak ada angka komisi dummy/statis di kode.
- [ ] Nominal Rupiah memakai format `26_CONTENT_DESIGN_SPECIFICATION.md` (`Rp 2.500.000` — titik ribuan) begitu data tersedia.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Wallet` | Metric Card total komisi | 24px |
| `Clock` | Badge status `PENDING` | 16px |
| `CheckCircle2` | Badge status `PAID` | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.4 Partner Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

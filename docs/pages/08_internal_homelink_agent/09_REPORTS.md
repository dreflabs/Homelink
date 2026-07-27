# REPORTS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Reports (Laporan Kinerja Gabungan)
**Module:** 08 INTERNAL HOMELINK AGENT
**Role:** Internal HomeLink Agent
**Purpose:** Laporan berkala yang menggabungkan tiga sisi pekerjaan Internal Agent — throughput verifikasi, konversi lead, dan volume eskalasi dukungan — untuk evaluasi periodik (bulanan), berbeda dari `07_ANALYTICS.md` yang berorientasi tren visual harian/mingguan.

## 2. Next.js Routing Path
```text
app/(dashboard)/internal-agent/reports/page.tsx
```
Sidebar label: "Laporan".

## 3. Required UI Components (Shadcn/ui)
- `Metric Card` ×3 — properti diverifikasi bulan ini, lead dikonversi, tiket dieskalasi selesai.
- `Analytics Card` — tren 3 metrik di atas selama periode terpilih.
- `Select` — rentang waktu.

## 4. Data & State Management
- **Sebagian sudah real:** properti diverifikasi bulan ini dihitung dari `VERIFICATION_AUDIT` (ada di ERD).
- **Sebagian bergantung gap:** lead dikonversi bergantung `Lead` (`02_LEAD_MANAGEMENT.md`); tiket dieskalasi selesai dihitung dari `AUDIT_LOG` action `SUPPORT_TICKET_ESCALATED`/`SUPPORT_TICKET_RESOLVED` (lihat `05_CUSTOMER_SUPPORT.md`) — sudah bisa diimplementasikan begitu action-type tersebut tercatat konsisten.
- Halaman ini tidak memperkenalkan entity/endpoint baru — murni agregasi tiga sumber yang statusnya berbeda-beda, masing-masing sudah dicatat di halaman gap terkait.

## 5. API Endpoints Referenced
- Tidak ada endpoint laporan khusus — dihitung dari `VERIFICATION_AUDIT`, `Lead` (menunggu skema), dan `AUDIT_LOG`.

## 6. Acceptance Criteria (DoD)
- [ ] Metrik yang datanya sudah tersedia (verifikasi, eskalasi selesai) ditampilkan real, tidak menunggu metrik lead yang masih gap.
- [ ] Metrik lead ditampilkan dengan penanda status terpisah ("menunggu backend Lead"), bukan angka 0 yang menyesatkan seolah performa nol.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `ShieldCheck` | Metric Card verifikasi selesai | 20px |
| `TrendingUp` | Metric Card lead dikonversi | 20px |
| `Headset` | Metric Card tiket dieskalasi selesai | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.5 Internal Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

# DASHBOARD PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Dashboard (Ringkasan)
**Module:** 07 PARTNER AGENT DASHBOARD
**Role:** Partner Agent (B2B — Tier 3 SaaS, `13_PRODUCT_ROADMAP.md` §8.3 Fase 2)
**Purpose:** Landing page bagi Partner Agent setelah login — menjawab satu pertanyaan utama: "lead mana yang butuh tindak lanjut saya sekarang?" Menyajikan Hero dinamis berisi lead paling mendesak (menunggu &gt;24 jam), pratinjau pipeline leads, ringkasan komisi bulan berjalan, dan agenda hari ini — sesuai keputusan Layout Blueprint di `27_DASHBOARD_DESIGN_GUIDELINES.md` §8.4.

## 2. Next.js Routing Path
```text
app/(dashboard)/partner-agent/page.tsx
```
Sidebar label: "Ringkasan". Mengikuti konvensi slug peran (`partner-agent`), bukan prefix nomor modul — selaras dengan `06_owner_dashboard`/`09_surveyor`.

## 3. Required UI Components (Shadcn/ui)
- `Insight Card` (`17_COMPONENT_LIBRARY.md` §8.4) — Hero: "3 leads menunggu tindak lanjut &gt;24 jam" dengan CTA "Lihat Pipeline".
- `Action Card` ×3 — pratinjau 3 lead teratas dari pipeline (nama, properti diminati, lama menunggu, Badge tahap).
- `Metric Card` — total komisi bulan berjalan (estimasi, lihat gap §4).
- Timeline Card ringkas — 2 agenda terdekat (survei/meeting).
- `Skeleton` — loading state Hero dan Action Card.
- `EmptyState` — jika belum ada lead sama sekali (agent baru).

## 4. Data & State Management
- **Hero (prioritas resolusi, tanpa entity baru):** lead dengan `lastContactedAt` &gt;24 jam yang lalu dan status belum `CLOSED` — **Gap skema:** tidak ada entity `Lead` di `40_ERD.md`. Halaman ini memerlukan `Lead` (fields: `id, agentId, propertyId?, buyerName, buyerContact, stage, lastContactedAt, createdAt`) sebelum dapat diimplementasikan — lihat proposal skema lengkap di `03_LEADS.md`.
- **Agenda terdekat:** dapat memakai `BOOKING` (yang sudah ada di ERD) untuk jadwal survei terkait properti yang dikelola agent, tapi meeting non-survei (mis. bertemu klien) tidak punya entity — lihat gap di `06_CALENDAR.md`.
- **Komisi bulan berjalan:** **Gap skema** — tidak ada entity `Commission` di ERD (sengaja ditunda per roadmap Fase 2, terikat monetisasi Tier-3 SaaS). Lihat proposal di `05_COMMISSION.md`.
- Sampai entity di atas tersedia, seluruh Hero/Action Card/Metric Card di halaman ini dirender dalam `EmptyState`/nilai `0`, bukan data statis palsu.

## 5. API Endpoints Referenced
- `GET /api/v1/bookings` — sudah ada, dipakai untuk agenda survei terkait properti yang dikelola agent (setelah relasi Agent↔Property tersedia, lihat `02_PROPERTY_MANAGEMENT.md`).
- Belum ada endpoint untuk Lead/Commission — diusulkan (`GET /api/v1/agents/me/leads?limit=3`, `GET /api/v1/agents/me/commission/summary`) menunggu skema di atas, dicatat sebagai gap, bukan diasumsikan ada.

## 6. Acceptance Criteria (DoD)
- [ ] Hero menampilkan tepat satu lead paling mendesak (aturan §4), atau `EmptyState` jika tidak ada lead sama sekali.
- [ ] Seluruh kartu yang bergantung pada `Lead`/`Commission` merender `EmptyState`/`0`, tidak error 500, sampai backend tersedia.
- [ ] Tidak ada data lead/komisi statis/dummy yang di-hardcode di komponen.
- [ ] Lolos audit Lighthouse Accessibility &gt; 90.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Flame` | Hero — menandakan lead mendesak/prioritas tinggi | 20px |
| `Users` | Pratinjau pipeline leads | 20px |
| `Wallet` | Metric Card komisi bulan berjalan | 20px |
| `CalendarClock` | Timeline agenda terdekat | 20px |
| `ChevronRight` | Tautan "Lihat Pipeline"/"Lihat Semua" | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.4 Partner Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

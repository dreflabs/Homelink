# DASHBOARD PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Dashboard (Ringkasan)
**Module:** 08 INTERNAL HOMELINK AGENT
**Role:** Internal HomeLink Agent (dual mandate: Sales & Verification/Support, `13_PRODUCT_ROADMAP.md` §8.3 Fase 2)
**Purpose:** Landing page yang menjawab prioritas tertinggi seorang Internal Agent: item verifikasi mana yang paling lama menunggu (aging tertua) sebelum melihat lead atau tiket dukungan — sesuai Information Hierarchy di `27_DASHBOARD_DESIGN_GUIDELINES.md` §8.5 (verifikasi aging tertua &gt; leads aktif &gt; tiket dukungan &gt; komisi/analitik).

## 2. Next.js Routing Path
```text
app/(dashboard)/internal-agent/page.tsx
```
Sidebar label: "Ringkasan", ditempatkan di luar dua grup nav ("Sales" dan "Verifikasi & Dukungan") per `27` §8.5.

## 3. Required UI Components (Shadcn/ui)
- Queue row (Table, `17_COMPONENT_LIBRARY.md` §8.3) — item verifikasi properti tertua yang belum diputuskan, diambil dari `VERIFICATION_AUDIT` (entity yang sudah ada di `40_ERD.md`).
- `Action Card` — pratinjau lead aktif teratas (lihat gap §4).
- `Metric Card` — jumlah tiket dukungan Tier 2 yang eskalasi ke agent ini.
- `EmptyState` — jika antrian verifikasi kosong (nada positif, per `27` §8.5: "Semua verifikasi selesai — kerja bagus.").

## 4. Data & State Management
- **Antrian verifikasi (sudah bisa diimplementasikan hari ini):** `VERIFICATION_AUDIT` sudah ada di ERD — dapat langsung dipakai untuk menghitung usia antrian (selisih `createdAt` properti berstatus `PENDING` terhadap waktu sekarang), mengikuti pola SLA 12h/20h/24h yang sudah terbukti di `11_admin/05_VERIFICATION_QUEUE.md`. Halaman ini **berbagi logika SLA yang sama**, bukan duplikat aturan.
- **Lead aktif — Gap skema:** bergantung pada entity `Lead` yang belum ada, sama seperti `07_partner_agent_dashboard/03_LEADS.md`. Perbedaan penting: Lead yang ditangani Internal Agent berasal dari kontak langsung ke HomeLink (bukan referal Partner Agent) — keputusan produk yang masih terbuka adalah bagaimana `Lead.agentId`/`leadSource` membedakan kedua jalur ini pada satu entity yang sama, bukan dua tabel terpisah.
- **Tiket dukungan:** per `90_CUSTOMER_SUPPORT_SOP.md`, data tiket sesungguhnya hidup di alat eksternal (Zendesk/Crisp), bukan tabel Prisma — lihat `05_CUSTOMER_SUPPORT.md` untuk detail.
- Sampai `Lead` tersedia, kartu leads dirender `EmptyState`; antrian verifikasi tetap berfungsi penuh karena `VERIFICATION_AUDIT` sudah ada.

## 5. API Endpoints Referenced
- Query atas `PROPERTY`/`VERIFICATION_AUDIT` — sudah ada (pola sama dengan `11_admin/05_VERIFICATION_QUEUE.md`).
- `GET /api/v1/agents/me/leads` — diusulkan, menunggu skema `Lead` (lihat `02_LEAD_MANAGEMENT.md`).

## 6. Acceptance Criteria (DoD)
- [ ] Antrian verifikasi tertua tampil sebagai elemen dengan urgensi visual tertinggi di halaman (lebih menonjol dari metrik lain), sesuai `27` §8.5.
- [ ] Kartu leads merender `EmptyState`, bukan error, selama backend `Lead` belum tersedia.
- [ ] Warna usia antrian eskalasi `text.muted → Warning → Danger` (bukan warna acak), konsisten dengan pola SLA Admin.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `ShieldAlert` | Antrian verifikasi tertua (Hero) | 20px |
| `Users` | Pratinjau leads aktif | 20px |
| `Headset` | Metrik tiket dukungan eskalasi | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.5 Internal Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

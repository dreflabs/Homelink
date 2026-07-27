# CUSTOMER SUPPORT PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Customer Support (Eskalasi Dukungan)
**Module:** 08 INTERNAL HOMELINK AGENT
**Role:** Internal HomeLink Agent
**Purpose:** Menangani tiket dukungan Tier 2 (kasus kritis: dugaan penipuan, sengketa properti, bug yang menghalangi transaksi) yang dieskalasi dari Tier 1, sesuai `90_CUSTOMER_SUPPORT_SOP.md`. **Penting:** data tiket sesungguhnya hidup di alat pihak ketiga (Zendesk/Crisp per SOP), bukan di database HomeLink — halaman ini adalah panel eskalasi/ringkasan, bukan sistem tiket sendiri.

## 2. Next.js Routing Path
```text
app/(dashboard)/internal-agent/support/page.tsx
```
Sidebar label: "Dukungan Pelanggan", di bawah grup nav "Verifikasi & Dukungan".

## 3. Required UI Components (Shadcn/ui)
- `Table` — daftar tiket Tier 2 yang dieskalasi ke agent ini (ringkasan: kategori, pelanggan, waktu eskalasi).
- Tautan eksternal — membuka tiket detail langsung di Zendesk/Crisp (tab baru), bukan merender ulang isi tiket di HomeLink.
- `EmptyState` — tidak ada eskalasi aktif.

## 4. Data & State Management
- **Sengaja tidak membangun entity `Ticket`** — ini bukan gap, ini keputusan arsitektur yang benar dan sudah tercatat di `90_CUSTOMER_SUPPORT_SOP.md` (tiket dikelola alat eksternal). Yang perlu dicatat di HomeLink hanyalah **penanda eskalasi** — event ringan di `AUDIT_LOG` (action `SUPPORT_TICKET_ESCALATED`, `notes` berisi ID tiket eksternal) agar Internal Agent tahu tiket mana yang perlu perhatian, tanpa mendupliksi data tiket itu sendiri.
- **Server State:** `GET /api/v1/audit-logs?action=SUPPORT_TICKET_ESCALATED&assignedTo=me` — memerlukan `AUDIT_LOG` yang sudah ada, hanya perlu memastikan action-type ini tercatat oleh integrasi Zendesk/Crisp webhook (lihat `57_WEBHOOK_SPECIFICATION.md`).

## 5. API Endpoints Referenced
- `GET /api/v1/audit-logs` — perlu diperluas dengan filter `action`/`assignedTo`, belum eksplisit ada di `52_ENDPOINT_CATALOGUE.md` — gap kecil, bukan gap skema besar (tabel `AUDIT_LOG` sudah ada).

## 6. Acceptance Criteria (DoD)
- [ ] Halaman TIDAK mencoba merender ulang isi percakapan tiket — hanya ringkasan + tautan keluar ke alat eksternal.
- [ ] Setiap baris tiket eskalasi memiliki jejak `AUDIT_LOG` yang dapat diaudit.
- [ ] Nada bahasa mengikuti `90_CUSTOMER_SUPPORT_SOP.md` (empatik, profesional, tanpa slang) jika ada teks ringkasan ditampilkan.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Headset` | Header halaman | 20px |
| `ExternalLink` | Tautan buka tiket di alat eksternal | 16px |
| `AlertTriangle` | Penanda tiket kritis (dugaan penipuan/sengketa) | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.5 Internal Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

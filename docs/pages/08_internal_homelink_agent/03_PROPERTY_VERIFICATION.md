# PROPERTY VERIFICATION PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Property Verification (Antrian Verifikasi Properti)
**Module:** 08 INTERNAL HOMELINK AGENT
**Role:** Internal HomeLink Agent
**Purpose:** Meninjau laporan survei (foto/video/checklist dari Surveyor) dan dokumen legal properti sebelum keputusan akhir — first-pass review Internal Agent, sebelum eskalasi ke Admin untuk persetujuan final `FULLY_VERIFIED`. Ini adalah halaman paling kritis di modul ini, sesuai `27_DASHBOARD_DESIGN_GUIDELINES.md` §8.5 Information Hierarchy prioritas #1.

## 2. Next.js Routing Path
```text
app/(dashboard)/internal-agent/verification/properties/page.tsx
```
Sidebar label: "Verifikasi Properti", di bawah grup nav "Verifikasi & Dukungan".

## 3. Required UI Components (Shadcn/ui)
- `Table` (Queue, `17_COMPONENT_LIBRARY.md` §8.3) — diurutkan tertua dulu, kolom: properti, Surveyor penanggung jawab, usia antrian, `Badge` status.
- `Timeline Card` — riwayat `VERIFICATION_AUDIT` per properti saat baris dibuka.
- `Button` (Approve/Reject) — selalu terlihat, tidak disembunyikan di dropdown (`27` §8.5 Do: "Approve/Reject harus selalu visible, tidak boleh di menu 'Actions' generik").

## 4. Data & State Management
- **Sudah bisa diimplementasikan penuh:** `VERIFICATION_AUDIT` (fields `action`, `notes`, `surveyorId`) dan `PROPERTY.status` sudah ada di `40_ERD.md` — tidak ada gap skema untuk fungsi inti halaman ini.
- **Logika SLA dibagi dengan Admin:** ambang waktu 12h/20h/24h yang sudah didefinisikan di `11_admin/05_VERIFICATION_QUEUE.md` dipakai identik di sini — Internal Agent dan Admin melihat antrian yang **sama**, hanya beda level wewenang keputusan (Internal Agent: rekomendasi first-pass; Admin: keputusan final `FULLY_VERIFIED`). Ini harus diimplementasikan sebagai satu query/service yang dipakai kedua halaman, bukan duplikasi logika.
- **Local State:** filter Surveyor/rentang usia disimpan di URL search params.

## 5. API Endpoints Referenced
- `GET /api/v1/properties?status=PENDING&sort=createdAt` — sudah ada.
- `PATCH /api/v1/properties/:id/status` — sudah ada, Admin-only per `56_AUTHORIZATION_MATRIX.md`; Internal Agent memakai endpoint terpisah untuk menandai rekomendasi (`PATCH /api/v1/properties/:id/recommend` — **belum ada di `52_ENDPOINT_CATALOGUE.md`**, diusulkan, karena saat ini hanya Admin yang punya endpoint status-change).

## 6. Acceptance Criteria (DoD)
- [ ] Antrian terurut tertua-dulu secara default, tidak bisa diubah ke termuda-dulu tanpa alasan eksplisit (usia adalah sinyal utama urgensi).
- [ ] Tombol Approve/Reject selalu terlihat langsung di baris, bukan di belakang menu dropdown.
- [ ] Baris yang diputuskan (approve/reject) collapse keluar dari daftar dengan animasi Fast tier (`27` §8.5 Motion Behaviour), bukan hilang instan.
- [ ] Internal Agent tidak dapat mengubah `PROPERTY.status` langsung (hanya rekomendasi) — BOLA/wewenang test wajib lolos.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `ShieldAlert` | Header halaman/antrian | 20px |
| `CheckCircle2` | Tombol Approve (rekomendasi) | 20px |
| `XCircle` | Tombol Reject | 20px |
| `Clock` | Indikator usia antrian per baris | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.5 Internal Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

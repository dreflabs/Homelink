# INTEGRATIONS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Integrations
**Module:** 12 SUPER ADMIN
**Role:** Super Admin
**Purpose:** Menampilkan status koneksi integrasi pihak ketiga yang dipakai platform — Cloudflare R2, WhatsApp/SMS gateway (OTP), OAuth Google/Apple, dan (Fase 4) Payment Gateway.

## 2. Next.js Routing Path
```text
app/(dashboard)/super-admin/integrations/page.tsx
```
Sidebar label: "Integrations", di bawah grup nav "Security & Infra".

## 3. Required UI Components (Shadcn/ui)
- `Table` — nama integrasi, status (terhubung/gagal), terakhir dicek.
- `Badge` — status per integrasi.

## 4. Data & State Management
- **Gap skema kecil:** Tidak ada entity `Integration`/`IntegrationStatus` di `40_ERD.md` — status integrasi saat ini hanya tersirat dari konfigurasi `.env` (`73_ENVIRONMENT_STRATEGY.md`) dan dokumen arsitektur (`57_WEBHOOK_SPECIFICATION.md` untuk Payment Gateway Fase 4), bukan tabel yang dapat di-query.
- **Yang bisa ditampilkan hari ini tanpa entity baru:** status "terhubung/tidak" dapat dihitung dari health-check sederhana per integrasi (mis. ping ke Cloudflare R2, cek respons OAuth provider) yang dijalankan on-demand saat halaman dibuka — tidak perlu tabel penyimpanan status historis untuk versi pertama.
- Payment Gateway ditampilkan sebagai "Belum Aktif (Fase 4)" secara eksplisit, bukan dihilangkan dari daftar atau ditampilkan seolah gagal terhubung.

## 5. API Endpoints Referenced
- Belum ada di `52_ENDPOINT_CATALOGUE.md` — diusulkan `GET /api/v1/admin/integrations/status` yang menjalankan health-check ringan per integrasi secara on-demand.

## 6. Acceptance Criteria (DoD)
- [ ] Integrasi Fase 4 (Payment Gateway) ditandai jelas sebagai belum aktif, dibedakan secara visual dari integrasi Fase 1 yang gagal terhubung (dua kondisi berbeda: "belum waktunya" vs "seharusnya jalan tapi error").
- [ ] Health-check tidak dijalankan otomatis berulang (polling agresif) — hanya saat halaman dibuka atau tombol "Cek Ulang" ditekan, agar tidak membebani rate-limit provider eksternal.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Plug` | Header halaman | 20px |
| `CheckCircle2` | Status terhubung | 16px |
| `XCircle` | Status gagal terhubung | 16px |
| `Clock` | Status belum aktif (Fase 4) | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.9 Super Admin Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

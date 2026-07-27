# DASHBOARD PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Dashboard (Ringkasan)
**Module:** 12 SUPER ADMIN
**Role:** Super Admin (`13_PRODUCT_ROADMAP.md` §8.3 Fase 3 — tenant management/feature flags dianggap tidak diperlukan pada skala Fase 1-2)
**Purpose:** Landing page yang menjawab satu pertanyaan: "apakah seluruh platform sehat sekarang?" — Hero System Health harus menjadi sinyal paling tidak mungkin terlewat di halaman, sesuai `27_DASHBOARD_DESIGN_GUIDELINES.md` §8.9.

## 2. Next.js Routing Path
```text
app/(dashboard)/super-admin/page.tsx
```
Sidebar label: "Ringkasan", di luar tiga grup nav ("Platform", "Operations", "Security & Infra") per `27` §8.9.

## 3. Required UI Components (Shadcn/ui)
- `Hero Card` (`17_COMPONENT_LIBRARY.md` §8.4) — ringkasan System Health berkode warna (hijau semua = tenang, satu layanan degraded = elemen paling menonjol di halaman, warna Danger).
- `Metric Card` — metrik teknis lintas platform (kedalaman antrian, koneksi database, volume permintaan AI).
- Timeline Card ringkas — Audit Log terbaru, selalu tampil ringkas terlepas dari section aktif (`27` §8.9 Secondary Grid).

## 4. Data & State Management
- **Gap fondasional yang berlaku luas di modul ini:** monitoring aplikasi (Sentry/PM2 Plus/UptimeRobot) yang menjadi sumber data System Health **secara eksplisit belum diimplementasikan** — `74_MONITORING.md` sendiri menandai integrasi ini berstatus `PLANNED`, bukan live, dengan kriteria akseptansi yang belum tercentang. Hero halaman ini bergantung penuh pada integrasi tersebut.
- **Sudah bisa diimplementasikan hari ini:** ringkasan Audit Log terbaru — `AUDIT_LOG` sudah ada di `40_ERD.md`, lihat `06_AUDIT_LOG.md`.
- Sampai monitoring live tersedia, Hero System Health merender status "Belum terhubung ke sistem monitoring" secara eksplisit — bukan status hijau palsu yang menyiratkan semua baik-baik saja padahal datanya tidak nyata.

## 5. API Endpoints Referenced
- Tidak ada endpoint health-check terpusat di `52_ENDPOINT_CATALOGUE.md` — `GET /api/health` disebut di `74_MONITORING.md` untuk keperluan polling UptimeRobot eksternal, bukan untuk dikonsumsi UI ini secara langsung. Endpoint agregasi status untuk dashboard ini sendiri belum ada, dicatat sebagai gap.

## 6. Acceptance Criteria (DoD)
- [ ] Hero TIDAK PERNAH menampilkan status "Sehat" tanpa sumber data nyata di baliknya — jika monitoring belum terhubung, tampilkan status itu apa adanya.
- [ ] Kegagalan salah satu monitor (mis. Database Monitor tidak bisa dihubungi) diperlakukan sebagai sinyal Danger di Hero System Health, bukan retry diam-diam (`27` §8.9 Error State).

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Activity` | Hero System Health | 20px |
| `Server` | Metric Card metrik teknis | 20px |
| `History` | Timeline Audit Log ringkas | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.9 Super Admin Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

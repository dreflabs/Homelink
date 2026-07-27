# SYSTEM HEALTH PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** System Health
**Module:** 12 SUPER ADMIN
**Role:** Super Admin
**Purpose:** Tampilan detail status kesehatan infrastruktur (VPS, PM2 process, uptime) — sumber data untuk Hero di `01_DASHBOARD.md`.

## 2. Next.js Routing Path
```text
app/(dashboard)/super-admin/system-health/page.tsx
```
Sidebar label: "System Health", di bawah grup nav "Operations".

## 3. Required UI Components (Shadcn/ui)
- `Metric Card` — uptime, CPU/memori PM2, cache-hit ratio Cloudflare.
- `Timeline Card` — riwayat insiden (integrasi dengan `91_INCIDENT_SOP.md`).

## 4. Data & State Management
- **Gap infrastruktur (bukan gap skema aplikasi):** Data kesehatan sistem (Sentry error tracking, PM2 Plus, UptimeRobot polling `GET /api/health`) adalah **layanan monitoring eksternal**, bukan entity di `40_ERD.md` — ini disengaja secara arsitektur (monitoring infra tidak seharusnya jadi tabel aplikasi), tapi `74_MONITORING.md` sendiri menandai integrasi Sentry sebagai **`PLANNED`, belum live** di produksi. Halaman ini tidak dapat menampilkan data nyata sampai integrasi tersebut selesai.
- Sampai integrasi live, halaman merender pesan eksplisit "Belum terhubung ke Sentry/UptimeRobot — lihat `74_MONITORING.md`", bukan Metric Card dengan angka `0`/kosong yang menyiratkan sistem benar-benar down.

## 5. API Endpoints Referenced
- `GET /api/health` — sudah disebut di `74_MONITORING.md` untuk keperluan UptimeRobot; endpoint agregasi untuk UI Super Admin sendiri (mengembalikan status semua layanan sekaligus) belum ada, diusulkan.

## 6. Acceptance Criteria (DoD)
- [ ] Halaman secara eksplisit membedakan "sistem sehat" dari "belum terhubung ke monitoring" — dua kondisi visual yang berbeda, bukan disamakan.
- [ ] Nilai metrik yang gagal diperbarui (bukan sekadar kosong) menampilkan nilai terakhir yang diketahui dengan opacity redup (`27` §8.9 Loading State), bukan menghilang.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Activity` | Header halaman | 20px |
| `Cpu` | Metric Card CPU/memori | 20px |
| `Cloud` | Metric Card cache-hit Cloudflare | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.9 Super Admin Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

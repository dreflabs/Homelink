# DATABASE MONITOR PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Database Monitor
**Module:** 12 SUPER ADMIN
**Role:** Super Admin
**Purpose:** Memantau kesehatan PostgreSQL — penggunaan connection pool, query lambat, ukuran tabel — untuk mendeteksi masalah performa sebelum berdampak ke pengguna.

## 2. Next.js Routing Path
```text
app/(dashboard)/super-admin/database-monitor/page.tsx
```
Sidebar label: "Database Monitor", di bawah grup nav "Operations".

## 3. Required UI Components (Shadcn/ui)
- `Metric Card` — jumlah koneksi aktif, ukuran database, query terlambat (&gt;1s).
- `Table` — daftar query lambat terbaru (jika tersedia dari `pg_stat_statements`).

## 4. Data & State Management
- **Bukan entity aplikasi — data infrastruktur Postgres native:** metrik ini berasal dari `pg_stat_activity`/`pg_stat_statements` (fitur bawaan PostgreSQL) atau layanan monitoring pihak ketiga, bukan tabel di `40_ERD.md`. Sama seperti `07_SYSTEM_HEALTH.md`, ini bukan gap skema tapi ketergantungan pada integrasi monitoring yang statusnya `PLANNED` per `74_MONITORING.md`.
- Query lambat spesifik memerlukan ekstensi `pg_stat_statements` diaktifkan di produksi — perlu dikonfirmasi ke tim DevOps apakah sudah aktif (`45_INDEX_STRATEGY.md` tidak menyebutkan status ekstensi ini secara eksplisit).

## 5. API Endpoints Referenced
- Tidak ada endpoint aplikasi — data diambil langsung dari koneksi observability Postgres (di luar `52_ENDPOINT_CATALOGUE.md`), kemungkinan via endpoint admin internal terpisah yang perlu didefinisikan.

## 6. Acceptance Criteria (DoD)
- [ ] Halaman menyatakan dengan jelas jika `pg_stat_statements` belum aktif, alih-alih menampilkan tabel query lambat kosong yang menyesatkan.
- [ ] Metrik koneksi aktif tidak pernah menampilkan angka tanpa timestamp "terakhir diperbarui" — kesehatan database adalah data yang cepat basi.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Database` | Header halaman | 20px |
| `Gauge` | Metric Card connection pool | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.9 Super Admin Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

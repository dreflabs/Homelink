# SECURITY PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Security
**Module:** 12 SUPER ADMIN
**Role:** Super Admin
**Purpose:** Ringkasan postur keamanan platform — hasil scan kerentanan (Dependabot/Snyk), status SSL, dan aktivitas login mencurigakan (percobaan brute-force yang di-rate-limit).

## 2. Next.js Routing Path
```text
app/(dashboard)/super-admin/security/page.tsx
```
Sidebar label: "Security", di bawah grup nav "Security & Infra".

## 3. Required UI Components (Shadcn/ui)
- `Metric Card` — jumlah kerentanan Critical/High terbuka (per `69_VULNERABILITY_MANAGEMENT.md`).
- `Table` — daftar IP yang terkena rate-limit login 24 jam terakhir (`58_RATE_LIMIT_SPECIFICATION.md`).
- `Timeline Card` — riwayat insiden keamanan (`68_INCIDENT_RESPONSE.md`).

## 4. Data & State Management
- **Sebagian besar bersumber dari alat eksternal, bukan entity aplikasi:** hasil scan Dependabot/Snyk hidup di GitHub/Snyk dashboard (`69_VULNERABILITY_MANAGEMENT.md`), bukan tabel HomeLink — halaman ini mengagregasi via API GitHub/Snyk atau menampilkan tautan keluar, sama prinsipnya dengan pola Customer Support di `08_internal_homelink_agent/05_CUSTOMER_SUPPORT.md` (tidak mendulikasi data eksternal ke database sendiri).
- **Rate-limit login** dapat diambil dari log Nginx/aplikasi (`75_LOGGING.md`) — tidak ada tabel `LoginAttempt` di ERD; jika observability granular diperlukan, ini gap yang sama jenisnya dengan `10_AI_MONITOR.md` (perlu keputusan logging vs tabel database).

## 5. API Endpoints Referenced
- Tidak ada endpoint HomeLink native untuk data scan kerentanan — integrasi API GitHub/Snyk (di luar `52_ENDPOINT_CATALOGUE.md`).
- Rate-limit login: agregasi dari log, bukan endpoint CRUD baru.

## 6. Acceptance Criteria (DoD)
- [ ] Halaman tidak mendulikasi data kerentanan ke tabel HomeLink sendiri — tautan/embed ke alat eksternal, konsisten dengan prinsip "jangan buat tabel untuk data yang sudah hidup di alat lain."
- [ ] Kerentanan Critical yang terbuka &gt;24 jam (melanggar SLA patch di `69_VULNERABILITY_MANAGEMENT.md`) ditandai warna Danger, bukan warna netral.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `ShieldAlert` | Header halaman | 20px |
| `Bug` | Metric Card kerentanan terbuka | 20px |
| `Ban` | Tabel IP terkena rate-limit | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.9 Super Admin Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

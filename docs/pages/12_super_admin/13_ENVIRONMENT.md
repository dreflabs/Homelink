# ENVIRONMENT PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Environment
**Module:** 12 SUPER ADMIN
**Role:** Super Admin
**Purpose:** Menampilkan konfigurasi environment aktif (LOCAL/STAGING/PRODUCTION per `73_ENVIRONMENT_STRATEGY.md`) — nama variabel dan status terisi/kosong, **tanpa pernah menampilkan nilai rahasia**.

## 2. Next.js Routing Path
```text
app/(dashboard)/super-admin/environment/page.tsx
```
Sidebar label: "Environment", di bawah grup nav "Security & Infra".

## 3. Required UI Components (Shadcn/ui)
- `Table` — nama variabel env, status (terisi/kosong), tier (Local/Staging/Production).
- Banner peringatan — mengingatkan bahwa nilai rahasia tidak pernah ditampilkan di UI.

## 4. Data & State Management
- **Bukan gap skema — ini batasan keamanan yang disengaja:** menampilkan nilai `.env` di UI, bahkan untuk Super Admin, melanggar `48_DATABASE_SECURITY.md`/`65_DATA_PROTECTION.md` (prinsip least-privilege dan larangan mengekspos rahasia). Halaman ini secara desain hanya menampilkan **nama variabel dan status terisi/kosong** (mis. `DATABASE_URL: ✓ Terisi`), tidak pernah nilainya — ini bukan keterbatasan implementasi yang perlu "diperbaiki," tapi kontrol keamanan yang harus dipertahankan.
- **Server State:** dibaca dari `process.env` di server, difilter untuk hanya mengembalikan nama key + boolean `isSet`, tidak pernah nilai aslinya keluar dari server.

## 5. API Endpoints Referenced
- Belum ada di `52_ENDPOINT_CATALOGUE.md` — diusulkan `GET /api/v1/admin/environment/status` yang secara eksplisit hanya mengembalikan `{ key, isSet, tier }[]`, tidak pernah `value`.

## 6. Acceptance Criteria (DoD)
- [ ] Tidak ada jalur kode apa pun (termasuk devtools/log) yang mengekspos nilai variabel env ke response API atau client.
- [ ] Halaman menyatakan dengan jelas bahwa ini adalah batasan keamanan permanen, bukan fitur yang "belum lengkap".

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Settings2` | Header halaman | 20px |
| `Lock` | Banner peringatan nilai rahasia | 16px |
| `CheckCircle2` | Status variabel terisi | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.9 Super Admin Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

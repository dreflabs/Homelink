# ROLES PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Roles
**Module:** 12 SUPER ADMIN
**Role:** Super Admin
**Purpose:** Mengelola daftar peran yang ada di platform — dimaksudkan agar Super Admin dapat melihat/menyesuaikan peran tanpa deploy kode baru. Saat ini sistem otorisasi HomeLink berbasis enum tetap (`USER.role` di `40_ERD.md`) yang dikodekan di aplikasi, bukan tabel `Role` dinamis di database.

## 2. Next.js Routing Path
```text
app/(dashboard)/super-admin/roles/page.tsx
```
Sidebar label: "Roles", di bawah grup nav "Platform".

## 3. Required UI Components (Shadcn/ui)
- `Table` — daftar peran (read-only untuk saat ini): nama, jumlah pengguna per peran.
- `EmptyState`/banner info menjelaskan status read-only.

## 4. Data & State Management
- **Keputusan arsitektur terbuka:** Roles saat ini adalah `enum` tetap di skema Prisma (`USER.role`), bukan tabel `Role` yang bisa diedit dari UI. Membuat halaman ini benar-benar dinamis (tambah/hapus peran dari UI) memerlukan migrasi arsitektur dari enum ke RBAC dinamis (`Role`/`RolePermission` tables) — perubahan besar yang memengaruhi `55_AUTHENTICATION_FLOW.md`, `56_AUTHORIZATION_MATRIX.md`, dan setiap pemeriksaan `requireRole()` di kode. Ini keputusan Product/Backend Architecture, bukan sesuatu yang diputuskan dari dokumentasi halaman ini.
- **Yang bisa ditampilkan hari ini:** daftar nilai enum yang ada (`GUEST, BUYER, OWNER, ADMIN, SURVEYOR` — plus role yang direncanakan Fase 2/3 seperti `PARTNER_AGENT`, `PHOTOGRAPHER`, `SUPER_ADMIN` begitu ditambahkan ke enum) beserta jumlah pengguna per peran, secara read-only.

## 5. API Endpoints Referenced
- `GET /api/v1/users?groupBy=role` (agregasi) — belum ada di `52_ENDPOINT_CATALOGUE.md`, diusulkan sebagai query read-only sederhana, tidak memerlukan tabel `Role` baru.

## 6. Acceptance Criteria (DoD)
- [ ] Halaman jelas menyatakan statusnya read-only dan alasannya (arsitektur enum, bukan RBAC dinamis) — tidak menampilkan tombol "Tambah Role" yang tidak berfungsi.
- [ ] Jumlah pengguna per peran dihitung dari `USER` yang sudah ada, bukan data dummy.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `ShieldCheck` | Header halaman | 20px |
| `Users` | Kolom jumlah pengguna per peran | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.9 Super Admin Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

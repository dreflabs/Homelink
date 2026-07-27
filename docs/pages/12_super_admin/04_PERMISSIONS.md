# PERMISSIONS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Permissions
**Module:** 12 SUPER ADMIN
**Role:** Super Admin
**Purpose:** Menampilkan matriks izin per peran (aksi mana yang boleh dilakukan peran mana) — cerminan visual dari `56_AUTHORIZATION_MATRIX.md`, bukan sistem izin baru.

## 2. Next.js Routing Path
```text
app/(dashboard)/super-admin/permissions/page.tsx
```
Sidebar label: "Permissions", di bawah grup nav "Platform".

## 3. Required UI Components (Shadcn/ui)
- `Table` — baris = peran, kolom = aksi/endpoint, sel = izin (read-only).
- Banner info — menjelaskan bahwa izin dikodekan di `requireRole()` middleware, bukan dikonfigurasi dari sini.

## 4. Data & State Management
- **Sama akar keputusan arsitektur dengan `03_ROLES.md`:** izin saat ini dikodekan langsung di kode (`requireRole([...])` per endpoint), bersumber dari `56_AUTHORIZATION_MATRIX.md` sebagai dokumen, bukan tabel `Permission` yang dapat diubah dari UI. Membuat halaman ini fungsional-tulis memerlukan migrasi ke RBAC dinamis yang sama seperti dibahas di `03_ROLES.md` — tidak diduplikasi keputusannya di sini.
- **Yang bisa ditampilkan hari ini:** rendering read-only dari isi `56_AUTHORIZATION_MATRIX.md` (dapat di-generate dari dokumen tersebut saat build, bukan query database).

## 5. API Endpoints Referenced
- Tidak ada — konten diambil dari dokumen `56_AUTHORIZATION_MATRIX.md` secara statis, bukan dari database.

## 6. Acceptance Criteria (DoD)
- [ ] Halaman ini secara eksplisit read-only, tidak menyertakan kontrol edit yang tidak berfungsi.
- [ ] Matriks yang ditampilkan identik dengan `56_AUTHORIZATION_MATRIX.md` — tidak ada drift antara dokumentasi dan tampilan UI (satu sumber kebenaran).

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `KeyRound` | Header halaman | 20px |
| `Check` | Sel izin diberikan | 16px |
| `X` | Sel izin ditolak | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.9 Super Admin Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

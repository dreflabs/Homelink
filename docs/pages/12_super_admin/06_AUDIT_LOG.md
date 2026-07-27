# AUDIT LOG PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Audit Log
**Module:** 12 SUPER ADMIN
**Role:** Super Admin
**Purpose:** Meninjau jejak audit seluruh aksi privileged di platform (persetujuan verifikasi, perubahan harga, perubahan akun) — halaman paling nyata secara data di modul ini, karena `AUDIT_LOG` sudah ada penuh di `40_ERD.md`.

## 2. Next.js Routing Path
```text
app/(dashboard)/super-admin/audit-log/page.tsx
```
Sidebar label: "Audit Log", di bawah grup nav "Security & Infra".

## 3. Required UI Components (Shadcn/ui)
- `Timeline Card` (`17_COMPONENT_LIBRARY.md` §8.4) — kronologis, kartu Card yang paling sering dipakai di modul ini per `27_DASHBOARD_DESIGN_GUIDELINES.md` §8.9.
- `Select`/filter — berdasarkan `action`, `actorId`, rentang tanggal.
- `EmptyState` — netral, bukan positif/negatif ("Tidak ada aktivitas pada rentang waktu ini") untuk filter yang tidak menghasilkan hasil.

## 4. Data & State Management
- **Tidak ada gap skema:** `AUDIT_LOG` (`id, actorId, action, entityId, oldValues/newValues (JSONB), ipAddress, createdAt`) sudah ada penuh di ERD dan dipakai lintas modul (`67_AUDIT_LOGGING.md`). Halaman ini murni menampilkan data yang sudah tercatat sistem, bukan menunggu skema baru.
- **Local State:** filter (action/actor/rentang tanggal) disimpan di URL search params.

## 5. API Endpoints Referenced
- `GET /api/v1/audit-logs` — perlu dikonfirmasi/ditambahkan secara eksplisit ke `52_ENDPOINT_CATALOGUE.md` dengan parameter filter (`action`, `actorId`, `from`, `to`) — gap kecil administratif, bukan gap skema, karena tabelnya sudah ada.

## 6. Acceptance Criteria (DoD)
- [ ] Daftar terurut kronologis, terbaru di atas, dengan opsi filter tanpa kehilangan konteks (URL-based, dapat dibagikan).
- [ ] `oldValues`/`newValues` (JSONB) ditampilkan dalam format yang mudah dibaca (diff sederhana), bukan JSON mentah.
- [ ] Empty state bernada netral (bukan positif "kerja bagus" seperti antrian verifikasi kosong) — audit log kosong pada rentang tertentu adalah hal biasa, bukan pencapaian.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `History` | Header halaman | 20px |
| `User` | Item Timeline — aktor perubahan | 16px |
| `FileClock` | Filter rentang tanggal | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.9 Super Admin Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

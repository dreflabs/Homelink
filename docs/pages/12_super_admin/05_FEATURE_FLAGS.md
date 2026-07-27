# FEATURE FLAGS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Feature Flags
**Module:** 12 SUPER ADMIN
**Role:** Super Admin
**Purpose:** Mengaktifkan/menonaktifkan fitur secara bertahap tanpa deploy ulang — mendukung pola "dark launching" yang sudah disebutkan di `92_RELEASE_MANAGEMENT.md` (contoh: menyembunyikan fitur pembayaran kartu kredit di balik flag sebelum rilis penuh).

## 2. Next.js Routing Path
```text
app/(dashboard)/super-admin/feature-flags/page.tsx
```
Sidebar label: "Feature Flags", di bawah grup nav "Platform".

## 3. Required UI Components (Shadcn/ui)
- `Table` — nama flag, status (on/off), persentase rollout.
- `Switch` — toggle on/off per flag.

## 4. Data & State Management
- **Gap skema:** Tidak ada entity `FeatureFlag` di `40_ERD.md` — `92_RELEASE_MANAGEMENT.md` menyebut konsep feature toggle secara prinsip, tapi belum ada tabel pendukung. Diusulkan skema kecil:
  ```
  FeatureFlag {
    id          String  @id @default(uuid())
    key         String  @unique
    isEnabled   Boolean @default(false)
    rolloutPercent Int  @default(0)
    updatedAt   DateTime @updatedAt
    updatedBy   String  // FK -> USER
  }
  ```
- Sampai tersedia, halaman merender `EmptyState` menjelaskan status.

## 5. API Endpoints Referenced
- Belum ada — diusulkan `GET/PATCH /api/v1/admin/feature-flags`, menunggu skema §4.

## 6. Acceptance Criteria (DoD)
- [ ] Setiap perubahan flag tercatat di `AUDIT_LOG` (action `FEATURE_FLAG_TOGGLED`) begitu skema tersedia — perubahan flag adalah aksi berdampak luas, wajib teraudit.
- [ ] Merender `EmptyState` yang jelas selama backend belum ada.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `ToggleLeft` | Header halaman/flag nonaktif | 20px |
| `ToggleRight` | Flag aktif | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.9 Super Admin Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

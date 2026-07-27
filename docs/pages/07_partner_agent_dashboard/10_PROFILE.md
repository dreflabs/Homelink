# PROFILE PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Profile (Profil Agent)
**Module:** 07 PARTNER AGENT DASHBOARD
**Role:** Partner Agent
**Purpose:** Profil bisnis Partner Agent (nama, agensi, nomor lisensi, foto, bio singkat) yang berpotensi ditampilkan ke Buyer/Owner sebagai penanda kredibilitas — berbeda dari `11_SETTINGS.md` yang mengatur akun, bukan citra publik.

## 2. Next.js Routing Path
```text
app/(dashboard)/partner-agent/profile/page.tsx
```
Sidebar label: "Profil".

## 3. Required UI Components (Shadcn/ui)
- `Avatar` (`17_COMPONENT_LIBRARY.md` §8.1) — foto profil, ukuran 96px di halaman ini.
- `Input`/`Textarea` — nama agensi, nomor lisensi, bio.
- `Dropzone` — unggah foto profil.

## 4. Data & State Management
- **Gap skema:** `USER` di `40_ERD.md` hanya memiliki field dasar (nama, email, telepon, role) — tidak ada field khusus agent (`agencyName`, `licenseNumber`, `bio`, `publicPhotoUrl`). Diusulkan perluasan kecil pada `USER` (nullable, hanya relevan untuk role `PARTNER_AGENT`) daripada tabel terpisah, mengikuti prinsip "perluasan field, bukan entity baru" yang sudah dipakai di beberapa gap lain modul ini.
- Sampai field tersedia, halaman dapat menampilkan field dasar yang sudah ada (`USER.name`, `USER.email`) dalam mode read-only, dan menonaktifkan field agent-spesifik dengan catatan "Segera hadir".

## 5. API Endpoints Referenced
- `PATCH /api/v1/users/me` — sudah ada, cukup untuk field dasar; perlu diperluas untuk field agent-spesifik begitu skema §4 tersedia.
- Unggah foto profil: pola presigned-URL yang sama seperti `06_owner_dashboard/03_ADD_PROPERTY.md`, ke `PROPERTY_MEDIA`-setara untuk user (belum ada endpoint khusus avatar di `52_ENDPOINT_CATALOGUE.md` — dicatat sebagai gap kecil).

## 6. Acceptance Criteria (DoD)
- [ ] Field agent-spesifik yang belum didukung backend dinonaktifkan dengan jelas (bukan disembunyikan tanpa penjelasan).
- [ ] Perubahan field dasar (`name`) tersimpan lewat endpoint yang sudah ada tanpa perlu menunggu skema baru.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `User` | Header halaman | 20px |
| `Building2` | Field nama agensi | 20px |
| `BadgeCheck` | Field nomor lisensi | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.4 Partner Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

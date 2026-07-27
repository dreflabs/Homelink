# SETTINGS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Settings (Pengaturan Akun)
**Module:** 07 PARTNER AGENT DASHBOARD
**Role:** Partner Agent
**Purpose:** Pengaturan akun Partner Agent — ubah nama/email/password dan preferensi notifikasi. Berbeda dari `10_PROFILE.md` yang mengatur citra publik agent, halaman ini murni akun & keamanan, mengikuti pola yang sudah terbukti di `06_owner_dashboard/11_SETTINGS.md`.

## 2. Next.js Routing Path
```text
app/(dashboard)/partner-agent/settings/page.tsx
```
Sidebar label: "Pengaturan".

## 3. Required UI Components (Shadcn/ui)
- `Input` (`17_COMPONENT_LIBRARY.md` §8.1) — nama, email (read-only jika terverifikasi OAuth).
- `Switch` — preferensi notifikasi (lead baru, pengingat tugas).
- `Button` (`destructive` variant) — ubah password, dengan konfirmasi terpisah.

## 4. Data & State Management
- **Server State:** `USER` dan `ACCOUNT` (untuk status OAuth linking) — keduanya sudah ada di `40_ERD.md`, tidak ada gap untuk field dasar akun.
- **Form Handling:** `react-hook-form` + `zodResolver`, skema Zod sama pola dengan `02_authentication/02_REGISTER.md` untuk validasi password baru.
- **Gap kecil:** preferensi notifikasi (`Switch` untuk "lead baru"/"pengingat tugas") tidak punya field penyimpanan di `USER` — perlu `NotificationPreference` (nullable JSON di `USER` atau tabel kecil terpisah), sama gap yang dicatat di `11_admin/11_SETTINGS.md`. Sampai tersedia, `Switch` dinonaktifkan dengan label "Segera hadir".

## 5. API Endpoints Referenced
- `PATCH /api/v1/users/me` — sudah ada.
- `POST /api/v1/users/me/password` — sudah ada, mengikuti pola `06_owner_dashboard/11_SETTINGS.md`.
- Preferensi notifikasi: belum ada endpoint, menunggu skema §4.

## 6. Acceptance Criteria (DoD)
- [ ] Ubah password memerlukan konfirmasi eksplisit dan tidak pernah menjadi aksi satu klik.
- [ ] Email hanya dapat diubah jika akun bukan hasil OAuth (`ACCOUNT` linking) — konsisten dengan `55_AUTHENTICATION_FLOW.md`.
- [ ] Preferensi notifikasi yang belum didukung backend dinonaktifkan dengan jelas, bukan disembunyikan diam-diam.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Settings` | Header halaman | 20px |
| `Lock` | Bagian ubah password | 20px |
| `Bell` | Bagian preferensi notifikasi | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.4 Partner Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

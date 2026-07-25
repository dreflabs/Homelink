# MY PROFILE PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** My Profile
**Module:** 05 BUYER DASHBOARD
**Purpose:** Memungkinkan Buyer melihat dan memperbarui data identitas akun pribadinya (nama, email, telepon, foto profil). Data ini bersumber langsung dari entitas `USER` yang sudah dimodelkan penuh di `40_ERD.md`.

## 2. Next.js Routing Path
```text
app/(dashboard)/dashboard/profile/page.tsx
```
Rute publik: `/dashboard/profile`. Tidak memiliki Screen ID eksplisit di `18_SCREEN_INVENTORY.md` §8.2 — direkomendasikan ditambahkan sebagai SCR-104 pada revisi berikutnya.

## 3. Required UI Components (Shadcn/ui)
- `Avatar` + `Input type="file"` (avatar upload, disimpan sebagai S3 URL) dengan tombol overlay "Ubah Foto".
- `Form` (`react-hook-form` + `zodResolver`) berisi field: `name` (Input text), `email` (Input, read-only + badge verifikasi), `phone` (Input, format WhatsApp Indonesia).
- `Badge` — indikator `isEmailVerified` (hijau "Terverifikasi" / abu "Belum Verifikasi" dengan tautan kirim ulang OTP).
- `Button` (Royal Blue) — "Simpan Perubahan", disabled sampai form dirty & valid.
- `Skeleton` — avatar + baris input saat data awal dimuat.
- `Toast`/`Alert` — konfirmasi sukses simpan atau error validasi server.

## 4. Data & State Management
- **Server State (RSC awal + mutasi client):** Bersumber langsung dari `USER` (`40_ERD.md` / `42_TABLE_SPECIFICATION.md` §8.1): `id`, `name`, `email` (unique, tidak dapat diedit langsung tanpa alur verifikasi ulang), `phone` (unique, nullable), `isEmailVerified`.
- **Form Handling:** `react-hook-form` dengan skema Zod: `name` (min 3 karakter), `phone` (regex nomor Indonesia, opsional), `email` (read-only field, perubahan email memicu alur verifikasi terpisah — bukan simpan langsung).
- **Local State:** Preview avatar sementara sebelum upload sukses (blob URL lokal) — dibuang setelah `s3Url` final diterima.
- **Optimistic UI:** Field nama/telepon diperbarui optimis di UI sebelum konfirmasi server; rollback ke nilai lama jika mutasi gagal.

## 5. API Endpoints Referenced
- `GET /api/v1/users/me` — mengambil profil Buyer yang sedang login (implisit dari sesi; belum eksplisit di `52_ENDPOINT_CATALOGUE.md`, direkomendasikan ditambahkan sebagai bagian dari domain Auth/User yang sudah ada).
- `PATCH /api/v1/users/me` — memperbarui `name`/`phone`. Mengikuti pola otorisasi Application-level RLS: Buyer hanya bisa mem-PATCH baris `USER` miliknya sendiri (`session.user.id === USER.id`).
- Upload avatar menggunakan pola presigned-URL S3 yang sudah dirujuk di `56_AUTHORIZATION_MATRIX.md` (§ Media presigned-url) untuk media lain (`PROPERTY_MEDIA`) — direkomendasikan pola serupa untuk `USER.avatarUrl` bila field tersebut ditambahkan ke `40_ERD.md` (saat ini `USER` belum punya kolom avatar eksplisit — flag tambahan kecil, bukan salah satu dari 7 gap utama modul ini).

## 6. Acceptance Criteria (DoD)
- [ ] Menyimpan nama/telepon menampilkan optimistic UI update instan, lalu konfirmasi/rollback sesuai respons server.
- [ ] Field `email` tidak dapat diedit langsung dari form ini; upaya ganti email diarahkan ke alur verifikasi terpisah (OTP).
- [ ] Upload avatar menampilkan progress state dan preview sebelum commit final.
- [ ] Validasi Zod menampilkan pesan error inline per-field, bukan alert global generik.
- [ ] Lolos audit Lighthouse Accessibility > 90; label form terhubung dengan `htmlFor`/`aria-labelledby`.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `UserCircle2` | Header halaman / avatar placeholder | 24px |
| `Camera` | Tombol overlay ubah foto profil | 16px |
| `Mail` | Prefix field email (dengan badge verifikasi) | 18px |
| `BadgeCheck` | Indikator email terverifikasi | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)
Halaman ini **DIWAJIBKAN** mematuhi pedoman visual `Mockup.png` — standar "Apple × Airbnb × Stripe × Zillow":

- **Background Utama:** `White` bersih, form disusun dalam satu `Card` `rounded-2xl` dengan padding lega.
- **Warna Aksi Utama:** `Royal Blue` (`blue-700`) untuk tombol simpan aktif; abu (`slate-200`) saat disabled.
- **Teks:** Heading `Dark Navy` (`slate-900`), teks bantu/placeholder `Cool Gray` (`slate-500`).
- **Avatar:** Bulat penuh (`rounded-full`), border tipis `slate-100`, shadow ultra-lembut saat hover.
- **Form Layout:** Label di atas input (bukan inline), spacing vertikal konsisten `space-y-6` untuk kenyamanan baca.

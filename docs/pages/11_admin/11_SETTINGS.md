# SETTINGS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Admin Settings
**Module:** 11 ADMIN
**Purpose:** Halaman pengaturan akun pribadi Admin yang sedang login — mengelola profil (nama, email, foto), preferensi notifikasi (mis. notifikasi email saat ada properti baru masuk antrean verifikasi), dan keamanan akun sendiri (ubah password, status verifikasi email). Ini BUKAN halaman pengaturan platform-wide/global (feature flags, konfigurasi sistem) — pengaturan tersebut adalah scope Super Admin di `12_super_admin/`.

## 2. Next.js Routing Path
```text
app/(dashboard)/11_admin/settings/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Card` (Profil) — form edit `name`, `email` (dengan indikator `isEmailVerified`), `phone`.
- `Avatar` + `Button` (upload) — ganti foto profil Admin.
- `Card` (Notifikasi) — `Switch` untuk toggle preferensi notifikasi (mis. "Notifikasi Antrean Verifikasi Baru", "Notifikasi Laporan Pengguna").
- `Card` (Keamanan) — form ubah password milik SENDIRI (current password + new password + confirm), berbeda dari alur "kirim tautan reset" yang dipakai Admin terhadap user LAIN di `02_USER_MANAGEMENT.md`.
- `Skeleton` — loading state saat data profil belum tiba.

## 4. Data & State Management
- **Fields dari ERD:** `USER(id, email, phone, name, role, passwordHash, isEmailVerified, updatedAt)` — halaman ini membaca & menulis record `USER` milik Admin yang sedang login sendiri (`session.user.id`), tidak pernah user lain.
- **Local State:** draft form profil (`react-hook-form` + Zod), state kekuatan password baru, toggle preferensi notifikasi (state lokal dengan optimistic update).
- **Server State:** RSC fetch profil Admin saat load halaman; mutasi via Server Action untuk update profil/password.
- **Preferensi notifikasi:** Tidak ada entitas `NotificationPreference` di `40_ERD.md` — **GAP kecil**, kemungkinan disimpan sebagai kolom JSON pada `USER` atau tabel terpisah; perlu keputusan skema sebelum implementasi backend.

## 5. API Endpoints Referenced
- **GAP:** `GET /api/v1/admin/me` / `PATCH /api/v1/admin/me` — belum terdaftar di `52_ENDPOINT_CATALOGUE.md`; diusulkan mengikuti konvensi `/api/v1/` untuk profil akun sendiri (terpisah dari `/api/v1/admin/users/:id` yang menyasar user LAIN).
- **GAP:** `PATCH /api/v1/admin/me/password` — ubah password akun sendiri (memerlukan current password); ini BERBEDA dari `POST /api/v1/admin/users/:id/send-password-reset` di `02_USER_MANAGEMENT.md` yang menyasar akun user lain.
- **GAP:** `PATCH /api/v1/admin/me/notification-preferences` — bergantung pada keputusan skema penyimpanan preferensi di atas.

## 6. Acceptance Criteria (DoD)
- [ ] Form ubah password mensyaratkan `current password` yang benar sebelum menerima `new password` (tidak bisa diubah tanpa verifikasi ulang identitas).
- [ ] Field email menampilkan status `isEmailVerified` dan menyediakan aksi "Kirim Ulang Verifikasi" jika belum terverifikasi.
- [ ] Halaman ini secara tegas TIDAK memuat kontrol platform-wide (feature flag, konfigurasi global) — jika ditemukan kebutuhan tersebut, harus diarahkan ke modul `12_super_admin/`, bukan ditambahkan di sini.
- [ ] Semua form tervalidasi dengan Zod dan menampilkan pesan error inline yang accessible (`aria-describedby`).

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `Settings`
- **Purpose:** Ikon header halaman Settings. **Size:** 22px. **Color:** `text-blue-700`.

#### Icon: `UserCircle`
- **Purpose:** Card "Profil". **Size:** 18px. **Color:** `text-slate-500`.

#### Icon: `Bell`
- **Purpose:** Card "Notifikasi". **Size:** 18px. **Color:** `text-slate-500`.

#### Icon: `Lock`
- **Purpose:** Card "Keamanan" (ubah password). **Size:** 18px. **Color:** `text-slate-500`.

## 8. UI/UX Aesthetic Rules
Mengikuti Design System global: background `White`, aksi utama `Royal Blue` (`blue-700`), teks `slate-900`, surface sekunder `slate-50`, shadow ultra-lembut, radius `rounded-2xl`/`rounded-3xl`.

**Catatan kepadatan khusus Admin:** Berbeda dari halaman moderasi lain di modul ini, Settings tidak berbentuk tabel data-dense — memakai layout form vertikal single-column dengan Card terpisah per kategori pengaturan (Profil/Notifikasi/Keamanan), mengikuti pola form akun standar, bukan pola queue/tabel.

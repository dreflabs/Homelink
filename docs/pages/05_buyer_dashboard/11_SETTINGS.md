# SETTINGS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Settings (Pengaturan Akun)
**Module:** 05 BUYER DASHBOARD
**Purpose:** Mengelola pengaturan keamanan akun (ubah kata sandi) dan preferensi notifikasi Buyer. Berbeda dari `02_MY_PROFILE.md` yang mengatur data identitas (nama/telepon/foto); halaman ini fokus pada keamanan & preferensi sistem.

## 2. Next.js Routing Path
```text
app/(dashboard)/dashboard/settings/page.tsx
```
Rute publik: `/dashboard/settings`. Sesuai `20_NAVIGATION_MAP.md` (`DB_Settings[Pengaturan Akun]`) sebagai item terakhir sidebar Buyer.

## 3. Required UI Components (Shadcn/ui)
- `Card` "Keamanan Akun" — form ubah kata sandi: `Input type="password"` untuk Kata Sandi Saat Ini, Kata Sandi Baru, Konfirmasi Kata Sandi Baru.
- `Button` (Royal Blue) — "Perbarui Kata Sandi", disabled sampai ketiga field valid.
- `Card` "Preferensi Notifikasi" — daftar `Switch` per kanal/tipe: "Email", "WhatsApp/SMS" (jika `phone` terisi), per-tipe: pembaruan booking, hasil verifikasi, pesan baru.
- `Alert` (info, non-blocking) — ditampilkan pada seksi Preferensi Notifikasi bila backing store belum tersedia (lihat gap §4).
- `AlertDialog` — konfirmasi sebelum menonaktifkan akun (jika fitur deaktivasi akun ada; jika tidak ada di scope Fase 1, seksi ini dihilangkan, bukan ditampilkan non-fungsional).
- `Toast` — konfirmasi sukses ubah kata sandi / error validasi.

## 4. Data & State Management
- **Ubah Kata Sandi — Sudah Termodel:** Menggunakan field `USER.passwordHash` yang SUDAH ada di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` §8.1. Perubahan tidak pernah membaca/menampilkan `passwordHash` mentah ke client; seluruh validasi (kecocokan kata sandi saat ini) dilakukan server-side.
- **Preferensi Notifikasi — GAP SEBAGIAN:** Bagian ini bergantung pada penyimpanan preferensi per-tipe/per-kanal notifikasi, yang merupakan bagian dari entitas `Notification` yang belum ada di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — lihat rekomendasi audit Tahap 3 dan detail gap di `10_NOTIFICATION.md`. `USER` saat ini TIDAK memiliki kolom preferensi notifikasi (mis. `notifyEmail: boolean`, `notifyWhatsapp: boolean`). Opsi implementasi: (a) tambahkan kolom preferensi langsung ke `USER`, atau (b) buat tabel `NotificationPreference` terpisah — keputusan ini harus diambil bersamaan dengan pemodelan entitas `Notification`, bukan diasumsikan di sini.
- **Proposed Shape (opsi tabel terpisah):**
  ```
  NotificationPreference {
    userId          uuid PK/FK -> USER.id
    notifyEmail     boolean default true
    notifyWhatsapp  boolean default false
    updatedAt       datetime
  }
  ```
- **Form Handling:** `react-hook-form` + Zod untuk form ubah kata sandi: `currentPassword` (wajib, tidak boleh kosong), `newPassword` (min 8 karakter, kombinasi huruf & angka), `confirmPassword` (harus sama dengan `newPassword`).

## 5. API Endpoints Referenced
- `PATCH /api/v1/users/me/password` — diusulkan mengikuti pola `PATCH /api/v1/users/me` yang sudah dirujuk di `02_MY_PROFILE.md`; payload `{ currentPassword, newPassword }`. Server WAJIB memverifikasi ulang `currentPassword` terhadap `USER.passwordHash` sebelum menerima `newPassword` (re-entry kata sandi saat ini adalah syarat keamanan wajib, bukan opsional).
- Memerlukan entitas/kolom database baru (`NotificationPreference` atau perluasan `USER`) yang belum ada di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — lihat rekomendasi audit Tahap 3. Endpoint yang diusulkan: `GET /api/v1/users/me/notification-preferences`, `PATCH /api/v1/users/me/notification-preferences` mengikuti konvensi REST yang sudah ada.

## 6. Acceptance Criteria (DoD)
- [ ] Ubah kata sandi WAJIB meminta re-entry "Kata Sandi Saat Ini" sebelum menerima kata sandi baru — form ditolak jika field ini kosong.
- [ ] Kata sandi baru divalidasi client-side (Zod) DAN server-side (tidak boleh hanya salah satu); pesan error spesifik ditampilkan per-field (mis. "Kata sandi saat ini salah" vs "Kata sandi baru terlalu pendek").
- [ ] Sukses ubah kata sandi menampilkan `Toast` konfirmasi dan TIDAK auto-logout Buyer dari sesi aktif (kecuali kebijakan keamanan eksplisit menyatakan lain).
- [ ] Seksi Preferensi Notifikasi menampilkan `Alert` info non-blocking ("Fitur dalam pengembangan") selama backing store belum diimplementasikan backend — switch tidak boleh tampak berfungsi namun diam-diam tidak menyimpan apa pun.
- [ ] Lolos audit Lighthouse Accessibility > 90; seluruh field password memiliki toggle show/hide dengan `aria-label` yang jelas.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Settings` | Header halaman "Pengaturan Akun" | 20px |
| `Lock` | Ikon seksi "Keamanan Akun" / prefix field kata sandi | 18px |
| `Eye` / `EyeOff` | Toggle tampilkan/sembunyikan kata sandi | 16px |
| `BellRing` | Ikon seksi "Preferensi Notifikasi" | 18px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)
Halaman ini **DIWAJIBKAN** mematuhi pedoman visual `Mockup.png` — standar "Apple × Airbnb × Stripe × Zillow":

- **Background Utama:** `White`, dua `Card` terpisah (`rounded-2xl`) untuk "Keamanan Akun" dan "Preferensi Notifikasi" dengan jarak vertikal jelas antar seksi.
- **Warna Aksi Utama:** `Royal Blue` (`blue-700`) untuk tombol "Perbarui Kata Sandi" dan switch aktif; switch dalam status "dalam pengembangan" tetap memakai warna netral abu dengan `Alert` info di atasnya.
- **Teks:** Heading seksi `Dark Navy` (`slate-900`), teks bantu/hint validasi `Cool Gray` (`slate-500`), pesan error merah lembut kontras AA.
- **Form Layout:** Field password disusun vertikal (`space-y-4`), tombol aksi berada di kanan bawah form, bukan menyatu dengan input.

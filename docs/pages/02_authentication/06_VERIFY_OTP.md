# VERIFY OTP PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Verify OTP
**Module:** 02 AUTHENTICATION
**Purpose:** Memverifikasi kepemilikan nomor telepon pengguna melalui kode 6 digit yang dikirim via WhatsApp/SMS — digunakan pada alur verifikasi telepon setelah registrasi, dan dapat digunakan ulang untuk perubahan akun kritis (mis. ganti nomor telepon, ganti password sensitif) sesuai kebijakan OTP di `62_AUTHENTICATION_SECURITY.md`.

## 2. Next.js Routing Path
```text
app/(02_authentication)/verify-otp/page.tsx
```
Dapat dirender sebagai halaman penuh (langsung setelah Register) atau sebagai modal/step dalam alur multi-step registrasi, tergantung konteks pemicu (registrasi baru vs verifikasi aksi kritis). Tidak menggunakan Intercepting Routes seperti Login/Register karena selalu dipicu dalam alur linear (bukan interupsi navigasi bebas).

## 3. Required UI Components
- **OTP Input Group** — 6 kotak input digit terpisah dengan **auto-advance** (fokus otomatis pindah ke kotak berikutnya saat satu digit terisi, dan mundur otomatis saat Backspace pada kotak kosong), mendukung paste (menempelkan 6 digit sekaligus mengisi semua kotak).
- Teks penunjuk tujuan pengiriman (mis. "Kode dikirim ke +62 8xx-xxxx-xx**23**" — nomor disamarkan sebagian untuk privasi).
- **Countdown timer resend** — teks "Kirim ulang kode dalam 00:30" yang menghitung mundur; berubah menjadi tombol aktif "Kirim ulang kode" setelah countdown habis.
- `Button` (variant `default`) — "Verifikasi", dengan `isLoading`; otomatis submit saat 6 digit terisi penuh (tanpa perlu klik tombol) sebagai UX tambahan, dengan tombol tetap tersedia sebagai fallback.
- `Button` (variant `ghost`, disabled selama countdown) — "Kirim ulang kode" / `RotateCw` icon, dinonaktifkan selama rate-limit window.
- `Alert` — pesan lockout setelah 3 kali salah kode.

## 4. Data & State Management
**Zod Schema (sketch):**
```ts
const verifyOtpSchema = z.object({
  code: z.string().length(6, "Kode verifikasi harus 6 digit.").regex(/^\d{6}$/, "Kode hanya boleh berisi angka."),
});
```
- **Local State:** `otpDigits: string[6]` per-kotak, `activeIndex` untuk auto-advance, `resendCountdown: number` (detik, dimulai dari 30 atau sesuai kebijakan server), `attemptsRemaining: number` (menampilkan sisa percobaan sebelum lockout 30 menit — maks 3 kali salah), `isLocked: boolean` selama lockout.
- **Server State:** tidak ada fetch data awal; state `attemptsRemaining` dan `resendCountdown` idealnya disinkronkan dari response server (bukan hanya dihitung di klien) agar konsisten meski halaman di-refresh.
- **Form Handling:** submit otomatis saat 6 digit lengkap, atau via klik tombol; tidak menggunakan `react-hook-form` penuh (lebih cocok state array manual untuk auto-advance), namun tetap divalidasi dengan `verifyOtpSchema` sebelum dikirim.

## 5. API Endpoints Referenced
- **Catatan:** endpoint spesifik ini belum tercantum di `52_ENDPOINT_CATALOGUE.md`, disarankan ditambahkan sebagai `POST /api/v1/auth/verify-otp` (payload `{ phone, code }`) mengikuti konvensi modul Auth yang sudah ada.
- Endpoint kirim ulang OTP (kemungkinan `POST /api/v1/auth/resend-otp` atau bagian dari endpoint register/verify-otp yang sama) juga belum tercantum — perlu ditambahkan, dengan rate limit maks 3 request/nomor telepon/jam sesuai `58_RATE_LIMIT_SPECIFICATION.md`.

## 6. Acceptance Criteria (DoD)
- [ ] Auto-advance antar kotak OTP berfungsi mulus dengan keyboard (termasuk Backspace mundur ke kotak sebelumnya) dan mendukung paste 6 digit sekaligus — TIDAK ADA keyboard trap.
- [ ] Setelah 3 kali kode salah, input dikunci selama 30 menit dengan pesan yang jelas menyebutkan durasi lockout dan alasan (apa/mengapa/cara-perbaiki), bukan hanya "Kode OTP salah!".
- [ ] Tombol "Kirim ulang kode" dinonaktifkan secara visual dan fungsional selama countdown maupun selama rate-limit window (maks 3 request/jam) tercapai, dengan pesan berbeda untuk masing-masing kondisi.
- [ ] Kode yang salah (tapi belum lockout) menampilkan pesan spesifik: "Kode verifikasi yang dimasukkan kurang tepat. Silakan periksa kembali SMS/WhatsApp Anda atau minta kode baru." — bukan pesan menyalahkan pengguna.
- [ ] Setelah verifikasi sukses, pengguna otomatis lanjut ke langkah berikutnya (dashboard atau halaman verifikasi email jika berlaku) tanpa perlu aksi tambahan.
- [ ] Esc tidak menutup alur ini secara tidak sengaja jika ini adalah step wajib (bukan modal dismissable) — perlu konfirmasi eksplisit jika pengguna ingin keluar dari alur verifikasi.

## 7. Iconography Specification
- `ShieldCheck` — ikon utama halaman, merepresentasikan verifikasi keamanan.
- `RotateCw` — ikon pada tombol "Kirim ulang kode".
- `MessageSquare` — ikon kecil menandakan saluran pengiriman (WhatsApp/SMS) di teks penunjuk tujuan.
- `Lock` — ikon pada state lockout 30 menit.

## 8. UI/UX Aesthetic Rules
Konsisten dengan Design System: White, Royal Blue untuk CTA aktif, Dark Navy untuk teks, radius rounded-2xl/3xl.
- Kotak OTP menggunakan radius lebih kecil (rounded-xl) dibanding card besar agar terasa presisi seperti input kode, dengan ring emerald-500 saat focus sesuai state Input pada Design System.
- Selaras prinsip "Instant Clarity & Trust": tampilkan progres jelas (langkah keberapa dari alur registrasi jika multi-step) agar pengguna tidak merasa terjebak di halaman verifikasi tanpa arah.

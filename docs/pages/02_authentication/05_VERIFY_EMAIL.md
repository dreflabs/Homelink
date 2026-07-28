# VERIFY EMAIL PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Verify Email
**Module:** 02 AUTHENTICATION
**Purpose:** Mengonfirmasi kepemilikan alamat email pengguna dengan memproses tautan verifikasi (token) yang dikirim setelah registrasi, lalu memperbarui flag `USER.isEmailVerified` menjadi `true` sehingga akun dianggap sepenuhnya aktif.

## 2. Next.js Routing Path
```text
app/(02_authentication)/verify-email/page.tsx
```
Diakses melalui tautan berisi token unik (mis. `/verify-email?token=...`) yang dikirim ke email pengguna setelah registrasi. Halaman ini WAJIB dirender penuh (bukan modal), karena diakses dari luar aplikasi (klik link di aplikasi email, sering di device/browser berbeda dari saat registrasi) — tidak boleh bergantung pada state client dari sesi sebelumnya.

> **Architectural Navigation & Modal Interception Isolation Note:**
> - **Direct Anchor Navigation:** Karena halaman `verify-email` merupakan layar penuh transisional pasca-registrasi, seluruh tombol tautan keluar menuju Login (seperti "Lanjut ke Login", "Kembali ke Login", atau "Batal dan Kembali") memanfaatkan navigasi langsung (`<a href="/{locale}/login">`) bukan komponen `<Link>` Next.js. Ini memastikan bahwa penekanan tombol tidak akan ditangkap oleh rute paralel `@modal/(.)login` yang dapat menyebapkan popup tumpang tindih di atas layar verifikasi.

## 3. Required UI Components
- **Immersive Hero Panel (Desktop Only):** Panel arsitektur di sisi kiri (`w-1/2`) dengan latar foto properti premium dan overlay gelap (`bg-slate-950/50 backdrop-blur`), menciptakan pengalaman merek kelas dunia.
- **Floating Glass Auth Card:** Kontainer di sisi kanan dengan *glassmorphism* (`bg-white/85 backdrop-blur-xl`), sudut `rounded-3xl`, dan dilengkapi atribut aksesibilitas `aria-live="polite"` agar screen reader membacakan perubahan status seketika.
- Tidak ada form input untuk verifikasi standar — halaman ini bersifat **otomatis** (memproses token dari URL saat mount).
- `Loader2`/Spinner — state "Memverifikasi email Anda..." selama request ke server berlangsung.
- `Alert`/ikon besar sukses (`MailCheck` berbingkai emerald) + CTA "Lanjut ke Login".
- `Alert`/ikon besar gagal (`MailX` berbingkai merah untuk token invalid/expired) + CTA & input "Kirim ulang email verifikasi" (`RotateCw`).

## 4. Data & State Management
- **Local State:** `verificationStatus: "verifying"|"success"|"invalid"|"expired"|"already_verified"` — dikelola sebagai state machine sederhana, bukan boolean tunggal, karena UX pesan berbeda untuk tiap kasus (token sudah pernah dipakai ≠ token kedaluwarsa).
- **Server State:** token dari query param diproses via Server Action/Route Handler saat halaman dimuat; tidak ada form state karena tidak ada input pengguna.
- Tidak ada Zod schema form-input; validasi yang relevan adalah validasi token di server (format token, kecocokan dengan record, waktu kedaluwarsa).
- Tidak menggunakan `react-hook-form` — halaman ini murni tampilan hasil proses server-side, bukan formulir.

## 5. API Endpoints Referenced
- **Catatan:** endpoint spesifik ini belum tercantum di `52_ENDPOINT_CATALOGUE.md`, disarankan ditambahkan sebagai `POST /api/v1/auth/verify-email` (atau `GET` idempoten dengan token di query) mengikuti konvensi modul Auth yang sudah ada.
- CTA "Kirim ulang email verifikasi" memerlukan endpoint terpisah (kemungkinan `POST /api/v1/auth/resend-verification-email`) yang juga belum tercantum di katalog endpoint — perlu ditambahkan.

## 6. Acceptance Criteria (DoD)
- [ ] Halaman memproses token secara otomatis saat dimuat, tanpa memerlukan klik tambahan dari pengguna.
- [ ] Status "sudah diverifikasi sebelumnya" (token valid tapi email sudah `isEmailVerified: true`) ditampilkan sebagai pesan netral yang tetap mengarahkan ke Login, bukan sebagai error.
- [ ] Token expired menampilkan pesan yang menjelaskan apa/mengapa/cara-perbaiki ("Tautan verifikasi ini sudah kedaluwarsa. Minta tautan baru untuk melanjutkan.") dengan CTA kirim ulang.
- [ ] Setelah verifikasi sukses, jika pengguna memiliki sesi aktif di device yang sama, status verifikasi pada sesi tersebut diperbarui tanpa memaksa logout.
- [ ] Halaman tetap fungsional meski dibuka di device/browser berbeda dari saat registrasi (tidak bergantung pada localStorage/session client).
- [ ] Status visual (verifying/success/invalid/expired) disampaikan juga secara tekstual untuk screen reader (`aria-live="polite"` pada area status), tidak hanya lewat warna/ikon.

## 7. Iconography Specification
- `Loader2` (dengan animasi spin) — state sedang memverifikasi.
- `MailCheck` — state sukses verifikasi.
- `MailX` — state token invalid/expired/gagal.
- `RotateCw` — ikon pada CTA "Kirim ulang email verifikasi".

## 8. UI/UX Aesthetic Rules
Konsisten dengan Design System: White, Royal Blue untuk CTA, Dark Navy untuk teks, radius rounded-2xl/3xl.
- Halaman transisional seperti ini harus terasa singkat dan meyakinkan — hindari layout kompleks; satu ikon status besar di tengah, satu kalimat penjelasan, satu CTA, selaras prinsip "Instant Clarity & Trust".
- Karena sering dibuka di tab baru dari email client (kadang di mobile), pastikan CTA tombol berukuran cukup besar untuk sentuhan (touch target ≥ 44px) dan layout tetap terpusat rapi pada layar sempit.

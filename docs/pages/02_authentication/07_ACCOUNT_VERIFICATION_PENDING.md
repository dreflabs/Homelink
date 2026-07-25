# ACCOUNT VERIFICATION PENDING PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Account Verification Pending
**Module:** 02 AUTHENTICATION
**Purpose:** Menampilkan status "menunggu" kepada pengguna yang telah mendaftar namun belum menyelesaikan seluruh langkah verifikasi (email dan/atau telepon), memberi arahan jelas apa yang harus dilakukan selanjutnya, serta memberi opsi untuk mengirim ulang instruksi verifikasi tanpa perlu mendaftar ulang.

## 2. Next.js Routing Path
```text
app/(02_authentication)/account-verification-pending/page.tsx
```
Halaman ini adalah **halaman transisi/holding page** — diakses setelah Register berhasil namun verifikasi (email/OTP) belum tuntas, atau saat pengguna dengan akun `isEmailVerified: false` mencoba login. Bukan bagian dari Intercepting Routes modal karena bersifat status page penuh, mirip landing state, bukan aksi cepat.

## 3. Required UI Components
- Ikon/ilustrasi status besar di tengah (bukan alert merah — ini bukan error, melainkan status netral "menunggu").
- Teks status dinamis: menyesuaikan apakah yang tertunda adalah verifikasi email, verifikasi telepon (OTP), atau keduanya.
- `Button` (variant `outline`) — "Verifikasi Nomor Telepon Sekarang" (jika OTP pending) → menuju `06_VERIFY_OTP`.
- `Button` (variant `ghost`) — "Kirim Ulang Email Verifikasi" (jika email pending).
- Link — "Keluar" (logout) untuk pengguna yang ingin mencoba akun/metode lain.
- Tidak ada form input primer — halaman ini adalah status + CTA navigasi, bukan formulir data.

## 4. Data & State Management
- **Local State:** `pendingSteps: { emailVerified: boolean; phoneVerified: boolean }` menentukan CTA mana yang ditampilkan; `resendCooldown` untuk tombol kirim ulang email agar tidak spam-klik.
- **Server State:** status verifikasi diambil dari data sesi/user saat ini (`USER.isEmailVerified`, status OTP telepon) — idealnya via Server Component fetch langsung dari session/DB agar selalu akurat, bukan disimpan lama di client state yang bisa basi.
- Tidak ada Zod schema karena tidak ada form submit di halaman ini (kecuali tombol aksi memicu request tanpa payload form).
- Halaman ini harus melakukan **polling atau revalidasi** status secara berkala (atau saat window difokuskan kembali) agar begitu pengguna menuntaskan verifikasi di tab/device lain, halaman ini otomatis memperbarui status tanpa perlu refresh manual.

## 5. API Endpoints Referenced
- Bergantung pada status sesi pengguna saat ini (tidak ada endpoint fetch data khusus tercantum di `52_ENDPOINT_CATALOGUE.md` untuk "get verification status" — disarankan ditambahkan sebagai `GET /api/v1/auth/me` atau serupa jika belum ada, untuk memeriksa `isEmailVerified` dan status telepon terkini).
- CTA "Kirim Ulang Email Verifikasi" memanggil endpoint resend yang sama yang dicatat sebagai gap di `05_VERIFY_EMAIL.md` (`POST /api/v1/auth/resend-verification-email` — belum tercantum di katalog endpoint).
- CTA "Verifikasi Nomor Telepon" mengarahkan ke alur `06_VERIFY_OTP` yang bergantung pada `POST /api/v1/auth/verify-otp` (juga dicatat sebagai gap di file tersebut).

## 6. Acceptance Criteria (DoD)
- [ ] Halaman menampilkan CTA yang berbeda dan relevan tergantung kombinasi status pending (hanya email, hanya telepon, atau keduanya) — tidak menampilkan CTA untuk langkah yang sudah selesai.
- [ ] Begitu semua langkah verifikasi tuntas (dideteksi via polling/refocus), pengguna otomatis diarahkan ke dashboard sesuai role tanpa perlu klik tambahan.
- [ ] Tombol "Kirim Ulang Email Verifikasi" memiliki cooldown yang jelas (mis. 60 detik) untuk mencegah spam, dengan indikator visual selama cooldown.
- [ ] Pengguna dapat logout dari halaman ini untuk mencoba akun lain tanpa terjebak (tidak ada keyboard trap atau navigasi buntu).
- [ ] Nada pesan tenang dan informatif, bukan alarmis — halaman ini BUKAN halaman error atau penalti, melainkan status normal dalam alur onboarding.
- [ ] Status pending dan progres disampaikan juga secara tekstual untuk screen reader, tidak hanya lewat ikon/warna.

## 7. Iconography Specification
- `Clock` atau `Hourglass` — ikon utama status "menunggu", netral (bukan warning).
- `Mail` — pada CTA kirim ulang email verifikasi.
- `Phone` — pada CTA verifikasi nomor telepon.
- `LogOut` — pada link keluar/logout.

## 8. UI/UX Aesthetic Rules
Konsisten dengan Design System: White, Royal Blue untuk CTA, Dark Navy untuk teks, radius rounded-2xl/3xl.
- Karena ini halaman "menunggu" bukan error, hindari warna merah/oranye dominan — gunakan Royal Blue dan Muted Cool Gray agar terasa netral dan reassuring, selaras prinsip "Instant Clarity & Trust" dan aturan brand tone yang tidak menghakimi pengguna.
- Layout terpusat, minimal, dengan hierarki jelas: status → penjelasan singkat → CTA utama → CTA sekunder → logout, agar pengguna baru tidak bingung harus melakukan apa selanjutnya.

# REGISTER PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Register
**Module:** 02 AUTHENTICATION
**Purpose:** Membuat akun baru untuk pengguna Phase 1 (Buyer, Owner, Surveyor — role Admin tidak melalui self-registration) menggunakan Email/Password (di-hash Argon2id) atau OAuth 2.0 (Google/Apple ID), lalu memulai alur verifikasi (email dan/atau nomor telepon via OTP) sebelum akun dapat digunakan penuh.

## 2. Next.js Routing Path
```text
app/(02_authentication)/register/page.tsx
```
Seperti Login, halaman ini dapat dirender via Auth Modal / Intercepting Routes (`app/(02_authentication)/@modal/(.)register/page.tsx`) mengikuti `55_AUTHENTICATION_FLOW.md` dan `18_SCREEN_INVENTORY.md` SCR-004, agar pengguna dapat beralih dari modal Login ke Register tanpa kehilangan konteks halaman. Route penuh `/register` tetap tersedia sebagai fallback.

## 3. Required UI Components
- `Select`/`Tabs` — pemilihan peran akun (Buyer/Owner/Surveyor) sesuai kebutuhan Phase 1; menentukan field tambahan yang relevan.
- `Input` — Nama Lengkap (tanpa ikon atau ikon `User`).
- `Input` — Email (ikon `Mail`).
- `Input` — Nomor Telepon (ikon `Phone`), format Indonesia, unik di sistem.
- `Input` — Password (ikon `Lock`, trailing `Eye`/`EyeOff`) dengan **indikator kekuatan password** (strength meter: lemah/sedang/kuat) yang bereaksi real-time terhadap aturan (min 8 karakter, 1 huruf besar, 1 angka).
- `Input` — Konfirmasi Password.
- `Checkbox` — persetujuan Syarat & Ketentuan / Kebijakan Privasi (wajib dicentang sebelum submit aktif).
- `Button` (variant `default`) — "Daftar", dengan `isLoading`.
- `Button` (variant `outline`) — "Daftar dengan Google" / "Daftar dengan Apple".
- Link — "Sudah punya akun? Masuk" menuju `01_LOGIN`.

## 4. Data & State Management
**Zod Schema (sketch):**
```ts
const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter."),
  email: z.string().email("Format email tidak valid."),
  phone: z.string().regex(/^(\+62|0)[0-9]{9,13}$/, "Format nomor telepon tidak valid."),
  role: z.enum(["BUYER", "OWNER", "SURVEYOR"]),
  password: z.string()
    .min(8, "Password minimal 8 karakter.")
    .regex(/[A-Z]/, "Harus mengandung minimal 1 huruf besar.")
    .regex(/[0-9]/, "Harus mengandung minimal 1 angka.")
    .refine(pw => !["password123", "12345678"].includes(pw.toLowerCase()), "Password terlalu umum, gunakan kombinasi yang lebih unik."),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: "Konfirmasi password tidak cocok.",
  path: ["confirmPassword"],
});
```
- **Local State:** kekuatan password terhitung real-time (`passwordStrength: "weak"|"medium"|"strong"`), toggle visibility dua field password, role terpilih menentukan field kondisional yang tampil.
- **Server State:** tidak ada fetch data pra-render selain cek sesi (agar pengguna yang sudah login diarahkan pergi dari halaman ini).
- **Form Handling:** `react-hook-form` + `zodResolver(registerSchema)`. Field `phone` diverifikasi UNIQUE oleh backend (kolom `USER.phone` unik+nullable) — error duplikat harus dipetakan ke field spesifik.
- Setelah submit sukses, state alur berpindah ke halaman `06_VERIFY_OTP` (verifikasi telepon) dan/atau `05_VERIFY_EMAIL`/`07_ACCOUNT_VERIFICATION_PENDING` tergantung metode registrasi.

## 5. API Endpoints Referenced
- `POST /api/v1/auth/register` — payload `{ name, email, phone, password, role }`, response JSend `{ status: "success", data: { user } }` atau error `VALIDATION_FAILED` (400) dengan `errors` per-field (mis. email/phone sudah terdaftar).
- OAuth: provider Google/Apple via Auth.js — akun baru otomatis dibuat/di-link ke tabel `ACCOUNT`; `passwordHash` tetap NULLABLE untuk akun OAuth-only.

## 6. Acceptance Criteria (DoD)
- [ ] Password strength meter memperbarui secara instan (tanpa perlu blur/submit) saat pengguna mengetik.
- [ ] Password umum seperti "password123" ditolak dengan pesan yang menjelaskan alasan, bukan hanya "password tidak valid".
- [ ] Duplikasi email atau nomor telepon menampilkan pesan merah tepat di field terkait (VALIDATION_FAILED per-field), bukan alert generik.
- [ ] Tombol "Daftar" nonaktif sampai checkbox Syarat & Ketentuan dicentang.
- [ ] Setelah registrasi berhasil via Email/Password, pengguna diarahkan ke alur verifikasi OTP telepon (`06_VERIFY_OTP`) sesuai kebijakan OTP wajib untuk registrasi.
- [ ] Registrasi via OAuth (Google/Apple) melewati langkah password namun tetap dapat diarahkan ke verifikasi telepon jika nomor belum diberikan.
- [ ] Tidak ada password atau token yang pernah tersimpan di localStorage/sessionStorage di sisi klien.
- [ ] Form dapat diselesaikan sepenuhnya dengan keyboard; label deskriptif untuk screen reader pada setiap input, termasuk indikator kekuatan password (`aria-live="polite"` untuk update strength meter).

## 7. Iconography Specification
- `User` — ikon kiri pada input Nama Lengkap.
- `Mail` — ikon kiri pada input Email.
- `Phone` — ikon kiri pada input Nomor Telepon.
- `Lock` — ikon kiri pada input Password/Konfirmasi Password.
- `Eye` / `EyeOff` — toggle visibilitas password, wajib `aria-label` karena interaktif (tidak `aria-hidden`).
- `CheckCircle2` — indikator kriteria password terpenuhi di strength meter (mis. "min 8 karakter ✓").

## 8. UI/UX Aesthetic Rules
Menggunakan Design System yang sama: White/Surface Light Gray/Royal Blue/Dark Navy, radius rounded-2xl/3xl, bayangan lembut, font Inter/SF Pro Display.
- Karena form Register lebih panjang dari Login, terapkan pengelompokan visual (spacing lebih besar antar section: Identitas → Kredensial → Persetujuan) agar tetap terasa ringan, selaras prinsip "Instant Clarity & Trust".
- Strength meter menggunakan warna status yang tenang (bukan merah menyala untuk "lemah") — gunakan gradasi Muted Cool Gray → Royal Blue → hijau emerald agar tidak terasa menghakimi pengguna, konsisten dengan aturan copy "jangan menyalahkan pengguna".

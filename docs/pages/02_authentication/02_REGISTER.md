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
- **Immersive Hero Panel (Desktop Only)**: Panel arsitektur premium di sisi kiri (`w-1/2`) dengan `bg-black/50` overlay, testimoni nyata, dan *trust badges* (sekelas Airbnb/Apple).
- **Floating Glass Auth Card**: Kontainer form dengan *glassmorphism* (`bg-white/70 backdrop-blur-md`), Elevasi 4 (`shadow-[0_24px_64px_rgb(0,0,0,0.16)]`), `rounded-2xl` padding tebal.
- **Progressive Registration Wizard (3 Langkah)**:
  - **Minimalist Stepper**: Indikator langkah (misal: "Langkah 1 dari 3") di atas form.
  - **Langkah 1: Peran (The Gateway)**: 3 Kartu Visual interaktif (Pencari Properti, Pemilik Properti, Mitra Surveyor) dengan deskripsi singkat. Tidak ada input teks.
  - **Langkah 2: Identitas (The Introduction)**: Input Nama Lengkap, Email, dan Nomor Telepon.
  - **Langkah 3: Keamanan (The Key)**: Input Password, Konfirmasi Password, Checkbox Syarat & Ketentuan.
- `Input` — Semua input menggunakan styling elegan (`border-slate-200`, `rounded-xl`, focus `ring-emerald-500`).
- **Indikator Kekuatan Password**: Bereaksi real-time tanpa menghakimi (abu-abu -> biru -> hijau emerald).
- `Button` (variant `default`) — "Selanjutnya" / "Bergabung dengan HomeLink" (`bg-slate-900` text white), transisi hover 200ms.
- **Prioritas SSO**: `Button` "Daftar dengan Google" / "Daftar dengan Apple" dengan border tipis dan ikon provider.
- Link teks — "Sudah punya akun? Masuk di sini" menuju `01_LOGIN`.

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
- **Local State (Wizard)**: `currentStep` (1, 2, atau 3) mengatur tampilan form. Pengguna tidak bisa lanjut ke Langkah 2 jika Langkah 1 (Role) kosong. Validasi harus terjadi per langkah (`trigger()` dari react-hook-form). Kekuatan password terhitung real-time (`passwordStrength`), toggle visibility password aktif.
- **Server State:** tidak ada fetch data pra-render selain cek sesi (agar pengguna yang sudah login diarahkan pergi dari halaman ini).
- **Form Handling:** `react-hook-form` + `zodResolver(registerSchema)`. Saat menekan "Selanjutnya", sistem memvalidasi *fields* spesifik pada langkah aktif sebelum beralih ke slide berikutnya. Field `phone` diverifikasi UNIQUE oleh backend.
- Setelah submit sukses di Langkah 3, state alur berpindah ke halaman `06_VERIFY_OTP` (verifikasi telepon) dan/atau `05_VERIFY_EMAIL`.

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
Mengikuti "The Exclusive Welcome" HomeLink 2.0:
- **Konsep Wizard**: Mengubah form panjang menjadi *Progressive Disclosure* 3 langkah. Hal ini secara drastis mengurangi beban kognitif pengguna dan membangun *engagement* secara bertahap.
- **Tipografi**: Heading `text-[36px] leading-[44px]` dan `text-[28px]` `font-semibold tracking-tight`. Teks sekunder warna `slate-500`.
- **Glassmorphism & Elevasi**: Latar form `bg-white/70 backdrop-blur-md border border-white/20` dengan Elevasi Tinggi (`shadow-[0_24px_64px_rgb(0,0,0,0.16)]`).
- **Transisi**: Animasi transisi antar langkah harus menggunakan *smooth slide* atau *fade* (`animate-in fade-in slide-in-from-right` durasi 300ms) agar terasa layaknya aplikasi *native* premium.
- Strength meter menggunakan warna status yang tenang (bukan merah menyala untuk "lemah") — gunakan gradasi abu-abu → biru → hijau emerald agar tidak terasa menghakimi pengguna.

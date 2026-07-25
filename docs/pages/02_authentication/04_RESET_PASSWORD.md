# RESET PASSWORD PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Reset Password
**Module:** 02 AUTHENTICATION
**Purpose:** Memungkinkan pengguna menetapkan password baru setelah memverifikasi identitas melalui tautan/kode reset yang diterima dari alur `03_FORGOT_PASSWORD`, lalu menutup sesi lama dan mewajibkan login ulang dengan kredensial baru.

## 2. Next.js Routing Path
```text
app/(02_authentication)/reset-password/page.tsx
```
Diakses melalui tautan berisi token reset (mis. `/reset-password?token=...`) yang dikirim ke email/WhatsApp pengguna. Halaman ini WAJIB dirender penuh (bukan modal), karena diakses dari luar konteks aplikasi (klik link eksternal) dan token pada query string perlu divalidasi di server sebelum form ditampilkan.

## 3. Required UI Components
- Guard state: pesan "Tautan tidak valid atau kedaluwarsa" + CTA "Minta tautan baru" (menuju `03_FORGOT_PASSWORD`) jika token invalid/expired — ditampilkan SEBELUM form, tanpa menampilkan form password sama sekali.
- `Input` — Password Baru (ikon `Lock`, trailing `Eye`/`EyeOff`) dengan **strength meter** yang sama seperti Register.
- `Input` — Konfirmasi Password Baru.
- `Button` (variant `default`) — "Simpan Password Baru", dengan `isLoading`.
- `Alert` sukses setelah reset berhasil, dengan CTA "Masuk ke Akun" menuju `01_LOGIN`.

## 4. Data & State Management
**Zod Schema (sketch):**
```ts
const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string()
    .min(8, "Password minimal 8 karakter.")
    .regex(/[A-Z]/, "Harus mengandung minimal 1 huruf besar.")
    .regex(/[0-9]/, "Harus mengandung minimal 1 angka.")
    .refine(pw => !["password123", "12345678"].includes(pw.toLowerCase()), "Password terlalu umum."),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: "Konfirmasi password tidak cocok.",
  path: ["confirmPassword"],
});
```
- **Local State:** `tokenStatus: "checking"|"valid"|"invalid"|"expired"` dicek saat halaman dimuat (sebelum form ditampilkan); toggle visibility dua field password; strength meter state.
- **Server State:** validasi token dilakukan di server (Server Component atau Route Handler) sebelum render form — mencegah flash-of-form untuk token yang sudah tidak valid.
- **Form Handling:** `react-hook-form` + `zodResolver(resetPasswordSchema)`; token disertakan sebagai hidden field/param, bukan diketik manual pengguna.
- Setelah sukses, seluruh sesi/refresh token lama milik akun tersebut idealnya di-invalidate (memaksa logout dari semua device) — perlu dikonfirmasi ke tim backend karena arsitektur JWT stateless tidak memiliki tabel Session untuk revoke; kemungkinan solusi: rotasi signing secret per-user atau versioning token, dicatat sebagai catatan teknis untuk tim backend, bukan diasumsikan sebagai diselesaikan.

## 5. API Endpoints Referenced
- **Catatan:** endpoint spesifik ini belum tercantum di `52_ENDPOINT_CATALOGUE.md`, disarankan ditambahkan sebagai `POST /api/v1/auth/reset-password` mengikuti konvensi modul Auth yang sudah ada (payload `{ token, password }`, response JSend sukses/`VALIDATION_FAILED` untuk password lemah, atau error khusus untuk token invalid/expired — kode error token perlu didefinisikan, kemungkinan bukan `VALIDATION_FAILED` melainkan kode dedicated seperti `TOKEN_INVALID`/`TOKEN_EXPIRED` yang juga belum ada di `54_*` error code catalogue).

## 6. Acceptance Criteria (DoD)
- [ ] Token invalid atau kedaluwarsa dideteksi SEBELUM form password ditampilkan; pengguna diarahkan ke pesan error + CTA minta tautan baru, tidak pernah melihat form kosong yang akan gagal saat submit.
- [ ] Password baru divalidasi dengan aturan yang identik dengan Register (8 karakter, 1 huruf besar, 1 angka, Argon2id di server, menolak password umum).
- [ ] Konfirmasi password yang tidak cocok menampilkan pesan di bawah field konfirmasi secara real-time (on blur) sebelum submit.
- [ ] Setelah reset berhasil, token/tautan reset tersebut tidak dapat digunakan kembali (single-use) — dicatat sebagai requirement backend.
- [ ] Setelah sukses, pengguna diarahkan ke Login dengan pesan konfirmasi, TIDAK otomatis login langsung (memastikan pengguna sadar password telah berubah).
- [ ] Halaman dapat dioperasikan penuh via keyboard; label deskriptif untuk screen reader pada kedua field password serta status strength meter.

## 7. Iconography Specification
- `Lock` — ikon kiri pada kedua input password.
- `Eye` / `EyeOff` — toggle visibilitas, wajib `aria-label` interaktif.
- `ShieldCheck` — ikon pada state sukses setelah password berhasil direset.
- `XCircle` — ikon pada state token invalid/expired.

## 8. UI/UX Aesthetic Rules
Konsisten dengan Design System: White/Royal Blue/Dark Navy, radius rounded-2xl/3xl, bayangan lembut.
- Karena halaman ini adalah titik kritis keamanan akun, prioritaskan kejelasan status (valid/invalid/sukses) di atas estetika — gunakan area pesan yang menonjol namun tetap tenang (bukan merah menyala penuh layar), selaras prinsip "Instant Clarity & Trust".
- State token invalid/expired harus terasa membantu, bukan menyalahkan — copy: "Tautan reset ini sudah tidak berlaku. Minta tautan baru untuk melanjutkan," bukan "Link rusak/error".

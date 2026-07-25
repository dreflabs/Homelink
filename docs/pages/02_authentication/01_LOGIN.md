# LOGIN PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Login
**Module:** 02 AUTHENTICATION
**Purpose:** Mengautentikasi pengguna terdaftar (Buyer, Owner, Surveyor, Admin) menggunakan kombinasi email/password atau OAuth (Google/Apple ID), lalu menerbitkan sesi JWT agar pengguna dapat mengakses fitur yang membutuhkan login (mis. booking survei, dashboard listing). Halaman ini juga menjadi titik masuk balik (redirect target) ketika Guest mencoba mengakses aksi yang memerlukan autentikasi (FR-BOOK-001).

## 2. Next.js Routing Path
```text
app/(02_authentication)/login/page.tsx
```
Sesuai `55_AUTHENTICATION_FLOW.md` dan `18_SCREEN_INVENTORY.md` (SCR-004), Login **utamanya dirender sebagai Auth Modal melalui Next.js Intercepting Routes** (`app/(02_authentication)/@modal/(.)login/page.tsx`) sehingga saat Guest men-trigger aksi terproteksi (mis. tombol "Booking Survei"), modal login tampil di atas halaman asal tanpa navigasi penuh — konteks halaman (properti yang sedang dilihat) tetap terjaga. Route penuh `/login` tetap ada sebagai fallback (direct link, refresh, share URL, atau saat JS dinonaktifkan).

## 3. Required UI Components
- `Dialog`/Modal container (untuk mode intercepted route) dengan animasi entrance medium spring (300-400ms, stiffness 300 damping 30), menghormati `prefers-reduced-motion`.
- `Input` — Email (left icon `Mail`), state default/hover/focus/error sesuai Design System.
- `Input` — Password (left icon `Lock`, trailing toggle icon `Eye`/`EyeOff`).
- `Checkbox` — "Ingat saya" (opsional, tidak memengaruhi TTL token karena token tetap stateless JWT).
- `Button` (variant `default`) — "Masuk", dengan `isLoading` prop menampilkan spinner dan menonaktifkan klik selama request berlangsung.
- `Button` (variant `outline`/`ghost`) — "Lanjutkan dengan Google" dan "Lanjutkan dengan Apple" (ikon provider, memicu OAuth 2.0 flow Auth.js).
- Link teks — "Lupa password?" menuju `03_FORGOT_PASSWORD`, dan "Belum punya akun? Daftar" menuju `02_REGISTER`.
- Inline alert banner (di atas form) untuk pesan lockout rate-limit.
- `Skeleton` untuk state pengecekan sesi awal (mencegah flicker saat auto-redirect pengguna yang sudah login).

## 4. Data & State Management
**Zod Schema (sketch):**
```ts
const loginSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid." }),
  password: z.string().min(1, { message: "Password wajib diisi." }),
});
```
- **Local State:** visibility toggle password (`showPassword: boolean`), jumlah percobaan gagal yang ditampilkan ke UI (opsional, untuk pesan peringatan sebelum lockout keras di server), `redirectTo` (query param/context dari halaman asal untuk kembali setelah login sukses — mendukung FR-BOOK-001).
- **Server State:** cek sesi aktif via Auth.js (`useSession`/server-side `auth()`) — jika sudah login, redirect otomatis sesuai role tanpa menampilkan form.
- **Form Handling:** `react-hook-form` + `zodResolver(loginSchema)`; submit memanggil credentials provider Auth.js yang meneruskan ke endpoint backend.
- Tidak ada token yang disimpan di localStorage atau dikirim balik dalam body JSON — sesi diterima sebagai HttpOnly, Secure, SameSite=Lax cookie oleh Auth.js.

## 5. API Endpoints Referenced
- `POST /api/v1/auth/login` — payload `{ email, password }`, response JSend `{ status: "success", data: { user } }` (token dikelola via cookie, tidak dikembalikan di body).
- OAuth: ditangani oleh Auth.js provider Google/Apple (bukan endpoint REST kustom `/api/v1`), hasil linking tersimpan di tabel `ACCOUNT`.
- `POST /api/v1/auth/logout` — dipanggil dari halaman lain, direferensikan di sini untuk konteks lifecycle sesi.

## 6. Acceptance Criteria (DoD)
- [ ] Setelah 5 kali percobaan login gagal dari IP yang sama dalam 15 menit, form dinonaktifkan dan menampilkan pesan lockout yang jelas (bukan generic "coba lagi") sesuai `58_RATE_LIMIT_SPECIFICATION.md`.
- [ ] Error `VALIDATION_FAILED` (400) menampilkan pesan merah tepat di bawah field yang salah (email/password), bukan alert generik di atas form.
- [ ] Error kredensial salah menampilkan pesan yang menjelaskan apa/mengapa/cara-perbaiki (mis. "Email atau password tidak cocok. Periksa kembali atau gunakan Lupa Password.") tanpa mengungkap field mana yang salah (keamanan).
- [ ] Saat dibuka sebagai modal (Intercepting Route), menutup modal (Esc atau klik luar) mengembalikan pengguna ke halaman asal tanpa full page reload; saat diakses via direct URL `/login`, halaman penuh tetap berfungsi identik.
- [ ] Setelah login sukses, pengguna diarahkan sesuai role (Buyer/Owner/Surveyor/Admin) dan, jika ada, ke `redirectTo` context sebelumnya (mendukung FR-BOOK-001).
- [ ] Tombol OAuth dan tombol submit menampilkan `isLoading` spinner dan mencegah double-submit.
- [ ] Seluruh form dapat dioperasikan penuh via keyboard, tanpa keyboard trap, fokus kembali logis saat modal ditutup.
- [ ] Kontras warna dan struktur form lolos audit aksesibilitas WCAG 2.1 AA.

## 7. Iconography Specification
**Library:** Lucide React only, `strokeWidth={1.5}`, 20px desktop / 24px mobile.
- `Mail` — ikon kiri pada input email, `aria-hidden="true"`.
- `Lock` — ikon kiri pada input password, `aria-hidden="true"`.
- `Eye` / `EyeOff` — toggle interaktif visibilitas password; karena berfungsi sebagai tombol, WAJIB memiliki `aria-label="Tampilkan password"`/`"Sembunyikan password"`, bukan `aria-hidden`.
- `AlertTriangle` — digunakan pada inline alert banner saat mendekati/mencapai rate-limit lockout.

## 8. UI/UX Aesthetic Rules
Mengikuti Design System HomeLink 2.0: Background White (#FFFFFF), Surface Light Gray (#F7F9FC), Primary Royal Blue (blue-700/#1D4ED8) untuk CTA utama, Heading/Text Dark Navy (slate-900, tidak pernah hitam pekat), Muted Cool Gray (slate-500) untuk teks sekunder, font Inter/SF Pro Display, radius rounded-2xl/3xl, bayangan ultra-lembut (diffused soft shadow).
- Sesuai prinsip "Instant Clarity & Trust" (`14_UX_BLUEPRINT.md`), Login harus terasa cepat dan tanpa gesekan: satu kolom, maksimal 2 field utama terlihat sekaligus, CTA utama selalu terlihat tanpa scroll di viewport modal.
- Karena ini titik masuk paling sering diakses, prioritaskan kejelasan pesan error di atas dekorasi — hindari copywriting playful; gunakan Bahasa Indonesia baku, tenang, profesional.

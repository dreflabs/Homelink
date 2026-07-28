# FORGOT PASSWORD PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Forgot Password
**Module:** 02 AUTHENTICATION
**Purpose:** Memungkinkan pengguna yang lupa password memasukkan email/nomor telepon terdaftar untuk memicu pengiriman tautan atau kode reset, sebagai langkah pertama dari alur pemulihan akun sebelum menuju `04_RESET_PASSWORD`.

## 2. Next.js Routing Path
```text
app/(02_authentication)/forgot-password/page.tsx
```
Halaman ini umumnya diakses via link teks dari Login modal ("Lupa password?"). Dapat dirender sebagai halaman penuh (bukan modal wajib) karena melibatkan konfirmasi pengiriman yang idealnya persisten (pengguna mungkin berpindah ke aplikasi email/WhatsApp).

> **Architectural Navigation & Modal Interception Isolation Note:**
> - **Mencegah Modal Overlay Tumpuk (Modal Stacking Bug):** Mengingat halaman ini tidak dirancang sebagai intercepted route modal, navigasi menuju `/forgot-password` dari dalam modal Login secara langsung menutup slot `@modal` (didukung rute pembersih `app/[locale]/@modal/forgot-password/page.tsx` dan `[...catchAll]/page.tsx` yang merender `null`).
> - **Direct Anchor Transition:** Tautan keluar dari halaman Forgot Password (seperti "Kembali ke Login") menggunakan navigasi langsung (`<a href="/{locale}/login">`) alih-alih komponen Next.js `<Link>`, guna mencegah sistem *Parallel Routes Interceptor* Next.js memicu pembukaan popup modal Login di atas layar penuh Forgot Password.

## 3. Required UI Components
- **Immersive Hero Panel (Desktop Only)**: Sama dengan halaman Login, panel di sisi kiri (`w-1/2`) dengan gambar arsitektural properti premium, overlay gelap (`bg-black/50`), dan teks edukasi keamanan ("Sistem Keamanan Tingkat Bank").
- **Floating Glass Auth Card**: Kontainer form di sisi kanan dengan efek *glassmorphism* (`bg-white/80 backdrop-blur-md`), Elevasi 4 (`shadow-[0_24px_64px_rgb(0,0,0,0.16)]`), dan `rounded-3xl` padding tebal.
- `Input` — Email atau Nomor Telepon (ikon `Mail` atau `Phone`), radius `rounded-xl`, focus `ring-emerald-500`.
- `Button` (variant `default`) — "Kirim Instruksi Reset" (`bg-slate-900` text white), transisi hover 200ms, dengan `isLoading`.
- `Alert`/Banner sukses — muncul setelah submit, desain *sleek* menggantikan form.
- Link teks — "Kembali ke Login" menuju `01_LOGIN`.
- Tidak ada `Skeleton` loading data karena halaman ini tidak melakukan fetch data awal.

## 4. Data & State Management
**Zod Schema (sketch):**
```ts
const forgotPasswordSchema = z.object({
  identifier: z.string().min(1, "Email atau nomor telepon wajib diisi.")
    .refine(v => z.string().email().safeParse(v).success || /^(\+62|0)[0-9]{9,13}$/.test(v),
      "Masukkan email atau nomor telepon yang valid."),
});
```
- **Local State:** `submitted: boolean` untuk mengganti tampilan form menjadi pesan konfirmasi setelah dikirim; `cooldownSeconds` opsional jika ingin mencegah spam klik ulang di sisi klien (defense-in-depth di atas rate limit server).
- **Server State:** tidak ada fetch awal; hanya POST request saat submit.
- **Form Handling:** `react-hook-form` + `zodResolver`. Respons sukses SELALU ditampilkan generik ("Jika akun terdaftar, instruksi telah dikirim") terlepas dari apakah identifier benar-benar terdaftar — mencegah user enumeration.

## 5. API Endpoints Referenced
- **Catatan:** endpoint spesifik ini belum tercantum di `52_ENDPOINT_CATALOGUE.md`, disarankan ditambahkan sebagai `POST /api/v1/auth/forgot-password` mengikuti konvensi modul Auth yang sudah ada (payload `{ identifier }`, response JSend generik tanpa membocorkan keberadaan akun).
- Rate limit yang relevan mengikuti prinsip yang sama dengan OTP request (`58_RATE_LIMIT_SPECIFICATION.md`: maks 3 request/nomor/jam) — perlu dikonfirmasi apakah forgot-password memakai limit terpisah atau limit OTP yang sama, karena keduanya berpotensi mengirim kode ke saluran yang sama (WhatsApp/SMS/email).

## 6. Acceptance Criteria (DoD)
- [ ] Setelah submit, pesan konfirmasi yang ditampilkan **tidak pernah** membedakan "akun ditemukan" vs "akun tidak ditemukan" — selalu pesan generik yang sama demi keamanan (mencegah enumeration akun).
- [ ] Tombol submit menampilkan `isLoading` dan dinonaktifkan selama request, mencegah pengiriman ganda.
- [ ] Jika rate limit tercapai, tampilkan pesan yang menjelaskan kapan bisa mencoba lagi (apa/mengapa/cara-perbaiki), bukan pesan error mentah dari server.
- [ ] Setelah sukses, tersedia CTA jelas untuk kembali ke Login, serta petunjuk untuk memeriksa folder spam/SMS jika instruksi tidak diterima dalam beberapa menit.
- [ ] Field identifier divalidasi format (email atau telepon) sebelum submit; error validasi tampil di bawah field sesuai `VALIDATION_FAILED`.
- [ ] Halaman dapat dioperasikan penuh via keyboard; label deskriptif untuk screen reader pada field identifier.

## 7. Iconography Specification
- `Mail` — ikon input saat mode Email dipilih.
- `Phone` — ikon input saat mode Nomor Telepon dipilih.
- `SendHorizontal` — ikon pada tombol submit ("Kirim Instruksi Reset") untuk memperkuat afirmasi aksi pengiriman.
- `MailCheck` — ikon pada state konfirmasi sukses setelah instruksi terkirim.

## 8. UI/UX Aesthetic Rules
Mengikuti "The Exclusive Welcome" HomeLink 2.0:
- **Konsep**: Seperti Login dan Register, halaman ini harus menenangkan dan elegan (Apple/Airbnb).
- **Tipografi**: Heading `text-[28px] leading-[36px] font-semibold tracking-tight`. Teks sekunder warna `slate-500`.
- **Glassmorphism & Elevasi**: Latar form `bg-white/80 backdrop-blur-xl border border-white/40` dengan Elevasi Tinggi (`shadow-[0_24px_64px_rgb(0,0,0,0.16)]`).
- Halaman ini rawan menjadi titik cemas pengguna (lupa akses akun) — terapkan prinsip "Instant Clarity & Trust" dengan nada tenang dan meyakinkan, hindari kesan darurat/alarming; copy harus menenangkan ("Jangan khawatir, kami akan bantu Anda mengakses kembali akun").

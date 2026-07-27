# SETTINGS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Settings (Pengaturan)
**Module:** 06 OWNER DASHBOARD
**Role:** Owner
**Purpose:** Memungkinkan Owner mengelola preferensi akun pribadi — profil dasar, kata sandi/keamanan, dan preferensi notifikasi (mis. pemberitahuan booking baru, update status verifikasi). Halaman ini bersifat lintas-properti (bukan per-listing), berbeda dari halaman-halaman lain di modul ini.

## 2. Next.js Routing Path
```text
app/(dashboard)/owner/settings/page.tsx
```
Sidebar label: "Pengaturan" (per `20_NAVIGATION_MAP.md`).

## 3. Required UI Components (Shadcn/ui)
- `Tabs` — sub-bagian pengaturan: Profil, Keamanan, Notifikasi.
- `Form` (react-hook-form) — Tab Profil: nama, nomor telepon, foto profil (avatar upload).
- `Form` (Tab Keamanan) — ubah kata sandi (password lama, baru, konfirmasi) dengan validasi kekuatan password.
- `Switch` — Tab Notifikasi: toggle per jenis notifikasi (Booking Baru, Update Status Verifikasi, Promosi).
- `Avatar` + `Dropzone` (single image) — unggah/ubah foto profil.
- `AlertDialog` — konfirmasi sebelum menyimpan perubahan kata sandi.
- `Skeleton` — loading state saat data profil awal di-fetch.

## 4. Data & State Management
- **Server State:** Fetch data profil Owner yang login (`session.userId`) — entitas pengguna dasar (di luar cakupan `PROPERTY`/`BOOKING`/`VERIFICATION_AUDIT` pada `40_ERD.md` module ini; merujuk ke entitas User/Account di modul autentikasi terpisah, bukan bagian dari skema Owner Dashboard).
- **Local State:** Tab aktif (`profile | security | notifications`) di URL search params; state form terpisah per tab agar validasi satu tab tidak memblokir submit tab lain.
- **Zod Schema (Profil, bentuk garis besar):**
```ts
const ownerProfileSchema = z.object({
  fullName: z.string().min(3).max(100),
  phoneNumber: z.string().regex(/^\+?[0-9]{9,15}$/),
  avatarUrl: z.string().url().optional(),
});
```
- **Zod Schema (Keamanan):**
```ts
const changePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  confirmPassword: z.string(),
}).refine(d => d.newPassword === d.confirmPassword, { message: "Konfirmasi tidak cocok", path: ["confirmPassword"] });
```

## 5. API Endpoints Referenced
- Endpoint pengelolaan profil/keamanan pengguna berada di luar cakupan katalog endpoint modul Owner Dashboard (`PROPERTY`/`BOOKING`/`VERIFICATION_AUDIT`) — merujuk ke endpoint modul Autentikasi/User Management (mis. `PATCH /api/v1/users/me`, `POST /api/v1/users/me/password`) yang didokumentasikan secara terpisah di luar modul `06_owner_dashboard`. Halaman ini TIDAK memanggil endpoint `PROPERTY`/`BOOKING` sama sekali.
- `POST /api/v1/media/presigned-url` — dapat digunakan kembali untuk unggah foto profil ke Cloudflare R2.

## 6. Acceptance Criteria (DoD)
- [ ] Owner hanya dapat mengubah data akunnya sendiri — endpoint profil selalu beroperasi atas `session.userId`, tidak menerima `userId` dari body/query client (BOLA prevention).
- [ ] Perubahan kata sandi memerlukan verifikasi password lama yang benar sebelum diterima server.
- [ ] Toggle notifikasi tersimpan segera (auto-save per toggle) tanpa memerlukan tombol "Simpan" terpisah, dengan feedback visual instan.
- [ ] Form profil menampilkan pesan validasi inline yang jelas untuk setiap field yang gagal validasi Zod.
- [ ] Upload foto profil menampilkan preview sebelum disimpan dan progress saat mengunggah.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `Settings`
- **Purpose:** Ikon menu sidebar "Pengaturan".
- **Size:** 20px (desktop), 24px (mobile). **Color:** `text-blue-700` saat aktif.

#### Icon: `UserCircle`
- **Purpose:** Tab "Profil".
- **Size:** 18px.

#### Icon: `ShieldCheck`
- **Purpose:** Tab "Keamanan".
- **Size:** 18px.

#### Icon: `Bell`
- **Purpose:** Tab "Notifikasi".
- **Size:** 18px.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.3 Owner Dashboard for the full workspace design system. Page-specific deltas below:

- **Layout:** Sidebar tab vertikal di kiri (desktop) menampilkan 3 sub-bagian; horizontal `Tabs` di atas konten (mobile).
- **Background:** `White` dengan card per section `rounded-2xl`, dipisah oleh whitespace lega antar section.
- **Warna Aksi:** Tombol simpan `Royal Blue` solid; tombol destruktif (jika ada, mis. hapus akun) menggunakan `red-500` dan selalu memerlukan `AlertDialog` konfirmasi.
- **Avatar Upload:** Lingkaran avatar besar (96px) dengan overlay ikon kamera saat hover, mengikuti estetika Apple-inspired minimal.

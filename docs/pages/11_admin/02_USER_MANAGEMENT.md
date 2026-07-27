# USER MANAGEMENT PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** User Management
**Module:** 11 ADMIN
**Purpose:** Memberi Admin kemampuan mencari, meninjau, dan menindak akun `USER` (semua role: GUEST, BUYER, OWNER, ADMIN, SURVEYOR) untuk penegakan Terms of Service. Fokus utama: suspend akun atas pelanggaran berat (KTP palsu, penipuan) sesuai SOP `88_ADMIN_MANUAL.md` §4.1-4.2, dengan jejak bukti (evidence) wajib dilampirkan sebelum eksekusi. Halaman ini BUKAN tempat mengubah password user — hanya mengirim tautan reset.

## 2. Next.js Routing Path
```text
app/(dashboard)/11_admin/user-management/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `DataTable` — daftar user dengan kolom: nama, email, role (Badge), status akun (Aktif/Suspended), tanggal daftar (`createdAt`), tanggal verifikasi email (`isEmailVerified`).
- `Input` (search bar) — pencarian by nama/email/phone.
- `Select` (filter) — filter by `role` (GUEST/BUYER/OWNER/ADMIN/SURVEYOR) dan status akun.
- `Dialog` (Suspend Modal) — form suspend berisi `Textarea` "Catatan Bukti" (wajib, screenshot/URL bukti) + tombol konfirmasi destruktif.
- `Badge` — status role (warna berbeda per role) dan status akun (hijau=Aktif, merah=Suspended).
- `Button` (variant outline) — "Kirim Tautan Reset Password" per baris user (bukan set password langsung).
- `Skeleton` — loading state tabel saat fetch server-side pagination.

## 4. Data & State Management
- **Fields dari ERD:** `USER.id, email, phone, name, role, isEmailVerified, createdAt, updatedAt`. Tidak ada kolom `suspended`/`suspendedAt` eksplisit di `40_ERD.md` saat ini — **GAP: perlu penambahan field status akun (mis. `accountStatus` enum ACTIVE/SUSPENDED) ke entitas `USER`** agar aksi suspend memiliki state persisten.
- **Local State:** baris user yang dipilih (`selectedUserId`), draft teks pada `Textarea` Catatan Bukti (harus non-kosong sebelum tombol submit aktif), state buka/tutup Dialog.
- **Server State:** RSC fetch daftar user dengan cursor pagination + query params search/filter; setiap aksi suspend memicu `revalidatePath`.
- **Audit trail:** Setiap aksi suspend WAJIB dicatat sebagai entri baru di `AUDIT_LOG` (actorId = Admin, action = "USER_SUSPENDED", entityId = userId, newValues berisi catatan bukti) per `67_AUDIT_LOGGING.md`.

## 5. API Endpoints Referenced
- **GAP — belum ada di `52_ENDPOINT_CATALOGUE.md`, diusulkan:**
  - `GET /api/v1/admin/users` (cursor pagination, query: search, role, status) — list & search user.
  - `PATCH /api/v1/admin/users/:id/suspend` (body wajib: `{ note: string }`) — suspend akun, menolak request jika `note` kosong.
  - `PATCH /api/v1/admin/users/:id/reactivate` — pembatalan suspend.
  - `POST /api/v1/admin/users/:id/send-password-reset` — mengirim tautan reset password ke email user (Admin TIDAK PERNAH memanggil endpoint yang men-set password secara langsung).

## 6. Acceptance Criteria (DoD)
- [ ] Aksi Suspend tidak dapat disubmit jika field "Catatan Bukti" kosong (validasi Zod, pesan error jelas).
- [ ] Admin tidak diberi UI apapun untuk mengetik/mengeset password user secara langsung — satu-satunya aksi terkait kredensial adalah "Kirim Tautan Reset Password" (per `63_AUTHORIZATION_SECURITY.md` §4.3 Administrative Boundaries).
- [ ] Setiap aksi suspend/reactivate tercatat di `AUDIT_LOG` dengan actorId, entityId, dan nilai lama/baru.
- [ ] Tabel & modal sepenuhnya dapat dioperasikan via keyboard (fokus terlihat jelas, tidak bergantung pada hover).
- [ ] Pencarian & filter tidak menyebabkan full page reload (client-side transition + RSC streaming).

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `Users`
- **Purpose:** Header halaman User Management. **Size:** 22px. **Color:** `text-blue-700`.

#### Icon: `Ban`
- **Purpose:** Tombol aksi "Suspend" pada tiap baris tabel — menandakan tindakan destruktif/penegakan aturan.
- **Size:** 18px. **Color:** `text-red-600`. **Hover:** background `bg-red-50` pada tombol.

#### Icon: `KeyRound`
- **Purpose:** Tombol "Kirim Tautan Reset Password" — menegaskan ini bukan set-password langsung.
- **Size:** 18px. **Color:** `text-slate-500`.

#### Icon: `ShieldAlert`
- **Purpose:** Indikator baris user dengan riwayat pelanggaran (opsional badge di dekat nama).
- **Size:** 16px. **Color:** `text-amber-600`. **Accessibility:** disertai tooltip teks, `aria-hidden` pada ikon itu sendiri.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.8 Admin Dashboard for the full workspace design system. Page-specific deltas below:

Mengikuti Design System global: background `White`, aksi utama `Royal Blue` (`blue-700`), teks `slate-900`, surface sekunder `slate-50`, shadow ultra-lembut, radius `rounded-2xl`/`rounded-3xl`.

**Catatan kepadatan khusus Admin:** Tabel menggunakan baris kompak (row height ~48px) agar banyak user terlihat tanpa scroll berlebihan. Aksi destruktif (Suspend) selalu memakai warna merah dan modal konfirmasi dua-langkah (isi bukti → klik konfirmasi) — tidak pernah aksi satu-klik. Tidak ada pola bulk-select untuk suspend (aksi ini sengaja dibuat granular per-user untuk mencegah kesalahan massal).

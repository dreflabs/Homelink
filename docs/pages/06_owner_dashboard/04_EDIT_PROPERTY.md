# EDIT PROPERTY PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Edit Property
**Module:** 06 OWNER DASHBOARD
**Role:** Owner
**Purpose:** Memungkinkan Owner memperbarui detail properti miliknya yang sudah terdaftar. Berbeda dari Add Property, halaman ini adalah form tunggal (bukan stepped) yang PRA-ISI (pre-filled) dari data existing, dan mengunci field tertentu jika properti sudah mencapai status verifikasi tinggi untuk mencegah penyalahgunaan (mis. mengubah alamat setelah `FULLY_VERIFIED` tanpa memicu re-verifikasi).

## 2. Next.js Routing Path
```text
app/(dashboard)/owner/properties/[propertyId]/edit/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Form` (react-hook-form, pre-filled via `defaultValues` dari `GET /api/v1/properties/:id`) — field `title`, `description`, `price`, `propertyType`.
- `Alert` (banner, varian warning) — ditampilkan di atas form jika `PROPERTY.status === 'FULLY_VERIFIED'`, menjelaskan bahwa perubahan pada field sensitif (alamat, koordinat, dokumen legal) akan mereset status ke `PENDING` dan memicu re-verifikasi.
- `Input` (read-only styling) — field `address`/koordinat dikunci (disabled + ikon gembok) kecuali Owner menekan tombol "Ubah Lokasi" eksplisit yang memunculkan konfirmasi dampak re-verifikasi.
- `Dropzone` — tambah/hapus foto (reuse komponen dari Add Property), tidak memicu re-verifikasi karena foto bukan bagian dari legal check.
- `Button` (Simpan Perubahan / Batal).
- `Skeleton` — saat data properti awal sedang di-fetch.

## 4. Data & State Management
- **Server State:** `GET /api/v1/properties/:id` untuk memuat data awal (RSC), dengan verifikasi wajib `ownerId === session.userId` di server sebelum data dikembalikan — jika tidak cocok, response 403/404 (jangan bocorkan keberadaan properti Owner lain).
- **Local State:** `isLocationLocked` (boolean, default `true` jika status bukan `PENDING`/`REJECTED`), toggle oleh tombol "Ubah Lokasi".
- **Zod Schema:** identik dengan `03_ADD_PROPERTY.md` namun seluruh field bersifat `.partial()` (PATCH parsial) — hanya field yang diubah Owner yang dikirim.
- **Mutation:** `PATCH /api/v1/properties/:id`, menggunakan optimistic update dengan rollback jika request gagal.

## 5. API Endpoints Referenced
- `GET /api/v1/properties/:id` — memuat data untuk pre-fill form.
- `PATCH /api/v1/properties/:id` — Owner mengedit listing miliknya sendiri. Server WAJIB memvalidasi ulang `ownerId: session.userId` pada query update (BOLA prevention) — ID di URL path tidak pernah dipercaya sendirian.
- `POST /api/v1/media/presigned-url` — jika Owner menambah foto baru saat edit.

## 6. Acceptance Criteria (DoD)
- [ ] Form ter-pre-fill benar dari data properti existing tanpa flicker/hydration mismatch.
- [ ] Jika `status === 'FULLY_VERIFIED'`, banner peringatan re-verifikasi tampil dan field lokasi/legal terkunci secara default.
- [ ] Owner tidak dapat mengedit properti milik Owner lain — mencoba mengakses `[propertyId]` milik Owner lain menghasilkan 403/404, bukan data ter-render (BOLA test wajib).
- [ ] Payload `PATCH` hanya berisi field yang benar-benar berubah (bukan seluruh objek).
- [ ] Perubahan pada field lokasi/dokumen legal memicu perubahan `status` kembali ke `PENDING` di server (dikonfirmasi via dialog sebelum submit).
- [ ] Toast konfirmasi sukses setelah simpan, dengan redirect kembali ke `02_MY_PROPERTY.md` atau tetap di halaman dengan data ter-refresh.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `Lock`
- **Purpose:** Menandai field lokasi/legal yang terkunci karena status sudah terverifikasi.
- **Size:** 16px, `text-amber-600`.

#### Icon: `AlertTriangle`
- **Purpose:** Ikon pada banner peringatan re-verifikasi.
- **Size:** 20px, `text-amber-600`.

#### Icon: `Save`
- **Purpose:** Tombol "Simpan Perubahan".
- **Size:** 18px, selalu didampingi label teks.

#### Icon: `Undo2`
- **Purpose:** Tombol "Batal" untuk membatalkan perubahan yang belum disimpan.
- **Size:** 18px.

## 8. UI/UX Aesthetic Rules (Mockup Reference)
- **Banner Peringatan:** Background `amber-50`, border `amber-200`, teks `slate-900`, `rounded-2xl`, ikon di kiri.
- **Field Terkunci:** Background `slate-50`, cursor `not-allowed`, opacity teks sedikit diturunkan namun tetap kontras cukup untuk WCAG AA.
- **Layout:** Single-column form dengan section headers ("Informasi Dasar", "Lokasi", "Media") dipisah oleh divider `slate-100`.
- **Warna Aksi:** Tombol simpan `Royal Blue` solid, aktif hanya jika ada perubahan (`isDirty` dari react-hook-form).

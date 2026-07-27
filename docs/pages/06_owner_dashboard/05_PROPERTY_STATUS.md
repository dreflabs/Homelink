# PROPERTY STATUS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Property Status (Status Verifikasi)
**Module:** 06 OWNER DASHBOARD
**Role:** Owner
**Purpose:** Menampilkan riwayat/timeline lengkap proses verifikasi sebuah properti, bersumber dari entitas `VERIFICATION_AUDIT` (field `action`: `APPROVED_PHYSICAL` / `REJECTED_LEGAL`, dll., beserta `notes` dari Surveyor). Memberi Owner visibilitas transparan atas alasan penolakan atau tahap verifikasi yang telah dilalui, sesuai alur di `07_BUSINESS_PROCESS_DOCUMENT.md` (Admin sanity check → Surveyor assignment by ZIP → inspeksi fisik + GPS → sertifikat legal → `FULLY_VERIFIED`).

## 2. Next.js Routing Path
```text
app/(dashboard)/owner/properties/[propertyId]/status/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `VerticalTimeline` (custom component) — setiap entri `VERIFICATION_AUDIT` dirender sebagai satu titik pada garis waktu vertikal, terurut kronologis (terbaru di atas), menampilkan `action`, `surveyorId` (nama Surveyor jika di-resolve), `notes`, dan timestamp.
- `Badge` (status besar di header halaman) — menampilkan `PROPERTY.status` saat ini secara prominent.
- `Card` — ringkasan properti (judul, alamat, foto utama) di atas timeline sebagai konteks.
- `Alert` (varian destructive) — muncul otomatis di atas timeline jika entri terbaru adalah `REJECTED_LEGAL` atau status `REJECTED`, merangkum alasan penolakan dan langkah perbaikan yang disarankan.
- `Skeleton` — loading state timeline.
- `Empty State` — jika properti baru saja dibuat dan belum ada entri `VERIFICATION_AUDIT` (masih `PENDING`, menunggu sanity check Admin).

## 4. Data & State Management
- **Server State:** `GET /api/v1/properties/:id` (untuk `status` dan info dasar properti) dikombinasikan dengan data `VERIFICATION_AUDIT` terkait `propertyId`.
- **Endpoint gap:** Katalog endpoint saat ini (`52_ENDPOINT_CATALOGUE.md`) belum secara eksplisit mendaftarkan endpoint baca untuk `VERIFICATION_AUDIT` per properti secara terpisah dari objek properti utama — direkomendasikan `GET /api/v1/properties/:id/verification-audit` sebagai endpoint turunan agar timeline tidak perlu memuat seluruh payload properti berulang kali. Ini BUKAN gap skema (entitas `VERIFICATION_AUDIT` sudah ada di `40_ERD.md`), melainkan gap katalog endpoint yang perlu ditambahkan.
- **Local State:** Tidak ada form; halaman murni read-only bagi Owner (Owner tidak dapat mengedit entri audit — itu wewenang Surveyor/Admin).

## 5. API Endpoints Referenced
- `GET /api/v1/properties/:id` — status terkini properti; server memverifikasi `ownerId` cocok sebelum mengembalikan data.
- `GET /api/v1/properties/:id/verification-audit` *(diusulkan — belum ada di katalog endpoint saat ini, perlu ditambahkan ke `52_ENDPOINT_CATALOGUE.md` untuk mengambil daftar entri `VERIFICATION_AUDIT`)*.

## 6. Acceptance Criteria (DoD)
- [ ] Timeline membedakan secara visual jelas antara aksi positif (`APPROVED_PHYSICAL`, dan setara legal) dan aksi negatif (`REJECTED_LEGAL`) — warna ikon, bukan hanya teks, agar tidak bergantung pada warna semata (WCAG 1.4.1).
- [ ] Entri timeline terurut kronologis dan menampilkan `notes` dari Surveyor apa adanya (tidak diringkas/dipotong tanpa opsi "lihat selengkapnya").
- [ ] Jika status `REJECTED`, banner ringkasan alasan penolakan tampil di posisi paling atas, sebelum timeline detail.
- [ ] Owner hanya dapat melihat status verifikasi properti miliknya sendiri (`ownerId` check di server, BOLA test wajib).
- [ ] Empty state untuk properti yang baru `PENDING` tanpa entri audit menjelaskan estimasi proses berikutnya ("Menunggu penugasan Surveyor").

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `CheckCircle2`
- **Purpose:** Menandai entri timeline dengan `action = APPROVED_PHYSICAL` (atau setara approval legal).
- **Size:** 20px, `text-green-600`.

#### Icon: `XCircle`
- **Purpose:** Menandai entri timeline dengan `action = REJECTED_LEGAL`.
- **Size:** 20px, `text-red-500`.

#### Icon: `Clock`
- **Purpose:** Menandai status `PENDING` yang masih menunggu tindakan berikutnya (belum ada entri audit terkait).
- **Size:** 20px, `text-amber-500`.

#### Icon: `ShieldCheck`
- **Purpose:** Ikon badge status `FULLY_VERIFIED` di header halaman.
- **Size:** 24px, `text-green-600`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.3 Owner Dashboard for the full workspace design system. Page-specific deltas below:

- **Timeline:** Garis vertikal tipis `slate-200` menghubungkan titik-titik status, masing-masing titik berupa lingkaran berisi ikon dengan warna sesuai jenis aksi.
- **Card Ringkasan Properti:** `rounded-2xl`, di-*pin* (sticky) di bagian atas pada desktop saat timeline panjang di-scroll.
- **Banner Penolakan:** Background `red-50`, border `red-200`, teks `slate-900`, ikon `XCircle` merah di kiri.
- **Warna Status Badge:** PENDING (`amber-500`), PHYSICAL_VERIFIED/LEGAL_VERIFIED (`blue-500`), FULLY_VERIFIED (`green-600`), REJECTED (`red-500`) — konsisten di seluruh modul Owner Dashboard.

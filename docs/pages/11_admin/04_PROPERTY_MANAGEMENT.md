# PROPERTY MANAGEMENT PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Property Management
**Module:** 11 ADMIN
**Purpose:** Memberi Admin pandangan menyeluruh (*full inventory view*) atas seluruh listing `PROPERTY` di platform lintas status — termasuk yang sudah `FULLY_VERIFIED` dan live, bukan hanya yang sedang menunggu aksi. Berbeda dari `05_VERIFICATION_QUEUE.md` yang berorientasi aksi (Approve/Reject item yang antre), halaman ini berorientasi *browsing & housekeeping*: mencari properti tertentu, meninjau riwayat status, dan menindak listing yang sudah live namun perlu ditangguhkan (mis. laporan penipuan pasca-publikasi).

## 2. Next.js Routing Path
```text
app/(dashboard)/11_admin/property-management/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `DataTable` — kolom: judul properti, nama Owner, tipe (`propertyType`), harga, status (`Badge` warna sesuai enum PENDING/REJECTED/PHYSICAL_VERIFIED/LEGAL_VERIFIED/FULLY_VERIFIED), tanggal dibuat.
- `Select` (filter status) — filter dropdown multi-select berdasarkan seluruh nilai enum `PROPERTY.status`.
- `Input` (search) — cari berdasarkan judul/alamat/nama Owner.
- `Sheet`/`Drawer` (Detail Panel) — klik baris membuka panel detail read-only: deskripsi, media (`PROPERTY_MEDIA` — foto & sertifikat PDF), lokasi (lat/long pada mini map).
- `DropdownMenu` (row actions) — "Lihat Detail", "Tangguhkan Listing" (untuk properti live yang dilaporkan), "Buka di Verification Queue" (jika status belum final).
- `Skeleton` — loading state tabel.

## 4. Data & State Management
- **Fields dari ERD:** `PROPERTY(id, ownerId, title, description, price, propertyType, status, address, latitude, longitude, embeddingVector)`, relasi ke `PROPERTY_MEDIA(propertyId, mediaType, s3Url, isPrimary)` untuk pratinjau media di detail panel.
- **Local State:** filter status aktif, query pencarian, baris yang dipilih untuk detail panel, state buka/tutup Sheet.
- **Server State:** RSC fetch daftar properti dengan cursor pagination + filter status/search via query params.
- **Perbedaan dari Verification Queue:** halaman ini TIDAK memiliki state "rejection reason draft" karena aksi Approve/Reject verifikasi awal terjadi di `05_VERIFICATION_QUEUE.md`; halaman ini hanya menangani "Tangguhkan" (suspend listing pasca-live), yang merupakan aksi housekeeping terpisah.

## 5. API Endpoints Referenced
- `GET /api/v1/properties?status=&search=` — list & filter seluruh properti (endpoint sudah ada, perlu dipastikan mendukung query `search` dan multi-status filter).
- `PATCH /api/v1/properties/:id/status` — dipakai ulang untuk aksi "Tangguhkan Listing" (mis. set status kembali ke PENDING/REJECTED dengan catatan), Admin-only per `56_AUTHORIZATION_MATRIX.md`.
- **GAP:** Tidak ada endpoint khusus "suspend listing pasca-live" yang terpisah dari alur verifikasi awal — perlu diklarifikasi apakah `PATCH /api/v1/properties/:id/status` cukup fleksibel menerima transisi mundur (FULLY_VERIFIED → REJECTED) atau dibutuhkan endpoint baru `PATCH /api/v1/admin/properties/:id/takedown`.

## 6. Acceptance Criteria (DoD)
- [ ] Filter status mendukung semua 5 nilai enum `PROPERTY.status` dan dapat dikombinasikan dengan pencarian teks.
- [ ] Detail panel menampilkan seluruh `PROPERTY_MEDIA` terkait termasuk sertifikat (`PDF_CERTIFICATE`) dengan penanda `isPrimary` yang jelas.
- [ ] Aksi "Tangguhkan Listing" pada properti berstatus `FULLY_VERIFIED` memunculkan dialog konfirmasi terpisah dari alur reject verifikasi biasa.
- [ ] Tabel & Sheet detail sepenuhnya dapat dioperasikan via keyboard.
- [ ] Halaman ini tidak menduplikasi tombol Approve/Reject milik `05_VERIFICATION_QUEUE.md` — hanya menaut ("Buka di Verification Queue") untuk item yang belum final.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `Building`
- **Purpose:** Header halaman Property Management (ikon inventory, berbeda dari `ClipboardCheck` milik Verification Queue).
- **Size:** 22px. **Color:** `text-blue-700`.

#### Icon: `Search`
- **Purpose:** Ikon pada input pencarian properti.
- **Size:** 18px. **Color:** `text-slate-500`.

#### Icon: `MapPin`
- **Purpose:** Penanda lokasi pada detail panel (lat/long).
- **Size:** 16px. **Color:** `text-blue-700`.

#### Icon: `SlidersHorizontal`
- **Purpose:** Tombol pembuka filter status.
- **Size:** 18px. **Color:** `text-slate-500`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.8 Admin Dashboard for the full workspace design system. Page-specific deltas below:

Mengikuti Design System global: background `White`, aksi utama `Royal Blue` (`blue-700`), teks `slate-900`, surface sekunder `slate-50`, shadow ultra-lembut, radius `rounded-2xl`/`rounded-3xl`.

**Catatan kepadatan khusus Admin:** Tabel memakai baris kompak dengan Badge status berkode warna konsisten (PENDING=amber, REJECTED=merah, PHYSICAL_VERIFIED/LEGAL_VERIFIED=biru muda sebagai status transisi, FULLY_VERIFIED=hijau). Detail panel (Sheet) dibuka dari sisi kanan agar konteks tabel tetap terlihat — pola ini konsisten dengan kebutuhan Admin untuk membandingkan banyak listing berturut-turut tanpa kehilangan posisi scroll tabel.

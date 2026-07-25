# DOCUMENTS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Documents (Dokumen Properti)
**Module:** 06 OWNER DASHBOARD
**Role:** Owner
**Purpose:** Pusat pengelolaan dokumen terkait properti milik Owner — saat ini di skema Phase 1 hanya mencakup sertifikat kepemilikan (`PROPERTY_MEDIA.mediaType = PDF_CERTIFICATE`), namun kebutuhan produk mencakup dokumen lain yang lebih luas (dokumen pajak/PBB, akta jual-beli, dsb.) yang belum dimodelkan secara eksplisit di skema saat ini.

## 2. Next.js Routing Path
```text
app/(dashboard)/owner/properties/[propertyId]/documents/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Table`/`List` — daftar dokumen dengan kolom: Nama Dokumen, Jenis, Tanggal Unggah, Aksi (Lihat/Unduh/Hapus).
- `Dropzone` (single/multi PDF) — unggah dokumen baru (reuse pola dari `03_ADD_PROPERTY.md`).
- `Badge` — jenis dokumen (mis. "Sertifikat Legal", "Pajak", "Lainnya" — kategori "Pajak"/"Lainnya" memerlukan perluasan skema, lihat catatan gap di bawah).
- `Dialog`/`Sheet` — preview PDF inline sebelum unduh.
- `Empty State` — jika properti belum memiliki dokumen apa pun terunggah.
- `Skeleton` — loading state daftar dokumen.

## 4. Data & State Management
- **Data yang SUDAH ada di skema:** `PROPERTY_MEDIA` dengan `mediaType = PDF_CERTIFICATE` mencakup sertifikat kepemilikan (SHM/PBB awal) yang diunggah saat Add Property — ini bisa langsung ditampilkan di halaman ini tanpa perubahan skema.
- **SCHEMA GAP:** Untuk kategori dokumen yang lebih luas (mis. dokumen pajak tahunan, akta jual-beli, IMB) di luar sertifikat legal awal, diperlukan entitas database baru (extended `Document`) yang belum ada di `40_ERD.md` — lihat rekomendasi audit Tahap 3. Entitas yang diusulkan: `Document(id, propertyId, documentType[TAX, DEED, CERTIFICATE, OTHER], s3Url, uploadedAt, uploadedBy)`, menggantikan/melengkapi `PROPERTY_MEDIA.mediaType=PDF_CERTIFICATE` yang saat ini terlalu sempit cakupannya.
- **Server State:** `GET /api/v1/properties/:id` untuk mengambil `PROPERTY_MEDIA` terkait (subset `mediaType = PDF_CERTIFICATE`) sebagai data yang sudah tersedia hari ini.
- **Local State:** Progress upload dokumen baru, menggunakan pola sama seperti `03_ADD_PROPERTY.md` (presigned URL ke R2).

## 5. API Endpoints Referenced
- `GET /api/v1/properties/:id` — sumber data `PROPERTY_MEDIA` (`PDF_CERTIFICATE`) yang sudah tersedia di Phase 1.
- `POST /api/v1/media/presigned-url` — unggah dokumen baru ke Cloudflare R2 (sudah tersedia, dapat dipakai ulang untuk kategori dokumen lain begitu skema `Document` diperluas).
- **Belum tersedia:** `GET/POST /api/v1/properties/:id/documents` — endpoint khusus dokumen (di luar sertifikat legal) memerlukan entitas database baru (extended `Document`) yang belum ada di `40_ERD.md` sebelum dapat diimplementasikan penuh.

## 6. Acceptance Criteria (DoD)
- [ ] Dokumen `PDF_CERTIFICATE` yang sudah ada (dari alur Add Property) tampil dengan benar menggunakan skema saat ini — bagian ini TIDAK diblokir oleh gap skema.
- [ ] **Blocked pending schema (kategori dokumen lain):** Unggah dokumen non-sertifikat (pajak, akta, dll.) tidak dapat diimplementasikan penuh sampai entitas `Document` diperluas di `40_ERD.md` dan endpoint `GET/POST /api/v1/properties/:id/documents` ditambahkan ke `52_ENDPOINT_CATALOGUE.md`.
- [ ] Owner hanya dapat melihat/mengunggah dokumen untuk properti miliknya sendiri (BOLA test wajib).
- [ ] Preview PDF dapat diakses tanpa mengunduh file penuh terlebih dahulu (inline viewer).
- [ ] Aksi hapus dokumen memerlukan konfirmasi eksplisit.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `FileText`
- **Purpose:** Ikon judul halaman/menu dan representasi umum dokumen dalam daftar.
- **Size:** 24px (header), 20px (baris daftar). **Color:** `text-blue-700`.

#### Icon: `Download`
- **Purpose:** Aksi unduh dokumen per baris.
- **Size:** 16px.

#### Icon: `Eye`
- **Purpose:** Aksi preview dokumen inline.
- **Size:** 16px.

#### Icon: `Trash2`
- **Purpose:** Aksi hapus dokumen, `text-red-500` untuk menandakan destruktif.
- **Size:** 16px.

## 8. UI/UX Aesthetic Rules (Mockup Reference)
- **Daftar Dokumen:** Baris list `rounded-xl`, ikon jenis file di kiri, nama file + metadata (tanggal, ukuran) di tengah, aksi di kanan.
- **Preview Dialog:** Modal besar (`Sheet` full-height di mobile) menampilkan PDF via `<iframe>`/viewer, background overlay gelap semi-transparan.
- **Background:** `White`, pembatas antar baris `border-slate-100` tipis (bukan card terpisah, untuk daftar yang lebih padat/scannable).
- **Catatan Desain:** Bagian unggah kategori dokumen baru ditandai "Preview — Menunggu Perluasan Skema" hingga entitas `Document` tersedia.

# DOCUMENTS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Documents (Dokumen Saya)
**Module:** 05 BUYER DASHBOARD
**Purpose:** Sesuai PRD ("...melihat laporan legalitas"), halaman ini menampung dokumen yang relevan bagi Buyer: laporan hasil verifikasi legalitas properti yang disurvei, serta sertifikat/berkas terkait properti yang pernah di-booking. Berfungsi sebagai pusat unduh dokumen, bukan editor dokumen.

## 2. Next.js Routing Path
```text
app/(dashboard)/dashboard/documents/page.tsx
```
Rute publik: `/dashboard/documents`. Tidak ada Screen ID di `18_SCREEN_INVENTORY.md` §8.2 saat ini — direkomendasikan ditambahkan sebagai SCR-108 setelah entitas pendukung dimodelkan (lihat §4).

## 3. Required UI Components (Shadcn/ui)
- `List`/`Table` — baris per dokumen: ikon tipe file, nama dokumen, properti terkait, tanggal, ukuran file.
- `Button` icon-only — "Unduh" (`Download`) per baris, membuka/mengunduh file dari URL presigned.
- `Badge` — tipe dokumen (mis. "Sertifikat Legalitas", "Laporan Survei Fisik").
- `Skeleton` — loading state daftar.
- `EmptyState` — ikon besar 48px + teks "Belum ada dokumen tersedia" + CTA "Jadwalkan Survei Properti".
- `Input` (search) — filter dokumen berdasarkan nama properti.

## 4. Data & State Management
- **GAP SKEMA (sebagian):** Fitur ini memerlukan entitas database baru (`Document`) yang belum ada di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — lihat rekomendasi audit Tahap 3. Perlu dicatat bahwa `40_ERD.md` SUDAH memiliki entitas `PROPERTY_MEDIA` (`mediaType: IMAGE, PDF_CERTIFICATE`, `s3Url`) dan `VERIFICATION_AUDIT` (`action: APPROVED_PHYSICAL, REJECTED_LEGAL`, `notes`) yang secara parsial relevan — namun keduanya milik/terkait Owner-Property dan Surveyor, BUKAN dokumen yang secara eksplisit "dimiliki"/terikat langsung ke Buyer. Diperlukan entitas penghubung baru agar Buyer dapat melihat dokumen yang relevan dengan booking-nya secara terstruktur (bukan query ad-hoc lintas tabel yang tidak diotorisasi dengan jelas).
- **Proposed Entity Shape:**
  ```
  Document {
    id            uuid PK
    ownerBuyerId  uuid FK -> USER.id      // Buyer yang berhak mengakses (via booking/legal report)
    propertyId    uuid FK -> PROPERTY.id
    sourceMediaId uuid? FK -> PROPERTY_MEDIA.id   // opsional, jika berasal dari media milik properti
    title         string
    documentType  enum "LEGAL_REPORT, SURVEY_REPORT, CERTIFICATE"
    s3Url         string
    createdAt     datetime
  }
  ```
- **Alternatif Lebih Ringan:** Jika tidak ingin menambah tabel baru, opsi lain adalah memperluas query akses: Buyer boleh mengunduh `PROPERTY_MEDIA` bertipe `PDF_CERTIFICATE` untuk properti yang memiliki `BOOKING` miliknya dengan status `COMPLETED`/`CONFIRMED`. Namun ini masih memerlukan aturan otorisasi baru yang belum tertulis di `49_RLS_DOCUMENTATION.md` — flag ini tetap harus dikonfirmasi ke tim data/backend, bukan diasumsikan.
- **Local State:** Filter pencarian nama properti disimpan sebagai state lokal/URL param.

## 5. API Endpoints Referenced
- Memerlukan entitas database baru (`Document`) yang belum ada di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — lihat rekomendasi audit Tahap 3. Endpoint yang diusulkan: `GET /api/v1/documents` (list milik Buyer, cursor pagination) mengikuti konvensi REST yang sudah ada. Unduh file mengikuti pola presigned-URL S3 yang sudah dirujuk di `56_AUTHORIZATION_MATRIX.md` (§ Media presigned-url), mis. `GET /api/v1/documents/:id/download-url`.
- Jika opsi "Alternatif Lebih Ringan" di §4 dipilih: dapat memakai perluasan `GET /api/v1/properties/:id/media?type=PDF_CERTIFICATE` di atas entitas `PROPERTY_MEDIA` yang sudah ada, dengan pengecekan otorisasi tambahan berbasis `BOOKING.buyerId`.

## 6. Acceptance Criteria (DoD)
- [ ] Daftar kosong menampilkan `EmptyState` dengan ikon 48px Light Gray, teks Cool Gray, tombol CTA Royal Blue.
- [ ] Setiap dokumen hanya dapat diunduh oleh Buyer yang berhak (terkait booking/legal report miliknya) — divalidasi di server, bukan hanya disembunyikan di UI.
- [ ] Tombol "Unduh" menampilkan loading state singkat saat presigned URL sedang di-generate, mencegah klik ganda.
- [ ] Dokumen yang gagal dimuat (file terhapus/URL kadaluarsa) menampilkan pesan error inline per-baris, bukan memblokir seluruh daftar.
- [ ] Daftar dapat dinavigasi penuh via keyboard; tombol unduh memiliki `aria-label` deskriptif (mis. "Unduh Sertifikat Legalitas — [nama properti]").

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `FileText` | Ikon tipe dokumen default pada tiap baris | 20px |
| `Download` | Tombol unduh per dokumen | 16px |
| `ShieldCheck` | Badge "Sertifikat Legalitas" | 14px |
| `FolderOpen` | Empty state ilustratif (48px, Light Gray) — "Belum ada dokumen" | 48px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.2 Buyer Dashboard for the full workspace design system. Page-specific deltas below:

Halaman ini **DIWAJIBKAN** mematuhi pedoman visual `Mockup.png` — standar "Apple × Airbnb × Stripe × Zillow":

- **Background Utama:** `White`, daftar dokumen sebagai list bergaris pembatas tipis `slate-50`, bukan grid kartu besar (dokumen bersifat utilitarian, bukan visual-heavy).
- **Empty State (wajib untuk halaman berbasis daftar ini):** Ikon Lucide besar `48px` Light Gray, teks panduan Cool Gray, tombol aksi Royal Blue ("Jadwalkan Survei Properti") — sesuai `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` §2.3.
- **Warna Aksi Utama:** `Royal Blue` (`blue-700`) untuk ikon unduh dan tombol CTA.
- **Tipografi:** Nama dokumen `Dark Navy` (`slate-900`), metadata (tanggal/ukuran) `Cool Gray` (`slate-500`) ukuran lebih kecil.

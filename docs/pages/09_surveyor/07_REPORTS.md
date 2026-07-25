# REPORTS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Reports (Riwayat Laporan Survei)
**Module:** 09 SURVEYOR
**Purpose:** Menyediakan riwayat/arsip seluruh laporan verifikasi yang pernah diajukan Surveyor yang login — mencakup keputusan (`APPROVED_PHYSICAL`/`REJECTED_LEGAL`), catatan, dan status persetujuan Admin terkini. Berguna untuk audit diri, referensi kembali properti yang pernah disurvei, dan transparansi kinerja.

## 2. Next.js Routing Path
```text
app/(dashboard)/surveyor/reports/page.tsx
```

## 3. Required UI Components
- `ReportListTable` (di mobile menjadi stacked card list, bukan table horizontal) — menampilkan properti, tanggal survei, `action` (Approved/Rejected), dan status persetujuan Admin.
- `ReportDetailDrawer` — panel geser yang membuka detail penuh satu laporan: checklist ringkas, thumbnail media terlampir, catatan lengkap.
- `DateRangeFilter` — filter laporan berdasarkan rentang tanggal (mis. "30 hari terakhir", "Bulan ini").
- `ActionTypeFilter` — filter berdasarkan jenis keputusan (Approved/Rejected/Semua).
- `EmptyStateIllustration` — tampil jika belum ada riwayat laporan.

## 4. Data & State Management
- **Server State:** Sumber data adalah kumpulan `VERIFICATION_AUDIT` milik `surveyorId` = user yang login, di-fetch dan diurutkan berdasarkan `createdAt` menurun. Field yang ditampilkan: `propertyId` (di-join ke `PROPERTY.title/address`), `action`, `notes`, `createdAt`.
- **Status Persetujuan Admin:** Halaman ini juga perlu menampilkan `PROPERTY.status` terkini (mis. apakah sudah `FULLY_VERIFIED` oleh Admin atau masih menunggu) agar Surveyor tahu tindak lanjut laporannya — ini adalah data gabungan (join) antara `VERIFICATION_AUDIT` dan `PROPERTY`, bukan endpoint tunggal yang secara eksplisit terdokumentasi saat ini di `52_ENDPOINT_CATALOGUE.md` §8.5 (perlu konfirmasi apakah `GET /api/v1/survey/assignments` juga mengembalikan riwayat completed, atau dibutuhkan endpoint baru semacam `GET /api/v1/survey/reports`).
- **Local State:** Filter tanggal dan jenis aksi aktif, state buka/tutup `ReportDetailDrawer`.
- Tidak ada operasi tulis pada halaman ini — murni read-only/arsip.

## 5. API Endpoints Referenced
- `GET /api/v1/survey/assignments` — kemungkinan sumber data jika endpoint ini juga mengembalikan riwayat tugas yang sudah selesai (perlu verifikasi cakupan payload); jika tidak, ini menjadi **gap dokumentasi**: belum ada endpoint terdokumentasi eksplisit untuk mengambil riwayat `VERIFICATION_AUDIT` milik Surveyor secara terpisah dari daftar assignment aktif — direkomendasikan menambahkan `GET /api/v1/survey/reports` ke `52_ENDPOINT_CATALOGUE.md` §8.5 pada revisi berikutnya.
- Tidak ada endpoint write di halaman ini.

## 6. Acceptance Criteria (DoD)
- [ ] Setiap entri laporan menampilkan status akhir yang jelas: keputusan Surveyor (Approved/Rejected) DAN status persetujuan Admin (Menunggu Admin/Disetujui/Ditolak) — dua status berbeda yang tidak boleh disamakan secara visual.
- [ ] Filter tanggal dan jenis aksi berfungsi tanpa reload halaman penuh.
- [ ] `ReportDetailDrawer` menampilkan kembali bukti foto/video yang pernah dilampirkan pada laporan tersebut (read-only).
- [ ] Gap endpoint riwayat laporan (lihat §5) dicatat sebagai item follow-up dokumentasi API sebelum implementasi backend dimulai.
- [ ] Daftar dapat memuat riwayat dalam jumlah besar tanpa lag signifikan di perangkat mobile kelas menengah (pagination atau infinite scroll).

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

- **`FileText`** — ikon representatif setiap entri laporan dalam `ReportListTable`, 20px, `text-slate-500`.
- **`ClipboardList`** — header halaman/navigasi, menandakan kumpulan laporan.
- **`CalendarRange`** — trigger `DateRangeFilter`.
- **`Hourglass`** — status "Menunggu Admin" pada entri yang belum final, `text-amber-600`.

## 8. UI/UX Aesthetic Rules
Mengikuti pedoman visual standar (background putih, aksen `blue-700`, teks `slate-900`, `rounded-2xl`/`rounded-3xl`, diffused soft shadow).

Karena halaman ini sering dibuka untuk referensi cepat (bukan input aktif), prioritaskan kepadatan informasi yang tetap mudah dipindai (scannable) — gunakan card ringkas dengan status Badge sebagai anchor visual utama, dan sediakan drawer detail alih-alih navigasi ke halaman terpisah agar Surveyor dapat kembali ke daftar dengan cepat saat masih di lapangan dengan koneksi terbatas.

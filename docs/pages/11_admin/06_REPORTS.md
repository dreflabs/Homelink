# REPORTS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Reports
**Module:** 11 ADMIN
**Purpose:** Menyediakan laporan agregat periodik (harian/mingguan/bulanan) tentang aktivitas platform untuk kebutuhan operasional dan pelaporan internal Admin — mis. jumlah properti baru diajukan, tingkat approve vs reject verifikasi, jumlah user baru per role, jumlah booking survei. Berbeda dari `07_ANALYTICS.md` yang berorientasi tren/visualisasi interaktif real-time, halaman ini berorientasi laporan terstruktur yang dapat diekspor (mis. CSV) untuk kebutuhan rapat/compliance.

## 2. Next.js Routing Path
```text
app/(dashboard)/11_admin/reports/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Card` (ringkasan angka) — total properti diajukan, total di-approve, total di-reject, rasio approve:reject, dalam periode terpilih.
- `DateRangePicker` — memilih rentang tanggal laporan (default: 7 hari terakhir).
- `Table` (tabel laporan rinci) — daftar baris per hari/minggu dengan kolom count masing-masing metrik.
- `Button` (variant outline) — "Ekspor CSV" untuk mengunduh tabel laporan yang sedang tampil.
- `Skeleton` — loading state saat agregasi data sedang diproses.

## 4. Data & State Management
- **GAP ENTITAS:** Tidak ada entitas `Report` atau tabel agregasi/materialized view khusus di `40_ERD.md`. Laporan pada halaman ini **secara teknis computable** dari entitas yang sudah ada melalui query agregasi langsung:
  - Jumlah properti per status per periode → `COUNT(PROPERTY) GROUP BY status, DATE(createdAt)`.
  - Approve vs Reject verifikasi → `COUNT(VERIFICATION_AUDIT) GROUP BY action, DATE(createdAt)`.
  - User baru per role → `COUNT(USER) GROUP BY role, DATE(createdAt)`.
  - Booking survei → `COUNT(BOOKING) GROUP BY status, DATE(surveyDate)`.
  - **Catatan performa:** Untuk skala data besar, agregasi on-the-fly ini berisiko lambat; jika volume meningkat signifikan pasca-Fase 1, direkomendasikan menambah materialized view/tabel ringkasan harian (`daily_admin_stats`) alih-alih query langsung ke tabel transaksional tiap request.
- **Local State:** rentang tanggal terpilih (`dateRange`), metrik yang diekspor.
- **Server State:** RSC melakukan agregasi berdasarkan `dateRange` yang dipilih; hasil di-cache per kombinasi rentang untuk mengurangi beban query berulang.

## 5. API Endpoints Referenced
- **GAP TOTAL — belum ada endpoint reporting di `52_ENDPOINT_CATALOGUE.md`.** Diusulkan:
  - `GET /api/v1/admin/reports/summary?from=&to=` — ringkasan angka per periode.
  - `GET /api/v1/admin/reports/export?from=&to=&format=csv` — ekspor tabel laporan.
- Sumber data mentah tetap memakai endpoint yang sudah ada bila agregasi dilakukan di sisi client/RSC: `GET /api/v1/properties`, dan (setelah tersedia) `GET /api/v1/admin/users`.

## 6. Acceptance Criteria (DoD)
- [ ] Perubahan rentang tanggal memperbarui seluruh kartu ringkasan dan tabel rinci tanpa full page reload.
- [ ] Tombol "Ekspor CSV" menghasilkan file yang isinya identik dengan tabel yang sedang tampil di layar (tidak ada data tersembunyi/berbeda).
- [ ] Rasio approve:reject dihitung dan ditampilkan dengan penanganan pembagian-oleh-nol (mis. 0 total verifikasi pada periode tertentu) tanpa error.
- [ ] Halaman menyatakan dengan jelas (mis. teks kecil di footer kartu) bahwa data adalah agregasi on-the-fly dari entitas dasar, bukan dari tabel laporan khusus — agar ekspektasi performa/staleness jelas bagi pengguna.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `FileBarChart`
- **Purpose:** Ikon header halaman Reports. **Size:** 22px. **Color:** `text-blue-700`.

#### Icon: `CalendarRange`
- **Purpose:** Ikon pada komponen `DateRangePicker`. **Size:** 18px. **Color:** `text-slate-500`.

#### Icon: `Download`
- **Purpose:** Ikon tombol "Ekspor CSV". **Size:** 16px. **Color:** `text-blue-700`.

## 8. UI/UX Aesthetic Rules
Mengikuti Design System global: background `White`, aksi utama `Royal Blue` (`blue-700`), teks `slate-900`, surface sekunder `slate-50`, shadow ultra-lembut, radius `rounded-2xl`/`rounded-3xl`.

**Catatan kepadatan khusus Admin:** Kartu ringkasan angka ditempatkan di baris atas (grid 3-4 kolom), tabel rinci di bawahnya dengan baris kompak. Karena ini laporan (bukan dashboard real-time), tidak diperlukan auto-refresh — cukup tombol refresh manual dan timestamp "Terakhir diperbarui" untuk transparansi kepada Admin.

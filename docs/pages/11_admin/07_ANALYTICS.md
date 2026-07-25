# ANALYTICS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Analytics
**Module:** 11 ADMIN
**Purpose:** Menyediakan visualisasi tren platform-wide (lintas SEMUA properti dan Owner, bukan satu Owner tunggal) untuk Admin memantau kesehatan marketplace secara keseluruhan — mis. tren jumlah listing baru, tren view/impresi properti, funnel konversi (view → booking survei → verifikasi selesai). Ini melengkapi `06_REPORTS.md` (angka tabular/ekspor) dengan chart interaktif untuk eksplorasi tren dari waktu ke waktu.

## 2. Next.js Routing Path
```text
app/(dashboard)/11_admin/analytics/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Card` (chart container) — beberapa panel chart: "Tren Listing Baru" (line chart), "Distribusi Status Properti" (donut/pie chart dari enum `PROPERTY.status`), "Tren Booking Survei" (bar chart dari `BOOKING`).
- `Tabs` — beralih antar rentang waktu (7 hari / 30 hari / 90 hari).
- `Select` — filter opsional by `propertyType`.
- `Skeleton` — loading state untuk area chart sebelum data live tersedia.
- **Catatan:** Semua chart WAJIB mengikuti panduan skill `dataviz` internal untuk konsistensi warna kategori & aksesibilitas (bukan warna acak per chart library default).

## 4. Data & State Management
- **GAP ENTITAS UTAMA:** Tidak ada entitas/tabel *view-tracking* (mis. `PropertyViewLog`) di `40_ERD.md` — gap yang sama seperti sudah ditandai di `06_owner_dashboard/07_ANALYTICS.md`, namun di sini skalanya platform-wide (agregasi lintas SEMUA properti), bukan per-Owner. Tanpa entitas ini, metrik "jumlah view properti" TIDAK DAPAT dihitung sama sekali dari skema ERD Fase 1 yang ada — ini bukan sekadar masalah performa (seperti pada `06_REPORTS.md`), melainkan **data yang sama sekali belum dikumpulkan**.
- **Data yang TETAP computable** dari ERD Fase 1 tanpa entitas baru: tren jumlah `PROPERTY` baru per hari (`createdAt`), distribusi `PROPERTY.status`, tren `BOOKING` per `surveyDate`/`status`.
- **Local State:** rentang waktu terpilih (Tabs), filter `propertyType` terpilih.
- **Server State:** RSC agregasi query group-by tanggal untuk metrik yang computable; metrik view-tracking ditampilkan sebagai placeholder "Belum tersedia — menunggu instrumentasi `PropertyViewLog`" alih-alih chart kosong yang membingungkan.

## 5. API Endpoints Referenced
- `GET /api/v1/properties` — sumber data untuk tren listing baru & distribusi status (agregasi di RSC).
- **GAP:** `GET /api/v1/admin/analytics/views` — endpoint belum ada DAN bergantung pada entitas `PropertyViewLog` yang juga belum ada; tidak dapat diimplementasikan sebelum instrumentasi tracking view ditambahkan ke aplikasi (kemungkinan Fase 2, mengikuti keputusan yang sama pada modul Owner Dashboard).
- **GAP:** `GET /api/v1/admin/analytics/bookings-funnel` — endpoint agregasi funnel view→booking→verifikasi, bergantung sebagian pada gap view-tracking di atas.

## 6. Acceptance Criteria (DoD)
- [ ] Chart yang datanya computable (tren listing, distribusi status, tren booking) dirender dari data live begitu backend tersedia.
- [ ] Chart yang bergantung pada `PropertyViewLog` (belum ada) menampilkan state "Belum Tersedia" yang jelas dan bukan grafik kosong/nol yang menyesatkan.
- [ ] Semua chart memenuhi kontras warna WCAG 2.1 AA dan tidak hanya mengandalkan warna untuk membedakan kategori (harus ada label/legend teks).
- [ ] Filter rentang waktu & propertyType memperbarui semua chart secara konsisten tanpa reload penuh.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `TrendingUp`
- **Purpose:** Ikon header halaman Analytics & panel "Tren Listing Baru". **Size:** 22px (header) / 18px (panel). **Color:** `text-blue-700`.

#### Icon: `PieChart`
- **Purpose:** Panel "Distribusi Status Properti". **Size:** 18px. **Color:** `text-slate-500`.

#### Icon: `BarChart3`
- **Purpose:** Panel "Tren Booking Survei". **Size:** 18px. **Color:** `text-slate-500`.

#### Icon: `EyeOff`
- **Purpose:** Ikon pada placeholder state "Belum Tersedia" untuk metrik view-tracking yang bergantung pada gap `PropertyViewLog`. **Size:** 24px. **Color:** `text-slate-400`.

## 8. UI/UX Aesthetic Rules
Mengikuti Design System global: background `White`, aksi utama `Royal Blue` (`blue-700`), teks `slate-900`, surface sekunder `slate-50`, shadow ultra-lembut, radius `rounded-2xl`/`rounded-3xl`.

**Catatan kepadatan khusus Admin:** Grid chart 2 kolom pada desktop, stack pada mobile. Palet warna kategori chart mengikuti panduan skill `dataviz` (bukan warna default library) agar konsisten dengan Badge status di seluruh modul Admin (mis. warna donut chart status properti harus sama persis dengan warna Badge di `04_PROPERTY_MANAGEMENT.md` dan `05_VERIFICATION_QUEUE.md`).

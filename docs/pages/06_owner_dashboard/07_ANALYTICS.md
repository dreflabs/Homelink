# ANALYTICS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Analytics (Performa Listing)
**Module:** 06 OWNER DASHBOARD
**Role:** Owner
**Purpose:** Memberikan wawasan performa properti kepada Owner — jumlah tayangan (views/impressions), tren minat dari waktu ke waktu, dan perbandingan performa antar listing milik Owner yang sama — untuk membantu Owner memahami daya tarik listing dan mengoptimalkan (foto, harga, deskripsi).

## 2. Next.js Routing Path
```text
app/(dashboard)/owner/properties/[propertyId]/analytics/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `LineChart` (chart komponen, mis. Recharts) — tren jumlah tayangan harian/mingguan sepanjang waktu.
- `Card` (stat tiles) — Total Views, Views 7 Hari Terakhir, Rata-rata per Hari.
- `BarChart` — perbandingan views antar properti Owner (jika Owner memiliki lebih dari satu listing).
- `Select` — filter rentang waktu (7 hari, 30 hari, semua waktu).
- `Empty State` — jika properti terlalu baru/belum ada data tayangan yang tercatat.
- `Skeleton` — loading state chart.

## 4. Data & State Management
- **SCHEMA GAP:** Tidak ada entitas analytics/view-count di `40_ERD.md` saat ini. Diperlukan entitas database baru (`PropertyViewLog`) yang belum ada di `40_ERD.md` — lihat rekomendasi audit Tahap 3. Entitas yang diusulkan minimal berisi: `id`, `propertyId`, `viewerId` (nullable untuk anonymous), `viewedAt`, `source` (enum: SEARCH_RESULT, DIRECT_LINK, RECOMMENDATION).
- **Server State (setelah entitas tersedia):** Data diagregasi server-side (per hari/minggu) agar client tidak perlu mengunduh raw log; endpoint mengembalikan time-series siap-pakai untuk chart.
- **Local State:** Filter rentang waktu (`range: '7d' | '30d' | 'all'`) disimpan di URL search params.

## 5. API Endpoints Referenced
- **Belum tersedia di `52_ENDPOINT_CATALOGUE.md`.** Endpoint yang diusulkan: `GET /api/v1/properties/:id/analytics` — memerlukan entitas database baru (`PropertyViewLog`) yang belum ada di `40_ERD.md` sebelum endpoint ini dapat diimplementasikan. Server wajib memvalidasi `ownerId = session.userId` atas `propertyId` sebelum mengembalikan data analitik (BOLA prevention).

## 6. Acceptance Criteria (DoD)
- [ ] **Blocked pending schema:** Halaman ini tidak dapat diimplementasikan penuh sampai entitas `PropertyViewLog` ditambahkan ke `40_ERD.md` dan endpoint `GET /api/v1/properties/:id/analytics` ditambahkan ke `52_ENDPOINT_CATALOGUE.md`.
- [ ] Setelah data tersedia: chart tren tayangan dapat difilter berdasarkan rentang waktu tanpa reload penuh halaman.
- [ ] Owner hanya dapat melihat analitik properti miliknya sendiri (BOLA test wajib).
- [ ] Chart menyediakan alternatif teks/tabel data untuk pengguna pembaca layar (tidak hanya representasi visual — WCAG 1.1.1).
- [ ] Empty state membedakan "properti baru, belum ada data" dari "kegagalan memuat data".

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `TrendingUp`
- **Purpose:** Ikon judul halaman/menu, merepresentasikan tren performa positif.
- **Size:** 24px, `text-blue-700`.

#### Icon: `Eye`
- **Purpose:** Ikon kartu statistik "Total Views".
- **Size:** 20px, `text-slate-500`.

#### Icon: `CalendarRange`
- **Purpose:** Trigger filter rentang waktu.
- **Size:** 18px.

#### Icon: `BarChart3`
- **Purpose:** Ikon tab/section perbandingan antar listing.
- **Size:** 20px, `text-blue-700`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.3 Owner Dashboard for the full workspace design system. Page-specific deltas below:

- **Chart Colors:** Garis tren utama `blue-700`, area fill gradasi lembut `blue-50` ke transparan di bawah garis.
- **Stat Tiles:** `rounded-2xl`, bayangan lembut, angka besar (`text-3xl font-semibold text-slate-900`) dengan label kecil `text-slate-500` di bawahnya.
- **Background:** `White`, grid 3 kolom untuk stat tiles di desktop, stack penuh di mobile.
- **Catatan Desain:** Sama seperti Leads, halaman ini ditandai "Preview — Menunggu Implementasi Backend" hingga entitas `PropertyViewLog` dan endpoint terkait tersedia.

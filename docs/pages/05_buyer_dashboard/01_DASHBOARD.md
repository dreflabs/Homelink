# DASHBOARD PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Dashboard (Ringkasan)
**Module:** 05 BUYER DASHBOARD
**Screen ID:** SCR-101 (`18_SCREEN_INVENTORY.md` §8.2)
**Purpose:** Halaman pendaratan (landing) setelah Buyer login, dirancang sebagai **Property Discovery Workspace** — bukan dashboard statistik. Terdiri dari satu Hero dinamis yang menjawab "apa langkah saya berikutnya" diikuti grid Properti Tersimpan sebagai konten utama, per keputusan Sprint B di `27_DASHBOARD_DESIGN_GUIDELINES.md` §8.2 (menggantikan rancangan grid 4-kartu KPI pada versi sebelumnya dokumen ini, yang terlalu berorientasi statistik untuk peran Buyer).

## 2. Next.js Routing Path
```text
app/(dashboard)/dashboard/page.tsx
```
Path publik sesuai `18_SCREEN_INVENTORY.md` SCR-101: `/dashboard`.

## 3. Required UI Components (Shadcn/ui)
- **Hero Card** (`17_COMPONENT_LIBRARY.md` §8.4) — "Langkah Berikutnya Anda", satu kartu dinamis di paling atas dengan CTA tunggal yang berubah mengikuti state aktif (lihat §4).
- `PropertyCard` grid (Listing Card, `17` §8.5) — grid Properti Tersimpan sebagai konten utama, langsung di bawah Hero.
- `Avatar` — foto profil + salam nama Buyer (dari `USER.name`), ditampilkan kecil di header, bukan sebagai kartu terpisah.
- `Badge` — status warna pada ringkasan booking di Secondary Grid (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`).
- Timeline Card ringkas (`17` §8.4) — Secondary Grid: jadwal survei & status offer terdekat, subset dari `06_SCHEDULE.md`/`07_OFFERS.md`.
- `Skeleton` — Hero Card skeleton resolve lebih dulu (prioritas fokus utama layar), baru grid Properti Tersimpan.
- `EmptyState` — untuk grid Properti Tersimpan jika kosong; Hero punya empty-adjacent state sendiri (lihat priority-4 di §4), tidak pernah kosong total.

## 4. Data & State Management
- **Hero Card — prioritas resolusi (tanpa entity baru, murni dari data yang sudah ada di `40_ERD.md`):**
  1. Survei terjadwal dalam 48 jam ke depan — dari `BOOKING` (filter `buyerId = session.user.id`, `surveyDate` dalam rentang), via `GET /api/v1/bookings`.
  2. Properti baru yang cocok dengan kriteria pencarian tersimpan Buyer — query filter atas `PROPERTY` menggunakan kriteria dari `05_SAVED_SEARCH.md` (bukan tabel "match" baru, murni filter query).
  3. Properti yang baru dilihat (`RecentlyViewed`, lihat gap di `04_RECENTLY_VIEWED.md`) tapi belum disimpan — dorongan halus untuk menyimpan.
  4. Fallback (akun baru tanpa aktivitas): ajakan "Mulai jelajahi properti terverifikasi" mengarah ke `/search`.
- **Server State (RSC):** Grid Properti Tersimpan mengagregasi dari entitas yang **belum ada** di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — `SavedProperty`, gap sudah tercatat di `03_SAVED_PROPERTY.md`. Sampai entitas ini dimodelkan, grid dirender dalam `EmptyState` (bukan data statis palsu), dan Hero tetap berfungsi penuh karena tidak bergantung pada entitas ini (hanya bergantung pada `BOOKING`/`PROPERTY` yang sudah ada).
- **Local State:** Tidak ada tab rentang waktu lagi (dihapus bersama grid KPI) — Hero dan grid selalu menampilkan kondisi saat ini, bukan agregat periode.

**Future Product Opportunity (tidak dibangun sekarang, sesuai aturan UX-before-backend proyek ini):** Priority-2 Hero saat ini murni filter query; personalisasi berbasis `PROPERTY.embeddingVector` atau notifikasi push "Price Drop Alert" adalah peluang produk masa depan yang membutuhkan endpoint rekomendasi/entity notifikasi baru — dicatat di sini, **tidak** mengubah `40_ERD.md`/`52_ENDPOINT_CATALOGUE.md`.

## 5. API Endpoints Referenced
- `GET /api/v1/bookings?buyerId={session.id}&limit=3` — sudah ada, dipakai Hero prioritas-1 & Secondary Grid.
- `GET /api/v1/properties?...` — sudah ada, dipakai Hero prioritas-2 (filter berdasarkan kriteria saved search) dan grid Properti Tersimpan setelah entitas `SavedProperty` tersedia.
- Belum ada endpoint baru yang diusulkan di halaman ini — dua gap (`SavedProperty`, `RecentlyViewed`) sudah tercatat di file masing-masing (`03_SAVED_PROPERTY.md`, `04_RECENTLY_VIEWED.md`) dan tidak diduplikasi di sini.

## 6. Acceptance Criteria (DoD)
- [ ] Hero Card selalu menampilkan tepat satu state dari 4 prioritas di §4, tidak pernah kosong dan tidak pernah menampilkan dua CTA sekaligus.
- [ ] Hero Card skeleton resolve sebelum grid Properti Tersimpan (memenuhi Information Hierarchy di `27` §8.2).
- [ ] Grid Properti Tersimpan yang bergantung pada entitas belum-ada merender `EmptyState`, bukan error 500, jika endpoint proposed belum diimplementasikan backend.
- [ ] Akun baru tanpa booking/wishlist menampilkan Hero fallback (priority-4) + `EmptyState` pada grid, bukan kartu KPI kosong.
- [ ] Tidak ada StatTile/kartu angka ringkasan di halaman ini — sesuai keputusan `27` §8.2 bahwa Buyer tidak melihat metrik.
- [ ] Lolos audit Lighthouse Accessibility > 90; Hero dan grid dapat diakses via keyboard (tab order logis).

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Sparkles` | Hero Card — menandakan "langkah berikutnya" yang dipersonalisasi | 20px |
| `CalendarClock` | Hero prioritas-1 (survei mendatang) & Secondary Grid | 20px |
| `Heart` | Grid Properti Tersimpan (empty state / ikon judul seksi) | 24px |
| `Eye` | Hero prioritas-3 (baru dilihat, belum disimpan) | 20px |
| `ChevronRight` | Tautan "Lihat Semua" pada Secondary Grid | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.2 Buyer Dashboard for the full workspace design system (tokens, Hero/CTA/Focus decision, Card Hierarchy, motion). Page-specific delta below:

- **Hero-to-grid rhythm:** Hero Card full-width at the top (Elevation 1, not a special color treatment — see `27` §8.2), directly followed by the Properti Tersimpan grid with no StatTile row between them — this page has zero KPI/metric cards, by design.

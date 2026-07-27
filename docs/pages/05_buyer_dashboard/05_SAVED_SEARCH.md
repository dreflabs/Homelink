# SAVED SEARCH PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Saved Search (Pencarian Tersimpan)
**Module:** 05 BUYER DASHBOARD
**Purpose:** Memungkinkan Buyer menyimpan kombinasi filter pencarian properti (lokasi, rentang harga, tipe properti) agar dapat dijalankan ulang dengan satu klik, dan (opsional masa depan) menerima notifikasi saat listing baru cocok dengan kriteria tersimpan.

## 2. Next.js Routing Path
```text
app/(dashboard)/dashboard/saved-searches/page.tsx
```
Rute publik: `/dashboard/saved-searches`. Tidak ada Screen ID di `18_SCREEN_INVENTORY.md` §8.2 saat ini — direkomendasikan ditambahkan sebagai SCR-106 pada revisi berikutnya.

## 3. Required UI Components (Shadcn/ui)
- `List`/`Card` — satu baris per pencarian tersimpan: label kustom, ringkasan filter (chip: lokasi, rentang harga, tipe), jumlah hasil terakhir diketahui.
- `Switch` — toggle "Beri tahu saya jika ada listing baru" per pencarian (bergantung pada gap Notification, lihat §4).
- `Button` (Royal Blue, `variant="outline"`) — "Jalankan Pencarian" per item, mengarah ke halaman hasil pencarian dengan query params terisi otomatis.
- `Button` icon-only — "Hapus Pencarian".
- `Skeleton` — loading state daftar.
- `EmptyState` — ikon besar 48px + teks "Belum ada pencarian tersimpan" + CTA "Mulai Pencarian".

## 4. Data & State Management
- **GAP SKEMA:** Fitur ini memerlukan entitas database baru (`SavedSearch`) yang belum ada di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — lihat rekomendasi audit Tahap 3. Tidak ada tabel penyimpanan kriteria pencarian di skema Fase 1 saat ini.
- **Proposed Entity Shape:**
  ```
  SavedSearch {
    id            uuid PK
    buyerId       uuid FK -> USER.id
    label         string           // nama kustom, mis. "Rumah Bandung < 2M"
    filters       json             // { propertyType, priceMin, priceMax, address/lat/lng radius }
    notifyOnMatch boolean          // default false
    createdAt     datetime
  }
  ```
- **Dependensi Silang:** Toggle "notifyOnMatch" bergantung pula pada entitas `Notification` yang JUGA belum ada (lihat gap di `10_NOTIFICATION.md`). Sampai kedua entitas dimodelkan, toggle ini harus dirender disabled dengan tooltip "Segera Hadir", bukan berfungsi penuh.
- **Local State:** Filter builder (form pembuatan saved search) menggunakan state form lokal sebelum disimpan; struktur query mengikuti parameter filter pencarian properti yang sudah ada di halaman listing publik.

## 5. API Endpoints Referenced
- Memerlukan entitas database baru (`SavedSearch`) yang belum ada di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — lihat rekomendasi audit Tahap 3. Endpoint yang diusulkan: `GET /api/v1/saved-searches` (list), `POST /api/v1/saved-searches` (`{ label, filters, notifyOnMatch }`), `DELETE /api/v1/saved-searches/:id`, `PATCH /api/v1/saved-searches/:id` (ubah label/toggle notifikasi) mengikuti konvensi REST yang sudah ada.
- `GET /api/v1/properties?...filters` — endpoint pencarian properti publik yang sudah ada, dipanggil ulang dengan query params dari `filters` tersimpan saat "Jalankan Pencarian" ditekan.

## 6. Acceptance Criteria (DoD)
- [ ] Daftar kosong menampilkan `EmptyState` dengan ikon 48px Light Gray, teks Cool Gray, tombol CTA Royal Blue — tidak pernah blank.
- [ ] "Jalankan Pencarian" membuka halaman hasil listing dengan seluruh filter tersimpan terisi otomatis, tanpa perlu Buyer mengatur ulang filter manual.
- [ ] Toggle notifikasi per-item dinonaktifkan (disabled + tooltip) selama entitas `SavedSearch`/`Notification` belum diimplementasikan backend — tidak boleh tampak aktif namun tidak berfungsi (dark pattern).
- [ ] Menghapus pencarian tersimpan bersifat langsung (tanpa konfirmasi wajib, karena tidak destruktif terhadap data properti) namun tetap menampilkan opsi "Urungkan" (undo toast) selama 5 detik.
- [ ] Daftar dan tiap chip filter dapat dinavigasi penuh via keyboard.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `BookmarkPlus` | Header halaman & tombol simpan pencarian baru | 20px |
| `SlidersHorizontal` | Ikon filter/kriteria pada tiap chip ringkasan | 16px |
| `BellRing` | Toggle "Beri tahu saya" (disabled state hingga gap Notification selesai) | 18px |
| `Search` | Empty state ilustratif (48px, Light Gray) — "Belum ada pencarian tersimpan" | 48px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.2 Buyer Dashboard for the full workspace design system. Page-specific deltas below:

Halaman ini **DIWAJIBKAN** mematuhi pedoman visual `Mockup.png` — standar "Apple × Airbnb × Stripe × Zillow":

- **Background Utama:** `White`, daftar tersusun sebagai kartu horizontal ringkas dengan chip filter berlatar `slate-50`.
- **Empty State (wajib untuk halaman berbasis daftar ini):** Ikon Lucide besar `48px` Light Gray, teks panduan Cool Gray, tombol aksi Royal Blue ("Mulai Pencarian") — sesuai `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` §2.3.
- **Warna Aksi Utama:** `Royal Blue` (`blue-700`) untuk tombol "Jalankan Pencarian"; elemen disabled (toggle notifikasi) memakai abu (`slate-200`) dengan opacity turun agar jelas belum aktif.
- **Card & Elevation:** `rounded-2xl`, diffused soft shadow konsisten dengan kartu lain di dashboard.

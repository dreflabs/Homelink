# SAVED PROPERTY PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Saved Property (Favorit / Wishlist)
**Module:** 05 BUYER DASHBOARD
**Screen ID:** SCR-103 — "Saved Properties" (`18_SCREEN_INVENTORY.md` §8.2: "Daftar *wishlist* properti yang disimpan.")
**Purpose:** Menampilkan daftar properti yang ditandai Buyer sebagai favorit (ikon hati pada kartu listing), memungkinkan navigasi cepat ke detail properti dan penghapusan dari daftar.

## 2. Next.js Routing Path
```text
app/(dashboard)/dashboard/saved/page.tsx
```
Rute publik sesuai `18_SCREEN_INVENTORY.md` SCR-103: `/dashboard/saved`.

## 3. Required UI Components (Shadcn/ui)
- `Card` grid (properti tersimpan) — thumbnail, judul, harga, badge status verifikasi properti (`PENDING`/`FULLY_VERIFIED`/dst).
- `Button` icon-only (`Heart` terisi, Royal Blue) — toggle hapus dari favorit langsung pada kartu.
- `Skeleton` grid — loading state untuk grid kartu.
- `EmptyState` — ikon besar 48px + teks "Belum ada wishlist" + CTA "Cari Properti" (wajib per `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` §2.3).
- `AlertDialog` — konfirmasi sebelum menghapus item dari wishlist (mencegah unfavorite tidak sengaja).
- `Pagination` (cursor-based, tombol "Muat Lebih Banyak") sesuai konvensi cursor pagination API.

## 4. Data & State Management
- **GAP SKEMA:** Fitur ini memerlukan entitas database baru (`SavedProperty`) yang belum ada di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — lihat rekomendasi audit Tahap 3. Tidak ada tabel wishlist/favorite di ERD Fase 1 saat ini; hanya `USER`, `PROPERTY`, `PROPERTY_MEDIA`, `BOOKING`, `VERIFICATION_AUDIT`, `ACCOUNT`, `AUDIT_LOG` yang dimodelkan.
- **Proposed Entity Shape:**
  ```
  SavedProperty {
    id          uuid PK
    buyerId     uuid FK -> USER.id
    propertyId  uuid FK -> PROPERTY.id
    createdAt   datetime
    @@unique([buyerId, propertyId])
  }
  ```
- **Local/Client State:** Status toggle optimis per kartu (`isSaved: boolean`) untuk memberi feedback instan sebelum konfirmasi server; rollback bila mutasi gagal.
- **Server State:** Setelah entitas ada, daftar diambil per `buyerId` sesuai sesi (Application-level RLS sama seperti Booking: Buyer hanya melihat baris `SavedProperty` miliknya sendiri).

## 5. API Endpoints Referenced
- Memerlukan entitas database baru (`SavedProperty`) yang belum ada di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — lihat rekomendasi audit Tahap 3. Endpoint yang diusulkan: `GET /api/v1/favorites` (list, cursor pagination), `POST /api/v1/favorites` (`{ propertyId }`), `DELETE /api/v1/favorites/:propertyId` mengikuti konvensi REST yang sudah ada.
- `GET /api/v1/properties/:id` — sudah ada, dipakai untuk hydrate detail tiap kartu properti dalam daftar favorit.

## 6. Acceptance Criteria (DoD)
- [ ] Grid kosong (0 item) menampilkan `EmptyState` dengan ikon 48px abu-abu, teks panduan Cool Gray, dan tombol CTA Royal Blue — tidak pernah dibiarkan blank.
- [ ] Toggle hapus favorit memberi feedback optimis instan (kartu memudar/hilang) sebelum konfirmasi server tuntas.
- [ ] Properti berstatus non-`FULLY_VERIFIED` tetap dapat muncul di wishlist tapi diberi badge status yang jelas (bukan disembunyikan tanpa indikasi).
- [ ] Menghapus dari favorit meminta konfirmasi (`AlertDialog`) untuk mencegah kehilangan data tidak sengaja.
- [ ] Daftar dapat diakses penuh via keyboard (grid navigable, tombol hati fokus-able dengan `aria-pressed`).

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Heart` (filled, Royal Blue) | Toggle status favorit pada tiap kartu | 20px |
| `HeartCrack` | Empty state ilustratif (48px, Light Gray) — "Belum ada wishlist" | 48px |
| `MapPin` | Alamat singkat properti pada kartu | 16px |
| `Loader2` (animate-spin) | Loading grid saat fetch berikutnya (infinite scroll) | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)
Halaman ini **DIWAJIBKAN** mematuhi pedoman visual `Mockup.png` — standar "Apple × Airbnb × Stripe × Zillow":

- **Background Utama:** `White`, grid kartu dengan gap lega untuk ruang bernapas.
- **Warna Aksi Utama:** `Royal Blue` (`blue-700`) untuk ikon hati aktif dan tombol CTA empty state.
- **Empty State (wajib untuk halaman berbasis daftar ini):** Ikon Lucide besar `48px` warna Light Gray, teks panduan Cool Gray (`slate-500`), diikuti tombol aksi Royal Blue ("Cari Properti") — sesuai `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` §2.3.
- **Card & Elevation:** Kartu properti `rounded-2xl` dengan diffused soft shadow, foto properti warm-lighting mengisi bagian atas kartu.
- **Teks:** Judul properti `Dark Navy` (`slate-900`), harga ditonjolkan Royal Blue bold.

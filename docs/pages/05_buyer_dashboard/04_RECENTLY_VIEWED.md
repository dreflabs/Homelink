# RECENTLY VIEWED PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Recently Viewed (Riwayat Dilihat)
**Module:** 05 BUYER DASHBOARD
**Purpose:** Menampilkan riwayat properti yang baru-baru ini dibuka oleh Buyer (urut kronologis terbaru), membantu Buyer kembali ke listing yang sedang dipertimbangkan tanpa perlu mencari ulang.

## 2. Next.js Routing Path
```text
app/(dashboard)/dashboard/recently-viewed/page.tsx
```
Rute publik: `/dashboard/recently-viewed`. Tidak ada Screen ID di `18_SCREEN_INVENTORY.md` §8.2 saat ini — direkomendasikan ditambahkan sebagai SCR-105 pada revisi berikutnya karena halaman ini nyata dibutuhkan namun belum terdaftar di inventaris layar.

## 3. Required UI Components (Shadcn/ui)
- `Card` list horizontal-scroll atau grid — thumbnail properti, judul, harga, "Dilihat X waktu lalu" (relative timestamp).
- `Button` (`variant="ghost"`) — "Hapus dari Riwayat" per item.
- `Button` (`variant="outline"`) — "Hapus Semua Riwayat" (global clear, dengan konfirmasi).
- `Skeleton` — loading state daftar.
- `EmptyState` — ikon besar 48px + teks "Belum ada properti yang dilihat" + CTA "Jelajahi Properti".
- `AlertDialog` — konfirmasi "Hapus Semua Riwayat".

## 4. Data & State Management
- **GAP SKEMA:** Fitur ini memerlukan entitas database baru (`RecentlyViewed`) yang belum ada di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — lihat rekomendasi audit Tahap 3. Tidak ada tabel riwayat-tampilan/view-history di skema Fase 1 saat ini.
- **Proposed Entity Shape:**
  ```
  RecentlyViewed {
    id          uuid PK
    buyerId     uuid FK -> USER.id
    propertyId  uuid FK -> PROPERTY.id
    viewedAt    datetime
    @@index([buyerId, viewedAt])
  }
  ```
  Dicatat setiap kali halaman `GET /api/v1/properties/:id` (SCR detail properti) diakses oleh Buyer yang login — bukan Guest, karena riwayat terikat pada `buyerId`.
- **Retensi Data:** Direkomendasikan menyimpan maksimum N=50 entri terbaru per Buyer (atau retensi 90 hari) untuk mencegah pertumbuhan tabel tak terbatas — kebijakan ini harus diputuskan saat entitas dimodelkan resmi, bukan diasumsikan di sini.
- **Local State:** Optimistic removal per-item saat "Hapus dari Riwayat" ditekan.

## 5. API Endpoints Referenced
- Memerlukan entitas database baru (`RecentlyViewed`) yang belum ada di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — lihat rekomendasi audit Tahap 3. Endpoint yang diusulkan: `GET /api/v1/view-history` (list, cursor pagination, urut `viewedAt DESC`), `DELETE /api/v1/view-history/:propertyId` (hapus satu entri), `DELETE /api/v1/view-history` (hapus semua) mengikuti konvensi REST yang sudah ada. Pencatatan otomatis diusulkan sebagai side-effect internal pada `GET /api/v1/properties/:id`, bukan endpoint terpisah yang dipanggil client.
- `GET /api/v1/properties/:id` — sudah ada, dipakai untuk hydrate detail properti tiap entri riwayat.

## 6. Acceptance Criteria (DoD)
- [ ] Daftar kosong (akun baru/belum pernah melihat properti) menampilkan `EmptyState` dengan ikon 48px Light Gray, teks Cool Gray, tombol CTA Royal Blue.
- [ ] Timestamp ditampilkan relatif ("2 jam lalu", "Kemarin") bukan ISO mentah.
- [ ] "Hapus Semua Riwayat" meminta konfirmasi eksplisit sebelum eksekusi (aksi destruktif, tidak dapat diurungkan).
- [ ] Properti yang sudah dihapus/nonaktif oleh Owner tetap dapat muncul di riwayat namun ditandai "Tidak Tersedia" (bukan crash/404 diam).
- [ ] Daftar dapat dinavigasi penuh via keyboard; tombol hapus per-item memiliki label ARIA yang jelas (mis. "Hapus [nama properti] dari riwayat").

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `History` | Header halaman "Riwayat Dilihat" & empty state (48px) | 24px / 48px |
| `Clock` | Prefix timestamp relatif per item | 14px |
| `Trash2` | Tombol hapus per-item dan hapus-semua | 16px |
| `Eye` | Badge kecil "Terakhir dilihat" pada kartu | 14px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.2 Buyer Dashboard for the full workspace design system. Page-specific deltas below:

Halaman ini **DIWAJIBKAN** mematuhi pedoman visual `Mockup.png` — standar "Apple × Airbnb × Stripe × Zillow":

- **Background Utama:** `White`, daftar disusun sebagai baris kartu horizontal ringkas (bukan grid tebal seperti Saved Property, karena riwayat lebih sekunder/sementara).
- **Empty State (wajib untuk halaman berbasis daftar ini):** Ikon Lucide besar `48px` Light Gray, teks panduan Cool Gray, tombol aksi Royal Blue ("Jelajahi Properti") — sesuai `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` §2.3.
- **Warna Aksi Utama:** `Royal Blue` (`blue-700`) hanya pada CTA utama; tombol hapus menggunakan warna netral (`slate-500`) agar tidak bersaing visual dengan aksi utama.
- **Card & Elevation:** `rounded-2xl`, diffused soft shadow lebih tipis dibanding kartu Saved Property untuk menandakan hierarki sekunder.

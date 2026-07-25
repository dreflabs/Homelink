# OFFERS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Offers (Penawaran Saya)
**Module:** 05 BUYER DASHBOARD
**Purpose:** Memungkinkan Buyer mengajukan penawaran harga (offer) atas properti yang diminati dan memantau statusnya (diajukan, dipertimbangkan Owner, diterima, ditolak, atau kadaluarsa).

## 2. Next.js Routing Path
```text
app/(dashboard)/dashboard/offers/page.tsx
```
Rute publik: `/dashboard/offers`. Tidak ada Screen ID di `18_SCREEN_INVENTORY.md` §8.2 saat ini — halaman ini merepresentasikan fitur yang belum tercakup di inventaris layar maupun ERD; direkomendasikan ditambahkan sebagai SCR-107 setelah entitas pendukung dimodelkan (lihat §4).

## 3. Required UI Components (Shadcn/ui)
- `Tabs` — filter status: "Diajukan", "Diterima", "Ditolak", "Kadaluarsa".
- `Card`/`Table` list — properti, harga listing asli, nominal penawaran Buyer, status (`Badge`), tanggal diajukan.
- `Button` (Royal Blue) — "Ajukan Penawaran Baru" (dari halaman detail properti, muncul juga sebagai CTA di sini bila kosong).
- `Button` (`variant="outline"`) — "Tarik Penawaran" (batalkan offer yang masih berstatus diajukan/pending).
- `Dialog`/`Form` — form pengajuan offer baru: input nominal (format Rupiah), catatan tambahan (textarea opsional).
- `Skeleton`, `EmptyState` (ikon besar 48px + "Belum ada penawaran diajukan" + CTA).

## 4. Data & State Management
- **GAP SKEMA:** Fitur ini memerlukan entitas database baru (`Offer`) yang belum ada di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — lihat rekomendasi audit Tahap 3. PRD Fase 1 (`03_PRODUCT_REQUIREMENT_DOCUMENT_PRD.md`) menyebut alur booking survei dan verifikasi legalitas, tetapi tidak menyebut mekanisme negosiasi harga/offer sebagai bagian Fase 1 — fitur ini kemungkinan besar termasuk cakupan fase lanjutan dan HARUS dikonfirmasi ke Product sebelum diimplementasikan, bukan diasumsikan sudah dalam scope.
- **Proposed Entity Shape:**
  ```
  Offer {
    id           uuid PK
    propertyId   uuid FK -> PROPERTY.id
    buyerId      uuid FK -> USER.id
    amount       decimal(12,2)
    note         string?
    status       enum "SUBMITTED, ACCEPTED, REJECTED, EXPIRED, WITHDRAWN"
    expiresAt    datetime?
    createdAt    datetime
    updatedAt    datetime
  }
  ```
- **Otorisasi (mengikuti pola RLS Booking yang sudah ada):** Buyer hanya boleh melihat/menarik `Offer` miliknya sendiri (`buyerId` cocok dengan sesi); Owner properti terkait boleh melihat/merespons offer pada propertinya — pola ini identik dengan aturan `Buyer`/`Owner` pada `BOOKING` di `49_RLS_DOCUMENTATION.md`, dan harus direplikasi eksplisit saat entitas `Offer` dimodelkan.
- **Local State:** Nominal penawaran di form menggunakan state lokal dengan validasi Zod (`amount > 0`, opsional minimum persentase dari `PROPERTY.price`).

## 5. API Endpoints Referenced
- Memerlukan entitas database baru (`Offer`) yang belum ada di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — lihat rekomendasi audit Tahap 3. Endpoint yang diusulkan: `GET /api/v1/offers` (list milik Buyer, cursor pagination), `POST /api/v1/offers` (`{ propertyId, amount, note }`), `PATCH /api/v1/offers/:id/status` (`{ status: "WITHDRAWN" }` untuk Buyer menarik penawaran) mengikuti konvensi REST yang sudah ada (identik pola `PATCH /api/v1/bookings/:id/status`).
- `GET /api/v1/properties/:id` — sudah ada, dipakai untuk menampilkan harga listing asli sebagai pembanding nominal offer.

## 6. Acceptance Criteria (DoD)
- [ ] Tab kosong menampilkan `EmptyState` dengan ikon 48px Light Gray, teks Cool Gray, tombol CTA Royal Blue — tidak pernah blank.
- [ ] Form pengajuan offer memvalidasi nominal harus berupa angka positif dan menampilkan pembanding harga listing asli secara real-time.
- [ ] "Tarik Penawaran" hanya tersedia untuk offer berstatus "Diajukan"; disembunyikan untuk status final (Diterima/Ditolak/Kadaluarsa).
- [ ] Status offer ditampilkan dengan Badge warna berbeda per status, kontras AA-compliant.
- [ ] Karena fitur ini belum ada backingnya, halaman WAJIB menampilkan banner non-blocking "Fitur dalam pengembangan" bila endpoint `/api/v1/offers` mengembalikan 404/501, bukan menampilkan error generik yang membingungkan Buyer.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `HandCoins` | Header halaman "Penawaran Saya" | 20px |
| `TrendingUp` | Indikator nominal offer relatif ke harga listing | 16px |
| `CircleCheck` | Badge status "Diterima" | 14px |
| `CircleX` | Badge status "Ditolak"/tombol tarik penawaran | 14px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)
Halaman ini **DIWAJIBKAN** mematuhi pedoman visual `Mockup.png` — standar "Apple × Airbnb × Stripe × Zillow":

- **Background Utama:** `White`, daftar penawaran sebagai kartu `rounded-2xl` dengan nominal offer ditonjolkan besar (mirip tampilan harga properti publik).
- **Empty State (wajib untuk halaman berbasis daftar ini):** Ikon Lucide besar `48px` Light Gray, teks panduan Cool Gray, tombol aksi Royal Blue ("Cari Properti") — sesuai `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` §2.3.
- **Warna Aksi Utama:** `Royal Blue` (`blue-700`) untuk "Ajukan Penawaran Baru"; status hijau/merah lembut untuk badge diterima/ditolak.
- **Card & Elevation:** Diffused soft shadow, sudut `rounded-2xl`, konsisten dengan kartu modul lain di dashboard.

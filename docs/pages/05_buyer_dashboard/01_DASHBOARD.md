# DASHBOARD PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Dashboard (Ringkasan)
**Module:** 05 BUYER DASHBOARD
**Screen ID:** SCR-101 (`18_SCREEN_INVENTORY.md` §8.2)
**Purpose:** Halaman pendaratan (landing) setelah Buyer login. Menyajikan ringkasan agregat aktivitas akun: jumlah jadwal survei aktif, status booking terakhir, dan properti yang baru-baru ini disimpan/dilihat — sebagai jalan pintas navigasi ke modul lain, bukan sumber data primer itu sendiri.

## 2. Next.js Routing Path
```text
app/(dashboard)/dashboard/page.tsx
```
Path publik sesuai `18_SCREEN_INVENTORY.md` SCR-101: `/dashboard`.

## 3. Required UI Components (Shadcn/ui)
- `Card` — 4 kartu ringkasan (KPI): "Survei Mendatang", "Booking Menunggu Konfirmasi", "Properti Disimpan", "Pesan Belum Dibaca".
- `Avatar` — foto profil + salam nama Buyer (dari `USER.name`).
- `Badge` — status warna pada tiap booking ringkas (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`).
- `Table`/`List` ringkas — 3 booking terdekat (subset dari `06_SCHEDULE.md`).
- `Button` (`variant="link"`, Royal Blue) — "Lihat Semua" pada tiap kartu, mengarah ke halaman modul terkait.
- `Skeleton` — loading state untuk tiap kartu KPI saat data RSC belum resolve.
- `EmptyState` — ditampilkan jika Buyer belum punya booking maupun properti tersimpan sama sekali (akun baru).

## 4. Data & State Management
- **Server State (RSC):** Dashboard mengagregasi data dari entitas yang SUDAH ada di `40_ERD.md`:
  - `BOOKING` (filter `buyerId = session.user.id`) — untuk kartu "Survei Mendatang" & "Booking Menunggu Konfirmasi", diambil dari `GET /api/v1/bookings`.
  - `PROPERTY` (via relasi `BOOKING.propertyId`) — untuk menampilkan judul & alamat singkat properti pada tiap booking ringkas.
- **Gap:** Kartu "Properti Disimpan" (jumlah wishlist) bergantung pada entitas `SavedProperty` yang **belum ada** di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — lihat gap detail di `03_SAVED_PROPERTY.md`. Kartu "Pesan Belum Dibaca" bergantung pada entitas `Message`/`Notification` yang juga **belum ada** — lihat gap di `09_MESSAGES.md` dan `10_NOTIFICATION.md`. Sampai entitas tersebut dimodelkan (lihat rekomendasi audit Tahap 3), kartu-kartu ini harus dirender dengan nilai default `0`/state kosong, bukan data statis palsu.
- **Local State:** Tab pemilih rentang ringkasan (mis. "7 hari" vs "30 hari") disimpan di URL search param, bukan client state murni, agar dapat di-share/RSC-fetch ulang.

## 5. API Endpoints Referenced
- `GET /api/v1/bookings?buyerId={session.id}&limit=3` — sudah ada, dipakai untuk ringkasan booking.
- `GET /api/v1/properties/:id` — sudah ada, dipakai untuk hydrate detail properti tiap booking ringkas.
- Proposed (menunggu entitas baru, belum diimplementasikan): `GET /api/v1/favorites?limit=1` (hitung total saja) dan `GET /api/v1/notifications?unread=true&limit=1` — lihat gap masing-masing di `03_SAVED_PROPERTY.md` dan `10_NOTIFICATION.md`.

## 6. Acceptance Criteria (DoD)
- [ ] Semua 4 kartu KPI merender skeleton saat loading, tidak pernah menampilkan `undefined`/`NaN`.
- [ ] Kartu yang bergantung pada entitas belum-ada (Favorit, Pesan) merender `0` dan tidak error 500 jika endpoint proposed belum diimplementasikan backend.
- [ ] Akun baru tanpa booking/wishlist menampilkan satu `EmptyState` gabungan dengan CTA "Cari Properti" (bukan 4 kartu kosong terpisah).
- [ ] Setiap "Lihat Semua" mengarah ke rute modul yang benar (`/dashboard/bookings`, `/dashboard/saved`, dst).
- [ ] Lolos audit Lighthouse Accessibility > 90; seluruh kartu dapat diakses via keyboard (tab order logis).

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `LayoutDashboard` | Header halaman "Ringkasan" | 20px |
| `CalendarClock` | Kartu "Survei Mendatang" | 24px |
| `Heart` | Kartu "Properti Disimpan" | 24px |
| `MessageSquare` | Kartu "Pesan Belum Dibaca" | 24px |
| `ChevronRight` | Tautan "Lihat Semua" pada tiap kartu | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)
Halaman ini **DIWAJIBKAN** untuk dibangun dengan mematuhi pedoman visual dari `Mockup.png` guna mencapai standar desain "Apple × Airbnb × Stripe × Zillow":

- **Background Utama:** Dominan `White` untuk memberi ruang bernapas (*Whitespace*).
- **Warna Aksi Utama:** `Royal Blue` (`blue-700`) untuk tombol dan tautan aktif.
- **Teks Utama & Heading:** `Dark Navy` (`slate-900`), teks sekunder `Cool Gray` (`slate-500`). Dilarang keras `#000000` pekat.
- **Card & Elevation:** Kartu KPI menggunakan efek bayangan ultra-lembut (*Diffused Soft Shadow*), sudut `rounded-2xl`.
- **Grid:** Kartu KPI disusun grid responsif 1 kolom (mobile) → 4 kolom (desktop).

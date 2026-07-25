# SCHEDULE PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Schedule (Jadwal Survey Saya)
**Module:** 05 BUYER DASHBOARD
**Screen ID:** SCR-102 — "My Bookings" (`18_SCREEN_INVENTORY.md` §8.2: "Daftar jadwal survei yang tertunda, disetujui, atau selesai.")
**Purpose:** Sesuai PRD ("Dapat menjadwalkan survei..."), halaman ini adalah pusat kendali Buyer atas seluruh jadwal survei properti: melihat status, membatalkan booking yang masih `PENDING`/`CONFIRMED`, dan meninjau riwayat survei yang telah selesai.

## 2. Next.js Routing Path
```text
app/(dashboard)/dashboard/bookings/page.tsx
```
Rute publik sesuai `18_SCREEN_INVENTORY.md` SCR-102: `/dashboard/bookings`.

## 3. Required UI Components (Shadcn/ui)
- `Tabs` — filter status: "Semua", "Menunggu" (`PENDING`), "Terkonfirmasi" (`CONFIRMED`), "Selesai" (`COMPLETED`), "Dibatalkan" (`CANCELLED`).
- `Table`/`Card` list — kolom: thumbnail properti, judul & alamat, `surveyDate`, `timeSlot` (Badge: Pagi/Siang/Sore), status (`Badge` berwarna sesuai status).
- `Button` (`variant="destructive"`, outline) — "Batalkan Jadwal", hanya aktif untuk booking berstatus `PENDING`/`CONFIRMED` milik Buyer sendiri.
- `AlertDialog` — konfirmasi pembatalan jadwal survei.
- `Skeleton` — loading state tabel/list.
- `EmptyState` — per-tab, mis. "Belum ada jadwal survei yang menunggu" + CTA "Cari Properti untuk Disurvei".

## 4. Data & State Management
- **Server State:** Entitas `BOOKING` SUDAH ada penuh di `40_ERD.md`: `id`, `propertyId` (FK), `buyerId` (FK), `surveyDate` (date), `timeSlot` (enum `MORNING, AFTERNOON, EVENING`), `status` (enum `PENDING, CONFIRMED, COMPLETED, CANCELLED`), `createdAt`.
- **Otorisasi (Application-level RLS, `49_RLS_DOCUMENTATION.md` §Aturan Buyer):** "Seorang Buyer hanya boleh melihat detail tabel Booking jika `buyerId` cocok dengan ID mereka, ATAU jika status pemesanan terhubung dengan properti yang bersifat `FULLY_VERIFIED`." Query list halaman ini WAJIB difilter `buyerId = session.user.id` di server, bukan hanya disembunyikan di UI.
- **Relasi:** `PROPERTY` (via `BOOKING.propertyId`) di-join untuk menampilkan judul, alamat, dan status verifikasi properti pada tiap baris.
- **Local State:** Tab filter status disimpan sebagai URL search param (`?status=PENDING`) agar dapat di-bookmark/share dan tetap RSC-friendly.

## 5. API Endpoints Referenced
- `GET /api/v1/bookings` — sudah ada (`56_AUTHORIZATION_MATRIX.md`: Buyer YES "miliknya"). Mendukung filter `status` dan cursor pagination.
- `POST /api/v1/bookings` — sudah ada, dipakai dari alur "Jadwalkan Survei" pada halaman detail properti (di luar modul ini, tapi mengisi data yang tampil di sini).
- `PATCH /api/v1/bookings/:id/status` — sudah ada (`56_AUTHORIZATION_MATRIX.md`: Buyer YES "miliknya", untuk aksi Batal/Selesai). Dipakai tombol "Batalkan Jadwal" dengan payload `{ status: "CANCELLED" }`.

## 6. Acceptance Criteria (DoD)
- [ ] Tab "Menunggu"/"Terkonfirmasi"/"Selesai"/"Dibatalkan" masing-masing menampilkan `EmptyState` spesifik ketika 0 booking — bukan tabel kosong tanpa penjelasan.
- [ ] Tombol "Batalkan Jadwal" hanya muncul/aktif pada baris berstatus `PENDING` atau `CONFIRMED`; disembunyikan total untuk `COMPLETED`/`CANCELLED`.
- [ ] Pembatalan booking WAJIB melalui `AlertDialog` konfirmasi sebelum memanggil `PATCH /api/v1/bookings/:id/status`.
- [ ] Server menolak (403) upaya melihat/membatalkan booking milik Buyer lain — divalidasi ulang di server terlepas dari apa yang dikirim client (sesuai RLS aplikasi).
- [ ] Tabel/list sepenuhnya dapat dinavigasi keyboard (baris fokus-able, aksi via `Enter`/`Space`).

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `CalendarCheck2` | Header halaman "Jadwal Survey Saya" | 20px |
| `Clock3` | Badge `timeSlot` (Pagi/Siang/Sore) | 14px |
| `XCircle` | Tombol "Batalkan Jadwal" | 16px |
| `CalendarX2` | Empty state per-tab (48px, Light Gray) | 48px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)
Halaman ini **DIWAJIBKAN** mematuhi pedoman visual `Mockup.png` — standar "Apple × Airbnb × Stripe × Zillow":

- **Background Utama:** `White`, tabel/list dengan garis pembatas tipis `slate-50` antar baris (bukan border tebal).
- **Badge Status:** `CONFIRMED`/`COMPLETED` hijau lembut, `PENDING` kuning/amber lembut, `CANCELLED` abu, seluruhnya dengan teks kontras AA-compliant.
- **Empty State (wajib untuk daftar per-tab):** Ikon Lucide besar `48px` Light Gray, teks Cool Gray, tombol CTA Royal Blue — sesuai `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` §2.3.
- **Warna Aksi Utama:** `Royal Blue` (`blue-700`) untuk tab aktif; tombol batal memakai warna destruktif merah lembut, bukan Royal Blue, agar niat aksi jelas berbeda.

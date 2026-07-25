# SCHEDULE VIEWING PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Schedule Viewing
**Module:** 04 PROPERTY DETAIL
**Purpose:** Alur inti konversi Buyer — memungkinkan pengguna memilih tanggal dan slot waktu untuk survey lokasi fisik properti, lalu mengirimkan booking. Ini adalah implementasi utama CTA "Jadwalkan Survey Lokasi" pada halaman `01_PROPERTY_DETAIL.md`, dan mewajibkan pengguna berstatus Buyer yang sudah login (FR-BOOK-001).

## 2. Next.js Routing Path
```text
app/(main)/p/[slug]/@modal/(.)schedule-viewing/page.tsx   // Intercepting Route
```
Dipicu dari tombol besar "Jadwalkan Survey Lokasi" di panel booking sticky (kolom kanan 35%) halaman detail. Jika pengguna adalah Guest, route yang sama membuka Auth Modal terlebih dahulu (lihat §6) sebelum kalender booking muncul — keduanya menggunakan mekanisme Intercepting Route yang sama sehingga URL/konteks halaman properti tidak pernah hilang.

## 3. Required UI Components (Shadcn/ui + Custom)
- `Dialog` (Shadcn) sebagai kontainer alur booking.
- `Calendar` (Shadcn, mode single-date) — kalender interaktif memilih `surveyDate`, tanggal lampau dan tanggal penuh (fully booked) di-disable secara visual.
- Custom `TimeSlotPicker` — grup tombol pilihan `MORNING` / `AFTERNOON` / `EVENING`, slot yang sudah terisi ditampilkan disabled dengan label "Penuh".
- `Button` (primary, full-width) — "Konfirmasi Jadwal Survey", disabled sampai tanggal + slot terpilih.
- `Toast`/`Alert` — untuk menampilkan error `SLOT_UNAVAILABLE` dan pesan sukses.
- Auth Modal (komponen bersama modul Auth, di-embed via Intercepting Route terpisah, direferensikan bukan dimiliki oleh halaman ini).

## 4. Data & State Management
- **Entity:** `BOOKING` (id, propertyId, buyerId, surveyDate, timeSlot, status). `buyerId` **tidak pernah** dikelola sebagai state di client dan tidak pernah dikirim dalam request — diinfer dari sesi login di server (lihat §5).
- **Local State:** `selectedDate` (Date), `selectedTimeSlot` (`MORNING`/`AFTERNOON`/`EVENING`), `isSubmitting` (boolean saat request booking berjalan), `bookingResult` (sukses/error setelah submit).
- **Auth Gate State:** Jika `session === null` (Guest), state `isAuthModalOpen` diaktifkan sebelum kalender ditampilkan; setelah OTP/login sukses, state ini otomatis berpindah ke tampilan kalender tanpa navigasi halaman (context preserved).
- **Server State:** Ketersediaan slot per tanggal idealnya diambil dari server (daftar slot yang sudah penuh untuk properti ini) agar kalender tidak menampilkan slot yang pasti gagal — direfresh ulang setiap kali terjadi `SLOT_UNAVAILABLE` (lihat DoD).

## 5. API Endpoints Referenced
- `POST /api/v1/bookings` — body: `{ propertyId, surveyDate, timeSlot }`. **`buyerId` TIDAK PERNAH dikirim dari client** — diinfer secara aman dari sesi (cookie/JWT) di server sesuai `53_REQUEST_AND_RESPONSE_SPECIFICATION.md`. Respons sukses (JSend `{status:"success", data:{booking}}`) memicu tampilan pesan: *"Agen kami akan menghubungi Anda via WhatsApp dalam 5 menit."*
- `PATCH /api/v1/bookings/:id/status` — digunakan pada alur pembatalan booking (di luar cakupan utama halaman ini, direferensikan untuk halaman riwayat booking Buyer).
- **Error `SLOT_UNAVAILABLE` (409)** — sesuai `54_ERROR_CODE_CATALOGUE.md`, dikembalikan jika slot yang dipilih baru saja diambil pengguna lain. Frontend wajib menangani ini secara spesifik (lihat DoD), bukan sebagai error generik.

## 6. Acceptance Criteria (DoD)
- [ ] Jika pengguna Guest menekan "Jadwalkan Survey Lokasi", Auth Modal terbuka via Intercepting Route **tanpa hard navigation** — URL halaman properti tetap utuh, tidak redirect ke `/login` terpisah.
- [ ] Setelah login/OTP sukses, pengguna otomatis melanjutkan ke tampilan kalender+slot **tanpa perlu menekan tombol CTA lagi** (konteks dan pilihan sebelumnya, jika ada, dipertahankan).
- [ ] Saat `POST /api/v1/bookings` mengembalikan `409 SLOT_UNAVAILABLE`: (a) daftar tanggal/slot di-refresh otomatis dari server, (b) tampilkan pesan jelas ke pengguna bahwa slot baru saja diambil orang lain, (c) pengguna diarahkan memilih ulang tanpa kehilangan tanggal yang sudah benar (hanya slot yang direset).
- [ ] Setelah booking sukses, tampilkan pesan next-step eksplisit: "Agen kami akan menghubungi Anda via WhatsApp dalam 5 menit" — bukan sekadar "Berhasil".
- [ ] Tombol "Konfirmasi Jadwal Survey" disabled selama `isSubmitting` untuk mencegah double-submit/double-booking.
- [ ] Kalender dan time-slot picker sepenuhnya dapat dioperasikan via keyboard.

## 7. Iconography Specification

**Library:** Lucide React ONLY. Stroke width `1.5`.

| Icon | Penggunaan | Ukuran | Warna | Catatan A11y |
|---|---|---|---|---|
| `Calendar` | Ikon tombol CTA utama "Jadwalkan Survey Lokasi" & header kalender | 20px | `text-white` (di atas tombol biru) | Selalu disertai label teks |
| `Clock` | Ikon pada setiap opsi `TimeSlotPicker` (Pagi/Siang/Malam) | 16px | `text-slate-700` (aktif: `text-blue-700`) | `aria-hidden`, label slot tetap teks |
| `CircleCheck` | Ikon konfirmasi pada state sukses booking | 24px | `text-green-600` | `aria-hidden="true"` |
| `CircleAlert` | Ikon pada pesan error `SLOT_UNAVAILABLE` | 20px | `text-amber-600` | Menyertai teks alert, bukan pengganti teks |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Mematuhi pedoman visual `Mockup.png` untuk standar "Apple × Airbnb × Stripe × Zillow":

- **CTA Utama:** Tombol "Jadwalkan Survey Lokasi" di panel sticky adalah elemen paling menonjol pada kolom kanan 35% — ukuran besar (`size="lg"`), `bg-blue-700`, `rounded-2xl`, dengan sedikit shadow untuk kesan "mengambang" di atas price box.
- **Kalender & Slot:** Tanggal terpilih menggunakan `bg-blue-700 text-white rounded-full`; slot waktu terpilih menggunakan border `blue-700` dengan latar `blue-50`; slot penuh menggunakan `text-muted-foreground` dengan garis coret tipis, bukan warna merah mencolok.
- **Motion:** Modal/kalender masuk menggunakan animasi spring (stiffness 300, damping 30) sesuai Design System, memberi kesan responsif namun tidak kaku.
- **Toast Error:** Pesan `SLOT_UNAVAILABLE` menggunakan varian amber (bukan merah destructive penuh) karena ini adalah kondisi race-condition wajar, bukan kesalahan pengguna.
- **Bentuk:** Seluruh kontainer (modal, kartu slot) konsisten `rounded-2xl`/`rounded-3xl` sesuai Design System modul ini.

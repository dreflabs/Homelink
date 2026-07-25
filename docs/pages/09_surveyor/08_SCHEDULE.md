# SCHEDULE PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Schedule (Jadwal Kunjungan Survei)
**Module:** 09 SURVEYOR
**Purpose:** Menampilkan jadwal kalender kunjungan survei Surveyor — memetakan tugas dari `02_ASSIGNED_SURVEY.md` ke slot waktu terencana agar Surveyor dapat mengatur rute kunjungan harian/mingguan secara efisien, termasuk jadwal yang beririsan dengan booking survei calon pembeli (`BOOKING`).

## 2. Next.js Routing Path
```text
app/(dashboard)/surveyor/schedule/page.tsx
```

## 3. Required UI Components
- `CalendarView` — tampilan kalender mingguan (default) dengan opsi harian untuk layar sempit; tiap slot menampilkan properti + alamat singkat.
- `AgendaListView` — alternatif tampilan daftar linear (lebih ramah mobile daripada grid kalender penuh) yang menjadi default di breakpoint mobile per `24_RESPONSIVE_SPECIFICATION.md`.
- `TimeSlotBadge` — menandai slot waktu (`MORNING`/`AFTERNOON`/`EVENING`, selaras dengan enum `BOOKING.timeSlot` di `40_ERD.md`) dan status (`pending`/`verified`) memakai komponen Badge yang sama dipakai di seluruh modul.
- `RescheduleActionSheet` — bottom-sheet untuk mengajukan permintaan penjadwalan ulang bila Surveyor berhalangan.
- `TodayMarker` — penanda visual jelas untuk hari ini pada kalender.

## 4. Data & State Management
- **Server State:** Data jadwal berasal dari gabungan `GET /api/v1/survey/assignments` (tenggat/prioritas tugas fisik) dan entitas `BOOKING` (`propertyId`, `surveyDate`, `timeSlot`, `status`) untuk kunjungan yang sudah terjadwal formal dengan calon pembeli/pemilik.
- **⚠️ Catatan cakupan:** `52_ENDPOINT_CATALOGUE.md` §8.5 saat ini hanya mendokumentasikan `GET /survey/assignments` dan `POST /survey/:id/report` untuk modul Surveyor — belum ada endpoint eksplisit untuk "jadwal" gabungan berbasis tanggal/slot. Halaman ini kemungkinan perlu endpoint baru (mis. `GET /api/v1/survey/schedule`) atau memakai data `BOOKING` melalui modul Transaction & Booking (`31_MODULE_BREAKDOWN.md` §8.5) — perlu koordinasi lintas modul sebelum implementasi.
- **Local State:** Tampilan aktif (Kalender vs Agenda), minggu/hari yang sedang dilihat, filter status.

## 5. API Endpoints Referenced
- `GET /api/v1/survey/assignments` — Surveyor only, dipakai sebagai salah satu sumber data (tugas fisik yang perlu dijadwalkan).
- **Gap:** Tidak ada endpoint terdokumentasi resmi untuk data jadwal berbasis kalender/slot waktu milik Surveyor secara spesifik di `52_ENDPOINT_CATALOGUE.md` §8.5 saat ini — bergantung pada entitas `BOOKING` yang secara arsitektur berada di bawah modul Transaction & Booking, bukan modul Surveyor. Perlu klarifikasi apakah modul ini butuh endpoint sendiri atau read-access ke endpoint booking modul lain.

## 6. Acceptance Criteria (DoD)
- [ ] Tampilan mobile default ke `AgendaListView` (daftar linear), bukan grid kalender penuh, sesuai prinsip mobile-first `24_RESPONSIVE_SPECIFICATION.md`.
- [ ] Setiap slot jadwal menampilkan tenggat SLA yang konsisten dengan framing di `02_ASSIGNED_SURVEY.md` (mis. jendela 24-48 jam sejak penugasan).
- [ ] `TodayMarker` selalu terlihat tanpa perlu scroll saat halaman pertama kali dibuka.
- [ ] Gap endpoint jadwal (lihat §5) dicatat sebagai prasyarat teknis sebelum sprint implementasi backend dimulai.
- [ ] `RescheduleActionSheet` mencatat permintaan penjadwalan ulang dengan jelas menyatakan bahwa persetujuan akhir tetap berada di tangan Admin/sistem penugasan, bukan otomatis disetujui.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

- **`CalendarDays`** — ikon utama halaman/navigasi tab Schedule.
- **`Clock`** — pada `TimeSlotBadge`, menandakan slot waktu kunjungan.
- **`ListTodo`** — toggle ke `AgendaListView`.
- **`CalendarClock`** — trigger `RescheduleActionSheet`, menandakan aksi ubah jadwal.

## 8. UI/UX Aesthetic Rules
Mengikuti pedoman visual standar (background putih, aksen `blue-700`, teks `slate-900`, `rounded-2xl`/`rounded-3xl`, diffused soft shadow).

Karena Surveyor mengecek jadwal ini sering kali sambil dalam perjalanan (mobile, kadang di dalam kendaraan), prioritaskan keterbacaan sekilas (glanceable): tanggal, alamat singkat, dan slot waktu harus terlihat jelas tanpa perlu membuka detail. Hindari elemen kalender grid padat khas desktop pada breakpoint mobile — gunakan agenda vertikal dengan target sentuh besar antar-hari.

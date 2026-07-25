# SCHEDULE PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Schedule (Jadwal)
**Module:** 06 OWNER DASHBOARD
**Role:** Owner
**Purpose:** Menampilkan seluruh jadwal kunjungan/survei (`BOOKING`) untuk properti-properti milik Owner, memungkinkan Owner melacak siapa (buyer) yang akan berkunjung, kapan (`surveyDate`, `timeSlot`), dan untuk properti mana. Sesuai PRD: Owner "melacak status verifikasi dan mengelola jadwal kunjungan."

## 2. Next.js Routing Path
```text
app/(dashboard)/owner/schedule/page.tsx
```
Sidebar label: "Jadwal" (per `20_NAVIGATION_MAP.md`).

## 3. Required UI Components (Shadcn/ui)
- `Calendar` (bulanan) — visualisasi tanggal dengan indikator titik pada hari yang memiliki booking.
- `Table`/`List` (agenda harian) — daftar booking untuk tanggal yang dipilih, kolom: Properti, Buyer, `timeSlot` (MORNING/AFTERNOON/EVENING), Status.
- `Badge` — status booking.
- `Tabs` — toggle antara tampilan "Kalender" dan "Daftar" (list view untuk mobile-first).
- `Empty State` — jika tidak ada booking pada tanggal/rentang yang dipilih.
- `Skeleton` — loading state kalender/daftar.

## 4. Data & State Management
- **Server State:** `GET /api/v1/bookings` — server memfilter hanya booking untuk properti dengan `ownerId = session.userId` (join implisit `BOOKING.propertyId → PROPERTY.ownerId`), tidak pernah menerima `ownerId` sebagai parameter dari client.
- **Local State:** Tanggal terpilih pada kalender (`selectedDate`), dan mode tampilan (`view: 'calendar' | 'list'`) disimpan di URL search params.
- **Fields ditampilkan:** `BOOKING.propertyId` (di-resolve ke judul properti), `BOOKING.buyerId` (di-resolve ke nama buyer), `BOOKING.surveyDate`, `BOOKING.timeSlot`, `BOOKING.status`.

## 5. API Endpoints Referenced
- `GET /api/v1/bookings` — daftar booking untuk properti milik Owner yang login; mendukung query filter rentang tanggal untuk tampilan kalender/list.

## 6. Acceptance Criteria (DoD)
- [ ] Owner hanya melihat booking untuk properti miliknya sendiri — validasi `ownerId` wajib di server melalui join dengan `PROPERTY`, bukan filter client-side semata (BOLA test wajib).
- [ ] Kalender menampilkan indikator visual pada tanggal yang memiliki booking, dan mengklik tanggal memuat daftar booking hari itu tanpa reload penuh.
- [ ] `timeSlot` (MORNING/AFTERNOON/EVENING) ditampilkan dengan label berbahasa Indonesia yang jelas (Pagi/Siang/Sore) beserta ikon pembeda.
- [ ] Empty state untuk tanggal tanpa booking menampilkan pesan netral, bukan kesan error.
- [ ] Tampilan list (mobile) dan kalender (desktop) menampilkan data yang identik dan konsisten.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `CalendarDays`
- **Purpose:** Ikon judul halaman/menu sidebar "Jadwal".
- **Size:** 24px (menu), 20px (header halaman). **Color:** `text-blue-700` saat aktif.

#### Icon: `Sunrise`
- **Purpose:** Menandai `timeSlot = MORNING`.
- **Size:** 16px, `text-amber-500`.

#### Icon: `Sun`
- **Purpose:** Menandai `timeSlot = AFTERNOON`.
- **Size:** 16px, `text-amber-600`.

#### Icon: `Sunset`
- **Purpose:** Menandai `timeSlot = EVENING`.
- **Size:** 16px, `text-orange-600`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)
- **Kalender:** Sel tanggal `rounded-xl`, tanggal terpilih diberi background `blue-700` teks putih; indikator booking berupa titik kecil `blue-500` di bawah angka tanggal.
- **Daftar Agenda:** Setiap baris booking berupa card ringkas `rounded-2xl` dengan bayangan lembut, dipisah per `timeSlot` menggunakan sub-header.
- **Background:** `White` dominan, `slate-50` untuk panel kalender agar terpisah visual dari daftar agenda.
- **Responsif:** Toggle Tabs "Kalender/Daftar" default ke "Daftar" pada mobile untuk menghindari kalender yang terlalu padat di layar kecil.

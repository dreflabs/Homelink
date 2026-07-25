# DASHBOARD PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Dashboard (Ringkasan)
**Module:** 06 OWNER DASHBOARD
**Role:** Owner
**Purpose:** Halaman pendaratan (landing) setelah Owner login — menyajikan ringkasan portofolio properti (jumlah listing per status: PENDING, PHYSICAL_VERIFIED, LEGAL_VERIFIED, FULLY_VERIFIED, REJECTED), jadwal survei terdekat (dari `BOOKING`), dan pintasan aksi cepat ("Tambah Properti Baru"). Berfungsi sebagai hub navigasi ke seluruh modul Owner Dashboard lainnya (Listing Saya, Jadwal, Pengaturan) per `20_NAVIGATION_MAP.md`.

## 2. Next.js Routing Path
```text
app/(dashboard)/owner/dashboard/page.tsx
```
Sesuai `18_SCREEN_INVENTORY.md` — halaman ini adalah SCR-200 (Owner Dashboard Home), diakses melalui sidebar item "Ringkasan".

## 3. Required UI Components (Shadcn/ui)
- `Card` — kelompok kartu statistik ringkasan (Total Properti, Menunggu Verifikasi, Terverifikasi Penuh, Survei Terjadwal).
- `Badge` — indikator status properti berwarna (mengikuti skema warna status di `05_PROPERTY_STATUS.md`).
- `Table` (ringkas, 5 baris terbaru) — daftar properti terbaru milik Owner dengan status.
- `Skeleton` — loading state untuk kartu statistik dan tabel saat data belum tersedia.
- `Empty State` (custom, icon + teks + CTA) — ditampilkan jika Owner belum punya properti sama sekali, mengarahkan ke `03_ADD_PROPERTY.md`.
- `Button` — CTA utama "Tambah Properti" (varian primer, Royal Blue).

## 4. Data & State Management
- **Server State:** RSC fetch agregat dari `GET /api/v1/properties?ownerId=me` (server MEMFILTER berdasarkan `session.userId`, bukan parameter client — lihat `63_AUTHORIZATION_SECURITY.md`). Data diagregasi di server untuk menghitung jumlah per `status` (enum `PROPERTY.status`).
- **Local State:** Tidak ada form; hanya state UI untuk collapse/expand kartu ringkasan pada mobile.
- **Booking Widget:** Fetch tambahan `GET /api/v1/bookings?ownerId=me&upcoming=true` untuk menampilkan 3 survei terdekat (field `surveyDate`, `timeSlot`).
- **Caching:** Data ringkasan di-*revalidate* setiap fokus halaman (tidak perlu real-time polling untuk Phase 1).

## 5. API Endpoints Referenced
- `GET /api/v1/properties` — difilter server-side by `ownerId = session.userId`.
- `GET /api/v1/bookings` — difilter server-side by properti milik Owner tsb.
- Tidak ada endpoint agregasi statistik khusus di Phase 1; agregasi dilakukan di server component dari hasil `GET /api/v1/properties` (bukan endpoint terpisah).

## 6. Acceptance Criteria (DoD)
- [ ] Kartu ringkasan menampilkan jumlah properti per status secara akurat dan hanya untuk properti milik Owner yang login (verifikasi `ownerId` di server, BOLA test wajib lolos).
- [ ] Empty state tampil jika Owner belum memiliki properti, dengan CTA jelas ke halaman Add Property.
- [ ] Widget survei terdekat menampilkan maksimal 3 entri terurut berdasarkan `surveyDate` terdekat.
- [ ] Halaman dirender tanpa *hydration error*; Loading Suspense aktif saat fetch berlangsung.
- [ ] Skor Lighthouse Aksesibilitas > 90.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `LayoutDashboard`
- **Purpose:** Menandai item navigasi aktif "Ringkasan" di sidebar.
- **Size:** 20px (desktop), 24px (mobile). **Color:** `text-blue-700` saat aktif, `text-slate-500` default.

#### Icon: `Home`
- **Purpose:** Ikon kartu statistik "Total Properti".
- **Size:** 24px. **Color:** `text-slate-900`.

#### Icon: `CalendarClock`
- **Purpose:** Widget survei terdekat, menandakan jadwal booking.
- **Size:** 20px. **Color:** `text-blue-700`.

#### Icon: `PlusCircle`
- **Purpose:** Tombol CTA "Tambah Properti".
- **Size:** 20px, selalu didampingi label teks (tidak `aria-hidden`).

## 8. UI/UX Aesthetic Rules (Mockup Reference)
Mengikuti pedoman desain global "Apple × Airbnb × Stripe × Zillow":
- **Background:** `White` bersih dengan whitespace generos antar kartu statistik.
- **Warna Aksi Utama:** `Royal Blue` (`blue-700`) untuk tombol CTA dan status "Terverifikasi Penuh".
- **Teks:** `Dark Navy` (`slate-900`), tanpa hitam pekat.
- **Card:** Sudut `rounded-2xl`, bayangan lembut (*diffused soft shadow*), grid 4 kolom desktop / 2 kolom tablet / 1 kolom mobile untuk kartu statistik.
- **Status Badge:** Warna badge mengikuti pemetaan tetap — PENDING (`amber-500`), PHYSICAL_VERIFIED/LEGAL_VERIFIED (`blue-500`), FULLY_VERIFIED (`green-600`), REJECTED (`red-500`) — konsisten dengan `05_PROPERTY_STATUS.md`.

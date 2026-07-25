# DASHBOARD PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Surveyor Dashboard
**Module:** 09 SURVEYOR
**Purpose:** Landing page mobile-first bagi Surveyor setelah login — memberi ringkasan cepat beban kerja hari ini (jumlah tugas survei baru, mendekati tenggat, dan yang sudah selesai) sebelum Surveyor berangkat ke lapangan. Halaman ini adalah "cockpit" ringkas, bukan tempat pengisian data — detail pengisian dilakukan di `02_ASSIGNED_SURVEY.md` dan `03_SURVEY_FORM.md`.

## 2. Next.js Routing Path
```text
app/(dashboard)/surveyor/page.tsx
```
Catatan: Rute dasar modul ini adalah `/surveyor/*` sesuai `31_MODULE_BREAKDOWN.md` §8.4 (mis. `/surveyor/tasks`). Dashboard menjadi index route `/surveyor`.

## 3. Required UI Components
- `StatSummaryCard` (x3): "Tugas Baru", "Menunggu Verifikasi", "Selesai Bulan Ini" — angka besar + Badge status.
- `TodayTaskListPreview` — 3 item teratas dari assignment list (properti + jarak + tenggat), dengan tautan "Lihat Semua" ke `02_ASSIGNED_SURVEY.md`.
- `GPSPermissionBanner` — banner peringatan persisten jika izin lokasi perangkat belum diberikan (diperlukan untuk seluruh alur upload foto lapangan).
- `QuickActionButton` — akses cepat ke "Mulai Survei Berikutnya" (deep-link ke assignment prioritas tertinggi).
- Skeleton (Loading State) untuk stat card dan list preview saat fetch berlangsung.

## 4. Data & State Management
- **Server State:** `GET /api/v1/survey/assignments` di-fetch di server (RSC) untuk menghitung agregat (total, overdue, completed) dan mengambil 3 assignment teratas diurutkan berdasarkan tenggat SLA terdekat.
- **Local State:** Status izin GPS browser (`navigator.permissions.query({name:'geolocation'})`) disimpan sebagai client state untuk mengontrol tampil/sembunyinya `GPSPermissionBanner`.
- **Derived Data:** Agregat dihitung dari field `PROPERTY.status` (mis. hitung properti dengan status `PENDING` yang sudah di-assign ke surveyorId ini) dan `VERIFICATION_AUDIT` milik surveyor yang login (`surveyorId` = user aktif) untuk menghitung "Selesai Bulan Ini".
- Tidak ada form input pada halaman ini — tidak diperlukan `react-hook-form`/Zod.

## 5. API Endpoints Referenced
- `GET /api/v1/survey/assignments` — Surveyor only (lihat `56_AUTHORIZATION_MATRIX.md` v1.0.1). Sumber utama data dashboard.
- Tidak ada endpoint tulis (write) pada halaman ini.

## 6. Acceptance Criteria (DoD)
- [ ] Stat "Menunggu Verifikasi" dan "Tugas Baru" merefleksikan data real-time dari `survey/assignments`, bukan data dummy.
- [ ] `GPSPermissionBanner` wajib tampil jika izin lokasi ditolak/belum diminta, dengan CTA jelas untuk mengaktifkan lokasi — mencegah Surveyor baru menyadari masalah GPS baru saat sudah di lapangan.
- [ ] Halaman dapat dimuat dan dibaca dengan jelas di layar 360px (mobile) tanpa horizontal scroll.
- [ ] Loading state (Skeleton) tampil maksimal 1 layout-shift sebelum data nyata masuk.
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

- **`ClipboardList`** — mewakili ringkasan "Tugas Baru"/total assignment. Ukuran 24px, warna `text-blue-700` pada stat card aktif.
- **`MapPin`** — indikator status GPS di `GPSPermissionBanner`; berubah warna `text-red-600` saat izin ditolak, `text-emerald-600` saat aktif.
- **`CheckCircle2`** — mewakili stat "Selesai Bulan Ini", warna `text-emerald-600`.
- **`ArrowRight`** — pada `QuickActionButton` dan tautan "Lihat Semua", `aria-hidden="true"` karena teks label sudah menjelaskan aksi.

## 8. UI/UX Aesthetic Rules
Mengikuti pedoman visual standar "Apple × Airbnb × Stripe × Zillow": background dominan putih, aksen `blue-700`, teks `slate-900`, card `rounded-2xl`/`rounded-3xl` dengan diffused soft shadow.

Pertimbangan khusus lapangan (field-use): karena ini modul mobile-first yang paling sering diakses di luar ruangan, stat card dan tombol aksi utama harus menggunakan kontras tinggi (bukan hanya `slate-50` pastel) agar tetap terbaca di bawah silau matahari langsung. Touch target `QuickActionButton` minimal 44x44px (Apple HIG) dan diposisikan di zona ibu jari (thumb zone) bawah layar mengingat Surveyor sering memegang perangkat dengan satu tangan sambil membawa alat ukur.

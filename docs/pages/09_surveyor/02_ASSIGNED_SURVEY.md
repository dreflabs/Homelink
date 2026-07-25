# ASSIGNED SURVEY PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Assigned Survey (Daftar Tugas Survei)
**Module:** 09 SURVEYOR
**Purpose:** Menampilkan daftar seluruh properti yang telah ditugaskan oleh sistem kepada Surveyor yang sedang login (assignment otomatis berdasarkan pemetaan kode pos terdekat, lihat `07_BUSINESS_PROCESS_DOCUMENT.md` §8.2). Halaman ini adalah titik masuk (entry point) dari alur kerja lapangan sebelum Surveyor membuka `03_SURVEY_FORM.md` untuk properti tertentu.

## 2. Next.js Routing Path
```text
app/(dashboard)/surveyor/tasks/page.tsx
```
Sesuai `31_MODULE_BREAKDOWN.md` §8.4 yang secara eksplisit menyebut rute `/surveyor/tasks`.

## 3. Required UI Components
- `AssignmentListCard` (list, bukan table — mobile-first): tiap card menampilkan alamat properti, jarak perkiraan (dihitung dari `PROPERTY.latitude/longitude` vs lokasi Surveyor), tenggat SLA, dan `Badge` status (`pending`=amber, `verified`=hijau+check).
- `FilterTabBar` — tab "Baru" / "Sedang Berjalan" / "Selesai" untuk menyaring daftar tugas.
- `SortBySelect` — urutkan berdasarkan jarak terdekat atau tenggat terdekat.
- `EmptyStateIllustration` — tampil saat tidak ada tugas aktif.
- Skeleton (Loading State) berbentuk list-card placeholder saat fetch berlangsung.

## 4. Data & State Management
- **Server State:** `GET /api/v1/survey/assignments` — field yang dikonsumsi: `PROPERTY.id, address, latitude, longitude, status`, plus metadata assignment (tenggat/SLA, jika endpoint memuatnya — perlu konfirmasi payload endpoint karena `52_ENDPOINT_CATALOGUE.md` §8.5 belum mendetailkan skema respons tenggat per-assignment).
- **Local State:** Tab filter aktif (`'new' | 'in_progress' | 'done'`), opsi sorting, dan cache lokasi GPS Surveyor saat ini (untuk kalkulasi jarak) disimpan di client state.
- **Navigation State:** Tap pada `AssignmentListCard` membawa `propertyId` sebagai parameter rute ke `03_SURVEY_FORM.md` (`/surveyor/tasks/[propertyId]/form`).
- Tidak ada form input tersimpan di halaman ini — murni tampilan daftar.

## 5. API Endpoints Referenced
- `GET /api/v1/survey/assignments` — Surveyor only (`56_AUTHORIZATION_MATRIX.md` v1.0.1). Endpoint tunggal yang memasok seluruh data halaman.
- Tidak ada endpoint POST/PATCH di halaman ini — perubahan status hanya terjadi setelah Surveyor menyelesaikan form/upload di halaman lain.

## 6. Acceptance Criteria (DoD)
- [ ] Setiap `AssignmentListCard` wajib menampilkan tenggat SLA dengan bahasa jelas (mis. "Selesaikan dalam 24–48 jam sejak penugasan" — mengikuti framing SLA yang dipakai `88_ADMIN_MANUAL.md`), bukan hanya tanggal mentah.
- [ ] Badge status wajib konsisten dengan `PROPERTY.status` (`PENDING`→amber "Menunggu", `PHYSICAL_VERIFIED`/`LEGAL_VERIFIED`/`FULLY_VERIFIED`→hijau "Terverifikasi").
- [ ] Daftar dapat difilter tanpa reload halaman penuh (client-side filter di atas data yang sudah di-fetch).
- [ ] Empty state jelas dan actionable saat tab "Baru" kosong (bukan halaman putih kosong).
- [ ] Jarak ke lokasi properti tampil dalam satuan km dengan 1 desimal, dihitung dari koordinat GPS perangkat Surveyor.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

- **`MapPin`** — menandai alamat/lokasi properti pada tiap card. 20px, `text-slate-500`.
- **`Navigation`** — ikon "jarak/arah" di samping angka km, `text-blue-700`.
- **`Clock`** — menandai tenggat SLA yang mendekati batas waktu (berubah `text-red-600` jika < 6 jam tersisa).
- **`Filter`** — trigger untuk `FilterTabBar` pada layar kecil (jika di-collapse jadi dropdown).

## 8. UI/UX Aesthetic Rules
Mengikuti pedoman visual standar (background putih, aksen `blue-700`, teks `slate-900`, `rounded-2xl`/`rounded-3xl`, diffused soft shadow).

Karena halaman ini adalah daftar yang di-scroll berulang kali sepanjang hari kerja di lapangan, `AssignmentListCard` harus memiliki target sentuh vertikal minimal 44px per baris agar mudah di-tap sambil berjalan atau memegang alat. Kontras Badge status harus tinggi (bukan pastel tipis) agar tetap terbaca di bawah sinar matahari langsung — ini pertimbangan UX field-use, bukan sekadar checklist WCAG.

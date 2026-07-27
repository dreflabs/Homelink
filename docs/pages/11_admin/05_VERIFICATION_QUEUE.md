# VERIFICATION QUEUE PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Verification Queue
**Module:** 11 ADMIN
**Purpose:** Halaman kerja inti Admin untuk menjalankan SOP verifikasi properti (SLA 24 jam) per `88_ADMIN_MANUAL.md`. Admin membandingkan dokumen sertifikat (SHM/HGB) yang diunggah dengan data KTP Owner, memeriksa foto lapangan ber-GPS dari Surveyor (dikirim via portal Surveyor), lalu memutuskan Approve (properti menjadi `FULLY_VERIFIED` dan tayang) atau Reject (wajib mengisi "Alasan Penolakan", memicu email otomatis ke Owner). Ini adalah halaman ber-orientasi ANTREAN & AKSI, bukan browsing inventory (lihat `04_PROPERTY_MANAGEMENT.md` untuk itu).

## 2. Next.js Routing Path
```text
app/(dashboard)/11_admin/verify/page.tsx
```
> Path disamakan dengan referensi resmi `31_MODULE_BREAKDOWN.md` §8.4 (`/admin/verify`).

## 3. Required UI Components (Shadcn/ui)
- `DataTable` (queue) — hanya menampilkan `PROPERTY` berstatus `PENDING`, `PHYSICAL_VERIFIED`, atau `LEGAL_VERIFIED` (belum `FULLY_VERIFIED`/`REJECTED`), diurutkan berdasarkan usia antrean (mendekati SLA di atas).
- `Badge` (SLA timer) — menampilkan sisa waktu terhadap SLA 24 jam per baris (hijau > 12 jam sisa, amber < 12 jam, merah lewat SLA).
- `Tabs` atau side-by-side `Card` pada Detail View — membandingkan data KTP Owner vs data sertifikat SHM/HGB yang diunggah, plus galeri foto lapangan ber-GPS dari Surveyor (`PROPERTY_MEDIA` dengan `mediaType=IMAGE`/`PDF_CERTIFICATE`).
- `Dialog` (Reject Modal) — berisi `Textarea` "Alasan Penolakan" **wajib diisi**, tombol submit disabled hingga field terisi.
- `Button` (Approve, variant default hijau/blue-700) dan (Reject, variant destructive) — keduanya dapat diakses via keyboard (Tab-focusable, bukan hover-only).
- `Skeleton` — loading state untuk daftar antrean dan galeri media.

## 4. Data & State Management
- **Entitas inti:** `VERIFICATION_AUDIT(id, propertyId, surveyorId, action[APPROVED_PHYSICAL, REJECTED_LEGAL], notes, createdAt)` — merekam riwayat aksi verifikasi per properti; halaman ini membaca riwayat ini untuk menampilkan status pemeriksaan Surveyor sebelum keputusan final Admin, dan menulis entri baru untuk aksi Approve/Reject Admin sendiri.
- **Data pembanding:** `USER` (untuk KTP/identitas Owner), `PROPERTY` (status & metadata), `PROPERTY_MEDIA` (sertifikat & foto GPS).
- **Local State:** item antrean yang sedang dibuka (`selectedPropertyId`), draft teks `Textarea` "Alasan Penolakan" (`rejectionReasonDraft`), state buka/tutup Reject Modal.
- **Server State:** RSC fetch daftar antrean dengan cursor pagination, di-filter server-side by status bukan client-side (agar SLA badge akurat berdasarkan data terbaru).
- **Efek samping aksi Reject:** submit memicu email otomatis ke Owner (di luar scope UI ini, ditangani backend/notification service) dan menulis `notes` = alasan penolakan ke `VERIFICATION_AUDIT`.

## 5. API Endpoints Referenced
- `GET /api/v1/properties?status=PENDING,PHYSICAL_VERIFIED,LEGAL_VERIFIED` — mengambil daftar antrean.
- `PATCH /api/v1/properties/:id/status` — Admin-only, dipakai untuk Approve (set `FULLY_VERIFIED`) dan Reject (set `REJECTED` + body `{ reason: string }`), sesuai `56_AUTHORIZATION_MATRIX.md`.
- **GAP:** Belum ada endpoint terdokumentasi untuk membaca riwayat `VERIFICATION_AUDIT` per properti (mis. `GET /api/v1/properties/:id/verification-audit`) — dibutuhkan agar Admin bisa melihat catatan pemeriksaan fisik Surveyor sebelum memutuskan verifikasi legal.

## 6. Acceptance Criteria (DoD)
- [ ] Tombol Reject TIDAK DAPAT disubmit jika field "Alasan Penolakan" kosong — validasi Zod + `aria-required="true"` pada Textarea.
- [ ] Approve/Reject sepenuhnya dapat dijangkau via keyboard (fokus terlihat jelas, urutan tab logis: baris → tombol aksi → modal → textarea → submit).
- [ ] Setiap Approve mengubah `PROPERTY.status` menjadi `FULLY_VERIFIED` dan properti langsung tayang (live) di listing publik.
- [ ] Setiap Reject memicu email otomatis ke Owner berisi alasan penolakan yang diinput Admin.
- [ ] Badge SLA menghitung mundur dari `createdAt`/waktu masuk antrean dan berubah warna sesuai ambang batas (12 jam, 20 jam, lewat 24 jam).
- [ ] Galeri foto lapangan menampilkan metadata GPS (lat/long) yang jelas per foto, bukan hanya gambar polos.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `CheckCircle2`
- **Purpose:** Tombol aksi "Approve". **Size:** 18px. **Color:** `text-white` di atas background `bg-blue-700` (tombol solid), bukan `text-muted-foreground`.

#### Icon: `XCircle`
- **Purpose:** Tombol aksi "Reject". **Size:** 18px. **Color:** `text-red-600` (tombol variant destructive-outline).

#### Icon: `Clock`
- **Purpose:** Ikon pada Badge SLA timer di tiap baris antrean. **Size:** 14px. **Color:** mengikuti warna Badge (hijau/amber/merah).

#### Icon: `FileCheck2`
- **Purpose:** Menandai dokumen sertifikat (SHM/HGB) yang sudah dicocokkan pada Detail View. **Size:** 18px. **Color:** `text-slate-500`, berubah `text-emerald-600` setelah dicentang cocok.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.8 Admin Dashboard for the full workspace design system. Page-specific deltas below:

Mengikuti Design System global: background `White`, aksi utama `Royal Blue` (`blue-700`), teks `slate-900`, surface sekunder `slate-50`, shadow ultra-lembut, radius `rounded-2xl`/`rounded-3xl`.

**Catatan kepadatan khusus Admin:** Ini adalah halaman moderasi paling kritis-waktu di modul Admin — badge SLA harus selalu terlihat tanpa scroll horizontal, dan tombol Approve/Reject harus reachable tanpa hover (persyaratan aksesibilitas keras, bukan hanya rekomendasi) karena keduanya adalah aksi yang mengubah status hukum/bisnis properti secara permanen.

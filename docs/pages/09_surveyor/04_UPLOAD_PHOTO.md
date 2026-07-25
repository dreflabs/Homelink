# UPLOAD PHOTO PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Upload Photo (Unggah Foto Inspeksi Berbasis GPS)
**Module:** 09 SURVEYOR
**Purpose:** Memungkinkan Surveyor mengambil/mengunggah foto lokasi properti langsung dari kamera smartphone dengan metadata GPS terlampir, sesuai kebutuhan stakeholder (`06_STAKEHOLDER_REQUIREMENT_SPECIFICATION.md` §8.3: "mengambil foto berbasis GPS"). Foto ini menjadi bukti utama anti-fraud "Ghost Listing" (`61_THREAT_MODEL.md`) yang membuktikan Surveyor benar-benar hadir secara fisik di lokasi.

## 2. Next.js Routing Path
```text
app/(dashboard)/surveyor/tasks/[propertyId]/upload-photo/page.tsx
```
Diakses sebagai modal/sub-halaman dari `03_SURVEY_FORM.md` melalui `PhotoAttachmentTrigger`.

## 3. Required UI Components
- `CameraCaptureButton` — tombol besar berlabel jelas ("Ambil Foto") yang membuka kamera perangkat langsung (`<input type="file" accept="image/*" capture="environment">` atau native camera API), bukan hanya ikon tanpa teks.
- `GPSTagIndicator` — indikator status GPS real-time (aktif/lemah/tidak tersedia) yang tampil SEBELUM foto diambil, dengan warna status jelas.
- `PhotoThumbnailGrid` — grid thumbnail foto yang sudah diambil/diunggah dalam sesi ini, dengan progress bar upload per-item dan opsi hapus.
- `UploadProgressBar` — indikator progres unggah langsung ke R2 via pre-signed URL per foto.
- `GPSMissingBlockerModal` — modal blocking yang wajib tampil jika foto diambil tanpa metadata GPS valid (lihat Acceptance Criteria).

## 4. Data & State Management
- **Local State:** Status izin GPS perangkat, antrian foto yang sedang diproses (`queued | uploading | done | failed`), dan progres upload per file.
- **Server State (write):** Setelah foto dipilih, client memanggil `POST /api/v1/media/presigned-url` untuk mendapatkan URL sementara, lalu mengunggah file langsung ke bucket R2 (client-to-bucket, bukan lewat backend) sesuai strategi di `37_DATABASE_ARCHITECTURE.md`: "Backend hanya men-generate Pre-signed URL, lalu client mengunggah file langsung ke bucket R2".
- **Data Model:** Setiap foto yang berhasil diunggah dicatat sebagai baris `PROPERTY_MEDIA` dengan `mediaType = 'IMAGE'`, `propertyId`, `s3Url`, `isPrimary` (foto pertama/sampul dapat ditandai primary).
- **Metadata GPS:** Koordinat EXIF/GPS foto divalidasi di client sebelum upload; foto tanpa data GPS valid tidak boleh masuk antrian upload (lihat §6).

## 5. API Endpoints Referenced
- `POST /api/v1/media/presigned-url` — akses "Logged In" (`52_ENDPOINT_CATALOGUE.md`), dipanggil sekali per foto untuk mendapatkan URL upload langsung ke R2.
- Upload file aktual terjadi via PUT langsung ke URL R2 yang dikembalikan (bukan endpoint HomeLink).
- Referensi `PROPERTY_MEDIA.id` hasil upload kemudian disertakan dalam payload `POST /api/v1/survey/:id/report` (lihat `03_SURVEY_FORM.md`) sebagai lampiran laporan.

## 6. Acceptance Criteria (DoD)
- [ ] **Wajib:** Jika perangkat tidak dapat memberikan data GPS (izin ditolak, GPS mati, atau EXIF foto tidak memuat koordinat), sistem **memblokir** proses unggah dan menampilkan `GPSMissingBlockerModal` dengan instruksi jelas untuk mengaktifkan lokasi — TIDAK boleh diam-diam menerima foto tanpa GPS (mitigasi fraud "Ghost Listing" per `61_THREAT_MODEL.md`).
- [ ] `CameraCaptureButton` memiliki label teks yang terlihat, bukan hanya ikon kamera, agar jelas fungsinya di kondisi lapangan yang terburu-buru.
- [ ] Upload menggunakan strategi pre-signed URL (client-to-R2 langsung) — backend tidak menerima body file secara langsung.
- [ ] Foto yang gagal diunggah (mis. koneksi terputus) dapat di-retry dari `PhotoThumbnailGrid` tanpa perlu mengambil ulang foto.
- [ ] Minimal 1 foto tervalidasi GPS wajib ada sebelum Surveyor dapat melanjutkan ke `06_VERIFICATION.md`.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

- **`Camera`** — ikon utama pada `CameraCaptureButton`, 24px, selalu didampingi label teks "Ambil Foto".
- **`MapPin`** — pada `GPSTagIndicator`; `text-emerald-600` saat GPS valid, `text-red-600` saat tidak tersedia/ditolak.
- **`UploadCloud`** — pada `UploadProgressBar`, menandakan proses kirim ke R2 sedang berlangsung.
- **`XCircle`** — tombol hapus thumbnail pada `PhotoThumbnailGrid`, `text-slate-500`, disertai `aria-label="Hapus foto"`.

## 8. UI/UX Aesthetic Rules
Mengikuti pedoman visual standar (background putih, aksen `blue-700`, teks `slate-900`, `rounded-2xl`/`rounded-3xl`, diffused soft shadow).

Ini halaman paling "mobile-first" dari seluruh modul: `CameraCaptureButton` harus menjadi elemen dominan di layar (bukan tombol kecil di sudut), berukuran besar dan berkontras tinggi agar tetap mudah ditemukan dan ditekan meski Surveyor mengenakan sarung tangan atau berada di bawah silau matahari. `GPSMissingBlockerModal` harus menggunakan warna peringatan (`amber`/`red`) yang tegas, bukan sekadar teks abu-abu, karena kegagalan menangkap sinyal ini berdampak langsung pada validitas anti-fraud sistem.

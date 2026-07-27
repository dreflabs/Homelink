# UPLOAD VIDEO PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Upload Video (Unggah Video Dokumentasi Lapangan)
**Module:** 09 SURVEYOR
**Purpose:** Melengkapi dokumentasi visual inspeksi fisik dengan video walkthrough singkat properti (mis. video panning ruangan/eksterior) sebagai bukti tambahan di luar foto statis. Halaman ini melengkapi `04_UPLOAD_PHOTO.md` dalam alur pengumpulan bukti sebelum `06_VERIFICATION.md`.

## 2. Next.js Routing Path
```text
app/(dashboard)/surveyor/tasks/[propertyId]/upload-video/page.tsx
```

## 3. Required UI Components
- `VideoCaptureButton` — tombol besar berlabel jelas ("Rekam Video") membuka perekaman kamera perangkat (`<input type="file" accept="video/*" capture="environment">`).
- `VideoPreviewPlayer` — pemutar preview video sebelum dikonfirmasi untuk diunggah, dengan opsi rekam ulang.
- `UploadProgressBar` — indikator progres unggah (video berukuran besar, progres persentase penting untuk sinyal lapangan lemah).
- `DurationSizeWarning` — peringatan jika durasi/ukuran video melebihi batas yang direkomendasikan (perlu ditentukan oleh tim Backend — belum ada batas resmi terdokumentasi).

## 4. Data & State Management
- **Local State:** Status rekaman (`idle | recording | preview | uploading | done`), progres upload, dan validasi ukuran file sebelum submit.
- **Server State (write):** Sama seperti alur foto — client memanggil `POST /api/v1/media/presigned-url` untuk mendapat URL R2 sementara, lalu mengunggah file video langsung ke bucket (client-to-bucket) sesuai strategi pre-signed URL di `37_DATABASE_ARCHITECTURE.md`.
- **⚠️ GAP SKEMA DATA (kritis untuk halaman ini):** `PROPERTY_MEDIA.mediaType` di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` saat ini **hanya mendefinisikan `IMAGE` dan `PDF_CERTIFICATE`** — **tidak ada nilai `VIDEO`**. `mediaType` perlu diperluas dengan nilai `VIDEO`, belum ada di `40_ERD.md`/`42_TABLE_SPECIFICATION.md`. Sampai perubahan skema ini disetujui dan dimigrasikan, penyimpanan referensi video ke `PROPERTY_MEDIA` tidak dapat diimplementasikan sesuai desain saat ini — ini blocker desain, bukan detail implementasi kecil.
- Karena gap di atas, halaman ini secara fungsional **tidak dapat dianggap production-ready** sampai skema database diperbarui; dokumen ini menandai kebutuhan tersebut secara eksplisit agar tidak diasumsikan diam-diam oleh tim engineering.

## 5. API Endpoints Referenced
- `POST /api/v1/media/presigned-url` — akses "Logged In" (`52_ENDPOINT_CATALOGUE.md`) — dapat digunakan untuk video jika ukuran/tipe MIME video ditambahkan ke whitelist endpoint ini (perlu konfirmasi, karena dokumen endpoint saat ini tidak secara eksplisit menyebut tipe video).
- `POST /api/v1/survey/:id/report` — untuk menyertakan referensi video sebagai bagian laporan, sama seperti foto, TERGANTUNG pada resolusi gap `mediaType VIDEO` di atas.

## 6. Acceptance Criteria (DoD)
- [ ] **Blocker eksplisit:** Fitur ini tidak dapat go-live sampai `PROPERTY_MEDIA.mediaType` diperluas dengan nilai `VIDEO` di `40_ERD.md` dan `42_TABLE_SPECIFICATION.md`, serta migrasi database terkait disetujui tim Backend.
- [ ] Video dengan durasi/ukuran berlebih ditolak sebelum upload dimulai (bukan gagal di tengah proses unggah), dengan pesan error yang jelas.
- [ ] Upload video menggunakan strategi pre-signed URL yang sama seperti foto — tidak boleh melewati body request backend Node.js.
- [ ] Surveyor dapat melihat preview dan merekam ulang sebelum konfirmasi unggah final.
- [ ] Progres upload video ditampilkan sebagai persentase (bukan hanya spinner), mengingat ukuran file video jauh lebih besar dari foto di kondisi jaringan lapangan yang mungkin lambat.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

- **`Video`** — ikon utama pada `VideoCaptureButton`, 24px, didampingi label teks "Rekam Video".
- **`Play`** — tombol putar pada `VideoPreviewPlayer`.
- **`RotateCcw`** — tombol "Rekam Ulang" pada layar preview.
- **`AlertTriangle`** — pada `DurationSizeWarning`, `text-amber-600`, menandakan video melebihi batas yang direkomendasikan.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.6 Surveyor Dashboard for the full workspace design system. Page-specific deltas below:

Mengikuti pedoman visual standar (background putih, aksen `blue-700`, teks `slate-900`, `rounded-2xl`/`rounded-3xl`, diffused soft shadow).

Sama seperti `04_UPLOAD_PHOTO.md`, tombol rekam harus besar dan berkontras tinggi untuk penggunaan satu tangan di lapangan. Karena proses rekam video memakan waktu dan baterai lebih besar, tampilkan estimasi ukuran file secara proaktif sebelum upload agar Surveyor dengan kuota data terbatas dapat membuat keputusan (mis. tunda upload hingga tersedia Wi-Fi) — pertimbangan UX field-use yang relevan untuk file besar.

# SURVEY FORM PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Survey Form (Checklist Inspeksi Fisik)
**Module:** 09 SURVEYOR
**Purpose:** Form multi-bagian yang diisi Surveyor di lokasi properti untuk mendokumentasikan kondisi fisik bangunan (atap, dinding, listrik, sanitasi, dll.) sesuai amanat stakeholder (`06_STAKEHOLDER_REQUIREMENT_SPECIFICATION.md` §8.3: "mengisi checklist struktur bangunan"). Hasil form ini menjadi dasar keputusan approve/reject pada `06_VERIFICATION.md`.

## 2. Next.js Routing Path
```text
app/(dashboard)/surveyor/tasks/[propertyId]/form/page.tsx
```

## 3. Required UI Components
- `ChecklistSection` (berulang per kategori): "Kondisi Atap", "Kondisi Dinding & Struktur", "Instalasi Listrik", "Sanitasi & Air", masing-masing berisi radio/select kondisi (`Baik` / `Cukup` / `Perlu Perbaikan` / `Tidak Ada`) + kolom catatan singkat opsional.
- `PhotoAttachmentTrigger` — tombol per-section untuk membuka `04_UPLOAD_PHOTO.md` dan melampirkan bukti foto pada bagian checklist terkait.
- `ProgressStepper` — indikator progres pengisian antar section (mobile-friendly, horizontal scroll dot indicator).
- `AutoSaveIndicator` — indikator kecil "Tersimpan otomatis" agar Surveyor tidak kehilangan data saat sinyal lapangan lemah.
- `SubmitReportButton` — tombol akhir mengirim seluruh checklist sebagai laporan.

## 4. Data & State Management
- **Local State:** Jawaban checklist per kategori disimpan sebagai form state (`react-hook-form`) dan di-persist ke `localStorage`/IndexedDB secara berkala (draft lokal) mengingat kondisi jaringan lapangan yang tidak stabil.
- **Form Handling:** `react-hook-form` + Zod (`zodResolver`) untuk validasi tiap section wajib terisi sebelum submit.
- **⚠️ GAP SKEMA DATA:** Checklist struktur bangunan (kondisi atap, dinding, listrik, dll.) **belum punya struktur data terdefinisi di ERD** (`40_ERD.md`/`42_TABLE_SPECIFICATION.md`). Kemungkinan implementasi: (a) disimpan sebagai field JSON di `VERIFICATION_AUDIT.notes`, atau (b) memerlukan tabel baru `SurveyChecklist` dengan relasi ke `PROPERTY` dan `VERIFICATION_AUDIT`. **Perlu keputusan desain dari tim Backend/DB sebelum implementasi** — dokumen ini tidak berasumsi salah satu opsi sebagai final.
- **Server State (submit):** Hasil akhir dikirim ke `POST /api/v1/survey/:id/report`, digabung dengan lampiran foto yang sudah diunggah ke R2 (lihat `04_UPLOAD_PHOTO.md`).

## 5. API Endpoints Referenced
- `POST /api/v1/survey/:id/report` — Surveyor only (`56_AUTHORIZATION_MATRIX.md` v1.0.1), juga dikenal sebagai `media/upload-report` di beberapa dokumen (`52_ENDPOINT_CATALOGUE.md` §8.5). Endpoint ini mengirim hasil checklist + referensi media terlampir.
- Tergantung pada `POST /api/v1/media/presigned-url` untuk lampiran foto per section (lihat `04_UPLOAD_PHOTO.md`).
- **Gap terkait:** karena tidak ada tabel `SurveyChecklist` terdefinisi, struktur payload `POST /survey/:id/report` untuk field checklist juga belum terspesifikasi formal di `52_ENDPOINT_CATALOGUE.md` — perlu ditambahkan setelah keputusan skema di atas diambil.

## 6. Acceptance Criteria (DoD)
- [ ] Setiap kategori checklist wajib diisi sebelum tombol `SubmitReportButton` aktif (tidak boleh submit checklist kosong).
- [ ] Draft form tersimpan otomatis secara lokal setiap perubahan field, dan pulih otomatis jika aplikasi tertutup/refresh sebelum submit (mitigasi sinyal lapangan lemah).
- [ ] Form dapat diisi sepenuhnya dalam mode koneksi lambat/terputus-putus; submit final di-retry otomatis saat koneksi kembali.
- [ ] Setelah submit berhasil, halaman mengarahkan Surveyor ke `06_VERIFICATION.md` untuk memberikan keputusan approve/reject berdasarkan checklist yang baru diisi.
- [ ] Gap skema `SurveyChecklist`/JSON di atas dicatat sebagai blocker teknis pada backlog sebelum sprint implementasi dimulai.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

- **`ClipboardCheck`** — header setiap `ChecklistSection`, 20px, `text-blue-700`.
- **`Camera`** — pada `PhotoAttachmentTrigger` di tiap section, menandakan lampiran bukti visual.
- **`AlertTriangle`** — muncul otomatis pada opsi kondisi "Perlu Perbaikan", `text-amber-600`, untuk menyorot temuan yang butuh perhatian Admin.
- **`Save`** — pada `AutoSaveIndicator`, `text-slate-400`, `aria-hidden="true"` karena disertai teks "Tersimpan otomatis".

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.6 Surveyor Dashboard for the full workspace design system. Page-specific deltas below:

Mengikuti pedoman visual standar (background putih, aksen `blue-700`, teks `slate-900`, `rounded-2xl`/`rounded-3xl`, diffused soft shadow).

Karena form ini panjang dan diisi sambil berdiri/berjalan di lokasi properti, gunakan pola satu section per layar (bukan satu form panjang tunggal) agar navigasi jempol tetap ringan. Semua tombol pilihan kondisi (`Baik`/`Cukup`/dst.) harus berukuran besar (minimal 44x44px) dan berjarak cukup agar tidak salah tap saat Surveyor mengenakan sarung tangan atau memegang alat ukur.

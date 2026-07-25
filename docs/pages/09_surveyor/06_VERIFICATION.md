# VERIFICATION PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Verification (Keputusan Verifikasi Lapangan)
**Module:** 09 SURVEYOR
**Purpose:** Halaman di mana Surveyor mencatat keputusan resmi hasil inspeksi fisik dan legal (approve/reject) setelah checklist (`03_SURVEY_FORM.md`) dan bukti visual (`04_UPLOAD_PHOTO.md`/`05_UPLOAD_VIDEO.md`) lengkap. Keputusan ini dicatat sebagai entitas `VERIFICATION_AUDIT` dan menjadi input bagi Admin untuk persetujuan final (Surveyor TIDAK memiliki wewenang mengubah `PROPERTY.status` secara langsung — lihat §5).

## 2. Next.js Routing Path
```text
app/(dashboard)/surveyor/tasks/[propertyId]/verification/page.tsx
```

## 3. Required UI Components
- `VerificationSummaryPanel` — ringkasan checklist dan jumlah foto/video yang sudah dilampirkan, ditampilkan sebelum keputusan diambil (agar Surveyor mengonfirmasi kelengkapan bukti).
- `ApproveActionButton` — tombol besar hijau untuk mencatat `action = APPROVED_PHYSICAL`.
- `RejectActionButton` — tombol besar merah untuk mencatat `action = REJECTED_LEGAL` (atau kondisi reject fisik lainnya).
- `NotesTextarea` — kolom wajib untuk mencatat alasan/catatan keputusan (`VERIFICATION_AUDIT.notes`) — wajib diisi khususnya saat reject.
- `ConfirmationDialog` — dialog konfirmasi sebelum submit final, menegaskan bahwa keputusan bersifat mengikat dan akan diteruskan ke Admin.

## 4. Data & State Management
- **Local State:** Pilihan aksi (`approve`/`reject`) yang belum dikonfirmasi, isi `NotesTextarea` sementara sebelum submit.
- **Server State (write):** Submit keputusan mengirim payload ke `POST /api/v1/survey/:id/report` yang mencatat baris baru di `VERIFICATION_AUDIT`: `propertyId`, `surveyorId` (user aktif), `action` (`APPROVED_PHYSICAL` | `REJECTED_LEGAL`), `notes`, `createdAt`.
- **Konsekuensi Status Properti:** Keputusan Surveyor TIDAK langsung mengubah `PROPERTY.status` menjadi `FULLY_VERIFIED`. Sesuai `56_AUTHORIZATION_MATRIX.md`, `PATCH /api/v1/properties/:id/status` adalah **Admin-only** — hasil Surveyor hanya mengubah status antara ke `PHYSICAL_VERIFIED`/tetap `PENDING` sambil menunggu approval final Admin (lihat `07_BUSINESS_PROCESS_DOCUMENT.md` §8.2: "Admin does final approval to flip PROPERTY.status to FULLY_VERIFIED").
- **Read-only reference:** Halaman ini menampilkan (bukan mengedit) data yang sudah tersimpan dari `03_SURVEY_FORM.md` dan media dari `04_UPLOAD_PHOTO.md`/`05_UPLOAD_VIDEO.md`.

## 5. API Endpoints Referenced
- `POST /api/v1/survey/:id/report` — Surveyor only. Menyimpan keputusan sebagai baris `VERIFICATION_AUDIT`.
- **Bukan** endpoint halaman ini: `PATCH /api/v1/properties/:id/status` — ini Admin-only dan berada di luar wewenang modul Surveyor; disebut di sini hanya sebagai konteks alur agar tidak disalahpahami sebagai aksi yang tersedia bagi Surveyor.

## 6. Acceptance Criteria (DoD)
- [ ] Keputusan approve/reject **irreversible dari sisi Surveyor** setelah dikonfirmasi — perubahan lebih lanjut memerlukan override Admin, bukan edit ulang oleh Surveyor yang sama.
- [ ] `NotesTextarea` wajib diisi (validasi non-kosong) ketika aksi adalah reject, untuk memberi Admin konteks alasan penolakan.
- [ ] `ConfirmationDialog` wajib muncul sebelum submit final, secara eksplisit menyatakan bahwa keputusan akan diteruskan ke Admin untuk persetujuan akhir dan tidak dapat ditarik kembali oleh Surveyor.
- [ ] Halaman menampilkan ringkasan kelengkapan bukti (jumlah foto tervalidasi GPS, status checklist) sebelum tombol aksi diaktifkan — mencegah keputusan diambil tanpa bukti pendukung.
- [ ] Setelah submit, Surveyor diarahkan kembali ke `02_ASSIGNED_SURVEY.md` dengan status tugas berubah menjadi "Selesai".

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

- **`CheckCircle2`** — ikon utama pada `ApproveActionButton`, `text-emerald-600`, 24px.
- **`XCircle`** — ikon utama pada `RejectActionButton`, `text-red-600`, 24px.
- **`FileWarning`** — muncul di `VerificationSummaryPanel` jika ada bukti yang belum lengkap (mis. foto tanpa GPS valid), `text-amber-600`.
- **`ShieldCheck`** — menyertai teks konfirmasi di `ConfirmationDialog`, menandakan keputusan bersifat resmi/mengikat.

## 8. UI/UX Aesthetic Rules
Mengikuti pedoman visual standar (background putih, aksen `blue-700`, teks `slate-900`, `rounded-2xl`/`rounded-3xl`, diffused soft shadow), dengan pengecualian yang disengaja pada `ApproveActionButton`/`RejectActionButton` yang menggunakan hijau/merah solid berkontras tinggi — ini keputusan berdampak besar sehingga warna aksi harus tidak ambigu, berbeda dari tombol biru netral di halaman lain.

Karena keputusan ini final dan berdampak pada reputasi properti, hindari tombol berukuran kecil berdekatan (risiko salah tap approve/reject) — beri jarak visual signifikan antara kedua tombol dan pertimbangkan pola "tap lalu confirm" dua langkah, bukan aksi sekali tap.

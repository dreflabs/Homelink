# ADD PROPERTY PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Add Property (Daftarkan Properti)
**Module:** 06 OWNER DASHBOARD
**Role:** Owner
**Purpose:** Formulir multi-langkah (Stepped Form, SCR-201 di `18_SCREEN_INVENTORY.md`) bagi Owner untuk mendaftarkan properti baru. Mengimplementasikan alur awal Business Process (`07_BUSINESS_PROCESS_DOCUMENT.md`): Owner mengisi detail properti + mengunggah bukti kepemilikan (PBB/SHM) → properti dibuat dengan `status = PENDING` (diset server, tidak pernah oleh client) → menunggu sanity check Admin dan penugasan Surveyor otomatis berdasarkan kode pos.

## 2. Next.js Routing Path
```text
app/(dashboard)/owner/properties/new/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Stepper` (custom, built on `Progress` + `Tabs`) — indikator langkah horizontal desktop / linear mobile, dengan 4 langkah: (1) Info Dasar, (2) Lokasi, (3) Media & Foto, (4) Dokumen Legal & Review.
- `Form` + `Input`/`Textarea`/`Select` (react-hook-form) — Langkah 1: `title`, `description`, `price`, `propertyType`.
- `Map Picker` (custom, berbasis koordinat) — Langkah 2: input `address`, `latitude`, `longitude` (drag pin di peta).
- `Dropzone` (custom drag-and-drop) — Langkah 3: unggah multi-gambar (`mediaType=IMAGE`), dengan preview thumbnail dan penanda "Jadikan Foto Utama" (`isPrimary`).
- `FileUpload` (single PDF) — Langkah 4: unggah sertifikat kepemilikan (`mediaType=PDF_CERTIFICATE`).
- `Progress` — indikator upload per file ke Cloudflare R2 (presigned URL).
- `Button` (Kembali/Lanjut/Ajukan) — navigasi antar langkah dan submit akhir.
- `AlertDialog` — konfirmasi sebelum submit final ("Setelah diajukan, properti akan berstatus Menunggu Verifikasi").

## 4. Data & State Management
- **Local State:** `currentStep` (0–3) disimpan di state komponen (bukan URL, agar form data tidak hilang saat back button); form data digabung lintas langkah menggunakan satu `useForm` instance (react-hook-form) dengan `mode: "onBlur"` per langkah agar validasi tidak memblokir navigasi maju sebelum semua field terisi.
- **Upload State:** Setiap file punya state independen `{ file, progress, s3Url, status: 'idle'|'uploading'|'done'|'error' }` — upload dilakukan via `POST /api/v1/media/presigned-url` lalu `PUT` langsung ke R2, baru referensi `s3Url` disertakan ke payload `POST /api/v1/properties`.
- **Zod Schema (bentuk garis besar):**
```ts
const addPropertySchema = z.object({
  title: z.string().min(10).max(120),
  description: z.string().min(30),
  price: z.number().positive(),
  propertyType: z.enum(["HOUSE", "APARTMENT", "LAND"]),
  address: z.string().min(10),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  media: z.array(z.object({ s3Url: z.string().url(), mediaType: z.enum(["IMAGE","PDF_CERTIFICATE"]), isPrimary: z.boolean() })).min(1),
});
```
- **Server State:** Tidak ada fetch awal (form kosong); setelah submit sukses, redirect ke `02_MY_PROPERTY.md` atau `05_PROPERTY_STATUS.md` untuk properti baru.

## 5. API Endpoints Referenced
- `POST /api/v1/media/presigned-url` — meminta URL upload langsung ke Cloudflare R2 untuk setiap gambar/PDF (dipanggil per file, sebelum submit form utama).
- `POST /api/v1/properties` — membuat listing baru. **Kritis:** field `status` TIDAK boleh dikirim oleh client; server selalu mengeset `status = PENDING` terlepas dari payload apa pun, dan `ownerId` diambil dari `session.userId`, bukan dari body request.

## 6. Acceptance Criteria (DoD)
- [ ] Indikator langkah (`Stepper`) memiliki `aria-current="step"` pada langkah aktif dan dapat dinavigasi via keyboard.
- [ ] Form TIDAK mengizinkan submit tanpa minimal 1 foto (`isPrimary=true`) dan 1 dokumen `PDF_CERTIFICATE`.
- [ ] Payload yang dikirim ke `POST /api/v1/properties` tidak pernah menyertakan field `status` yang dapat dimanipulasi client — server-enforced `PENDING` diverifikasi di test integrasi.
- [ ] Upload file menampilkan progress bar per file dan menangani kegagalan upload dengan retry, tanpa memblokir field lain.
- [ ] Setelah submit sukses, Owner diarahkan ke halaman detail status properti yang baru dibuat, menampilkan `status: PENDING`.
- [ ] Validasi Zod berjalan di client (react-hook-form) DAN di server (defense-in-depth).

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `Home`
- **Purpose:** Langkah 1 "Info Dasar" pada stepper.
- **Size:** 20px. **Color:** `text-blue-700` saat step aktif/selesai, `text-slate-400` saat belum dicapai.

#### Icon: `MapPin`
- **Purpose:** Langkah 2 "Lokasi"; juga ikon pin di map picker.
- **Size:** 20px (stepper), 32px (map pin marker).

#### Icon: `Upload`
- **Purpose:** Dropzone area kosong Langkah 3, mengundang aksi drag-and-drop.
- **Size:** 40px, `text-slate-400`.

#### Icon: `FileCheck2`
- **Purpose:** Menandakan dokumen legal berhasil diunggah pada Langkah 4.
- **Size:** 20px, `text-green-600`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)
- **Layout:** Mobile — satu langkah terlihat penuh layar dengan tombol Lanjut sticky di bawah; Desktop — sidebar stepper vertikal di kiri (semua 4 langkah terlihat sekaligus) + panel form di kanan.
- **Background:** `White` dengan card form `rounded-2xl`, padding lega.
- **Dropzone:** Border dashed `slate-300`, berubah `blue-700` + background `blue-50` saat drag-over.
- **Warna Aksi:** Tombol "Lanjut"/"Ajukan Properti" — `Royal Blue` solid; tombol "Kembali" — outline `slate-300`.
- **Feedback Upload:** Progress bar Royal Blue tipis (4px) di bawah setiap thumbnail file.

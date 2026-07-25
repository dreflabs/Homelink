# PARTNERS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Partners
**Module:** 01 PUBLIC WEBSITE
**Purpose:** Memperkenalkan program kemitraan HomeLink (mis. agen properti eksternal, penyedia jasa survei, mitra teknologi) dan menyediakan jalur pendaftaran minat kemitraan bagi calon mitra bisnis.

## 2. Next.js Routing Path
```text
app/(01_public_website)/partners/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Card` (kartu per kategori kemitraan: "Mitra Agen", "Mitra Survei", "Mitra Teknologi")
- `Carousel` atau grid logo (menampilkan logo mitra yang sudah bergabung)
- `Input` + `Textarea` (form "Daftar Jadi Mitra" — nama perusahaan, email, jenis kemitraan, pesan)
- `Button` (variant `default`, `isLoading` saat submit form minat kemitraan)

## 4. Data & State Management
- **Konten statis:** Deskripsi kategori kemitraan dan logo mitra bersifat statis/hardcoded pada Fase 1.
- **Form Handling & Validasi (Zod)** untuk formulir pendaftaran minat kemitraan:
```ts
const partnerInquirySchema = z.object({
  companyName: z.string().min(2, "Nama perusahaan minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  partnershipType: z.enum(["AGEN", "SURVEYOR_EKSTERNAL", "TEKNOLOGI", "LAINNYA"]),
  message: z.string().min(20, "Pesan minimal 20 karakter"),
});
```
- **Local State:** `isSubmitting`/`isSubmitSuccessful` dikelola oleh `react-hook-form`.
- **Catatan Gap:** ERD saat ini tidak memiliki entity `PARTNER_INQUIRY`. Peran "Partner Agent" disebut di PRD untuk Fase 2+ tetapi belum relevan untuk form minat kemitraan publik ini; endpoint penyimpanan pengajuan mitra belum dimodelkan.

## 5. API Endpoints Referenced
- Tidak ada endpoint di `52_ENDPOINT_CATALOGUE.md` untuk pengajuan kemitraan. Ini adalah **gap endpoint** yang perlu diselesaikan sebelum implementasi (mis. `POST /api/v1/partner-inquiries`, belum ada) atau diarahkan sementara ke email transaksional/eksternal.

## 6. Acceptance Criteria (DoD)
- [ ] Form pendaftaran mitra tervalidasi client-side sesuai skema Zod sebelum submit.
- [ ] Loading state: tombol submit menampilkan `isLoading` dan disabled selama proses.
- [ ] Success state: pesan konfirmasi jelas ditampilkan (mis. via `Toast`) setelah pengajuan berhasil dikirim.
- [ ] Error state: pesan error menjelaskan apa yang terjadi dan cara memperbaiki, bukan pesan generik.
- [ ] Logo mitra memiliki `alt` text nama perusahaan mitra masing-masing.
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90.
- [ ] Mobile: grid logo mitra menjadi 2 kolom, form bertumpuk satu kolom.

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `Handshake`
- **Purpose & Business Meaning:** Ikon identitas program kemitraan pada hero halaman.
- **Size:** `24px` (Desktop hero), `20px` (kontekstual). **Stroke Width:** `1.5`. **Color:** `text-blue-700`.

#### Icon: `Building2`
- **Purpose & Business Meaning:** Menandai kategori "Mitra Agen"/perusahaan pada kartu kemitraan.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `Send`
- **Purpose & Business Meaning:** Ikon tombol submit form pendaftaran minat kemitraan.
- **Size:** `20px`. **Stroke Width:** `1.5`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Halaman ini **DIWAJIBKAN** untuk dibangun dengan mematuhi pedoman visual dari `Mockup.png`: background putih dominan, aksi utama `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`), surface sekunder `slate-50`, card dengan *diffused soft shadow*, border radius besar (`16-24px`).

**Spesifik halaman ini:** Logo mitra ditampilkan dalam grid grayscale yang berubah warna penuh saat hover (pola umum halaman "Trusted by" korporat), form pendaftaran mitra diletakkan di bagian bawah sebagai CTA akhir halaman.

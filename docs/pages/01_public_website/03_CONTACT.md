# CONTACT PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Contact
**Module:** 01 PUBLIC WEBSITE
**Purpose:** Menyediakan formulir kontak dan informasi saluran komunikasi (email, telepon, alamat kantor) agar Guest, Buyer, Owner, maupun mitra bisnis dapat mengirim pertanyaan langsung ke tim HomeLink.

*(Catatan: berpotensi duplikat dengan `pages/17_company/` atau `pages/18_legal/` — lihat keputusan de-duplikasi tertunda di `13_PRODUCT_ROADMAP.md` §8.3. Halaman ini diperlakukan sebagai kanonik untuk saat ini.)*

## 2. Next.js Routing Path
```text
app/(01_public_website)/contact/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Input` (nama, email, subjek — state `default/hover/focus/error/disabled`)
- `Textarea` (isi pesan)
- `Button` (variant `default`, `isLoading` saat submit berlangsung)
- `Card` (kontainer info kontak: alamat kantor, jam operasional)
- `Toast` (notifikasi sukses/gagal setelah submit, z-index 100)

## 4. Data & State Management
- **Local State:** State form dikelola penuh oleh `react-hook-form` (`isSubmitting`, `isSubmitSuccessful`).
- **Form Handling & Validasi (Zod):**
```ts
const contactFormSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  subject: z.string().min(5, "Subjek minimal 5 karakter"),
  message: z.string().min(20, "Pesan minimal 20 karakter"),
});
```
- **Server State:** Tidak ada entity `PROPERTY`/`USER` yang dibaca; submission dikirim sebagai payload sekali kirim (fire-and-forget) ke endpoint kontak.
- **Catatan Gap:** ERD saat ini (`40_ERD.md`) tidak memiliki entity `CONTACT_MESSAGE`/`SUPPORT_TICKET`. Backend untuk form ini belum dimodelkan — perlu didefinisikan sebagai entity baru atau diarahkan ke layanan pihak ketiga (mis. email transaksional) sebelum implementasi.

## 5. API Endpoints Referenced
- Tidak ada endpoint di `52_ENDPOINT_CATALOGUE.md` untuk pengiriman pesan kontak. Ini adalah **gap skema/endpoint** yang harus diselesaikan sebelum implementasi: perlu endpoint baru (mis. `POST /api/v1/contact-messages`, belum ada) atau integrasi layanan eksternal (SMTP/transactional email).

## 6. Acceptance Criteria (DoD)
- [ ] Form tervalidasi client-side sesuai skema Zod di atas sebelum submit diizinkan.
- [ ] Loading state: tombol submit menampilkan `isLoading` spinner dan disabled selama request berlangsung.
- [ ] Success state: `Toast` sukses tampil dan form direset setelah pengiriman berhasil.
- [ ] Error state: jika gagal (mis. `VALIDATION_FAILED` 400 atau `INTERNAL_ERROR` 500), pesan error menjelaskan apa yang terjadi dan cara memperbaiki, tanpa menyalahkan pengguna.
- [ ] Semua input memiliki `label` yang terasosiasi (`htmlFor`) dan pesan error terhubung via `aria-describedby`.
- [ ] Mobile: form dan info kontak bertumpuk vertikal, touch target tombol minimal 44x44px.

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `Mail`
- **Purpose & Business Meaning:** Menunjukkan alamat email kontak.
- **Size:** `20px` (Desktop), `24px` (Mobile). **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `Phone`
- **Purpose & Business Meaning:** Menunjukkan nomor telepon kontak.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `MapPin`
- **Purpose & Business Meaning:** Menunjukkan alamat kantor fisik.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `Send`
- **Purpose & Business Meaning:** Ikon di dalam tombol submit form.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Hover:** translate-x 2px.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Halaman ini **DIWAJIBKAN** untuk dibangun dengan mematuhi pedoman visual dari `Mockup.png`: background putih dominan, aksi utama `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`), surface sekunder `slate-50`, card dengan *diffused soft shadow*, border radius besar (`16-24px`), input dengan fokus ring emerald sesuai spesifikasi komponen `Input`.

**Spesifik halaman ini:** Layout dua kolom pada desktop (form kiri, info kontak + peta kanan), menjadi satu kolom bertumpuk pada mobile (`lg:grid-cols-2`).



**Premium UI Refinement Standards:**
- Semua Heading h1/h2 di UI harus tertulis di dokumen menggunakan class `tracking-tighter` dan `leading-[1.05]`.
- Jarak antar section adalah `py-24 lg:py-32`.
- Shadow menggunakan OKLCH Semantic Shadows (`shadow-card`, `shadow-float`, dsb).
- Penggunaan logo dengan `<Logo />` terpusat.

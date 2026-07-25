# ABOUT US PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** About Us
**Module:** 01 PUBLIC WEBSITE
**Purpose:** Menampilkan profil, misi, dan cerita perusahaan HomeLink secara statis untuk membangun kepercayaan pengunjung terhadap platform verifikasi properti sebelum mereka mendaftar sebagai Buyer, Owner, atau Surveyor.

*(Catatan: berpotensi duplikat dengan `pages/17_company/` atau `pages/18_legal/` — lihat keputusan de-duplikasi tertunda di `13_PRODUCT_ROADMAP.md` §8.3. Halaman ini diperlakukan sebagai kanonik untuk saat ini.)*

## 2. Next.js Routing Path
```text
app/(01_public_website)/about-us/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Card` (untuk blok "Misi", "Visi", dan "Nilai Perusahaan")
- `Avatar` (foto anggota tim/pendiri pada bagian "Tim Kami")
- `Separator` (pembatas antar seksi konten panjang)
- `Button` (variant `outline`, CTA "Hubungi Kami" mengarah ke halaman Contact)

## 4. Data & State Management
- **Konten:** Seluruhnya statis (hardcoded di komponen atau file MDX lokal) pada Fase 1 — tidak ada entity database yang menyimpan konten "About Us".
- **Local State:** Tidak ada state interaktif signifikan; halaman ini murni presentasional.
- **Server State:** Tidak ada fetch data dinamis; halaman dapat di-*statically generate* (SSG) sepenuhnya oleh Next.js.
- **Form Handling:** Tidak ada form pada halaman ini.

## 5. API Endpoints Referenced
- Tidak ada endpoint backend yang digunakan. Fase 1: konten statis/hardcoded; Fase 2: migrasi ke CMS API (`/api/v1/cms/pages` — belum ada, akan didefinisikan saat modul CMS aktif, lihat `89_CMS_MANUAL.md`).

## 6. Acceptance Criteria (DoD)
- [ ] Halaman dirender statis (SSG) tanpa *hydration error* dan tanpa *layout shift* dari gambar tim.
- [ ] Tidak ada state loading yang diperlukan karena konten statis; namun gambar menggunakan `next/image` dengan placeholder blur.
- [ ] Semua foto tim memiliki `alt` text deskriptif (nama + jabatan).
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90.
- [ ] Struktur heading hierarkis benar (`h1` judul halaman, `h2` per seksi Misi/Visi/Tim).
- [ ] Mobile: grid foto tim berubah dari 4 kolom menjadi 2 kolom di breakpoint `sm`.

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `Target`
- **Purpose & Business Meaning:** Menandai blok "Misi" perusahaan.
- **Size:** `20px` (Desktop), `24px` (Mobile). **Stroke Width:** `1.5`. **Color:** `text-blue-700`.

#### Icon: `Eye`
- **Purpose & Business Meaning:** Menandai blok "Visi" perusahaan.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `Users`
- **Purpose & Business Meaning:** Menandai seksi "Tim Kami".
- **Size:** `20px`. **Stroke Width:** `1.5`. **Accessibility:** `aria-hidden="true"`, didampingi label teks.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Halaman ini **DIWAJIBKAN** untuk dibangun dengan mematuhi pedoman visual dari `Mockup.png` guna mencapai standar desain "Apple × Airbnb × Stripe × Zillow": background dominan putih, warna aksi `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`, bukan hitam pekat), surface sekunder `slate-50`, card dengan *diffused soft shadow*, border radius besar (`16-24px`), dan fotografi hangat.

**Spesifik halaman ini:** Layout naratif satu kolom (max-width ~720px) untuk keterbacaan teks panjang seperti storytelling perusahaan, dengan grid foto tim (3-4 kolom desktop) sebagai elemen visual pemecah teks.

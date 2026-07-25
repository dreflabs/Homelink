# CAREERS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Careers
**Module:** 01 PUBLIC WEBSITE
**Purpose:** Menampilkan daftar lowongan pekerjaan terbuka di HomeLink beserta deskripsi budaya kerja, agar kandidat dapat menjelajah posisi dan mengirimkan lamaran.

*(Catatan: berpotensi duplikat dengan `pages/17_company/` atau `pages/18_legal/` — lihat keputusan de-duplikasi tertunda di `13_PRODUCT_ROADMAP.md` §8.3. Halaman ini diperlakukan sebagai kanonik untuk saat ini.)*

## 2. Next.js Routing Path
```text
app/(01_public_website)/careers/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Card` (satu kartu per lowongan: judul posisi, departemen, lokasi, tipe kerja)
- `Badge` (variant `default`, menandai departemen atau tipe kerja "Remote"/"On-site")
- `Accordion` (opsional, mengelompokkan lowongan per departemen)
- `Button` (variant `default`, CTA "Lamar Sekarang" per lowongan — mengarah ke mailto atau form eksternal)
- `Skeleton` (loading state daftar lowongan jika sumber data dinamis)

## 4. Data & State Management
- **Konten:** Fase 1 — daftar lowongan bersifat statis/hardcoded (array konfigurasi lokal), karena tidak ada entity `JOB_POSTING` di ERD saat ini.
- **Local State:** Filter departemen/lokasi dikelola di client (`useState`) untuk menyaring daftar statis, tidak memerlukan request server.
- **Form Handling:** Tidak ada form lamaran langsung di halaman ini pada Fase 1; tombol "Lamar Sekarang" mengarah ke email atau tautan eksternal (mis. Google Form/ATS pihak ketiga).
- **Catatan Gap:** Jika Fase 2 memerlukan manajemen lowongan dinamis, perlu entity baru (`JOB_POSTING`) dan endpoint CRUD terkait — belum dimodelkan di `40_ERD.md`.

## 5. API Endpoints Referenced
- Tidak ada endpoint backend untuk data lowongan pekerjaan di `52_ENDPOINT_CATALOGUE.md`. Fase 1: konten statis/hardcoded; Fase 2: migrasi ke CMS API (`/api/v1/cms/articles` atau entity `JOB_POSTING` khusus — belum ada, akan didefinisikan saat modul CMS/HR aktif).

## 6. Acceptance Criteria (DoD)
- [ ] Daftar lowongan tampil terkelompok/terfilter tanpa *hydration error*.
- [ ] Empty state: jika filter departemen tidak menghasilkan lowongan, tampilkan pesan "Belum ada lowongan di kategori ini saat ini" (bukan array kosong tanpa keterangan) — tanpa membuat urgensi palsu.
- [ ] Interaksi filter departemen/lokasi berjalan instan (client-side, tanpa reload).
- [ ] Tombol "Lamar Sekarang" memiliki `aria-label` yang menyebutkan nama posisi (bukan hanya "Lamar Sekarang" generik) untuk pembaca layar.
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90.
- [ ] Mobile: kartu lowongan bertumpuk satu kolom, filter menjadi dropdown/sheet.

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `Briefcase`
- **Purpose & Business Meaning:** Menandai setiap kartu lowongan pekerjaan.
- **Size:** `20px` (Desktop), `24px` (Mobile). **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `MapPin`
- **Purpose & Business Meaning:** Menunjukkan lokasi kerja (mis. "Jakarta" / "Remote").
- **Size:** `20px`. **Stroke Width:** `1.5`.

#### Icon: `Clock`
- **Purpose & Business Meaning:** Menunjukkan tipe kerja (Full-time/Part-time/Kontrak).
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Halaman ini **DIWAJIBKAN** untuk dibangun dengan mematuhi pedoman visual dari `Mockup.png`: background putih dominan, aksi utama `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`), surface sekunder `slate-50`, card dengan *diffused soft shadow*, border radius besar (`16-24px`).

**Spesifik halaman ini:** Daftar lowongan menggunakan layout grid card 2 kolom desktop / 1 kolom mobile, dengan filter sticky di bagian atas (bukan sidebar) agar mudah diakses saat scroll panjang.

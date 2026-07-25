# TEAM PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Team
**Module:** 17 COMPANY
**Purpose:** Menampilkan profil singkat jajaran kepemimpinan dan tim inti HomeLink 2.0 (C-Level, Product, Engineering leads) untuk membangun kepercayaan calon mitra/investor dan kandidat kerja. Berbeda dari `04_property_detail`/`08_CONTACT_AGENT.md` — halaman ini tidak menampilkan Agen properti, melainkan tim korporat internal HomeLink.

## 2. Next.js Routing Path
```text
app/(17_company)/team/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Card` (kartu per anggota tim: foto, nama, jabatan, tautan LinkedIn opsional)
- `Avatar` (foto profil dengan fallback inisial nama jika foto belum diunggah)
- `Separator` (pembatas antar kelompok — mis. "Kepemimpinan" vs "Tim Inti")
- `Skeleton` (loading state grid foto tim)

## 4. Data & State Management
- **Konten statis Fase 1:** Data anggota tim (nama, jabatan, foto, bio singkat) bersifat statis/hardcoded pada Fase 1 — tidak ada entity `TeamMember` di `40_ERD.md`. Fase 2: migrasi ke CMS API (`/api/v1/cms/team` — belum ada, akan didefinisikan saat modul CMS aktif per `89_CMS_MANUAL.md`), mengikuti konvensi gap CMS yang sama dipakai di `08_BLOG.md`/`09_NEWS.md`.
- **Local State:** Tidak ada state interaktif signifikan (halaman murni presentasional).
- **Server State:** RSC merender data statis pada build/request time; tidak ada fetch dinamis pada Fase 1.

## 5. API Endpoints Referenced
- Tidak ada endpoint backend di Fase 1 — konten statis. Proposal Fase 2 (belum ada di `52_ENDPOINT_CATALOGUE.md`): `GET /api/v1/cms/team`.

## 6. Acceptance Criteria (DoD)
- [ ] Setiap kartu anggota tim menampilkan `alt` text deskriptif pada foto (nama + jabatan), bukan generik "team photo".
- [ ] `Avatar` menampilkan fallback inisial yang jelas jika foto gagal dimuat/belum ada.
- [ ] Grid tim responsif: 1 kolom mobile, 2 kolom tablet (`md`), 3-4 kolom desktop (`lg`/`xl`).
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90.
- [ ] Tautan LinkedIn eksternal (jika ada) dibuka di tab baru dengan `rel="noopener noreferrer"`.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `Linkedin`
- **Purpose & Business Meaning:** Tautan ke profil LinkedIn anggota tim (opsional per profil).
- **Size:** `18px`. **Color:** `text-muted-foreground`, `hover:text-blue-700`.

#### Icon: `Users`
- **Purpose & Business Meaning:** Ikon dekoratif pada heading seksi "Tim Kami".
- **Size:** `24px` (hero section). **Color:** `text-blue-700`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Halaman ini **DIWAJIBKAN** untuk dibangun dengan mematuhi pedoman visual dari `Mockup.png`: background putih dominan, aksi utama `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`), surface sekunder `slate-50`, card dengan *diffused soft shadow*, border radius besar (`16-24px`).

**Spesifik halaman ini:** Foto anggota tim menggunakan rasio persegi (`aspect-square`) dengan `object-cover` dan `rounded-2xl`, disusun dalam grid rapi dengan jarak antar-kartu lapang (`gap-8`) sesuai prinsip "Zero Distraction" di `14_UX_BLUEPRINT.md`.

# NEWS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** News
**Module:** 01 PUBLIC WEBSITE
**Purpose:** Menampilkan daftar kronologis pengumuman resmi perusahaan (peluncuran fitur, ekspansi kota, kemitraan baru) sebagai catatan publik aktivitas HomeLink, terpisah dari artikel edukasi Blog.

## 2. Next.js Routing Path
```text
app/(01_public_website)/news/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Card` (satu entri per pengumuman: tanggal, judul, ringkasan singkat)
- `Badge` (label jenis pengumuman, mis. "Peluncuran Fitur", "Kemitraan")
- `Separator` (pembatas antar entri dalam tata letak linimasa)
- `Skeleton` (loading state daftar berita)

## 4. Data & State Management
- **Konten:** Fase 1 — konten statis/hardcoded (array pengumuman lokal); tidak ada entity `NEWS_ITEM` di ERD saat ini.
- **Local State:** `activeYearFilter` (opsional) untuk menyaring pengumuman per tahun dalam tampilan linimasa.
- **Server State:** Tidak ada fetch data dinamis pada Fase 1; halaman dapat di-SSG penuh.

## 5. API Endpoints Referenced
- Tidak ada endpoint backend untuk News di Fase 1 (`52_ENDPOINT_CATALOGUE.md` tidak memiliki entity/endpoint terkait). Fase 1: konten statis/hardcoded; Fase 2: migrasi ke CMS API (`/api/v1/cms/articles` — belum ada, akan didefinisikan saat modul CMS aktif).

## 6. Acceptance Criteria (DoD)
- [ ] Daftar pengumuman dirender dalam urutan kronologis terbalik (terbaru di atas) tanpa *hydration error*.
- [ ] Empty state: jika filter tahun tidak memiliki entri, tampilkan pesan "Belum ada pengumuman di tahun ini".
- [ ] Format tanggal konsisten dengan standar platform (mis. "24 Juli 2026").
- [ ] Struktur linimasa dapat dinavigasi dengan keyboard dan dibaca linier oleh pembaca layar (bukan hanya visual).
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90.
- [ ] Mobile: garis linimasa vertikal tetap terlihat jelas dengan entri bertumpuk satu kolom.

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `Megaphone`
- **Purpose & Business Meaning:** Ikon identitas halaman News/pengumuman.
- **Size:** `24px` (Desktop hero), `20px` (per entri). **Stroke Width:** `1.5`. **Color:** `text-blue-700`.

#### Icon: `Calendar`
- **Purpose & Business Meaning:** Menunjukkan tanggal setiap entri pengumuman.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `Tag`
- **Purpose & Business Meaning:** Menyertai badge kategori pengumuman.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Accessibility:** `aria-hidden="true"`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Halaman ini **DIWAJIBKAN** untuk dibangun dengan mematuhi pedoman visual dari `Mockup.png`: background putih dominan, aksi utama `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`), surface sekunder `slate-50`, card dengan *diffused soft shadow*, border radius besar (`16-24px`).

**Spesifik halaman ini:** Tata letak linimasa (timeline) vertikal dengan garis penghubung di sisi kiri kartu, membedakannya secara visual dari grid kartu Blog agar pengunjung memahami ini adalah catatan kronologis, bukan artikel editorial.

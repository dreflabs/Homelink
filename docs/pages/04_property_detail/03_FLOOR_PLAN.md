# FLOOR PLAN PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Floor Plan
**Module:** 04 PROPERTY DETAIL
**Purpose:** Menampilkan denah lantai (floor plan) properti sebagai gambar/diagram yang dapat diperbesar (zoomable) agar Buyer memahami tata ruang sebelum survey fisik. Halaman/panel ini bersifat opsional — hanya tampil jika Owner telah mengunggah aset denah.

## 2. Next.js Routing Path
```text
app/(main)/p/[slug]/@modal/(.)floor-plan/page.tsx   // Intercepting Route, deep-linkable
```
Diakses melalui tombol/tab "Denah Lantai" pada seksi spesifikasi halaman `01_PROPERTY_DETAIL.md`.

## 3. Required UI Components (Shadcn/ui + Custom)
- `Dialog` (Shadcn) sebagai kontainer modal floor plan.
- Custom `ZoomableImage` (pan & pinch-to-zoom, mirip komponen peta) untuk membaca detail denah pada gambar resolusi tinggi.
- `Tabs` — jika properti multi-lantai, tab per lantai (Lantai 1 / Lantai 2).
- `Skeleton` — placeholder saat gambar denah dimuat.
- `EmptyState` (custom) — ditampilkan jika tidak ada aset denah tersedia untuk properti ini ("Denah lantai belum tersedia untuk properti ini").

## 4. Data & State Management
- **Local State:** `zoomLevel`, `panPosition` (state interaksi zoomable image), `activeFloorTab` (jika multi-lantai).
- **Server State:** Idealnya diambil bersamaan dengan `GET /api/v1/properties/:id`, namun **terdapat gap skema (lihat §5)** karena tidak ada field terstruktur untuk menandai media sebagai floor plan.

## 5. API Endpoints Referenced
- Tidak ada endpoint khusus baru; secara konsep akan menjadi bagian dari `GET /api/v1/properties/:id`.
- **GAP SKEMA (perlu ditindaklanjuti):** Entity `PROPERTY_MEDIA` pada `40_ERD.md` / `42_TABLE_SPECIFICATION.md` hanya mendefinisikan `mediaType` dengan nilai enum `IMAGE` dan `PDF_CERTIFICATE`. **Tidak ada nilai enum untuk denah lantai.** Agar halaman ini dapat dibangun sesuai spesifikasi, `mediaType` **memerlukan perluasan skema, belum ada di ERD** — disarankan menambahkan nilai `FLOOR_PLAN` (atau tabel terpisah `PROPERTY_FLOOR_PLAN` jika perlu metadata tambahan seperti nomor lantai). Tim backend/data harus mengonfirmasi perubahan ini sebelum implementasi frontend dimulai.

## 6. Acceptance Criteria (DoD)
- [ ] Jika properti tidak memiliki aset floor plan (kondisi wajar mengingat gap skema di atas), tampilkan `EmptyState` yang jelas, bukan halaman kosong atau error.
- [ ] Gambar denah dapat di-zoom in/out dan di-pan dengan mouse (desktop) dan gesture pinch (mobile) tanpa lag.
- [ ] Modal dapat ditutup via tombol `X`, tombol `Esc`, atau klik di luar area gambar (overlay), mengembalikan fokus ke tombol pemicu.
- [ ] Tab lantai (jika ada lebih dari satu) dapat dinavigasi via keyboard (arrow keys / tab index).
- [ ] Tidak menyebabkan hydration error saat modal dibuka langsung via deep link (Intercepting Route fallback ke full page saat direct load).

## 7. Iconography Specification

**Library:** Lucide React ONLY. Stroke width `1.5`.

| Icon | Penggunaan | Ukuran | Warna | Catatan A11y |
|---|---|---|---|---|
| `LayoutPanelTop` | Ikon tab/tombol pemicu "Denah Lantai" pada halaman detail | 18px | `text-slate-700` | Selalu disertai label teks |
| `ZoomIn` / `ZoomOut` | Kontrol zoom pada gambar denah | 20px | `text-white` di atas overlay gambar | `aria-label="Perbesar denah" / "Perkecil denah"` |
| `X` | Tombol tutup modal | 22px | `text-white` | `aria-label="Tutup denah lantai"` |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Mematuhi pedoman visual `Mockup.png` untuk standar "Apple × Airbnb × Stripe × Zillow":

- **Background Modal:** `White` bersih (bukan gelap seperti lightbox foto) karena denah biasanya berupa garis teknis/CAD yang butuh kontras terang untuk terbaca jelas.
- **Warna Aksi Utama:** `Royal Blue` (`blue-700`) untuk tombol kontrol zoom dan tab lantai aktif.
- **Bentuk:** Kontainer modal menggunakan `rounded-2xl` sesuai standar card/modal modul ini.
- **Empty State:** Ikon dan teks empty-state menggunakan warna `text-muted-foreground` netral, dengan copy yang jujur mengenai keterbatasan data (bukan pesan error teknis).
- **Elevation:** Modal menggunakan diffused soft shadow standar, terpisah jelas dari latar halaman detail di belakangnya (dim overlay `bg-black/40`).

# GALLERY PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Gallery
**Module:** 04 PROPERTY DETAIL
**Purpose:** Menampilkan seluruh `PROPERTY_MEDIA` bertipe `IMAGE` milik satu properti dalam layout galeri Airbnb-style (60% gambar utama, 40% grid tersusun) dan menyediakan lightbox layar-penuh untuk eksplorasi mendetail sebelum Buyer memutuskan untuk survey langsung.

## 2. Next.js Routing Path
Bukan route halaman penuh terpisah — dirender sebagai bagian dari `app/(main)/p/[slug]/page.tsx` dan lightbox-nya sebagai Intercepting Route agar dapat di-deep-link/di-share tanpa kehilangan konteks halaman detail:
```text
app/(main)/p/[slug]/@modal/(.)gallery/page.tsx   // lightbox, intercepting route
```

## 3. Required UI Components (Shadcn/ui + Custom)
- `Dialog` (Shadcn, difungsikan sebagai lightbox layar-penuh) — dibuka saat gambar mana pun di grid diklik.
- Custom `Carousel` / lightbox slider dengan tombol prev/next dan swipe gesture (mobile).
- Custom `ThumbnailStrip` — strip thumbnail horizontal di bawah gambar aktif dalam lightbox untuk navigasi cepat.
- `Skeleton` — placeholder abu-abu berukuran tetap (fixed aspect-ratio box) selagi gambar dimuat, mencegah layout shift.
- `Button` (icon-only, ghost) — tombol expand/close/prev/next.

## 4. Data & State Management
- **Entity:** `PROPERTY_MEDIA` (id, propertyId, mediaType, s3Url, isPrimary) — hanya record dengan `mediaType = IMAGE` yang ditampilkan di sini; `PDF_CERTIFICATE` tidak muncul di galeri (ditampilkan di seksi Laporan Legal halaman detail).
- **Server State:** Array media diambil bersamaan dengan `GET /api/v1/properties/:id` (di-embed dalam respons properti) sehingga tidak ada request terpisah untuk galeri.
- **Local State:** `activeImageIndex` (indeks gambar yang sedang ditampilkan di lightbox), `isLightboxOpen` (boolean), disinkronkan dengan URL query/Intercepting Route agar tombol back browser menutup lightbox alih-alih keluar halaman.
- **Sorting:** gambar dengan `isPrimary = true` selalu ditampilkan pertama/sebagai gambar utama 60%.

## 5. API Endpoints Referenced
- Tidak ada endpoint khusus. Data media diperoleh sebagai bagian dari payload `GET /api/v1/properties/:id` (field array media di dalam entity `PROPERTY`). Tidak diperlukan panggilan API tambahan untuk membuka/navigasi lightbox — murni client-side state.

## 6. Acceptance Criteria (DoD)
- [ ] Gambar utama dan grid dimuat dengan `width`/`height` eksplisit (atau `aspect-ratio` CSS) sehingga **tidak menyebabkan layout shift (CLS)** saat loading.
- [ ] Setiap `<img>` memiliki `alt` deskriptif dan spesifik, contoh: `"Tampak depan rumah minimalis 2 lantai dengan taman kecil"`, bukan generik seperti `"gambar properti"`.
- [ ] Lightbox dapat dinavigasi penuh via keyboard (`←`/`→` ganti gambar, `Esc` menutup), dengan focus trap aktif selama modal terbuka.
- [ ] Jika properti hanya memiliki 1 gambar, grid 40% kanan disembunyikan dan gambar utama melebar penuh — bukan menampilkan kotak kosong.
- [ ] Thumbnail strip di lightbox scrollable horizontal di mobile tanpa memicu scroll halaman utama (scroll containment).

## 7. Iconography Specification

**Library:** Lucide React ONLY. Stroke width `1.5`.

| Icon | Penggunaan | Ukuran | Warna | Catatan A11y |
|---|---|---|---|---|
| `Expand` | Tombol pada grid untuk membuka lightbox penuh ("Lihat semua foto") | 18px | `text-white` di atas overlay gambar | `aria-label="Lihat semua foto"` |
| `X` | Tombol tutup lightbox | 22px | `text-white` | `aria-label="Tutup galeri"` |
| `ChevronLeft` / `ChevronRight` | Navigasi gambar sebelumnya/berikutnya | 24px | `text-white` | `aria-label="Foto sebelumnya" / "Foto berikutnya"` |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Mematuhi pedoman visual `Mockup.png` untuk standar "Apple × Airbnb × Stripe × Zillow", dengan penekanan khusus modul Gallery:

- **Layout Grid:** Mengikuti Wireframe Spec §8.2 — gambar utama menempati 60% lebar kolom kiri (maksimal tinggi 500px), sisanya 40% berupa grid 2x2 gambar tersusun di sebelah kanan.
- **Aspect Ratio:** Semua thumbnail grid menggunakan rasio konsisten `4:3` (grid kecil) dan gambar utama `16:9`, dengan `object-fit: cover` agar tidak ada distorsi.
- **Border Radius:** Setiap sel gambar menggunakan `rounded-2xl`, termasuk gambar pertama-kiri-atas dan potongan sudut grid kanan mengikuti kurva besar (bukan siku tajam), konsisten dengan estetika Airbnb.
- **Overlay:** Saat hover di atas gambar grid, terapkan `scale-105` selama `500ms` plus overlay gelap tipis (`bg-black/10`) untuk memberi afordansi klik tanpa mengubah warna dominan foto.
- **Lightbox Background:** `bg-black/95` (bukan slate) untuk kontras foto maksimal; kontrol UI (tombol X, panah) tetap putih dengan bayangan lembut agar terbaca di atas foto apa pun.
- **Fotografi:** Semua foto properti wajib besar, tajam, dan warm-lit sesuai standar mockup — tidak ada watermark mengganggu di tengah gambar.

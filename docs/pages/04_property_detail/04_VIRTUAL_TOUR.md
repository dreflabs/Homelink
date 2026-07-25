# VIRTUAL TOUR PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Virtual Tour
**Module:** 04 PROPERTY DETAIL
**Purpose:** Menyediakan pengalaman tur 360°/video immersive dari properti (biasanya embed pihak ketiga seperti Matterport/YouTube 360) agar Buyer jarak jauh dapat menjelajahi ruangan sebelum memutuskan survey fisik. Bersifat opsional — hanya tampil jika Owner menyediakan tautan tur.

## 2. Next.js Routing Path
```text
app/(main)/p/[slug]/@modal/(.)virtual-tour/page.tsx   // Intercepting Route, deep-linkable
```
Dipicu dari tombol "Virtual Tour" pada gallery preview / seksi media halaman `01_PROPERTY_DETAIL.md`.

## 3. Required UI Components (Shadcn/ui + Custom)
- `Dialog` (Shadcn), full-bleed, sebagai kontainer embed tur.
- Custom `TourEmbedFrame` — wrapper `<iframe>` (sandboxed) untuk Matterport/360 viewer pihak ketiga, dengan `aspect-ratio: 16/9` tetap.
- `Button` fallback — "Buka di tab baru" untuk kasus iframe gagal dimuat atau perangkat tidak mendukung WebGL.
- `Skeleton` — placeholder selagi iframe pihak ketiga memuat (biasanya lebih lambat dari gambar biasa).
- `EmptyState` (custom) — ditampilkan jika properti tidak memiliki aset virtual tour.

## 4. Data & State Management
- **Local State:** `isTourLoaded` (boolean, untuk transisi skeleton→iframe), `hasIframeError` (fallback ke link eksternal jika embed gagal).
- **Server State:** Idealnya URL tur diambil dari `GET /api/v1/properties/:id`, namun **field ini belum ada di skema** (lihat gap di §5).

## 5. API Endpoints Referenced
- Tidak ada endpoint khusus. Secara konsep akan menjadi bagian dari respons `GET /api/v1/properties/:id`.
- **GAP SKEMA (perlu ditindaklanjuti):** `PROPERTY_MEDIA.mediaType` pada `40_ERD.md` / `42_TABLE_SPECIFICATION.md` hanya berisi `IMAGE` dan `PDF_CERTIFICATE` — **tidak ada nilai untuk video tour atau URL tur 360°.** Halaman ini **memerlukan perluasan skema, belum ada di ERD**: disarankan menambahkan nilai enum `VIDEO_TOUR` pada `mediaType`, ATAU menambahkan kolom khusus pada `PROPERTY` seperti `virtualTourUrl` (string, nullable) jika tur berupa link embed pihak ketiga (bukan file yang di-upload ke S3 seperti media lain). Keputusan struktur ini harus dikonfirmasi tim data/backend sebelum implementasi.
- Karena embed biasanya dari domain pihak ketiga (Matterport dsb.), perlu dipastikan domain tersebut ditambahkan ke `next.config.js` (Content Security Policy / allowed iframe origins) — bukan tanggung jawab dokumen ini tapi dicatat sebagai dependensi teknis.

## 6. Acceptance Criteria (DoD)
- [ ] Jika tidak ada aset virtual tour (kondisi wajar mengingat gap skema di atas), tampilkan `EmptyState` yang jelas, bukan iframe kosong/broken.
- [ ] Iframe menggunakan `sandbox` attribute yang tepat (`allow-scripts allow-same-origin`) untuk mitigasi risiko keamanan embed pihak ketiga.
- [ ] **Fallback aksesibilitas wajib:** karena kontrol navigasi 360° di dalam iframe pihak ketiga umumnya TIDAK dapat diakses keyboard/screen reader, modal wajib menyediakan tombol "Buka Tur di Tab Baru" yang selalu terlihat dan dapat difokus sebagai jalur alternatif, plus teks penjelas bahwa tur interaktif memerlukan mouse/sentuhan.
- [ ] Focus trap aktif di dalam modal selama terbuka; `Esc` menutup modal dan mengembalikan fokus ke tombol pemicu.
- [ ] Modal tidak menyebabkan Cumulative Layout Shift saat iframe pihak ketiga selesai memuat (gunakan `aspect-ratio` tetap pada wrapper).

## 7. Iconography Specification

**Library:** Lucide React ONLY. Stroke width `1.5`.

| Icon | Penggunaan | Ukuran | Warna | Catatan A11y |
|---|---|---|---|---|
| `View` / `Orbit` | Ikon tombol pemicu "Virtual Tour" di halaman detail | 18px | `text-slate-700` | Selalu disertai label teks |
| `ExternalLink` | Tombol fallback "Buka Tur di Tab Baru" | 18px | `text-blue-700` | `aria-label="Buka virtual tour di tab baru"` |
| `X` | Tombol tutup modal | 22px | `text-white` | `aria-label="Tutup virtual tour"` |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Mematuhi pedoman visual `Mockup.png` untuk standar "Apple × Airbnb × Stripe × Zillow":

- **Background Modal:** `Black` penuh (`bg-black`) di sekeliling iframe untuk pengalaman immersive tanpa distraksi visual, kontras dengan modal Floor Plan yang terang.
- **Bentuk:** Kontainer iframe tetap menggunakan `rounded-2xl` pada desktop; di mobile dapat full-bleed tanpa radius demi memaksimalkan area pandang.
- **Tombol Fallback:** "Buka Tur di Tab Baru" menggunakan `Royal Blue` (`blue-700`) sebagai teks/link, ditempatkan di footer modal agar tetap terlihat tanpa mengganggu viewport tur.
- **Loading State:** Skeleton berwarna `slate-900`/gelap (bukan `slate-50` terang) agar transisi ke iframe gelap tidak menimbulkan "flash" kontras yang menyilaukan.
- **Elevation:** Modal menggunakan diffused soft shadow standar dengan overlay `bg-black/60` di belakang untuk menekankan fokus pada konten tur.

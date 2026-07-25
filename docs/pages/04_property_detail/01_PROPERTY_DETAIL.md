# PROPERTY DETAIL PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Property Detail
**Module:** 04 PROPERTY DETAIL
**Purpose:** Halaman utama yang menampilkan seluruh informasi satu `PROPERTY` (judul, harga, alamat, spesifikasi, deskripsi, badge verifikasi, dan laporan legal) sekaligus menjadi hub navigasi menuju Gallery, Floor Plan, Virtual Tour, Mortgage Calculator, Property Comparison, Schedule Viewing, dan Contact Agent. Halaman ini adalah titik konversi utama funnel Buyer — dari sekadar melihat listing menjadi menjadwalkan survey lokasi.

## 2. Next.js Routing Path
Mengikuti `18_SCREEN_INVENTORY.md` (SCR-003), halaman ini di-slug berdasarkan properti, bukan path statis generik:
```text
app/(main)/p/[slug]/page.tsx
```
- `[slug]` merepresentasikan identifier properti (kombinasi `id` + slug judul untuk SEO, contoh: `rumah-minimalis-2-lantai-bsd-a1b2c3`).
- Sub-fitur non-navigasi (Gallery lightbox, Mortgage Calculator, Property Comparison, Schedule Viewing, Contact Agent) dirender sebagai **modal/panel di atas halaman ini** (bukan route terpisah), kecuali Floor Plan dan Virtual Tour yang dapat memiliki Intercepting Route sendiri untuk deep-link (lihat `03_FLOOR_PLAN.md`, `04_VIRTUAL_TOUR.md`).

## 3. Required UI Components (Shadcn/ui + Custom)
- `Badge` (custom variant: `verified` hijau + ikon centang, `pending` amber) — menampilkan status `PHYSICAL_VERIFIED` / `LEGAL_VERIFIED` / `FULLY_VERIFIED`.
- `Card` — kontainer price box sticky dan spesifikasi.
- `Separator` — pembatas antar seksi (spesifikasi, deskripsi, laporan legal).
- `Button` (primary, size lg) — CTA "Jadwalkan Survey Lokasi".
- `Tabs` atau `Accordion` — deskripsi vs laporan legal vs spesifikasi lengkap.
- `Skeleton` — loading state untuk gallery, price box, dan badge saat RSC fetch berjalan.
- Custom: `GalleryPreview` (ringkasan grid gambar, memicu lightbox penuh di `02_GALLERY.md`), `StickyBookingPanel` (kolom kanan 35%).

## 4. Data & State Management
- **Entity utama:** `PROPERTY` (id, ownerId, title, description, price, propertyType, status, address, latitude, longitude, embeddingVector — embeddingVector tidak dirender, hanya dipakai backend untuk rekomendasi serupa).
- **Server State:** Data properti diambil di server (RSC) via `GET /api/v1/properties/:id` sebelum render pertama, sehingga SEO dan LCP (Largest Contentful Paint) untuk hero image optimal.
- **Local State (Client Component anak):** indeks tab aktif (deskripsi/legal/spesifikasi), status buka/tutup modal booking (dikelola oleh Intercepting Route, bukan `useState` biasa), status buka/tutup Auth Modal jika Guest.
- **Derived State:** label badge verifikasi diturunkan langsung dari field `status` PROPERTY (mapping: `PENDING`→tidak tampil/abu-abu, `REJECTED`→tidak ditampilkan ke publik, `PHYSICAL_VERIFIED`/`LEGAL_VERIFIED`→badge tunggal, `FULLY_VERIFIED`→badge ganda hijau).
- **Form Handling:** Tidak ada form input langsung di halaman ini (form booking ada di `07_SCHEDULE_VIEWING.md`, form kontak di `08_CONTACT_AGENT.md`).

## 5. API Endpoints Referenced
- `GET /api/v1/properties/:id` — mengambil detail properti lengkap (respons JSend `{status:"success", data:{property}}`). Dipanggil di server (RSC) saat page load; jika `404` tampilkan halaman "Properti tidak ditemukan / sudah tidak tersedia".
- Endpoint booking (`POST /api/v1/bookings`), kalkulator, komparasi, dan kontak **tidak** dipanggil langsung dari file ini — didelegasikan ke sub-komponen masing-masing (lihat file 05–08).

## 6. Acceptance Criteria (DoD)
- [ ] Halaman dirender tanpa *hydration error*, termasuk saat badge verifikasi berbeda antara SSR dan client.
- [ ] Jika `GET /api/v1/properties/:id` gagal (404/500), tampilkan Error Boundary dengan pesan ramah, bukan crash.
- [ ] Layout 65/35 (konten kiri / panel booking sticky kanan) hanya aktif di breakpoint desktop (`lg:` ke atas); di mobile, panel booking menjadi sticky bottom bar.
- [ ] Badge verifikasi (`Fully Verified` dsb.) tampil prominent di atas judul, sesuai `07_BUSINESS_PROCESS_DOCUMENT.md`.
- [ ] Tombol "Jadwalkan Survey Lokasi" untuk Guest membuka Auth Modal via Intercepting Route **tanpa hard navigation**, mempertahankan konteks halaman properti (lihat FR-BOOK-001).
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90.

## 7. Iconography Specification

**Library:** Lucide React ONLY. No mixed libraries. Stroke width `1.5` konsisten di seluruh modul.

| Icon | Penggunaan | Ukuran | Warna | Catatan A11y |
|---|---|---|---|---|
| `BadgeCheck` | Indikator badge verifikasi (Physical/Legal/Fully Verified) | 16px | `text-green-600` | `aria-hidden`, label teks selalu menyertai |
| `MapPin` | Alamat properti | 18px | `text-muted-foreground` | `aria-hidden` |
| `Home` / `Building2` | Ikon tipe properti (HOUSE/APARTMENT) | 18px | `text-slate-700` | `aria-hidden` |
| `CalendarCheck` | Ikon pada tombol CTA "Jadwalkan Survey Lokasi" | 20px | `text-white` (di atas tombol biru) | Ikon dekoratif, label tombol wajib ada |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Halaman ini **DIWAJIBKAN** untuk dibangun dengan mematuhi pedoman visual dari `Mockup.png` guna mencapai standar desain "Apple × Airbnb × Stripe × Zillow":

- **Background Utama:** Dominan `White` (Putih Bersih) untuk memberi ruang bernapas (*Whitespace*).
- **Warna Aksi Utama:** `Royal Blue` (Ekivalen Tailwind `blue-700`) untuk tombol dan tautan aktif.
- **Teks Utama & Heading:** `Dark Navy` (`slate-900`). Dilarang keras menggunakan hitam pekat `#000000`.
- **Warna Sekunder/Surface:** `Light Gray` (`slate-50`) untuk pembatas seksi atau *background card* sekunder.
- **Card & Elevation:** *Card* putih harus menggunakan efek bayangan ultra-lembut (*Diffused Soft Shadow*).
- **Bentuk (Shape):** Sudut elemen besar (Card, Modal, Gambar) wajib menggunakan *Border Radius* besar `16-24px` (Ekivalen Tailwind `rounded-2xl` atau `rounded-3xl`).
- **Fotografi:** Hero image dan foto properti harus besar, jelas, dan memiliki *Warm Lighting* (Pencahayaan Hangat).
- **Layout Spesifik (Wireframe Spec §8.2):** Konten dibagi 65/35. Kolom kiri (65%) memuat judul, alamat, badge, spesifikasi, deskripsi, dan laporan legal (scroll normal). Kolom kanan (35%) **sticky** memuat price box, kalender interaktif ringkas, dan tombol CTA besar "Jadwalkan Survey Lokasi" — tetap terlihat saat pengguna scroll membaca deskripsi.
- Motion: hover pada gallery preview card menggunakan `scale-105` selama `500ms` untuk konsistensi dengan Property Card di halaman listing.

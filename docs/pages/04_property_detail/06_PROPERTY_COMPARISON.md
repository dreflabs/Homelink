# PROPERTY COMPARISON PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Property Comparison
**Module:** 04 PROPERTY DETAIL
**Purpose:** Memungkinkan Buyer membandingkan properti yang sedang dilihat dengan 1–2 properti lain (maksimal 3 total) secara berdampingan — harga, tipe, spesifikasi, dan status verifikasi — untuk membantu keputusan sebelum menjadwalkan survey.

## 2. Next.js Routing Path
```text
app/(main)/compare/page.tsx
```
Diakses dari tombol "Bandingkan" pada halaman `01_PROPERTY_DETAIL.md` (menambahkan properti saat ini ke daftar komparasi) dan dari halaman listing pencarian. Berbeda dengan sub-fitur lain di modul ini, halaman ini adalah **route penuh** (bukan modal Intercepting Route) karena berpotensi menjadi tujuan share link (`?ids=a,b,c`).

## 3. Required UI Components (Shadcn/ui + Custom)
- Custom `ComparisonTable` — tabel komparasi side-by-side, maksimal 3 kolom properti, baris berupa atribut (harga, tipe, luas, kamar, status verifikasi, alamat).
- `Button` (icon-only) — "Tambah properti ke perbandingan" dan "Hapus dari perbandingan" per kolom.
- `Badge` — reuse komponen badge verifikasi yang sama dengan halaman detail agar konsisten.
- `Skeleton` — placeholder kolom saat properti tambahan sedang di-fetch.
- `EmptyState` (custom) — ditampilkan jika hanya 1 properti dalam daftar ("Tambahkan properti lain untuk mulai membandingkan").

## 4. Data & State Management
- **Comparison List State:** Disimpan di **URL query string** (contoh `/compare?ids=prop_123,prop_456`) sebagai source of truth utama — memungkinkan halaman ini di-share/bookmark. Disinkronkan ke `localStorage` sebagai cache agar daftar bertahan antar sesi browsing tanpa harus login.
- **Local State:** Indeks kolom yang sedang di-highlight/hover, state modal "cari properti untuk ditambahkan" (search input + hasil).
- **Server State:** Untuk setiap `id` pada comparison list, data properti diambil secara paralel via `GET /api/v1/properties/:id` (properti yang sudah pernah di-fetch di halaman detail sebelumnya dapat di-reuse dari cache RSC/React Query untuk menghindari fetch ulang).
- **Batasan:** Maksimal 3 properti dalam daftar komparasi sekaligus; upaya menambah properti ke-4 memunculkan toast peringatan dan meminta pengguna menghapus salah satu kolom terlebih dahulu.

## 5. API Endpoints Referenced
- `GET /api/v1/properties/:id` — dipanggil berulang (paralel, satu request per properti dalam daftar) untuk mengisi setiap kolom tabel. Ini adalah endpoint yang sama seperti yang dipakai `01_PROPERTY_DETAIL.md`, tidak ada endpoint baru.
- **Tidak ada endpoint dedicated untuk "komparasi"** — sesuai `52_ENDPOINT_CATALOGUE.md`, fitur ini murni **state komposisi di sisi client** yang menyatukan beberapa hasil `GET /api/v1/properties/:id` yang sudah ada; tidak diperlukan endpoint backend baru.

## 6. Acceptance Criteria (DoD)
- [ ] Daftar komparasi tetap ada setelah refresh halaman (dipulihkan dari URL, fallback ke `localStorage` jika URL kosong tapi cache ada).
- [ ] Menambah properti ke-4 diblokir dengan pesan jelas, tidak menyebabkan tabel rusak/overflow horizontal tanpa kontrol.
- [ ] Menghapus satu kolom memperbarui URL query secara langsung (shallow routing, tanpa full page reload).
- [ ] Jika salah satu `id` properti di URL sudah tidak valid/dihapus (`404`), kolom tersebut menampilkan pesan "Properti ini sudah tidak tersedia" alih-alih merusak seluruh tabel.
- [ ] Tabel dapat di-scroll horizontal pada mobile tanpa memotong kolom label atribut (kolom label attribute tetap sticky di kiri).

## 7. Iconography Specification

**Library:** Lucide React ONLY. Stroke width `1.5`.

| Icon | Penggunaan | Ukuran | Warna | Catatan A11y |
|---|---|---|---|---|
| `Columns3` | Ikon tombol pemicu "Bandingkan" di halaman detail | 18px | `text-slate-700` | Selalu disertai label teks |
| `Plus` | Tombol tambah kolom properti baru dalam tabel | 20px | `text-blue-700` | `aria-label="Tambah properti ke perbandingan"` |
| `Trash2` | Tombol hapus kolom properti dari tabel | 18px | `text-red-600` | `aria-label="Hapus properti dari perbandingan"` |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Mematuhi pedoman visual `Mockup.png` untuk standar "Apple × Airbnb × Stripe × Zillow":

- **Tabel:** Header kolom (foto + nama properti) menggunakan card putih dengan `rounded-2xl` di bagian atas, baris atribut menggunakan garis pembatas tipis `border-slate-50` (bukan garis tabel HTML standar tebal).
- **Highlight Perbedaan:** Nilai atribut yang berbeda signifikan antar kolom (misal harga) dapat diberi aksen `text-blue-700` bold untuk mempercepat pemindaian visual, tanpa menggunakan warna merah/hijau yang menyiratkan "benar/salah".
- **Kolom Sticky:** Kolom paling kiri (label atribut: "Harga", "Tipe", "Luas Tanah", dst.) sticky secara horizontal saat scroll di mobile, dengan `bg-white` solid agar tidak tembus pandang dengan kolom data di belakangnya.
- **Whitespace:** Padding sel tabel lega (`p-4` minimum) untuk menghindari kesan "spreadsheet" yang padat, tetap terasa premium.
- **Empty State kolom kosong:** Kolom "Tambah properti" menggunakan border putus-putus (`border-dashed`) `slate-200` dengan ikon `Plus` di tengah, konsisten dengan pola upload-placeholder pada umumnya.

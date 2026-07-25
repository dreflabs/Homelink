# CONTACT AGENT PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Contact Agent
**Module:** 04 PROPERTY DETAIL
**Purpose:** Menyediakan jalur komunikasi langsung antara Buyer dan agen/Owner properti (via pesan singkat atau deep-link WhatsApp) untuk pertanyaan yang tidak memerlukan booking formal — alternatif ringan dibanding alur penuh `07_SCHEDULE_VIEWING.md`.

## 2. Next.js Routing Path
```text
app/(main)/p/[slug]/@modal/(.)contact-agent/page.tsx   // Intercepting Route
```
Dipicu dari tombol sekunder "Hubungi Agen" pada panel booking kolom kanan halaman `01_PROPERTY_DETAIL.md`, ditempatkan di bawah tombol utama "Jadwalkan Survey Lokasi" sebagai opsi alternatif berprioritas lebih rendah.

## 3. Required UI Components (Shadcn/ui + Custom)
- `Dialog` (Shadcn) sebagai kontainer.
- `Form` (react-hook-form + Zod) — field: nama (jika Guest), nomor telepon/email, pesan (textarea, pre-filled contoh: "Saya tertarik dengan properti ini, mohon info lebih lanjut").
- `Button` — dua opsi aksi: (a) "Kirim Pesan" (submit form in-app), (b) "Chat via WhatsApp" (deep-link `wa.me` langsung ke nomor agen/Owner terkait properti).
- `Avatar` + info agen (nama, foto, badge "Agen Terverifikasi" jika relevan) ditampilkan di header modal untuk personalisasi.

## 4. Data & State Management
- **Local State:** Nilai form (`name`, `contact`, `message`), status submit (`idle`/`submitting`/`success`/`error`), divalidasi oleh Zod schema sebelum submit.
- **Server State:** Info agen/Owner (nama, nomor kontak) idealnya berasal dari relasi `PROPERTY.ownerId`, diambil bersamaan dengan `GET /api/v1/properties/:id`.
- **Guest Handling:** Berbeda dengan Schedule Viewing, Contact Agent **tidak mewajibkan login** (bukan bagian dari FR-BOOK-001) — Guest dapat mengisi nama+kontak manual di form, atau langsung memakai jalur WhatsApp tanpa perlu autentikasi sama sekali.

## 5. API Endpoints Referenced
- **GAP ENDPOINT (perlu ditindaklanjuti):** `52_ENDPOINT_CATALOGUE.md` **belum mendokumentasikan endpoint** untuk mengirim pesan kontak in-app pada halaman ini. Diperlukan salah satu dari: (a) endpoint baru `POST /api/v1/properties/:id/contact` (body: `{name, contact, message}`) yang meneruskan pesan ke Owner/agen terkait, atau (b) menggunakan kembali (reuse) endpoint messaging umum jika modul Messaging/Inbox sudah ada di modul lain — perlu dikonfirmasi dengan tim yang memegang modul Messaging sebelum implementasi. Sampai keputusan ini dibuat, tombol "Kirim Pesan" in-app **tidak dapat diimplementasikan di backend** dan harus ditandai sebagai fitur pending di board pengembangan.
- **Jalur WhatsApp deep-link** (`https://wa.me/<nomor_agen>?text=<pesan_prefilled>`) **tidak memerlukan endpoint backend** — murni navigasi client-side ke URL eksternal, dapat diimplementasikan segera tanpa menunggu keputusan endpoint di atas.

## 6. Acceptance Criteria (DoD)
- [ ] Tombol "Chat via WhatsApp" berfungsi independen dari status backend endpoint kontak (dapat dirilis lebih dulu sebagai MVP mengingat gap endpoint di atas).
- [ ] Form "Kirim Pesan" divalidasi penuh (nama tidak kosong, kontak berupa email/nomor valid, pesan minimal N karakter) sebelum tombol submit aktif.
- [ ] Selama endpoint backend belum tersedia (lihat gap di atas), tombol "Kirim Pesan" boleh disembunyikan/disabled dengan feature flag, agar tidak menampilkan fitur yang gagal secara diam-diam.
- [ ] Setelah pesan berhasil terkirim (saat endpoint sudah tersedia), tampilkan konfirmasi jelas dan estimasi waktu respons agen.
- [ ] Modal tidak memaksa login untuk Guest, berbeda tegas dari alur Schedule Viewing.
- [ ] Semua field form memiliki `<Label>` terasosiasi dan pesan error inline yang jelas untuk screen reader.

## 7. Iconography Specification

**Library:** Lucide React ONLY. Stroke width `1.5`.

| Icon | Penggunaan | Ukuran | Warna | Catatan A11y |
|---|---|---|---|---|
| `MessageCircle` | Ikon tombol pemicu "Hubungi Agen" & header modal | 18px | `text-slate-700` | Selalu disertai label teks |
| `Phone` | Ikon opsi kontak telepon/nomor agen | 16px | `text-muted-foreground` | `aria-hidden="true"` |
| `Send` | Ikon tombol submit "Kirim Pesan" | 18px | `text-white` (di atas tombol biru) | `aria-hidden`, tombol tetap berlabel teks |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Mematuhi pedoman visual `Mockup.png` untuk standar "Apple × Airbnb × Stripe × Zillow":

- **Header Agen:** `Avatar` bulat dengan foto agen, nama, dan badge kecil ditata horizontal di bagian atas modal — memberi kesan personal dan tepercaya sebelum form muncul.
- **Tombol WhatsApp:** Menggunakan warna brand WhatsApp (`#25D366`) hanya untuk tombol ini sebagai pengecualian terbatas terhadap Royal Blue standar, karena familiar secara universal bagi pengguna Indonesia — tetap mempertahankan `rounded-2xl` dan ikon Lucide (bukan logo brand pihak ketiga).
- **Form:** Input dan textarea menggunakan `rounded-xl`, border tipis `slate-200`, focus ring `blue-700` sesuai Design System.
- **Hierarki Aksi:** Tombol "Chat via WhatsApp" ditempatkan lebih menonjol (primary secara visual) dibanding "Kirim Pesan" in-app, mengingat gap endpoint pada §5 membuat WhatsApp menjadi jalur utama yang lebih andal saat ini.
- **Whitespace:** Padding modal lega (`p-6`/`p-8`) konsisten dengan seluruh modul Property Detail lainnya.

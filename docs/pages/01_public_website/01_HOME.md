# HOME PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Home
**Module:** 01 PUBLIC WEBSITE
**Purpose:** Menjadi panggung utama (showcase) naratif HomeLink 2.0. Halaman ini bukan sekadar alat pencarian, melainkan sebuah **"Perjalanan Naratif Properti Premium" (Narrative Journey)** yang membuktikan nilai "Trust & Verified Property" dari ujung ke ujung untuk meyakinkan pembeli dan pemilik.

## 2. Next.js Routing Path
```text
app/(01_public_website)/home/page.tsx
```

## 3. Narrative Architecture (The 9 Sections)
Halaman ini dibagi secara ketat menjadi 9 seksi berurutan:

1. **Hero (The Gateway)**: Layar penuh (`min-h-[90vh]`) dengan latar belakang foto properti mewah yang imersif dan efek gradient ke atas dari `slate-950`. Wajib memanggil komponen `<Logo />`. Fokus utama adalah Search Bar dan *Verified Badge*.
2. **Featured Verified Property (The Crown Jewel)**: Kartu raksasa yang menyoroti satu properti terbaik secara mendalam, alih-alih daftar grid biasa.
3. **How HomeLink Verify (The Proof)**: Visualisasi langkah-demi-langkah (Timeline/Checklist) yang membuktikan bagaimana HomeLink memeriksa legalitas dan fisik properti.
4. **Property Category (The Exploration)**: Eksplorasi properti bergaya Airbnb (misal: "Penthouse", "Beachfront", "City Center") yang interaktif.
5. **AI Instant Valuation (The Technology)**: Demonstrasi langsung (Live Demo) AI dengan elemen visual nyata: Foto properti, Mini Chart, Estimasi Harga, dan AI Confidence Score.
6. **Exclusive Collection (The Gallery)**: Grid koleksi properti premium dengan animasi hover zoom, peta interaktif, dan agen terverifikasi.
7. **Property Insight (The Authority)**: Wawasan pasar ringkas (grafik, tren yield sewa) yang membangun kredibilitas sebagai pakar properti.
8. **Become Owner CTA (The Conversion)**: Penutup yang emosional dengan foto kota dari udara (drone view) atau rumah mewah, mengajak pemilik mendaftarkan asetnya.
9. **Footer (Brand Story)**: Bukan sekadar kumpulan tautan, melainkan penguatan manifesto merek, logo elegan, dan sertifikasi keamanan.

## 4. Required UI Components
- `SearchHero` — Mengambang di atas foto hero dengan efek "Ultra-Glassmorphism" dan shadow level `float`.
- `PropertyCard` — Grid properti premium dengan interaksi *hover* skala besar.
- `Badge` — Penanda "Verified" yang harus muncul berulang kali di seluruh perjalanan naratif.
- `Button` — Menggunakan radius penuh (`rounded-full`) dan *drop-shadow* lembut.

## 5. Data & State Management
- **Server State (RSC):** Halaman memanggil API (contoh: `GET /api/v1/properties/featured`) secara internal di Server Component.
- **Client State:** Animasi (Intersection Observer/Framer Motion jika digunakan), tab kategori interaktif, dan demo AI dijalankan secara klien.

## 6. Acceptance Criteria (DoD)
- [ ] **Bilingual Support (i18n):** Seluruh elemen teks statis pada *Hero*, *Search*, *Navbar*, *Footer*, dan *Featured Collections* wajib menggunakan metode injeksi terjemahan `next-intl` (via `useTranslations` atau `getTranslations`) secara utuh, sesuai dengan `40_I18N_ARCHITECTURE.md`. Tidak boleh ada satu pun teks antar-muka (*hardcoded*) dalam Bahasa Indonesia.
- [ ] 9 Seksi terangkai tanpa kesan "terputus" (transisi warna latar atau overlap wajar antar seksi).
- [ ] Halaman didominasi oleh *fotografi properti berkualitas tinggi*, bukan ilustrasi vektor SaaS.
- [ ] Brand DNA "Verified" muncul secara konsisten (badge, teks, ikonografi) di berbagai titik seksi.
- [ ] Performa animasi (parallax/zoom hover) tidak menyebabkan JANK/Lag (harus 60fps).

## 7. UI/UX Aesthetic Rules
Mengikuti pedoman **"The Exclusive Welcome"** (Apple × Airbnb × Zillow Showcase):
- **Emotion & Realism:** Gunakan foto properti sungguhan (misal via Unsplash/Pexels *mock*) untuk semua latar belakang dan kartu. JANGAN gunakan area kosong putih yang ekstensif tanpa makna.
- **Glassmorphism:** Gunakan `bg-white/80 backdrop-blur-xl` untuk elemen (seperti Search atau AI Demo) yang melayang di atas foto properti.
- **Micro-animations:** Transisi 300-500ms `ease-in-out` untuk setiap interaksi *hover* dan *scroll*.
- **Warna Utama:** Hitam/Dark Slate untuk kemewahan, dengan aksen *Royal Blue/Emerald* untuk *trust*.
- **Vertical Rhythm:** Jarak vertikal antar section wajib menggunakan padding yang lega, yaitu antara `py-24` sampai `py-32`.
- **Typography:** Skala tipografi untuk heading wajib menggunakan `tracking-tighter` dan `leading-[1.05]`.

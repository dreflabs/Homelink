# HELP CENTER PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Help Center
**Module:** 01 PUBLIC WEBSITE
**Purpose:** Menjadi pusat bantuan swalayan (self-service) berisi artikel panduan berkategori (mis. "Cara Booking Survei", "Cara Mengunggah Properti") yang lebih mendalam dari FAQ, dilengkapi pencarian artikel dan tautan eskalasi ke form Contact bila jawaban tidak ditemukan.

## 2. Next.js Routing Path
```text
app/(01_public_website)/help-center/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Input` (search bar utama pencarian artikel bantuan)
- `Card` (kartu kategori bantuan: "Untuk Buyer", "Untuk Owner", "Untuk Surveyor", "Akun & Keamanan")
- `Badge` (label kategori pada hasil pencarian artikel)
- `Skeleton` (loading state daftar artikel saat pencarian/pemuatan)
- `Button` (variant `outline`, CTA "Hubungi Tim Support" di footer halaman)

## 4. Data & State Management
- **Konten:** Fase 1 — artikel bantuan statis/hardcoded (kumpulan file MDX atau array konfigurasi lokal); tidak ada entity `HELP_ARTICLE` di ERD saat ini.
- **Local State:** `searchQuery` untuk filter artikel, `selectedCategory` untuk navigasi kategori.
- **Server State:** Tidak ada fetch data dinamis pada Fase 1; jika artikel dipindah ke MDX di server, RSC membaca file saat build (SSG), bukan runtime fetch.
- **Form Handling:** Tidak ada form submit langsung; search bar murni filter client-side.

## 5. API Endpoints Referenced
- Tidak ada endpoint backend untuk artikel Help Center di `52_ENDPOINT_CATALOGUE.md`. Fase 1: konten statis/hardcoded; Fase 2: migrasi ke CMS API (`/api/v1/cms/articles` — belum ada, akan didefinisikan saat modul CMS aktif).

## 6. Acceptance Criteria (DoD)
- [ ] Loading state: skeleton daftar artikel tampil sesaat sebelum hasil pencarian dirender (mis. saat debounce search berjalan).
- [ ] Empty state: pencarian tanpa hasil menampilkan pesan jelas dan tombol langsung menuju halaman Contact untuk eskalasi.
- [ ] Error state: bila (Fase 2) fetch API gagal, tampilkan pesan kegagalan yang menjelaskan penyebab dan tombol "Coba lagi" — bukan halaman kosong.
- [ ] Navigasi kategori dapat diakses via keyboard (tab order logis, fokus terlihat).
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90.
- [ ] Mobile: kartu kategori bertumpuk 1 kolom, search bar tetap terlihat di atas (sticky).

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `LifeBuoy`
- **Purpose & Business Meaning:** Ikon utama identitas halaman Help Center pada header.
- **Size:** `24px` (Desktop hero), `20px` (list konteks). **Stroke Width:** `1.5`. **Color:** `text-blue-700`.

#### Icon: `Search`
- **Purpose & Business Meaning:** Ikon di dalam search bar pencarian artikel.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`, `text-blue-700` saat fokus.

#### Icon: `FileText`
- **Purpose & Business Meaning:** Menandai setiap item artikel bantuan dalam daftar hasil.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Halaman ini **DIWAJIBKAN** untuk dibangun dengan mematuhi pedoman visual dari `Mockup.png`: background putih dominan, aksi utama `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`), surface sekunder `slate-50`, card dengan *diffused soft shadow*, border radius besar (`16-24px`).

**Spesifik halaman ini:** Search bar besar dan menonjol di bagian hero (mirip pola pusat bantuan Zillow/Airbnb), diikuti grid kartu kategori 3 kolom desktop yang menyaring artikel di bawahnya tanpa navigasi ke halaman terpisah.

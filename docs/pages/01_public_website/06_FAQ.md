# FAQ PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** FAQ
**Module:** 01 PUBLIC WEBSITE
**Purpose:** Menjawab pertanyaan yang sering diajukan seputar proses verifikasi properti, booking survei, dan pendaftaran akun, dikelompokkan per topik agar pengunjung dapat menemukan jawaban tanpa perlu menghubungi tim support.

## 2. Next.js Routing Path
```text
app/(01_public_website)/faq/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Accordion` (komponen utama — satu item per pertanyaan, dikelompokkan per kategori)
- `Tabs` (filter kategori: "Umum", "Verifikasi Properti", "Booking Survei", "Akun & Keamanan")
- `Input` (search bar untuk menyaring pertanyaan berdasarkan kata kunci)
- `Badge` (opsional, menandai kategori pada hasil pencarian)

## 4. Data & State Management
- **Konten:** Fase 1 — daftar Q&A statis/hardcoded (array lokal atau file MDX), tidak ada entity `FAQ_ITEM` di ERD saat ini.
- **Local State:** `searchQuery` (string) untuk memfilter daftar FAQ secara client-side; `activeCategory` untuk tab aktif.
- **Server State:** Tidak ada fetch data dinamis pada Fase 1.
- **Form Handling:** Tidak ada form submit; search bar murni filter client-side, tanpa skema Zod.

## 5. API Endpoints Referenced
- Tidak ada endpoint backend untuk data FAQ di `52_ENDPOINT_CATALOGUE.md`. Fase 1: konten statis/hardcoded; Fase 2: migrasi ke CMS API (`/api/v1/cms/articles` — belum ada, akan didefinisikan saat modul CMS aktif, lihat `89_CMS_MANUAL.md`).

## 6. Acceptance Criteria (DoD)
- [ ] Semua item Accordion dapat dibuka/ditutup dengan animasi 300-400ms spring, menghormati `prefers-reduced-motion`.
- [ ] Search bar menyaring pertanyaan secara real-time (debounced) tanpa reload halaman.
- [ ] Empty state: jika pencarian tidak menemukan hasil, tampilkan pesan "Tidak ada pertanyaan yang cocok dengan '<kata kunci>'" beserta saran menghubungi tim support (tautan ke halaman Contact).
- [ ] Setiap trigger Accordion memiliki `aria-expanded` dan `aria-controls` yang benar untuk pembaca layar.
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90.
- [ ] Mobile: tab kategori menjadi scrollable horizontal, Accordion tetap satu kolom penuh.

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `ChevronDown`
- **Purpose & Business Meaning:** Menandakan item Accordion FAQ dapat diperluas.
- **Size:** `20px` (Desktop), `24px` (Mobile). **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.
- **Interaksi:** Rotasi 180° saat item terbuka, transisi 150-200ms ease-out.

#### Icon: `Search`
- **Purpose & Business Meaning:** Ikon di dalam search bar filter FAQ.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`, berubah `text-blue-700` saat fokus.

#### Icon: `HelpCircle`
- **Purpose & Business Meaning:** Ikon dekoratif pada judul halaman/kategori tanpa jawaban ditemukan.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Accessibility:** `aria-hidden="true"`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Halaman ini **DIWAJIBKAN** untuk dibangun dengan mematuhi pedoman visual dari `Mockup.png`: background putih dominan, aksi utama `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`), surface sekunder `slate-50`, card dengan *diffused soft shadow*, border radius besar (`16-24px`).

**Spesifik halaman ini:** Layout satu kolom terpusat (max-width ~800px) dengan search bar sticky di bagian atas daftar Accordion agar tetap dapat diakses saat scroll melalui daftar pertanyaan yang panjang.

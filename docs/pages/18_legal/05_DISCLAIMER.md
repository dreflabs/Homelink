# DISCLAIMER PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Disclaimer (Sangkalan)
**Module:** 18 LEGAL
**Purpose:** Halaman baru yang menegaskan batasan tanggung jawab HomeLink sebagai platform verifikasi/marketplace properti — bukan pihak dalam transaksi properti aktual, bukan penjamin akurasi mutlak hasil AI Search/Valuation, dan bukan penjamin bahwa verifikasi fisik menghilangkan seluruh risiko transaksi. Melengkapi Terms of Service (`02_TERMS.md`) dengan penekanan spesifik pada batasan tanggung jawab produk.

## 2. Next.js Routing Path
```text
app/(18_legal)/disclaimer/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- Sticky Table of Contents — bagian: Peran HomeLink sebagai Platform, Batasan Verifikasi Properti, Batasan Fitur AI (Search/Valuation), Tidak Ada Jaminan Hasil Transaksi.
- `Alert` (variant `warning`) — dua kartu highlight terpisah: (1) "HomeLink bukan pihak dalam transaksi properti", (2) "Hasil AI Search/Valuation adalah estimasi, bukan jaminan" — ditempatkan menonjol di awal dokumen, bukan dikubur di paragraf.
- `Badge` — versi dokumen dan tanggal "Berlaku efektif sejak".
- `Separator` — pembatas antar bagian.

## 4. Data & State Management
- **Konten:** Fase 1: statis/hardcoded (MDX), dikelola tim legal. Fase 2: migrasi ke CMS API (`/api/v1/cms/articles` — belum ada).
- **Local State:** `activeSection` untuk highlight ToC saat scroll.
- **Server State:** Tidak ada; halaman SSG penuh. Halaman ini murni deklaratif — tidak menampilkan atau memproses data pengguna.

## 5. API Endpoints Referenced
- Tidak ada endpoint backend digunakan. Fase 1: konten statis/hardcoded; Fase 2: migrasi ke CMS API (`/api/v1/cms/articles` — belum ada).

## 6. Acceptance Criteria (DoD)
- [ ] Dokumen secara eksplisit menyatakan HomeLink adalah platform verifikasi/marketplace, BUKAN pihak dalam transaksi jual-beli/sewa properti aktual antara Owner dan Buyer.
- [ ] Dokumen secara eksplisit menyatakan hasil AI Semantic Search dan (jika aktif) AI Valuation bersifat estimasi berbasis data yang tersedia, bukan jaminan akurasi harga/kondisi pasar — tautan silang ke `39_AI_ARCHITECTURE.md`.
- [ ] Dokumen secara eksplisit menyatakan bahwa Verified Property Badge/verifikasi fisik oleh Surveyor MENGURANGI namun TIDAK MENGHILANGKAN seluruh risiko transaksi (mis. perubahan kondisi properti setelah tanggal verifikasi).
- [ ] Dua kartu `Alert` highlight (peran platform, batasan AI) dapat ditemukan tanpa scroll pada viewport desktop standar (above the fold atau nyaris demikian).
- [ ] Struktur heading hierarkis benar (`h2` per bagian).
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90.
- [ ] Mobile: ToC berubah menjadi dropdown/collapsible di atas teks.

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `ShieldAlert`
- **Purpose & Business Meaning:** Identitas halaman Disclaimer pada header — menandakan batasan tanggung jawab.
- **Size:** `20px` (Desktop), `24px` (Mobile). **Stroke Width:** `1.5`. **Color:** `text-amber-600`.

#### Icon: `Building2`
- **Purpose & Business Meaning:** Menyertai bagian "Peran HomeLink sebagai Platform" (bukan pihak transaksi).
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `Sparkles`
- **Purpose & Business Meaning:** Menyertai bagian "Batasan Fitur AI (Search/Valuation)".
- **Size:** `20px`. **Stroke Width:** `1.5`.

#### Icon: `BadgeCheck`
- **Purpose & Business Meaning:** Menyertai bagian "Batasan Verifikasi Properti" — verifikasi mengurangi tapi tidak menghilangkan risiko.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-blue-700`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)
Halaman ini **DIWAJIBKAN** mematuhi pedoman visual `Mockup.png`: background putih dominan, aksi utama `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`), surface sekunder `slate-50`, border radius besar (`16-24px`).

**Spesifik halaman ini:** Layout satu kolom max-width ~720px dengan ToC sticky kiri pada desktop, konsisten dengan dokumen legal lain di modul ini. Dua kartu `Alert` highlight menggunakan aksen amber (bukan blue) untuk secara visual menandakan "batasan/peringatan", berbeda dari kartu info netral pada Privacy Policy.

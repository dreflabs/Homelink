# INVESTOR PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Investor
**Module:** 01 PUBLIC WEBSITE
**Purpose:** Menyediakan informasi hubungan investor (ringkasan bisnis, laporan tahunan/press kit finansial, kontak Investor Relations) bagi calon investor dan pemegang saham yang mengevaluasi HomeLink.

## 2. Next.js Routing Path
```text
app/(01_public_website)/investor/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Card` (ringkasan metrik bisnis kunci — mis. jumlah properti terverifikasi, kota terlayani)
- `Card` (daftar unduhan dokumen: laporan tahunan, laporan keuangan, presentasi investor)
- `Separator` (pembatas antar seksi: ringkasan bisnis, dokumen, kontak IR)
- `Button` (variant `outline`, "Unduh Laporan" per dokumen; variant `default`, "Hubungi Investor Relations")

## 4. Data & State Management
- **Konten:** Fase 1 — seluruhnya statis/hardcoded (dokumen PDF disajikan sebagai file statis/CDN); tidak ada entity `INVESTOR_DOCUMENT` atau metrik bisnis live di ERD saat ini.
- **Local State:** Tidak ada state interaktif signifikan.
- **Server State:** Tidak ada fetch data dinamis; metrik bisnis yang ditampilkan (jumlah properti, dsb.) adalah angka yang di-hardcode/diperbarui manual per rilis, bukan query real-time ke `PROPERTY` table demi menghindari kebocoran data operasional sensitif ke publik.

## 5. API Endpoints Referenced
- Tidak ada endpoint backend untuk halaman Investor. Metrik bisnis publik pada halaman ini **sengaja tidak** ditarik langsung dari `GET /api/v1/properties` secara real-time — ini adalah keputusan konten, bukan gap teknis, karena data agregat bisnis untuk investor biasanya dikurasi dan diverifikasi manual sebelum publikasi.

## 6. Acceptance Criteria (DoD)
- [ ] Dokumen investor (PDF) dapat diunduh tanpa error, dengan indikasi ukuran file dan format yang jelas.
- [ ] Empty state: jika belum ada laporan yang dipublikasikan untuk suatu periode, tampilkan pesan yang jelas alih-alih daftar kosong.
- [ ] Metrik bisnis ditampilkan dengan format angka standar Indonesia (mis. "1.200+ Properti Terverifikasi").
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90.
- [ ] Mobile: kartu metrik bisnis bertumpuk 2 kolom, daftar dokumen menjadi 1 kolom.

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `TrendingUp`
- **Purpose & Business Meaning:** Menyertai kartu metrik pertumbuhan bisnis pada seksi ringkasan.
- **Size:** `20px` (Desktop), `24px` (Mobile). **Stroke Width:** `1.5`. **Color:** `text-blue-700`.

#### Icon: `FileBarChart`
- **Purpose & Business Meaning:** Menandai dokumen laporan keuangan/tahunan yang dapat diunduh.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `Download`
- **Purpose & Business Meaning:** Memicu unduhan dokumen investor.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-blue-700`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Halaman ini **DIWAJIBKAN** untuk dibangun dengan mematuhi pedoman visual dari `Mockup.png`: background putih dominan, aksi utama `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`), surface sekunder `slate-50`, card dengan *diffused soft shadow*, border radius besar (`16-24px`).

**Spesifik halaman ini:** Nada visual lebih formal/korporat dibanding halaman publik lain — metrik bisnis ditampilkan sebagai kartu statistik besar di bagian atas (mirip dashboard ringkas), daftar dokumen unduhan disusun sebagai tabel/list rapi di bawahnya, bukan grid bergambar.

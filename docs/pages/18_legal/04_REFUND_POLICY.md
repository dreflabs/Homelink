# REFUND POLICY PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Refund Policy (Kebijakan Pengembalian Dana)
**Module:** 18 LEGAL
**Purpose:** Halaman baru (tidak ada padanan di `01_public_website` maupun modul lain — bukan hasil de-duplikasi). Bertujuan menjelaskan syarat dan mekanisme pengembalian dana atas Verification Service Fee.

**CATATAN GAP KRITIS:** Kebijakan pengembalian dana belum didefinisikan di dokumen bisnis manapun (BRD/PRD) — halaman ini memerlukan input dari tim Legal/Finance sebelum di-finalisasi; draf di bawah adalah kerangka awal, bukan kebijakan final. `02_BUSINESS_REQUIREMENT_DOCUMENT_BRD.md` §8.3 mendefinisikan model bisnis Verification Service Fee tetapi tidak menyebutkan skenario refund (pembatalan sebelum survei, survei gagal, sengketa hasil verifikasi, dsb). Tidak ada entity `REFUND`/`REFUND_REQUEST` di `40_ERD.md` saat ini.

## 2. Next.js Routing Path
```text
app/(18_legal)/refund-policy/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Alert` (variant `warning`/destructive) — banner permanen di puncak halaman: "Draf Kebijakan — Menunggu Finalisasi Tim Legal/Finance", tidak dapat di-dismiss, agar pengguna dan tim internal tidak salah kira ini kebijakan final.
- `Badge` — status dokumen "DRAFT" alih-alih "Berlaku efektif sejak" (karena belum efektif).
- Sticky Table of Contents — bagian: Ruang Lingkup, Skenario yang Memenuhi Syarat Refund, Skenario yang TIDAK Memenuhi Syarat, Proses Pengajuan, Estimasi Waktu Proses.
- `Accordion` — mengelompokkan skenario refund per kasus (survei dibatalkan Owner, survei gagal karena akses ditolak, dsb.) — placeholder terstruktur menunggu keputusan bisnis nyata.
- `Card` — kontak eskalasi "Hubungi Tim Finance" untuk kasus yang tidak tercakup draf ini.

## 4. Data & State Management
- **Konten:** Fase 1: draf statis/hardcoded (MDX), ditandai eksplisit sebagai belum final. Fase 2: migrasi ke CMS API (`/api/v1/cms/articles` — belum ada) SETELAH kebijakan final disetujui Legal/Finance — migrasi konten final tidak boleh dilakukan terhadap draf yang belum disetujui.
- **Local State:** `activeSection` untuk highlight ToC.
- **Server State:** Tidak ada; halaman SSG. Tidak ada entity `REFUND_REQUEST` di ERD saat ini — jika Fase 2 memperkenalkan alur pengajuan refund mandiri (self-service), diperlukan entity baru dan endpoint CRUD terkait yang belum dimodelkan.

## 5. API Endpoints Referenced
- **Tidak ada endpoint terkait refund di `52_ENDPOINT_CATALOGUE.md`.** Ini adalah gap yang berasal dari gap kebijakan bisnis itu sendiri (lihat §1) — tidak dapat didefinisikan sebelum aturan bisnis refund ditetapkan oleh tim Legal/Finance. Kandidat masa depan (belum diusulkan secara formal): `POST /api/v1/refund-requests`, `GET /api/v1/refund-requests/{id}`.

## 6. Acceptance Criteria (DoD)
- [ ] Banner "DRAFT — Menunggu Finalisasi Tim Legal/Finance" tampil permanen dan tidak dapat ditutup pengguna, di posisi paling atas halaman sebelum konten apa pun.
- [ ] Halaman secara eksplisit menyatakan kalimat: "Kebijakan pengembalian dana belum didefinisikan di dokumen bisnis manapun (BRD/PRD) — halaman ini memerlukan input dari tim Legal/Finance sebelum di-finalisasi; draf di bawah adalah kerangka awal, bukan kebijakan final."
- [ ] Halaman TIDAK boleh di-deploy ke produksi dengan status "DRAFT" tanpa tinjauan hukum — dicatat sebagai blocker rilis di changelog terkait.
- [ ] Struktur heading hierarkis benar (`h2` per bagian) untuk navigasi pembaca layar, meski berstatus draf.
- [ ] Kontras warna dan tata letak lolos audit Lighthouse Aksesibilitas > 90 (persyaratan aksesibilitas tetap berlaku meski konten draf).
- [ ] Mobile: ToC berubah menjadi dropdown/collapsible di atas teks.

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `AlertTriangle`
- **Purpose & Business Meaning:** Menyertai banner status "DRAFT" di puncak halaman — menandakan konten belum final.
- **Size:** `20px` (Desktop), `24px` (Mobile). **Stroke Width:** `1.5`. **Color:** `text-amber-600`.

#### Icon: `RotateCcw`
- **Purpose & Business Meaning:** Identitas halaman Refund Policy pada header (representasi "pengembalian").
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `HelpCircle`
- **Purpose & Business Meaning:** Menyertai kartu kontak "Hubungi Tim Finance" untuk kasus di luar cakupan draf.
- **Size:** `20px`. **Stroke Width:** `1.5`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)
Halaman ini **DIWAJIBKAN** mematuhi pedoman visual `Mockup.png`: background putih dominan, aksi utama `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`), surface sekunder `slate-50`, border radius besar (`16-24px`).

**Spesifik halaman ini:** Sama seperti dokumen legal lain — layout satu kolom max-width ~720px dengan ToC sticky kiri pada desktop. Pengecualian: banner status draf menggunakan warna amber/warning (bukan `blue-700`) untuk secara visual membedakan halaman ini dari dokumen legal final lainnya, sesuai prinsip "penting namun jangan menyesatkan pengguna soal status finalisasi".

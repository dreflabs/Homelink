# PRIVACY POLICY PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Privacy Policy
**Module:** 18 LEGAL
**Purpose:** Halaman kanonik yang menjelaskan bagaimana HomeLink mengumpulkan, menyimpan, memproses, dan melindungi data pribadi pengguna (Guest, Buyer, Owner, Surveyor) sesuai UU Perlindungan Data Pribadi (UU PDP) Republik Indonesia. Menjadi rujukan tunggal untuk seluruh klaim privasi platform — menggantikan versi sebelumnya di `01_public_website/14_PRIVACY_POLICY.md` (kini redirect tipis ke halaman ini) per keputusan de-duplikasi `13_PRODUCT_ROADMAP.md` §8.3 v1.0.2.

## 2. Next.js Routing Path
```text
app/(18_legal)/privacy-policy/page.tsx
```
Menerima redirect 308 dari `app/(01_public_website)/privacy-policy/page.tsx`.

## 3. Required UI Components (Shadcn/ui)
- `Card` — kartu ringkasan "TL;DR" berisi poin data yang dikumpulkan, ditempatkan di atas dokumen penuh.
- Sticky Table of Contents (custom, bukan komponen Shadcn) — daftar bagian dengan `ScrollArea`, aktif-highlight berdasarkan scroll position, sticky di kolom kiri pada desktop (`lg:sticky lg:top-24`).
- `Badge` — menampilkan versi dokumen dan tanggal "Berlaku efektif sejak".
- `Accordion` — mengelompokkan FAQ privasi umum (mis. "Bagaimana saya menghapus akun saya?") di akhir dokumen.
- `Separator` — pembatas antar bagian (Data yang Dikumpulkan, Penggunaan Data, Hak Pengguna, Keamanan, Retensi).
- `Alert` (variant highlight/info) — menonjolkan dua hak utama pengguna: "Hak untuk Dilupakan" (Right to be Forgotten) dan "Unduh Data Saya" (Download My Data), agar tidak terkubur dalam teks legal panjang, sesuai `26_CONTENT_DESIGN_SPECIFICATION.md`.
- `Button` (variant `default`) — CTA "Unduh Data Saya" dan "Hapus Akun Saya" yang mengarah ke pengaturan akun pengguna (bukan aksi langsung di halaman publik ini).

## 4. Data & State Management
- **Konten:** Fase 1: teks kebijakan statis/hardcoded (MDX), dikelola manual oleh tim legal. Fase 2: migrasi ke CMS API (`/api/v1/cms/articles` — belum ada, akan didefinisikan saat modul `13_cms` aktif).
- **Local State:** `activeSection` untuk highlight ToC saat scroll; `expandedFaq` untuk state Accordion FAQ.
- **Server State:** Tidak ada fetch data pada halaman ini sendiri (SSG penuh). Namun tombol "Unduh Data Saya"/"Hapus Akun Saya" berinteraksi dengan endpoint akun pengguna yang login (lihat §5).
- **Entity terkait (dijelaskan, bukan ditampilkan):** `USER(email, name, passwordHash, isEmailVerified, ktpNumber, bankAccountNumber)`, `ACCOUNT` (OAuth linking), `AUDIT_LOG` (pencatatan forensik akses data). Kebijakan menjelaskan bagaimana field sensitif (KTP, nomor rekening bank) di-mask di sisi server — hanya 4 digit terakhir yang ditampilkan ke UI manapun, sesuai `65_DATA_PROTECTION.md` §4.1; masking WAJIB diterapkan di response API/server-side, bukan hanya disembunyikan via CSS di client.

## 5. API Endpoints Referenced
- **Konten kebijakan itu sendiri:** tidak ada endpoint backend; statis Fase 1.
- **`POST /api/v1/users/me/export`** (fitur "Download My Data" — JSON/CSV export seluruh data pribadi pengguna). **GAP: belum terdaftar di `52_ENDPOINT_CATALOGUE.md`.** Diusulkan sebagai penambahan endpoint baru sebelum implementasi halaman pengaturan akun yang memicu tombol ini.
- **`DELETE /api/v1/users/me`** (mekanisme "Right to be Forgotten" — hard-delete akun setelah masa jeda/cooling-off 30 hari, hanya jika akun tidak memiliki transaksi aktif). **GAP: belum terdaftar di `52_ENDPOINT_CATALOGUE.md`.** Diusulkan sebagai penambahan endpoint baru; perlu didefinisikan bersama state mesin "pending-deletion" (30 hari) di ERD/`40_ERD.md` sebelum implementasi.
- Fase 2: migrasi teks kebijakan ke CMS API (`/api/v1/cms/articles` — belum ada).

## 6. Acceptance Criteria (DoD)
- [ ] Seluruh teks Kebijakan Privasi dirender dengan struktur heading hierarkis (`h2` per bagian) untuk navigasi pembaca layar.
- [ ] Tanggal "Terakhir diperbarui" tampil jelas, format "24 Juli 2026".
- [ ] Kartu ringkasan "TL;DR" menampilkan poin utama data yang dikumpulkan sebelum teks penuh.
- [ ] Bagian "Hak Pengguna" — khususnya "Hak untuk Dilupakan" dan "Unduh Data Saya" — ditonjolkan via komponen `Alert`, bukan dikubur di paragraf biasa, dan dapat ditemukan lewat ToC dalam ≤ 2 klik.
- [ ] Dokumen menjelaskan aturan consent management: tidak ada checkbox pra-centang untuk analitik/pemasaran; consent bersifat opt-in eksplisit, sesuai `66_PRIVACY_SPECIFICATION.md` §4.1.
- [ ] Dokumen menjelaskan bahwa penghapusan akun bersifat hard-delete setelah masa jeda 30 hari TANPA transaksi aktif — bukan soft-delete/deactivation semata.
- [ ] Dokumen menjelaskan masking data KTP/nomor rekening (4 digit terakhir saja, ditegakkan di server) — tautan silang ke `65_DATA_PROTECTION.md` §4.1.
- [ ] Tombol "Unduh Data Saya" dan "Hapus Akun Saya" tercatat sebagai TIDAK aktif/fungsional sampai endpoint `POST /api/v1/users/me/export` dan `DELETE /api/v1/users/me` ditambahkan ke `52_ENDPOINT_CATALOGUE.md` dan diimplementasikan — DoD tidak dianggap selesai untuk fitur ini sampai endpoint nyata tersedia.
- [ ] Kontras warna teks panjang memenuhi rasio 4.5:1; audit Lighthouse Aksesibilitas > 90.
- [ ] Mobile: ToC berubah menjadi dropdown/collapsible di atas teks, bukan sidebar tetap.

## 7. Iconography Specification
**Library:** Lucide React ONLY.

#### Icon: `ShieldCheck`
- **Purpose & Business Meaning:** Identitas kebijakan privasi/keamanan data pada header halaman.
- **Size:** `20px` (Desktop), `24px` (Mobile). **Stroke Width:** `1.5`. **Color:** `text-blue-700`.

#### Icon: `Download`
- **Purpose & Business Meaning:** Menyertai CTA "Unduh Data Saya" (Download My Data).
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-blue-700`. **Hover:** translate-y 1px.

#### Icon: `Trash2`
- **Purpose & Business Meaning:** Menyertai CTA "Hapus Akun Saya" (Right to be Forgotten). Warna destructive untuk menandakan konsekuensi permanen.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-red-600`.

#### Icon: `Lock`
- **Purpose & Business Meaning:** Menyertai bagian "Keamanan Data" dan penjelasan masking KTP/rekening bank.
- **Size:** `20px`. **Stroke Width:** `1.5`. **Color:** `text-muted-foreground`.

#### Icon: `Clock`
- **Purpose & Business Meaning:** Menyertai tanggal "Terakhir diperbarui" dan keterangan masa jeda 30 hari penghapusan akun.
- **Size:** `20px`. **Stroke Width:** `1.5`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)
Halaman ini **DIWAJIBKAN** mematuhi pedoman visual `Mockup.png`: background dominan putih, aksi utama `Royal Blue` (`blue-700`), teks `Dark Navy` (`slate-900`), surface sekunder `slate-50`, border radius besar (`16-24px`) pada card.

**Spesifik halaman ini:** Layout baca panjang (long-form reading) satu kolom max-width ~720px untuk teks pasal, dengan sticky Table of Contents di kolom kiri pada desktop (`lg:grid-cols-[240px_1fr]`). Line-height longgar (`leading-relaxed`/`1.7`) untuk keterbacaan optimal. Kartu `Alert` untuk hak pengguna menggunakan aksen `blue-700` dengan `rounded-2xl`, ditempatkan segera setelah TL;DR agar tidak perlu scroll jauh. Tautan inline menggunakan warna `Royal Blue` (`blue-700`) dengan underline saat hover.

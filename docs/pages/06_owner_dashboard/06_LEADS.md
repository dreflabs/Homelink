# LEADS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Leads (Minat Calon Pembeli)
**Module:** 06 OWNER DASHBOARD
**Role:** Owner
**Purpose:** Menampilkan daftar calon pembeli (buyer) yang menunjukkan ketertarikan pada properti Owner di luar booking survei formal — misalnya menyimpan (bookmark) properti, mengirim pertanyaan chat/kontak, atau melihat detail properti berulang kali. Tujuannya membantu Owner memprioritaskan follow-up ke prospek yang paling serius.

## 2. Next.js Routing Path
```text
app/(dashboard)/owner/properties/[propertyId]/leads/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Table` (daftar kontak) — kolom: Nama Buyer, Tanggal Minat, Jenis Interaksi (Bookmark/Chat/Lihat Detail), Status Follow-up.
- `Avatar` — foto profil singkat buyer di setiap baris tabel.
- `Badge` — jenis interaksi (mis. "Bookmark", "Pesan Baru").
- `Button` (Hubungi) — aksi cepat membuka chat/kontak dengan buyer terkait.
- `Empty State` — jika properti belum memiliki lead sama sekali, dengan pesan edukatif menjelaskan bagaimana lead akan muncul di sini.
- `Skeleton` — loading state tabel.

## 4. Data & State Management
- **SCHEMA GAP:** Tidak ada entitas `Lead` di `40_ERD.md` saat ini. Skema Phase 1 hanya memiliki `BOOKING` (janji survei formal, bukan minat awal/prospek). Untuk merender halaman ini secara nyata, diperlukan entitas database baru (`Lead`) yang belum ada di `40_ERD.md` — lihat rekomendasi audit Tahap 3. Entitas yang diusulkan minimal berisi: `id`, `propertyId`, `buyerId`, `interactionType` (enum: BOOKMARK, CHAT_MESSAGE, DETAIL_VIEW), `createdAt`, `followUpStatus`.
- **Server State (setelah entitas tersedia):** Fetch daftar lead per properti, difilter server-side agar hanya properti dengan `ownerId = session.userId` yang dapat diakses.
- **Local State:** Filter tabel berdasarkan jenis interaksi dan status follow-up (client-side sort/filter atas data yang sudah di-fetch).

## 5. API Endpoints Referenced
- **Belum tersedia di `52_ENDPOINT_CATALOGUE.md`.** Endpoint yang diusulkan: `GET /api/v1/properties/:id/leads` — memerlukan entitas database baru (`Lead`) yang belum ada di `40_ERD.md` sebelum endpoint ini dapat diimplementasikan. Server tetap wajib memvalidasi `ownerId = session.userId` atas `propertyId` sebelum mengembalikan data lead (BOLA prevention, sama seperti endpoint properti lainnya).

## 6. Acceptance Criteria (DoD)
- [ ] **Blocked pending schema:** Halaman ini tidak dapat diimplementasikan penuh sampai entitas `Lead` ditambahkan ke `40_ERD.md` dan endpoint `GET /api/v1/properties/:id/leads` ditambahkan ke `52_ENDPOINT_CATALOGUE.md`.
- [ ] Setelah data tersedia: Owner hanya melihat lead untuk properti miliknya sendiri (BOLA test wajib).
- [ ] Tabel dapat difilter berdasarkan jenis interaksi tanpa reload halaman penuh.
- [ ] Empty state jelas membedakan "belum ada lead" dari "gagal memuat data".
- [ ] Aksi "Hubungi" membuka kanal komunikasi yang sesuai (chat in-app jika tersedia, atau mailto/telepon sebagai fallback Phase 1).

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `Users`
- **Purpose:** Ikon judul halaman/menu, merepresentasikan kumpulan calon pembeli.
- **Size:** 24px, `text-blue-700`.

#### Icon: `Bookmark`
- **Purpose:** Badge jenis interaksi "disimpan oleh buyer".
- **Size:** 16px, `text-amber-500`.

#### Icon: `MessageCircle`
- **Purpose:** Badge jenis interaksi "chat/pesan"; juga ikon tombol "Hubungi".
- **Size:** 16-18px, `text-blue-700`.

#### Icon: `Eye`
- **Purpose:** Badge jenis interaksi "melihat detail properti berulang".
- **Size:** 16px, `text-slate-500`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.3 Owner Dashboard for the full workspace design system. Page-specific deltas below:

- **Background:** `White`, tabel dengan baris `hover:bg-slate-50` untuk keterbacaan.
- **Empty State:** Ilustrasi minimal + ikon `Users` besar, teks `slate-500`, CTA opsional ke tips meningkatkan daya tarik listing.
- **Badge Interaksi:** Warna lembut (`blue-50`/`amber-50` background dengan teks warna solid sesuai kategori), `rounded-full`, ukuran kecil agar tidak mendominasi baris tabel.
- **Catatan Desain:** Karena halaman ini bergantung pada skema yang belum ada, mockup visual tetap disiapkan mengikuti Design System global namun DITANDAI "Preview — Menunggu Implementasi Backend" pada environment non-produksi.

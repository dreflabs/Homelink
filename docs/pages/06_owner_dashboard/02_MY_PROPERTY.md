# MY PROPERTY PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** My Property (Listing Saya)
**Module:** 06 OWNER DASHBOARD
**Role:** Owner
**Purpose:** Menampilkan daftar lengkap seluruh properti milik Owner yang sedang login, dengan kemampuan filter berdasarkan `status` (PENDING, REJECTED, PHYSICAL_VERIFIED, LEGAL_VERIFIED, FULLY_VERIFIED) dan `propertyType` (HOUSE, APARTMENT, LAND). Merupakan pintu masuk ke Edit Property, Property Status, Leads, Analytics, dan Documents untuk properti spesifik.

## 2. Next.js Routing Path
```text
app/(dashboard)/owner/properties/page.tsx
```
Sidebar label: "Listing Saya" (per `20_NAVIGATION_MAP.md`). SCR-202 di `18_SCREEN_INVENTORY.md`.

## 3. Required UI Components (Shadcn/ui)
- `Tabs` — filter cepat berdasarkan status (Semua, Menunggu, Ditolak, Terverifikasi).
- `Select` — filter tambahan berdasarkan `propertyType`.
- `Card` (grid) — satu kartu per properti menampilkan foto utama (`PROPERTY_MEDIA.isPrimary`), judul, harga, alamat singkat, dan `Badge` status.
- `DropdownMenu` — aksi cepat per kartu (Edit, Lihat Status, Lihat Leads, Hapus).
- `Pagination` — untuk Owner dengan banyak listing.
- `Empty State` — jika filter tidak menghasilkan properti, atau Owner belum memiliki properti sama sekali (CTA ke Add Property).
- `Skeleton` — grid loading placeholder.

## 4. Data & State Management
- **Server State:** `GET /api/v1/properties` difilter `ownerId = session.userId` di server; query params `status` dan `propertyType` diteruskan ke endpoint untuk filtering server-side.
- **Local State:** Tab/filter aktif disimpan di URL search params (`?status=PENDING`) agar shareable dan mendukung back/forward browser.
- **Fields ditampilkan per kartu:** `PROPERTY.title`, `PROPERTY.price`, `PROPERTY.address`, `PROPERTY.status`, `PROPERTY.propertyType`, `PROPERTY_MEDIA` (primary image thumbnail).
- **Delete Action:** Konfirmasi via `AlertDialog` sebelum memanggil endpoint hapus (belum ada endpoint `DELETE` eksplisit di katalog Phase 1 — soft-delete/nonaktifkan listing memerlukan konfirmasi API di `52_ENDPOINT_CATALOGUE.md`, dicatat sebagai catatan implementasi).

## 5. API Endpoints Referenced
- `GET /api/v1/properties` — dengan query filter `status`, `propertyType`; server tetap memaksa `ownerId = session.userId` terlepas dari parameter apa pun yang dikirim client.
- `GET /api/v1/properties/:id` — dipanggil saat navigasi ke detail/edit.

## 6. Acceptance Criteria (DoD)
- [ ] Owner hanya melihat properti dengan `ownerId` miliknya sendiri — tidak ada kebocoran data properti Owner lain (BOLA test wajib, lihat `63_AUTHORIZATION_SECURITY.md`).
- [ ] Filter status dan tipe properti berfungsi dan ter-sinkron dengan URL query params.
- [ ] Setiap kartu menampilkan badge status dengan warna yang konsisten dengan `05_PROPERTY_STATUS.md`.
- [ ] Empty state kontekstual: pesan berbeda antara "belum ada properti sama sekali" vs "tidak ada hasil untuk filter ini".
- [ ] Aksi hapus/nonaktifkan properti memerlukan konfirmasi eksplisit (tidak ada aksi destruktif satu klik).

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `Building2`
- **Purpose:** Ikon default kartu properti jika tidak ada foto utama.
- **Size:** 32px. **Color:** `text-slate-500`.

#### Icon: `SlidersHorizontal`
- **Purpose:** Membuka panel filter (mobile).
- **Size:** 20px.

#### Icon: `MoreVertical`
- **Purpose:** Trigger dropdown aksi per kartu.
- **Size:** 20px, `aria-label="Aksi lainnya"` wajib karena tidak didampingi teks.

#### Icon: `Trash2`
- **Purpose:** Item menu "Hapus" pada dropdown, warna `text-red-500` untuk menandakan aksi destruktif.
- **Size:** 16px.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.3 Owner Dashboard for the full workspace design system. Page-specific deltas below:

- **Background:** `White`, grid kartu dengan gap konsisten (24px).
- **Card Properti:** `rounded-2xl`, foto properti rasio 4:3, *warm lighting* pada foto, bayangan lembut saat hover (elevasi naik tipis).
- **Badge Status:** Posisi top-left di atas foto (overlay semi-transparan) agar cepat dipindai mata Owner saat scroll.
- **Warna Aksi:** `Royal Blue` untuk link "Lihat Detail"; `slate-50` untuk background filter bar.
- **Responsif:** Grid 3 kolom desktop, 2 kolom tablet, 1 kolom mobile (stack penuh).

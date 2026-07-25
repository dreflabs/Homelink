# CMS PAGE SPECIFICATION (ADMIN OVERSIGHT VIEW)
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** CMS (Admin Oversight)
**Module:** 11 ADMIN
**Purpose:** **SCOPE SEMPIT & KHUSUS ADMIN** — halaman ini BUKAN antarmuka authoring konten (artikel/kategori/tag), melainkan panel akses-kontrol Admin atas modul CMS: (1) memberi/mencabut akses role "CMS Editor" untuk user tertentu, dan (2) melihat status moderasi konten dasar (draft/published count) sebagai ringkasan pengawasan. Modul authoring penuh (`docs/pages/13_cms/`) adalah **Fase 2** dan bergantung pada entitas `Article`/`Category`/`Tag` yang belum ada di `40_ERD.md` Fase 1 — halaman ini sengaja TIDAK mendalami fitur tersebut.

## 2. Next.js Routing Path
```text
app/(dashboard)/11_admin/cms/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Alert` (banner info) — menjelaskan bahwa authoring CMS penuh adalah Fase 2 dan halaman ini hanya mengatur akses & ringkasan status.
- `DataTable` — daftar user dengan kolom nama, email, dan toggle "Akses CMS Editor" (mengatur apakah user tersebut boleh masuk ke modul `13_cms`).
- `Switch` — per baris, toggle grant/revoke akses CMS Editor (aksi ini menulis ke `USER.role` atau flag terpisah, tergantung keputusan skema Fase 2).
- `Card` (ringkasan status, placeholder) — "Konten Published", "Konten Draft" — ditampilkan sebagai "Belum Tersedia" hingga entitas `Article` ada.
- `Skeleton` — loading state tabel akses.

## 4. Data & State Management
- **Data yang TERSEDIA di Fase 1:** `USER(id, email, name, role)` — cukup untuk menampilkan daftar user dan mengelola siapa yang berhak menjadi CMS Editor, ASUMSI penambahan role `CMS_EDITOR` ke enum `USER.role` (perluasan minor, bukan entitas baru).
- **GAP ENTITAS (Fase 2, bukan tanggung jawab halaman ini):** Tidak ada entitas `Article`, `Category`, atau `Tag` di `40_ERD.md`. Ringkasan "Konten Published/Draft" pada halaman ini TIDAK DAPAT dihitung sampai entitas tersebut ditambahkan — ditampilkan sebagai placeholder "Belum Tersedia", bukan angka nol yang menyesatkan.
- **Local State:** baris user yang togglenya sedang diproses (`pendingUserId`) untuk optimistic UI pada Switch.
- **Server State:** RSC fetch daftar user dengan flag `role`/akses CMS.

## 5. API Endpoints Referenced
- **GAP:** `GET /api/v1/admin/users?role=CMS_EDITOR` dan `PATCH /api/v1/admin/users/:id/cms-access` — belum ada di `52_ENDPOINT_CATALOGUE.md`, diusulkan mengikuti konvensi yang sama dengan `02_USER_MANAGEMENT.md`.
- **GAP (Fase 2, di luar scope halaman ini):** Endpoint CRUD artikel (`/api/v1/cms/articles`, dsb.) akan didefinisikan bersamaan dengan modul `13_cms` penuh, bukan di halaman Admin ini.

## 6. Acceptance Criteria (DoD)
- [ ] Banner Fase 2 tampil jelas dan menjelaskan batas scope halaman ini (akses-kontrol, bukan authoring).
- [ ] Toggle akses CMS Editor dapat dioperasikan via keyboard dan memberi konfirmasi visual (loading state Switch) saat diproses.
- [ ] Kartu ringkasan status konten menampilkan "Belum Tersedia" secara eksplisit, bukan angka 0 yang dapat disalahartikan sebagai data valid.
- [ ] Tidak ada tautan/tombol pada halaman ini yang mengarah ke fitur authoring artikel yang belum ada.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `FileText`
- **Purpose:** Ikon header halaman CMS Oversight. **Size:** 22px. **Color:** `text-blue-700`.

#### Icon: `ShieldCheck`
- **Purpose:** Kolom/label "Akses CMS Editor" pada tabel — menegaskan ini soal otorisasi, bukan konten. **Size:** 18px. **Color:** `text-slate-500`, `text-emerald-600` saat toggle aktif.

#### Icon: `Lock`
- **Purpose:** Ikon pada Card ringkasan status konten yang masih placeholder ("Belum Tersedia"). **Size:** 20px. **Color:** `text-slate-400`.

## 8. UI/UX Aesthetic Rules
Mengikuti Design System global: background `White`, aksi utama `Royal Blue` (`blue-700`), teks `slate-900`, surface sekunder `slate-50`, shadow ultra-lembut, radius `rounded-2xl`/`rounded-3xl`.

**Catatan kepadatan khusus Admin:** Karena scope halaman ini sengaja sempit (hanya akses-kontrol), layout jauh lebih ringan dibanding halaman moderasi lain — satu tabel akses + satu banner info, tanpa filter/bulk-action kompleks. Ini disengaja agar tidak menciptakan ekspektasi visual bahwa halaman ini adalah editor konten penuh.

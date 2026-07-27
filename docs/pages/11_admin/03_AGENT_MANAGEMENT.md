# AGENT MANAGEMENT PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Agent Management
**Module:** 11 ADMIN
**Purpose:** Halaman bagi Admin untuk mengelola akun "Partner Agent" (agen properti pihak ketiga yang mewakili banyak listing). **CATATAN SCOPE PENTING:** Role "Partner Agent" belum ada di enum `USER.role` Fase 1 (`GUEST, BUYER, OWNER, ADMIN, SURVEYOR` per `40_ERD.md`) — penambahan role ini dijadwalkan Fase 2 per `03_PRODUCT_REQUIREMENT_DOCUMENT_PRD.md` §8.1. Spesifikasi pada halaman ini menggambarkan *intent* UI yang akan diaktifkan begitu entitas Agent tersedia, namun ditandai sebagai **placeholder terstruktur** hingga skema dan role tersebut resmi masuk ERD.

## 2. Next.js Routing Path
```text
app/(dashboard)/11_admin/agent-management/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Alert` (banner peringatan di atas halaman) — menjelaskan bahwa fitur Agent Management penuh menunggu entitas `Agent`/`PartnerAgent` (Fase 2); mencegah tim FE membangun UI yang berasumsi pada skema yang belum ada.
- `DataTable` (rangka kosong/disabled state) — kolom yang DIRENCANAKAN: nama agen, agensi, jumlah listing terkait, status verifikasi lisensi.
- `Button` (disabled, dengan tooltip "Tersedia di Fase 2") — tombol "Undang Agent Baru".
- `Skeleton` — placeholder visual untuk baris tabel kosong.

## 4. Data & State Management
- **GAP ENTITAS UTAMA:** Tidak ada entitas `Agent`/`PartnerAgent` di `40_ERD.md` saat ini. Yang dibutuhkan sebelum halaman ini bisa difungsikan penuh:
  - Penambahan role `PARTNER_AGENT` ke enum `USER.role`, ATAU entitas terpisah `AGENT(id, userId FK, agencyName, licenseNumber, licenseVerifiedAt, status)` yang relasi 1:1 ke `USER`.
  - Relasi `PROPERTY.agentId` (opsional) jika listing bisa diwakili agen, bukan hanya Owner langsung.
- **Local/Server State:** Tidak didefinisikan pada Fase 1 — halaman ini murni dokumentasi intent + guard UI hingga backend Fase 2 siap.

## 5. API Endpoints Referenced
- **GAP TOTAL — tidak ada endpoint agent management di `52_ENDPOINT_CATALOGUE.md`.** Endpoint yang diusulkan untuk Fase 2 (mengikuti konvensi `/api/v1/`):
  - `GET /api/v1/admin/agents` — list & search Partner Agent.
  - `POST /api/v1/admin/agents/invite` — undang agent baru via email.
  - `PATCH /api/v1/admin/agents/:id/verify-license` — verifikasi nomor lisensi agen.
  - `PATCH /api/v1/admin/agents/:id/suspend` — nonaktifkan akun agent (analog dengan suspend user di `02_USER_MANAGEMENT.md`).

## 6. Acceptance Criteria (DoD)
- [ ] Banner peringatan Fase 2 harus tampil jelas di atas halaman dan tidak dapat di-*dismiss* secara permanen (agar tim FE tidak membangun di atas asumsi salah).
- [ ] Tidak ada panggilan API sungguhan dibuat dari halaman ini pada Fase 1 — semua tombol aksi dalam keadaan `disabled`.
- [ ] Halaman tetap dapat diakses dan dirender tanpa error meski data agent kosong/nol.
- [ ] Lolos audit Lighthouse Aksesibilitas > 90 meski dalam mode placeholder.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `UserCog`
- **Purpose:** Ikon utama header halaman Agent Management, merepresentasikan pengelolaan akun agen (berbeda dari `Users` generik pada User Management).
- **Size:** 22px. **Color:** `text-blue-700`.

#### Icon: `Building2`
- **Purpose:** Kolom "Agensi" pada tabel (rencana Fase 2).
- **Size:** 18px. **Color:** `text-slate-500`.

#### Icon: `AlertTriangle`
- **Purpose:** Ikon pada banner peringatan "Fitur Fase 2".
- **Size:** 20px. **Color:** `text-amber-600`.

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.8 Admin Dashboard for the full workspace design system. Page-specific deltas below:

Mengikuti Design System global: background `White`, aksi utama `Royal Blue` (`blue-700`), teks `slate-900`, surface sekunder `slate-50`, shadow ultra-lembut, radius `rounded-2xl`/`rounded-3xl`.

**Catatan kepadatan khusus Admin:** Karena halaman ini dalam status placeholder terstruktur, tata letak tetap mengikuti pola tabel data-dense modul Admin lainnya (agar transisi ke Fase 2 mulus secara visual), namun seluruh interaksi non-navigasi berada dalam status disabled dengan penjelasan tooltip, bukan disembunyikan total — supaya stakeholder dapat melihat rencana desain di awal.

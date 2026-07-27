# PROPERTY MANAGEMENT PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Property Management (Properti Kelolaan)
**Module:** 07 PARTNER AGENT DASHBOARD
**Role:** Partner Agent
**Purpose:** Menampilkan daftar properti yang dipasarkan oleh Partner Agent atas nama Owner — memungkinkan agent memantau status verifikasi dan performa listing yang mereka bantu jual/sewakan, tanpa menggantikan kepemilikan data properti oleh Owner.

## 2. Next.js Routing Path
```text
app/(dashboard)/partner-agent/properties/page.tsx
```
Sidebar label: "Properti Kelolaan".

## 3. Required UI Components (Shadcn/ui)
- `Table` (`17_COMPONENT_LIBRARY.md` §8.3) — daftar properti kelolaan: foto thumbnail, judul, alamat, `Badge` status verifikasi, harga.
- `Select` — filter berdasarkan `status` (`PENDING/PHYSICAL_VERIFIED/LEGAL_VERIFIED/FULLY_VERIFIED/REJECTED`).
- `EmptyState` — jika agent belum dipercayakan mengelola properti apa pun.
- `Skeleton` — loading state tabel.

## 4. Data & State Management
- **Gap skema (fondasional):** `PROPERTY.ownerId` di `40_ERD.md` hanya menunjuk ke `USER` berperan `OWNER` — **tidak ada relasi Agent↔Property** (mis. kolom `listingAgentId` di `PROPERTY`, atau tabel penghubung `PropertyAgentAssignment`). Tanpa relasi ini, sistem tidak bisa menentukan properti mana yang "dikelola" seorang Partner Agent. Diusulkan: tambah `PROPERTY.listingAgentId` (nullable FK ke `USER`, hanya terisi jika role `PARTNER_AGENT`) — perubahan kecil, tidak memerlukan tabel baru.
- Setelah relasi tersedia: **Server State (RSC)** — `GET /api/v1/properties?listingAgentId=me`, difilter server-side seperti pola `ownerId=me` yang sudah ada di `06_owner_dashboard/02_MY_PROPERTY.md`.
- **Local State:** filter status disimpan di URL search params (`?status=PENDING`), konsisten dengan `34_FRONTEND_ARCHITECTURE.md` §8.2 (URL as Source of Truth).

## 5. API Endpoints Referenced
- `GET /api/v1/properties` — endpoint sudah ada; memerlukan parameter `listingAgentId` baru yang belum ada di `52_ENDPOINT_CATALOGUE.md`, menunggu skema §4.
- Tidak ada endpoint tulis di halaman ini — Partner Agent hanya memantau, tidak mengedit properti (edit tetap wewenang Owner per `06_owner_dashboard/04_EDIT_PROPERTY.md`).

## 6. Acceptance Criteria (DoD)
- [ ] Agent hanya melihat properti yang benar-benar ditugaskan padanya (BOLA test wajib begitu `listingAgentId` tersedia, lihat `63_AUTHORIZATION_SECURITY.md`).
- [ ] Halaman merender `EmptyState` yang jelas (bukan error) selama relasi Agent↔Property belum diimplementasikan backend.
- [ ] Filter status tersinkron dengan URL query params.
- [ ] Badge status konsisten dengan pemetaan warna kanonik di `15_DESIGN_SYSTEM.md` §8.2.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Building2` | Ikon default kartu/baris properti tanpa foto | 24px |
| `SlidersHorizontal` | Panel filter (mobile) | 20px |
| `Eye` | Tautan "Lihat Detail" per baris | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.4 Partner Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

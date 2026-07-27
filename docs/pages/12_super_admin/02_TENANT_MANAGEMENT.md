# TENANT MANAGEMENT PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Tenant Management
**Module:** 12 SUPER ADMIN
**Role:** Super Admin
**Purpose:** Mengelola entitas organisasi terpisah (mis. jika HomeLink kelak mendukung waralaba regional atau white-label multi-brand) — **ditandai sebagai keputusan arsitektur yang belum diambil**, bukan sekadar gap skema biasa.

## 2. Next.js Routing Path
```text
app/(dashboard)/super-admin/tenants/page.tsx
```
Sidebar label: "Tenant", di bawah grup nav "Platform" (`27_DASHBOARD_DESIGN_GUIDELINES.md` §8.9).

## 3. Required UI Components (Shadcn/ui)
- `Table` (`17_COMPONENT_LIBRARY.md` §8.3) — placeholder struktur, belum difungsikan.
- `EmptyState` — "Fitur ini menunggu keputusan arsitektur multi-tenant."

## 4. Data & State Management
- **Gap yang lebih besar dari sekadar skema:** HomeLink saat ini adalah arsitektur single-tenant (satu basis data, satu organisasi) — tidak ada konsep `Tenant` di `07_SYSTEM_ARCHITECTURE.md`/`31_MODULE_BREAKDOWN.md` maupun `40_ERD.md`. Sebelum halaman ini dapat dispesifikasikan penuh, perlu **keputusan produk**: apakah HomeLink akan mendukung multi-tenant/white-label, dan jika ya, di level apa (database-per-tenant, row-level `tenantId`, atau subdomain routing)? Ini bukan tugas dokumentasi UX untuk diputuskan sendiri.
- Sampai keputusan itu diambil, halaman ini **tidak diimplementasikan** — hanya placeholder di sidebar dengan `EmptyState` yang jelas menyatakan statusnya.

## 5. API Endpoints Referenced
- Tidak ada — menunggu keputusan arsitektur di atas.

## 6. Acceptance Criteria (DoD)
- [ ] Halaman tidak dibangun melampaui placeholder sampai keputusan arsitektur multi-tenant diambil di level Product Architecture (bukan UX), sesuai batasan proyek saat ini.
- [ ] `EmptyState` menyatakan alasan dengan jelas, bukan tabel kosong tanpa konteks.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Building` | Header halaman/placeholder | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.9 Super Admin Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

# 32. FOLDER STRUCTURE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Codebase Folder Structure Specification

## 2. Purpose
To define a strict, highly scalable directory layout for the Next.js 16 monorepo. Consistent file placement accelerates onboarding and prevents the "spaghetti code" phenomenon as the project grows.

## 3. Scope
Covers the entire `src/` directory, including App Router, UI Components, Business Logic (Services), and Database utilities.

## 4. Audience
- **All Software Engineers:** As the mandatory blueprint for where new files must be created.

## 5. Dependencies
- Reflects the separation of concerns outlined in `31_MODULE_BREAKDOWN.md`.
- Governed by `94_FRONTEND_GOVERNANCE.md`'s SSOT ownership matrix; onboarding path documented in `95_FRONTEND_ENGINEERING_HANDBOOK.md`.
- §8.1's `components/shared/` entry now includes the Shared Dashboard Shell introduced by `27_DASHBOARD_DESIGN_GUIDELINES.md` §8.1 (written after this document's initial version) — see the new §8.3 below.

## 6. Definitions
- **Colocation:** Placing files that change together close to each other (e.g., placing a component's test file next to the component).

## 7. Architecture
Next.js 16 App Router standard combined with Domain-Driven sub-folders.

## 8. Requirements

### 8.1. Master Directory Tree

```text
homelink-2.0/
├── prisma/                    # Schema database & migrations
│   └── schema.prisma
├── public/                    # Aset statis (icons, manifest)
└── src/
    ├── app/                   # Next.js 16 App Router (Rute Klien & API)
    │   ├── (public)/          # Route Group: Rute tanpa autentikasi (Home, Search)
    │   ├── (auth)/            # Route Group: Rute Login/Register
    │   ├── (dashboard)/       # Route Group: Rute khusus user login (Buyer/Owner)
    │   └── api/               # Next.js Route Handlers (Backend API)
    ├── components/            # UI Components (Presentational)
    │   ├── ui/                # Base primitives (shadcn/ui - Button, Input)
    │   ├── shared/            # Komponen komposit yg dipakai lintas halaman (Navbar, Cards)
    │   └── forms/             # Komponen formulir kompleks (SearchForm, BookingForm)
    ├── lib/                   # Utility functions & 3rd Party Integrations
    │   ├── prisma.ts          # Singleton Prisma Client
    │   ├── s3.ts              # Konfigurasi Cloudflare R2
    │   └── utils.ts           # Tailwind cn() merger
    ├── services/              # (PENTING) Business Logic / Controller Layer
    │   ├── auth.service.ts
    │   ├── property.service.ts
    │   └── booking.service.ts
    ├── types/                 # Global TypeScript definitions & Zod Schemas
    └── styles/                # Global CSS & Tailwind config
```

### 8.2. Core Rules
1. **No Logic in Routes:** File `src/app/api/.../route.ts` hanya bertugas menerima HTTP request dan mengembalikan JSON response. Seluruh proses pengolahan data (Business Logic) HARUS diletakkan di dalam `src/services/`.
2. **Component Colocation:** Jika sebuah komponen hanya digunakan pada satu halaman spesifik (misal: komponen kalkulator cicilan di halaman Detail), maka komponen tersebut tidak diletakkan di `src/components/`, melainkan di-colocate di dalam `src/app/(public)/p/[slug]/components/`.
3. **Absolute Imports:** Import modul harus menggunakan alias absolut (`@/...`) untuk menghindari "relative import hell" (contoh: `../../../components`).

### 8.3. Shared Dashboard Shell Location
`27_DASHBOARD_DESIGN_GUIDELINES.md` §8.1 defines a Shared Dashboard Shell (sidebar, header, base grid, widget grid) common to all 8 role dashboards. This lives at `src/components/shared/dashboard-shell/` (e.g. `Sidebar.tsx`, `DashboardHeader.tsx`, `WidgetGrid.tsx`) — one implementation shared across every `app/(dashboard)/{role}/layout.tsx`, never duplicated per role. Per-role deltas (nav items, sidebar grouping like Internal Agent's "Sales"/"Verification & Support" split per `27` §8.5) are passed as props/config to the shared shell, not forked into per-role copies of the shell components themselves — this is what makes `27`'s "one Design DNA, 8 distinct roles" principle enforceable in code rather than just in documentation.

## 9. Implementation
- The ESLint configuration must enforce absolute imports and restrict certain files from being imported where they shouldn't be (e.g., frontend components importing backend `prisma.ts`).

## 10. Acceptance Criteria
- [x] Every root-level folder inside `src/` has a defined, unambiguous purpose.
- [x] Clear separation between Routing (app) and Business Logic (services) is mandated.
- [x] The Shared Dashboard Shell introduced by `27_DASHBOARD_DESIGN_GUIDELINES.md` has a single, named folder home (§8.3), preventing 8 per-role forks of the same sidebar/header components.

## 11. Future Improvements
- N/A

## 12. References
- *Next.js 16 Project Structure Guidelines*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.1.0   | 2026-07-27 | Frontend Documentation Suite Step 1 | APPROVED | Added §8.3 locating `27_DASHBOARD_DESIGN_GUIDELINES.md`'s Shared Dashboard Shell in the folder tree (`src/components/shared/dashboard-shell/`), which had no folder home since it was introduced after this document's initial version. Updated Dependencies to reference `94`/`95`. |

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

## 9. Implementation
- The ESLint configuration must enforce absolute imports and restrict certain files from being imported where they shouldn't be (e.g., frontend components importing backend `prisma.ts`).

## 10. Acceptance Criteria
- [x] Every root-level folder inside `src/` has a defined, unambiguous purpose.
- [x] Clear separation between Routing (app) and Business Logic (services) is mandated.

## 11. Future Improvements
- N/A

## 12. References
- *Next.js 16 Project Structure Guidelines*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

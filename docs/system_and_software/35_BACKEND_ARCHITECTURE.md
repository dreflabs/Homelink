# 35. BACKEND ARCHITECTURE
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Backend & Core Business Logic Architecture

## 2. Purpose
To define how the server handles logic processing, database connections, and third-party integrations, ensuring a robust, secure, and performant backend layer.

## 3. Scope
Covers Route Handlers, Service Layer Pattern, Validation, and Environment configurations.

## 4. Audience
- **Backend/Fullstack Engineers:** To ensure all server-side code adheres to structural and security patterns.

## 5. Dependencies
- Directly implements the API strategies outlined in `28_HIGH_LEVEL_DESIGN_HLD.md`.

## 6. Definitions
- **Service Layer:** An abstraction layer that contains core business logic, sitting between the API route controller and the database layer.

## 7. Architecture
Monolithic API via Next.js Route Handlers utilizing a Controller-Service-Repository pattern (Prisma acting as Repository).

## 8. Requirements

### 8.1. The 3-Tier Server Pattern
1. **Controller (Route Handler):** `src/app/api/.../route.ts`
   - Hanya bertugas: Menerima HTTP Request $\rightarrow$ Mengekstrak Body/Query $\rightarrow$ Memanggil Service $\rightarrow$ Mengembalikan HTTP Response.
   - **TIDAK BOLEH** mengandung logika validasi kompleks atau *query database* langsung.
2. **Service Layer (Business Logic):** `src/services/*.service.ts`
   - Tempat di mana *logic* inti berada (misalnya perhitungan jadwal *booking*, atau validasi hak akses untuk *Owner*).
   - Mudah untuk di-*unit test* secara terisolasi tanpa memalsukan (*mocking*) HTTP request.
3. **Repository Layer:** Prisma ORM.

### 8.2. Dual Validation Strategy (Zod)
- Meskipun frontend memiliki form validasi sendiri, Backend HARUS mengasumsikan semua input klien berpotensi merusak (*malicious*).
- Setiap *payload* request wajib diproses (*parsed*) menggunakan *Zod Schema* sebelum dikirim ke *Service Layer*.

### 8.3. Connection Pooling (Database)
- Aplikasi Next.js pada mode *serverless* atau kluster PM2 dapat membuka terlalu banyak koneksi ke PostgreSQL, menyebabkan batas maksimum tercapai (*Connection Exhaustion*).
- Instansiasi Prisma Client HARUS menggunakan pola Singleton yang disimpan dalam variabel *global* Node.js, terutama saat masa pengembangan (Development Mode) dengan HMR (*Hot Module Replacement*).

## 9. Implementation
- The CI/CD pipeline should run strict linting rules that fail if `prisma` is imported directly into any `route.ts` file instead of passing through a service.

## 10. Acceptance Criteria
- [x] Strict separation of concerns (Controllers vs Services).
- [x] Security via mandatory server-side validation is enforced.

## 11. Future Improvements
- Offload heavy tasks (like processing gigabytes of uploaded images) to a dedicated background worker (e.g., Redis + BullMQ) in Phase 3.

## 12. References
- *Domain-Driven Design (Eric Evans)*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

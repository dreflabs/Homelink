# 41. DATABASE DICTIONARY
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Data Dictionary

## 2. Purpose
To serve as the definitive glossary for all database schemas, standardizing the naming conventions of tables and columns to ensure there is zero ambiguity among developers.

## 3. Scope
Covers naming conventions, data types mapping (Prisma to SQL), and standard metadata columns.

## 4. Audience
- **Database Engineers / Data Analysts:** For querying data.

## 5. Dependencies
- Extends the entities listed in `40_ERD.md`.

## 6. Definitions
- **Data Dictionary:** A centralized repository of information about data such as meaning, relationships to other data, origin, usage, and format.

## 7. Architecture
N/A

## 8. Requirements

### 8.1. Naming Conventions
- **Tables (Models):** PascalCase singular (misal: `User`, `PropertyMedia`). Alasan: Standar bawaan Prisma ORM.
- **Columns (Fields):** camelCase (misal: `firstName`, `createdAt`).
- **Booleans:** Selalu gunakan awalan `is` atau `has` (misal: `isVerified`, `hasPool`).
- **Foreign Keys:** Gunakan akhiran `Id` yang merujuk ke tabel target (misal: `ownerId` merujuk ke `User.id`).

### 8.2. Standard Metadata Fields
Setiap entitas relasional utama di dalam *database* (terutama yang dapat dimodifikasi) **HARUS** memiliki kolom-kolom standar berikut:
1. `id`: Tipe `String` (UUIDv4). Menjadi Primary Key.
2. `createdAt`: Tipe `DateTime`. Diisi otomatis oleh database (`@default(now())`).
3. `updatedAt`: Tipe `DateTime`. Diubah otomatis saat baris dimodifikasi (`@updatedAt`).
4. `isDeleted`: Tipe `Boolean`. Default `false`. Digunakan untuk *Soft Delete* agar data transaksional tidak hilang.

### 8.3. Data Type Mappings (Prisma $\rightarrow$ PostgreSQL)
- `String` $\rightarrow$ `TEXT` (Hindari `VARCHAR` tanpa alasan spesifik, `TEXT` lebih fleksibel di PostgreSQL).
- `Int` $\rightarrow$ `INTEGER`.
- `Float` $\rightarrow$ `DOUBLE PRECISION`.
- `Decimal` $\rightarrow$ `DECIMAL(12,2)` (Wajib untuk nominal mata uang rupiah untuk menghindari *floating-point math errors*).

## 9. Implementation
- The Prisma schema file (`schema.prisma`) must enforce these naming conventions. Any deviation must be rejected during code review.

## 10. Acceptance Criteria
- [x] Clear rules for naming tables and columns.
- [x] Explicit requirement for audit trails (`createdAt`, `updatedAt`).

## 11. Future Improvements
- N/A

## 12. References
- *Prisma Data Model Naming Conventions*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

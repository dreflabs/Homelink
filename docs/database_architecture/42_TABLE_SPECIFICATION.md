# 42. TABLE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Table-Level Specifications

## 2. Purpose
To provide the exact structural breakdown of critical tables, including constraints, default values, and column definitions.

## 3. Scope
Covers the detailed definitions of `User` and `Property` tables.

## 4. Audience
- **Backend Engineers:** For schema creation.

## 5. Dependencies
- Detail of `40_ERD.md` and `41_DATABASE_DICTIONARY.md`.

## 6. Definitions
- **Unique Constraint:** Ensures all values in a column are distinct.

## 7. Architecture
N/A

## 8. Requirements

### 8.1. Table: `User`
Tabel utama untuk semua akun (Guest, Owner, Surveyor, Admin).

| Column Name | Prisma Type | DB Constraint | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | String | PK (UUIDv4) | `uuid()` | Identifikasi unik pengguna. |
| `email` | String | UNIQUE, NOT NULL | - | Email aktif. |
| `phone` | String? | UNIQUE, NULLABLE | - | Nomor WhatsApp. |
| `passwordHash`| String? | NULLABLE | - | Kosong jika login via OAuth. |
| `role` | Enum(Role) | NOT NULL | `BUYER` | Peran pengguna. |
| `isDeleted` | Boolean | NOT NULL | `false` | Soft delete flag. |

### 8.2. Table: `Property`
Tabel penyimpanan metadata inti setiap listing.

| Column Name | Prisma Type | DB Constraint | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | String | PK (UUIDv4) | `uuid()` | Identifikasi unik properti. |
| `ownerId` | String | FK (User.id) | - | Pemilik properti. |
| `slug` | String | UNIQUE, NOT NULL | - | URL-friendly identifier. |
| `title` | String | NOT NULL | - | Judul iklan. |
| `price` | Decimal | NOT NULL | - | Harga dalam Rupiah (DECIMAL 12,2). |
| `status` | Enum(Status)| NOT NULL | `PENDING`| Hanya `FULLY_VERIFIED` yang tampil di publik. |
| `latitude` | Float | NOT NULL | - | Koordinat spasial Peta. |
| `longitude`| Float | NOT NULL | - | Koordinat spasial Peta. |
| `embedding`| Unsupported| NULLABLE | - | Kolom PGVector (dimensi 1536). |

### 8.3. Table: `Account`
Tabel penyimpanan tautan (*linking*) akun OAuth (Google/Apple ID) ke satu `User`, sesuai kebutuhan Auth.js meski sesi bersifat stateless JWT (lihat `55_AUTHENTICATION_FLOW.md` dan `31_MODULE_BREAKDOWN.md`).

| Column Name | Prisma Type | DB Constraint | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | String | PK (UUIDv4) | `uuid()` | Identifikasi unik tautan akun. |
| `userId` | String | FK (User.id) | - | Pemilik akun. |
| `provider` | Enum(Provider) | NOT NULL | - | `GOOGLE` atau `APPLE`. |
| `providerAccountId` | String | NOT NULL | - | ID unik dari penyedia OAuth. |
| `refreshToken` | String? | NULLABLE | - | Disimpan terenkripsi; hanya dipakai Auth.js internal. |
| `accessToken` | String? | NULLABLE | - | Disimpan terenkripsi; hanya dipakai Auth.js internal. |

*Constraint tambahan:* `@@unique([provider, providerAccountId])` — satu akun eksternal hanya boleh tertaut ke satu `User`.

### 8.4. Table: `AuditLog`
Tabel log forensik *append-only* (tidak boleh di-`UPDATE`/`DELETE`), sesuai struktur wajib di `67_AUDIT_LOGGING.md`.

| Column Name | Prisma Type | DB Constraint | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `id` | String | PK (UUIDv4) | `uuid()` | Identifikasi unik entri log. |
| `actorId` | String | FK (User.id) | - | Pengguna/Admin yang melakukan aksi. |
| `action` | String | NOT NULL | - | Konvensi teks, mis. `UPDATE_PROPERTY_PRICE`, `APPROVE_VERIFICATION`. |
| `entityId` | String | NOT NULL | - | ID target yang diubah. |
| `oldValues` | Json? | NULLABLE | - | Snapshot nilai sebelum perubahan. |
| `newValues` | Json? | NULLABLE | - | Snapshot nilai sesudah perubahan. |
| `ipAddress` | String | NOT NULL | - | Alamat IP aktor. |

*Catatan:* Tabel ini TIDAK memiliki kolom `isDeleted`/`updatedAt` — sengaja dikecualikan dari standar metadata di `41_DATABASE_DICTIONARY.md` §8.2 karena sifatnya *append-only*/immutable.

## 9. Implementation
- Prisma mappings must exactly replicate the constraints listed here (e.g., using `@unique` and `@default(uuid())`).

## 10. Acceptance Criteria
- [x] Nullability and Constraints are explicitly defined.
- [x] Special columns (like PGVector embeddings) are documented.

## 11. Future Improvements
- Add `Transaction` and `Escrow` table specifications in Phase 4.

## 12. References
- N/A

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Menambahkan spesifikasi tabel `Account` dan `AuditLog` yang sebelumnya dirujuk di dokumen lain tapi tidak pernah didetailkan; sinkron dengan `40_ERD.md` v1.0.1. |

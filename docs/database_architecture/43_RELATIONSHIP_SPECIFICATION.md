# 43. RELATIONSHIP SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Database Relationship & Cascade Specification

## 2. Purpose
To define what happens to related data when a parent record is modified or deleted. Proper cascade rules prevent orphaned data or accidental mass deletions.

## 3. Scope
Covers referential integrity actions (CASCADE, SET NULL, RESTRICT) for primary foreign keys.

## 4. Audience
- **Database Engineers:** For Prisma relation declarations.

## 5. Dependencies
- Extends `42_TABLE_SPECIFICATION.md`.

## 6. Definitions
- **Cascade Delete:** When a parent record is deleted, all related child records are automatically deleted.
- **Restrict:** Prevents deletion of a parent record if child records exist.

## 7. Architecture
Prisma relational integrity.

## 8. Requirements

### 8.1. Relational Integrity Matrix

| Parent Table | Child Table | Foreign Key | On Delete Action | Alasan Bisnis |
| :--- | :--- | :--- | :--- | :--- |
| `User` (Owner) | `Property` | `ownerId` | **RESTRICT** | Menghapus akun *User* tidak boleh sembarangan jika mereka memiliki *Property* yang sedang dalam proses verifikasi atau transaksi. *Property* harus dihapus manual terlebih dahulu. |
| `Property` | `PropertyMedia`| `propertyId` | **CASCADE** | Jika properti dihapus total, foto-fotonya sudah tidak relevan dan harus ikut dihapus (dari DB). |
| `Property` | `Booking` | `propertyId` | **CASCADE** | Jika properti dihapus, semua jadwal *booking* yang menggantung harus ikut terhapus. |
| `User` (Buyer) | `Booking` | `buyerId` | **CASCADE** | Jika akun pembeli dihapus (sepenuhnya), data jadwal kunjungan mereka dibersihkan. |
| `User` | `Account` | `userId` | **CASCADE** | Jika `User` dihapus permanen, tautan OAuth-nya tidak berguna dan harus ikut terhapus. |
| `User` | `AuditLog` | `actorId` | **RESTRICT** | Log forensik bersifat *append-only*; menghapus `User` tidak boleh menghapus jejak audit historisnya (kebutuhan investigasi/hukum, lihat `67_AUDIT_LOGGING.md`). |

### 8.2. Prisma Implementation Example
Penulisan spesifikasi relasi di atas ke dalam Prisma:
```prisma
model Property {
  id      String @id @default(uuid())
  ownerId String
  owner   User   @relation(fields: [ownerId], references: [id], onDelete: Restrict)
  
  media   PropertyMedia[] // Cascade by default if defined explicitly in child
}

model PropertyMedia {
  id         String   @id @default(uuid())
  propertyId String
  property   Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)
}
```

## 9. Implementation
- Always prefer `Soft Delete` (`isDeleted = true`) at the application layer over hard database deletions to preserve historical transaction records, rendering these Cascade rules largely as a last resort safety net.

## 10. Acceptance Criteria
- [x] Defined `On Delete` actions for every major relationship.
- [x] Valid business reasons are provided for `RESTRICT` actions.

## 11. Future Improvements
- N/A

## 12. References
- *Prisma Relation Actions*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Menambahkan aturan cascade untuk `Account` dan `AuditLog` yang baru ditambahkan ke ERD/Table Specification. |

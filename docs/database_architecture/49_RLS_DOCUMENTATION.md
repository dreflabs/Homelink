# 49. RLS DOCUMENTATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Row-Level Security (RLS) Strategy

## 2. Purpose
To define the strategy for restricting which users can view or modify specific rows of data in the database, acting as a failsafe beneath the application's business logic layer.

## 3. Scope
Covers application-level multi-tenancy isolation. Note: Since Prisma does not natively support PostgreSQL RLS elegantly, this logic is enforced in the **Service Layer** (Application Level RLS).

## 4. Audience
- **Backend Engineers:** To ensure data privacy rules are embedded in every query.

## 5. Dependencies
- Extends the module rules in `35_BACKEND_ARCHITECTURE.md`.

## 6. Definitions
- **Multi-tenancy:** An architecture where a single instance of software serves multiple distinct user groups (tenants/owners).

## 7. Architecture
Application-level Policy Enforcement via Prisma Middleware or Service Layer.

## 8. Requirements

### 8.1. Data Isolation Rules
1. **Aturan `Owner`:** Seorang *Owner* hanya boleh melihat, mengubah, atau menghapus baris tabel `Property` di mana kolom `ownerId` cocok dengan JWT Session ID milik mereka.
2. **Aturan `Buyer`:** Seorang *Buyer* hanya boleh melihat detail tabel `Booking` jika `buyerId` cocok dengan ID mereka, ATAU jika status pemesanan terhubung dengan properti yang bersifat `FULLY_VERIFIED`.
3. **Aturan `Admin`:** Admin memiliki akses global (*bypass*) ke seluruh baris tabel (khusus untuk Dasbor internal).

### 8.2. Service Layer Enforcement (Application RLS)
Setiap *query* di dalam `src/services/` harus memaksakan filter `userId` tanpa terkecuali.

**Contoh Buruk (Bocor Data):**
```typescript
// BERBAHAYA: Mengambil data tanpa mempedulikan siapa yang memintanya
const property = await prisma.property.findUnique({ where: { id: req.body.id } });
```

**Contoh Benar (Aman):**
```typescript
// AMAN: Memaksa `ownerId` cocok dengan sesi pengguna
const property = await prisma.property.findFirst({ 
  where: { 
    id: req.body.id,
    ownerId: session.userId 
  } 
});
if (!property) throw new Error("Akses Ditolak / Properti tidak ditemukan");
```

## 9. Implementation
- Senior Engineers must strictly review Pull Requests for any missing context checks (e.g., verifying `ownerId` or `buyerId`) in update/delete queries.

## 10. Acceptance Criteria
- [x] Clear explanation of why Application-level RLS is chosen over native PG RLS (due to Prisma limitations).
- [x] Code snippets illustrating the correct enforcement pattern.

## 11. Future Improvements
- Move to native PostgreSQL RLS via Prisma extensions if multi-tenancy becomes excessively complex.

## 12. References
- *Prisma Multi-tenancy Guides*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

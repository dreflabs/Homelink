# 44. MIGRATION STRATEGY
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Database Migration & Deployment Strategy

## 2. Purpose
To ensure that changes to the database schema are versioned, repeatable, and deployed without causing downtime or data loss in the production environment.

## 3. Scope
Covers Prisma migration workflows for Local, Staging, and Production environments.

## 4. Audience
- **DevOps & Backend Engineers:** For executing CI/CD pipelines safely.

## 5. Dependencies
- Dependent on DevOps guidelines (Hostinger VPS Deployment).

## 6. Definitions
- **Migration:** A script (SQL) that alters the database schema from one state to another.
- **Drift:** When the actual database schema differs from the expected schema defined in the code.

## 7. Architecture
Prisma Migrate engine.

## 8. Requirements

### 8.1. Local Development Workflow
1. *Engineer* membuat perubahan pada file `prisma/schema.prisma`.
2. *Engineer* menjalankan perintah: `npx prisma migrate dev --name <deskripsi_perubahan>`.
3. Prisma akan menghasilkan file SQL baru di folder `prisma/migrations/`. File ini WAJIB di-*commit* ke Git.

### 8.2. Production Deployment Workflow (Zero-Downtime)
Perubahan database *production* (VPS) tidak boleh dilakukan secara manual. Harus dipicu oleh GitHub Actions.
1. CI/CD *Pipeline* mendeteksi perubahan pada `main` branch.
2. *Script* menjalankan: `npx prisma migrate deploy`. (Perintah ini aman untuk *production* karena hanya menjalankan file SQL yang belum diaplikasikan).
3. Setelah migrasi berhasil, *script* melakukan *restart* pada aplikasi Node.js (`pm2 reload`).

### 8.3. Data Seeding & Backfilling
- Jika migrasi menambahkan kolom `NOT NULL` baru tanpa nilai default ke tabel yang sudah berisi jutaan baris, aplikasi **AKAN GAGAL** di *production*.
- **Aturan Pembaruan:** Kolom baru pada tabel *existing* harus selalu `NULLABLE` di awal, atau diberikan nilai `@default()`. Data lama diisi (*backfill*) menggunakan skrip latar belakang. Setelah data terisi 100%, migrasi kedua dapat dilakukan untuk mengubah kolom menjadi `NOT NULL`.

## 9. Implementation
- CI/CD pipeline MUST run `npx prisma migrate status` to detect any database drift before applying new migrations.

## 10. Acceptance Criteria
- [x] Clear rules prohibiting manual `migrate dev` execution in production.
- [x] Safe schema evolution patterns (Backfilling) are documented.

## 11. Future Improvements
- N/A

## 12. References
- *Prisma Migrate Documentation*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

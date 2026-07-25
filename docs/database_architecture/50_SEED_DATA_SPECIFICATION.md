# 50. SEED DATA SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Database Seed Strategy

## 2. Purpose
To ensure that local development environments and automated testing pipelines start with a consistent, realistic, and predictable state of the database.

## 3. Scope
Covers the `prisma/seed.ts` execution, environment isolation, and dummy asset paths.

## 4. Audience
- **QA Engineers:** To rely on specific dummy data for testing.
- **Frontend Engineers:** To have immediate data when building UI.

## 5. Dependencies
- Extends the structures defined in `40_ERD.md`.

## 6. Definitions
- **Seed Data:** Initial data provided to a database when it is being installed or reset.

## 7. Architecture
Prisma integrated seeding (`npx prisma db seed`).

## 8. Requirements

### 8.1. Seeding Rules
1. **Lingkungan (Environment) Check:** Skrip *seed* **HARUS** mengecek variabel `NODE_ENV`. Jika `NODE_ENV === 'production'`, eksekusi skrip **DIBATALKAN** seketika untuk mencegah data palsu (*dummy*) tercampur di server *live*.
2. **Kredensial Dummy yang Konsisten:**
   - Admin Login: `admin@homelink.local` / Password: `password123`
   - Owner Login: `owner@homelink.local` / Password: `password123`
   - Buyer Login: `buyer@homelink.local` / Password: `password123`
3. **Data Dummy yang Realistis:** Data untuk `title` dan `description` properti tidak boleh menggunakan omong kosong (*Lorem Ipsum*). Harus menggunakan data kontekstual: "Rumah Minimalis BSD Tahap 2", "Apartemen Studio Jakarta Selatan". Ini diperlukan agar AI Semantic Search dapat dites di lokal.

### 8.2. Reset & Seed Workflow
Engineer menjalankan satu perintah gabungan untuk mereset dan memuat data ulang secara instan:
```bash
npx prisma migrate reset --force
```
*(Perintah ini akan membuang semua data, mengaplikasikan migrasi, dan otomatis menjalankan `prisma/seed.ts`)*.

## 9. Implementation
- The `seed.ts` file must create relationships dynamically. It should create users first, grab their generated UUIDs, and use those to associate the fake properties and bookings.

## 10. Acceptance Criteria
- [x] Strict safety mechanism to prevent running in Production.
- [x] Standardized dummy credentials are provided for QA automation.

## 11. Future Improvements
- N/A

## 12. References
- *Prisma Seeding Guidelines*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

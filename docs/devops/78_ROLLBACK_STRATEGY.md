# 78. ROLLBACK STRATEGY
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
**Feature Name:** Code Rollback & Migration Reversal

## 2. Purpose
Prosedur aman untuk membatalkan (*undo*) versi aplikasi terbaru yang ternyata rusak di Produksi, mengembalikannya ke versi stabil sebelumnya.

## 3. Scope
- Git Revert.
- PM2 Re-deploy.
- Prisma Migration Rollback (Critical).

## 4. Audience
- **Semua Engineers**

## 5. Dependencies
- `70_CI_CD_SPECIFICATION.md` — proses rollback kode memicu ulang pipeline CI/CD yang sama untuk redeploy versi lama.
- `44_MIGRATION_STRATEGY.md` — strategi migrasi database yang menjadi dasar aturan *Roll-Forward/Fix-Forward* pada dokumen ini.

## 6. Definitions
- **Git Revert:** Perintah Git yang membuat komit baru berisi kebalikan dari perubahan sebelumnya, tanpa menghapus riwayat.
- **PM2:** Process manager Node.js yang menjalankan ulang aplikasi versi lama setelah rollback kode.
- **Prisma Migration:** Sistem migrasi skema database milik Prisma ORM.
- **Roll-Forward / Fix-Forward:** Strategi memperbaiki masalah database dengan migrasi baru, bukan membatalkan migrasi lama.
- **@deprecated:** Penanda pada kode bahwa suatu kolom/fungsi sudah usang namun belum dihapus, demi kompatibilitas mundur.

## 7. Architecture
Rollback kode memanfaatkan `Revert Pull Request` di GitHub yang memicu ulang pipeline CI/CD (dokumen 70) untuk redeploy versi stabil; rollback database tidak pernah menggunakan `migrate down`, melainkan migrasi SQL baru yang diterapkan searah maju (Fix-Forward).

## 8. Requirements

### 8.1. Application Code Rollback (Fast)
Jika fitur baru merusak UI/Logika, pemulihan dilakukan murni melalui Git:
1. Di repositori GitHub, jalankan proses `Revert Pull Request` pada PR yang bermasalah.
2. Proses ini akan membuat komit kebalikan. *Merge* komit ini ke `main`.
3. GitHub Actions akan mendeteksi `push` baru dan otomatis men-deploy ulang kode lama yang berfungsi (Waktu pemulihan: $\approx 3$ Menit).

### 8.2. Database Rollback (Complex & Dangerous)
Prisma ORM **TIDAK** merekomendasikan `migrate down` (pembatalan migrasi) di lingkungan *production* karena berisiko menghapus data pelanggan.
- **Aturan Besi:** Jika sebuah rilis merusak skema database, **JANGAN** pernah mencoba me-reset database (seperti menjalankan `prisma migrate reset`).
- **Solusi Tepat (Roll-Forward):** 
  - Buat file migrasi SQL baru secara manual di `LOCAL`.
  - Isi file SQL tersebut dengan perintah `ALTER TABLE` atau `DROP COLUMN` yang membatalkan perubahan sebelumnya secara aman.
  - Terapkan migrasi tersebut ke `Production` dengan melakukan Push kode yang telah diperbaiki. Ini disebut strategi *Fix-Forward*.

## 9. Implementation
- Pastikan bahwa setiap kali membuat rilis besar, hindari menghapus kolom kritis (`DROP COLUMN`). Daripada menghapusnya, tandai sebagai usang (`@deprecated` di kode) agar jika terjadi *rollback* kode aplikasi, kode versi lama tersebut masih bisa membaca struktur *database* yang utuh.

## 10. Acceptance Criteria
- [x] Pemahaman yang disepakati bahwa *database* di Produksi HANYA boleh bergerak maju (Roll-Forward), tidak boleh dimundurkan (Downgraded).

## 11. Future Improvements
- Fase 2: Mengotomatiskan deteksi rilis bermasalah (via monitoring/Sentry) agar `Revert Pull Request` dapat disarankan atau dipicu semi-otomatis.

## 12. References
- Prisma Migrate Documentation.
- GitHub Revert Pull Request Documentation.

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

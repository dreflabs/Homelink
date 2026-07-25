# 47. BACKUP AND RESTORE
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Disaster Recovery: Backup & Restore Procedures

## 2. Purpose
To ensure business continuity in the event of hardware failure (VPS crash), ransomware attacks, or catastrophic human error (e.g., accidental `DROP TABLE`).

## 3. Scope
Covers PostgreSQL logical dumps, automated CRON jobs, and Cloudflare R2 offsite storage.

## 4. Audience
- **DevOps Engineers:** To implement the automated backup scripts.

## 5. Dependencies
- Dependent on Hostinger VPS access and Cloudflare R2 credentials.

## 6. Definitions
- **pg_dump:** A PostgreSQL utility for backing up a database.
- **RTO (Recovery Time Objective):** Waktu maksimal yang diizinkan untuk memulihkan sistem (Target: 4 Jam).
- **RPO (Recovery Point Objective):** Jumlah maksimal kehilangan data yang dapat ditoleransi (Target: 24 Jam terakhir).

## 7. Architecture
Bash scripts executed by Linux CRON.

## 8. Requirements

### 8.1. Backup Strategy (The 3-2-1 Rule)
- 3 Salinan Data.
- 2 Media berbeda (Volume VPS & Cloudflare R2).
- 1 Salinan berada di lokasi geografis berbeda (Off-site Cloudflare).

### 8.2. Automated CRON Script Logic
Skrip bash (`backup_db.sh`) akan berjalan setiap hari pada pukul 02:00 AM WIB (saat trafik sistem paling rendah).
1. Melakukan perintah `pg_dump -Fc` (Custom format terkompresi).
2. Memberi nama file dengan stempel waktu: `homelink_db_YYYYMMDD.dump`.
3. Menggunakan AWS CLI untuk mengunggah file tersebut ke *bucket* rahasia di Cloudflare R2: `s3://homelink-backups/db/`.
4. Menghapus salinan lokal di VPS yang usianya lebih dari 7 hari untuk menghemat ruang *disk*.

### 8.3. Restore Procedure
Jika terjadi kegagalan sistem, langkah pemulihan (Restore) adalah:
1. *Download* file `.dump` terbaru dari Cloudflare R2.
2. ⚠️ HENTIKAN aplikasi PM2 agar tidak ada penulisan data baru.
3. Kosongkan database yang korup: `DROP SCHEMA public CASCADE; CREATE SCHEMA public;`.
4. Pulihkan data menggunakan `pg_restore -d <db_name> homelink_db_YYYYMMDD.dump`.
5. Nyalakan kembali aplikasi PM2.

## 9. Implementation
- The backup script MUST NOT echo or print the database password. It must use the `~/.pgpass` file or environment variables.

## 10. Acceptance Criteria
- [x] RTO and RPO metrics are defined.
- [x] Exact command-line tools (`pg_dump`, `pg_restore`) are specified.

## 11. Future Improvements
- Implement Point-In-Time-Recovery (PITR) via WAL (Write-Ahead Log) archiving for an RPO of 5 minutes in Phase 4.

## 12. References
- *PostgreSQL Backup and Restore Documentation*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

# 48. DATABASE SECURITY
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Database Security Protocols

## 2. Purpose
To protect sensitive user data (passwords, PII, and property legal certificates) from internal leaks, unauthorized access, and SQL Injection attacks.

## 3. Scope
Covers encryption at rest, network isolation, and principle of least privilege.

## 4. Audience
- **Security & DevOps Engineers:** To harden the VPS environment.

## 5. Dependencies
- Implements the security constraints defined in `05_NON_FUNCTIONAL_REQUIREMENT_SPECIFICATION_NFRS.md`.

## 6. Definitions
- **PII:** Personally Identifiable Information (e.g., KTP, Phone Numbers).
- **Network Isolation:** Preventing external internet traffic from reaching the database port directly.

## 7. Architecture
N/A

## 8. Requirements

### 8.1. Network Isolation (Firewall)
- *Port* standar PostgreSQL (5432) **DILARANG KERAS** diekspos ke internet publik (0.0.0.0).
- UFW (Uncomplicated Firewall) pada VPS Hostinger HARUS dikonfigurasi agar port 5432 hanya merespons permintaan dari IP lokal (`127.0.0.1` atau `localhost`). Semua akses dari luar untuk *maintenance* harus melalui terowongan SSH (*SSH Tunneling*).

### 8.2. Principle of Least Privilege (DB Users)
Jangan menjalankan aplikasi Next.js (Prisma Client) menggunakan *user* `postgres` (Superuser).
- Buat *user* khusus: `CREATE USER homelink_app WITH PASSWORD 'strong_pwd';`
- Berikan hak akses terbatas: Hanya `SELECT, INSERT, UPDATE, DELETE` pada tabel di *schema* spesifik aplikasi. *User* ini tidak boleh memiliki izin `DROP TABLE` di luar lingkup migrasi.

### 8.3. Protection Against SQL Injection
- Karena aplikasi menggunakan Prisma ORM, 99% serangan SQL Injection dapat dicegah karena Prisma menggunakan *Parameterized Queries*.
- Namun, jika *engineer* menggunakan fungsi `$queryRaw`, interpolasi string mentah (misal: `` prisma.$queryRaw`SELECT * FROM User WHERE id = ${req.id}` ``) **SANGAT DILARANG**. Wajib menggunakan template literal Prisma yang otomatis mengamankan variabel.

## 9. Implementation
- DevOps must verify the UFW rules using external port scanners (like `nmap`) immediately after VPS provisioning.

## 10. Acceptance Criteria
- [x] Clear ban on exposing port 5432.
- [x] Mandates the creation of a restricted application user.

## 11. Future Improvements
- Column-level encryption (AES-GCM) for storing sensitive KTP numbers directly in the database (Phase 4).

## 12. References
- *OWASP Database Security Guidelines*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

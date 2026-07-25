# 70. CI/CD SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
**Feature Name:** Continuous Integration & Continuous Deployment (CI/CD)

## 2. Purpose
Mengotomatiskan proses pengujian dan penyebaran kode ke server. Mengurangi intervensi manusia (mengurangi *human error*) dan memastikan bahwa fitur baru bisa dirlis beberapa kali sehari tanpa merusak sistem.

## 3. Scope
- GitHub Actions Workflows.
- Code Quality Checks.
- Automated Deployments.

## 4. Audience
- **DevOps & Software Engineers**

## 5. Dependencies
- `78_ROLLBACK_STRATEGY.md` — prosedur pemulihan jika deployment otomatis pipeline ini gagal atau merusak Produksi.
- `44_MIGRATION_STRATEGY.md` — langkah `prisma migrate deploy` pada tahap CD mengacu pada strategi migrasi database di dokumen ini.
- `71_DEPLOYMENT_GUIDE.md` — target VPS dan konfigurasi server tempat pipeline ini mengirimkan *build artifact*.

## 6. Definitions
- **CI (Continuous Integration):** Proses otomatis menguji kode (lint, type-check, unit test) setiap ada perubahan.
- **CD (Continuous Deployment):** Proses otomatis merilis kode yang lulus CI langsung ke Produksi.
- **PM2:** Process manager Node.js yang digunakan untuk menjalankan dan me-*reload* aplikasi tanpa downtime.
- **Zero-downtime restart:** Teknik me-restart aplikasi (`pm2 reload`) tanpa memutus koneksi pengguna yang sedang aktif.
- **Code Coverage:** Persentase baris kode yang teruji oleh *unit test*.

## 7. Architecture
GitHub Actions menjalankan pipeline CI (lint, type-check, audit, test) pada setiap push/PR, kemudian pipeline CD melakukan build Next.js, transfer artifact via SSH/`rsync` ke Hostinger VPS, eksekusi migrasi Prisma, dan reload PM2 secara zero-downtime.

## 8. Requirements

### 8.1. Continuous Integration (CI)
*Trigger:* Setiap ada `Push` atau `Pull Request` ke *branch* `main` atau `staging`.
*Langkah:*
1. **Linting:** Menjalankan `npm run lint`. Gagal jika ada *warnings* ketat.
2. **Type Checking:** Menjalankan `npx tsc --noEmit`. Gagal jika ada eror TypeScript.
3. **Security Audit:** Menjalankan `npm audit --audit-level=high`.
4. **Unit Tests:** Menjalankan `npm run test`. Harus mencapai *Code Coverage* $\ge 80\%$.

### 8.2. Continuous Deployment (CD)
*Trigger:* Jika dan hanya jika tahap CI (di atas) berhasil lulus 100% pada branch `main`.
*Langkah:*
1. **Build:** Server GitHub melakukan kompilasi Next.js (`npm run build`). Jika gagal, stop pipeline.
2. **Transfer:** *Artifact* hasil build dan file statis dikirim ke Hostinger VPS menggunakan `rsync` atau `scp` secara aman melalui koneksi SSH.
3. **Database Migration:** *Pipeline* mengeksekusi `npx prisma migrate deploy` di server VPS.
4. **Restart Service:** *Pipeline* mengeksekusi `pm2 reload homelink-app` (Zero-downtime restart).

## 9. Implementation
- Seluruh spesifikasi ini ditulis dalam format YAML di direktori `.github/workflows/deploy.yml`.

## 10. Acceptance Criteria
- [x] Push kode kotor (gagal tes atau TS eror) dibatalkan secara otomatis oleh GitHub Actions.
- [x] Rilis ke produksi bersifat otomatis (Push-to-Deploy) tanpa ada *engineer* yang harus SSH manual ke VPS.

## 11. Future Improvements
- Fase 2/3: Menambahkan tahap *canary deployment* atau *blue-green deployment* untuk mengurangi risiko rilis besar sebelum 100% traffic dialihkan.

## 12. References
- GitHub Actions Documentation.
- PM2 Documentation.

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

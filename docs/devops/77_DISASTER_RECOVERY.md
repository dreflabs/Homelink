# 77. DISASTER RECOVERY
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
**Feature Name:** Infrastructure Disaster Recovery (DR) Plan

## 2. Purpose
Mengembalikan layanan (*restore service*) ke kondisi semula secepat mungkin paska hancurnya/lumpuhnya fasilitas infrastruktur utama.

## 3. Scope
- Migrasi VPS Lintas Provider.
- DNS Rerouting.

## 4. Audience
- **DevOps, CTO**

## 5. Dependencies
- `76_BACKUP.md` — catatan konfigurasi Nginx/SSL cadangan dirujuk saat *setup* ulang server darurat.
- Dokumen 47 (Database Backup) — sumber cadangan database yang di-*restore* pada skenario bencana.

## 6. Definitions
- **RTO (Recovery Time Objective):** Waktu target maksimum pemulihan layanan setelah bencana.
- **Cold Standby:** Strategi DR tanpa server cadangan yang selalu aktif; server baru disiapkan hanya saat dibutuhkan.
- **Hot Standby:** Strategi DR dengan server cadangan yang selalu aktif dan siap, namun berbiaya lebih tinggi.
- **A Record:** Jenis DNS record yang memetakan domain ke alamat IP.
- **Fire Drill:** Simulasi latihan pemulihan bencana untuk menguji kesiapan tim.

## 7. Architecture
Skenario Cold Standby: provisioning VPS baru dari provider berbeda, setup Nginx dari catatan cadangan, restore database dari Cloudflare R2, redeploy aplikasi via GitHub Actions CI/CD, dan pengalihan DNS A Record di Cloudflare ke IP VPS baru.

## 8. Requirements

### 8.1. Skenario Bencana Ekstrem
Skenario: Gedung Data Center Hostinger di Indonesia mengalami mati listrik total (*Blackout*) selama berhari-hari. Aplikasi mati.

### 8.2. Disaster Recovery Protocol (Cold Standby)
HomeLink tidak memiliki server cadangan *Hot Standby* karena memakan biaya Opex 2x lipat (Fase 1). Solusinya adalah *Cold Recovery*:
1. **Penyediaan Darurat:** Beli VPS baru dari penyedia Cloud berbeda (misal: DigitalOcean Singapore atau AWS Jakarta).
2. **Setup Ulang Cepat:** Gunakan *script deployment* atau pengaturan Nginx manual (dari catatan cadangan Dokumen 76).
3. **Database Restore:** Unduh cadangan Database terbaru dari Cloudflare R2 (Lokasi Global/Anycast, jadi tetap hidup), lalu *restore* (Rujuk Dokumen 47).
4. **App Deployment:** Jalankan ulang GitHub Actions CI/CD dan arahkan target rilis ke IP VPS baru.
5. **DNS Switch:** Masuk ke Cloudflare Dashboard, ganti *A Record* `homelink.co.id` dari IP VPS lama ke IP VPS baru (Peralihan instan dalam detik).

## 9. Implementation
- Seluruh tim operasi harus menguji simulasi DR ("Fire Drill") minimal 1 kali setahun untuk memastikan RTO (Waktu Target Pemulihan) berada di bawah 6 jam.

## 10. Acceptance Criteria
- [x] Semua cadangan data dan konfigurasi rahasia berada di penyedia pihak ketiga independen (Cloudflare R2, Bitwarden), tidak bergantung pada keutuhan server Hostinger.

## 11. Future Improvements
- Fase 4: Mengevaluasi migrasi ke strategi Warm Standby jika skala bisnis membenarkan biaya Opex tambahan demi menurunkan RTO di bawah 1 jam.

## 12. References
- Cloudflare DNS Documentation.
- DigitalOcean / AWS Provisioning Documentation.

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

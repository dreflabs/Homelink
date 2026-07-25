# 76. BACKUP
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
**Feature Name:** Infrastructure Backup & Snapshots

## 2. Purpose
Melindungi infrastruktur fisik/virtual dari hilangnya konfigurasi kritis (Nginx, SSL, file `.env`) di luar kode sumber aplikasi.
*(Catatan: Ini berbeda dengan Backup Database yang sudah dibahas di dokumen 47).*

## 3. Scope
- VPS Snapshot.
- Secret Configurations.

## 4. Audience
- **DevOps Engineers**

## 5. Dependencies
- Dokumen 47 (Database Backup) — mencakup pencadangan data database, yang secara eksplisit berada di luar cakupan dokumen ini.
- `77_DISASTER_RECOVERY.md` — merujuk kembali ke catatan konfigurasi Nginx/SSL dokumen ini saat melakukan *setup* ulang server darurat.

## 6. Definitions
- **VPS Snapshot:** Duplikasi seluruh *disk state* server yang dapat di-*restore* utuh.
- **.env:** File environment variable yang menyimpan rahasia (kredensial, API key) aplikasi.
- **Secrets Manager:** Layanan/aplikasi (1Password, Bitwarden, AWS Secrets Manager) untuk menyimpan rahasia secara aman.

## 7. Architecture
Fitur snapshot/backup bawaan panel Hostinger VPS mencadangkan seluruh *disk state* OS, sementara file rahasia (`.env`, sertifikat SSL, konfigurasi Nginx) yang tidak masuk repositori Git disimpan terpisah di *password manager* perusahaan.

## 8. Requirements

### 8.1. VPS Snapshot (Server-Level Backup)
- Menggunakan fitur "Snapshots" atau "Daily Backup" bawaan panel kontrol Hostinger VPS.
- Fitur ini akan menduplikasi keseluruhan *disk state* dari OS Ubuntu. Jika suatu saat server terkena instalasi paket berbahaya (malware rootkit), *snapshot* ini bisa di-*restore* dengan 1 kali klik.

### 8.2. Manual Configuration Backup
- File `.env.production`, sertifikat SSL Cloudflare asli, dan konfigurasi kustom `/etc/nginx/sites-available` tidak tersimpan di repositori GitHub (karena alasan keamanan rahasia).
- CTO / Lead DevOps harus menyimpan salinan file-file kritis ini di Brankas Sandi Perusahaan (misal: 1Password, Bitwarden, atau AWS Secrets Manager) agar server bisa dibangun ulang dari awal jika Hostinger mengalami masalah permanen.

## 9. Implementation
- Jadwalkan evaluasi pencadangan mingguan untuk memastikan panel VPS Hostinger melakukan *snapshot* dengan benar (hijau).

## 10. Acceptance Criteria
- [x] Tidak ada rahasia produksi (.env) yang didorong ke Git. Semua dicadangkan di *password manager* perusahaan.

## 11. Future Improvements
- Fase 3: Migrasi penyimpanan rahasia ke solusi terkelola (misal AWS Secrets Manager atau HashiCorp Vault) untuk rotasi kredensial otomatis.

## 12. References
- Hostinger VPS Snapshot Documentation.
- 1Password / Bitwarden Documentation.

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

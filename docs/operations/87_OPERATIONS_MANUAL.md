# 87. OPERATIONS MANUAL
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
General System Operations Manual

## 2. Purpose
Dokumen induk panduan (*Runbook*) operasional sehari-hari bagi Administrator IT untuk memastikan platform berjalan lancar setelah fase peluncuran (Post-Launch).

## 3. Scope
- Daily Health Checks.
- Routine Maintenance.
- Scaling Procedures.

## 4. Audience
- **System Administrators, DevOps**

## 5. Dependencies
- `74_MONITORING.md` — sumber dasbor Grafana/PM2 dan alert Sentry yang diperiksa pada Daily Health Checks.
- `47_BACKUP_AND_RESTORE.md` — cron job `backup_db.sh` yang diverifikasi pada Routine Maintenance mingguan.

## 6. Definitions
- **SysAdmin:** System Administrator, pihak yang bertanggung jawab menjalankan Runbook ini.
- **VPS:** Virtual Private Server, infrastruktur hosting platform.
- **Cache Hit Ratio:** Persentase permintaan yang berhasil dilayani dari cache Cloudflare tanpa menyentuh origin server.
- **Downtime:** Periode layanan tidak dapat diakses pengguna, misalnya saat proses scaling.

## 7. Architecture
N/A — dokumen ini bersifat prosedural (Runbook operasional), bukan spesifikasi arsitektur teknis.

## 8. Requirements

### 8.1. Daily Health Checks (Pemeriksaan Harian)
Setiap pagi (pukul 09:00 WIB), SysAdmin harus melakukan pengecekan visual pada:
1. Dasbor Grafana/PM2: Pastikan utilitas CPU VPS di bawah 60%.
2. Log Sentry: Pastikan tidak ada lonjakan *error* HTTP 500 yang belum terselesaikan.
3. Dasbor Cloudflare: Cek apakah tingkat *Cache Hit Ratio* berada di atas 70%. Jika turun drastis, ada kesalahan pada konfigurasi *Header Next.js*.

### 8.2. Routine Maintenance (Pemeliharaan Rutin)
- **Mingguan:** Memeriksa ukuran log file di VPS. Memastikan cron job `backup_db.sh` (Dokumen 47) berjalan sukses minggu itu.
- **Bulanan:** Memperbarui (*Update*) paket keamanan sistem operasi Ubuntu (`apt-get update && apt-get upgrade`).

### 8.3. Vertical Scaling Procedure (Kapasitas Penuh)
Jika lalu lintas bisnis tumbuh pesat dan CPU VPS konstan di 90%:
1. Upgrade paket VPS Hostinger ke spesifikasi yang lebih tinggi (RAM/CPU ditambah) melalui Panel Kontrol.
2. Proses ini membutuhkan *downtime* sekitar 5-15 menit (tergantung *provisioning*).
3. Lakukan pada jam malam (02:00 WIB) dan pasang bendera Maintenance Mode (Tampilkan UI Perbaikan) sebelum *reboot*.

## 9. Implementation
- Jadwalkan peringatan kalender berulang bagi tim IT Ops untuk menghindari kelalaian pengecekan harian.

## 10. Acceptance Criteria
- [x] Prosedur *Scaling* menyertakan peringatan *downtime* yang dipahami manajemen.

## 11. Future Improvements
- Otomatisasi Daily Health Checks melalui bot yang mengirim ringkasan status Grafana/Sentry/Cloudflare langsung ke Slack setiap pagi, mengurangi ketergantungan pada pengecekan manual.

## 12. References
- N/A

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

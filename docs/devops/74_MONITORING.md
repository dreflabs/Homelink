# 74. MONITORING
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
**Feature Name:** Application Performance & Availability Monitoring

## 2. Purpose
Memantau kesehatan peladen (*server*) secara *real-time* agar tim CTO bisa merespons anomali (*CPU Spike, Memory Leak*) sebelum sistem mengalami mati total (*Down*).

## 3. Scope
- Uptime Checks.
- Server Resource Monitoring (CPU/RAM).
- Application Error Tracking.

## 4. Audience
- **DevOps, CTO**

## 5. Dependencies
- `72_INFRASTRUCTURE_ARCHITECTURE.md` — simpul-simpul (Nginx, PM2, PostgreSQL) yang dipantau oleh dokumen ini.
- `75_LOGGING.md` — log terstruktur yang menjadi sumber tambahan saat menelusuri anomali yang terdeteksi monitoring.

## 6. Definitions
- **Uptime Monitoring:** Pengecekan berkala apakah aplikasi merespons dan tersedia.
- **Memory Leak:** Kebocoran memori yang menyebabkan penggunaan RAM terus meningkat tanpa dilepaskan.
- **PM2 Plus:** Layanan pemantauan tambahan dari PM2 untuk grafik *memory heap* per-worker.
- **Sentry:** Platform *exception tracking* pihak ketiga untuk menangkap error runtime.
- **White Screen of Death:** Kondisi *frontend* gagal total tanpa tampilan error yang terlihat pengguna.

## 7. Architecture
Layanan eksternal (UptimeRobot/BetterStack) melakukan polling `GET /api/health` setiap menit, PM2 Plus memantau CPU/memory per-worker Node.js, dan Sentry menangkap *unhandled exception* di Production — seluruhnya mengirim notifikasi ke CTO/tim engineer saat terjadi anomali.

## 8. Requirements

### 8.1. Uptime Monitoring
- Menggunakan layanan gratis/murah (seperti UptimeRobot atau BetterStack).
- Mengecek endpoint khusus `GET /api/health` setiap 1 menit. Jika merespons selain `200 OK`, sistem akan mengirimkan peringatan (SMS/Notifikasi WhatsApp/Telegram) ke nomor ponsel CTO.

### 8.2. Server Resource (PM2 & OS)
- Karena menggunakan *Hostinger VPS*, pemantauan RAM dan CPU dasar bisa dilihat di Dasbor Hostinger.
- Untuk detail per-*worker* Node.js, gunakan integrasi `pm2 plus` (gratis) untuk memonitor grafik *Memory Heap* dan mendeteksi adanya *Memory Leak* (kebocoran memori).

### 8.3. Exception Tracking (Error Boundary)
- Jika *user* mengalami "Layar Putih" (*White Screen of Death*), *console error*-nya hilang di *browser user*.
- Wajib mengintegrasikan **Sentry** (sentry.io). Setiap ada kegagalan *try-catch* atau *Unhandled Promise Rejection* di Production, laporannya (beserta letak baris kodenya) langsung terkirim ke *dashboard* tim *engineer*.

## 9. Implementation
- Endpoint `/api/health` harus dirancang se-ringan mungkin (sekadar `return { status: "OK" }`), jangan melakukan kueri berat ke DB untuk menghindari efek DoS.

## 10. Acceptance Criteria
- [ ] Laporan Sentry (Belum diintegrasikan ke kode produksi — status PLANNED/Belum Diimplementasikan).

## 11. Future Improvements
- Fase 2: Menambahkan *dashboard* metrik terpusat (misal Grafana) yang menggabungkan Uptime, PM2 Plus, dan Sentry dalam satu tampilan.

## 12. References
- UptimeRobot / BetterStack Documentation.
- PM2 Plus Documentation.
- Sentry Documentation.

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian |
| 1.0.2   | 2026-07-26 | Antigravity AI       | PLANNED  | Diperbarui: Integrasi Sentry & Uptime Monitoring eksternal diklarifikasi berstatus PLANNED (belum ada di kode produksi). |

# 75. LOGGING
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
**Feature Name:** Centralized Logging Strategy

## 2. Purpose
Mengelola keluaran teks (log) dari berbagai komponen sistem (Nginx, Node.js, Database) untuk mempermudah pelacakan (debugging) ketika terjadi kesalahan.

## 3. Scope
- Nginx Access Logs.
- Application Console Logs.

## 4. Audience
- **DevOps Engineers**

## 5. Dependencies
- `74_MONITORING.md` — log terstruktur pada dokumen ini menjadi sumber data tambahan saat menyelidiki anomali yang dilaporkan monitoring/Sentry.
- `72_INFRASTRUCTURE_ARCHITECTURE.md` — komponen (Nginx, PM2) yang menghasilkan log diatur pada topologi dokumen ini.

## 6. Definitions
- **Winston/Pino:** Pustaka *logging* terstruktur untuk Node.js yang menghasilkan output JSON.
- **Log Rotation:** Proses memecah dan menghapus file log lama agar disk tidak penuh.
- **pm2-logrotate:** Modul PM2 untuk merotasi log aplikasi secara otomatis.
- **reqId (Request ID):** ID unik per HTTP request yang dilampirkan ke semua log terkait untuk *tracing*.
- **logrotate:** Utilitas bawaan Ubuntu untuk rotasi log sistem, termasuk Nginx.

## 7. Architecture
Aplikasi Node.js/Next.js menghasilkan log JSON terstruktur (Winston/Pino) yang disertai `reqId`, Nginx mencatat access log terpisah; keduanya dirotasi otomatis masing-masing oleh `pm2-logrotate` dan `logrotate` bawaan Ubuntu.

## 8. Requirements

### 8.1. Application Logs (Node.js/Next.js)
- *Console.log* di produksi **HARUS** dihindari jika hanya mencetak informasi remeh.
- Gunakan pustaka logging terstruktur (seperti `Winston` atau `Pino`) yang mengeluarkan log dalam format JSON. Format JSON memudahkan log dibaca oleh mesin analitik.
  ```json
  {"level":"error","time":"2026-07-24T12:00:00Z","msg":"Payment gateway timeout","reqId":"uuid-123"}
  ```

### 8.2. Log Rotation (PM2)
- Server akan kehabisan ruang disk (Storage Full) jika log dibiarkan menumpuk selamanya.
- Wajib memasang modul `pm2-logrotate`. Konfigurasikan agar log dipecah (*rotate*) setiap mencapai 10MB, dan maksimal menyimpan 14 file log (cadangan 2 minggu). Log lama akan dihapus otomatis.

### 8.3. Nginx Access Logs
- Mengonfigurasi `/var/log/nginx/access.log` untuk merekam IP Klien, Agen Pengguna (Browser), dan durasi respons. Sama seperti PM2, pastikan rotasi log *logrotate* bawaan Ubuntu aktif untuk Nginx.

## 9. Implementation
- Integrasikan parameter `reqId` (Request ID) unik pada setiap HTTP Request awal, dan lampirkan ID tersebut ke semua log yang terkait. Hal ini penting agar *engineer* dapat melacak jejak (*trace*) satu transaksi dari awal hingga akhir.

## 10. Acceptance Criteria
- [x] Disk VPS dipastikan aman dari kepenuhan log karena `pm2-logrotate` aktif.

## 11. Future Improvements
- Fase 3: Mengirim log terpusat ke layanan agregasi (misal Grafana Loki atau ELK Stack) alih-alih hanya menyimpan di disk lokal VPS.

## 12. References
- Winston Documentation.
- Pino Documentation.
- PM2 Logrotate Documentation.

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

# 91. INCIDENT SOP
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
Technical Incident Handling SOP

## 2. Purpose
Menguraikan langkah-langkah prosedural konkret saat mengatasi kelumpuhan teknis yang terjadi di Produksi (misalnya Database mati atau *bug* kritis). Berbeda dengan *Disaster Recovery*, SOP ini menangani insiden skalanya lebih kecil namun sering terjadi.

## 3. Scope
- Insiden Downtime.
- Root Cause Analysis (RCA).

## 4. Audience
- **DevOps, CTO, Backend Engineers**

## 5. Dependencies
- `78_ROLLBACK_STRATEGY.md` — dirujuk langsung pada tahap Mitigasi Cepat untuk mengembalikan versi kode saat terjadi insiden.
- `74_MONITORING.md` — sumber peringatan otomatis (Sentry/UptimeRobot) yang memicu tahap Deteksi.

## 6. Definitions
- **RCA:** Root Cause Analysis, metode analisis akar penyebab masalah pasca-insiden.
- **On-call:** Engineer piket yang bertanggung jawab merespons insiden di luar jam kerja normal.
- **Feature Toggle:** Mekanisme untuk mematikan/menghidupkan fitur tanpa deploy ulang penuh.
- **Post-Mortem:** Rapat/dokumen evaluasi pasca-insiden yang bersifat *blameless* (tanpa menyalahkan individu).
- **5 Whys:** Metode analisis akar masalah dengan bertanya "mengapa" secara berulang.

## 7. Architecture
N/A — dokumen ini bersifat prosedural (SOP insiden), bukan spesifikasi arsitektur teknis.

## 8. Requirements

### 8.1. Alur Deteksi hingga Resolusi
1. **Deteksi:** Peringatan otomatis (*Alert*) berbunyi dari Sentry/UptimeRobot dan terkirim ke Slack `#alerts`.
2. **Triase (Triage):** *Engineer* piket (*On-call*) segera membuka log dan mengakui (*acknowledge*) insiden dalam 5 menit.
3. **Mitigasi Cepat (Bandaid):** Jika *bug* merusak halaman utama, *Engineer* piket diberi wewenang mematikan fitur (*Feature Toggle*) atau mengembalikan versi kode (Rujuk ke *Rollback Strategy* Dok 78) tanpa menunggu izin CTO.
4. **Resolusi Permanen:** *Engineer* menulis perbaikan di lokal, membuat *Pull Request* darurat (Hotfix), dan merilis ulang.

### 8.2. Root Cause Analysis (RCA) & Post-Mortem
Dalam $2 \times 24$ Jam setelah setiap insiden yang menyebabkan fitur mati lebih dari 30 menit, CTO **HARUS** memimpin rapat *Post-Mortem*.
Rapat ini harus menghasilkan dokumen *Blameless Post-Mortem* (Dokumen Tanpa Menyalahkan Individu) yang berisi:
- Waktu kejadian, Waktu Pemulihan.
- Mengapa ini terjadi? (Metode *5 Whys*).
- Langkah teknis permanen apa yang akan dilakukan agar insiden yang persis SAMA tidak terjadi lagi bulan depan.

## 9. Implementation
- Hubungkan Sentry *alerts* secara langsung ke kanal Slack/Discord tim agar notifikasi terlihat oleh semua *Engineer* seketika.

## 10. Acceptance Criteria
- [x] Budaya *Blameless Post-Mortem* ditanamkan secara struktural.

## 11. Future Improvements
- Membangun dasbor pelacakan insiden terpusat yang mengumpulkan riwayat Post-Mortem dan status tindak lanjut RCA lintas waktu untuk mendeteksi pola insiden berulang.

## 12. References
- Blameless Post-Mortem (metodologi manajemen insiden).
- 5 Whys (metode analisis akar penyebab).

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

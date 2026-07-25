# 84. PERFORMANCE TESTING
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
**Feature Name:** Load & Performance Testing Plan

## 2. Purpose
Membuktikan bahwa platform tidak akan "*down*" atau macet saat tiba-tiba diserang lonjakan pengunjung (*Traffic Spike*), misal saat kampanye iklan massal berjalan.

## 3. Scope
- K6 Load Testing.
- Batasan Kemacetan (Bottleneck Thresholds).

## 4. Audience
- **QA Engineers & DevOps**

## 5. Dependencies
- devops/ infrastructure specification — spesifikasi VPS Staging/Production yang menjadi target uji beban.
- `79_QA_STRATEGY.md` — bagian dari strategi QA global yang menetapkan pengujian non-fungsional sebagai gerbang kualitas.

## 6. Definitions
- **k6** — alat *load testing* berbasis JavaScript dari Grafana Labs.
- **VU** — *Virtual User*, simulasi satu pengguna bersamaan dalam uji beban.
- **SLO** — *Service Level Objective*, target metrik performa yang harus dipenuhi.
- **P95 Latency** — nilai waktu respons di mana 95% permintaan lebih cepat dari nilai tersebut.
- **Bottleneck** — titik penyumbatan sumber daya (CPU, koneksi DB) yang membatasi performa sistem.

## 7. Architecture
Grafana k6 dijalankan dari lingkungan lokal developer menembak server Staging, dengan pemantauan PM2/Grafana untuk menganalisis titik kemacetan CPU Node.js atau *Connection Pool* PostgreSQL.

## 8. Requirements

### 8.1. Skenario Pengujian (k6)
- **Tooling:** Menggunakan *Grafana k6* berbasis JavaScript. Tes dijalankan dari lingkungan lokal *developer* menembak ke server `Staging`. TIDAK BOLEH dieksekusi melawan `Production`.
- **Ramp-up Test:** Naikkan beban dari 0 hingga 5.000 VUs (Virtual Users) secara bertahap selama 5 menit. Pertahankan selama 10 menit, lalu turunkan perlahan.

### 8.2. Metrik Target (SLOs)
- **Search API (`GET /properties`):** P95 Latency $< 800$ms pada beban 5.000 VUs.
- **Login API (`POST /login`):** P95 Latency $< 500$ms.
- **Error Rate:** $< 1\%$ *request* gagal (HTTP 5xx) di puncak beban.

### 8.3. Identifikasi Botol Leher (Bottleneck)
- Jika tes gagal memenuhi metrik di atas, integrasi pemantauan (PM2/Grafana) harus dianalisis untuk melihat di mana letak tersumbatnya: Apakah CPU Node.js menyentuh 100%, atau Koneksi Maksimal PostgreSQL (Connection Pool) habis?

## 9. Implementation
- Selalu tes di lingkungan Staging yang spesifikasi VPS-nya sama (atau minimal proporsional) dengan VPS Production.

## 10. Acceptance Criteria
- [x] Sistem (terutama fungsi API AI Semantic Search) terbukti mampu menangani beban kampanye iklan besar (5000 koneksi bersamaan).

## 11. Future Improvements
- Menjadwalkan uji beban k6 secara berkala (contoh: bulanan) sebagai bagian rutin pipeline, bukan hanya sebelum kampanye besar.

## 12. References
- Grafana k6 Documentation
- PM2 Monitoring Documentation

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

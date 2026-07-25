# 83. END TO END TESTING
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
**Feature Name:** End-to-End (E2E) Testing Specification

## 2. Purpose
Menguji aplikasi seolah-olah dilakukan oleh pengguna nyata melalui *browser*, memastikan bahwa seluruh alur (Frontend $\rightarrow$ Network $\rightarrow$ Backend $\rightarrow$ Database) berjalan mulus tanpa hambatan.

## 3. Scope
- Playwright Framework.
- Critical User Journeys (CUJ).

## 4. Audience
- **QA Automation Engineers**

## 5. Dependencies
- `09_USER_JOURNEY.md` — sumber definisi Critical User Journeys (CUJ) yang dijadikan skenario E2E.
- `70_CI_CD_SPECIFICATION.md` — pipeline GitHub Actions yang menjalankan Playwright secara otomatis pada setiap perubahan kode.

## 6. Definitions
- **E2E** — *End-to-End*, pengujian yang mensimulasikan alur pengguna nyata dari ujung ke ujung.
- **CUJ** — *Critical User Journey*, alur pengguna penting yang menyentuh fungsi bisnis inti (uang, akses).
- **Auto-wait** — mekanisme Playwright menunggu elemen siap sebelum berinteraksi, mengurangi *test flakiness*.
- **Headless mode** — menjalankan browser tanpa antarmuka grafis, umum digunakan di lingkungan CI.

## 7. Architecture
Playwright (Microsoft) sebagai *framework* E2E utama, dijalankan headless di GitHub Actions dengan kontainer Next.js dan PostgreSQL yang dibangun dari nol per eksekusi.

## 8. Requirements

### 8.1. Pemilihan Framework (Playwright)
- Sistem wajib menggunakan **Playwright** dari Microsoft, BUKAN Cypress atau Selenium. Playwright lebih superior dalam menangani WebKit (Safari), interaksi *iFrame* paralel, dan memiliki *auto-wait* untuk elemen React yang tertunda akibat *hydration*.

### 8.2. Critical User Journeys (CUJ)
Tidak perlu menguji seluruh tombol dan warna dengan E2E (itu tugas *Visual Regression* atau *Unit Test*). Fokus E2E hanya pada skenario uang dan akses:
1. Pendaftaran Pengguna Baru hingga OTP.
2. Login dan Otomatis Diarahkan ke Dashboard.
3. Mengetik di Kolom Pencarian dan Mendapat Hasil (Membuktikan API AI bekerja).
4. Pemilihan Tanggal *Booking* dan Konfirmasi Keberhasilan.

### 8.3. Eksekusi CI/CD
- Uji E2E harus berjalan dalam isolasi total. GitHub Actions akan mendirikan kontainer (*spin up*) untuk Next.js dan PostgreSQL dari nol, melempar data benih (*seed*), menjalankan Playwright di *headless mode*, dan merekam video/tangkapan layar jika terjadi kegagalan (*test failed*).

## 9. Implementation
- Gunakan alat bantu Playwright Codegen (`npx playwright codegen`) untuk mempercepat penulisan draf awal skenario tes.

## 10. Acceptance Criteria
- [x] Laporan hasil tes Playwright (*HTML Report*) selalu terlampir sebagai artefak (*Artifact*) di proses GitHub Actions CI.

## 11. Future Improvements
- Menambahkan pengujian *Visual Regression* terpisah (contoh: Percy atau Chromatic) untuk melengkapi cakupan CUJ fungsional.

## 12. References
- Playwright Documentation
- GitHub Actions Documentation

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

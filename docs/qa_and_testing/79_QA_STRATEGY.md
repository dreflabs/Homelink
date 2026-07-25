# 79. QA STRATEGY
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
**Feature Name:** Quality Assurance Global Strategy

## 2. Purpose
Menetapkan standar kualitas yang tidak bisa ditawar (*non-negotiable*) sebelum sebuah kode bisa dirilis ke pengguna, mencegah regresi, dan melindungi citra merek (*brand image*) platform.

## 3. Scope
- The Testing Pyramid.
- Threshold Coverage.
- QA Roles.

## 4. Audience
- **QA Engineers & Software Engineers**

## 5. Dependencies
- `70_CI_CD_SPECIFICATION.md` — pipeline CI/CD menegakkan (*gate*) ambang batas *coverage* yang ditetapkan di dokumen ini sebelum *build* dapat lolos.
- `80_TEST_PLAN.md` — menjabarkan strategi ini ke dalam rencana uji yang konkret per fase rilis.

## 6. Definitions
- **Testing Pyramid** — model piramida yang mengatur proporsi jenis pengujian (Unit, Integration, E2E) berdasarkan kecepatan dan biaya eksekusi.
- **Coverage** — persentase baris/cabang kode yang tereksekusi oleh pengujian otomatis.
- **CI/CD** — *Continuous Integration/Continuous Deployment*, proses otomatis membangun, menguji, dan menerapkan kode.
- **lcov** — format laporan *coverage* standar yang dapat dibaca oleh platform pelaporan seperti Codecov.

## 7. Architecture
Vitest digunakan untuk lapisan Unit & Integration Testing; Playwright digunakan untuk lapisan End-to-End (E2E) Testing.

## 8. Requirements

### 8.1. The Testing Pyramid
HomeLink 2.0 akan mengadopsi standar *Testing Pyramid* industri perangkat lunak:
- **Lapis Bawah (Unit Tests - 70%):** Tes terkecil yang menguji fungsi atau komponen React terisolasi. Sangat cepat. Beban penulisan ada pada *Software Engineers*.
- **Lapis Tengah (Integration Tests - 20%):** Tes yang menguji komunikasi antara komponen (misal: Apakah Service Layer terhubung ke Prisma DB dengan benar?).
- **Lapis Atas (End-to-End/E2E - 10%):** Tes simulasi peramban nyata (klik tombol, isi form). Lambat dan rapuh, digunakan eksklusif untuk jalur kritis (*Booking, Login, Payment*).

### 8.2. Code Coverage Threshold
- **Coverage Minimal:** $80\%$ dari seluruh basis kode bisnis (`src/services/` dan `src/lib/`) harus terlindungi oleh pengujian otomatis.
- CI/CD akan menolak secara keras (Gagal *Build*) jika kode yang di-*push* menurunkan persentase *coverage* agregat di bawah batas $80\%$.

## 9. Implementation
- Framework: Menggunakan **Vitest** (lebih cepat dari Jest) untuk *Unit & Integration*. Menggunakan **Playwright** untuk E2E.

## 10. Acceptance Criteria
- [x] Laporan eksekusi *coverage* terekspor secara otomatis (format `lcov`) dan terunggah ke platform pelaporan (contoh: Codecov).

## 11. Future Improvements
- Menambahkan *mutation testing* (contoh: Stryker) untuk memvalidasi efektivitas nyata dari *test suite*, bukan hanya persentase *coverage* mentah.

## 12. References
- Vitest Documentation
- Playwright Documentation
- Codecov Documentation

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

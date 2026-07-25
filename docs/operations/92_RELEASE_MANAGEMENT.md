# 92. RELEASE MANAGEMENT
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
Software Release Management

## 2. Purpose
Mengontrol bagaimana fitur-fitur baru dikemas, dikomunikasikan, dan diluncurkan ke Produksi. Mencegah perilisan serampangan yang membingungkan pengguna atau merusak fitur lama.

## 3. Scope
- Semantic Versioning (SemVer).
- Changelog.
- Feature Toggles (Dark Launching).

## 4. Audience
- **Project Manager, CTO**

## 5. Dependencies
- `70_CI_CD_SPECIFICATION.md` — pipeline otomatis yang mengeksekusi build, test, dan deployment rilis yang diatur dokumen ini.
- `91_INCIDENT_SOP.md` — dirujuk jika rilis menyebabkan insiden produksi yang memerlukan rollback/hotfix.

## 6. Definitions
- **SemVer:** Semantic Versioning, format penomoran versi `Major.Minor.Patch`.
- **Feature Toggle:** Mekanisme menyembunyikan/menampilkan fitur tanpa deploy ulang, juga dikenal sebagai *Dark Launching*.
- **Changelog:** Catatan rilis publik yang merangkum perubahan fitur.
- **CI:** Continuous Integration, praktik integrasi kode secara berkelanjutan ke `main`.

## 7. Architecture
N/A — dokumen ini bersifat prosedural (proses manajemen rilis), bukan spesifikasi arsitektur teknis.

## 8. Requirements

### 8.1. Semantic Versioning
Rilis platform (dan versi API) menggunakan format `Major.Minor.Patch` (misal `1.2.0`).
- **Patch (`1.2.1`):** Rilis perbaikan Bug kecil. Tidak ada fitur baru.
- **Minor (`1.3.0`):** Menambah tombol baru, filter pencarian baru. Fitur lama tetap berjalan (Backward Compatible).
- **Major (`2.0.0`):** Perombakan UI total, arsitektur *database* dirombak secara merusak (Breaking Changes).

### 8.2. Feature Toggles (Peluncuran Gelap)
Fitur yang kompleks (misal: "Bayar Tanda Jadi pakai Kartu Kredit") **JANGAN** ditahan di server lokal (Local) selama berbulan-bulan menunggu selesai.
- Kode fitur harus tetap didorong ke Produksi (`main`), TAPI disembunyikan menggunakan variabel *Environment* atau layanan seperti LaunchDarkly (Contoh: `if (ENABLE_CREDIT_CARD) { renderButton() }`).
- Ini memungkinkan kode terus terintegrasi dengan mulus (*Continuous Integration*) dan bisa dihidupkan (*toggled on*) sewaktu-waktu.

### 8.3. Changelog (Catatan Rilis)
- Setiap Jumat sebelum jam 5 sore (atau sesuai jadwal *Sprint*), PM merilis ringkasan fitur baru ke publik melalui halaman `/changelog` atau buletin email kepada pelanggan, ditulis dengan bahasa manusia non-teknis.

## 9. Implementation
- Tim dilarang melakukan rilis besar (*Major/Minor*) pada hari Jumat sore (larangan "Deploy on Fridays") untuk menghindari tim harus lembur di akhir pekan jika terjadi kegagalan. Rilis besar dilakukan pada hari Selasa-Kamis siang.

## 10. Acceptance Criteria
- [x] Aturan peluncuran gelap (*Feature Toggles*) diterapkan untuk setiap fitur yang pengerjaannya memakan waktu lebih dari 1 minggu.

## 11. Future Improvements
- Mengintegrasikan generator Changelog otomatis dari histori commit/PR berlabel SemVer untuk mengurangi kerja manual PM dalam menyusun ringkasan mingguan.

## 12. References
- Semantic Versioning (SemVer) specification.

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

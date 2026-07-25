# 66. PRIVACY SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
Data Privacy & Compliance Specs

## 2. Purpose
Memastikan sistem beroperasi selaras dengan hukum pelindungan data privasi yang berlaku (seperti UU PDP di Indonesia atau standar ekivalen GDPR).

## 3. Scope
- Hak Pengguna atas Data (Hak Akses, Hak Hapus).
- Manajemen Persetujuan (Consent Management).

## 4. Audience
- **Product Managers, Legal, dan Engineers**

## 5. Dependencies
- `65_DATA_PROTECTION.md` — mekanisme Hard Delete pada bagian 8.2 dokumen ini melengkapi strategi Soft Deletion yang dijelaskan di sana.
- `67_AUDIT_LOGGING.md` — permintaan hapus akun dan ekspor data harus tercatat sebagai jejak audit sesuai dokumen tersebut.

## 6. Definitions
- **UU PDP:** Undang-Undang Pelindungan Data Pribadi (Indonesia).
- **GDPR (General Data Protection Regulation):** Regulasi privasi data Uni Eropa, sering dijadikan standar ekivalen internasional.
- **Consent Management:** Pengelolaan persetujuan eksplisit pengguna atas penggunaan datanya.
- **Right to be Forgotten (Hak untuk Dilupakan):** Hak pengguna meminta penghapusan permanen data pribadinya.
- **Cooling-off Period:** Masa tunggu sebelum eksekusi penghapusan permanen data, memberi kesempatan pembatalan.

## 7. Architecture
N/A — dokumen ini bersifat spesifikasi kepatuhan hukum dan alur kerja produk, bukan arsitektur teknis sistem.

## 8. Requirements

### 8.1. Consent Management (Persetujuan)
- Tidak boleh ada kotak centang (*checkbox*) "Saya Setuju dengan Syarat & Ketentuan" yang otomatis tercentang secara bawaan (*default*). Pengguna harus mencentangnya secara aktif (Opt-In).
- Persetujuan penggunaan data analitik pihak ketiga (seperti Google Analytics atau Meta Pixel) wajib dimunculkan pada *Cookie Banner* di kunjungan pertama.

### 8.2. Right to be Forgotten (Hak untuk Dilupakan)
- Mengakomodasi UU PDP yang mengharuskan perusahaan menghapus data pribadi jika pengguna memintanya, KECUALI data tersebut sedang terikat sengketa hukum atau transaksi finansial aktif.
- **Mekanisme Eksekusi:** Jika akun bersih dari transaksi (0 transaksi), sistem akan mengeksekusi penghapusan *Hard Delete* pada tabel `User` setelah masa tunggu 30 hari (*Cooling-off period*).

## 9. Implementation
- Disediakan tombol "Unduh Data Pribadi Saya" di pengaturan akun (meng-ekspor profil, riwayat booking ke format JSON/CSV).

## 10. Acceptance Criteria
- [x] Disediakan tombol rekues "Hapus Akun Permanen" dengan peringatan masa tunggu 30 hari.

## 11. Future Improvements
- Fase 4: Menyediakan Pusat Preferensi Privasi (*Privacy Preference Center*) terpadu yang memungkinkan pengguna mengelola seluruh consent pihak ketiga dalam satu dasbor.

## 12. References
- UU PDP (Undang-Undang Pelindungan Data Pribadi)
- GDPR (General Data Protection Regulation)

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

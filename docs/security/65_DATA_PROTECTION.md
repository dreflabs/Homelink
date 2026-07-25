# 65. DATA PROTECTION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
Data Protection Strategy

## 2. Purpose
Mengamankan data dari ancaman peretasan (Enkripsi) dan hilangnya data secara tidak sengaja (Ketersediaan). Menjamin kerahasiaan Data Pribadi KTP/SHM.

## 3. Scope
- At-Rest Data Encryption.
- Soft Deletion Strategy.
- Data Masking.

## 4. Audience
- **Database & Security Engineers**

## 5. Dependencies
- `60_SECURITY_ARCHITECTURE.md` — melanjutkan standar enkripsi *at rest* yang ditetapkan pada arsitektur keamanan (bagian 8.2).
- `66_PRIVACY_SPECIFICATION.md` — strategi *Soft Deletion* di sini beririsan dengan Hak untuk Dilupakan (Right to be Forgotten) yang diatur di dokumen tersebut.

## 6. Definitions
- **PII (Personally Identifiable Information):** Informasi yang dapat mengidentifikasi individu, seperti KTP, nomor rekening.
- **Data Masking:** Teknik penyensoran sebagian data sensitif saat ditampilkan di UI.
- **Soft Deletion:** Strategi penghapusan data logis (flag `isDeleted`) tanpa menghapus baris secara fisik dari database.

## 7. Architecture
Data sensitif disensor di level API (bukan CSS Frontend) sebelum dikirim ke klien. Penghapusan data pengguna dilakukan secara *soft delete* via ORM Middleware/Extensions Prisma yang otomatis menambahkan klausa `where: { isDeleted: false }` pada setiap query publik, menjaga jejak forensik tetap utuh untuk Super Admin.

## 8. Requirements

### 8.1. Data Masking (Penyensoran Data)
- **Tampilan UI:** Nomor KTP dan Nomor Rekening Bank tidak boleh ditampilkan secara utuh di halaman manapun, kecuali halaman *Edit Profil* saat pengguna memasukkan OTP.
- **Format Sensor:** Tampilkan 4 digit terakhir saja. Contoh: `**** **** **** 1234`.
- **Eksekusi:** Penyensoran HARUS dilakukan di level API (*Backend*), BUKAN disembunyikan menggunakan CSS di *Frontend*.

### 8.2. Soft Deletion (Data Retention)
- Data operasional pengguna tidak pernah dihapus secara permanen via `DELETE` SQL (menghindari hilangnya jejak forensik jika terjadi kejahatan penipuan).
- Menggunakan *flag* `isDeleted = true`. Data yang terhapus secara *soft delete* akan disingkirkan dari hasil *query* biasa, namun tetap dapat diakses oleh Super Admin jika aparat penegak hukum memintanya.

## 9. Implementation
- Pustaka ORM (Prisma) harus dikonfigurasi melalui *Middleware/Extensions* agar otomatis menambahkan klausa `where: { isDeleted: false }` di setiap *query* pencarian publik.

## 10. Acceptance Criteria
- [x] Nomor HP dan NIK disensor saat dipanggil melalui *endpoint* standar.
- [x] Tombol "Hapus Akun" hanya mengubah kolom `isDeleted`, bukan menghapus baris.

## 11. Future Improvements
- Fase 3: Mengevaluasi kebijakan retensi otomatis (*data lifecycle policy*) untuk menghapus permanen data yang telah melewati masa retensi hukum, terintegrasi dengan `66_PRIVACY_SPECIFICATION.md`.

## 12. References
- OWASP Top 10 (A02:2021 - Cryptographic Failures)

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

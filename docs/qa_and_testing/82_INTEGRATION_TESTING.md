# 82. INTEGRATION TESTING
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
**Feature Name:** Integration Testing Specification

## 2. Purpose
Menguji bagaimana beberapa *Unit* atau Modul berinteraksi, khususnya antara Lapisan Bisnis (*Service Layer*) dan Lapisan Basis Data (*Prisma ORM*).

## 3. Scope
- Database I/O.
- External API mocking (misal: SMS OTP).

## 4. Audience
- **Backend Engineers**

## 5. Dependencies
- `81_UNIT_TESTING.md` — lapisan pengujian di bawahnya dalam Testing Pyramid; Integration Testing mengasumsikan unit individual sudah tervalidasi.
- Dokumen arsitektur basis data (`database_architecture/`) — mendefinisikan skema Prisma yang divalidasi oleh pengujian ini.

## 6. Definitions
- **Testcontainers** — pustaka untuk menjalankan basis data sementara dalam kontainer Docker khusus pengujian.
- **ORM** — *Object-Relational Mapping*, dalam konteks ini merujuk pada Prisma.
- **Teardown** — proses membersihkan/menghapus data atau skema pengujian setelah tes selesai.
- **Rollback Transaction** — mekanisme membatalkan transaksi database agar data uji tidak persisten.

## 7. Architecture
Vitest sebagai *test runner*, dengan `setup.ts` global yang membuat dan menghapus skema PostgreSQL nyata (via Testcontainers/Docker atau skema unik) khusus untuk pengujian integrasi.

## 8. Requirements

### 8.1. Test Database Isolation
- *Integration Test* **TIDAK BOLEH** merusak basis data lokal yang sedang dipakai untuk bekerja, apalagi basis data *staging*.
- Tes ini harus men-*spawn* (membuat instansiasi) basis data *Test* sementara menggunakan `Testcontainers` (Docker), atau menggunakan skema DB yang ditambahkan imbuhan unik (`homelink_test_123`).

### 8.2. Prisma Mocking vs Real Testing
- Jangan gunakan *Mocking* (tiruan) untuk Prisma secara penuh (seperti pustaka `jest-mock-extended`). Jika kita me-mock ORM, kita tidak pernah benar-benar tahu apakah *Query SQL* kita berjalan atau malah menghasilkan *Deadlock*.
- *Integration Test* **HARUS** mengeksekusi tulis/baca ke *Database PostgreSQL Nyata* (yang terisolasi di atas) lalu menghapusnya kembali (*Rollback Transaction* atau *Teardown*) setelah selesai.

## 9. Implementation
- Tulis *setup file* global di Vitest (`setup.ts`) yang otomatis membuat Schema khusus saat tes dimulai dan menghapus (*drop schema*) saat tes berakhir.

## 10. Acceptance Criteria
- [x] *Test* dapat berjalan serentak secara asinkron tanpa menimpa (*override*) data dari *test suite* yang lain.

## 11. Future Improvements
- Mengintegrasikan Testcontainers penuh ke pipeline CI agar setiap *pull request* mendapatkan instansiasi database yang sepenuhnya terisolasi.

## 12. References
- Testcontainers Documentation
- Prisma ORM Documentation

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

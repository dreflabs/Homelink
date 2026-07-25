# 04. FUNCTIONAL REQUIREMENT SPECIFICATION (FRS)
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Functional Requirement Specification (FRS)

## 2. Purpose
To detail the specific system behaviors, inputs, and outputs for all core features defined in the PRD. This serves as the blueprint for software engineering and API design.

## 3. Scope
Covers functional specifications for Authentication, Property Search, Property Verification, and Survey Booking modules.

## 4. Audience
- **Backend & Frontend Engineers:** For API and component development.
- **QA Engineers:** For writing automated and manual test cases.

## 5. Dependencies
- Dependent on `03_PRODUCT_REQUIREMENT_DOCUMENT_PRD.md`.
- Acts as a prerequisite for API Architecture and Database Schema design.

## 6. Definitions
- **OTP:** One-Time Password.
- **JWT:** JSON Web Token used for session management.

## 7. Architecture
System logic is implemented in Next.js 16 Route Handlers, interacting with PostgreSQL via Prisma ORM.

## 8. Requirements

### 8.1. Authentication & Profile Module (FR-AUTH)
- **FR-AUTH-001:** Sistem HARUS menyediakan pendaftaran via Email/Password (Argon2 encryption) dan OAuth 2.0 (Google & Apple ID).
- **FR-AUTH-002:** Sistem HARUS mengirimkan OTP via WhatsApp/SMS saat pendaftaran pertama kali untuk memvalidasi nomor pengguna.
- **FR-AUTH-003:** Sistem HARUS mengeluarkan sepasang token untuk setiap login yang berhasil: *Access Token* dengan masa berlaku **15 menit** dan *Refresh Token* dengan masa berlaku **7 hari**, sesuai standar keamanan yang ditetapkan di `62_AUTHENTICATION_SECURITY.md`. *(Catatan v1.0.1: Nilai "24 jam" pada revisi sebelumnya bertentangan dengan standar keamanan sesi dan telah dikoreksi agar konsisten.)*

### 8.2. Search & Filter Module (FR-SEARCH)
- **FR-SEARCH-001:** Sistem HARUS menerima input teks tidak terstruktur (NLP) dan menerjemahkannya ke dalam parameter kueri lokasi, harga, dan spesifikasi bangunan.
- **FR-SEARCH-002:** Sistem HARUS menampilkan *Verified Properties* di urutan teratas hasil pencarian secara *default*.
- **FR-SEARCH-003:** Sistem HARUS mendukung pagination (limit 20 *items per page*) berbasis kursor (cursor-based pagination).

### 8.3. Property Verification Module (FR-VERIFY)
- **FR-VERIFY-001:** Sistem HARUS memungkinkan Surveyor mengunggah foto lokasi berkoordinat GPS dan dokumen SHM/HGB dalam format PDF/JPG.
- **FR-VERIFY-002:** Sistem HARUS menerbitkan URL S3 *Presigned* sementara untuk proses pengunggahan file secara langsung dari klien ke Cloudflare R2.
- **FR-VERIFY-003:** Sistem HARUS mengubah status properti dari `PENDING` menjadi `FULLY_VERIFIED` ketika Admin menyetujui laporan Surveyor.

### 8.4. Booking Survey Module (FR-BOOK)
- **FR-BOOK-001:** Sistem HARUS memblokir pengguna *Guest* (belum login) saat mencoba membuat jadwal survei, dan mengarahkan mereka ke halaman Login.
- **FR-BOOK-002:** Sistem HARUS memastikan tidak ada jadwal (*time slot*) yang bertabrakan untuk satu properti yang sama pada hari yang sama.

## 9. Implementation
- Engineers must implement robust validation using Zod for all incoming request bodies.
- Error responses must follow a standardized format.

## 10. Acceptance Criteria
- [x] Functional requirements are testable and unambiguous.
- [x] Edge cases (e.g., overlapping schedules) are explicitly addressed.

## 11. Future Improvements
- Implementasi sistem antrean (*queue*) untuk *booking* properti yang sangat diminati (Hot Listing).

## 12. References
- `03_PRODUCT_REQUIREMENT_DOCUMENT_PRD.md`

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | FR-AUTH-003 dikoreksi agar konsisten dengan `62_AUTHENTICATION_SECURITY.md` (Access/Refresh Token, bukan JWT tunggal 24 jam). |

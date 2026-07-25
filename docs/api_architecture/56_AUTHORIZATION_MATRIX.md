# 56. AUTHORIZATION MATRIX
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Role-Based Authorization Matrix

## 2. Purpose
To explicitly map which User Roles have permission to execute specific actions within the system. This prevents vertical privilege escalation.

## 3. Scope
Covers all system roles against major API endpoints.

## 4. Audience
- **Backend Engineers:** For implementing Middleware or Service Layer access guards.
- **QA Engineers:** For drafting security test cases.

## 5. Dependencies
- Extends the roles defined in `03_PRODUCT_REQUIREMENT_DOCUMENT_PRD.md`.

## 6. Definitions
- **Authentication:** Who you are.
- **Authorization:** What you are allowed to do.

## 7. Architecture
N/A

## 8. Requirements

### 8.1. The Access Matrix
Legend: 
- `YES`: Diizinkan (Berdasarkan kepemilikan/aturan RLS).
- `NO`: Akses ditolak secara eksplisit (HTTP 403 Forbidden).

| Tindakan / Endpoint | Guest | Buyer | Owner | Surveyor | Photographer | Admin |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `POST /api/v1/auth/register` | **YES** | - | - | - | - | - |
| `POST /api/v1/auth/login` | **YES** | - | - | - | - | - |
| `POST /api/v1/auth/logout` | NO | **YES** | **YES** | **YES** | **YES** | **YES** |
| `GET /api/v1/properties` (Lihat Daftar) | YES | YES | YES | YES | YES | YES |
| `GET /api/v1/properties/:id` (Detail) | YES | YES | YES | YES | YES | YES |
| `POST /api/v1/properties` (Buat Listing) | NO | NO | **YES** | NO | NO | NO |
| `PATCH /api/v1/properties/:id` (Edit) | NO | NO | **YES** (miliknya) | NO | NO | NO |
| `PATCH /api/v1/properties/:id/status` | NO | NO | NO | NO | NO | **YES** |
| `GET /api/v1/bookings` (Lihat jadwal) | NO | **YES** (miliknya) | **YES** (propertinya) | NO | NO | **YES** |
| `POST /api/v1/bookings` (Jadwalkan) | NO | **YES** | NO | NO | NO | NO |
| `PATCH /api/v1/bookings/:id/status` (Batal/Selesai) | NO | **YES** (miliknya) | **YES** (propertinya) | NO | NO | NO |
| `POST /api/v1/media/presigned-url` | NO | **YES** | **YES** | **YES** | **YES** | **YES** |
| `GET /api/v1/survey/assignments` | NO | NO | NO | **YES** | NO | NO |
| `POST /api/v1/survey/:id/report` (a.k.a. `media/upload-report`) | NO | NO | NO | **YES** | NO | NO |
| `GET /api/v1/photography/assignments` | NO | NO | NO | NO | **YES** | NO |
| `POST /api/v1/photography/:id/deliver` | NO | NO | NO | NO | **YES** | NO |

*(Catatan v1.0.1: (a) Seluruh path pada tabel ini distandarkan memakai prefix `/api/v1/` agar konsisten dengan `59_VERSIONING_STRATEGY.md` dan `51_API_CONTRACT.md` — versi sebelumnya keliru menulis beberapa path tanpa prefix versi (`/api/properties`), yang bertentangan dengan strategi URI Path Versioning yang sudah disepakati. Dokumen lain yang masih menulis path tanpa `/v1/` (mis. contoh kode di `63_AUTHORIZATION_SECURITY.md`, `61_THREAT_MODEL.md`) harus dianggap sebagai contoh ilustratif, bukan path literal, sampai diperbarui. (b) Baris Auth, Booking status-update, dan Media presigned-url ditambahkan karena endpoint-endpoint ini sudah aktif di `52_ENDPOINT_CATALOGUE.md` §8.1-8.5 namun sebelumnya tidak punya baris otorisasi eksplisit di matrix ini. (c) Role **Photographer** sebelumnya memiliki endpoint aktif di `52_ENDPOINT_CATALOGUE.md` §8.6 tanpa baris otorisasi eksplisit — celah *default-deny yang tidak terverifikasi* ini sekarang ditutup. Role Fase 2+ lain — Partner Agent, Internal HomeLink Agent, CMS Editor, Super Admin — akan mendapat matrix aksesnya sendiri saat modul terkait memasuki fase aktif; lihat `03_PRODUCT_REQUIREMENT_DOCUMENT_PRD.md` §8.1 dan `13_PRODUCT_ROADMAP.md` §8.3. Sampai saat itu, seluruh endpoint di bawah namespace modul mereka [cth. `/api/v1/cms/*`, `/api/v1/agents/*`, `/api/v1/admin/tenants/*`] harus dianggap **default-deny total** terhadap semua role yang ada di tabel ini.)*

### 8.2. Defense in Depth
Pengecekan otorisasi **TIDAK BOLEH** hanya dilakukan di UI (menyembunyikan tombol). Pengecekan absolut HARUS terjadi di Server (Middleware atau *Service Layer*) dengan membaca nilai `role` dari JWT.

## 9. Implementation
- Implement a reusable middleware utility `requireRole(['OWNER', 'ADMIN'])` that automatically blocks requests not matching the required roles before they even reach the controller logic.

## 10. Acceptance Criteria
- [x] Clear YES/NO mapping for every major action.
- [x] Mandatory server-side enforcement rule.

## 11. Future Improvements
- N/A

## 12. References
- *OWASP Access Control Guidelines*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Menambahkan kolom & baris Photographer (endpoint sudah eksis di 52 tapi tidak ada otorisasi eksplisit); menambahkan catatan default-deny untuk role Fase 2+ lain. |

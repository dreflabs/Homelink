# 31. MODULE BREAKDOWN
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 System Module Breakdown

## 2. Purpose
To partition the massive software system into manageable, isolated domains. This allows different engineering squads to work in parallel without stepping on each other's toes (Separation of Concerns).

## 3. Scope
Covers logical domains within the HomeLink 2.0 monorepo.

## 4. Audience
- **Engineering Managers / PMs:** For creating Jira Epics and organizing teams.
- **Architects:** For ensuring code decoupling.

## 5. Dependencies
- Enforces boundaries for the APIs in `36_API_ARCHITECTURE.md`.

## 6. Definitions
- **Module (Domain):** A cohesive grouping of logic, data, and UI that solves one specific business problem.

## 7. Architecture
Domain-Driven Design (DDD) Light approach within a Next.js Monolithic structure.

## 8. Requirements

### 8.1. Module 1: Identity & Access Management (IAM)
- **Tanggung Jawab:** Registrasi, Login (Email/Password, OAuth), Verifikasi OTP, Manajemen Sesi (JWT/Cookies), dan Role-Based Access Control (RBAC).
- **Entitas Database Utama:** `User`, `Account`.
- **Rute Frontend:** `/login`, `/register`, `/verify`.
- **Catatan Konsistensi (v1.0.1):** Sesuai keputusan resmi di `55_AUTHENTICATION_FLOW.md`, HomeLink 2.0 menggunakan strategi **Stateless JWT** (tanpa tabel `Session` di database). Tabel `Account` tetap dipertahankan karena diperlukan oleh Auth.js untuk menyimpan tautan (*linking*) akun OAuth (Google/Apple ID) ke satu `User`, terlepas dari strategi sesi yang stateless. Entitas `Session` yang sebelumnya tercantum di sini telah dihapus untuk menghilangkan kontradiksi dengan `55_AUTHENTICATION_FLOW.md`.

### 8.2. Module 2: Property Inventory Engine
- **Tanggung Jawab:** Pembuatan *listing* oleh *Owner*, penyimpanan metadata properti, manajemen harga, dan visibilitas tayang.
- **Entitas Database Utama:** `Property`, `PropertyMedia`, `Facility`.
- **Rute Frontend:** `/dashboard/owner/new`, `/p/[slug]`.

### 8.3. Module 3: Discovery & Search
- **Tanggung Jawab:** AI Semantic Search, filter kompleks, paginasi hasil, dan integrasi peta spasial.
- **Entitas Database Utama:** (Read-Only) `Property`.
- **Rute Frontend:** `/search`, `/`.

### 8.4. Module 4: Verification & Trust Hub
- **Tanggung Jawab:** Portal khusus bagi Surveyor untuk mengunggah laporan inspeksi fisik dan legal, serta persetujuan *Admin* untuk menerbitkan *Verified Badge*.
- **Entitas Database Utama:** `VerificationAudit`, `SurveyReport`.
- **Rute Frontend:** `/admin/verify`, `/surveyor/tasks`.

### 8.5. Module 5: Transaction & Booking
- **Tanggung Jawab:** Manajemen kalender, *time-slots*, pencegahan jadwal bentrok, dan pengiriman notifikasi integrasi (WhatsApp).
- **Entitas Database Utama:** `Booking`, `NotificationLog`.
- **Rute Frontend:** Bagian Kalender pada `/p/[slug]`, `/dashboard/bookings`.

## 9. Implementation
- Engineers must avoid deeply coupling logic between modules. For example, the `Search` module should not directly write to the `Booking` database tables.

## 10. Acceptance Criteria
- [x] All business requirements are covered by exactly one distinct module.
- [x] Database entities are logically mapped to their owning modules.

## 11. Future Improvements
- Introduce "Module 6: Escrow & Payments" in Phase 4.

## 12. References
- N/A

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Resolusi kontradiksi entitas Sesi (lihat `55_AUTHENTICATION_FLOW.md`); `Session` dihapus dari daftar entitas IAM. |

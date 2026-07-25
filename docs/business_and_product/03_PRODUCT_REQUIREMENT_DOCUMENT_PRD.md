# 03. PRODUCT REQUIREMENT DOCUMENT (PRD)
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Product Requirement Document (PRD)

## 2. Purpose
To define the specific product features, functionalities, and user experiences required to fulfill the business objectives outlined in the BRD. This document translates business goals into actionable product deliverables.

## 3. Scope
This document covers:
- Core product features (Phase 1).
- User roles and access levels.
- Functional feature breakdowns.

## 4. Audience
- **Product Managers & Designers:** For drafting wireframes and UI/UX flows.
- **Engineering Teams:** For technical implementation and sprint planning.
- **QA Teams:** For developing test cases and test plans.

## 5. Dependencies
- Dependent on `02_BUSINESS_REQUIREMENT_DOCUMENT_BRD.md`.
- Acts as a prerequisite for `04_FUNCTIONAL_REQUIREMENT_SPECIFICATION_FRS.md`.

## 6. Definitions
- **RAG:** Retrieval-Augmented Generation (AI).
- **Badge:** Visual indicator of verification status (e.g., Physical Verified, Legal Verified).

## 7. Architecture
High-level product interaction relies on a Next.js 16 frontend communicating with Next.js Route Handlers and a PostgreSQL database.

## 8. Requirements
### 8.1. User Roles

**Roles Fase 1 (MVP — aktif sejak peluncuran):**
1. **Guest:** Dapat melakukan pencarian, melihat daftar properti, namun tidak dapat *booking survey*.
2. **Buyer (Registered):** Dapat menjadwalkan survei, menyimpan properti favorit, dan melihat laporan legalitas.
3. **Owner:** Dapat mendaftarkan properti, melacak status verifikasi, dan mengelola jadwal kunjungan.
4. **Surveyor:** Memiliki akses ke portal khusus untuk mengunggah hasil inspeksi fisik dan dokumen sertifikat.
5. **Admin:** Memiliki akses penuh untuk moderasi *listing*, *user management*, dan penyelesaian sengketa.

**Roles Fase 2+ (didefinisikan di sini untuk menghilangkan celah dokumentasi; belum aktif di Fase 1):**
6. **Photographer:** Role operasional yang bertugas mengambil dan mengunggah foto/video profesional properti setelah verifikasi fisik oleh Surveyor. *(Catatan v1.0.1: Endpoint `/api/v1/photography` sudah didefinisikan di `52_ENDPOINT_CATALOGUE.md` sejak awal namun role ini sebelumnya tidak pernah didaftarkan di PRD/Authorization Matrix — celah ini sekarang ditutup. Aktivasi penuh menyusul di roadmap Fase 2, lihat `13_PRODUCT_ROADMAP.md`.)*
7. **Partner Agent (B2B):** Agen properti eksternal yang mengelola *lead*, klien, dan komisi melalui portal SaaS terpisah. Diaktifkan bersamaan dengan monetisasi Tier 3 (SaaS for Agents) di `02_BUSINESS_REQUIREMENT_DOCUMENT_BRD.md`.
8. **Internal HomeLink Agent:** Staf internal yang menangani lead management, verifikasi pemilik, dan customer support tingkat lanjut, terpisah dari role Admin moderasi.
9. **CMS Editor:** Staf Marketing/SEO dengan akses terbatas ke modul CMS (Blog, FAQ, Homepage content) sesuai `89_CMS_MANUAL.md`, tanpa akses ke data transaksional pengguna.
10. **Super Admin:** Role tertinggi dengan akses ke Tenant Management, Feature Flags, Roles/Permissions, dan System Health — terpisah dari Admin operasional untuk membatasi *blast radius* jika kredensial Admin biasa disusupi.

Kelima role Fase 2+ di atas sudah memiliki spesifikasi halaman (folder `pages/07_partner_agent_dashboard`, `08_internal_homelink_agent`, `10_photographer`, `12_super_admin`, `13_cms`) namun **belum memiliki baris di Authorization Matrix (`56_AUTHORIZATION_MATRIX.md`) sebelum revisi v1.0.1 dokumen tersebut**. Lihat juga peta fase modul di `13_PRODUCT_ROADMAP.md` §8.3.

### 8.2. Core Features (Phase 1)
**Feature 1: AI Semantic Search Module**
- Input pencarian berbasis bahasa alami (Natural Language).
- Filter terstruktur sekunder (Lokasi, Harga, Kamar, Luas).
- Hasil pencarian harus mengutamakan *Verified Properties*.

**Feature 2: Verified Property Badge System**
- *Physical Verified Badge:* Menandakan foto dan kondisi bangunan sesuai dengan kenyataan.
- *Legal Verified Badge (SHM/HGB):* Menandakan sertifikat bebas sengketa dan valid.

**Feature 3: Interactive Survey Booking**
- Kalender interaktif di halaman detail properti.
- Notifikasi real-time via WhatsApp/Email saat survei dikonfirmasi.

**Feature 4: Owner & User Dashboard**
- **User:** Lacak status penawaran dan jadwal kunjungan.
- **Owner:** *Track* proses verifikasi oleh surveyor, kelola *listing*, dan lihat metrik penayangan (*views*).

## 9. Implementation
- The product development will follow agile methodologies (2-week sprints).
- The Design team will create high-fidelity mockups for all features prior to engineering handoff.

## 10. Acceptance Criteria
- [x] All user roles and their capabilities are distinctly defined.
- [x] Core features directly map to solving the "Ghost Listing" and "Poor UX" problems.
- [x] Scope is clearly restricted to Phase 1 deliverables to prevent scope creep.

## 11. Future Improvements
- In Phase 2, integration with Banking APIs for instant KPR (Mortgage) pre-approval simulation.

## 12. References
- `02_BUSINESS_REQUIREMENT_DOCUMENT_BRD.md`

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Menambahkan 5 role Fase 2+ (Photographer, Partner Agent, Internal HomeLink Agent, CMS Editor, Super Admin) yang sudah memiliki endpoint/halaman namun belum terdaftar di PRD. |

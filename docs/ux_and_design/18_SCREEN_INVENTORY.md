# 18. SCREEN INVENTORY
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Complete Screen Inventory

## 2. Purpose
To catalogue every unique screen or distinct modal state within the application. This ensures that designers and developers account for every possible view, including error states and edge cases.

## 3. Scope
Covers Phase 1 core screens across Web Desktop and Mobile views.

## 4. Audience
- **Product Managers:** For feature tracking.
- **Frontend Engineers:** For defining route structures and page components.

## 5. Dependencies
- Dependent on `03_PRODUCT_REQUIREMENT_DOCUMENT_PRD.md`.

## 6. Definitions
- **Screen ID:** A unique alphanumeric identifier for each screen (e.g., SCR-001).

## 7. Architecture
Maps directly to Next.js App Router file structure (`page.tsx` within specific folders).

## 8. Requirements

### 8.1. Public / Guest Screens
| Screen ID | Screen Name | Description | Next.js Route |
| :--- | :--- | :--- | :--- |
| **SCR-001** | Homepage | Landing page dengan AI Search Bar & Verified Listings grid. | `/` |
| **SCR-002** | Search Results | Daftar properti dengan filter lanjutan dan peta interaktif. | `/search` |
| **SCR-003** | Property Detail | Galeri foto, deskripsi, status verifikasi, dan form booking. | `/p/[slug]` |
| **SCR-004** | Auth Modal | *Intercepting route* untuk Login / Registrasi via OTP. | `@authModal` |
| **SCR-005** | Not Found (404) | Halaman *error* khusus bergaya Apple untuk *route* tidak valid. | `not-found.tsx` |

### 8.2. Registered Buyer Screens
| Screen ID | Screen Name | Description | Next.js Route |
| :--- | :--- | :--- | :--- |
| **SCR-101** | Buyer Dashboard | Ringkasan akun pembeli. | `/dashboard` |
| **SCR-102** | My Bookings | Daftar jadwal survei yang tertunda, disetujui, atau selesai. | `/dashboard/bookings` |
| **SCR-103** | Saved Properties | Daftar *wishlist* properti yang disimpan. | `/dashboard/saved` |

### 8.3. Owner / Seller Screens
| Screen ID | Screen Name | Description | Next.js Route |
| :--- | :--- | :--- | :--- |
| **SCR-201** | Add Listing Form | Formulir multi-langkah (Stepped Form) untuk mendaftarkan properti. | `/dashboard/owner/new` |
| **SCR-202** | My Listings | Manajemen properti yang dimiliki dan status verifikasinya. | `/dashboard/owner/listings` |
| **SCR-203** | Listing Analytics | Statistik tampilan (*views*) dan permohonan kunjungan per properti. | `/dashboard/owner/analytics` |

## 9. Implementation
- Frontend engineers must use Next.js 16 parallel and intercepting routes for SCR-004 to preserve the context of SCR-001/003.

## 10. Acceptance Criteria
- [x] Every screen has a unique Screen ID and defined Next.js route path.
- [x] Coverage includes all user roles (Guest, Buyer, Owner).

## 11. Future Improvements
- *(Catatan v1.0.1: Folder `docs/pages/` sudah memiliki 18 modul kerangka halaman, termasuk Surveyor dan Admin — namun isinya masih berupa template placeholder generik yang belum menggantikan tabel Screen ID formal di dokumen ini. Lihat `13_PRODUCT_ROADMAP.md` §8.3 untuk pemetaan fase resmi per modul sebelum tabel Screen ID di atas diperluas.)*
- Expand this Screen ID inventory to formally include Surveyor (`09_surveyor`), Admin (`11_admin`), Company (`17_company`), dan Legal (`18_legal`) — kelima modul ini berstatus **Fase 1** menurut `13_PRODUCT_ROADMAP.md` §8.3 dan harus mendapat Screen ID resmi sebelum konten `pages/`-nya ditulis.
- Modul Fase 2+ (Partner Agent, Internal Agent, Photographer, CMS, Super Admin, Billing, AI lanjutan) ditambahkan ke inventory ini saat fasenya aktif, bukan sekarang, untuk mencegah *scope creep* dokumentasi.

## 12. References
- *Next.js 16 App Router Documentation*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Catatan "Future Improvements" dikoreksi agar sinkron dengan status aktual folder `pages/` dan pemetaan fase di `13_PRODUCT_ROADMAP.md` §8.3. |

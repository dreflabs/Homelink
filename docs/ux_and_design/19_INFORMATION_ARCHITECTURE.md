# 19. INFORMATION ARCHITECTURE
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Information Architecture (IA)

## 2. Purpose
To define how information is organized, structured, and labeled within the platform. A solid IA ensures users can find what they are looking for effortlessly (Findability) and understand where they are (Discoverability).

## 3. Scope
Covers data hierarchy, taxonomies (categories, tags), and the logical grouping of content.

## 4. Audience
- **UX Designers:** To structure the layout of data on screens.
- **Database Engineers:** To ensure the data model supports the required hierarchy.

## 5. Dependencies
- Closely tied to `18_SCREEN_INVENTORY.md`.

## 6. Definitions
- **Taxonomy:** The classification scheme used to organize content (e.g., Property Types).
- **Findability:** How easily a user can locate a specific piece of information.

## 7. Architecture
N/A

## 8. Requirements

### 8.1. Data Hierarchy: Property Listing
Hierarki informasi pada sebuah *Listing Properti* diurutkan berdasarkan tingkat kepentingan bagi pengguna:
1. **Primary Information (Above the fold):**
   - High-Res Image Gallery (Gambar utama).
   - Price (Harga).
   - Verification Badge (Status keamanan).
   - Core Specs (Jumlah Kamar Tidur, Kamar Mandi, Luas Bangunan/Tanah).
2. **Secondary Information:**
   - Detailed Address & Map Location.
   - Property Description (Deskripsi AI-generated atau manual).
3. **Tertiary Information:**
   - Legal Document Audit Summary (Ringkasan sertifikat).
   - Facility Details (Kolam renang, keamanan 24 jam).
   - Owner/Agent Contact Button.

### 8.2. Taxonomy & Categorization
- **Tipe Properti (Property Types):** Rumah, Apartemen, Ruko, Tanah, Vila.
- **Tipe Transaksi (Transaction Types):** Dijual, Disewa (Tahunan/Bulanan).
- **Status Verifikasi (Verification States):** Selaras dengan enum kanonik `Property.status` di `40_ERD.md`: `PENDING` (TIDAK TAYANG), `REJECTED` (TIDAK TAYANG), `PHYSICAL_VERIFIED`, `LEGAL_VERIFIED`, `FULLY_VERIFIED`. *(Catatan v1.0.1: sebelumnya daftar ini memakai istilah "Unverified" dan tidak menyertakan `REJECTED`, sehingga tidak sinkron dengan ERD — telah dikoreksi.)*

## 9. Implementation
- Database fields must map 1:1 with the Taxonomy defined here (e.g., Enum in Prisma for PropertyType).
- UI layouts must strictly respect the Data Hierarchy (Primary information must be rendered first, without requiring a scroll).

## 10. Acceptance Criteria
- [x] Data hierarchy logic is explicitly defined.
- [x] Taxonomies are exhaustively listed for standard filtering.

## 11. Future Improvements
- Refine taxonomy to include granular commercial property types (Warehouse, Office Space) in Phase 4.

## 12. References
- *Information Architecture for the World Wide Web (Rosenfeld & Morville)*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Taksonomi status verifikasi disamakan dengan enum kanonik di `40_ERD.md`. |

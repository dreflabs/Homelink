# 06. STAKEHOLDER REQUIREMENT SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Stakeholder Requirement Specification

## 2. Purpose
To systematically identify all individuals, groups, or organizations affected by HomeLink 2.0 and to document their specific needs, expectations, and constraints to ensure the platform delivers value to all participants.

## 3. Scope
Covers internal and external stakeholders including Buyers, Owners, Surveyors, Agents, and Management/Investors.

## 4. Audience
- **Product Managers & CPO:** To balance feature priorities based on stakeholder needs.
- **Customer Success Teams:** To understand the pain points of different user groups.

## 5. Dependencies
- Directly supports the formulation of the `02_BUSINESS_REQUIREMENT_DOCUMENT_BRD.md`.

## 6. Definitions
- **Stakeholder:** A party that has an interest in a company and can either affect or be affected by the business.
- **Secondary Market:** The market for pre-owned (existing) properties.

## 7. Architecture
N/A

## 8. Requirements

### 8.1. Stakeholder 1: Pembeli Properti (Buyer)
- **Kebutuhan Utama:** Menemukan properti yang 100% legal dan kondisinya sesuai dengan foto tanpa risiko penipuan.
- **Pain Points Saat Ini:** Sering tertipu *ghost listing* (rumah sudah laku namun iklan masih tayang) dan deskripsi harga yang dimanipulasi.
- **Ekspektasi Sistem:** Antarmuka pencarian yang bersih (tanpa iklan), foto beresolusi tinggi, informasi lokasi yang akurat, dan kemampuan menjadwalkan kunjungan secara instan tanpa melalui perantara yang lambat.

### 8.2. Stakeholder 2: Pemilik Properti (Owner)
- **Kebutuhan Utama:** Memasarkan properti mereka secara cepat dengan reputasi tinggi agar mendapatkan harga jual/sewa terbaik.
- **Pain Points Saat Ini:** Banyak agen tidak resmi mencuri foto rumah mereka dan memasang harga asal-asalan, merusak harga pasar.
- **Ekspektasi Sistem:** Alur pendaftaran properti (listing) yang mudah, proses verifikasi yang transparan, lencana kredibilitas eksklusif, dan dasbor analitik untuk memantau seberapa banyak properti mereka dilihat.

### 8.3. Stakeholder 3: Surveyor Resmi HomeLink
- **Kebutuhan Utama:** Melakukan audit fisik bangunan dan dokumen sertifikat (SHM/HGB) secara efisien di lapangan.
- **Pain Points Saat Ini:** Pelaporan inspeksi berbasis kertas dan WhatsApp yang tidak terstruktur.
- **Ekspektasi Sistem:** Aplikasi web (*mobile-responsive*) yang memungkinkan mereka untuk mengambil foto berbasis GPS, mengisi *checklist* struktur bangunan, dan mengunggahnya langsung ke sistem dari *smartphone*.

### 8.4. Stakeholder 4: Agen Properti (B2B Partner)
- **Kebutuhan Utama:** Mendapatkan *lead* (calon pembeli) yang memiliki niat beli tinggi (*high intent*).
- **Pain Points Saat Ini:** Menghabiskan waktu melayani calon pembeli yang hanya "tanya-tanya" atau tidak lolos BI Checking/KPR.
- **Ekspektasi Sistem:** Sistem manajemen *lead* terintegrasi dan alat bantu estimasi harga pasar berbasis AI untuk meyakinkan klien mereka.

### 8.5. Stakeholder 5: Manajemen & Investor HomeLink
- **Kebutuhan Utama:** Pertumbuhan bisnis yang terukur, profitabilitas, dan dominasi pangsa pasar (*market share*).
- **Pain Points Saat Ini:** Sulit memantau konversi secara *real-time*.
- **Ekspektasi Sistem:** *Metrics dashboard* internal (Admin Panel) untuk melacak *Lifetime Value* (LTV), *Customer Acquisition Cost* (CAC), dan *Conversion Rate* harian.

## 9. Implementation
- Feature prioritization (Roadmap) must be weighted against the impact it has on the primary stakeholders (Buyer and Owner).

## 10. Acceptance Criteria
- [x] At least 5 distinct stakeholder groups are identified.
- [x] Pain points and system expectations are clearly contrasted.

## 11. Future Improvements
- Include "Financial Institutions (Banks)" as a primary stakeholder in Phase 2 for KPR integrations.

## 12. References
- *HomeLink Market Research Q1 2026*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

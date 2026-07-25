# 02. BUSINESS REQUIREMENT DOCUMENT (BRD)
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Business Requirement Document (BRD)

## 2. Purpose
The purpose of this document is to outline the business logic, market problems, value propositions, and monetization strategies that justify the investment and development of HomeLink 2.0.

## 3. Scope
This document covers:
- Market problem analysis.
- Proposed business solution.
- Monetization and revenue streams.
- Market positioning.

## 4. Audience
- **CEO & C-Level:** For business strategy validation.
- **Product Managers:** To translate business goals into product features.
- **Investors:** To understand the financial and market viability.

## 5. Dependencies
- Must align with `01_VISION_AND_MISSION.md`.
- Acts as a prerequisite for `03_PRODUCT_REQUIREMENT_DOCUMENT_PRD.md`.

## 6. Definitions
- **CAC:** Customer Acquisition Cost.
- **LTV:** Lifetime Value.
- **Verification Fee:** A service fee charged for physical and legal property inspection.

## 7. Architecture
N/A (Business Level)

## 8. Requirements
### 8.1. Market Problem Analysis
Industri properti digital Indonesia saat ini didominasi oleh platform pencarian tradisional yang menghadapi 3 masalah sistemik:
1. **Low Trust & Data Integrity:** Berdasarkan riset internal, $>40\%$ listing di pasar merupakan *ghost listing* (harga manipulatif, properti fiktif, atau lokasi palsu untuk clickbait).
2. **Poor User Experience (UX):** Portal yang ada dipenuhi iklan spanduk, pop-up intrusif, kecepatan muat yang buruk ($>4$ detik), dan *interface* yang berantakan.
3. **Fragmented Transaction Process:** Penjadwalan survei, negosiasi, dan verifikasi sertifikat dilakukan secara manual di luar platform.

### 8.2. Proposed Business Solution
HomeLink 2.0 menghadirkan model bisnis **"Verified Trust Platform"**:
- **Strict Verification Layer:** Hanya properti dengan status terverifikasi (fisik & hukum) yang diprioritaskan.
- **Seamless Digital Journey:** Integrasi pencarian AI, jadwal survei real-time, dan transparansi legalitas dalam satu platform.

### 8.3. Monetization Strategy
- **Tier 1: Verification Service Fee.** Biaya langsung kepada Pemilik/Developer untuk layanan inspeksi fisik dan legalitas oleh Surveyor resmi HomeLink.
- **Tier 2: Premium Listing & Visibility.** Biaya promosi (highlight) untuk properti yang telah lulus verifikasi.
- **Tier 3: SaaS for Agents (B2B).** Biaya langganan bulanan bagi Agen Properti untuk mengakses analitik pasar, lead generation berkualitas, dan alat CRM internal.

## 9. Implementation
- The business team will execute Go-To-Market (GTM) strategies targeting the Jabodetabek area for Phase 1.
- Partnerships with independent surveyor agencies must be secured before platform launch.

## 10. Acceptance Criteria
- [x] Market problems are clearly defined with measurable impact.
- [x] Revenue streams are explicitly identified.
- [x] Business solution directly addresses the market problems.

## 11. Future Improvements
- Expansion of monetization to include Mortgage Lead Generation (KPR referral fees) in Phase 3.

## 12. References
- *Competitor Analysis Report Q2 2026*
- `01_VISION_AND_MISSION.md`

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

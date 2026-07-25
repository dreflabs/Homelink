# 30. SOFTWARE ARCHITECTURE DECISION RECORD (ADR)
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Master Architecture Decision Record (ADR)

## 2. Purpose
To document the *why* behind critical technology choices. This prevents future teams from endlessly debating past decisions and provides context on trade-offs.

## 3. Scope
Covers the foundational stack choices: Next.js vs SPA, Prisma vs Drizzle, VPS vs Vercel.

## 4. Audience
- **CTO, Tech Leads, & Engineers:** For historical context and onboarding.

## 5. Dependencies
- This document justifies the structure of `27_SYSTEM_ARCHITECTURE.md`.

## 6. Definitions
- **ADR:** Architecture Decision Record. A structured format for documenting technical choices.

## 7. Architecture
N/A

## 8. Requirements

### ADR 001: Penggunaan Next.js 16 App Router
**Status:** DITERIMA (APPROVED)
**Konteks:** Platform properti membutuhkan SEO (Search Engine Optimization) tingkat tinggi agar *listing* rumah dapat diindeks oleh Google. *Single Page Applications* (React polos/Vite) memiliki kelemahan besar dalam hal SEO statis.
**Keputusan:** Kami menggunakan Next.js 16 dengan paradigma App Router (RSC - React Server Components).
**Konsekuensi:** 
- (+) Performa pemuatan awal sangat cepat (SSG/SSR).
- (+) *Indexability* sempurna oleh bot Google.
- (-) Kurva pembelajaran lebih curam bagi tim frontend yang terbiasa dengan SPA tradisional.

### ADR 002: Hostinger VPS over Vercel/PaaS
**Status:** DITERIMA (APPROVED)
**Konteks:** Biaya operasional (Opex) harus ditekan seminimal mungkin pada fase awal startup. Vercel sangat mahal untuk *database bandwidth* dan *image optimization* pada skala menengah.
**Keputusan:** Kami mendeploy aplikasi Next.js (Node server) langsung di atas VPS Hostinger menggunakan Linux (Ubuntu), Nginx, dan PM2.
**Konsekuensi:**
- (+) Biaya sangat rendah dan terprediksi (*flat-rate* VPS).
- (+) Kontrol penuh terhadap infrastruktur dan keamanan *database*.
- (-) Membutuhkan usaha DevOps ekstra untuk CI/CD, setup SSL, dan pemeliharaan *server*.

### ADR 003: Prisma ORM vs Drizzle
**Status:** DITERIMA (APPROVED)
**Konteks:** Aplikasi membutuhkan interaksi database relasional yang kompleks dan terstruktur.
**Keputusan:** Prisma ORM dipilih sebagai *database client* utama karena *developer experience* (DX) yang superior dan ekosistem tipe (TypeScript) yang otomatis.
**Konsekuensi:**
- (+) Kecepatan pengembangan (*development speed*) sangat tinggi.
- (-) *Overhead* tipis pada *query* yang sangat kompleks dibandingkan *raw SQL*.

## 9. Implementation
- Any team proposing a major tech stack change in the future must submit a new ADR block to this document for CTO approval.

## 10. Acceptance Criteria
- [x] Decisions are stated clearly with context, decision, and consequences.

## 11. Future Improvements
- N/A

## 12. References
- *Michael Nygard's ADR format*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

# 46. PARTITION STRATEGY
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Database Partitioning Strategy

## 2. Purpose
To handle tables that generate massive amounts of historical data (logs, audits) by breaking them down into smaller, physically separate tables to maintain read/write performance.

## 3. Scope
Covers Time-Series data and PostgreSQL Declarative Partitioning.

## 4. Audience
- **Database Administrators / CTO:** For future-proofing the database.

## 5. Dependencies
- Extends `37_DATABASE_ARCHITECTURE.md`.

## 6. Definitions
- **Partitioning:** Splitting what is logically one large table into smaller physical pieces.
- **Time-Series Data:** Data that naturally appends over time and is rarely modified (e.g., access logs).

## 7. Architecture
N/A

## 8. Requirements

### 8.1. Phase 1 Avoidance (YAGNI)
**Prinsip YAGNI (You Aren't Gonna Need It):** Pada Fase 1 (1-2 tahun pertama beroperasi), platform diprediksi tidak akan menghasilkan lebih dari 10 juta baris data untuk tabel operasional inti. Partisi PostgreSQL menambah kompleksitas infrastruktur (terutama via Prisma). Oleh karena itu, partisi **TIDAK DITERAPKAN** pada Fase 1.

### 8.2. Phase 3 & 4 Partitioning Blueprint
Ketika tabel log transaksi atau audit keamanan menembus 50 juta baris, strategi partisi berbasis rentang waktu (*Range Partitioning*) akan diaktifkan.

**Tabel Target:** `AnalyticsViewLog` (mencatat setiap klik pada properti).
**Metode:** `PARTITION BY RANGE (createdAt)`.
- `AnalyticsViewLog_2026_Q1` (Jan - Mar)
- `AnalyticsViewLog_2026_Q2` (Apr - Jun)

**Archival Rule:** Partisi yang lebih tua dari 2 tahun (8 kuartal) akan di-*dump* ke file CSV dingin (*Cold Storage* di Cloudflare R2) dan di-*drop* dari PostgreSQL aktif untuk menghemat ruang disk SSD VPS.

## 9. Implementation
- No action required for Phase 1. This document serves as a placeholder strategy for architectural planning.

## 10. Acceptance Criteria
- [x] Acknowledges the overhead of partitioning and deliberately postpones it (Pragmatic Architecture).
- [x] Provides a clear threshold (50M rows) for when to activate the strategy.

## 11. Future Improvements
- N/A

## 12. References
- *PostgreSQL Declarative Partitioning*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

# 51. API CONTRACT
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Global API Contract

## 2. Purpose
To establish the unbreakable promises made by the API to its consumers (Web Frontend, Mobile App). An API contract ensures that frontend engineers can build UIs concurrently without waiting for backend implementation.

## 3. Scope
Covers base URLs, request constraints, date formats, and SLA promises.

## 4. Audience
- **Frontend & Backend Engineers:** For strict alignment.

## 5. Dependencies
- Extends the `36_API_ARCHITECTURE.md`.

## 6. Definitions
- **API Contract:** A shared understanding of how the API will behave, strictly enforced by schema validation.

## 7. Architecture
RESTful Next.js Route Handlers.

## 8. Requirements

### 8.1. Global Variables & Formats
- **Base URL:** `/api/v1`
- **Content-Type:** Seluruh `POST/PUT/PATCH` requests **HARUS** mengirimkan header `Content-Type: application/json`.
- **Date Format:** Seluruh *timestamp* yang masuk dan keluar dari API **HARUS** menggunakan standar ISO-8601 UTC (misal: `2026-07-24T12:00:00.000Z`). Konversi ke zona waktu lokal pengguna (WIB/WITA/WIT) dilakukan eksklusif di sisi Klien (Frontend).
- **Currency Format:** Seluruh nilai mata uang (Rupiah) yang dikirim dan diterima berupa angka bulat atau desimal murni tanpa pemisah ribuan (misal: `2500000000`, bukan `"2.500.000.000"`).

### 8.2. Request Validation Promise
- Jika *request payload* tidak sesuai tipe data (misal: mengirim string pada kolom harga), API berjanji untuk tidak pernah menyebabkan server *crash*. API akan memotong proses (*short-circuit*) dan langsung mengembalikan HTTP 400 Bad Request.

## 9. Implementation
- Both frontend and backend engineers must share the exact same Zod schema definitions (`src/types/schemas.ts`) to enforce this contract programmatically on both sides.

## 10. Acceptance Criteria
- [x] Date and currency transmission formats are standardized.
- [x] Clear rules on header expectations.

## 11. Future Improvements
- N/A

## 12. References
- *ISO 8601 Specification*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

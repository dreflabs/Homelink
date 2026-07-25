# 54. ERROR CODE CATALOGUE
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Standardized Error Code Catalogue

## 2. Purpose
To establish a unified language for system errors. Instead of frontend apps parsing fragile string messages, they will react to immutable Error Codes.

## 3. Scope
Covers Application-specific error codes mapped to standard HTTP Status Codes.

## 4. Audience
- **Frontend Engineers:** To map error codes to specific UI responses (e.g., redirecting to login on `AUTH_EXPIRED`).

## 5. Dependencies
- Dependent on `51_API_CONTRACT.md`.

## 6. Definitions
- **HTTP Status Code:** Standard internet codes (e.g., 404).
- **Internal Error Code:** String-based identifiers specific to HomeLink (e.g., `ERR_AUTH_001`).

## 7. Architecture
N/A

## 8. Requirements

### 8.1. Client-Side Errors (4xx)
Kesalahan yang disebabkan oleh input pengguna yang salah atau akses yang tidak valid.

| Internal Code | HTTP Status | Kapan Digunakan | Tindakan Frontend (UX) |
| :--- | :--- | :--- | :--- |
| `VALIDATION_FAILED` | `400 Bad Request` | Zod schema gagal (tipe data salah). | Tampilkan pesan merah di bawah field input yang bermasalah. |
| `AUTH_REQUIRED` | `401 Unauthorized` | Mengakses endpoint tertutup tanpa token. | Buka *Modal* Login. |
| `AUTH_EXPIRED` | `401 Unauthorized` | Token JWT kedaluwarsa. | *Logout* diam-diam, hapus state, buka *Modal* Login. |
| `FORBIDDEN_ACTION` | `403 Forbidden` | *Buyer* mencoba mengakses menu *Owner*. | Tampilkan halaman "Akses Ditolak". |
| `SLOT_UNAVAILABLE` | `409 Conflict` | Dua pengguna mem-*booking* jadwal yang sama. | *Refresh* daftar tanggal dan beritahu *user* slot sudah diambil orang lain. |

### 8.2. Server-Side Errors (5xx)
Kesalahan yang murni disebabkan oleh kegagalan sistem HomeLink.

| Internal Code | HTTP Status | Kapan Digunakan | Tindakan Frontend (UX) |
| :--- | :--- | :--- | :--- |
| `INTERNAL_ERROR` | `500 Server Error` | Unhandled exception di server. | Tampilkan *Toast* generik: "Sistem sedang gangguan." |
| `DATABASE_TIMEOUT` | `503 Service Unav.` | PostgreSQL menolak koneksi. | Tampilkan layar ilustrasi *maintenance*. |
| `AI_SERVICE_DOWN` | `503 Service Unav.` | API OpenAI/Gemini *timeout*. | Kembalikan *fallback* ke pencarian standar tanpa AI. |

## 9. Implementation
- The centralized Error Handler in Next.js Route Handlers must map caught exceptions to these specific Error Codes before sending the JSON response.

## 10. Acceptance Criteria
- [x] Clear instructions provided to Frontend Engineers on how to handle each error UX-wise.

## 11. Future Improvements
- N/A

## 12. References
- *MDN HTTP Status Codes*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

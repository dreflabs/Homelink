# 52. ENDPOINT CATALOGUE
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 API Endpoint Catalogue

## 2. Purpose
To provide a master list of all available HTTP endpoints in the system, acting as a quick-reference index for developers.

## 3. Scope
Covers Phase 1 endpoints for Auth, Properties, and Bookings.

## 4. Audience
- **Frontend Engineers:** To know what endpoints exist to fetch data.

## 5. Dependencies
- Dependent on `51_API_CONTRACT.md`.

## 6. Definitions
- **Endpoint:** A specific URI where an API can be accessed.

## 7. Architecture
N/A

## 8. Requirements

### 8.1. Auth Module (`/api/v1/auth`)
| Method | Path | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Mendaftarkan user baru (memerlukan verifikasi OTP nanti). | Public |
| `POST` | `/login` | Mengautentikasi pengguna dan mengembalikan Sesi/Cookie. | Public |
| `POST` | `/logout` | Menghancurkan Sesi/Cookie. | Logged In |

### 8.2. Property Module (`/api/v1/properties`)
| Method | Path | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Mencari properti (dengan Cursor Pagination). | Public |
| `GET` | `/:id` | Mengambil detail satu properti berdasarkan ID/Slug. | Public |
| `POST` | `/` | Mendaftarkan properti baru. (Status `PENDING`). | Owner |
| `PATCH`| `/:id/status`| Memperbarui status verifikasi properti. | Admin |

### 8.3. Booking Module (`/api/v1/bookings`)
| Method | Path | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Mengambil daftar jadwal *booking* milik pengguna. | Logged In |
| `POST` | `/` | Membuat jadwal survei baru pada slot yang tersedia. | Buyer |
| `PATCH`| `/:id/status`| Membatalkan atau menyelesaikan *booking*. | Owner/Buyer |

### 8.4. Media Module (`/api/v1/media`)
| Method | Path | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/presigned-url`| Men-generate URL S3/R2 sementara untuk upload klien langsung. | Logged In |

### 8.5. Surveyor Module (`/api/v1/survey`)
| Method | Path | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/assignments` | Mendapatkan daftar properti yang harus disurvei. | Surveyor |
| `POST` | `/:id/report` | Mengirimkan laporan hasil survei lapangan (Kondisi bangunan & Lingkungan). | Surveyor |

### 8.6. Photographer Module (`/api/v1/photography`)
| Method | Path | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/assignments` | Mendapatkan daftar properti yang harus difoto. | Photographer |
| `POST` | `/:id/deliver` | Menyerahkan link/folder hasil jepretan final. | Photographer |

## 9. Implementation
- Endpoints must be physically created in the Next.js `app/api/v1/` directory.

## 10. Acceptance Criteria
- [x] All core business processes from the BRD have corresponding endpoints.
- [x] HTTP methods correctly map to RESTful actions.

## 11. Future Improvements
- Generating an interactive Swagger/OpenAPI UI from these specs in Phase 2.

## 12. References
- *REST API Best Practices*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

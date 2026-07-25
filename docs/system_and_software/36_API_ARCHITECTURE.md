# 36. API ARCHITECTURE
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 API Architecture & Design Principles

## 2. Purpose
To establish the conventions, standards, and structural formats for all internal APIs. This ensures uniformity, making the APIs predictable and easy to consume by the frontend team.

## 3. Scope
Covers RESTful paradigms, payload structures, pagination formats, and semantic HTTP verbs.

## 4. Audience
- **Backend Engineers:** For building endpoints.
- **Frontend Engineers:** For consuming endpoints.

## 5. Dependencies
- Feeds into the specific API catalogue in `52_ENDPOINT_CATALOGUE.md`.

## 6. Definitions
- **RESTful:** Representational State Transfer. An architectural style for distributed hypermedia systems.
- **Pagination:** The process of dividing a large dataset into discrete pages.

## 7. Architecture
JSON REST API using strict HTTP semantic conventions.

## 8. Requirements

### 8.1. Universal Response Structure (JSend Format)
Setiap respon dari API (baik sukses maupun gagal) HARUS mematuhi struktur JSON standar berikut untuk mempermudah eksekusi *parsing* di sisi klien.

**Success Response (200 OK / 201 Created):**
```json
{
  "status": "success",
  "data": {
    "property": { "id": "123", "title": "Rumah BSD" }
  },
  "message": "Property successfully created."
}
```

**Error Response (4xx / 5xx):**
```json
{
  "status": "error",
  "code": "VALIDATION_FAILED",
  "message": "Harga minimum tidak boleh kurang dari 0.",
  "errors": [
    { "field": "price", "message": "Harus bernilai positif" }
  ]
}
```

### 8.2. HTTP Semantic Conventions
- `GET`: Mengambil data. Operasi HARUS *Idempotent* (tidak mengubah isi database).
- `POST`: Membuat entitas baru (Registrasi, Booking Baru).
- `PUT`: Memperbarui seluruh isi entitas secara utuh.
- `PATCH`: Memperbarui sebagian spesifik dari entitas (misal: hanya mengupdate harga rumah).
- `DELETE`: Menghapus entitas. Gunakan *Soft Delete* (mengubah status `isDeleted = true`) pada database untuk data kritis, bukan *Hard Delete*.

### 8.3. Cursor-Based Pagination
Untuk performa *query* database yang optimal pada tabel yang memiliki jutaan baris (misal: hasil pencarian properti), penggunaan `OFFSET` dalam SQL dilarang. API HARUS mengimplementasikan **Cursor-Based Pagination**.

**Request:** `GET /api/properties?cursor=xyz123&limit=20`
**Response Data Structure:**
```json
{
  "data": [ ...items ],
  "meta": {
    "nextCursor": "abc456",
    "hasNextPage": true
  }
}
```

## 9. Implementation
- Engineers must create a centralized utility function (`JSend()`) on the server to automatically wrap all outgoing data in the standardized format.

## 10. Acceptance Criteria
- [x] Clear JSON payload structures are mandated for both success and error states.
- [x] Cursor pagination is established as the default scaling mechanism for lists.

## 11. Future Improvements
- Transition to GraphQL or tRPC if the API consumption requirements become overly complex in Phase 4.

## 12. References
- *JSend Specification*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

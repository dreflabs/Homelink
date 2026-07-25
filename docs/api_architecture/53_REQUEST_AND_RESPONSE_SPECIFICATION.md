# 53. REQUEST & RESPONSE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 API Request & Response Schema Specifications

## 2. Purpose
To define the exact JSON payload shapes for the most critical endpoints, preventing "undefined is not an object" errors during frontend integration.

## 3. Scope
Covers exact field names and types for Property Search and Booking Creation.

## 4. Audience
- **Frontend & Backend Engineers:** For interface mocking and parsing.

## 5. Dependencies
- Extends the catalogue in `52_ENDPOINT_CATALOGUE.md`.

## 6. Definitions
- **Payload:** The actual data pack that is sent in a HTTP request or response body.

## 7. Architecture
N/A

## 8. Requirements

### 8.1. API: Search Properties (`GET /api/v1/properties`)
**Query Parameters (URL):**
- `q` (String, opsional): Teks pencarian bebas (AI Semantic).
- `minPrice` (Number, opsional).
- `maxPrice` (Number, opsional).
- `cursor` (String, opsional): ID item terakhir dari halaman sebelumnya.

**Response (Success 200 OK):**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid-1234",
      "title": "Rumah BSD Tahap 2",
      "price": 2500000000,
      "status": "FULLY_VERIFIED",
      "imageUrl": "https://cdn.homelink.co.id/img123.jpg"
    }
  ],
  "meta": {
    "nextCursor": "uuid-5678",
    "hasNextPage": true
  }
}
```

### 8.2. API: Create Booking (`POST /api/v1/bookings`)
**Request Body:**
```json
{
  "propertyId": "uuid-1234",
  "surveyDate": "2026-08-15",
  "timeSlot": "MORNING"
}
```
*(Catatan: `buyerId` tidak dikirim dari body, melainkan diambil secara aman dari token Sesi/JWT di server).*

**Response (Success 201 Created):**
```json
{
  "status": "success",
  "data": {
    "bookingId": "uuid-9999",
    "surveyDate": "2026-08-15",
    "timeSlot": "MORNING",
    "status": "CONFIRMED"
  },
  "message": "Jadwal survey berhasil dikonfirmasi."
}
```

## 9. Implementation
- Frontend developers should use these JSON structures to create dummy data files (mock service) to build the UI before the backend endpoints are fully completed.

## 10. Acceptance Criteria
- [x] Security constraint applied: Client must not pass trusting IDs (like their own User ID) in the payload; it must be inferred from the secure session.

## 11. Future Improvements
- N/A

## 12. References
- `36_API_ARCHITECTURE.md`

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

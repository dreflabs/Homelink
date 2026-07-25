# 59. VERSIONING STRATEGY
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 API Versioning and Backward Compatibility Rules

## 2. Purpose
To dictate how the API will evolve over time without breaking existing client applications (especially Native Mobile Apps in Phase 4 that users may not update immediately).

## 3. Scope
Covers URI versioning, breaking change definitions, and sunsetting endpoints.

## 4. Audience
- **Backend Engineers:** For API design.
- **Product Managers:** For planning feature deprecations.

## 5. Dependencies
- Extends the API conventions in `36_API_ARCHITECTURE.md`.

## 6. Definitions
- **Backward Compatible:** A change that does not break the functionality of existing clients.
- **Breaking Change:** A change that requires clients to update their code to continue functioning.

## 7. Architecture
N/A

## 8. Requirements

### 8.1. URI Versioning Standard
- Versi API **HARUS** dideklarasikan di dalam URL (*URI Path Versioning*).
- Pola: `/api/v{major}/{resource}`.
- Contoh saat ini: `/api/v1/properties`.

### 8.2. Rules for "Non-Breaking" Changes (Do not increment version)
Perubahan berikut dianggap aman dan harus dilakukan pada `/v1/`:
1. Menambahkan endpoint baru.
2. Menambahkan *field* baru pada JSON *response* (Klien harus didesain untuk mengabaikan field yang tidak dikenal).
3. Menambahkan *query parameter* atau *body parameter* opsional yang baru.

### 8.3. Rules for "Breaking" Changes (Require `v2`)
Jika perubahan berikut dibutuhkan, *engineer* tidak boleh menimpa `/v1/`. Mereka **HARUS** membuat *route* baru di `/v2/`:
1. Menghapus atau mengganti nama *field* yang sudah ada di JSON *response*.
2. Mengubah tipe data sebuah *field* (misal: ID dari `Integer` menjadi `String UUID`).
3. Menambahkan parameter Wajib (Required) baru pada endpoint *existing*.

### 8.4. Sunsetting Strategy
Jika `v2` diluncurkan, `v1` tidak boleh langsung dimatikan.
- `v1` harus didukung (dipelihara bug kritisnya) minimal selama **6 bulan** sejak `v2` rilis.
- *Header* peringatan: `Warning: 299 - "This API version is deprecated"` harus disisipkan pada respon `v1`.

## 9. Implementation
- Next.js folder structure inherently supports URI versioning (`app/api/v1/...`). To create `v2`, engineers simply duplicate or create a new `app/api/v2/...` folder.

## 10. Acceptance Criteria
- [x] Clear rules defining what constitutes a breaking change.
- [x] Formal timeline and mechanism for deprecating old endpoints.

## 11. Future Improvements
- N/A

## 12. References
- *Stripe API Versioning Philosophy*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

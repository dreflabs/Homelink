# 45. INDEX STRATEGY
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 PostgreSQL Indexing Strategy

## 2. Purpose
To ensure database read queries (especially for the search feature) remain consistently fast even when the table scales to millions of property listings.

## 3. Scope
Covers B-Tree indices, PGVector HNSW indices, and compound indexing rules.

## 4. Audience
- **Database / Backend Engineers:** For declaring indices in Prisma schema.

## 5. Dependencies
- Directly supports `39_AI_ARCHITECTURE.md` (Vector Search).

## 6. Definitions
- **HNSW:** Hierarchical Navigable Small World. A highly efficient graph-based index for vector search in `pgvector`.
- **Compound Index:** An index on multiple columns used together in a query.

## 7. Architecture
N/A

## 8. Requirements

### 8.1. B-Tree Indices (Standard Lookups)
Prisma otomatis membuat indeks untuk kolom Primary Key (`@id`) dan relasi (`@relation`). Engineer HARUS secara manual menambahkan indeks komposit (`@@index`) untuk kolom yang sering digunakan sebagai filter pencarian (*WHERE* clause).

- **Tabel `Property`:**
  - `@@index([status, price])` $\rightarrow$ Pencarian sering memfilter listing yang `FULLY_VERIFIED` lalu mengurutkannya berdasarkan harga.
  - `@@index([slug])` $\rightarrow$ Unik, namun eksplisit dibuat indeks untuk resolusi halaman detail yang sangat cepat.

### 8.2. PGVector Indices (AI Search)
Pencarian vektor tanpa indeks akan menyebabkan *Full Table Scan* yang akan membuat CPU server meledak.
- **Tabel `Property`:** Kolom `embedding` HARUS menggunakan indeks **HNSW**. 
- *Catatan:* Karena Prisma saat ini mungkin belum mendukung pembuatan indeks khusus `pgvector` secara langsung dari GUI, eksekusi indeks ini HARUS dilakukan melalui migrasi SQL manual.

```sql
-- Dijalankan via manual SQL migration
CREATE INDEX property_embedding_idx ON "Property" USING hnsw (embedding vector_cosine_ops);
```

### 8.3. The "Over-indexing" Warning
Jangan indeks setiap kolom. Setiap indeks menambah beban komputasi saat `INSERT` atau `UPDATE`. Tabel dengan rasio tulis tinggi (misal: `Booking` atau tabel log analitik) harus seminimal mungkin menggunakan indeks.

## 9. Implementation
- Backend engineers must use `EXPLAIN ANALYZE` in PostgreSQL to verify that critical queries are actually using the defined indices.

## 10. Acceptance Criteria
- [x] Specifies compound indices for standard search filters.
- [x] Provides the exact SQL syntax needed for vector indexing.

## 11. Future Improvements
- N/A

## 12. References
- *PostgreSQL EXPLAIN ANALYZE Documentation*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

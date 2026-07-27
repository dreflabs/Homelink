# AI RECOMMENDATION PAGE — DEFERRED (FASE 4)
**HomeLink 2.0 Enterprise Documentation**

## Status: Fase 4 (Belum Aktif)

Halaman ini terkait dengan rekomendasi properti personal berbasis AI (`03_PRODUCT_REQUIREMENT_DOCUMENT_PRD.md`), yang menurut `13_PRODUCT_ROADMAP.md` §8.3 dijadwalkan **Fase 4** — dijelaskan secara eksplisit di sana sebagai "diblokir menunggu dokumen arsitektur baru," berbeda dari AI Search (`01_AI_SEARCH.md`) yang sudah aktif Fase 1.

Spesifikasi detail sengaja BELUM ditulis untuk mencegah spekulasi pada model rekomendasi dan skema data yang scope-nya bisa berubah signifikan sebelum Fase 4 dimulai.

**Prasyarat sebelum halaman ini bisa dispesifikasikan:**
- Entitas log rekomendasi (mis. `RecommendationLog`, untuk mengukur efektivitas) harus ditambahkan ke `docs/database_architecture/40_ERD.md`.
- Endpoint rekomendasi harus ditambahkan ke `docs/api_architecture/52_ENDPOINT_CATALOGUE.md`.
- **Satu fondasi teknis sudah ada** (tidak seperti Billing/Commission yang mulai dari nol): `PROPERTY.embeddingVector` (pgvector) di `40_ERD.md` — kolom yang sama yang menopang AI Search — kemungkinan besar menjadi basis teknis rekomendasi berbasis kemiripan properti, begitu Fase 4 dimulai.

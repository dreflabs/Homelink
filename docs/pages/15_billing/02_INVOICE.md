# INVOICE PAGE — DEFERRED (FASE 4)
**HomeLink 2.0 Enterprise Documentation**

## Status: Fase 4 (Belum Aktif)

Halaman ini terkait dengan penerbitan invoice (Verification Service Fee ke Owner, langganan SaaS ke Partner Agent) yang menurut `13_PRODUCT_ROADMAP.md` §8.3 dijadwalkan **Fase 4** untuk otomasi penuh — invoice manual untuk Verification Fee sudah dimulai lebih awal di Fase 2 (`13_PRODUCT_ROADMAP.md` v1.1.0), tapi UI penuh untuk melihat/mengunduh invoice menunggu Payment Gateway di Fase 4.

Spesifikasi detail sengaja BELUM ditulis untuk mencegah spekulasi pada skema data (`Invoice`) dan endpoint yang scope-nya bisa berubah signifikan sebelum Fase 4 dimulai.

**Prasyarat sebelum halaman ini bisa dispesifikasikan:**
- Entitas `Invoice` harus ditambahkan ke `docs/database_architecture/40_ERD.md`.
- Endpoint invoice harus ditambahkan ke `docs/api_architecture/52_ENDPOINT_CATALOGUE.md`.
- Format invoice (PDF generation) harus diputuskan — belum disebut di dokumen arsitektur manapun.

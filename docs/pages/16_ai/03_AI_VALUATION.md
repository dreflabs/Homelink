# AI VALUATION PAGE — DEFERRED (FASE 4)
**HomeLink 2.0 Enterprise Documentation**

## Status: Fase 4 (Belum Aktif)

Halaman ini terkait dengan estimasi harga properti berbasis AI (fitur yang diminta stakeholder di `06_STAKEHOLDER_REQUIREMENT_SPECIFICATION.md` sebagai kebutuhan Agen Properti B2B), yang menurut `13_PRODUCT_ROADMAP.md` §8.3 dijadwalkan **Fase 4** — sama status dengan `02_AI_RECOMMENDATION.md`.

Spesifikasi detail sengaja BELUM ditulis untuk mencegah spekulasi pada model valuasi dan skema data yang scope-nya bisa berubah signifikan sebelum Fase 4 dimulai.

**Prasyarat sebelum halaman ini bisa dispesifikasikan:**
- Entitas untuk menyimpan hasil estimasi (mis. `ValuationEstimate`, dengan riwayat harga pembanding) harus ditambahkan ke `docs/database_architecture/40_ERD.md`.
- Endpoint valuasi harus ditambahkan ke `docs/api_architecture/52_ENDPOINT_CATALOGUE.md`.
- Sumber data pembanding harga pasar (data historis transaksi, bukan hanya listing aktif) harus diputuskan — belum tercakup skema apa pun saat ini, termasuk `Market Insights` yang juga masih berupa gap di audit fitur sebelumnya.


## 8. UI/UX Aesthetic Rules (Visual Guidelines)


**Premium UI Refinement Standards:**
- Semua Heading h1/h2 di UI harus tertulis di dokumen menggunakan class `tracking-tighter` dan `leading-[1.05]`.
- Jarak antar section adalah `py-24 lg:py-32`.
- Shadow menggunakan OKLCH Semantic Shadows (`shadow-card`, `shadow-float`, dsb).
- Penggunaan logo dengan `<Logo />` terpusat.

# COUPONS PAGE — DEFERRED (FASE 4)
**HomeLink 2.0 Enterprise Documentation**

## Status: Fase 4 (Belum Aktif)

Halaman ini terkait dengan kode diskon/promosi untuk biaya verifikasi atau langganan SaaS, yang menurut `13_PRODUCT_ROADMAP.md` §8.3 dijadwalkan **Fase 4** bersamaan dengan modul Billing lainnya.

Spesifikasi detail sengaja BELUM ditulis untuk mencegah spekulasi pada skema data (`Coupon`) dan aturan bisnis diskon yang scope-nya bisa berubah signifikan sebelum Fase 4 dimulai.

**Prasyarat sebelum halaman ini bisa dispesifikasikan:**
- Skema `Invoice`/`Payment` di `02_INVOICE.md`/`03_PAYMENT_HISTORY.md` harus sudah tersedia terlebih dahulu (kupon diterapkan pada transaksi).
- Aturan bisnis diskon (persentase vs nominal tetap, batas pemakaian, masa berlaku) harus diputuskan oleh tim Product/Marketing.
- Kebijakan agar kupon tidak dipakai sebagai copywriting urgensi palsu — tetap tunduk pada `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` §8.7's larangan dark-pattern.

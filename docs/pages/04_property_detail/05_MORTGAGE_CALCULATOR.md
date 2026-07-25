# MORTGAGE CALCULATOR PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Mortgage Calculator
**Module:** 04 PROPERTY DETAIL
**Purpose:** Memberikan estimasi cicilan bulanan KPR (Kredit Pemilikan Rumah) berdasarkan harga properti yang sedang dilihat, uang muka, tenor, dan suku bunga — membantu Buyer menilai keterjangkauan sebelum menghubungi agen atau menjadwalkan survey. Ini adalah kalkulasi estimasi murni, bukan pengajuan KPR resmi.

## 2. Next.js Routing Path
```text
app/(main)/p/[slug]/@modal/(.)mortgage-calculator/page.tsx   // Intercepting Route
```
Dipicu dari tombol "Hitung Simulasi KPR" pada price box (kolom kanan sticky) halaman `01_PROPERTY_DETAIL.md`.

## 3. Required UI Components (Shadcn/ui + Custom)
- `Dialog` (Shadcn) sebagai kontainer kalkulator.
- `Slider` (Shadcn) — untuk uang muka (down payment %, rentang 10–90%) dan tenor (rentang 1–30 tahun).
- `Input` (numeric, dengan format Rupiah) — untuk override manual nilai uang muka dan suku bunga per tahun (%), terhubung dua arah dengan slider.
- Custom `ResultCard` — kartu output menonjol menampilkan estimasi cicilan bulanan, total bunga, dan total pembayaran.
- `Label` — terasosiasi eksplisit (`htmlFor`) dengan setiap slider/input untuk pembaca layar.

## 4. Data & State Management
- **Input Awal (dari server state properti):** `price` (harga properti, dari entity `PROPERTY`, hanya dibaca/read-only sebagai basis perhitungan, bukan diedit).
- **Local State (100% client-side, tidak ada koneksi server):**
  - `downPaymentPercent` (default 20%)
  - `tenorYears` (default 15 tahun)
  - `interestRatePercent` (default sesuai rata-rata suku bunga KPR pasar, dapat di-override manual, contoh default 7.5%/tahun)
  - `monthlyInstallment`, `totalInterest`, `totalPayment` — **derived state**, dihitung ulang secara reaktif (misal via `useMemo`) setiap kali salah satu input di atas berubah, menggunakan rumus anuitas standar: `M = P × [r(1+r)^n] / [(1+r)^n − 1]` dengan `r` = suku bunga bulanan, `n` = jumlah bulan tenor.
- Tidak ada state yang perlu disimpan ke server atau localStorage — kalkulator reset ke default setiap kali modal dibuka ulang.

## 5. API Endpoints Referenced
- **Tidak ada endpoint backend yang digunakan.** Sesuai `52_ENDPOINT_CATALOGUE.md`, tidak terdapat (dan tidak diperlukan) endpoint untuk Mortgage Calculator — seluruh perhitungan cicilan adalah **kalkulasi murni di sisi client** menggunakan `price` properti yang sudah ter-fetch di halaman detail (`GET /api/v1/properties/:id`). Tidak ada request tambahan dipicu oleh interaksi slider/input.

## 6. Acceptance Criteria (DoD)
- [ ] Setiap `Slider` dan `Input` memiliki `<Label>` terasosiasi (`htmlFor`/`id`) sehingga screen reader mengumumkan nilai dan satuan dengan benar (contoh: "Uang muka, 20 persen").
- [ ] Hasil kalkulasi (`ResultCard`) diperbarui secara real-time (<100ms, tanpa jeda terlihat) setiap slider digeser, tanpa memicu request jaringan apa pun.
- [ ] Nilai input manual (Rupiah, persen) divalidasi agar tidak negatif dan tidak melebihi batas wajar (misal tenor maksimum 30 tahun, DP maksimum 90%), dengan pesan error inline jika melanggar.
- [ ] Disclaimer visible menyatakan hasil adalah estimasi, bukan penawaran resmi bank/lembaga pembiayaan.
- [ ] Modal dapat ditutup tanpa kehilangan data lain di halaman detail (tidak memicu re-fetch properti).

## 7. Iconography Specification

**Library:** Lucide React ONLY. Stroke width `1.5`.

| Icon | Penggunaan | Ukuran | Warna | Catatan A11y |
|---|---|---|---|---|
| `Calculator` | Ikon tombol pemicu "Hitung Simulasi KPR" | 18px | `text-white` (di atas tombol biru) atau `text-slate-700` (outline) | Selalu disertai label teks |
| `TrendingUp` | Ikon dekoratif pada `ResultCard` menandakan proyeksi/estimasi finansial | 20px | `text-blue-700` | `aria-hidden="true"` |
| `Percent` | Ikon indikator pada input suku bunga/DP | 16px | `text-muted-foreground` | `aria-hidden="true"` |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Mematuhi pedoman visual `Mockup.png` untuk standar "Apple × Airbnb × Stripe × Zillow":

- **ResultCard:** Menggunakan `bg-blue-700` atau gradasi biru lembut sebagai aksen latar untuk menonjolkan angka cicilan bulanan sebagai fokus visual utama, teks angka besar dan bold (`text-3xl font-semibold`, warna putih di atas biru).
- **Slider:** Track menggunakan `slate-50` sebagai warna dasar dan `blue-700` untuk bagian terisi (fill), thumb slider berbentuk lingkaran dengan shadow lembut agar mudah di-drag di layar sentuh.
- **Bentuk:** Kartu hasil dan kontainer modal menggunakan `rounded-2xl`/`rounded-3xl` konsisten dengan modul lain.
- **Whitespace:** Jarak antar slider cukup lega (minimal `gap-6`) agar tidak terasa padat, selaras dengan filosofi "ruang bernapas" desain keseluruhan.
- **Motion:** Transisi angka pada `ResultCard` menggunakan animasi angka bergulir halus (count-up) singkat (~300ms) setiap kali nilai berubah, bukan perubahan instan yang kasar.

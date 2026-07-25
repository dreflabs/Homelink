# 81. UNIT TESTING
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
**Feature Name:** Unit Testing Specification

## 2. Purpose
Panduan untuk menulis tes fungsional pada tingkatan modul individu terkecil. Menghindari regresi akibat refaktorisasi (*refactoring*).

## 3. Scope
- Fungsi Kalkulasi.
- Validasi Input.
- React Component Rendering (Shallow).

## 4. Audience
- **Frontend & Backend Engineers**

## 5. Dependencies
- `79_QA_STRATEGY.md` — menetapkan target *coverage* 80% yang menjadi acuan wajib untuk pengujian unit.
- `82_INTEGRATION_TESTING.md` — lapisan pengujian berikutnya di atas Unit Testing dalam Testing Pyramid.

## 6. Definitions
- **AAA Pattern** — struktur penulisan tes: *Arrange* (siapkan data), *Act* (eksekusi fungsi), *Assert* (verifikasi hasil).
- **Mock/Stub** — objek atau data tiruan yang menggantikan dependensi nyata dalam pengujian.
- **Colocation** — praktik menempatkan file tes bersebelahan dengan file sumber aslinya.

## 7. Architecture
Vitest dengan mesin eksekusi *esbuild*, kompatibel API dengan Jest, digunakan sebagai *test runner* untuk seluruh unit test.

## 8. Requirements

### 8.1. Aturan Penulisan (AAA Pattern)
Setiap *Unit Test* **HARUS** mengikuti struktur AAA:
- **Arrange:** Menyiapkan data tiruan (Mock/Stub).
- **Act:** Mengeksekusi fungsi target.
- **Assert:** Memastikan fungsi mengembalikan nilai yang benar.

*Contoh:*
```typescript
import { calculateTax } from './utils';

test('calculateTax adds 11% PPN to base price', () => {
  // Arrange
  const basePrice = 1000000;
  // Act
  const finalPrice = calculateTax(basePrice);
  // Assert
  expect(finalPrice).toBe(1110000);
});
```

### 8.2. File Colocation
- File *unit test* tidak boleh diletakkan di folder `/tests/` yang terpisah jauh.
- File harus di-*colocate* (disebelah) file aslinya.
- Contoh: `src/lib/utils.ts` disandingkan dengan `src/lib/utils.test.ts`. Ini mempermudah saat refaktorisasi.

## 9. Implementation
- Framework tes: **Vitest** (kompatibel penuh dengan API Jest, namun jauh lebih cepat karena mengeksekusi dengan *esbuild*).

## 10. Acceptance Criteria
- [x] Fungsi kompleks (seperti kalkulasi uang dan konversi format waktu) dilarang dikirim (*commit*) tanpa disandingkan dengan *Unit Test*.

## 11. Future Improvements
- Menambahkan *snapshot testing* untuk komponen React guna mendeteksi perubahan UI yang tidak disengaja.

## 12. References
- Vitest Documentation
- Jest API Compatibility Reference

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

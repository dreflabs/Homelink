# 80. TEST PLAN
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
**Feature Name:** Master Test Plan (MTP)

## 2. Purpose
Dokumen induk yang menjelaskan "Apa" yang harus diuji, "Bagaimana" cara mengujinya, dan siapa yang bertanggung jawab di fase pra-peluncuran MVP.

## 3. Scope
- Lingkup Pengujian (In-Scope vs Out-of-Scope).
- Kriteria Lulus (Exit Criteria).

## 4. Audience
- **QA Lead & Project Manager**

## 5. Dependencies
- `03_PRODUCT_REQUIREMENT_DOCUMENT_PRD.md` — sumber kebenaran fitur yang menentukan cakupan In-Scope/Out-of-Scope MVP.
- `86_UAT_PLAN.md` — Exit Criteria dokumen ini menjadi syarat masuk (*entry criteria*) bagi fase UAT.
- `79_QA_STRATEGY.md` — strategi pengujian global yang menjadi acuan penyusunan rencana ini.

## 6. Definitions
- **MTP** — *Master Test Plan*, dokumen induk perencanaan pengujian.
- **MVP** — *Minimum Viable Product*, versi rilis awal dengan fitur inti.
- **Exit Criteria** — syarat terukur yang harus dipenuhi sebelum rilis diizinkan.
- **UAT** — *User Acceptance Testing*, pengujian penerimaan oleh pemangku kepentingan bisnis.
- **E2E** — *End-to-End*, pengujian alur penuh aplikasi.

## 7. Architecture
N/A — dokumen ini bersifat perencanaan manajerial, bukan arsitektur teknis; eksekusi teknis mengacu pada `81_UNIT_TESTING.md`, `82_INTEGRATION_TESTING.md`, dan `83_END_TO_END_TESTING.md`.

## 8. Requirements

### 8.1. In-Scope (Wajib Diuji)
1. Modul Autentikasi (Email, OTP SMS).
2. Otorisasi Akses Multi-role (Guest, Buyer, Owner, Admin).
3. Search Engine AI (Validasi parameter dan hasil vektor).
4. Pembuatan *Booking* dan Konfirmasi.
5. Manajemen *Listing* (Unggah properti, edit harga).

### 8.2. Out-of-Scope (Fase 1)
- Integrasi Payment Gateway Penuh (Diuji terpisah di Fase 4).
- Aplikasi *Native* Mobile (Fokus QA saat ini hanya di Web Browser Desktop & Mobile).

### 8.3. Exit Criteria (Syarat Rilis MVP)
MVP HomeLink 2.0 hanya diizinkan untuk dikerahkan (*Go-Live*) ke publik jika memenuhi seluruh metrik ini:
- $100\%$ Kasus Uji E2E Kritis lulus (*Passed*).
- $0$ *Bug* berstatus *Critical* atau *High* yang tersisa (*Open*).
- Bug *Medium* maksimal tersisa $5$ (dengan catatan tidak menghalangi fungsi bisnis).
- UAT (User Acceptance Testing) internal telah ditandatangani oleh CPO dan CEO.

## 9. Implementation
- Seluruh *Test Cases* harus ditulis, dieksekusi, dan dilacak di *Software Manajemen Tes* (seperti TestRail atau Zephyr).

## 10. Acceptance Criteria
- [x] Semua metrik *Exit Criteria* terdokumentasi dan tidak bisa dilonggarkan tanpa persetujuan bulat (Aklamasi) dari C-Level.

## 11. Future Improvements
- Memperluas In-Scope pada Fase 4 untuk mencakup Integrasi Payment Gateway penuh dan Aplikasi Native Mobile.

## 12. References
- TestRail Documentation
- Zephyr Documentation

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

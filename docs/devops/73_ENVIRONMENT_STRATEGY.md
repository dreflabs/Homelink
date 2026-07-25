# 73. ENVIRONMENT STRATEGY
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
**Feature Name:** Multi-Environment Management Strategy

## 2. Purpose
Mengatur pemisahan yang ketat antara tempat *developer* menulis kode, tempat QA melakukan pengujian, dan tempat pengguna akhir mengakses aplikasi.

## 3. Scope
- Definisi Local, Staging, dan Production.
- Isolasi Database.

## 4. Audience
- **Semua Engineers & QA**

## 5. Dependencies
- `70_CI_CD_SPECIFICATION.md` — pipeline CI/CD yang menyuntikkan `.env.staging` dan mengontrol alur kode antar-lingkungan.
- `71_DEPLOYMENT_GUIDE.md` — konfigurasi server tempat masing-masing tingkatan (Staging, Production) berjalan.

## 6. Definitions
- **LOCAL:** Lingkungan pengembangan di laptop *engineer* masing-masing.
- **STAGING:** Lingkungan pengujian QA yang meniru Production dengan data dummy.
- **PRODUCTION:** Lingkungan *live* yang melayani pengguna asli.
- **GitFlow:** Strategi *branching* Git yang mengatur alur `feature-branch` → `staging` → `main`.
- **Sandbox/Test Mode:** Mode API pihak ketiga yang tidak memproses transaksi sungguhan.

## 7. Architecture
Tiga tingkatan lingkungan terisolasi: LOCAL (Docker PostgreSQL di laptop), STAGING (VPS/subdomain terpisah dengan database dan data dummy sendiri), dan PRODUCTION (VPS utama dengan data pelanggan asli), dipisahkan oleh *branch* Git dan *environment file* masing-masing.

## 8. Requirements

### 8.1. 3-Tier Environments
Platform HARUS dibagi ke dalam tiga tahap isolasi:
1. **LOCAL (Development):**
   - Berjalan di laptop masing-masing *engineer*.
   - Terhubung ke PostgreSQL lokal (Docker).
   - *Env File:* `.env.local`
2. **STAGING (Testing/QA):**
   - Berjalan di VPS terpisah atau *subdomain* khusus (`staging.homelink.co.id`).
   - Kode yang berjalan adalah salinan *branch* `staging`.
   - Menggunakan *database* PostgreSQL terpisah dari *Production*. Menggunakan data *dummy* (*Seeding*).
   - *Env File:* `.env.staging` (disuntikkan via CI/CD).
3. **PRODUCTION (Live):**
   - Berjalan di VPS utama (`www.homelink.co.id`).
   - Murni data pelanggan asli. Tidak boleh disentuh untuk *testing*.
   - Kode yang berjalan berasal dari *branch* `main`.

### 8.2. Isolasi Pihak Ketiga (API Eksternal)
- Kunci API pihak ketiga (misal API Payment Gateway, API WhatsApp) yang digunakan di `LOCAL` dan `STAGING` **WAJIB** merupakan kunci mode *Sandbox* atau *Test Mode*. 
- Mengirim transaksi *dummy* ke API *Live* sangat dilarang karena akan merusak laporan akuntansi perusahaan.

## 9. Implementation
- *Branching strategy* Git (GitFlow) digunakan untuk mengontrol aliran kode antar lingkungan. `feature-branch` $\rightarrow$ `staging` $\rightarrow$ `main`.

## 10. Acceptance Criteria
- [x] Akses publik ke URL `staging.homelink.co.id` dilindungi oleh otentikasi dasar (*Basic Auth*) atau diblokir dari pencarian Google (menggunakan `robots.txt` Disallow).

## 11. Future Improvements
- Fase 2: Menambahkan lingkungan `preview` per Pull Request (ephemeral environment) untuk mempercepat review QA.

## 12. References
- GitFlow Branching Model.

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

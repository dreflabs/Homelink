# 88. ADMIN MANUAL
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
Administrator Workflow Manual

## 2. Purpose
Panduan praktis (SOP) bagi tim Admin / Verifikator HomeLink untuk menggunakan Dasbor internal dalam menyelesaikan tugas moderasi dan verifikasi properti.

## 3. Scope
- Proses Verifikasi Listing.
- Penanganan Sengketa.
- Penangguhan Akun (Banning).

## 4. Audience
- **Internal Admin Staff (Moderators)**

## 5. Dependencies
- `56_AUTHORIZATION_MATRIX.md` — mendefinisikan hak akses peran Admin yang menjalankan SOP ini di Dasbor Super Admin.
- `07_BUSINESS_PROCESS_DOCUMENT.md` — mendefinisikan alur bisnis verifikasi properti (SHM/HGB, survei lapangan) yang menjadi dasar SOP verifikasi ini.

## 6. Definitions
- **SOP:** Standard Operating Procedure, prosedur operasi standar yang wajib diikuti staf Admin.
- **SLA:** Service Level Agreement, target waktu penyelesaian tugas (misal 24 jam untuk verifikasi).
- **SHM/HGB:** Sertifikat Hak Milik / Hak Guna Bangunan, dokumen legal kepemilikan properti di Indonesia.
- **FULLY_VERIFIED:** Status listing properti yang telah lolos seluruh tahap verifikasi legal dan lapangan.

## 7. Architecture
N/A — dokumen ini merupakan panduan prosedural (SOP) penggunaan antarmuka Dasbor Admin, bukan spesifikasi arsitektur teknis.

## 8. Requirements

### 8.1. SOP: Verifikasi Properti Baru (SLA: 24 Jam)
1. **Penerimaan Laporan:** Buka menu `Antrean Verifikasi` di Dasbor Admin.
2. **Pengecekan Legal:** Bandingkan unggahan foto SHM/HGB dengan data NIK KTP *Owner*. Pastikan nama cocok atau ada surat kuasa.
3. **Pengecekan Lapangan:** Lihat laporan foto GPS yang dikirimkan oleh Tim Surveyor via Dasbor Partner.
4. **Keputusan Final:**
   - Jika cocok: Klik `Approve`. Properti otomatis menjadi `FULLY_VERIFIED` dan tayang.
   - Jika mencurigakan: Klik `Reject` dan isi kotak "Alasan Penolakan" (wajib diisi agar sistem bisa mengirim email otomatis ke *Owner*).

### 8.2. SOP: Banned / Suspend Account
- Akun pengguna hanya boleh ditangguhkan jika melanggar Syarat & Ketentuan yang parah (Misal: Mengunggah KTP Palsu, atau terindikasi melakukan penipuan survei).
- Admin harus menggunakan fitur "Suspend User" dan melampirkan tangkapan layar bukti kecurangan di kolom *Notes* sebelum mengeksekusi penangguhan (sebagai bukti jika pengguna protes).

## 9. Implementation
- Admin tidak perlu masuk ke database untuk melakukan tugasnya; semuanya wajib bisa dilakukan melalui antarmuka grafis Dasbor Super Admin.

## 10. Acceptance Criteria
- [x] Admin baru yang dipekerjakan bisa langsung melakukan moderasi tanpa pelatihan lebih dari 1 hari hanya dengan membaca SOP ini.

## 11. Future Improvements
- Menambahkan asisten AI di Dasbor Admin yang secara otomatis menandai (flag) kecocokan nama SHM/HGB dengan KTP untuk mempercepat SOP Verifikasi Properti Baru.

## 12. References
- N/A

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

# 61. THREAT MODEL
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
Threat Modeling (STRIDE Methodology)

## 2. Purpose
Mengidentifikasi secara sistematis vektor serangan yang mungkin dilakukan terhadap platform dan mendefinisikan langkah mitigasinya sebelum dieksploitasi oleh penyerang.

## 3. Scope
Fokus pada ancaman terhadap *Database*, Sesi Pengguna, dan Serangan Ekonomi (Fraud).

## 4. Audience
- **Security Engineers & Backend Engineers:** Untuk pencegahan proaktif.

## 5. Dependencies
- `60_SECURITY_ARCHITECTURE.md` — threat model ini menguraikan (extend) fondasi arsitektur keamanan yang telah ditetapkan.
- `49_RLS_DOCUMENTATION.md` — mitigasi *Tampering* pada bagian 8.1 bergantung pada Row-Level Security yang didokumentasikan di sana.

## 6. Definitions
- **STRIDE:** Metodologi klasifikasi ancaman (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege).
- **RLS (Row-Level Security):** Mekanisme validasi kepemilikan data pada level baris database/service layer.
- **OTP (One-Time Password):** Kode sekali pakai untuk verifikasi tambahan pada operasi kritis.

## 7. Architecture
N/A — dokumen ini bersifat analitis (metodologi pemodelan ancaman), bukan spesifikasi arsitektur teknis.

## 8. Requirements

### 8.1. STRIDE Analysis
| Threat | Skenario pada HomeLink | Mitigasi |
| :--- | :--- | :--- |
| **S**poofing | Attacker memalsukan sesi *Owner* dengan mencuri cookie. | Cookie menggunakan flag `HttpOnly`, `Secure`, dan `SameSite=Lax`. Waktu kedaluwarsa pendek. |
| **T**ampering | User memodifikasi ID Properti pada *payload* API untuk menghapus properti orang lain. | Validasi RLS (Row-Level Security) di Service Layer membandingkan `ownerId` dengan `session.user.id`. |
| **R**epudiation| *Buyer* menyangkal pernah mengklik tombol "Booking". | Catat setiap `Booking` di tabel `AuditLog` dengan IP dan *User-Agent*. |
| **I**nfo Disclosure| Kegagalan API membocorkan KTP *Owner* ke publik. | Penyimpanan KTP via URL S3 *Pre-signed* sementara berumur 15 menit, tidak bisa ditebak (*UUID v4 name*). |
| **D**enial of Service| Bot men-spam endpoint `POST /register` untuk menghabiskan kuota SMS/WA OTP. | *Rate limit* ketat (maksimal 3 req/jam per IP/Nomor) dan integrasi reCAPTCHA v3. |
| **E**levation of Priv.| *Buyer* mengganti param `role=ADMIN` saat register. | Skema Zod mengabaikan parameter *role* berbahaya. Set standar secara eksplisit di server. |

### 8.2. Business Logic Threats (Fraud)
- **Ghost Listings:** Pengguna mengunggah foto properti dari Google. *Mitigasi:* Analisis AI membandingkan dengan metadata gambar/Reverse Image Search, dan Surveyor lapangan melakukan kunjungan fisik.

## 9. Implementation
- Setiap rilis fitur besar harus melalui sesi diskusi Threat Modeling 15 menit.

## 10. Acceptance Criteria
- [x] Mitigasi terhadap serangan OTP *Draining* harus disimulasikan dan lulus uji QA.

## 11. Future Improvements
- Fase 3: Otomatisasi sebagian analisis STRIDE menggunakan alat pemodelan ancaman (misal Microsoft Threat Modeling Tool) yang terintegrasi ke proses desain fitur.

## 12. References
- STRIDE Methodology (Microsoft)

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

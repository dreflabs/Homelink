# 64. OWASP CHECKLIST
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
OWASP Top 10 Mitigation Checklist

## 2. Purpose
Pedoman praktis bagi *Engineer* dan QA untuk memastikan kode HomeLink kebal terhadap 10 kerentanan aplikasi web paling umum versi OWASP.

## 3. Scope
OWASP Top 10 (A01 - A10).

## 4. Audience
- **Semua Software Engineer & QA.**

## 5. Dependencies
- `61_THREAT_MODEL.md` — item A04:2021 (Insecure Design) mengacu langsung pada praktik Threat Modeling di dokumen tersebut.
- `62_AUTHENTICATION_SECURITY.md` — item A07:2021 mengacu pada standar autentikasi yang ditetapkan di sana.
- `63_AUTHORIZATION_SECURITY.md` — item A01:2021 mengacu pada standar RBAC/BOLA yang ditetapkan di sana.

## 6. Definitions
- **OWASP Top 10:** Daftar 10 risiko keamanan aplikasi web paling kritis menurut Open Web Application Security Project.
- **RBAC/BOLA:** Lihat definisi pada `63_AUTHORIZATION_SECURITY.md`.
- **SSRF (Server-Side Request Forgery):** Serangan yang memaksa server melakukan *request* ke tujuan yang tidak diinginkan penyerang.
- **XSS (Cross-Site Scripting):** Injeksi skrip berbahaya ke dalam halaman web yang dilihat pengguna lain.
- **HMAC (Hash-based Message Authentication Code):** Mekanisme verifikasi keaslian dan integritas pesan/webhook.

## 7. Architecture
N/A — dokumen ini adalah *checklist* kepatuhan lintas-domain, bukan spesifikasi arsitektur tersendiri; setiap butir arsitekturnya dijabarkan pada dokumen keamanan terkait (60-63, 65, 67).

## 8. Requirements

### 8.1. The Checklist

| OWASP ID | Kategori Kerentanan | Implementasi Pencegahan di HomeLink | Status |
| :--- | :--- | :--- | :--- |
| **A01:2021** | Broken Access Control | Penerapan RBAC ketat dan proteksi BOLA/IDOR (Lihat Dok 63). | Wajib |
| **A02:2021** | Cryptographic Failures | HTTPS (TLS 1.3) wajib, Hashing Argon2id untuk *password*. | Wajib |
| **A03:2021** | Injection | Menggunakan Prisma ORM (*parameterized query*). Larangan `Raw SQL`. | Wajib |
| **A04:2021** | Insecure Design | *Threat Modeling* di fase desain (Lihat Dok 61). | Wajib |
| **A05:2021** | Security Misconfig. | Menonaktifkan `X-Powered-By` *header*, *Directory Listing* dimatikan. | Wajib |
| **A06:2021** | Vuln. & Outdated Comps | Menjalankan `npm audit` di pipeline CI/CD sebelum *deploy*. | Wajib |
| **A07:2021** | Ident. & Auth Failures | Implementasi blokir *Brute-force* dan wajib OTP (Lihat Dok 62). | Wajib |
| **A08:2021** | Software & Data Integrity | Memvalidasi URL *Webhook* dengan HMAC Signatures. | Wajib |
| **A09:2021** | Security Logging Fail. | Aktivasi *Audit Logs* untuk aksi level Admin & Owner. | Wajib |
| **A10:2021** | SSRF | Node.js dilarang mengeksekusi fetch ke URL *raw* yang diketik oleh *user*. | Wajib |

### 8.2. XSS (Cross-Site Scripting) Prevention
- Walaupun tidak secara eksplisit mendominasi top 10 lagi (digabung), XSS tetap ancaman nyata.
- Next.js secara otomatis melakukan *escape* pada *string* React (misal `{userData}`).
- Penggunaan `dangerouslySetInnerHTML` **SANGAT DILARANG** kecuali data tersebut berasal dari sistem internal (CMS) dan telah disanitasi menggunakan pustaka `DOMPurify`.

## 9. Implementation
- *Checklist* ini diintegrasikan ke dalam formulir persetujuan *Pull Request* (PR Template) di GitHub.

## 10. Acceptance Criteria
- [x] Laporan audit dependensi pihak ketiga (Dependabot/Snyk) bersih dari kerentanan kategori *High* atau *Critical*.

## 11. Future Improvements
- Fase 3: Menambahkan pemetaan otomatis dari hasil pemindaian SAST/DAST ke baris *checklist* ini agar status "Wajib" tervalidasi secara terprogram, bukan manual.

## 12. References
- OWASP Top 10 (2021)

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

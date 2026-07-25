# 62. AUTHENTICATION SECURITY
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
Authentication Security Guardrails

## 2. Purpose
Mendikte standar tertinggi untuk proses verifikasi identitas (Login/Register/OTP), mencegah pengambilalihan akun (*Account Takeover*).

## 3. Scope
- Kebijakan Kata Sandi (Password Policy).
- Pengelolaan Sesi (Session Management).
- MFA (Multi-Factor Authentication).

## 4. Audience
- **Backend & Security Engineers**

## 5. Dependencies
- `60_SECURITY_ARCHITECTURE.md` — mengimplementasikan standar enkripsi (Argon2id) yang ditetapkan pada arsitektur keamanan.
- `61_THREAT_MODEL.md` — mitigasi Spoofing dan Elevation of Privilege pada dokumen tersebut bersandar pada kontrol autentikasi di sini.
- Direferensikan oleh `64_OWASP_CHECKLIST.md` (A07:2021 - Identification & Auth Failures).

## 6. Definitions
- **Argon2id:** Algoritma *hashing* password modern, tahan terhadap serangan *brute-force* GPU.
- **JWT (JSON Web Token):** Format token teregistrasi untuk menyimpan sesi pengguna secara stateless.
- **TTL (Time To Live):** Masa berlaku suatu token sebelum kedaluwarsa.
- **MFA/OTP (Multi-Factor Authentication / One-Time Password):** Lapisan verifikasi tambahan selain password, berupa kode sekali pakai.

## 7. Architecture
Autentikasi menggunakan JWT yang ditandatangani HS512, dengan Access Token berumur pendek (15 menit) dan Refresh Token berumur panjang (7 hari), dikonfigurasi terpusat pada `auth.config.ts`. Password disimpan sebagai hash Argon2id; operasi kritis memerlukan verifikasi OTP tambahan.

## 8. Requirements

### 8.1. Password Policy
- **Minimum:** 8 Karakter.
- **Kompleksitas:** Wajib 1 Huruf Besar, 1 Angka.
- **Anti-Breach:** Menolak *password* umum (seperti `password123`, `homelink2026`). 
- **Storage:** Hanya menyimpan *hash* Argon2id (opsi konfigurasi keamanan maksimal di Node.js). Jangan gunakan Bcrypt jika memungkinkan.

### 8.2. Session Security
- Sesi dipertahankan melalui JWT yang ditandatangani menggunakan HS512 (Algoritma kunci simetris kuat).
- Umur token (TTL):
  - *Access Token:* 15 Menit.
  - *Refresh Token:* 7 Hari. (Untuk menjaga keamanan, akses kritis tetap memerlukan *re-login*).
- Jika *password* direset, sistem harus memaksa (*revoke*) semua sesi lain di perangkat yang berbeda.

### 8.3. Multi-Factor Authentication (OTP)
- Wajib untuk operasi kritis (mengubah nomor rekening, mengganti kata sandi).
- Kode OTP terdiri dari 6 angka acak.
- Maksimal percobaan OTP salah adalah 3 kali. Setelah itu akun diblokir selama 30 menit.

## 9. Implementation
- Pengaturan kedaluwarsa sesi diletakkan terpusat pada file konfigurasi `auth.config.ts`.

## 10. Acceptance Criteria
- [x] Cookie tidak pernah dapat dibaca menggunakan perintah `document.cookie` di Console *Browser*.
- [x] Percobaan salah *password* 5x memicu blokir *brute-force*.

## 11. Future Improvements
- Fase 3: Mendukung *passkey* (WebAuthn/FIDO2) sebagai alternatif password untuk pengguna yang menginginkan otentikasi tanpa kata sandi.

## 12. References
- OWASP Top 10 (A07:2021)
- Auth.js Documentation

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

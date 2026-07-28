# 55. AUTHENTICATION FLOW
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Secure Authentication Flow

## 2. Purpose
To map the exact sequence of how a user proves their identity to the system and maintains that session securely over time.

## 3. Scope
Covers JWT, HttpOnly Cookies, and NextAuth/Auth.js integration.

## 4. Audience
- **Security & Backend Engineers:** For implementing secure login.

## 5. Dependencies
- Fulfills the security constraints in `48_DATABASE_SECURITY.md`.

## 6. Definitions
- **HttpOnly Cookie:** A cookie that cannot be accessed via client-side JavaScript (XSS protection).
- **JWT:** JSON Web Token.

## 7. Architecture
Session management via Auth.js v5 (NextAuth).

## 8. Requirements

### 8.1. The "Stateless JWT" Strategy
- Sistem menggunakan JWT yang ditandatangani secara kriptografis (*signed*) tanpa menyimpan tabel sesi di database (Stateless). 
- Hal ini secara drastis mengurangi beban baca pada PostgreSQL setiap kali *route* dilindungi diakses.

### 8.2. Login Flow (Email/Password)
```mermaid
sequenceDiagram
    participant Klien (Browser)
    participant Auth.js (Server)
    participant Database

    Klien->>Auth.js: POST /login { email, pwd }
    Auth.js->>Database: Cari User berdasarkan Email
    Database-->>Auth.js: Mengembalikan Hash Password
    Auth.js->>Auth.js: Verifikasi via Argon2
    Auth.js->>Auth.js: Sign JWT (Payload: { userId, role })
    Auth.js-->>Klien: Set-Cookie: next-auth.session-token (HttpOnly, Secure)
```

### 8.3. OAuth Flow & Automatic Account Linking (Google)
- HomeLink 2.0 supports Google OAuth for authentication.
- **Automatic Linking:** By default, NextAuth prevents linking OAuth accounts to existing Email/Password accounts for security. However, since Google is a trusted provider that strictly verifies emails, we explicitly enable `allowDangerousEmailAccountLinking: true` in the Google Provider configuration.
- **UX Benefit:** This creates a seamless experience where users who previously registered with a password can click "Login with Google" and instantly access their existing account without encountering an `OAuthAccountNotLinked` error.

### 8.4. The Onboarding Gate (UX Interception)
- Segera setelah *login* (terutama melalui OAuth), *middleware* (`auth.config.ts`) akan memeriksa nilai atribut `isOnboarded` pada sesi JWT.
- Jika pengguna belum memilih peran (Role) pada saat pendaftaran awal (`isOnboarded: false`), mereka akan secara paksa diarahkan ke halaman `/onboarding`.
- Hal ini memastikan bahwa data peran pengguna di database akurat sejak detik pertama dan tidak ada *user* yang salah dasbor.

### 8.5. Security Mandates
- **XSS Protection:** Token Sesi TIDAK BOLEH dikirim dalam *response body* JSON untuk disimpan Klien di `localStorage`. Token HARUS dikirim eksklusif melalui *header* `Set-Cookie` dengan flag `HttpOnly=true` dan `Secure=true`.
- **CSRF Protection:** Setiap permintaan modifikasi data (`POST/PUT/DELETE`) dari *browser* harus diverifikasi token CSRF bawaan NextAuth.

## 9. Implementation
- Engineers must rely on the stable implementations provided by `Auth.js` rather than writing bespoke cryptography functions.
- The `allowDangerousEmailAccountLinking` flag must only be used for trusted OAuth providers (e.g., Google, Apple) that mandate email verification.
- Setiap rute halaman terlindungi (*Protected Routes*) harus dikecualikan dari `/onboarding` agar tidak terjadi *infinite loop*.

## 10. Acceptance Criteria
- [x] Clear prohibition of storing sensitive tokens in `localStorage`.
- [x] Sequence diagram illustrates the correct modern web auth flow.
- [x] Automatic account linking is documented and justified for trusted providers.
- [x] Pintu gerbang orientasi (Onboarding Gate) didokumentasikan untuk semua jenis login baru.

## 11. Future Improvements
- Implement Refresh Token rotation in Phase 3 if session lifetimes need to be extended safely.

## 12. References
- *Auth.js (NextAuth) Documentation*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.1.0   | 2026-07-29 | AI Engineer          | APPROVED | Added OAuth Account Linking documentation |
| 1.2.0   | 2026-07-29 | CPO & AI Engineer    | APPROVED | Added The Onboarding Gate documentation |

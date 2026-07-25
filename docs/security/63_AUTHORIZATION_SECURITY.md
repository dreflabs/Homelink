# 63. AUTHORIZATION SECURITY
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
Authorization & Access Control Standards

## 2. Purpose
Mengamankan setiap *resource* (Data/Fungsi) agar hanya bisa diakses oleh subjek yang memang memiliki hak atau kepemilikan atas *resource* tersebut.

## 3. Scope
- RBAC (Role-Based Access Control).
- ABAC / Ownership Checks (Row-Level Access).
- BOLA (Broken Object Level Authorization) Prevention.

## 4. Audience
- **Backend Engineers:** Untuk diimplementasikan di seluruh Route Handlers.

## 5. Dependencies
- `62_AUTHENTICATION_SECURITY.md` — otorisasi merupakan gerbang kedua setelah otentikasi berhasil dilakukan.
- `49_RLS_DOCUMENTATION.md` — klausa kepemilikan (ownership) pada bagian 8.2 diimplementasikan sejalan dengan strategi Row-Level Security di dokumen tersebut.
- Direferensikan oleh `64_OWASP_CHECKLIST.md` (A01:2021 - Broken Access Control).

## 6. Definitions
- **RBAC (Role-Based Access Control):** Model kontrol akses berdasarkan peran pengguna (Admin, Owner, Buyer).
- **ABAC (Attribute-Based Access Control):** Model kontrol akses berdasarkan atribut, termasuk kepemilikan (*ownership*) data.
- **BOLA/IDOR (Broken Object Level Authorization / Insecure Direct Object Reference):** Kerentanan saat pengguna dapat mengakses/mengubah *resource* milik orang lain hanya dengan menebak ID.

## 7. Architecture
Setiap *endpoint* API menerapkan model *default deny* (HTTP 401) kecuali terdaftar eksplisit dalam *whitelist*. Setelah lolos otentikasi, setiap operasi modifikasi data wajib melalui pemeriksaan kepemilikan (`verifyOwnership`) di *Controller/Service Layer* sebelum eksekusi query.

## 8. Requirements

### 8.1. The Principle of Default Deny
- Secara bawaan, seluruh API *endpoint* (kecuali yang secara eksplisit masuk dalam daftar *whitelist* seperti `/api/auth`) bersifat TERTUTUP (HTTP 401).
- Otentikasi hanyalah gerbang pertama. Gerbang kedua adalah Otorisasi (*Role Check*).

### 8.2. BOLA (Broken Object Level Authorization) Prevention
- Kesalahan paling mematikan dalam API adalah BOLA (dulu IDOR).
- **Contoh Ancaman:** *User* A memanggil `DELETE /api/properties/ID_MILIK_USER_B`.
- **Standar Wajib:** *Controller* tidak boleh menerima ID dari Klien dan langsung menghapusnya. Wajib menambahkan klausa kepemilikan.
  ```typescript
  // WAJIB ADA KONDISI INI DI SETIAP Kueri Modifikasi
  const result = await db.property.delete({
    where: { 
      id: propertyIdFromUrl,
      ownerId: session.userId // Proteksi BOLA
    }
  })
  ```

### 8.3. Administrative Boundaries
- Admin memiliki *bypass* untuk modifikasi data publik (Properti).
- Namun, Admin **DILARANG** secara sistem memodifikasi kata sandi *user* atau mengganti data dompet/rekening *user*. Jika *user* lupa *password*, Admin hanya bisa mengirimkan *link* Reset.

## 9. Implementation
- Buat *helper function* `verifyOwnership(resourceType, resourceId, userId)` untuk menyederhanakan kode *controller*.

## 10. Acceptance Criteria
- [x] Upaya mengubah ID pada URL untuk mengambil data orang lain menghasilkan *Error 404/403*, bukan 200 OK.

## 11. Future Improvements
- Fase 3: Evaluasi migrasi ke *policy engine* terpusat (misal Oso atau OPA) untuk menyatukan aturan RBAC/ABAC di luar kode *controller* individual.

## 12. References
- OWASP Top 10 (A01:2021)
- OWASP API Security Top 10 (BOLA)

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

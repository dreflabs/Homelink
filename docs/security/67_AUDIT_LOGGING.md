# 67. AUDIT LOGGING
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
Security & Audit Logging

## 2. Purpose
Menjaga catatan forensik tak terbantahkan mengenai siapa melakukan apa dan kapan, sangat berguna untuk investigasi insiden keamanan atau penyelesaian sengketa *user*.

## 3. Scope
- Log Aktivitas Admin.
- Log Perubahan Harga/Status Properti.

## 4. Audience
- **Backend Engineers & Super Admin**

## 5. Dependencies
- `61_THREAT_MODEL.md` — mitigasi *Repudiation* pada STRIDE Analysis bergantung pada pencatatan `AuditLog` yang dispesifikasikan di sini.
- `68_INCIDENT_RESPONSE.md` — tabel `AuditLog` menjadi sumber forensik utama saat investigasi Post-Mortem insiden.

## 6. Definitions
- **AuditLog:** Tabel *append-only* yang mencatat aksi sensitif pengguna/admin secara permanen.
- **Immutable/Append-only:** Sifat data yang hanya bisa ditambah, tidak bisa diubah atau dihapus.
- **JSONB:** Tipe data biner JSON pada PostgreSQL, digunakan untuk menyimpan `oldValues`/`newValues`.

## 7. Architecture
Tabel `AuditLog` bersifat *immutable/append-only* dengan kolom `actorId`, `action`, `entityId`, `oldValues`/`newValues` (JSONB), `ipAddress`, dan `createdAt`. Penulisan log dilakukan secara *asynchronous* via Node.js EventEmitter agar tidak memblokir transaksi utama.

## 8. Requirements

### 8.1. Struktur Log (Tabel `AuditLog`)
Tabel ini tidak boleh bisa diubah (*immutable/append-only*).
- `id` (UUID)
- `actorId` (ID Pengguna/Admin yang melakukan aksi)
- `action` (Teks konvensi: `UPDATE_PROPERTY_PRICE`, `APPROVE_VERIFICATION`)
- `entityId` (ID target yang diubah)
- `oldValues` (JSONB)
- `newValues` (JSONB)
- `ipAddress` (String)
- `createdAt` (Timestamp)

### 8.2. Kapan Log Dibuat?
Log **HARUS** dipicu pada kejadian berikut:
1. Admin menyetujui atau menolak verifikasi properti.
2. *Owner* mengubah harga properti (mencegah trik "Bait and Switch").
3. Upaya *login* gagal sebanyak 3 kali berturut-turut.
4. *Owner* mengubah nomor rekening pencairan dana.

## 9. Implementation
- Logging tidak boleh memblokir transaksi utama. Eksekusi penyimpanan *AuditLog* dilakukan secara *asynchronous* melalui Node.js EventEmitter.

## 10. Acceptance Criteria
- [x] Super Admin memiliki UI dasbor khusus untuk mencari (`Filter`) riwayat audit berdasarkan `actorId` atau `action`.

## 11. Future Improvements
- Fase 3: Mengirim salinan `AuditLog` secara real-time ke penyimpanan *append-only* eksternal (misal S3 Object Lock) untuk memperkuat ketahanan forensik terhadap kompromi database internal.

## 12. References
- OWASP Top 10 (A09:2021 - Security Logging and Monitoring Failures)

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

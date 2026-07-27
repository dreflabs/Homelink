# OWNER VERIFICATION PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Owner Verification (Verifikasi Identitas Owner)
**Module:** 08 INTERNAL HOMELINK AGENT
**Role:** Internal HomeLink Agent
**Purpose:** Memverifikasi identitas Owner baru (kecocokan KTP dengan data pendaftaran) sebelum mereka diizinkan mendaftarkan properti — lapisan kepercayaan terpisah dari verifikasi properti, mencegah akun palsu/fiktif membuat listing.

## 2. Next.js Routing Path
```text
app/(dashboard)/internal-agent/verification/owners/page.tsx
```
Sidebar label: "Verifikasi Owner", di bawah grup nav "Verifikasi & Dukungan".

## 3. Required UI Components (Shadcn/ui)
- `Table` — daftar Owner baru menunggu verifikasi identitas: nama, tanggal daftar, status.
- `Dropzone`/viewer — pratinjau dokumen KTP yang diunggah saat registrasi.
- `Button` (Approve/Reject).

## 4. Data & State Management
- **Gap skema:** `USER` di `40_ERD.md` tidak memiliki field status verifikasi identitas (mis. `identityVerificationStatus`) — ini adalah gap yang sama dengan yang dicatat di `11_admin/02_USER_MANAGEMENT.md` (tidak ada `accountStatus`/field suspensi di `USER`). Diusulkan perluasan `USER` dengan `identityVerificationStatus: UNVERIFIED | PENDING | VERIFIED | REJECTED`, bukan tabel terpisah.
- **Dokumen KTP:** proses registrasi (`02_authentication/02_REGISTER.md`) menyebutkan upload KTP, tapi penyimpanannya belum jelas — kemungkinan besar via `PROPERTY_MEDIA`-setara untuk user (belum ada entity `UserDocument`), dicatat sebagai gap terbuka yang sama pentingnya dengan field status di atas.
- Sampai kedua gap di atas tertutup, halaman ini tidak dapat diimplementasikan fungsional — merender pesan blocked yang jelas, bukan tabel kosong tanpa penjelasan.

## 5. API Endpoints Referenced
- Tidak ada endpoint terkait di `52_ENDPOINT_CATALOGUE.md` — seluruh alur (list Owner pending, lihat dokumen, approve/reject) menunggu skema §4.

## 6. Acceptance Criteria (DoD)
- [ ] Halaman secara eksplisit menyatakan status "menunggu skema identityVerificationStatus" di UI, bukan menampilkan tabel kosong tanpa konteks.
- [ ] Begitu skema tersedia: approve/reject wajib disertai audit trail (`AUDIT_LOG`, action `OWNER_IDENTITY_VERIFIED`/`OWNER_IDENTITY_REJECTED`), konsisten dengan pola `67_AUDIT_LOGGING.md`.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `IdCard` | Header halaman/dokumen KTP | 20px |
| `CheckCircle2` | Tombol Approve | 20px |
| `XCircle` | Tombol Reject | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.5 Internal Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

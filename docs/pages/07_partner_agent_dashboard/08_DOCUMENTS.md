# DOCUMENTS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Documents (Dokumen)
**Module:** 07 PARTNER AGENT DASHBOARD
**Role:** Partner Agent
**Purpose:** Akses dokumen legal properti kelolaan (untuk referensi saat presentasi ke calon pembeli) dan dokumen kerja sama agent-owner (surat penunjukan/listing agreement).

## 2. Next.js Routing Path
```text
app/(dashboard)/partner-agent/documents/page.tsx
```
Sidebar label: "Dokumen".

## 3. Required UI Components (Shadcn/ui)
- `Table` (`17_COMPONENT_LIBRARY.md` §8.3) — daftar dokumen: nama properti, jenis dokumen, tanggal upload.
- `Dropzone` — jika agent perlu mengunggah dokumen penunjukan dari owner (lihat gap §4).
- `EmptyState`.

## 4. Data & State Management
- **Yang sudah bisa berjalan hari ini:** dokumen legal properti (`PROPERTY_MEDIA.mediaType = PDF_CERTIFICATE`) sudah ada di ERD dan dapat ditampilkan read-only untuk properti kelolaan agent, setelah relasi Agent↔Property tersedia (`02_PROPERTY_MANAGEMENT.md` §4) — pola ini konsisten dengan `06_owner_dashboard/09_DOCUMENTS.md` yang memisahkan "yang sudah bisa" dari "yang butuh perluasan skema".
- **Gap skema:** dokumen penunjukan/listing agreement antara agent-owner tidak punya kategori di `PROPERTY_MEDIA.mediaType` (hanya `IMAGE`/`PDF_CERTIFICATE`) dan tidak jelas keterkaitannya ke entity mana — perlu didiskusikan apakah ini perluasan `PROPERTY_MEDIA` atau entity baru `AgentAgreement`, mengingat dokumen ini bukan milik properti melainkan milik relasi agent-owner.

## 5. API Endpoints Referenced
- `GET /api/v1/media?propertyId=...&mediaType=PDF_CERTIFICATE` — pola sudah ada, dipakai untuk dokumen legal read-only.
- Belum ada endpoint untuk dokumen penunjukan agent-owner — gap terbuka, keputusan skema diperlukan sebelum diusulkan.

## 6. Acceptance Criteria (DoD)
- [ ] Dokumen legal properti kelolaan tampil read-only (Partner Agent tidak berwenang mengubah dokumen legal, tetap wewenang Owner).
- [ ] Fitur upload dokumen penunjukan tidak dibangun sampai keputusan skema §4 diambil — bukan diimplementasikan sebagai upload generik tanpa struktur data yang jelas.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `FileText` | Baris dokumen legal | 20px |
| `FileSignature` | Dokumen penunjukan/listing agreement | 20px |
| `Download` | Aksi unduh per dokumen | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.4 Partner Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.

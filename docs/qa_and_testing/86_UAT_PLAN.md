# 86. UAT PLAN
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
**Feature Name:** User Acceptance Testing (UAT) Plan

## 2. Purpose
Fase akhir sebelum perilisan publik di mana pemangku kepentingan (*Stakeholder* / C-Level) mencoba langsung sistem dan menandatangani kesepakatan bahwa platform ini sudah memenuhi visi bisnis.

## 3. Scope
- Kriteria Peserta.
- Skenario Penerimaan.
- Prosedur Tanda Tangan (Sign-off).

## 4. Audience
- **CPO, CEO, dan Project Manager**

## 5. Dependencies
- `80_TEST_PLAN.md` — Exit Criteria dari Master Test Plan menjadi syarat masuk sebelum UAT dapat dimulai.
- `03_PRODUCT_REQUIREMENT_DOCUMENT_PRD.md` — visi bisnis dan pilar "Premium Experience" yang divalidasi selama sesi UAT.

## 6. Definitions
- **UAT** — *User Acceptance Testing*, pengujian penerimaan akhir oleh pemangku kepentingan bisnis.
- **Black Box Testing** — metode pengujian tanpa pengetahuan detail internal sistem, hanya berdasarkan input/output.
- **Sign-off** — persetujuan formal tertulis yang menandai penerimaan hasil pengujian.
- **UX Friction** — kebingungan atau hambatan pengalaman pengguna yang dicatat terpisah dari bug teknis.

## 7. Architecture
N/A — dokumen ini bersifat prosedural/manajerial, dilakukan di lingkungan Staging tanpa arsitektur teknis khusus.

## 8. Requirements

### 8.1. Peserta UAT
UAT tidak dilakukan oleh QA atau *Engineer* (mereka punya bias). UAT dilakukan oleh:
- Product Manager (sebagai perwakilan Pembeli).
- Tim Sales/Marketing Internal (sebagai perwakilan Pemilik/Agen).
- CPO / CEO (sebagai validasi akhir pilar "Premium Experience").

### 8.2. Metode UAT (Black Box Murni)
- Dilakukan di lingkungan *Staging*.
- Penguji tidak diberi tahu teknisnya. Mereka hanya diberikan perangkat *Mobile* dan *Desktop*, serta daftar tugas (misal: "Cobalah cari rumah senilai 5 Miliar dan atur jadwal besok siang").
- Segala bentuk kebingungan (UX *friction*) dicatat, bukan langsung dianggap sebagai *Bug* aplikasi.

### 8.3. Sign-off Protocol
- Jika ada *bug* pemblokir kritis (misal: pendaftaran OTP selalu gagal), UAT dibatalkan dan dikembalikan ke tim *Engineer* (Status: UAT FAILED).
- Jika hanya ada perbaikan kosmetik minor, UAT dapat ditandatangani (*Sign-off*) dengan syarat perbaikan minor masuk ke siklus *Sprint* setelah rilis MVP (Status: APPROVED WITH NOTES).

## 9. Implementation
- PM bertugas menyediakan Lembar Ceklis (*Checklist* Excel/Notion) bagi setiap penguji UAT sebelum sesi dimulai.

## 10. Acceptance Criteria
- [x] Rilis *Production* 1.0 tidak boleh dieksekusi tanpa bukti digital tertulis (pesan Slack/Email) persetujuan dari CPO/CEO.

## 11. Future Improvements
- Menstandardisasi Lembar Ceklis UAT ke dalam template Notion terformat agar hasil dan catatan *friction* lebih mudah dianalisis lintas rilis.

## 12. References
- Notion Documentation
- Excel Checklist Template

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

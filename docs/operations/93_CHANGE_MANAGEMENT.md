# 93. CHANGE MANAGEMENT
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
Change Management Process

## 2. Purpose
Mengatur bagaimana permintaan fitur baru (atau perubahan radikal pada fitur lama) dari pemangku kepentingan (*Stakeholder* / CPO) disetujui, didokumentasikan, dan dikerjakan tanpa mengacaukan prioritas tim *Engineer*.

## 3. Scope
- Change Request (CR) Form.
- Backlog Prioritization.

## 4. Audience
- **Project Manager, C-Level, CTO**

## 5. Dependencies
- `92_RELEASE_MANAGEMENT.md` — Change Request yang disetujui pada akhirnya mengikuti alur rilis (SemVer, Feature Toggle) yang diatur dokumen tersebut.
- Seluruh dokumen bernomor di corpus (`business_and_product/`, `ux_and_design/`, `system_and_software/`, `database_architecture/`, `api_architecture/`, `security/`, `devops/`, `qa_and_testing/`, `operations/`, dan folder `pages/`) — target sinkronisasi SSoT wajib setiap kali CR disetujui.

## 6. Definitions
- **CR:** Change Request, permintaan perubahan fitur atau desain sistem yang diajukan Stakeholder/CPO.
- **CPO:** Chief Product Officer, salah satu pihak yang dapat mengajukan CR.
- **SSoT:** Single Source of Truth, dokumen master bernomor yang menjadi rujukan tunggal spesifikasi sistem.
- **Sign-off:** Persetujuan resmi dari C-Level sebelum CR dikerjakan.

## 7. Architecture
N/A — dokumen ini bersifat prosedural (proses manajemen perubahan), bukan spesifikasi arsitektur teknis.

## 8. Requirements

### 8.1. Change Request (CR) Flow
Perubahan besar (misal: "Mari kita ubah algoritma pencarian dari AI menjadi Filter Manual murni") tidak boleh disampaikan hanya via obrolan Slack.
1. **Pengajuan:** CPO/Stakeholder membuat Tiket "Change Request" di Linear/Jira.
2. **Evaluasi Dampak:** CTO dan PM mengukur dampaknya: Berapa hari kerja? Fitur mana yang harus dikorbankan (*deprioritized*) dari *Sprint* saat ini untuk mengakomodasi ini?
3. **Persetujuan (Sign-off):** Jika C-Level menyetujui penundaan fitur lain demi mengerjakan CR ini, baru perubahan dimasukkan ke papan Kanban *In Progress*.

### 8.2. Disiplin Dokumentasi (SSoT Sync)
- Ini adalah aturan paling krusial bagi kelangsungan ekosistem AI: **Setiap kali desain sistem, ERD, atau struktur modul diubah karena adanya Change Request, seluruh DOKUMEN MASTER bernomor (Dokumen 01 hingga 93, di seluruh folder `business_and_product/`, `ux_and_design/`, `system_and_software/`, `database_architecture/`, `api_architecture/`, `security/`, `devops/`, `qa_and_testing/`, dan `operations/`) HARUS SEGERA DIPERBARUI, TERMASUK folder `pages/`.**
- **Catatan v1.0.1:** Folder `pages/` (spesifikasi per halaman) sebelumnya tidak disebutkan secara eksplisit dalam aturan sinkronisasi ini meskipun merupakan folder terbesar dalam korpus dokumentasi. Setiap Change Request yang menambah/mengubah field data, state, atau endpoint pada suatu halaman **WAJIB** memperbarui file `pages/` yang relevan, bukan hanya dokumen arsitektur bernomor.
- Jika kode di-*update* tetapi SSoT (Spesifikasi) dibiarkan usang (*outdated*), agen AI di masa depan yang mengandalkan dokumen tersebut untuk pemahaman sistem akan menghasilkan *bug*.

## 9. Implementation
- Masukkan *checkbox* wajib di GitHub Pull Request: `[ ] Saya telah memperbarui dokumentasi Markdown jika PR ini merubah arsitektur sistem`.

## 10. Acceptance Criteria
- [x] Sinkronisasi Dokumentasi SSoT sebagai syarat mutlak (*hard requirement*) penyesuaian kode diakui secara tertulis.
- [x] Cakupan folder `pages/` disebutkan secara eksplisit dalam aturan sinkronisasi.

## 11. Future Improvements
- Menambahkan pemeriksaan otomatis (CI check) yang memvalidasi apakah checkbox dokumentasi pada Pull Request telah dicentang sebelum merge diizinkan, menggantikan disiplin manual semata.

## 12. References
- N/A

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Referensi "Dokumen 01 hingga 92" dikoreksi (korpus kini berjumlah 93 dokumen bernomor); folder `pages/` ditambahkan secara eksplisit ke aturan sinkronisasi SSoT. |
| 1.0.2   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian penuh (section numbering disesuaikan dari 7 ke 13). |

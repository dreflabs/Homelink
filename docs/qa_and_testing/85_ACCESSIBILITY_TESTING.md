# 85. ACCESSIBILITY TESTING
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
**Feature Name:** Web Accessibility (a11y) Testing

## 2. Purpose
Menjamin bahwa antarmuka HomeLink 2.0 dapat diakses dengan mudah oleh semua lapisan masyarakat, termasuk difabel netra (menggunakan pembaca layar/Screen Reader) atau difabel motorik (navigasi dengan Keyboard).

## 3. Scope
- WCAG 2.1 AA Compliance.
- Keyboard Navigation.
- Color Contrast.

## 4. Audience
- **QA Engineers & Frontend Engineers**

## 5. Dependencies
- `25_ACCESSIBILITY_SPECIFICATION.md` (ux_and_design) — spesifikasi desain aksesibilitas yang menjadi acuan standar pengujian ini.
- `79_QA_STRATEGY.md` — payung strategi QA global tempat pengujian aksesibilitas menjadi salah satu gerbang kualitas CI.

## 6. Definitions
- **a11y** — singkatan numeronim untuk *accessibility*.
- **WCAG 2.1 AA** — *Web Content Accessibility Guidelines* versi 2.1, level kepatuhan AA.
- **ARIA** — *Accessible Rich Internet Applications*, atribut HTML untuk meningkatkan aksesibilitas komponen dinamis.
- **Keyboard Trap** — kondisi cacat UX di mana pengguna tidak bisa keluar dari suatu elemen/modal hanya dengan keyboard.
- **Screen Reader** — perangkat lunak pembaca layar bagi pengguna difabel netra.

## 7. Architecture
Audit otomatis via axe DevTools dan `eslint-plugin-jsx-a11y` terintegrasi dalam siklus CI, dilengkapi audit manual navigasi keyboard dan screen reader; komponen UI dibangun di atas Shadcn/ui dan Radix Primitives yang sudah patuh standar a11y.

## 8. Requirements

### 8.1. Automated Auditing
- Menggunakan ekstensi **axe DevTools** atau pustaka `eslint-plugin-jsx-a11y` dalam siklus CI untuk mencegah komponen tanpa atribut ARIA didorong ke cabang utama.
- Skor Aksesibilitas Lighthouse **HARUS** $\ge 90$ untuk seluruh halaman publik.

### 8.2. Manual Testing (Keyboard-Only)
QA Engineer wajib menelusuri alur "Mencari Rumah hingga Pesan Jadwal Survei" TANPA menyentuh *mouse/trackpad* sama sekali.
- Elemen interaktif (*Link, Button, Form*) harus memiliki cincin fokus (*Focus Ring*) yang jelas.
- Tidak boleh ada "Jebakan Keyboard" (*Keyboard Trap*) di mana pengguna terjebak di dalam suatu *Modal/Dialog* dan tidak bisa keluar dengan tombol `Esc`.

### 8.3. Screen Reader Optimization
- Komponen visual murni (seperti ikon hati atau gambar ornamen) harus disembunyikan dari pembaca layar menggunakan `aria-hidden="true"`.
- Setiap gambar properti harus memiliki atribut `alt` yang dihasilkan secara kontekstual (misal: `alt="Fasad depan Rumah Minimalis BSD dengan taman"`).

## 9. Implementation
- Pustaka Shadcn/ui dan Radix Primitives sudah mengadopsi standar a11y terbaik. Hindari membuat komponen *Dropdown/Modal* kustom dari awal (menggunakan `div`) jika pustaka sudah menyediakannya.

## 10. Acceptance Criteria
- [x] Tidak ada insiden jebakan keyboard (*keyboard traps*) di seluruh modul kritis.

## 11. Future Improvements
- Menargetkan kepatuhan WCAG 2.2 dan menambahkan pengujian dengan pengguna difabel nyata (*user testing*) di luar audit otomatis.

## 12. References
- WCAG 2.1
- axe DevTools Documentation
- Radix Primitives Documentation

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |

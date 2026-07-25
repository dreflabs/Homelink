# 25. ACCESSIBILITY SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Web Accessibility (a11y) Specification

## 2. Purpose
To ensure that HomeLink 2.0 is usable by everyone, including people with visual, auditory, motor, or cognitive disabilities, adhering to international compliance standards.

## 3. Scope
Covers WCAG 2.1 Level AA compliance, ARIA attributes, semantic HTML, and keyboard navigation.

## 4. Audience
- **Frontend Engineers:** For implementing semantic HTML and ARIA labels.
- **QA Engineers:** For accessibility auditing (Lighthouse, Axe).
- **Designers:** For color contrast validation.

## 5. Dependencies
- Overrides `15_DESIGN_SYSTEM.md` if color contrast rules fail.

## 6. Definitions
- **WCAG:** Web Content Accessibility Guidelines.
- **ARIA:** Accessible Rich Internet Applications.
- **Screen Reader:** Assistive technology that reads on-screen text aloud (e.g., VoiceOver, NVDA).

## 7. Architecture
React DOM semantics and Radix UI accessible primitives.

## 8. Requirements

### 8.1. Color Contrast (WCAG AA)
- Teks reguler (di bawah 18pt) HARUS memiliki rasio kontras minimum **4.5:1** terhadap latar belakangnya.
- Teks besar (18pt ke atas atau 14pt tebal) HARUS memiliki rasio kontras minimum **3:1**.
- Komponen UI non-teks (seperti batas *input* atau ikon aktif) HARUS memiliki kontras minimum **3:1**.

### 8.2. Keyboard Navigation
- **Focus Indicators:** Setiap elemen interaktif (tautan, tombol, input) HARUS memiliki indikator fokus yang terlihat jelas saat diakses melalui *keyboard* (`focus-visible:ring-2 focus-visible:ring-emerald-500`).
- **Tab Order:** Urutan `Tab` harus logis, mengikuti alur baca visual (kiri-ke-kanan, atas-ke-bawah).
- **Skip Links:** Halaman utama HARUS memiliki tautan tersembunyi "Skip to main content" untuk melewati navigasi header bagi pengguna *screen reader*.

### 8.3. Screen Reader Optimization
- Seluruh gambar (termasuk foto properti dari R2) HARUS memiliki atribut `alt` yang deskriptif. (Misal: `alt="Tampak depan rumah minimalis 2 lantai dengan taman kecil"`).
- Komponen interaktif kustom (seperti Modal dan Accordion) HARUS menggunakan atribut ARIA yang sesuai (`aria-expanded`, `aria-hidden`, `aria-modal="true"`, `role="dialog"`). Penggunaan shadcn/ui otomatis memenuhi standar ini.

## 9. Implementation
- CI/CD pipeline must include an automated accessibility testing step (e.g., `axe-core`) that fails the build if critical WCAG violations are detected.

## 10. Acceptance Criteria
- [x] Strict contrast ratios are defined.
- [x] Keyboard and screen reader requirements are actionable by engineers.

## 11. Future Improvements
- Upgrade to WCAG 2.2 Level AAA compliance for government or public housing integrations.

## 12. References
- *W3C Web Content Accessibility Guidelines (WCAG) 2.1*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

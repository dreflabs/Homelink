# 24. RESPONSIVE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Responsive Design & Fluid Layout Specification

## 2. Purpose
To ensure the HomeLink 2.0 platform functions flawlessly across all device sizes, from small mobile phones to ultra-wide desktop monitors, maintaining the premium aesthetic on every viewport.

## 3. Scope
Covers breakpoint definitions, grid behaviors, and touch-target requirements for mobile devices.

## 4. Audience
- **Frontend Engineers:** For applying Tailwind responsive prefixes (`sm:`, `md:`, `lg:`).
- **QA Engineers:** For cross-device testing matrix.

## 5. Dependencies
- Works in tandem with `21_WIREFRAME_SPECIFICATION.md`.

## 6. Definitions
- **Mobile-First:** The practice of writing base CSS for mobile devices first, and scaling up using `min-width` breakpoints.

## 7. Architecture
Tailwind CSS fluid utilities and breakpoint system.

## 8. Requirements

### 8.1. Tailwind Breakpoints (Default)
- **Base (Mobile):** $< 640px$ (Smartphones).
- **`sm` (Small):** $\ge 640px$ (Large Phones / Small Tablets).
- **`md` (Medium):** $\ge 768px$ (Tablets / iPad Portrait).
- **`lg` (Large):** $\ge 1024px$ (Laptops / iPad Landscape).
- **`xl` (Extra Large):** $\ge 1280px$ (Desktop Monitors).
- **`2xl` (Ultra Wide):** $\ge 1536px$.

### 8.2. Grid Transformation Rules
- **Property Grid (Homepage):**
  - Base (Mobile): 1 Kolom (`grid-cols-1`).
  - `md`: 2 Kolom (`md:grid-cols-2`).
  - `lg`: 3 Kolom (`lg:grid-cols-3`).
  - `xl`: 4 Kolom (`xl:grid-cols-4`).
- **Property Detail Page:**
  - Base (Mobile): Stacked (1 Kolom). Gambar $\rightarrow$ Judul $\rightarrow$ CTA $\rightarrow$ Deskripsi.
  - `lg`: 65% / 35% Split Column. CTA Box menjadi *sticky* di sebelah kanan.

### 8.3. Mobile-Specific Adjustments
- **Touch Targets:** Seluruh tombol dan elemen interaktif di mobile (Base & `sm`) HARUS memiliki area tap minimum $44px \times 44px$ sesuai standar Apple Human Interface Guidelines.
- **Navigation:** Global Header dihilangkan tautan utamanya pada mobile, digantikan oleh menu Hamburger yang membuka modal layar penuh, atau Bottom Navigation Bar (Bottom Sheet).
- **Hover States:** Segala interaksi berbasis `hover:` harus dinonaktifkan atau diganti dengan status `active:` pada perangkat layar sentuh (`@media (hover: none)`).

## 9. Implementation
- Engineers must strictly adhere to the Mobile-First paradigm. Classes without prefixes represent mobile styles.

## 10. Acceptance Criteria
- [x] Breakpoints are explicitly defined.
- [x] Grid column behaviors are mapped across all breakpoints.
- [x] Mobile touch accessibility is mandated.

## 11. Future Improvements
- Native iOS and Android application UI mapping.

## 12. References
- *Apple Human Interface Guidelines (Touch Targets)*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

# 21. WIREFRAME SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Wireframe Structural Specification

## 2. Purpose
To define the skeletal framework (layout and spacing) of the core screens before visual design elements (colors, typography) are applied. This focuses purely on layout logic and structural hierarchy.

## 3. Scope
Covers the structural layout of the Homepage (SCR-001) and Property Detail Page (SCR-003).

## 4. Audience
- **UI Designers:** For converting wireframes into high-fidelity mockups.
- **Frontend Engineers:** For defining CSS Grid / Flexbox structures.

## 5. Dependencies
- Dependent on `14_UX_BLUEPRINT.md` and `19_INFORMATION_ARCHITECTURE.md`.

## 6. Definitions
- **Above-the-fold:** The portion of a webpage that is visible without scrolling.
- **Z-Pattern:** A layout pattern that follows the natural eye movement of users reading from left to right, top to bottom.

## 7. Architecture
Frontend layouts utilize Tailwind CSS Flexbox and CSS Grid.

## 8. Requirements

### 8.1. Homepage Layout Specification (Desktop)
**Section 1: Sticky Header (Height: 72px)**
- Left: Brand Logo.
- Center: Global Navigation Links.
- Right: Authentication/Profile Button.

**Section 2: Hero & AI Search (Above-the-fold, Height: 80vh)**
- Background: Minimalist clean color or subtle blurred property image.
- Center Vertical/Horizontal:
  - Heading 1 (Large, Bold): "Properti Terverifikasi 100%."
  - Subtitle: "Pencarian pintar tanpa ghost listing."
  - Search Box (Width: Max 800px): Massive input field with a prominent Search button.

**Section 3: Verified Property Grid (Below-the-fold)**
- Section Heading: "Koleksi Terverifikasi Terbaru"
- Grid Layout: 3 atau 4 kolom (`grid-cols-3` atau `grid-cols-4`) dengan celah lebar (`gap-8`).

### 8.2. Property Detail Page Specification
**Section 1: Media Gallery**
- Layout: Asimetris ala Airbnb. Gambar utama besar di kiri (60% width), 2 gambar grid ditumpuk di kanan (40% width).
- Height: 500px maksimum dengan `object-cover`.

**Section 2: Content Split (2-Column Layout)**
- **Left Column (65% width):**
  - Header: Judul, Alamat, Lencana Verifikasi.
  - Specs Bar: Ikon Kamar, Kamar Mandi, Luas Tanah.
  - Deskripsi Teks.
  - Laporan Dokumen Legal.
- **Right Column (35% width, Sticky):**
  - Kotak harga besar (Price Box).
  - Kalender interaktif untuk memilih tanggal.
  - Tombol CTA raksasa: "Jadwalkan Survey Lokasi".

## 9. Implementation
- Frontend engineers must strictly enforce the 65/35 column split for the Property Detail page on desktop using Tailwind Grid (`grid-cols-12`, `col-span-8` and `col-span-4`).

## 10. Acceptance Criteria
- [x] Layout specs define relative proportions (percentages/grids) rather than absolute pixel values for flexibility.
- [x] Clear structural hierarchy is established for the most critical screens.

## 11. Future Improvements
- N/A

## 12. References
- *Tailwind CSS Grid Documentation*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

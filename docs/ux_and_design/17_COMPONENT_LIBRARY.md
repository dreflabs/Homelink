# 17. COMPONENT LIBRARY
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Component Library Specification

## 2. Purpose
To catalogue all reusable React UI components. This ensures DRY (Don't Repeat Yourself) principles in frontend engineering and guarantees visual consistency.

## 3. Scope
Covers base UI primitives (buttons, inputs) and complex composite components (property cards, headers).

## 4. Audience
- **Frontend Engineers:** As the primary technical reference for building UI.
- **Designers:** To match Figma components 1:1 with code components.

## 5. Dependencies
- Depends on `15_DESIGN_SYSTEM.md` and uses `shadcn/ui` as the foundational layer.

## 6. Definitions
- **shadcn/ui:** A collection of re-usable components built using Radix UI and Tailwind CSS.
- **Variant:** A specific stylistic iteration of a component (e.g., "destructive", "outline").

## 7. Architecture
Components are built using React 19, Tailwind CSS v4, `clsx`, `tailwind-merge`, and `class-variance-authority` (CVA). Located in `src/components/ui/` and `src/components/shared/`.

## 8. Requirements

### 8.1. Base Primitives (shadcn/ui customized)
1. **Button (`<Button />`)**
   - *Variants:* `default` (Slate), `verified` (Emerald), `outline` (Glass/Border), `ghost`.
   - *Sizes:* `sm`, `default`, `lg`, `icon`.
   - *Behavior:* Mendukung prop `isLoading` yang menampilkan *spinner* dan me-nonaktifkan klik.
2. **Input (`<Input />`)**
   - *States:* Default, Hover, Focus (Ring Emerald-500), Error (Ring Red-500).
   - *Behavior:* Mendukung *left icon* (misal: ikon *Search*).
3. **Badge (`<Badge />`)**
   - *Variants:* `verified` (Hijau tebal dengan ikon centang), `pending` (Kuning/Amber), `default` (Abu-abu).

### 8.2. Composite Components
1. **PropertyCard (`<PropertyCard />`)**
   - *Props:* `title`, `price`, `address`, `specs (bed, bath, area)`, `imageUrl`, `isVerified`, `isFeatured`.
   - *Behavior:* Hover memicu pembesaran gambar (*scale 1.05*) dan mengangkat efek bayangan (*shadow-xl*). Jika `isVerified` bernilai true, merender `<Badge variant="verified">` di sudut kiri atas.
2. **SearchHero (`<SearchHero />`)**
   - *Props:* `onSearchSubmit`.
   - *Behavior:* *Input field* besar terpusat dengan teks *placeholder* beranimasi (efek mengetik: *"Cari rumah di BSD...", "Rumah 2 Miliar..."*).

## 9. Implementation
- Frontend developers must use `class-variance-authority` (CVA) to define component variants cleanly.
- Strict mapping between Figma Component Properties and React Component Props.

## 10. Acceptance Criteria
- [x] All components use Tailwind classes mapped to the Design System tokens.
- [x] Components are modular and do not contain business logic (Pure/Dumb components).

## 11. Future Improvements
- Integrate Storybook to visualize and test components in isolation.

## 12. References
- *shadcn/ui documentation*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

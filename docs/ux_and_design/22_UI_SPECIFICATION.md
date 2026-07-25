# 22. UI SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 User Interface (UI) Specification

## 2. Purpose
To define the exact visual properties, state changes, and rendering constraints for all user interface elements. This bridges the gap between Wireframes (layout) and the Design System (tokens).

## 3. Scope
Covers form elements, input states, z-index stacking, and visual error states across the application.

## 4. Audience
- **Frontend Engineers:** For exact CSS/Tailwind implementation.
- **QA Engineers:** For visual regression testing.

## 5. Dependencies
- Dependent on `15_DESIGN_SYSTEM.md` and `21_WIREFRAME_SPECIFICATION.md`.

## 6. Definitions
- **Z-Index:** The z-order of an element and its descendants.
- **Visual Weight:** How much an element draws the user's eye.

## 7. Architecture
Implemented via Tailwind CSS utility classes in Next.js.

## 8. Requirements

### 8.1. Z-Index Stacking Context
To prevent overlapping issues, the application strictly adheres to the following z-index scale:
- `z-0` to `z-10`: Base page content (Text, Cards, Images).
- `z-20`: Sticky Headers / Glassmorphism Navigations.
- `z-30`: Dropdown Menus & Select Popovers.
- `z-40`: Overlays & Backdrops (bg-black/50).
- `z-50`: Modals, Dialogs, & Lightboxes.
- `z-100`: Toast Notifications (Sonner/Hot Toast).

### 8.2. Input Field States
- **Default:** `border-slate-200 bg-white text-slate-900`.
- **Hover:** `border-slate-300`.
- **Focus:** `border-emerald-500 ring-2 ring-emerald-500/20 outline-none`.
- **Error:** `border-red-500 ring-2 ring-red-500/20 text-red-900`. (Must be accompanied by a red error message below the input).
- **Disabled:** `bg-slate-50 text-slate-400 cursor-not-allowed opacity-50`.

### 8.3. Button States
- **Primary Button:**
  - Default: `bg-slate-900 text-white shadow-sm`.
  - Hover: `bg-slate-800 shadow-md`.
  - Active/Click: `scale-95 bg-slate-950`.
  - Loading: Disables click, text opacity 0, displays a centered `animate-spin` SVG loader.

## 9. Implementation
- Frontend engineers must use Radix UI primitives (via shadcn/ui) to ensure state management (focus-visible, hover) is handled robustly across all browsers.

## 10. Acceptance Criteria
- [x] Defines specific Tailwind utility classes for all interaction states.
- [x] Establishes a strict global Z-index hierarchy.

## 11. Future Improvements
- Add Dark Mode specific state overrides.

## 12. References
- *Radix UI Documentation*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

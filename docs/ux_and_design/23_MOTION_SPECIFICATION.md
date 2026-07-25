# 23. MOTION SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Motion & Animation Specification

## 2. Purpose
To standardize all animations and micro-interactions within the application. Consistent motion reduces cognitive load, directs user attention, and provides the "Apple-Level" premium feel.

## 3. Scope
Covers page transitions, component micro-interactions (hover, click), and loading states.

## 4. Audience
- **Frontend Engineers:** For implementation using Framer Motion and Tailwind CSS.
- **UI Designers:** For prototyping in Figma.

## 5. Dependencies
- Dependent on `16_HOMELINK_DESIGN_LANGUAGE_HDL.md`.

## 6. Definitions
- **Spring Animation:** An animation physics model based on stiffness, damping, and mass, resulting in a natural, bouncy feel.
- **Easing:** The mathematical curve defining the speed of an animation over time.

## 7. Architecture
Powered by `framer-motion` for complex physics and `tailwindcss` transitions for simple state changes.

## 8. Requirements

### 8.1. Global Timing & Easing Rules
- **Fast (Micro-interactions):** $150ms - 200ms$. Easing: `ease-out`. (e.g., Button hover, Input focus).
- **Medium (Component Entrance):** $300ms - 400ms$. Easing: `cubic-bezier(0.16, 1, 0.3, 1)`. (e.g., Modal opening, Dropdown appearing).
- **Slow (Page Transitions):** $500ms - 600ms$. Easing: `ease-in-out`.

### 8.2. Framer Motion Specs (Springs)
Sebagian besar modal dan elemen yang muncul dari luar layar harus menggunakan animasi tipe *spring* (pegas) alih-alih linear.
- **Standard Spring:** `type: "spring", stiffness: 300, damping: 30`.
- **Bouncy Spring (Success Badges):** `type: "spring", stiffness: 400, damping: 10`.

### 8.3. Specific Interactions
- **Property Card Hover:**
  - Container: `transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1`.
  - Image Thumbnail: `scale-100 hover:scale-105 transition-transform duration-500`.
- **Page Entrance (Staggered Children):**
  - Parent Container: `initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}`.
  - Child Elements: Fade in and slide up (`y: 20` to `y: 0`, `opacity: 0` to `opacity: 1`).

## 9. Implementation
- Engineers must wrap the Next.js `AppRouter` in an `AnimatePresence` to enable exit animations for page transitions.
- Must respect user's OS-level "Reduce Motion" preference (`prefers-reduced-motion: reduce`).

## 10. Acceptance Criteria
- [x] Specifies precise timing, easing, and physics settings.
- [x] Mandates accessibility compliance for motion sensitivity.

## 11. Future Improvements
- Implement complex scroll-linked animations for marketing landing pages in Phase 3.

## 12. References
- *Framer Motion Documentation*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

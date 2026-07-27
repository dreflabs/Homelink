# 23. MOTION SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Motion & Animation Specification

## 2. Purpose
To standardize every animation and micro-interaction in the application as the sole canonical source of timing/easing/physics values (`16_HOMELINK_DESIGN_LANGUAGE_HDL.md` states *why* motion matters; this document states the exact numbers, and every other document — `17_COMPONENT_LIBRARY.md` in particular — references these values instead of restating them).

## 3. Scope
Covers global timing/easing tiers, spring physics, and per-trigger motion specs: Hover, Focus, Press, Drawer, Dialog, Toast, Loading, Skeleton, plus page transitions and motion hierarchy.

## 4. Audience
- **Frontend Engineers:** For implementation using Framer Motion and Tailwind CSS transitions.
- **UI Designers:** For prototyping in Figma with matching timing.

## 5. Dependencies
- Dependent on `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` §8.3 (Premium Motion Philosophy — the *why* behind every value below) and `25_ACCESSIBILITY_SPECIFICATION.md` (reduced-motion requirement, cross-linked in §9).

## 6. Definitions
- **Spring Animation:** Animation physics based on stiffness, damping, and mass, producing a natural, non-linear feel.
- **Easing:** The mathematical curve defining animation speed over time.
- **Motion hierarchy:** The principle that an element's visual importance determines how much motion attention it receives — primary transitions get more deliberate motion, incidental UI gets none.

## 7. Architecture
`framer-motion` for spring/physics-based animation, Tailwind CSS `transition-*` utilities for simple state changes. `AnimatePresence` wraps the Next.js App Router root to enable exit animations on route change.

## 8. Requirements

### 8.1. Global Timing & Easing Tiers
- **Fast (micro-interactions):** 150–200ms, `ease-out`. Button hover, Input focus, Checkbox/Switch toggle, Badge render.
- **Medium (component entrance):** 300–400ms, `cubic-bezier(0.16, 1, 0.3, 1)`. Modal opening, Dropdown appearing, Drawer/Sheet slide-in.
- **Slow (page transitions):** 500–600ms, `ease-in-out`. Full route changes.

### 8.2. Spring Physics
- **Standard Spring:** `type: "spring", stiffness: 300, damping: 30` — used for most modal/off-screen entrances (Dialog panel, Drawer/Sheet).
- **Bouncy Spring (success moments only):** `type: "spring", stiffness: 400, damping: 10` — reserved exclusively for genuine success confirmations (a booking confirmed, a document verified). Never used for routine entrances — overusing the bouncy spring cheapens the moments it's meant to highlight (`16` §8.3).

### 8.3. Per-Trigger Motion Specification

| Trigger | Timing/Easing | Notes |
| :--- | :--- | :--- |
| **Hover** | Fast tier (150–200ms, `ease-out`) | Applies to Button, Card lift (`-translate-y-1`), PropertyCard image `scale-105` over `duration-500` (image scale is intentionally slower than the card's own shadow/lift transition, so the zoom reads as a distinct, slightly delayed layer of feedback). |
| **Focus** | Fast tier | Ring fade-in on `focus-visible`, identical timing across Input/Button/Checkbox/Switch (`22` §8.2–8.4). |
| **Press (Active)** | Instant-to-Fast (~100ms) | Button `scale-95`, no easing curve needed at this duration — a linear snap reads as more responsive than an eased press. |
| **Drawer / Sheet** | Medium tier, Standard Spring | Slides in from the relevant edge (`17` §8.2); exit reverses the same spring, not a separate easing curve. |
| **Dialog** | Medium tier, Standard Spring | Backdrop fades (Fast tier, opacity only) while the panel scales `0.95→1` + fades on the Standard Spring — the two layers are intentionally decoupled so the backdrop feels immediate and the panel feels weighted. |
| **Toast** | Fast tier entrance, Fast tier fade-out exit | Slides in from top-right (desktop)/top-center (mobile); auto-dismiss timer is a display duration, not an animation value (see `17` §8.2 Toast: 4s info, 6s error). |
| **Loading (spinner)** | Continuous `animate-spin`, no easing (linear rotation) | Used inside Button loading state and any inline async indicator. |
| **Skeleton** | `2s` ease-in-out infinite pulse (canonical duration — previously mandated by `16` with no duration specified; fixed here as the single source) | Opacity pulses between `100%` and `60%`, never a shimmer/gradient sweep (a flat pulse reads calmer and more "Apple-like" than a shimmer sweep, per `16` §8.2). |

### 8.4. Composite Interactions
- **PropertyCard Hover** (canonical — `17_COMPONENT_LIBRARY.md` references this entry rather than restating it): Container `transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1`; Image `scale-100 hover:scale-105 transition-transform duration-500`.
- **Page Entrance (staggered children):** Parent: `initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}`. Children: fade + slide up (`y: 20→0`, `opacity: 0→1`), each using the Medium tier curve.
- **Route transitions:** Outgoing page fades out over Fast tier while the incoming page fades+slides in over the Slow tier — asymmetric timing so the exit never feels like it's blocking the entrance.

### 8.5. Motion Hierarchy
When multiple elements animate simultaneously, priority is: (1) the element the user's action directly targets moves first and fastest (Fast tier), (2) contextual chrome that responds to that action moves second (Medium tier — e.g. a Dialog opening because of a button click), (3) passive/ambient content (staggered list entrances, skeleton pulses) moves last and slowest. An element never animates with more emphasis than the action that triggered it — e.g. a Toast confirming a save must never use the Bouncy Spring, since that would out-emphasize the save action itself.

## 9. Implementation
- Engineers must wrap the Next.js `AppRouter` in `AnimatePresence` to enable exit animations for page transitions.
- Every animation in this document MUST respect `prefers-reduced-motion: reduce` — when set, Medium/Slow tier transitions and all spring physics collapse to an instant opacity-only cross-fade (~100ms), and the Skeleton pulse/spinner rotation continue (they communicate state, not decoration) but at reduced visual intensity. This requirement is cross-linked from `25_ACCESSIBILITY_SPECIFICATION.md`, which should reference this section directly rather than leaving reduced-motion as an unstated assumption.

## 10. Acceptance Criteria
- [x] Specifies precise timing, easing, and physics settings for every trigger type named in the mission (Hover, Focus, Press, Drawer, Dialog, Toast, Loading, Skeleton).
- [x] Skeleton pulse duration, previously unspecified, is now fixed at 2s (§8.3).
- [x] States an explicit motion hierarchy (§8.5) resolving which element "wins" when several animate together.
- [x] Is the single referenced source for PropertyCard hover timing — `17` no longer restates a slightly different version.
- [x] Mandates accessibility compliance for motion sensitivity, explicitly cross-linked to `25`.

## 11. Future Improvements
- Implement complex scroll-linked animations for marketing landing pages in Phase 3.
- Extract all values in this document into a single `motion-tokens.ts` file once Framer Motion config is centralized, so engineers import constants rather than transcribe numbers.

## 12. References
- *Framer Motion Documentation*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 2.0.0   | 2026-07-26 | Documentation Refactor Mission | APPROVED | Added explicit per-trigger specs for Drawer/Dialog/Toast/Loading/Skeleton (previously only Button/Modal/PropertyCard/Page-entrance were covered). Fixed the previously-unspecified Skeleton pulse duration. Added an explicit Motion Hierarchy section. Reaffirmed as sole canonical source for PropertyCard hover timing, resolving duplication with `17`. |

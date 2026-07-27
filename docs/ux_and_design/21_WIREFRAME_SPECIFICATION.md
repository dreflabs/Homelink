# 21. WIREFRAME SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Wireframe Structural Specification — Universal Layout Grammar

## 2. Purpose
The previous revision of this document hardcoded exactly two screens (Homepage, Property Detail). With 161 pages across 18 modules, hardcoding per-screen wireframes doesn't scale and produces exactly the "10 different templates" risk this refactor exists to prevent. This document instead defines the **reusable layout grammar** — container widths, grid, sidebar rules, header rules, content rules, card placement, responsive collapse — that every screen type is built from. `27_DASHBOARD_DESIGN_GUIDELINES.md` references this grammar for its shared dashboard shell instead of redefining sidebar/header mechanics 8 times; the Homepage and Property Detail specs from the previous revision are kept as worked examples proving the grammar, not as the only screens it covers.

## 3. Scope
Covers the structural layout grammar for all four screen archetypes in the product: **Marketing/Landing** (Homepage, About, Legal), **Detail** (Property Detail, single-record views), **Dashboard** (all 8 role dashboards, see `27`), and **Form/Flow** (multi-step registration, Add Listing). Does not cover visual styling (`15`), component internals (`17`), or motion (`23`).

## 4. Audience
- **UI Designers:** For converting this grammar into high-fidelity mockups for any new screen without re-deriving layout rules from scratch.
- **Frontend Engineers:** For defining CSS Grid / Flexbox structures consistently across all 161 pages.

## 5. Dependencies
- Dependent on `15_DESIGN_SYSTEM.md` §8.9 (grid/spacing tokens) and `19_INFORMATION_ARCHITECTURE.md` (content hierarchy per data type).

## 6. Definitions
- **Above-the-fold:** The portion of a page visible without scrolling.
- **Archetype:** One of four repeating structural patterns (Marketing, Detail, Dashboard, Form/Flow) that every screen in the product is an instance of.
- **Content rail:** The primary vertical column carrying a screen's main content, as distinct from persistent chrome (header, sidebar).

## 7. Architecture
All layouts use Tailwind CSS Grid/Flexbox against the 12-column grid and container widths defined in `15_DESIGN_SYSTEM.md` §8.9.

## 8. Requirements

### 8.1. Universal Grid & Container Rules
- **12-column grid** (`grid-cols-12`) underlies every multi-column layout in the product — column-span decisions below are always expressed against these 12 columns, never arbitrary fractions.
- **Container widths** (from `15` §8.9): Marketing/public `max-w-7xl` (1280px); Dashboard content area `max-w-[1440px]`; Modal/Dialog per component.
- **Gutter:** `gap-6` (24px) default, `gap-8` (32px) for hero/featured grids (`15` §8.9).

### 8.2. Archetype: Marketing / Landing
Used by: Homepage, About, Careers, Legal pages (`01_public_website`, `17_company`, `18_legal`).
- **Sticky Header** — height `72px`. Left: Brand Logo. Center: Global Nav links. Right: Auth/Profile control. Uses the Glassmorphism surface (`15` §8.11) once `scrollY > 0`.
- **Hero section** — above-the-fold, height `80vh` on pages that lead with a hero (Homepage only; About/Legal use a shorter `40vh` title band instead — a full 80vh hero on a Legal page would be tonally wrong per `16` §8.6). Centered heading + subtitle + primary action (Homepage: SearchHero, §17 8.5).
- **Content grid** — below-the-fold sections use `grid-cols-3` (desktop) or `grid-cols-4` for dense card grids (e.g. Verified Property Grid), collapsing per §8.6.
- **Worked example — Homepage:**
  - Section 1: Sticky Header (72px) as above.
  - Section 2: Hero + AI Search, 80vh, search box `max-w-[800px]` centered.
  - Section 3: Verified Property Grid, `grid-cols-3`/`grid-cols-4`, `gap-8`, each cell a PropertyCard (`17` §8.5).

### 8.3. Archetype: Detail
Used by: Property Detail (`04_property_detail`), and any other single-record deep-dive view.
- **Media block** — asymmetric gallery, main image 60% width, 2-image stack 40% width, `max-h-[500px]`, `object-cover` (Airbnb-style, kept from the original spec as the canonical Detail-archetype media pattern).
- **Content split** — `grid-cols-12`: Left column `col-span-8` (65%): header (title/address/verification Badge) → specs bar → description → tertiary content (legal docs, per `19_INFORMATION_ARCHITECTURE.md`'s Primary/Secondary/Tertiary hierarchy). Right column `col-span-4` (35%), **sticky**: price box (Elevation 2 Card) → interactive DatePicker (`17` §8.5) → giant primary CTA.
- **Any future Detail-archetype screen** (e.g. an Agent's detail view of a Client, or Admin's detail view of a flagged listing) reuses this exact 65/35 split and sticky-right-column pattern rather than inventing a new one.

### 8.4. Archetype: Dashboard
Used by: all 8 role dashboards (`05`–`12` in `docs/pages/`) — full mechanics owned by `27_DASHBOARD_DESIGN_GUIDELINES.md`'s Shared Dashboard Shell; this section defines only the grammar `27` builds on.
- **Sidebar** — fixed width `260px` desktop, collapses to icon-only `72px` on tablet, becomes an off-canvas Sheet (`17` §8.2) on mobile. Contains role-scoped nav items only (never cross-role items).
- **Header** — height `64px` (shorter than the Marketing archetype's 72px, since dashboard headers carry less — just breadcrumb/page title + search + notification bell + Avatar menu, no full nav).
- **Hero** — optional, one Hero Card (`17` §8.4) directly below the header when a workspace has one dominant piece of context to lead with (see per-role Layout Blueprint in `27`).
- **Main grid** — `grid-cols-12` content area to the right of the sidebar; StatTiles/Metric Cards typically `col-span-3` each (4 per row desktop, per `17` §8.3 anti-pattern cap), collapsing per §8.6.
- **Secondary grid / widgets** — supporting Cards below the main grid, typically `col-span-6` or `col-span-4` depending on content density.
- **Footer** — dashboards do not use a marketing-style footer; the sidebar's bottom slot carries account/settings/logout instead.

### 8.5. Archetype: Form / Flow
Used by: multi-step registration, Add Listing (`06_owner_dashboard/03_ADD_PROPERTY.md`), any Stepper-driven flow (`17` §8.5).
- **Container** — centered, `max-w-[720px]` (per `15` §8.9's modal/multi-step-form width), regardless of whether rendered as a full page or inside a Dialog.
- **Structure** — Stepper indicator (top) → single-column form content (never multi-column within one step — one decision at a time, per `16` §8.1 pillar 4) → sticky footer action row (Back/Continue).

### 8.6. Responsive Collapse Rules (all archetypes)
- **Desktop** (`lg`+): Full grid as specified per archetype above.
- **Tablet** (`md`–`lg`): Marketing/Detail content grids drop one column (`grid-cols-3`→`grid-cols-2`); Dashboard sidebar collapses to icon-only; Detail's 65/35 split holds down to `md`, collapses below it.
- **Mobile** (`<md`): All multi-column grids become `grid-cols-1`. Detail archetype stacks vertically in reading order: Image → Title → Price/CTA (moved up, no longer sticky-right since there's no right column) → Description → Legal docs. Dashboard sidebar becomes an off-canvas Sheet triggered by a header hamburger icon. Form/Flow stays single-column at every breakpoint (it already was).
- Touch targets on all archetypes below `md` follow the 44×44px minimum (`24_RESPONSIVE_SPECIFICATION.md`).

## 9. Implementation
- Frontend engineers must use Next.js App Router layout composition (`layout.tsx` per route group) to implement the Dashboard archetype's persistent Sidebar/Header once per role, not per page.
- Column-span classes (`col-span-8`/`col-span-4`, etc.) must be applied via the shared grid utilities implied by §8.1 — no per-page bespoke grid math.

## 10. Acceptance Criteria
- [x] Defines a reusable grammar covering all 4 screen archetypes, not just 2 hardcoded screens.
- [x] Every archetype's rule set is expressed as relative proportions/spans, not absolute pixels (except fixed chrome like header/sidebar height/width, which is intentionally fixed).
- [x] `27_DASHBOARD_DESIGN_GUIDELINES.md`'s Shared Dashboard Shell can reference §8.4 directly instead of restating sidebar/header/grid mechanics.
- [x] Responsive collapse is defined once (§8.6) for all archetypes instead of per-screen.

## 11. Future Improvements
- As new screen types emerge that don't fit the 4 current archetypes, add a 5th archetype here rather than a one-off wireframe.

## 12. References
- *Tailwind CSS Grid Documentation*
- *Next.js App Router layout composition patterns*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 2.0.0   | 2026-07-26 | Documentation Refactor Mission | APPROVED | Rewrote from 2 hardcoded screens into a universal 4-archetype layout grammar (Marketing, Detail, Dashboard, Form/Flow) so all 161 `docs/pages/` screens and `27_DASHBOARD_DESIGN_GUIDELINES.md`'s shared shell draw from one source. Original Homepage/Property Detail specs retained as worked examples. |

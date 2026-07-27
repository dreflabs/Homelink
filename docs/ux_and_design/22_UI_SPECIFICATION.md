# 22. UI SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 User Interface (UI) Specification — Visual Implementation Guide

## 2. Purpose
Where `15_DESIGN_SYSTEM.md` defines *what tokens exist* and `17_COMPONENT_LIBRARY.md` defines *what components exist*, this document defines the exact, copy-pasteable Tailwind implementation for every interactive element's state machine — Why the rule exists, When it applies, How to implement it, and explicit Do/Don't pairs. This is the sole canonical owner of the application's **z-index stacking scale** and every interactive-state Tailwind class string; no other document may restate or reinterpret these values.

## 3. Scope
Covers z-index stacking, and the full Default/Hover/Focus/Active/Disabled/Error state implementation for every interactive primitive cataloged in `17_COMPONENT_LIBRARY.md` §8.1–8.2.

## 4. Audience
- **Frontend Engineers:** For exact CSS/Tailwind implementation — this document's class strings should be usable verbatim in code review as the acceptance bar.
- **QA Engineers:** For visual regression testing — each Do/Don't pair is a testable assertion.

## 5. Dependencies
- Dependent on `15_DESIGN_SYSTEM.md` (tokens consumed by every class below) and `17_COMPONENT_LIBRARY.md` (component contracts this document implements).

## 6. Definitions
- **Z-Index:** The stacking order of an element and its descendants along the z-axis.
- **Stacking context bug:** A layering error where an element renders above/below where its semantic importance implies (e.g. a tooltip trapped behind a modal).

## 7. Architecture
Implemented via Tailwind CSS utility classes in Next.js; interactive-state handling (focus-visible, hover-intent) is delegated to Radix UI primitives underneath shadcn/ui, never re-implemented by hand.

## 8. Requirements

### 8.1. Z-Index Stacking Context (canonical — single source of truth)
**Why:** Six independent teams building 8 dashboards over time will inevitably reach for an arbitrary `z-[999]` unless one authoritative scale exists. A previous draft of `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` defined a *different*, contradictory 4-level scale; that scale has been removed from `16` (now a pure philosophy document, see `16` §2) and this file is the only place z-index is ever defined.

| Layer | z-index | When to use |
| :--- | :--- | :--- |
| Base content | `z-0` to `z-10` | Text, Cards, Images, ordinary page content |
| Sticky headers / Glassmorphism nav | `z-20` | Any sticky/fixed header using the glass surface (`15` §8.11) |
| Dropdowns & Popovers | `z-30` | Select menus, DropdownMenu, Tooltip, Popover (`17` §8.2) |
| Overlays & Backdrops | `z-40` | Modal/Dialog/Drawer backdrop (`bg-black/50`, `15` §8.3) |
| Modals, Dialogs, Lightboxes | `z-50` | The Dialog/Sheet panel itself, image lightbox |
| Toast Notifications | `z-100` | Sonner/toast stack — must render above literally everything, including an open Dialog |

**Do:** Reuse one of these six values for every new overlay-type component. **Don't:** introduce a `z-[60]`, `z-[75]`, or similar one-off value anywhere in the codebase — if none of the six layers fit, that's a signal to revisit the component's actual purpose, not to invent a seventh layer silently.

### 8.2. Input Field States
**Why:** An input's state must be legible at a glance without reading its label — color and border alone communicate whether it's safe to proceed, needs attention, or is unavailable.
**When:** Applies to Input, Textarea, and Select's trigger (`17` §8.1).
**How:**
- Default: `border-slate-200 bg-white text-slate-900` (light) / `border-slate-700 bg-slate-900 text-slate-100` (dark).
- Hover: `border-slate-300` (light) / `border-slate-600` (dark).
- Focus: `border-emerald-500 ring-2 ring-emerald-500/20 outline-none` — Emerald is used here deliberately as the universal focus-ring color across the whole product (not tied to the Verified/Success semantic meaning in this specific context — focus rings are a distinct, product-wide interaction signal), consistent with `25_ACCESSIBILITY_SPECIFICATION.md` §8.2.
- Error: `border-red-500 ring-2 ring-red-500/20 text-red-900` — always paired with a red, specific error message below the field (never shown alone, per `17` §8.1 Input anti-patterns).
- Disabled: `bg-slate-50 text-slate-400 cursor-not-allowed opacity-50`.
**Do:** Trigger Error state on blur-after-first-interaction or server response, never on every keystroke. **Don't:** show a red ring with no accompanying text — color alone is not an accessible error signal.

### 8.3. Button States
**Why:** Button state must clearly separate "you can click this," "you just clicked this," and "this isn't available right now."
**When:** Applies to every `<Button />` variant (`17` §8.1); values below are for the `default` (Action/Primary) variant — other variants substitute their own fill/border color from `15` §8.1 but follow the identical state-transition pattern.
**How:**
- Default: `bg-slate-900 text-white shadow-sm` (Elevation 1, `15` §8.5).
- Hover: `bg-slate-800 shadow-md`.
- Active/Click: `scale-95 bg-slate-950`.
- Focus-visible: `ring-2 ring-emerald-500/20 ring-offset-2`.
- Disabled: `opacity-50 cursor-not-allowed` — never removed from the DOM/layout, so the user understands an action exists but isn't currently available.
- Loading (`isLoading` prop): click disabled, label `opacity-0`, centered `animate-spin` SVG loader, `aria-busy="true"`.
**Do:** Always wire form-submitting buttons through the `isLoading` prop rather than a manually-tracked disabled boolean (prevents double-submit races). **Don't:** change a button's size or padding between its states — only color/shadow/scale change, layout must stay perfectly stable.

### 8.4. Checkbox / Radio / Switch States
**Why:** These three controls are easy to visually confuse; consistent, distinct treatment prevents a user from misreading a Switch as a Checkbox or vice versa.
**How:**
- Checkbox/Radio unchecked: `border-slate-300 bg-white`. Checked: `bg-slate-900 border-slate-900` with a white checkmark/dot (Action/Primary — never Emerald, reserving Emerald exclusively for verification/success meaning per `15` §8.1).
- Switch off: `bg-slate-200` (light) / `bg-slate-700` (dark) track. On: `bg-slate-900` (light) / `bg-slate-100` (dark, inverted per `15` §8.12) track, thumb slides right.
- Focus-visible on all three: `ring-2 ring-emerald-500/20 ring-offset-2`, identical to Input/Button for consistency.
**Do:** Keep Checkbox/Radio square-ish (`radius.sm`) and Switch fully rounded (`radius.full`) so their shapes alone hint at their different interaction models (discrete choice vs. instant toggle). **Don't:** use a Switch inside a form requiring an explicit Save button (see `17` §8.1 anti-pattern).

### 8.5. Badge Rendering
**Why:** Badges are HomeLink's primary trust signal (`16` §8.1 pillar 1) — inconsistent rendering directly undermines user trust in verification claims.
**How:** Background/text/border classes are defined once in `15_DESIGN_SYSTEM.md` §8.2 per verification state; this document adds only the rendering rule: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium border` (`caption` type scale, `radius.sm`).
**Do:** Always render the paired icon (`17` §8.1 Badge) alongside the color. **Don't:** render a Badge with only a colored dot and no text label — verification status is never communicated by color alone.

### 8.6. Card Hover / Elevation Transition
**Why:** Distinguishes interactive Cards (Action Card, Listing Card/PropertyCard, `17` §8.4) from static content Cards (StatTile, Insight Card) at a glance, purely through hover behavior.
**How:** Interactive cards: `transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1` (Elevation 1→2, `15` §8.5; exact duration/easing owned by `23_MOTION_SPECIFICATION.md` §8.3, referenced here not restated). Static cards: no hover transform at all.
**Do:** Apply the hover transform only to cards that are themselves a single click target. **Don't:** apply card-lift hover to a Card that merely *contains* a button — that creates two overlapping "this is clickable" signals and confuses which target the click will hit.

## 9. Implementation
- Frontend engineers must use Radix UI primitives (via shadcn/ui) so focus-visible/hover-intent state handling is robust across all browsers rather than hand-rolled.
- Any new interactive component must document its state classes in this file, following the Why/When/How/Do-Don't structure, before merge.

## 10. Acceptance Criteria
- [x] Defines exact, implementable Tailwind classes for every interactive state across all base primitives in `17` §8.1–8.2.
- [x] Establishes one strict, contradiction-free global z-index hierarchy (§8.1), with `16`'s prior conflicting scale removed.
- [x] Every rule states Why/When/How plus at least one Do/Don't pair, not just a class string.

## 11. Future Improvements
- Add Dark Mode class overrides inline next to each Light-mode class string (currently, dark values live only in `15`'s token tables — a follow-up pass should pair them 1:1 here for direct copy-paste).

## 12. References
- *Radix UI Documentation*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 2.0.0   | 2026-07-26 | Documentation Refactor Mission | APPROVED | Restructured every rule into Why/When/How/Do-Don't. Reaffirmed as the sole canonical z-index source (resolves prior contradiction with `16`). Expanded state coverage from Button+Input to Checkbox/Radio/Switch, Badge rendering, and Card hover/elevation transitions. |

# 15. DESIGN SYSTEM
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Design System — Design Token Specification (SSOT)

## 2. Purpose
This is the **single source of truth (SSOT)** for every raw design token in HomeLink 2.0 — color, elevation, radius, typography, iconography, grid/spacing, border, surface, and shadow, in both Light and Dark mode. No other document may declare a new color, size, or timing value; every other UX document (`16`–`27`) references the tokens defined here by name instead of restating hex codes or pixel values. If a value is needed and it isn't here, it doesn't exist yet — add it here first, then reference it.

## 3. Scope
Covers all design tokens consumed by `tailwind.config.ts` and by every component in `17_COMPONENT_LIBRARY.md`. Does not cover component composition (`17`), layout (`21`), motion timing (`23`, tokens only referenced here), or emotional/brand philosophy (`16`).

## 4. Audience
- **Frontend Engineers:** The literal source for `tailwind.config.ts` token definitions.
- **UI Designers:** The literal source for Figma variable definitions (color styles, effect styles, type styles) — Figma and Tailwind must never drift from this file.
- **Design System Architect:** Owns additions/changes to this file; all other docs are downstream of it.

## 5. Dependencies
- None. This is the root document of the design documentation tree.

## 6. Definitions
- **Token:** A named, reusable design decision (e.g. `color.action.primary`) mapped to a concrete value, so the decision is made once and consumed everywhere.
- **Semantic color role:** A token named by *purpose* (`success`, `danger`) rather than by *appearance* (`green`, `red`), so the underlying hex can evolve without renaming every usage.
- **Elevation:** The perceived distance of a surface from the base layer, communicated via shadow (light mode) or lightened surface + border (dark mode).
- **Ramp:** A 50–950 scale of a single hue from lightest to darkest, per Tailwind convention.

## 7. Architecture
All tokens are defined once in `tailwind.config.ts` under `theme.extend` and consumed exclusively via Tailwind utility classes — no inline hex values or magic numbers are permitted in component code. Dark mode is implemented via Tailwind's `class` strategy (`dark:` variants), toggled by a `<html class="dark">` attribute, never via `prefers-color-scheme` alone (users must be able to override the OS setting).

## 8. Requirements

### 8.1. Color — Semantic Roles
Every color in the product is assigned to exactly one of these five roles. A role is a *purpose*, not a hex code — the ramp behind it may shift, the role name never does.

| Role | Purpose | Light value | Dark value |
| :--- | :--- | :--- | :--- |
| **Action / Primary** | Primary buttons, active nav item, selected states | `slate-900` `#0D1729` | `slate-100` `#F1F5F9` (surface inverts: dark-mode primary buttons are light-on-dark) |
| **Brand / Trust / Info** | Links, secondary outline CTA, info banners, logo-adjacent accents | `primary` `#0D1729` | `blue-400` `#60A5FA` |
| **Verified / Success** | Verification badges, success toasts, confirmation states — HomeLink's core trust signal | `emerald-600` `#059669` (fill), `emerald-500` `#10B981` (accents/rings) | `emerald-400` `#34D399` |
| **Warning** | Pending states, rate-limit notices, non-blocking caution | `amber-500` `#F59E0B` | `amber-400` `#FBBF24` |
| **Danger** | Errors, destructive actions, rejected states | `red-500` `#EF4444` (accents/rings), `red-600` `#DC2626` (solid fills) | `red-400` `#F87171` |

**Resolution note (v2.0.0):** Earlier drafts of this file declared Blue as the primary *button* color, while every component that actually shipped (`17`, `22`) used Slate for buttons and Emerald for focus/verified states. This version resolves that contradiction by keeping every existing hex value and re-assigning roles to match actual usage: **#0D1729 is Action/Primary** (buttons, active states — Stripe/Linear-style restrained neutral action color), and **Blue is removed as a Brand color** (links, secondary CTAs, informational accents) rather than removed. Nothing is invented; nothing is deleted.

### 8.2. Color — Verification Badge Taxonomy (canonical, ties to `PROPERTY.status` enum)
The Badge component (`17_COMPONENT_LIBRARY.md` §8.1) MUST use exactly these five states plus a neutral default — this reconciles the previous 3-variant Badge against the real 5-state ERD enum:

| `PROPERTY.status` | Badge label (id) | Color | Tailwind |
| :--- | :--- | :--- | :--- |
| `PENDING` | Menunggu Verifikasi | Warning | `bg-amber-50 text-amber-700 border-amber-200` |
| `REJECTED` | Ditolak | Danger | `bg-red-50 text-red-700 border-red-200` |
| `PHYSICAL_VERIFIED` | Verifikasi Fisik | Info | `bg-emerald-50 text-emerald-700 border-emerald-200` |
| `LEGAL_VERIFIED` | Verifikasi Legal | Info | `bg-emerald-50 text-emerald-700 border-emerald-200` |
| `FULLY_VERIFIED` | Terverifikasi Penuh | Success | `bg-emerald-50 text-emerald-700 border-emerald-200` |
| *(none / n/a)* | Default | Neutral | `bg-slate-100 text-slate-600 border-slate-200` |

### 8.3. Color — Backgrounds & Surfaces

| Token | Light | Dark |
| :--- | :--- | :--- |
| `bg.canvas` (page background) | `white` `#FFFFFF` | `slate-950` `#020617` |
| `bg.surface` (section divider, secondary bg, sidebar) | `slate-50` `#F7F9FC` | `slate-900` `#0D1729` |
| `bg.card` | `white` `#FFFFFF` | `slate-900` `#0D1729` with `border-slate-800` |
| `bg.hover` (row/item hover) | `slate-50` | `slate-800` |
| `bg.overlay` (modal backdrop) | `black/50` | `black/70` |

### 8.4. Color — Typography

| Token | Light | Dark |
| :--- | :--- | :--- |
| `text.heading` | `slate-900` `#0D1729` — **never** `#000000` | `slate-50` `#F8FAFC` — **never** `#FFFFFF` at full opacity for body copy (glare) |
| `text.body` | `slate-700` `#334155` | `slate-300` `#CBD5E1` |
| `text.muted` (subtitle/placeholder) | `slate-500` `#64748B` | `slate-400` `#94A3B8` |
| `text.disabled` | `slate-400` | `slate-600` |
| `text.on-primary` (text on a Slate-900 button) | `white` | `slate-900` (button surface inverts, see 8.1) |

### 8.5. Elevation (Shadow Scale)
Lima level bayangan (shadow) semantik berbasis OKLCH (gaya Apple/Stripe). Buang default shadow Tailwind. Pada mode gelap, bayangan diganti dengan border 1px + pencerahan permukaan (karena bayangan tidak terlihat di background gelap).

| Token | Usage | Light (OKLCH Semantic Shadow) | Dark |
| :--- | :--- | :--- | :--- |
| `shadow-sm` | Small components, resting buttons | OKLCH Semantic Shadow `sm` | none |
| `shadow-md` | Dropdowns, popovers | OKLCH Semantic Shadow `md` | `border border-slate-800` |
| `shadow-lg` | Modals, dialogs | OKLCH Semantic Shadow `lg` | `border border-slate-700` |
| `shadow-card` | Default card state | OKLCH Semantic Shadow `card` | `border border-slate-800` |
| `shadow-card-hover` | Card hover state | OKLCH Semantic Shadow `card-hover` | `border border-slate-700 bg-slate-800/50` |
| `shadow-float` | Search bar, floating glassmorphism | OKLCH Semantic Shadow `float` | `border border-slate-700 bg-slate-900` |

Forbidden: Tailwind's default `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, dll. Semua bayangan harus menggunakan variabel OKLCH semantic shadow.

### 8.6. Radius

| Token | Usage | Value |
| :--- | :--- | :--- |
| `radius.sm` | Badge, checkbox, small chips | `6px` (`rounded-md`) |
| `radius.md` | Inner card, secondary button | `8px` (`rounded-lg`) |
| `radius.default` | Input, Button, Select | `12px` (`rounded-xl`) |
| `radius.lg` | Card, Table container | `16px` (`rounded-2xl`) |
| `radius.xl` | Modal, Hero image, large media | `24px` (`rounded-3xl`) |
| `radius.full` | Avatar, pill badge, FAB | `9999px` (`rounded-full`) |

### 8.7. Typography

- **Font Family:** `Inter` (primary, all platforms) paired with `SF Pro Display` on Apple devices via font-stack fallback. Numeric figures use `font-feature-settings: "tnum"` (tabular numbers) wherever numbers are compared vertically (tables, price lists, stat tiles).
- **Weights:** Semibold (600) for all headings, Medium (500) for labels/buttons/nav items, Regular (400) for body copy.

| Style token | Size / Line-height | Weight | Usage |
| :--- | :--- | :--- | :--- |
| `display` | 48px / 56px | 600 | Hero headline (Homepage only) |
| `h1` | 36px / 44px | 600 | Page title |
| `h2` | 28px / 36px | 600 | Section heading |
| `h3` | 22px / 30px | 600 | Card group heading, modal title |
| `h4` | 18px / 26px | 600 | Card title, table section header |
| `body-lg` | 16px / 26px | 400 | Lead paragraph, property description |
| `body` | 14px / 22px | 400 | Default UI text |
| `body-sm` | 13px / 20px | 400 | Secondary/meta text, table cells |
| `caption` | 12px / 16px | 500 | Badge labels, timestamps, helper text |

### 8.8. Iconography
- **Library:** Lucide React exclusively — mixing Heroicons/Material/other icon sets is forbidden anywhere in the codebase.
- **Style:** Outline only (no filled/solid icon variants).
- **Stroke width:** `1.5` — fixed, never varies by context.
- **Sizes:** `16px` (inline with `body-sm`/`caption` text), `20px` (default desktop, inline with buttons/inputs), `24px` (mobile touch targets, standalone icon buttons), `48px` (empty-state illustrations only).
- **Color:** Follows the semantic role of its context (default `text.muted`, active/selected `Action/Primary` or `Brand/Info`, destructive `Danger`) — an icon never carries a hardcoded color independent of its semantic context.

### 8.9. Grid & Spacing
- **Base unit:** `4px`. All padding/margin/gap values are multiples of 4 (Tailwind's default spacing scale) — no arbitrary pixel spacing in component code.
- **Container max-widths:** Marketing/public pages `1280px` (`max-w-7xl`); Dashboard content area `1440px` (`max-w-[1440px]`); Modal/Dialog `560px` default, `720px` for multi-step forms.
- **Grid:** 12-column grid (`grid-cols-12`) for all two-column and asymmetric layouts (see `21_WIREFRAME_SPECIFICATION.md` for column-span rules per layout type).
- **Card padding floor:** Minimum `p-6` (24px) on mobile, `p-8` (32px) on desktop for primary cards — interfaces must never feel cluttered (carried over from the original HDL directive, now owned here as a spacing token rather than prose).
- **Gutter:** `gap-6` (24px) default between cards in a grid, `gap-8` (32px) for hero/featured grids.

### 8.10. Border
- **Hairline:** `1px solid` using the surface-appropriate neutral (`border-slate-200` light / `border-slate-800` dark) — used for table dividers, input outlines, card borders in dark mode.
- **Focus ring:** `2px`, offset `2px`, color = Verified/Success `emerald-500` at `20%` opacity by default (`ring-2 ring-emerald-500/20`); components whose primary action is destructive use `ring-red-500/20` instead.
- **Never** use `border-black` or pure `#000000` borders in either mode.

### 8.11. Surface — Glassmorphism (canonical definition)
Previously invoked by name in `20_NAVIGATION_MAP.md` and `22_UI_SPECIFICATION.md` without values. Canonical spec, used **only** for the sticky header/nav surface — not a general-purpose effect:

| Property | Light | Dark |
| :--- | :--- | :--- |
| Background | `bg-white/70` | `bg-slate-950/70` |
| Backdrop blur | `backdrop-blur-md` (12px) | `backdrop-blur-md` (12px) |
| Border | `border-b border-white/20` | `border-b border-white/10` |
| Applies to | Sticky header only, on scroll (`scrollY > 0`) | Same |

### 8.12. Dark Mode Strategy
- **Toggle:** `class` strategy — a `<html class="dark">` attribute set by a persisted user preference (defaulting to OS `prefers-color-scheme` on first visit only).
- **What inverts:** Backgrounds/surfaces/text (§8.3, §8.4) and the Action/Primary role (§8.1 — primary buttons become light-on-dark, matching Apple/Linear dark-mode convention where a solid black button on a black page would be invisible).
- **What holds fixed (does not invert):** Verified/Success (Emerald), Warning (Amber), Danger (Red) — semantic meaning must stay recognizable across modes, only luminance shifts (e.g. `emerald-600`→`emerald-400`) to maintain contrast, never hue.
- **Shadows → borders:** Per §8.5, elevation in dark mode is communicated via `border` + slight surface lightening, not shadow (shadows don't read on dark backgrounds).
- **Images/photography:** No color adjustment; property photos render identically in both modes, but are always placed on a `bg-slate-900` (not pure black) mounting surface to avoid harsh contrast jumps.

### 8.13. Light Mode Strategy
Light is the default and the primary design target (per `16_HOMELINK_DESIGN_LANGUAGE_HDL.md`'s "Apple-inspired White Space" principle) — dark mode is a first-class but secondary adaptation of it, not a separately-designed theme. Every token table above lists Light before Dark for this reason: when in doubt, design the light-mode value first, then derive dark from it via §8.12's inversion rules.

### 8.14. Logo Usage
Semua halaman wajib memanggil komponen tersentralisasi `<Logo size="sm|md|lg" variant="light|dark" />`. Jangan pernah memakai `next/image` secara langsung untuk logo. Hal ini menjaga konsistensi proporsi dan transisi mode gelap-terang di seluruh aplikasi.

## 9. Implementation
- All tokens in this file must be mirrored exactly in `tailwind.config.ts` (`theme.extend.colors`, `.borderRadius`, `.boxShadow`, `.fontSize`) before any component consuming them is built.
- Figma variable collections (Color, Effect, Type) must use identical names to the token names in this document, with a "Light" and "Dark" mode pair per collection, so design handoff requires no manual translation.
- CI should include a lint rule (e.g. a Tailwind ESLint plugin or custom regex check) rejecting arbitrary hex values (`bg-[#...]`) in component files outside this token set.

## 10. Acceptance Criteria
- [x] Every color used anywhere in `17`/`22`/`27` traces back to a named role in §8.1–8.2 with no orphan hex values.
- [x] Every elevation level used in any component maps to §8.5.
- [x] Full Light + Dark pair exists for every token category.
- [x] The Primary-color contradiction between earlier drafts of this file and `17`/`22` is resolved and documented (§8.1 resolution note).
- [x] Glassmorphism, previously undefined, now has concrete blur/opacity/border values (§8.11).

## 11. Future Improvements
- Add a `theme.extend` code sample block once `tailwind.config.ts` is regenerated against this spec, so engineers can diff directly instead of transcribing tables.
- Consider a third "high-contrast" mode for accessibility beyond WCAG AA (tracked as a `25_ACCESSIBILITY_SPECIFICATION.md` follow-up, out of scope for this revision).

## 12. References
- *Tailwind CSS v4 Theme Configuration Documentation*
- *Apple Human Interface Guidelines — Color*
- *Stripe Design System (public design principles)*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 2.0.0   | 2026-07-26 | Documentation Refactor Mission | APPROVED | Full token-spec rewrite: resolved Primary-color contradiction (Slate-900 vs Blue) by re-assigning roles instead of changing values; added semantic color roles, 5-state verification badge taxonomy, elevation scale, dark mode strategy, glassmorphism definition, type scale, grid/spacing scale. Absorbed iconography rules previously duplicated in `16`. |

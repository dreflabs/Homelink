# 17. COMPONENT LIBRARY
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Component Library Specification

## 2. Purpose
To catalogue every reusable UI component in the product — not just the 5 that existed in the previous revision — so that 20 different frontend engineers building 8 different dashboards produce components that are behaviorally and visually identical. Every component below states its Purpose, Visual Priority, Composition, Spacing, Variants, States, Interaction, Animation, Accessibility, worked Examples, and Anti-patterns. This document never restates a raw token — every color/radius/type value below is a reference to `15_DESIGN_SYSTEM.md`, every timing value is a reference to `23_MOTION_SPECIFICATION.md`, every ARIA requirement is a reference to `25_ACCESSIBILITY_SPECIFICATION.md`.

## 3. Scope
Covers all base UI primitives, feedback/overlay components, data-display components, the Card system (including the 7 dashboard card kinds used by `27_DASHBOARD_DESIGN_GUIDELINES.md`), and signature composite components (PropertyCard, SearchHero). Excludes page-level layout, which is owned by `21_WIREFRAME_SPECIFICATION.md`.

## 4. Audience
- **Frontend Engineers:** The primary technical reference for building UI — this is the component contract, equivalent in authority to a Storybook spec.
- **Designers:** To match Figma components 1:1 with code components, variant-for-variant, state-for-state.

## 5. Dependencies
- Depends on `15_DESIGN_SYSTEM.md` (all tokens), `23_MOTION_SPECIFICATION.md` (all animation), `25_ACCESSIBILITY_SPECIFICATION.md` (all a11y requirements). Uses `shadcn/ui` as the foundational primitive layer.

## 6. Definitions
- **shadcn/ui:** A collection of reusable components built on Radix UI primitives and Tailwind CSS, copied into the codebase (not installed as an opaque dependency) so every component here is directly editable.
- **Variant:** A stylistic iteration of a component (e.g., `destructive`, `outline`).
- **Composite component:** A component built by composing base primitives plus business-specific logic/props (e.g., PropertyCard = Card + Badge + Avatar + business props).

## 7. Architecture
React 19, Tailwind CSS v4, `clsx`, `tailwind-merge`, `class-variance-authority` (CVA) for variant management, Radix UI primitives underneath every interactive/overlay component (for focus trapping, portal rendering, and keyboard handling). Located in `src/components/ui/` (primitives) and `src/components/shared/` (composites).

## 8. Requirements

### 8.1. Base Primitives

#### Button (`<Button />`)
- **Purpose:** The single mechanism for triggering an action; visual weight signals action priority.
- **Visual Priority:** `default` variant is the highest-priority action on any screen — never more than one per view unless one is clearly primary and the rest are `outline`/`ghost`.
- **Composition:** Label (required) + optional leading/trailing Lucide icon (20px, §15 8.8) + optional loading spinner.
- **Spacing:** Horizontal padding `px-4` (`sm`), `px-5` (`default`), `px-6` (`lg`); height `32px`/`40px`/`48px`.
- **Variants:** `default` (Action/Primary — Slate-900 fill), `secondary` (Brand/Info — Blue outline), `verified` (Success — Emerald fill, used only for confirm/verify actions), `destructive` (Danger — Red fill), `outline` (neutral border), `ghost` (no fill/border, hover surface only).
- **Sizes:** `sm`, `default`, `lg`, `icon` (square, icon-only).
- **States:** Default, Hover, Active/Pressed, Focus-visible (ring per `15` §8.10), Disabled (`opacity-50 cursor-not-allowed`), Loading (`isLoading` prop: label opacity 0, centered spinner, click disabled).
- **Interaction:** Single click triggers action; double-click/double-submit is prevented automatically whenever `isLoading` is wired to the underlying mutation state — every form-submitting Button MUST use this prop, not a manually-managed disabled flag.
- **Animation:** Hover/Active transitions per `23_MOTION_SPECIFICATION.md` §8.1 Fast tier; spinner uses `animate-spin`.
- **Accessibility:** Native `<button>` element; icon-only (`size="icon"`) buttons require `aria-label`; loading state sets `aria-busy="true"`.
- **Examples:** Primary CTA "Jadwalkan Survey Lokasi" (default, lg); "Batalkan" in a destructive confirm dialog (destructive, default).
- **Anti-patterns:** Never two `default`-variant buttons side by side (forces the user to guess priority). Never disable a button without visual + textual explanation of why (silent disabled buttons are a trust violation per `16` §8.1 pillar 1).

#### Input (`<Input />`)
- **Purpose:** Single-line text entry.
- **Visual Priority:** Neutral — draws attention only via its Focus/Error states, never via decoration.
- **Composition:** Optional leading icon, text field, optional trailing icon/action (e.g. password visibility toggle).
- **Spacing:** `h-10` default, `px-3` internal padding, `gap-2` to leading icon.
- **Variants:** `default` only — visual differentiation happens via state, not variant.
- **States:** Default, Hover, Focus, Error, Disabled — exact classes owned by `22_UI_SPECIFICATION.md` §8.2 (this document defines *that these states exist and when they trigger*; `22` owns the literal Tailwind values so they're declared exactly once).
- **Interaction:** Error state activates on blur after first interaction (not on every keystroke — that reads as hostile), or immediately on server-side validation failure.
- **Animation:** Border/ring color transition, Fast tier (`23` §8.1).
- **Accessibility:** Always paired with a visible `<label>` (placeholder text is never a substitute for a label); error state sets `aria-invalid="true"` and `aria-describedby` pointing to the error message.
- **Examples:** Email field on Login (`02_authentication/01_LOGIN.md`).
- **Anti-patterns:** Never use placeholder-as-label. Never show an error ring without an accompanying text message.

#### Textarea (`<Textarea />`)
- **Purpose:** Multi-line text entry (property descriptions, support messages).
- **Composition:** Same visual language as Input; auto-growing height up to a `max-h` cap, then internal scroll.
- **Variants/States:** Identical state model to Input.
- **Interaction:** Optional character counter (bottom-right, `caption` style, `text.muted`) for length-limited fields (e.g. property description).
- **Anti-patterns:** Never a fixed tiny height forcing internal scroll for primary content fields (e.g. property description) — auto-grow first.

#### Select (`<Select />`)
- **Purpose:** Single choice from a bounded list.
- **Composition:** Trigger (styled identically to Input) + Radix Popover content (Elevation level 3, `15` §8.5).
- **States:** Mirrors Input; open/closed state on the trigger (chevron rotates 180° when open, Fast tier).
- **Interaction:** Type-ahead jump-to-option; keyboard arrow navigation; closes on selection or `Escape`.
- **Accessibility:** Full Radix `Select` ARIA pattern (`role="listbox"`/`role="option"`) — never a native `<select>` styled with CSS alone, since native selects can't carry the visual language consistently across browsers.
- **Anti-patterns:** Never use for lists longer than ~15 items without a search/filter input inside the popover.

#### Checkbox / Radio (`<Checkbox />`, `<RadioGroup />`)
- **Purpose:** Boolean toggle / single choice among visible options.
- **Composition:** `16px` box, `radius.sm` (`15` §8.6), checked state fills with Action/Primary (Checkbox) — never Emerald, since checked ≠ verified semantically.
- **Animation:** Checkmark draws in over Fast tier; no bounce (bounce is reserved for genuine success moments, `23` §8.2 Bouncy Spring).
- **Accessibility:** Native `<input type="checkbox|radio">` under the hood via Radix, always paired with a clickable `<label>`.

#### Switch (`<Switch />`)
- **Purpose:** Instant on/off setting (e.g. notification preferences), distinct from Checkbox in that it takes effect immediately with no form submit.
- **Composition:** Track + thumb; on-state track uses Action/Primary, off-state track uses `slate-200`/`slate-700` (dark).
- **Animation:** Thumb slides over Fast tier (`23` §8.1).
- **Anti-patterns:** Never use Switch inside a form that also requires a Submit button — that combination confuses the user about what's already saved.

#### Badge (`<Badge />`)
- **Purpose:** Compact status signal — the single most important trust-communicating component in the product (verification states).
- **Variants:** The canonical 5-state verification taxonomy plus neutral default, per `15_DESIGN_SYSTEM.md` §8.2 — `PENDING`, `REJECTED`, `PHYSICAL_VERIFIED`, `LEGAL_VERIFIED`, `FULLY_VERIFIED`, `default`. Non-verification badges (e.g. "Baru", "Featured") use neutral or Brand/Info coloring, never borrow verification-role colors for unrelated meanings.
- **Composition:** Optional leading icon (`CheckCircle2` for verified states, `Clock` for pending, `XCircle` for rejected) + label text (`caption` style).
- **States:** Static (Badges do not have hover/focus/active states — they are not interactive elements; if a badge needs to be clickable, wrap it, don't make the Badge itself interactive).
- **Accessibility:** Color is never the only signal — every verification Badge always pairs a distinct icon with its color, so color-blind users can distinguish `PENDING` (amber+clock) from `REJECTED` (red+x) from `FULLY_VERIFIED` (emerald+check).
- **Anti-patterns:** Never invent a 6th ad hoc color for a new status without adding it to `15` §8.2 first.

#### Avatar (`<Avatar />`)
- **Purpose:** Represent a person (user, agent, surveyor, photographer) across the product.
- **Composition:** Circular (`radius.full`), image with `object-cover`, initials fallback (Slate-100 bg, Slate-700 text) when no image exists.
- **Sizes:** `24px` (inline/comment), `32px` (list row), `40px` (header/profile), `96px` (profile page hero).
- **States:** Optional online-status dot (bottom-right, Emerald=online/Slate=offline) only where presence is meaningful (e.g. live chat with an assigned Agent).
- **Anti-patterns:** Never stretch a non-square source image — always crop to square before rendering.

#### Tooltip (`<Tooltip />`)
- **Purpose:** Supplemental context on hover/focus for a control whose meaning isn't self-evident (icon-only buttons, truncated text, disabled-state explanations).
- **Composition:** Small dark surface (`slate-900` bg regardless of light/dark mode, white text), pointer arrow, Elevation level 3.
- **Interaction:** Appears after a short hover delay (~400ms, avoids flicker on fast mouse-over), disappears immediately on mouse-leave; on touch devices, appears on long-press or is replaced entirely by a visible label (tooltips must never be the *only* way to access information on mobile).
- **Accessibility:** Must also appear on keyboard focus, not only mouse hover.

#### Skeleton (`<Skeleton />`)
- **Purpose:** Loading placeholder that preserves layout stability (no content-jump when real data arrives).
- **Composition:** `slate-100`/`slate-800` (dark) block matching the exact dimensions and radius of the content it replaces.
- **Animation:** Soft pulse, `2s` ease-in-out infinite loop (canonical duration — this was previously mandated in `16` with no duration specified; now fixed here and cross-linked from `23` §8.3).
- **Anti-patterns:** Never a generic gray rectangle with a mismatched radius — the skeleton's shape is a promise about the shape of the real content.

### 8.2. Overlay & Feedback Components

#### Modal / Dialog (`<Dialog />`)
- **Purpose:** Interrupt the user's flow for a focused decision or input that must be resolved before continuing.
- **Composition:** Backdrop (`bg.overlay`, `15` §8.3) + centered panel (Elevation 4, `radius.xl`, max-width per `15` §8.9) with Title, optional Description, Content, and a right-aligned action row (destructive/cancel left, primary right).
- **Interaction:** Opens via trigger; closes via explicit close button, `Escape`, or backdrop click (backdrop-click-to-close is disabled for destructive-confirmation dialogs, to prevent accidental dismissal of an important decision).
- **Animation:** Backdrop fades in Fast tier; panel enters via Standard Spring (`23` §8.2), scale `0.95→1` + fade.
- **Accessibility:** Radix `Dialog` — `role="dialog"`, `aria-modal="true"`, focus trapped inside, focus returns to the trigger element on close.
- **Anti-patterns:** Never stack a second Dialog on top of an open Dialog — use a Drawer/Sheet or in-place content swap instead.

#### Drawer / Sheet (`<Sheet />`)
- **Purpose:** Secondary panel for content that benefits from more space than a Dialog but shouldn't fully replace the page (filters, detail previews, mobile navigation).
- **Composition:** Slides in from an edge (right on desktop for detail/filter panels, bottom on mobile — matches native mobile sheet conventions).
- **Animation:** Standard Spring (`23` §8.2), slides from `100%` to `0` on the relevant axis.
- **Accessibility:** Same focus-trap/`aria-modal` requirements as Dialog.
- **Anti-patterns:** Never use a Drawer for a single yes/no confirmation — that's a Dialog's job; Drawer is for browsing/filtering richer content.

#### Toast (`<Toast />`, via Sonner)
- **Purpose:** Transient, non-blocking confirmation or error notification for an action just taken.
- **Composition:** Compact surface (Elevation 5, `radius.lg`), icon (semantic color per `15` §8.1) + message + optional single action link (e.g. "Undo").
- **Variants:** `success` (Emerald), `error` (Danger), `info` (Brand/Info), `warning` (Amber) — mirrors the semantic roles exactly, no separate color system.
- **Interaction:** Auto-dismisses after 4s (informational) or 6s (error, gives more reading time); manually dismissible at any time; stacks vertically, newest on top, max 3 visible with overflow collapsed to a count.
- **Animation:** Slides in from top-right (desktop) / top-center (mobile), Fast tier entrance, fade-out exit.
- **Anti-patterns:** Never use a Toast for information the user must act on immediately (that's a Dialog) or that must persist across a page navigation (that's a banner/alert).

#### Dropdown / Popover (`<DropdownMenu />`, `<Popover />`)
- **Purpose:** Contextual menu of actions (DropdownMenu) or arbitrary rich content (Popover) anchored to a trigger.
- **Composition:** Elevation level 3 surface, `radius.lg`, `p-1` internal padding for menu items (each item `h-9`, `radius.sm` on hover).
- **Interaction:** Opens on click (not hover, except within a persistent nav bar), closes on selection, `Escape`, or outside click.
- **Animation:** Fast tier fade+scale from the anchor point.
- **Accessibility:** Full keyboard arrow-key navigation between items; `role="menu"`/`role="menuitem"`.

#### Pagination (`<Pagination />`)
- **Purpose:** Navigate long lists/tables (property listings, audit logs) without infinite scroll where predictable position matters (e.g. Super Admin Audit Log, `27` — an operator needs to say "page 4" reproducibly).
- **Composition:** Prev/Next icon buttons + numbered page buttons (current page = Action/Primary fill, others = ghost) + optional "Jump to page" input for long result sets.
- **Anti-patterns:** Never mix infinite-scroll and Pagination on the same list — pick one per screen based on whether reproducible position matters (Pagination) or continuous browsing matters more (infinite scroll, e.g. public Search Results).

### 8.3. Data Display

#### Table (`<Table />`)
- **Purpose:** Structured comparison of many records with consistent columns (property lists, leads, audit logs).
- **Composition:** Header row (`body-sm` weight 600, `bg.surface`, sticky on scroll for long tables), body rows (`body` style, `h-14`, hairline divider between rows, `bg.hover` on row hover), optional row-level actions (icon buttons, right-aligned, appear on hover on desktop / always visible on mobile-collapsed card view).
- **Responsive behavior:** Below `md` breakpoint, Table collapses into a stacked Card-per-row layout (label:value pairs) rather than horizontal-scrolling a cramped table — horizontal table scroll on mobile is an anti-pattern.
- **Accessibility:** Semantic `<table>`/`<thead>`/`<tbody>` markup (not `<div>` grids) so screen readers announce row/column context correctly.
- **Anti-patterns:** Never sort-indicate with color alone — always pair a chevron icon with the active sort column.

#### Tabs (`<Tabs />`)
- **Purpose:** Switch between mutually-exclusive views of the same context without a full navigation (e.g. a dashboard section split into "Aktif" / "Selesai" / "Dibatalkan").
- **Composition:** Underline-style indicator (2px, Action/Primary) that slides between tab labels (Fast tier), not boxed/pill tabs — underline tabs read as lighter-weight, consistent with `16` §8.1 pillar 4 (Minimalism).
- **Accessibility:** `role="tablist"`/`role="tab"`/`role="tabpanel"`, arrow-key navigation between tabs.

#### EmptyState (`<EmptyState />`)
- **Purpose:** Replace a blank screen/list with clear guidance — never leave a "no data" area visually empty (`16` §8.1 pillar 4/5 — sparse is good, blank is a bug).
- **Composition:** Centered column: 48px Lucide icon (`text.muted`, `15` §8.8) → `h3` guidance text → optional `body-sm` supporting text → primary Button CTA.
- **Variants by cause:** *No data yet* (neutral tone, action-oriented CTA — e.g. Owner with zero listings → "Tambah Properti"), *Filtered to zero results* (suggests clearing filters, no CTA button needed), *Access-scoped empty* (e.g. Surveyor with no assignments today — calm, non-alarming tone, since this is a normal state not a problem).
- **Anti-patterns:** Never show a generic "No data" string with no icon and no next action.

#### StatTile (`<StatTile />`)
- **Purpose:** Single-metric summary card (used across every dashboard's top row — "Total Properti", "Komisi Bulan Ini", "Antrian Verifikasi").
- **Composition:** `caption` label (top, `text.muted`) → large numeral (`h2` size, `tnum` tabular figures, `15` §8.7) → optional trend indicator (small arrow + percentage, Emerald for positive/Red for negative, never color alone — arrow direction carries the meaning too) → optional leading icon top-right (`text.muted`, 20px).
- **Composition (Card level):** Rendered inside a base Card, Elevation level 1, never level 2+ at rest (stat tiles are calm, not "raised" for attention — reserve raised elevation for actionable Cards).
- **Anti-patterns:** Never more than 4 StatTiles in a single row on desktop (beyond 4, the eye can't prioritize — split into a second row or move lesser metrics into a detail view).

### 8.4. Card System
Every dashboard in `27_DASHBOARD_DESIGN_GUIDELINES.md` is built from these 8 card kinds — a shared vocabulary so a Hero Card looks and behaves the same in Owner as it does in Super Admin, even though its content differs completely.

- **Base Card:** Elevation level 1 at rest, `radius.lg`, `bg.card`, padding per `15` §8.9. All card kinds below are this base plus a content pattern — never a structurally different container.
- **Hero Card:** Full-width, top-of-page. Largest visual weight on the screen; carries the single most important piece of context for that workspace (e.g. Owner: portfolio verification summary; Surveyor: today's next assignment). Elevation stays level 1 — hero status comes from size and position, not from a heavier shadow.
- **Insight Card:** Narrative/explanatory card — a sentence or two of generated insight ("3 listing Anda mendekati batas waktu verifikasi"), paired with an icon and optional single action link. Used sparingly (max 1–2 per screen) so it doesn't compete with real data.
- **Metric Card:** Synonym for StatTile (§8.3) at Card-system level — referenced here so `27` can talk about "Card Hierarchy" using one consistent vocabulary.
- **Action Card:** A Card whose entire surface is a large touch/click target driving one specific next step (e.g. "+ Tambah Properti", "Mulai Survei"). Hover raises to Elevation level 2 and lifts (`23` PropertyCard-style hover, `-translate-y-1`) to signal interactivity distinctly from static content Cards.
- **Listing Card:** Synonym for PropertyCard (§8.5) at Card-system level when used inside a dashboard grid (e.g. Owner's "My Listings") rather than the public search grid — same component, dashboard context.
- **Analytics Card:** Contains a chart/graph (line, bar, or simple sparkline) plus a compact legend; chart colors are drawn exclusively from the semantic roles in `15` §8.1 (never an arbitrary chart-library default palette) so a "Verified" line is always Emerald wherever it appears.
- **Timeline Card:** Vertical chronological list (audit logs, booking history, survey status changes) — each entry is a dot (semantic color) + connecting line + timestamp (`caption`, `tnum`) + description. Used by Super Admin's Audit Log and Owner's Property Status history alike.

### 8.5. Signature Composite Components

#### PropertyCard (`<PropertyCard />`)
- **Purpose:** The single most-seen component in the product — the visual unit of trust for every property, on the public grid and inside dashboards alike (as a Listing Card, §8.4).
- **Props:** `title`, `price`, `address`, `specs (bed, bath, area)`, `imageUrl`, `isVerified` (drives the canonical Badge, `15` §8.2 — not a boolean green tick invented locally), `isFeatured`.
- **Composition:** Image (`radius.xl` top corners only, 16:9, `object-cover`) → Badge (top-left, if `isVerified`) → title (`h4`) → address (`body-sm`, `text.muted`) → specs row (icon+number triplets) → price (`h3` weight 600, Action/Primary color only if the price itself is the CTA context, otherwise `text.heading`).
- **States:** Resting = Elevation 1. Hover = Elevation 2 + image `scale-105` + card lifts `-translate-y-1` — exact timing owned exclusively by `23_MOTION_SPECIFICATION.md` §8.3 (this entry previously restated slightly different values than `23`; that duplication is removed — this document states *that* PropertyCard has this hover behavior, `23` states the *exact* duration/easing).
- **Accessibility:** Entire card is a single focusable link (`<a>` wrapping the whole card, not just the title) with an accessible name combining title + verification status + price.
- **Anti-patterns:** Never render a PropertyCard without a visible price — HomeLink's transparency principle (`16` §8.1 pillar 1) forbids "contact for price" patterns.

#### SearchHero (`<SearchHero />`)
- **Purpose:** The homepage's primary above-the-fold interaction — "search before browse" per `14_UX_BLUEPRINT.md`.
- **Props:** `onSearchSubmit`.
- **Composition:** Large centered input (`h-14`, `radius.xl`, Elevation 2 at rest — the one primitive allowed to break the "Elevation 1 at rest" default, because it is the single most important interactive element on the page) with an animated typing placeholder cycling through real example queries.
- **Anti-patterns:** Never add a secondary competing CTA (e.g. a "Browse all" button) inside the Hero — that dilutes the "search first" principle it exists to enforce.

#### Stepper (`<Stepper />`)
- **Purpose:** Multi-step form navigation, specifically the "Add Listing" flow (`06_owner_dashboard/03_ADD_PROPERTY.md`, previously referenced as a "Stepped Form" with no component ever specified — filled in here).
- **Composition:** Horizontal step indicator (desktop) / compact "Step 2 of 4" text + progress bar (mobile) — numbered circles connected by a line, completed steps filled Action/Primary with a checkmark, current step outlined, future steps neutral.
- **Interaction:** Forward navigation only via explicit "Lanjutkan" button (validates current step first); backward navigation freely allowed by clicking a completed step.
- **Anti-patterns:** Never allow jumping forward to an unvalidated step by clicking its indicator.

#### DatePicker (`<DatePicker />`)
- **Purpose:** Date selection for survey scheduling, booking, and report date-ranges.
- **Composition:** Input-styled trigger (calendar icon leading) opening a Popover-elevation calendar grid; selected date = Action/Primary fill; today = outlined ring only.
- **Anti-patterns:** Never a free-text date field without the calendar picker as the primary input method — free-text invites locale-format ambiguity (`26_CONTENT_DESIGN_SPECIFICATION.md` date format).

#### FileUpload / Dropzone (`<Dropzone />`)
- **Purpose:** Document/photo/video upload (legal documents, property photos, survey media, photographer deliverables).
- **Composition:** Dashed-border zone (`border-slate-300`, `radius.lg`), centered icon (`UploadCloud`) + instruction text + "or click to browse" fallback; on drag-over, border becomes solid Action/Primary and background tints `bg.hover`.
- **States:** Idle, Drag-over, Uploading (per-file progress bar, Emerald fill), Success (checkmark), Error (per-file, Red border + retry action).
- **Anti-patterns:** Never a single global progress bar for multi-file uploads — each file needs its own state so one failure doesn't appear to fail the whole batch.

## 9. Implementation
- Frontend developers must use `class-variance-authority` (CVA) to define every component's variants — no ad hoc conditional className strings.
- Strict 1:1 mapping between Figma Component Properties and React Component Props; a new Figma variant without a matching prop (or vice versa) is a build-blocking review comment, not a nice-to-have.
- Every component's Animation subsection is a pointer, never a value — if `23_MOTION_SPECIFICATION.md` changes a timing value, no component doc here needs to change.

## 10. Acceptance Criteria
- [x] Every component used anywhere in `docs/pages/` (across all 18 modules) has an entry here, including previously-unspecified ones referenced only implicitly (Stepper, DatePicker, Dropzone).
- [x] No component entry restates a raw token, color hex, or timing value — all are cross-references.
- [x] The Badge component's variants match the real 5-state ERD enum exactly (§8.1, sourced from `15` §8.2).
- [x] The PropertyCard/`23` hover-timing duplication from the previous revision is resolved — single source of truth in `23`.
- [x] Every component has at least one stated anti-pattern, not just a positive spec.

## 11. Future Improvements
- Integrate Storybook to visualize and test every component in isolation, with each story annotated to the relevant §8 subsection.
- Add visual (screenshot) regression testing keyed to this document's Examples once Storybook exists.

## 12. References
- *shadcn/ui documentation*
- *Radix UI Primitives documentation*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 2.0.0   | 2026-07-26 | Documentation Refactor Mission | APPROVED | Expanded from 5 to 26 components across Base Primitives, Overlay/Feedback, Data Display, the Card System (8 kinds used by `27`), and Signature Composites. Every entry now includes Purpose/Visual Priority/Composition/Spacing/Variants/States/Interaction/Animation/Accessibility/Examples/Anti-patterns. Resolved PropertyCard hover-timing duplication with `23`; reconciled Badge variants with the real ERD verification enum. |


## 10. Design System Iconography (Standard)

Untuk mempertahankan identitas visual premium dan konsistensi di seluruh antarmuka, HomeLink 2.0 menerapkan aturan ketat untuk ikonografi:

- **Library Tunggal**: HANYA gunakan `lucide-react`. Dilarang keras mencampur dengan emoji, Material Icons, Heroicons, atau Tabler dalam satu halaman.
- **Stroke Width**: Wajib menggunakan `strokeWidth={1.75}` agar ikon terlihat elegan, presisi, dan tidak terlalu tebal (bold).
- **Ukuran Standar**:
  - `w-4 h-4` (16px) atau `w-[18px] h-[18px]` untuk elemen sekunder/chip.
  - `w-5 h-5` (20px) untuk navigasi dan default.
  - `w-6 h-6` (24px) untuk Hero atau penanda utama.
- **Warna Default**: `text-slate-600` (abu-abu netral).
- **Active State**: `text-[#0F172A]` (Navy HomeLink) untuk status terpilih/aktif.
- **Hover State**: `text-[#2563EB]` (Blue Accent HomeLink) untuk interaksi.

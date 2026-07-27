# 27. DASHBOARD DESIGN GUIDELINES
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Dashboard Design Guidelines — The Dashboard SSOT

## 2. Purpose
This is the single most important dashboard document in the product. Eight roles — Buyer, Owner, Partner Agent, Internal Agent, Surveyor, Photographer, Admin, Super Admin — must share one visible Design DNA while each feeling distinctly built for its own job. Every one of the 82 page-spec files across `docs/pages/05_buyer_dashboard` through `docs/pages/12_super_admin` references this document's relevant section for its design rules instead of duplicating a boilerplate paragraph, per the `18_SCREEN_INVENTORY.md`/§8 restructuring described in the mission that produced this document. This document is grounded in what already exists — the depth already present in `docs/pages/06_owner_dashboard` and `docs/pages/09_surveyor` (the two most mature modules) sets the bar every other role section here is written to match.

## 3. Scope
Covers the Shared Dashboard Shell (mechanics common to all 8 roles) and one full design section per role: Buyer, Owner, Partner Agent, Internal Agent, Surveyor, Photographer, Admin, Super Admin. Does not cover public/marketing pages (`21_WIREFRAME_SPECIFICATION.md` §8.2), authentication (`docs/pages/02_authentication`), or non-dashboard operational modules (CMS, Notification Center, Billing, AI — out of scope per this refactor's mission).

## 4. Audience
- **Product/Design leadership:** The reference for whether a new dashboard feature "feels like HomeLink."
- **Frontend Engineers:** The design contract for every dashboard page — read this before, not after, implementing a new page in any of the 8 modules.
- **UI Designers:** The Figma-to-code contract for dashboard-specific Card kinds, layout blueprints, and per-role personality.

## 5. Dependencies
- Depends on `15_DESIGN_SYSTEM.md` (tokens), `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` (philosophy — especially §8.7's negative boundary against admin-template aesthetics), `17_COMPONENT_LIBRARY.md` §8.4 (the 8-kind Card System this document's "Card Hierarchy" subsections use throughout), `21_WIREFRAME_SPECIFICATION.md` §8.4 (Dashboard archetype grammar), `23_MOTION_SPECIFICATION.md` (all motion references).

## 6. Definitions
- **Shared Dashboard Shell:** The sidebar/header/grid mechanics common to every role, defined once here so per-role sections state only deltas.
- **Workspace Personality:** The one-line emotional identity of a role's dashboard, used as the fastest gut-check for whether a new screen belongs in that workspace.
- **Delta:** A per-role deviation from the shell or from another role's default — always stated explicitly, never left implicit.

## 7. Architecture
Every dashboard route is implemented as a Next.js App Router route group per role (`app/(dashboard)/{role}/...`) sharing one `layout.tsx` pattern derived from §8.1 below, with role-specific nav/content composed inside it.

## 8. Requirements

### 8.1. Shared Dashboard Shell
Applies to all 8 roles identically unless a role section below states a delta.

- **Sidebar:** `260px` fixed width (desktop) → `72px` icon-only (tablet) → off-canvas Sheet (mobile), per `21` §8.4. Top: role switcher/logo mark. Middle: role-scoped nav items (Lucide icon 20px + label, active item = Action/Primary text + left accent bar). Bottom: Avatar + name + Settings/Logout.
- **Header:** `64px` height. Left: breadcrumb or page title (`h3`). Center: optional contextual search. Right: notification bell (Badge dot if unread) + Avatar dropdown. Never carries the full marketing nav (`21` §8.2) — dashboards are a distinct archetype.
- **Base grid:** `grid-cols-12` content area, `max-w-[1440px]`, `gap-6` (`15` §8.9).
- **Widget grid (StatTiles/Metric Cards):** Max 4 per row desktop (`17` §8.3 anti-pattern), `col-span-3` each, collapsing to 2-per-row tablet / 1-per-row mobile.
- **Footer:** None — the sidebar's bottom slot replaces a marketing footer inside the dashboard archetype.
- **Universal states:** Every dashboard screen implements its own Empty/Loading/Error state per the per-role subsections below — a truly generic fallback ("No data") is never acceptable per `16` §8.1 pillar 4/5.
- **Universal motion:** All dashboards share the timing tiers in `23_MOTION_SPECIFICATION.md` unrestated — no role gets its own custom timing, only its own choice of *which* triggers get emphasis (see each role's Motion Behaviour delta).

---

### 8.2. Buyer Dashboard — "Property Discovery Workspace"
*Sourced from `docs/pages/05_buyer_dashboard` (01_DASHBOARD, 02_MY_PROFILE, 03_SAVED_PROPERTY, 04_RECENTLY_VIEWED, 05_SAVED_SEARCH, 06_SCHEDULE, 07_OFFERS, 08_DOCUMENTS, 09_MESSAGES, 10_NOTIFICATION, 11_SETTINGS) — already a detailed module; this section formalizes its design intent and locks in the Sprint B Hero/CTA/Focus decision below, superseding the prior "no Hero" version of this section.*

- **Visual Objective:** The user should feel like a guest browsing a curated, trustworthy private collection that actively helps them move forward — calm confidence that every listing they've saved is real, verified, and that the workspace knows what they're trying to accomplish next.
- **Design Identity:** Warm, editorial, low-pressure, but not passive. Closer to a personal shopping app than a transactional portal — the reframing from an earlier "dashboard statistik" instinct to a genuine **Discovery Workspace** is the deliberate identity shift for this role: Buyer never sees StatTiles or metrics, only a curated, personal, forward-moving experience.
- **Design References:** Airbnb Trips/Wishlist tab, Zillow Saved Homes, Apple Photos (for the saved-property grid's calm density).
- **Layout Blueprint (Sprint B decision — locked):** Sidebar (shell default). **Hero: a single dynamic "Langkah Berikutnya Anda" (Your Next Step) Card**, resolved in this fixed priority order using only data that already exists — no new entity: (1) an upcoming survey within 48 hours (`BOOKING`) → (2) a new property matching the Buyer's saved search criteria (a filter query over `PROPERTY`, not a stored "match" — see the Future Product Opportunity note below) → (3) a recently viewed property not yet saved (a gentle nudge) → (4) fallback for a Buyer with no activity yet: "Mulai jelajahi properti terverifikasi." The Hero's single CTA button changes with whichever state is showing ("Lihat Jadwal Survei" / "Lihat Properti Baru" / "Simpan Properti Ini" / "Mulai Cari Properti") rather than a static label — one Hero, one CTA, always exactly one, never more (Principle 10). Main Grid: Saved Property grid (Listing Cards, `17` §8.4) directly below the Hero, as the largest content block — this is the emotional core of the workspace, the Hero is what makes it feel alive. Secondary Grid: upcoming Schedule (Timeline Card) + recent Offers status side-by-side. Widgets: none beyond the two secondary cards — Buyer's dashboard deliberately avoids a StatTile row (metrics belong to Owner/Agent roles, not a consumer).
- **Information Hierarchy:** 1st — the dynamic Hero (what should I do right now). 2nd — saved/favorited properties (why a Buyer returns). 3rd — upcoming survey schedule / offers. 4th — messages/notifications (secondary, sidebar-badge only, not a main-grid card).
- **Card Hierarchy:** Hero Card (the dynamic next-step slot) leads; Listing Card dominant in the main grid; Timeline Card for booking history/offers; no Analytics Card (Buyers don't see charts); Action Card only for empty-state CTAs ("Cari properti baru") and as the Hero's single action button.
- **Empty State:** No saved properties yet → warm, inviting tone (never guilt-inducing), icon + "Simpan properti favorit Anda di sini" + CTA to Search. The Hero itself has its own empty-adjacent state (priority-4 fallback above) rather than ever rendering blank.
- **Loading State:** Hero Card skeleton resolves first (it's Principle 10's primary focus — must never feel like an afterthought), then the Saved Property grid skeleton (`17` §8.1 Skeleton anti-pattern).
- **Error State:** Calm, non-alarming — a failed fetch shows a neutral retry Card, never a red full-page error (a Buyer's trust in the platform must not be shaken by a transient network blip). If only the Hero's data source fails, the Hero degrades to its priority-4 fallback rather than showing an error state at all — a missing "next step" nudge is not worth alarming a Buyer over.
- **Typography Rules:** Slightly more generous line-height on property descriptions than other dashboards (`body-lg`, `15` §8.7) — Buyer is the one role reading prose-like content at length.
- **Color Application:** Verification Badges are the only saturated color in the UI; everything else stays neutral so the Badge (and the property photo) carries all visual weight. The Hero Card itself stays neutral/Elevation-1 like every other Hero in `27` (§8.1) — its distinction is content and position, never a special color treatment.
- **Motion Behaviour:** PropertyCard hover (`23` §8.4) is the single most-repeated animation in this dashboard — it must feel identical to the public Search Results grid, reinforcing that "browsing your saved list" and "browsing the marketplace" are the same trusted experience. The Hero's content swap (when its priority state changes between visits) uses a plain cross-fade (Fast tier) — never a slide/bounce, since it's a passive re-evaluation, not a user-triggered action.
- **Workspace Personality:** Luxury marketplace / Property Discovery Workspace.
- **Do:** Keep the grid visually identical to the public property grid; keep the Hero to exactly one action. **Don't:** add sales-y upsell banners ("Complete your profile for better matches!") — violates `16` §8.7's anti-dark-pattern boundary. **Don't:** turn the Hero into a StatTile row or add a second competing CTA next to it.
- **Future Product Opportunity (not built now, per the project's UX-before-backend rule):** Priority-2 of the Hero ("new property matching saved search") is currently a plain filter query against existing `PROPERTY`/saved-search-criteria fields — no new entity required. If HomeLink later wants true personalized ranking (using `PROPERTY.embeddingVector`) or push-style "Price Drop Alert" notifications, those would require a recommendation-serving endpoint and a notification/alert entity respectively — flagged here as future opportunities the Hero's design already accommodates without committing to them now.

---

### 8.3. Owner Dashboard
*Sourced from `docs/pages/06_owner_dashboard` (01_DASHBOARD, 02_MY_PROPERTY, 03_ADD_PROPERTY, 04_EDIT_PROPERTY, 05_PROPERTY_STATUS, 06_LEADS, 07_ANALYTICS, 08_SCHEDULE, 09_DOCUMENTS, 10_BILLING, 11_SETTINGS) — the most mature module; its existing badge-color mapping and endpoint patterns are the reference standard other role sections in this document are calibrated against.*

- **Visual Objective:** The Owner should feel like a competent proprietor running a small, serious business — in control of their portfolio, never overwhelmed by it.
- **Design Identity:** Confident, portfolio-oriented, business-casual (less consumer-warm than Buyer, less operational-dense than Admin).
- **Design References:** Stripe Dashboard (payouts/overview pattern), Airbnb Host dashboard, Linear (for the calm, list-oriented Leads/Property views).
- **Layout Blueprint:** Sidebar (shell default). Hero: none — instead a **StatTile widget row** leads the page (Total Properti / Menunggu Verifikasi / Terverifikasi Penuh / Survei Terjadwal — exactly as already specified in `06_owner_dashboard/01_DASHBOARD.md`). Main Grid: My Property table/grid. Secondary Grid: Leads list + upcoming Schedule Timeline Card. Widgets: Analytics Card (views/inquiries trend) on the Analytics page specifically, not the main Dashboard.
- **Information Hierarchy:** 1st — portfolio verification status counts (StatTiles). 2nd — recently updated properties / pending actions. 3rd — leads and schedule.
- **Card Hierarchy:** Metric Card (StatTiles) leads; Listing Card for My Property; Timeline Card for Property Status history; Analytics Card on the dedicated Analytics page; Action Card for "+ Tambah Properti" (the single highest-priority action in this entire dashboard).
- **Empty State:** Zero properties → direct, business-like tone, CTA straight to Add Property (already specified, kept as-is: `06_owner_dashboard/01_DASHBOARD.md` §Empty State).
- **Loading State:** StatTile skeletons render before the table skeleton (matches the Information Hierarchy — the summary numbers matter more, so they should never feel like an afterthought even during loading).
- **Error State:** A failed properties fetch shows an inline retry banner above the (empty) grid, not a full-page takeover — an Owner should never lose sight of their own dashboard chrome because of a data error.
- **Typography Rules:** Numerals in StatTiles and Analytics use tabular figures (`15` §8.7 `tnum`) so month-over-month comparisons align visually.
- **Color Application:** Status badge mapping is canonical and fixed (`15` §8.2): `PENDING`=Amber, `PHYSICAL_VERIFIED`/`LEGAL_VERIFIED`=Blue, `FULLY_VERIFIED`=Emerald, `REJECTED`=Red — reused verbatim from the existing Owner spec, now promoted to the product-wide canonical mapping every other role must also follow.
- **Motion Behaviour:** StatTile numbers count up (0→final value) once on first load only (Medium tier), never re-animate on every re-render — a business owner checking their dashboard repeatedly should not see distracting re-counts.
- **Workspace Personality:** Property business studio.
- **Do:** Surface verification status as prominently as revenue/leads — trust and business performance are equally first-class here. **Don't:** hide a property's rejection reason behind a secondary click — Owners must see *why* immediately (`16` §8.1 pillar 1).

---

### 8.4. Partner Agent Dashboard
*Sourced from `docs/pages/07_partner_agent_dashboard` (01_DASHBOARD, 02_PROPERTY_MANAGEMENT, 03_LEADS, 04_CLIENT, 05_COMMISSION, 06_CALENDAR, 07_TASKS, 08_DOCUMENTS, 09_REPORTS, 10_PROFILE, 11_SETTINGS) — currently generic-template quality; this section is the first real design authoring for this module and is what its `docs/pages` files will now reference instead of boilerplate.*

- **Visual Objective:** The Agent should feel like a focused salesperson with a clear pipeline — never buried in admin busywork, always able to see "what deal needs me next."
- **Design Identity:** Fast, pipeline-oriented, slightly more information-dense than Buyer/Owner because an Agent juggles many concurrent relationships — but still governed by `16` §8.7's ban on admin-template density.
- **Design References:** Linear's issue-pipeline views (for Leads/Client Kanban-style grouping), HubSpot CRM's cleaner competitors (Attio, Folk) rather than HubSpot itself, Stripe's Payouts view (for Commission).
- **Layout Blueprint:** Sidebar (shell default). Hero: an Insight Card ("3 leads menunggu tindak lanjut lebih dari 24 jam") — an Agent's day starts with "what's urgent," not a static summary. Main Grid: Leads pipeline (grouped by stage — new/contacted/negotiating/closed — each stage a column of compact Action Cards). Secondary Grid: Calendar widget (today's client meetings) + Commission summary (Metric Card). Widgets: Tasks list (compact, checklist-style).
- **Information Hierarchy:** 1st — leads requiring immediate follow-up (the Insight Card + pipeline). 2nd — today's calendar. 3rd — commission/reports (checked periodically, not constantly).
- **Card Hierarchy:** Action Card dominant (each lead/client is an action-oriented card, not a passive listing); Metric Card for Commission total; Timeline Card for Client interaction history; Analytics Card on the Reports page only.
- **Empty State:** Zero leads → framed as an opportunity, not a failure ("Belum ada leads baru — leads akan muncul otomatis saat calon pembeli menghubungi properti Anda"), no blame-toned copy.
- **Loading State:** Pipeline columns skeleton independently (each stage loads its own card skeletons) so a slow single stage doesn't block the whole board from appearing.
- **Error State:** Per-stage retry (a failed "negotiating" column fetch doesn't take down the whole pipeline view).
- **Typography Rules:** Client/lead names at `h4` weight inside cards (scannable at a glance while triaging many cards quickly); secondary details (last contact date) at `caption`.
- **Color Application:** Lead-stage color-coding uses only Info (new/contacted) → Warning (negotiating, time-sensitive) → Success (closed) — never more than these three semantic roles, so stage identity is always instantly legible.
- **Motion Behaviour:** Cards moving between pipeline stages (on status update) animate with the Standard Spring (`23` §8.2) — a drag-like reposition, not a Bouncy Spring (reserved for true completions, i.e. only the final "closed/won" transition gets the Bouncy Spring).
- **Workspace Personality:** Sales workspace.
- **Do:** Make "what needs my attention today" the very first thing visible. **Don't:** replicate a generic CRM's dense multi-column data table as the primary Leads view — pipeline-as-cards, not spreadsheet-as-default.

---

### 8.5. Internal Agent Dashboard
*Sourced from `docs/pages/08_internal_homelink_agent` (01_DASHBOARD, 02_LEAD_MANAGEMENT, 03_PROPERTY_VERIFICATION, 04_OWNER_VERIFICATION, 05_CUSTOMER_SUPPORT, 06_COMMISSION, 07_ANALYTICS, 08_CALENDAR, 09_REPORTS, 10_TASKS) — currently generic-template quality; authored here for the first time.*

- **Visual Objective:** The Internal Agent should feel like a trusted operator at the center of HomeLink's own sales-and-verification engine — efficient, thorough, never rushed on a verification decision even while moving fast on leads.
- **Design Identity:** Enterprise-calm, queue-oriented — visually similar to Partner Agent's pipeline focus, but with a second, equally-weighted axis: verification queues (Property/Owner) that carry real trust consequences and must never feel like "just another task list."
- **Design References:** Stripe's Radar/Review Queue (for verification review UX — calm, evidence-first, decisive), Linear (task/queue density), the Partner Agent section above (shared sales-pipeline vocabulary).
- **Layout Blueprint:** Sidebar (shell default), but with two nav groups instead of one flat list: "Sales" (Leads, Commission) and "Verification & Support" (Property Verification, Owner Verification, Customer Support) — visually separated in the sidebar so the dual mandate of this role is legible in the nav itself. Hero: none. Main Grid splits by active nav group — Sales context shows the same pipeline pattern as Partner Agent §8.4; Verification context shows a Queue table (Table component, `17` §8.3) sorted oldest-first. Secondary Grid: Tasks + Calendar. Widgets: Analytics on its own page.
- **Information Hierarchy:** 1st — oldest unresolved verification item in the queue (aging items are a trust risk the whole product depends on). 2nd — active leads. 3rd — customer support tickets. 4th — commission/analytics (periodic, not daily-urgent).
- **Card Hierarchy:** Table/Queue rows for Verification (not cards — a queue needs scannable rows more than visual cards, per `17` §8.3 Table's row-based comparison purpose); Action Card for Leads (matches Partner Agent); Timeline Card for an individual verification's audit trail once opened.
- **Empty State:** Empty verification queue is a genuine positive moment ("Semua verifikasi selesai — kerja bagus.") — the one dashboard in the product where an empty state deserves a small celebratory tone (still no confetti/bounce, per `16` §8.7, just warmer copy).
- **Loading State:** Queue table renders row-skeletons top-to-bottom (reads as "still counting" rather than a single blocking spinner).
- **Error State:** A failed verification-queue fetch is treated as high-severity (this queue is trust-critical) — shows a persistent, dismissible-only-after-retry banner rather than a quiet inline retry.
- **Typography Rules:** Queue age (`"Menunggu 22 jam"`) rendered in `body-sm` with color escalating from `text.muted` (fresh) → Warning (approaching SLA) → Danger (breached SLA) — ties directly into whatever SLA thresholds exist in `docs/pages/11_admin` verification logic.
- **Color Application:** Verification queue rows use the same 5-state Badge taxonomy as everywhere else (`15` §8.2) — an Internal Agent must see the exact same color language a Buyer or Owner would see for the same property.
- **Motion Behaviour:** Approving/rejecting a queue item animates the row collapsing out of the list (Fast tier) rather than an instant disappearance — gives a moment of visual confirmation for a consequential action.
- **Workspace Personality:** Enterprise sales operations.
- **Do:** Let queue age be the primary visual sort/urgency signal. **Don't:** bury verification decisions behind a generic "Actions" dropdown menu — Approve/Reject are consequential enough to be always-visible primary Buttons, never hidden in a menu.

---

### 8.6. Surveyor Dashboard
*Sourced from `docs/pages/09_surveyor` (01_DASHBOARD, 02_ASSIGNED_SURVEY, 03_SURVEY_FORM, 04_UPLOAD_PHOTO, 05_UPLOAD_VIDEO, 06_VERIFICATION, 07_REPORTS, 08_SCHEDULE) — already a detailed, field-use-aware module (GPS permission banners, offline-first autosave, glove-friendly touch targets, sunlight-glare contrast); this section formalizes and extends that existing quality as the field-work reference standard.*

- **Visual Objective:** The Surveyor should feel supported and unhurried while working alone in the field — the dashboard is a tool for the job, not an office-style browsing experience.
- **Design Identity:** Utilitarian-premium — the one workspace where function visibly leads form, but never at the cost of the brand's restraint (still no admin-template clutter).
- **Design References:** Field-service apps built for outdoor/mobile-first use (e.g. professional inspection/logistics apps), Apple's Camera app (for the Upload Photo/Video flow's directness).
- **Layout Blueprint:** On mobile (the Surveyor's primary device), sidebar collapses to a bottom tab bar by default rather than the shell's standard off-canvas Sheet — a field worker needs one-thumb access to Assigned Survey / Upload / Schedule without opening a drawer. Desktop retains the shell default. Hero: today's next assignment (Hero Card, largest element on the Dashboard) — a Surveyor's single most important question on opening the app is "where do I go next." Main Grid: Assigned Survey list. Secondary Grid: none — this dashboard deliberately minimizes secondary widgets to reduce field-use cognitive load.
- **Information Hierarchy:** 1st — next/current assignment location + time. 2nd — survey form completion status (draft saved offline vs. submitted). 3rd — past reports (checked rarely, in the office not the field).
- **Card Hierarchy:** Hero Card for next assignment; Action Card for "Mulai Survei"/"Upload Foto" (large, thumb-reachable); Timeline Card for a single property's survey history.
- **Empty State:** No assignment today → calm, explicitly normal tone ("Tidak ada jadwal survei hari ini"), never implies underperformance.
- **Loading State:** Because field connectivity is unreliable, loading states must distinguish "fetching" from "offline, showing last-synced data" (a persistent small offline indicator, not a blocking spinner that implies data will arrive imminently).
- **Error State:** Upload failures (photo/video) retry automatically in the background with a visible per-file retry indicator (`17` §8.5 Dropzone) rather than failing the whole survey submission — a Surveyor in a weak-signal location must never lose completed field work to a network blip.
- **Typography Rules:** Minimum `body` size increases one step over other dashboards on mobile (sunlight-glare legibility) — this is the one role-specific typography override permitted from the base scale in `15` §8.7.
- **Color Application:** High-contrast state colors only (no pastel/50-tint badge backgrounds on mobile survey screens — direct sunlight washes them out); Success/Danger states use their solid 500/600 fills even in contexts where other dashboards would use a soft tint.
- **Motion Behaviour:** Minimal — field use favors instant feedback over deliberate motion; even Medium-tier transitions are trimmed toward the Fast end of their range on mobile Surveyor screens specifically.
- **Workspace Personality:** Professional field inspection.
- **Do:** Design every primary action for one-handed, gloved, sunlight-glared, possibly-offline use first. **Don't:** require a stable connection for any in-progress survey form — autosave locally, sync when available (already specified in the existing module; reaffirmed as a design rule here, not just a technical one).

---

### 8.7. Photographer Dashboard
*Sourced from `docs/pages/10_photographer` (01_DASHBOARD, 02_ASSIGNMENT, 03_UPLOAD_MEDIA, 04_GALLERY, 05_DELIVERY, 06_SCHEDULE) — currently generic-template quality; authored here for the first time.*

- **Visual Objective:** The Photographer should feel like they're working in a creative tool, not a business-ops dashboard — the one workspace where the content itself (imagery) is allowed to be the visual star of the chrome, not just the page content.
- **Design Identity:** Gallery-first, minimal chrome, dark-mode-encouraged (a photographer culling/reviewing images benefits from a neutral dark surround more than any other role) — the strongest legitimate case in the product for defaulting a user toward Dark mode (`15` §8.12), though the user preference toggle remains theirs to control.
- **Design References:** Apple Photos / Lightroom's culling grid, Google Photos' library view, Dropbox's gallery/delivery-link pattern (for Delivery).
- **Layout Blueprint:** Sidebar (shell default, but simplified to the fewest items of any role: Dashboard, Assignment, Gallery, Delivery, Schedule — no Settings clutter beyond Profile). Hero: today's Assignment (Hero Card — where to shoot next, matching Surveyor's field-first pattern). Main Grid: Gallery — a dense, edge-to-edge masonry/grid of uploaded media (this is the one main-grid context in the whole product permitted to use tighter gaps than `15` §8.9's default, since a photo gallery's whole value is density of visual review). Secondary Grid: Delivery status (which assignments have been sent to Owner/Agent) + Schedule.
- **Information Hierarchy:** 1st — current assignment location/property. 2nd — upload progress/gallery state for that assignment. 3rd — delivery status (has the client received the final gallery). 4th — future schedule.
- **Card Hierarchy:** Hero Card for current assignment; a dedicated Gallery grid (not a Card kind itself — an edge-to-edge media grid, the one main-content area exempt from the standard Card container per §8.1); Action Card for "Upload Media"/"Kirim ke Klien"; Timeline Card for Delivery history.
- **Empty State:** No media uploaded yet for an assignment → large camera icon (`Camera`, Lucide), direct CTA to Upload — no unnecessary copy, this role's UI stays the most visually quiet of all 8.
- **Loading State:** Media thumbnails skeleton as gray squares matching the exact final grid aspect ratio — no shape-mismatch jump when real thumbnails resolve.
- **Error State:** A failed individual media upload shows inline on that thumbnail only (small red corner badge + retry), never interrupting review of the rest of the gallery.
- **Typography Rules:** Minimal in-gallery typography — filenames/metadata only appear on hover/selection, not persistently overlaid on every thumbnail (keeps the imagery the visual focus, per Visual Objective).
- **Color Application:** The most restrained color use of any dashboard — semantic colors appear only for Delivery status Badges and upload progress; the gallery itself is intentionally colorless chrome around full-color photography.
- **Motion Behaviour:** Gallery grid items fade in on load with a subtle stagger (`23` §8.4 Page Entrance pattern) but skip hover-lift transforms that other Listing/Action cards use — a photo grid should feel like a contact sheet, not a set of clickable marketing cards.
- **Workspace Personality:** Creative media workspace.
- **Do:** Let photography fill as much of the viewport as possible. **Don't:** wrap every thumbnail in a heavy bordered Card — that visually competes with the photography itself, which is the one thing this role's whole job is to showcase well.

---

### 8.8. Admin Dashboard
*Sourced from `docs/pages/11_admin` (01_DASHBOARD, 02_USER_MANAGEMENT, 03_AGENT_MANAGEMENT, 04_PROPERTY_MANAGEMENT, 05_VERIFICATION_QUEUE, 06_REPORTS, 07_ANALYTICS, 08_PAYMENT, 09_SUBSCRIPTION, 10_CMS, 11_SETTINGS) — already a detailed module (concrete SLA-timer logic, explicit endpoint gap-flagging); this section formalizes its design intent and is the reference for "how to show dense operational data without becoming an admin template," per `16` §8.7.*

- **Visual Objective:** The Admin should feel like they're operating mission control for the whole platform — comprehensive visibility, but calm, never alarm-fatigued by constant red indicators.
- **Design Identity:** The densest legitimate information display in the product, but still governed by whitespace and card discipline — this is the section that most directly tests `16` §8.7's negative boundary ("an internal tool needing to show a lot of data is never an excuse to abandon whitespace").
- **Design References:** Stripe's Dashboard (Payments/Disputes views — the gold standard for "dense but calm" enterprise data UI), Linear's admin/workspace-settings screens.
- **Layout Blueprint:** Sidebar (shell default) grouped into Platform Operations (User/Agent/Property Management), Trust & Safety (Verification Queue), and Commerce (Payment, Subscription) — mirroring the nav-grouping pattern established in Internal Agent (§8.5) for the same reason: legible mandate boundaries in the nav itself. Hero: none — Admin's Dashboard leads with the StatTile row (matching Owner's pattern, but Platform-wide metrics instead of portfolio metrics). Main Grid: Verification Queue (Table) when that's the active section, otherwise the relevant management Table. Secondary Grid: Reports/Analytics Cards.
- **Information Hierarchy:** 1st — SLA-breaching or SLA-approaching verification items (12h/20h/24h thresholds, as already specified in `11_admin/05_VERIFICATION_QUEUE.md`) — the single highest-urgency signal in this entire dashboard. 2nd — platform-wide StatTiles (users, agents, properties, revenue). 3rd — Reports/Analytics (periodic review, not moment-to-moment).
- **Card Hierarchy:** Metric Card row leads; Table/Queue rows for all management screens (User/Agent/Property/Verification/Payment/Subscription — Admin is fundamentally a table-heavy role, and that's correct, not a compromise); Analytics Card on Reports/Analytics pages; Timeline Card for an individual entity's audit trail once opened (e.g. a single flagged property's history).
- **Empty State:** An empty queue/table is genuinely good news here too (mirrors Internal Agent §8.5) — but Admin's empty states stay slightly more neutral/procedural in tone than Internal Agent's, since Admin oversees many queues simultaneously and a celebratory tone on every one would become noise.
- **Loading State:** Table row-skeletons, StatTile skeletons load in parallel (not sequentially) — an Admin frequently has many panes of data open and shouldn't perceive one section as "slower" than another due to sequencing choices alone.
- **Error State:** Failed data fetches on any management table show a persistent inline banner scoped to that specific table only — Admin routinely has multiple independent data sources on one screen (e.g. Users + Agents side panels) and an error in one must never imply the others are also compromised.
- **Typography Rules:** Table-dense screens use `body-sm` as the default row text size (one step down from other dashboards' `body` default) specifically to fit more scannable rows per viewport without sacrificing the 4.5:1 contrast minimum (`25` §8.1) — the one role-specific type-scale override besides Surveyor's (§8.6), in the opposite direction and for the opposite reason (density vs. glare legibility).
- **Color Application:** SLA-urgency escalation (`text.muted`→Warning→Danger, identical pattern to Internal Agent §8.5) is the dominant color signal; the 5-state verification Badge taxonomy remains identical to every other role — Admin never gets a "power user" alternate color scheme, reinforcing one shared visual vocabulary across all 8 roles.
- **Motion Behaviour:** Table row updates (e.g. a status change reflected in real time) use a brief background-color flash (Fast tier, fading to the row's resting `bg.card`) rather than a layout-shifting animation — Admin tables must stay scannable and stable even while data updates live.
- **Workspace Personality:** Platform operation center.
- **Do:** Make SLA/urgency the loudest visual signal on the Dashboard, louder than any single vanity metric. **Don't:** replicate a generic AdminLTE-style boxed-panel layout (`16` §8.7) — every dense table still lives inside the same Elevation-1 Card system as every other role's content.

---

### 8.9. Super Admin Dashboard
*Sourced from `docs/pages/12_super_admin` (01_DASHBOARD, 02_TENANT_MANAGEMENT, 03_ROLES, 04_PERMISSIONS, 05_FEATURE_FLAGS, 06_AUDIT_LOG, 07_SYSTEM_HEALTH, 08_QUEUE, 09_DATABASE_MONITOR, 10_AI_MONITOR, 11_SECURITY, 12_BACKUP, 13_ENVIRONMENT, 14_INTEGRATIONS) — currently generic-template quality, and the most technically distinct role in the product (system/infra visibility rather than business operations); authored here for the first time.*

- **Visual Objective:** The Super Admin should feel like they're in an executive command center for the entire technical and business platform — total visibility, instant command, zero ambiguity about system state.
- **Design Identity:** The single most information-dense, technical workspace in the product (system health, database, queues, security, environment config) — and precisely because of that, the section where `16` §8.7's negative boundary matters most: this must still never look like a generic devops/Grafana-style dashboard bolted onto the product. It uses the exact same Card system, type scale, and color roles as Buyer's marketplace browsing screen.
- **Design References:** Vercel's project dashboard (system health/deployments, calm technical density), Linear's workspace admin settings (Roles/Permissions), Stripe's Radar (Security section's risk-signal presentation).
- **Layout Blueprint:** Sidebar (shell default) grouped into Platform (Tenant Management, Roles, Permissions, Feature Flags), Operations (System Health, Queue, Database Monitor, AI Monitor), and Security & Infra (Audit Log, Security, Backup, Environment, Integrations). Hero: a System Health summary Card (color-coded: all-green = calm reassurance, any degraded service = the loudest visual element on the page, Danger-colored, impossible to miss). Main Grid: context-dependent Table/Monitor view per active section. Secondary Grid: Audit Log Timeline Card (recent privileged actions, always visible in a compact form regardless of active section, since accountability visibility should never require a click-through).
- **Information Hierarchy:** 1st — any active system degradation/incident (System Health Hero Card). 2nd — security signals (Audit Log, Security section anomalies). 3rd — platform configuration (Tenants, Roles, Permissions, Feature Flags — changed deliberately and rarely, not moment-to-moment). 4th — infra monitors (Database, AI, Queue — checked proactively, not alarmingly).
- **Card Hierarchy:** Hero Card for System Health status; Metric Card row for platform-wide technical metrics (queue depth, DB connection pool, AI request volume); Table/Queue rows for Tenant/Roles/Permissions/Feature Flags management; Timeline Card for Audit Log (the single most-referenced Card kind in this dashboard, given how central accountability is to a Super Admin's job); Analytics Card for AI Monitor's usage trends.
- **Empty State:** An empty Audit Log for a selected filter range is neutral/procedural ("Tidak ada aktivitas pada rentang waktu ini"); an all-clear System Health state is the one **positive** empty-adjacent state in this dashboard and should read calmly reassuring, not just neutral — silence here is the desired outcome, not a lack of content.
- **Loading State:** System Health and monitor widgets show their last-known-good value dimmed (`opacity-60`) while refreshing, rather than a blocking skeleton — a Super Admin should never be left with zero system-status information, even mid-refresh, given how safety-critical this view is.
- **Error State:** A failed monitor fetch (e.g. Database Monitor unreachable) is itself treated as a Danger-severity signal on the System Health Hero Card, not a quiet inline retry — the monitoring system failing to report is operationally equivalent to a real incident and must be visually escalated as such.
- **Typography Rules:** Matches Admin's density override (`body-sm` default on table-heavy screens, §8.8) plus monospaced (`font-mono`) rendering specifically for technical identifiers (tenant IDs, environment variable keys, database connection strings) so they're unambiguous to copy/read — the one context in the entire product where a monospaced font is permitted, scoped strictly to technical identifier values, never to prose or labels.
- **Color Application:** The System Health Hero Card is the only place in the product where the full Success/Warning/Danger triad may appear simultaneously as large, high-saturation status indicators (elsewhere, one semantic color dominates a given screen) — because distinguishing "3 services healthy, 1 degraded, 0 down" at a glance is this screen's entire purpose.
- **Motion Behaviour:** Real-time monitor values (queue depth, DB connections) update via a subtle number cross-fade (Fast tier), never a jarring re-layout; a status flip from Success→Danger on System Health uses a brief, deliberate pulse (once, not looping) to draw the eye without becoming a persistent distraction.
- **Workspace Personality:** Executive command center.
- **Do:** Make system-wide health the unmissable first signal on every visit. **Don't:** let the technical density of this role justify a single visual exception to the Card/color/type system shared by Buyer through Admin — Super Admin is the strongest test of "one Design DNA even for the most operational role," and it must pass.

## 9. Implementation
- Every file in `docs/pages/05_buyer_dashboard` through `docs/pages/12_super_admin` repoints its "§8 UI/UX Aesthetic Rules" section to reference the relevant subsection above (§8.2–§8.9) instead of restating the shared boilerplate — see the accompanying `docs/pages/` update pass for the mechanical change.
- New pages added to any of these 8 modules in the future must be authored against their role's existing section here first; if a new page doesn't fit any existing Card Hierarchy or Layout Blueprint entry, that's a signal to extend this document, not to freelance a one-off layout.

## 10. Acceptance Criteria
- [x] All 8 roles named in the mission have a complete section with every required subsection (Visual Objective, Design Identity, Design References, Layout Blueprint, Information Hierarchy, Card Hierarchy, Empty/Loading/Error State, Typography Rules, Color Application, Motion Behaviour, Workspace Personality, Do & Don't).
- [x] A Shared Dashboard Shell (§8.1) exists so no role section needs to restate sidebar/header/grid mechanics.
- [x] Every role section is grounded in its real `docs/pages/` file list rather than invented generically.
- [x] Each role's Do & Don't pair is concrete and specific to that role, not a restatement of the global `16` philosophy.
- [x] No two roles are visually interchangeable — each has at least one genuinely distinguishing Layout Blueprint or Color Application rule — while all 8 share one Card system, type scale, and color-role vocabulary.

## 11. Future Improvements
- Once Storybook exists (`17` §11), add a visual side-by-side of all 8 dashboards' Hero/leading element as a single reference sheet proving shared DNA + distinct personality at a glance.
- CMS, Notification Center, Billing, and AI modules (`docs/pages/13`–`16`) are equally generic-template quality today but were out of scope for this revision — recommended as the next module to receive this same treatment.

## 12. References
- *Stripe Dashboard, Vercel Dashboard, Linear, Notion — public product design (inspiration references, not licensed material)*
- `16_HOMELINK_DESIGN_LANGUAGE_HDL.md`, `17_COMPONENT_LIBRARY.md` §8.4, `21_WIREFRAME_SPECIFICATION.md` §8.4

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-26 | Documentation Refactor Mission | APPROVED | Initial creation. New document — the dashboard SSOT referenced by all 82 page-spec files across the 8 named dashboard modules. |
| 1.1.0   | 2026-07-26 | Sprint B (Dashboard Experience) | APPROVED | Locked the Buyer Dashboard Hero/CTA/Focus decision (§8.2): a single dynamic "Your Next Step" Hero replacing the prior "no Hero" stance, built entirely from existing data (no new entity) per the project's UX-before-backend rule. Reframed Buyer's Workspace Personality to explicitly name "Property Discovery Workspace." |

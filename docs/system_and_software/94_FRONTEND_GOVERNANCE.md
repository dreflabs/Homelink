# 94. FRONTEND GOVERNANCE
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Frontend Documentation Governance

## 2. Purpose
The frontend documentation stack now spans 10 documents (`15-27` in `docs/ux_and_design/`, `32-34` in `docs/system_and_software/`) that were written across different sessions with different authors. Without a single ownership map, the exact failure this stack was rewritten to prevent — the same rule restated slightly differently in two places, silently drifting apart — recurs. This document is the SSOT for *who owns which rule*, *how a change to one document propagates*, *what "Documentation Definition of Done" means for a page spec*, and *what a Documentation Freeze is and isn't*. It does not itself define any token, component, or layout rule — every value in this document is a pointer, never a restatement.

## 3. Scope
Covers governance of the 10-document frontend stack (`15_DESIGN_SYSTEM.md`, `16_HOMELINK_DESIGN_LANGUAGE_HDL.md`, `17_COMPONENT_LIBRARY.md`, `21_WIREFRAME_SPECIFICATION.md`, `22_UI_SPECIFICATION.md`, `23_MOTION_SPECIFICATION.md`, `27_DASHBOARD_DESIGN_GUIDELINES.md`, `32_FOLDER_STRUCTURE_SPECIFICATION.md`, `33_COMPONENT_ARCHITECTURE.md`, `34_FRONTEND_ARCHITECTURE.md`) plus the 161 page specs in `docs/pages/` that consume them. Does not cover ERD/API governance (owned by `93_CHANGE_MANAGEMENT.md`'s general CR process) or backend architecture.

## 4. Audience
- **Documentation Architect / Design System Architect:** The authority this document delegates ownership decisions to.
- **Frontend Engineers & Designers:** For resolving "which doc do I change" without guessing.
- **CPO / Design Director:** For deciding when a Documentation Freeze can be declared.

## 5. Dependencies
- Instantiates `93_CHANGE_MANAGEMENT.md`'s general change-control process specifically for the frontend doc stack.
- Assumes familiarity with all 10 documents in scope (§3) — this document indexes them, it doesn't summarize their content.

## 6. Definitions
- **Owning document:** The single document a rule's authoritative value lives in. Every other document may reference it but must never restate its value.
- **Cross-reference vs. restatement:** A cross-reference names the owning document/section (`"per 15 §8.1"`); a restatement repeats the actual value (`"#0D1729"`). Restatement outside the owning document is a governance violation, not a style choice.
- **Documentation Freeze:** A declared state where no new token/component/layout/motion decision may be made without a logged exception — see §8.4.

## 7. Architecture
This is a governance/process document — no code architecture. Enforcement is via PR review checklist (§9) referencing the ownership matrix (§8.1) rather than automated tooling, except where noted.

## 8. Requirements

### 8.1. SSOT Ownership Matrix
Every frontend concern has exactly one owning document. If a rule for a concern below is found written in more than one place, the non-owning copy is a bug to be removed (replaced with a cross-reference), not a second source of truth.

| Concern | Owning document | Notes |
| :--- | :--- | :--- |
| Color (semantic roles, ramps, dark mode) | `15_DESIGN_SYSTEM.md` §8.1-8.4, 8.12-8.13 | Includes the Verified Badge 5-state taxonomy (§8.2). |
| Elevation / shadow | `15_DESIGN_SYSTEM.md` §8.5 | |
| Radius | `15_DESIGN_SYSTEM.md` §8.6 | |
| Typography (type scale, weights, font stack) | `15_DESIGN_SYSTEM.md` §8.7 | |
| Iconography (library, stroke, sizes) | `15_DESIGN_SYSTEM.md` §8.8 | |
| Grid / spacing / container widths | `15_DESIGN_SYSTEM.md` §8.9 | |
| Border / focus ring | `15_DESIGN_SYSTEM.md` §8.10 | |
| Glassmorphism / surface treatment | `15_DESIGN_SYSTEM.md` §8.11 | |
| Design philosophy, 20 Non-Negotiable Principles, brand personality | `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` §8.1-8.10 | States *why*, never a pixel/hex value. |
| Component inventory (variants, states, anti-patterns) | `17_COMPONENT_LIBRARY.md` §8.1-8.5 | Including the Card System's 8 kinds. |
| Layout grammar (archetypes, grid spans, responsive collapse) | `21_WIREFRAME_SPECIFICATION.md` §8.1-8.6 | |
| Z-index stacking | `22_UI_SPECIFICATION.md` §8.1 | Sole canonical source — do not redefine elsewhere. |
| Interactive state Tailwind classes (hover/focus/active/disabled/error) | `22_UI_SPECIFICATION.md` §8.2-8.6 | |
| Motion timing, easing, spring physics, motion hierarchy | `23_MOTION_SPECIFICATION.md` §8.1-8.5 | |
| Per-role dashboard Hero/Layout/Card Hierarchy/Personality | `27_DASHBOARD_DESIGN_GUIDELINES.md` §8.2-8.9 | Shared shell mechanics in §8.1. |
| Folder/directory structure | `32_FOLDER_STRUCTURE_SPECIFICATION.md` §8.1-8.2 | |
| Server vs. Client Component rules, composition patterns | `33_COMPONENT_ARCHITECTURE.md` §8.1-8.3 | |
| State management philosophy, URL-as-state, optimistic UI | `34_FRONTEND_ARCHITECTURE.md` §8.1-8.3 | |
| Accessibility requirements (contrast, ARIA, keyboard) | `25_ACCESSIBILITY_SPECIFICATION.md` | Out of the `15-27`/`32-34` rewrite scope but still the sole owner — referenced, not duplicated, by any of the above. |
| Content voice/terminology | `26_CONTENT_DESIGN_SPECIFICATION.md` | Same status as above. |

### 8.2. Change Control for Frontend Docs
Instantiates `93_CHANGE_MANAGEMENT.md`'s general CR process with one addition specific to this stack:
1. Before changing any value, find its row in §8.1. If the document you're editing isn't the owning document, you're about to create a duplicate — stop and edit the owner instead.
2. After a value changes in its owning document, documents that merely cross-reference it (the common case) need **no edit** — that's the entire point of not restating values. Only documents whose *own* content depended on the old value's specifics (e.g. a worked example that quoted the old hex code) need a follow-up edit.
3. Every owning document's Version History entry for the change must name which other documents were checked for stale restatements, mirroring the audit-trail discipline already used in `13_PRODUCT_ROADMAP.md` and `40_ERD.md`'s changelogs.
4. A `docs/pages/` file is never an owning document for any concern in §8.1 — if a page spec appears to define a new token/component/layout rule, that's a defect (see `05_buyer_dashboard`'s old 4-KPI-grid page for a real historical example, corrected in Sprint B), not a legitimate page-specific override, unless explicitly logged as an exception per §8.2 item 5.
5. **Exceptions:** A page may deviate from an owning document's default only with a one-line logged rationale in that page's own spec (not a silent divergence) — matching the existing pattern in `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` §8.4's "documented exception" rule.

### 8.3. Documentation Definition of Done (for `docs/pages/` files)
A page spec is **Done**, not just present, when it meets the bar already proven in `06_owner_dashboard`, `09_surveyor`, and `11_admin` — this is a description of an already-working pattern, not a new invention:
1. **Real, not generic, Purpose statement** — names the actual data/workflow the page serves, not "Mengatur tampilan, logika, dan interaksi data spesifik untuk halaman X."
2. **Real component list** — page-specific components (e.g. `Timeline Card`, `Stepper`) from `17_COMPONENT_LIBRARY.md`'s actual inventory, not a fixed generic `Card/Button/Input/Skeleton` four-tuple.
3. **Real entity/endpoint references, or an honest gap.** Every data reference either names a real field in `40_ERD.md`/`42_TABLE_SPECIFICATION.md` and a real path in `52_ENDPOINT_CATALOGUE.md`, **or** explicitly states the entity/endpoint doesn't exist yet and proposes one — the pattern already used correctly in `06_owner_dashboard/06_LEADS.md` and `09_surveyor/03_SURVEY_FORM.md`. A page must never imply an entity exists when it doesn't, and must never go generic-and-silent about a gap either (the actual failure mode found in `07/08/10/12/13/14/15/16`).
4. **Page-specific icons**, each with a real usage rationale — not a single generic `ChevronRight (Example)` placeholder.
5. **§8 points to its owning section** in `27_DASHBOARD_DESIGN_GUIDELINES.md` (for dashboard pages) with only genuine page-specific deltas below it, per the repoint pattern already applied to the 8 dashboard-role modules.
6. **No formatting bugs** — no literal `\n` escape sequences, no unresolved template placeholders.

### 8.4. Documentation Freeze Policy
A **Documentation Freeze** on the frontend stack (§3) means: no new color/component/layout/motion decision may be introduced without a logged exception reviewed against §8.1's ownership matrix first. It does **not** mean no documentation work happens at all, and it does **not** freeze ERD/API/business documentation, which are governed separately.

**Entry criteria** (all must be true before a freeze is declared):
1. `94`/`95` (this document and `95_FRONTEND_ENGINEERING_HANDBOOK.md`) exist and `32/33/34` have been reconciled against `15-27` (this document's own creation — tracked as the current in-progress step).
2. All `docs/pages/` files meet §8.3's Definition of Done — currently **not met**: 68 files across `07/08/10/12/13/14/15/16` remain generic-template or bug-present (see `project-pages-full-audit` memory for the exact list) and require standardization first.
3. The known implementation drift (e.g. the Admin Dashboard code's Royal-Blue-as-primary choice vs. `15`'s Slate-900 resolution) has been reconciled or explicitly logged as an accepted, dated exception.

**Exit / re-open:** A freeze is lifted deliberately (e.g. entering a new phase's design work per `13_PRODUCT_ROADMAP.md`), not by silent erosion — any exception made during a freeze must be logged in the relevant owning document's Version History with a dated note, the same discipline already visible in `40_ERD.md`'s and `56_AUTHORIZATION_MATRIX.md`'s changelogs.

## 9. Implementation
- PR review for any change touching `docs/ux_and_design/15-27` or `docs/system_and_software/32-34` must check the diff against §8.1: does this change belong in the file being edited, and does it introduce a value that now needs removing from a non-owning file elsewhere?
- New `docs/pages/` files (or edits) are checked against §8.3 before merge, not just for prose quality.

## 10. Acceptance Criteria
- [x] Every concern in the 10-document frontend stack has exactly one named owning document (§8.1).
- [x] A concrete, previously-observed failure mode (page specs restating tokens, e.g. the old Buyer Dashboard 4-KPI grid) is named and the process that would have caught it is specified (§8.2).
- [x] Documentation Freeze is defined with explicit entry criteria tied to the real, current state of the project (68 unstandardized files, known code drift) rather than an abstract policy statement.
- [x] Contains no restated token/timing/z-index value anywhere in this document — verified by grep.

## 11. Future Improvements
- Once `docs/pages/` Step 2 (standardizing the 68 generic files) is complete, add a dated note here confirming §8.4 entry criterion 2 is met.
- Consider a lightweight lint rule flagging hex-color literals or timing numbers inside `docs/pages/*.md` as an automated §8.2 check, rather than relying solely on PR review.

## 12. References
- `93_CHANGE_MANAGEMENT.md`
- `13_PRODUCT_ROADMAP.md`, `40_ERD.md`, `56_AUTHORIZATION_MATRIX.md` (as examples of the changelog-discipline this document asks the frontend stack to match)

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-27 | Frontend Documentation Suite Step 1 | APPROVED | Initial creation — SSOT ownership matrix, change control, Documentation Definition of Done, and Documentation Freeze policy for the 10-document frontend stack. |

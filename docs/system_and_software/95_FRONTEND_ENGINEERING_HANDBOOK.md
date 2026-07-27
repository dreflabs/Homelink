# 95. FRONTEND ENGINEERING HANDBOOK
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Frontend Engineering Handbook

## 2. Purpose
`94_FRONTEND_GOVERNANCE.md` answers "which document owns this rule." This document answers the question an engineer actually has on day one: *"how do I build a page, right now, correctly, without reading 13 documents first?"* It is a practical, task-oriented index into the frontend stack — it does not define any new rule and restates nothing; every checklist item here links to its owning document per `94` §8.1.

## 3. Scope
Covers onboarding reading order, a worked build-a-page walkthrough, a consolidated engineering checklist, and common pitfalls observed across the real `docs/pages/` audit. Applies to any engineer building or modifying a page in any of the 18 `docs/pages/` modules.

## 4. Audience
- **New Frontend Engineers:** The single starting point before touching code.
- **Existing Engineers:** A fast-reference checklist during code review.

## 5. Dependencies
- Indexes `15/16/17/21/22/23/27` (`docs/ux_and_design/`) and `32/33/34` (`docs/system_and_software/`), governed by `94_FRONTEND_GOVERNANCE.md`.

## 6. Definitions
- See `94_FRONTEND_GOVERNANCE.md` §6 — this document reuses those definitions without restating them.

## 7. Architecture
This is a process/onboarding document — no code architecture of its own; §8.2's walkthrough exercises the real architecture defined in `32/33/34`.

## 8. Requirements

### 8.1. Reading Order for a New Engineer
Read in this order, once, before writing a page — each step assumes the prior one:
1. **`16_HOMELINK_DESIGN_LANGUAGE_HDL.md`** — why HomeLink looks and feels the way it does (20 Non-Negotiable Principles). Read once; internalize, don't re-read per task.
2. **`15_DESIGN_SYSTEM.md`** — the actual tokens (color, radius, type, spacing) you'll use in every component.
3. **`17_COMPONENT_LIBRARY.md`** — the component inventory. Check here before writing any new UI element; almost everything you need already has a spec.
4. **`21_WIREFRAME_SPECIFICATION.md`** — which of the 4 layout archetypes (Marketing/Detail/Dashboard/Form-Flow) your page is, and its grid grammar.
5. **`27_DASHBOARD_DESIGN_GUIDELINES.md`** — if your page is inside one of the 8 role dashboards, read the Shared Shell (§8.1) plus your role's specific section (§8.2-8.9).
6. **`32_FOLDER_STRUCTURE_SPECIFICATION.md` → `33_COMPONENT_ARCHITECTURE.md` → `34_FRONTEND_ARCHITECTURE.md`** — where the file goes, whether it's a Server or Client Component, and how it manages state.
7. **The specific `docs/pages/{module}/{page}.md`** — the page's own spec, which should already point back to `27` for dashboard-specific rules (per `94` §8.3) rather than repeating them.

### 8.2. Build-a-Page Walkthrough (worked example: a new Owner Dashboard page)
Say you're adding a page to `06_owner_dashboard`. Concretely, in order:
1. **Read `docs/pages/06_owner_dashboard/{page}.md` first.** It should already state its Purpose, required components, and either real endpoint references or an honest "blocked pending schema" note (per `94` §8.3) — if it doesn't meet that bar, that's a documentation gap to raise, not something to silently work around in code.
2. **Folder placement** (`32` §8.1): the route lives under `src/app/(dashboard)/owner/{page}/page.tsx`; any component used only on this one page is colocated in `src/app/(dashboard)/owner/{page}/components/`, not dropped into the shared `src/components/` tree (`32` §8.2 Core Rule 2).
3. **Server vs. Client** (`33` §8.1): default to a Server Component. Add `"use client"` only to the specific leaf component that needs `useState`/`onClick`/browser APIs — never at the page root just because *something* on the page is interactive.
4. **State** (`34` §8.1-8.2): if the page has a filter/search control, its state lives in the URL (`useSearchParams`), not `useState` — this is non-negotiable per `34` §8.2's "Shareable Link" rationale. Anything else transient (modal open/closed, unsubmitted form draft) is local `useState`.
5. **Components** (`17`): before writing a new component, check `17_COMPONENT_LIBRARY.md`'s inventory — for a dashboard page, you're almost certainly composing from the Card System (`17` §8.4: Hero/Insight/Metric/Action/Listing/Analytics/Timeline) plus a handful of base primitives (§8.1-8.3), not inventing new visual language.
6. **Dashboard conformance** (`27`): confirm your page's Layout Blueprint, Card Hierarchy, and Empty/Loading/Error states match your role's section in `27` — if your page needs something `27` doesn't cover, that's a `94` §8.2 exception to log, not a silent deviation.
7. **Forms**, if any (`33` §8.3): `react-hook-form` + `zodResolver`, always — never manual validation.
8. **Data fetching**: Server Components fetch directly; mutations use Server Actions (`"use server"`) per `34` §8.1, not a hand-rolled client-side fetch wrapper.

### 8.3. Consolidated Engineering Checklist
Pulled from `32/33/34` into one list so you don't need to cross three documents for the basics:
- [ ] Route and colocated components follow `32`'s folder tree — no relative-import spaghetti (`32` §8.2 Core Rule 3: absolute `@/...` imports only).
- [ ] Component defaults to Server; `"use client"` only where genuinely needed (`33` §8.1).
- [ ] No business logic inside `src/app/api/.../route.ts` — it belongs in `src/services/` (`32` §8.2 Core Rule 1).
- [ ] No Redux, no other heavy global state manager (`34` §8.1) — Server State via RSC/Server Actions, Local State via `useState`/URL params only.
- [ ] Filter/search state is in the URL, not component state (`34` §8.2).
- [ ] Mutations that benefit from instant feedback use `useOptimistic` (React 19) with a rollback+Toast on failure (`34` §8.3) — but only for mutations against a real, existing entity/endpoint (see §8.4 pitfall below).
- [ ] All forms use `react-hook-form` + `zodResolver` (`33` §8.3).
- [ ] All colors/radius/type/spacing/motion values come from `15`/`23` tokens — no arbitrary Tailwind values (`94` §8.1/§8.2).
- [ ] Every component used has a spec in `17`; if not, that's a documentation gap to raise before shipping a one-off.

### 8.4. Common Pitfalls (drawn from real audit findings)
- **Don't invent an entity or endpoint.** If a feature needs data that isn't in `40_ERD.md`/`52_ENDPOINT_CATALOGUE.md`, don't write code (or a page spec) that quietly assumes it exists. Follow `06_owner_dashboard/06_LEADS.md`'s pattern: state the gap explicitly, propose the shape, mark the feature blocked pending schema. This is exactly the mistake `34_FRONTEND_ARCHITECTURE.md`'s old Optimistic-UI-for-Favorites example made (see its Version History) — it presented a pattern using a feature with no backing entity as if the entity existed.
- **Don't restate a token instead of referencing it.** If you find yourself typing a hex code, a specific `duration-XXXms`, or a `z-[N]` value anywhere outside `15`/`23`/`22` themselves, stop — reference the token/section instead (`94` §8.1/§8.2).
- **Don't let a page spec define its own layout rule.** A page's `docs/pages/` file should point to `27`'s relevant section, not restate or reinvent a Hero/Card/layout decision (the exact mistake corrected in the Buyer Dashboard's old 4-KPI-grid design, replaced in Sprint B with a single dynamic Hero per `27` §8.2).
- **Don't go generic-and-silent about a gap.** The worst-quality page specs found in the audit (`07/08/10/12/13/14/15/16`) aren't wrong so much as too generic to ever be wrong — they never name a real entity, so they never trip over the fact that some entities (`LEAD`, CMS content types) don't exist yet. Silence isn't safety; an explicit, honest gap note (per `94` §8.3 item 3) is always better than vague boilerplate.
- **Don't use `ChevronRight` as a placeholder icon for everything.** If a page's Iconography section can't name a real, contextual icon choice, that's a sign the page spec hasn't actually been thought through yet.

## 9. Implementation
- New engineers are pointed to this document (not `32`/`33`/`34` individually) as their first read.
- Code review comments referencing a violation should cite the specific checklist item (§8.3) or pitfall (§8.4) by name.

## 10. Acceptance Criteria
- [x] Provides a single, ordered onboarding path across all 10 frontend-stack documents.
- [x] Includes one complete worked example threading through folder/component/state/design decisions together, not each in isolation.
- [x] Every pitfall in §8.4 is tied to a real, previously-found issue in this codebase's own audit history, not a generic best-practice list.
- [x] Restates no token/timing/z-index value — every rule is a pointer to its `94` §8.1 owning document.

## 11. Future Improvements
- Add a second worked example for a non-dashboard archetype (e.g. a new public Marketing page) once one is needed in practice.
- Once Storybook exists (`17` §11), link component stories directly from §8.3's checklist.

## 12. References
- `94_FRONTEND_GOVERNANCE.md`

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-27 | Frontend Documentation Suite Step 1 | APPROVED | Initial creation — reading order, build-a-page walkthrough, consolidated checklist, and pitfalls drawn from real audit findings. |

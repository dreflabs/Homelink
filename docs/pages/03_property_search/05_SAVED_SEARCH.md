# SAVED SEARCH PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Saved Search
**Module:** 03 PROPERTY SEARCH
**Purpose:** Lets a **Buyer** (per Phase 1 roles — Guest cannot save searches, only browse/book-restricted search) persist a filter combination (and/or AI query) as a named saved search with an optional alert frequency, so they are notified when new matching properties are listed. This page manages the list of the user's saved searches: view, edit alert frequency, re-run, and delete.

## 2. Next.js Routing Path
```text
app/(03_property_search)/saved-search/page.tsx
```
Requires authentication (Buyer role); should redirect unauthenticated/Guest users to login/upgrade-account prompt rather than rendering an empty authenticated-only page.

## 3. Required UI Components
- **SavedSearchList** — list/table of the user's saved searches, each entry showing: saved name/label, a human-readable summary of the filters (e.g. "Apartments in Jakarta, Rp500jt–1M, 2+ bedrooms"), last-run/created date, and current alert frequency.
- **AlertFrequencySelector** — per-saved-search control (e.g. "Off / Daily / Weekly") to configure notification cadence for new matches.
- **Delete action (with confirmation)** — icon button per row opening a confirm dialog before removing a saved search.
- **"Run this search" action** — button per row that navigates to Search Result with the saved search's filters re-applied as URL params.
- **EmptyState** — "You haven't saved any searches yet" with a CTA linking to Advanced Search or Search Result (where a "Save this search" action would live).
- **Skeleton loaders** — list-row skeletons while the saved searches are being fetched.

## 4. Data & State Management
- **This page's own state is NOT URL-filter-driven** (unlike Search Result/Map Search) — it manages a list of *saved* filter-sets as persisted records, not a live search itself. Its own state is standard server state: fetch the user's saved searches list, render, and mutate (update alert frequency / delete) via Server Actions with optimistic UI updates.
- **Data shape needed per saved search (proposed, see gap below):** `id`, `userId`, `label` (user-given name), the serialized filter payload (`q`, `minPrice`, `maxPrice`, `city`, `bedrooms` — same fields as Search Result's URL params, stored rather than live), `alertFrequency` (`OFF` | `DAILY` | `WEEKLY`), `createdAt`, `lastNotifiedAt`.
- **Local state:** which row's delete-confirmation dialog is open; in-flight mutation state (e.g. disabling a row's controls while its alert frequency update is saving).
- **Form Handling:** AlertFrequencySelector is a simple controlled select/segmented control per row (no complex validation); the "save a search" action itself (triggered from Search Result, out of scope for this page's own UI but referenced) would use `react-hook-form` + Zod to validate the required `label` field.

## 5. API Endpoints Referenced
- **Documentation gap (entity):** There is currently **no `SavedSearch` entity** in `40_ERD.md`. The existing schema only has `PROPERTY` and `PROPERTY_MEDIA`. A new entity is required, e.g.:
  `SavedSearch(id, userId, label, q, minPrice, maxPrice, city, bedrooms, alertFrequency[OFF|DAILY|WEEKLY], createdAt, lastNotifiedAt)` with a foreign key to the user/account table. **This must be added to `40_ERD.md` before implementation.**
- **Documentation gap (endpoints):** `52_ENDPOINT_CATALOGUE.md` has no saved-search endpoints today. Proposed, consistent with existing `/api/v1` JSend conventions:
  - `GET /api/v1/saved-searches` — list the authenticated user's saved searches.
  - `POST /api/v1/saved-searches` — create one (from Search Result's "Save this search" action, out of this page's scope but the origin of the data shown here).
  - `PATCH /api/v1/saved-searches/{id}` — update `label`/`alertFrequency`.
  - `DELETE /api/v1/saved-searches/{id}` — remove.
  These must be formally added to `52_ENDPOINT_CATALOGUE.md`, including error codes (e.g. `VALIDATION_FAILED` for a missing/duplicate `label`, and a `NOT_FOUND`/`FORBIDDEN` pattern consistent with `54_ERROR_CODE_CATALOGUE.md` for delete/patch of another user's saved search) before this page can be implemented against a real backend.
- **Downstream dependency:** the alert-notification mechanism (emailing/pushing users when new matches appear) is out of scope for this page spec but depends on a background job reading `SavedSearch.alertFrequency` — that job/architecture is not documented anywhere in the corpus yet and should be flagged to the notifications/backend module owner.

## 6. Acceptance Criteria (DoD)
- [ ] Guest-role users cannot access this page (redirected to login/signup); only authenticated Buyers see their own saved searches.
- [ ] Each saved search row accurately summarizes its stored filters in plain language.
- [ ] Changing alert frequency persists immediately (optimistic update + server confirmation), with a visible saved/error state.
- [ ] Deleting a saved search requires an explicit confirmation step and cannot be undone silently.
- [ ] "Run this search" reproduces the exact original result set by re-applying the same URL params on Search Result.
- [ ] Zero saved searches renders EmptyState with a clear CTA, not a blank list.
- [ ] The `SavedSearch` entity gap (`40_ERD.md`) and the `/api/v1/saved-searches` endpoint gap (`52_ENDPOINT_CATALOGUE.md`) are explicitly documented as blockers in this file.
- [ ] Lighthouse accessibility score ≥ 90; all row actions (run/edit-frequency/delete) are keyboard-operable and properly labeled for screen readers.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

- **`Bookmark`** — represents an existing saved search in the list (filled/solid variant). 20px, `text-blue-700`.
- **`BookmarkPlus`** — used on the EmptyState CTA and conceptually on the originating "Save this search" action on Search Result. 20px/24px, `text-blue-700`.
- **`Bell`** — labels the AlertFrequencySelector section per row. 16px, `text-slate-500`, decorative when paired with the "Alert frequency" text label.
- **`Trash2`** — delete action per row, opens the confirmation dialog. 18px, `text-red-500` on hover/focus; `aria-label="Delete saved search"` since it's a standalone icon button.

## 8. UI/UX Aesthetic Rules
Background White `#FFFFFF`; each saved-search row rendered as a Surface Light Gray (`#F7F9FC`) card, `rounded-2xl`, ultra-soft shadow, stacked in a single vertical list (this page is data-management-oriented, not a visual gallery like PropertyCard grids elsewhere in the module). Primary Royal Blue (`blue-700`) for "Run this search" buttons and active Bookmark icons; destructive actions (delete) use a restrained red only on hover/focus, not as a dominant resting color, to keep with the overall calm/minimal palette. **Page-specific layout:** simple single-column list on all breakpoints (no responsive grid needed, since rows are data records, not photographic cards); each row lays out horizontally on desktop (label + summary + frequency selector + actions inline) and stacks vertically on mobile.

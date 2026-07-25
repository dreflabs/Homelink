# SEARCH RESULT PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Search Result
**Module:** 03 PROPERTY SEARCH
**Purpose:** Primary landing page for all property search queries (AI semantic search and/or structured filters). Displays the paginated result set as a responsive grid of PropertyCards, ranked with `FULLY_VERIFIED` properties surfaced first (FR-SEARCH-002). This is the default destination after a user submits a query from the SearchHero on the homepage, or after refining filters from Advanced Search.

## 2. Next.js Routing Path
```text
app/(03_property_search)/search-result/page.tsx
```
Reads all filter state from `searchParams` (RSC) — no client route needed for initial render.

## 3. Required UI Components
- **SearchHero** (persisted at top, collapsed/sticky variant) — `onSearchSubmit` re-triggers navigation with updated `q` param.
- **FilterSidebar** — desktop: left rail; mobile: slide-over sheet triggered by a "Filters" button. Contains price range, bedrooms, property type, city.
- **PropertyCard grid** — responsive 1/2/3/4 columns (mobile/md/lg/xl) per `24_RESPONSIVE_SPECIFICATION.md`. Each card: title, price, address, specs (bed/bath/area), imageUrl, isVerified badge, isFeatured treatment, hover scale-105 image + shadow-xl.
- **Badge** — green+check for `FULLY_VERIFIED`, amber for `PENDING`/partially verified statuses.
- **Pagination / Infinite Scroll** — cursor-based "Load more" control (not numbered pages, since backend uses cursor pagination).
- **Skeleton loaders** — grid of pulse-animated card placeholders shown during RSC streaming/Suspense fallback; never a blank screen.
- **EmptyState** — shown when `data` is an empty array: illustration + "No properties match your search" + CTA button to reset filters or broaden the query.
- **Toast/Banner (AI fallback notice)** — non-blocking inline banner: "AI search is temporarily unavailable — showing standard filtered results" when `AI_SERVICE_DOWN` is returned.

## 4. Data & State Management
- **Filter state (URL search params, NOT `useState`)** — per `34_FRONTEND_ARCHITECTURE.md`, all filters live in the URL so results are shareable/bookmarkable:
  - `q` — free-text AI search query (optional)
  - `minPrice`, `maxPrice` — numeric range
  - `city` — structured location filter
  - `bedrooms` — numeric filter
  - `cursor` — opaque cursor for the next page (appended/replaced on "Load more")
  - `limit` — page size (default 20, rarely overridden by UI)
- **Server State:** Page is an RSC that reads `searchParams`, calls `GET /api/v1/properties` server-side, and streams the result into the grid. Subsequent "Load more" actions can be a Server Action or a client fetch that appends to the list client-side while keeping the URL's `cursor` in sync via `router.replace`.
- **Local State (client-only, UI-transient):** FilterSidebar open/closed (mobile sheet), active sort-order selection if present, per-card image loading flag. These are legitimately local because they don't affect shareability of the result set.
- **Form Handling:** FilterSidebar inputs use `react-hook-form` + Zod for client-side validation (e.g. `minPrice <= maxPrice`) before the form submission updates the URL search params.

## 5. API Endpoints Referenced
- `GET /api/v1/properties` — query params `q`, `minPrice`, `maxPrice`, `cursor`, `limit`. Response: `{status, data:[{id,title,price,status,imageUrl}], meta:{nextCursor,hasNextPage}}` (JSend format, per `36_API_ARCHITECTURE.md` §8.3 and `52_ENDPOINT_CATALOGUE.md`).
- **Error handling:** `VALIDATION_FAILED` (400) on malformed filter params (e.g. non-numeric `minPrice`) must surface field-level errors in FilterSidebar, not crash the grid. `AI_SERVICE_DOWN` (503) must trigger the documented fallback: "Kembalikan fallback ke pencarian standar tanpa AI" — the page re-issues the same request without `q`, using only structured filters, and shows the inline banner described in Section 3.

## 6. Acceptance Criteria (DoD)
- [ ] Verified (`FULLY_VERIFIED`) properties always rank before non-verified ones, regardless of `q` relevance score.
- [ ] When `AI_SERVICE_DOWN` (503) is returned, the page falls back to structured-filter-only results with a visible non-blocking banner — never a blank page or hard error screen.
- [ ] Skeleton card grid is shown during initial load and during "Load more" fetches.
- [ ] Zero-result state renders EmptyState with a CTA to clear filters, not an empty grid.
- [ ] All filters (`q`, `minPrice`, `maxPrice`, `city`, `bedrooms`, `cursor`) are reflected in the URL and a copied URL reproduces the same result set.
- [ ] "Load more" appends results without losing scroll position or duplicating items across cursor boundaries.
- [ ] Lighthouse accessibility score ≥ 90; filter chips and pagination controls are keyboard-navigable.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

- **`Search`** — used inside the sticky SearchHero input. 20px, `text-muted-foreground`, `aria-hidden="true"` (input has its own accessible label).
- **`SlidersHorizontal`** — trigger button for the mobile FilterSidebar sheet. 20px, `text-slate-900`, paired with the visible label "Filters".
- **`X`** — clear/remove an individual active filter chip (e.g. remove `bedrooms=3`). 16px, `text-muted-foreground`, hover `text-slate-900`; must have `aria-label="Remove filter"` since it's a standalone interactive control.
- **`MapPin`** — small inline icon next to each PropertyCard's address line. 16px, `text-muted-foreground`, decorative (`aria-hidden="true"`).

## 8. UI/UX Aesthetic Rules
Background White `#FFFFFF`; Surface Light Gray `#F7F9FC` for the FilterSidebar panel; Primary Royal Blue (`blue-700`) for active filter chips and the "Load more" button; Heading Dark Navy (`slate-900`); Muted Cool Gray (`slate-500`) for secondary metadata (address, specs). Cards use `rounded-2xl`/`rounded-3xl` corners with ultra-soft diffused shadows; PropertyCard image scales to 105% with `shadow-xl` on hover. **Page-specific layout:** FilterSidebar is a fixed-width left column (desktop, ≥lg) collapsing to a bottom sheet (mobile/tablet); result grid occupies the remaining width using the responsive 1→2→3→4 column breakpoints.

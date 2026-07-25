# ADVANCED SEARCH PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Advanced Search
**Module:** 03 PROPERTY SEARCH
**Purpose:** A dedicated, full-form search page for users (typically Guest/Buyer) who want to construct a precise structured query before viewing results, rather than typing free text into the SearchHero. Combines an AI free-text field with granular structured filters (price, bedrooms, property type, city) in a single form, then navigates to Search Result with the assembled query string.

## 2. Next.js Routing Path
```text
app/(03_property_search)/advanced-search/page.tsx
```
Client-heavy page (form-driven); on submit it performs a client-side navigation to `search-result` with the filters serialized as URL search params.

## 3. Required UI Components
- **AdvancedSearchForm** — a full-page (not modal) form combining: free-text `q` input (AI search), price range slider/dual-input (`minPrice`/`maxPrice`), bedrooms stepper, property type selector (`HOUSE`/`APARTMENT`/`LAND`), city/location autocomplete input.
- **FilterChipPreview** — live-updating row of chips reflecting the filters currently set in the form, so the user can see/remove selections before submitting.
- **Button (Primary)** — "Search Properties" submit CTA, disabled while form is in an invalid state.
- **Button (Secondary)** — "Reset Filters" to clear the form back to defaults.
- **Skeleton** — not typically needed on this page itself (no data fetch on load) but reserved for an optional "popular searches" suggestion panel if fetched from the server.

## 4. Data & State Management
- **Filter state (URL search params on submit, NOT `useState` for the final source of truth)** — the in-progress form uses `react-hook-form` local state while being edited, but on submit the values are written into the URL of the `search-result` route as: `q`, `minPrice`, `maxPrice`, `city`, `bedrooms`. `cursor` is never set from this page (always starts a fresh, first-page query).
- **Server State:** This page itself does not require an RSC data fetch for its core function; it may optionally pre-fetch a list of popular cities/locations for the autocomplete via a lightweight server action.
- **Local State:** Transient in-progress form values (via `react-hook-form`) before submission; the "Reset Filters" action clears this local form state only, distinct from clearing already-applied URL filters on the results page.
- **Form Handling:** `react-hook-form` + Zod (`zodResolver`) validation: `minPrice <= maxPrice`, `bedrooms >= 0`, `propertyType` in the allowed enum (`HOUSE`, `APARTMENT`, `LAND`). Validation errors block submission and are shown inline per field.

## 5. API Endpoints Referenced
- No direct data fetch on this page for the primary flow — it constructs a query for `GET /api/v1/properties` (params `q`, `minPrice`, `maxPrice`, `cursor`, `limit`) and hands off navigation to Search Result (`01_SEARCH_RESULT.md`), which performs the actual call.
- If a city/location autocomplete is backed by real data, that would need its own documented endpoint (not present in `52_ENDPOINT_CATALOGUE.md` today); until such an endpoint is documented, the autocomplete should use a static/known city list rather than inventing an undocumented API call.

## 6. Acceptance Criteria (DoD)
- [ ] Submitting the form navigates to `/search-result` with all set filters correctly encoded as URL search params.
- [ ] Invalid combinations (e.g. `minPrice > maxPrice`) are blocked client-side with a clear inline error before any navigation/fetch occurs.
- [ ] "Reset Filters" restores the form to its default empty state without a page reload.
- [ ] FilterChipPreview updates in real time as the user edits any field.
- [ ] Fully keyboard-operable: tab order flows logically through all filter controls; Lighthouse accessibility score ≥ 90.
- [ ] Property type selector only allows the three documented enum values (`HOUSE`, `APARTMENT`, `LAND`) — no free text.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

- **`SlidersHorizontal`** — page header icon signifying "advanced/granular filtering." 24px, `text-blue-700`, decorative (`aria-hidden="true"`) since the page title already conveys meaning.
- **`Home`** — represents the property type selector option group. 20px, `text-slate-500`.
- **`DollarSign`** — labels the price range section. 20px, `text-slate-500`.
- **`X`** — clears an individual chip in FilterChipPreview. 16px, `aria-label="Remove filter"` (interactive, not decorative).

## 8. UI/UX Aesthetic Rules
Background White `#FFFFFF`; form sits inside a Surface Light Gray (`#F7F9FC`) card with `rounded-3xl` corners and ultra-soft diffused shadow, distinct from the plain-white page background to visually separate the form as a single cohesive unit. Primary Royal Blue (`blue-700`) "Search Properties" button; Heading Dark Navy (`slate-900`) for section labels; Muted Cool Gray (`slate-500`) for helper text. **Page-specific layout:** single-column form on mobile, two-column grid of filter fields on desktop (≥md) with the FilterChipPreview row and submit button pinned full-width beneath the grid.

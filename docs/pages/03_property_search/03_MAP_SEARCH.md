# MAP SEARCH PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Map Search
**Module:** 03 PROPERTY SEARCH
**Purpose:** Lets a user explore properties visually by panning/zooming an interactive map; the property list updates to match the current map viewport (bounds), and clicking a pin highlights the corresponding PropertyCard (and vice versa). Complements the text/filter-driven Search Result and Advanced Search pages for users who think geographically rather than by keyword.

## 2. Next.js Routing Path
```text
app/(03_property_search)/map-search/page.tsx
```
Primarily a client component (map libraries require the DOM/window); an outer RSC shell can still handle the initial SEO-relevant shell and pass `searchParams` in as initial props.

## 3. Required UI Components
- **MapView** — interactive map wrapper (e.g. Mapbox GL JS or Leaflet, per whichever is finalized in `34_FRONTEND_ARCHITECTURE.md`/infra docs) rendering a pin per property in the current viewport; pins visually differentiate `FULLY_VERIFIED` (solid/primary) vs other statuses (muted).
- **PropertyCard list (synced panel)** — scrollable list alongside/below the map; scrolling or clicking a card pans/highlights the matching pin, and vice versa (bidirectional sync).
- **List/Map view toggle** — explicit control (not just responsive behavior) that lets a keyboard/screen-reader user switch to a pure list view that does not depend on the map at all — this is an accessibility requirement, not a cosmetic one.
- **Skeleton loaders** — placeholder pins/pulse card list while the bounds-query request is in flight after a pan/zoom.
- **EmptyState** — "No properties in this area" shown when a bounds query returns zero results, with a CTA to zoom out or clear filters.
- **FilterSidebar (compact variant)** — collapsible filter panel (price, bedrooms, type) layered over or beside the map, consistent with Search Result's filters.

## 4. Data & State Management
- **URL search params (shareable filter/view state):** `q` (optional AI text, applied within the current bounds), `minPrice`, `maxPrice`, `bedrooms`, `city` — same convention as Search Result, so a shared map-search URL reproduces the same filtered view.
- **Local state (legitimately not URL-driven):** current map viewport — `lat`, `lng` (center) and `zoom` — plus `bounds` (the live bounding box) change continuously during pan/drag gestures; committing every intermediate frame to the URL would be noisy and harmful to history/back-button UX. Instead, bounds are debounced and only the settled bounds trigger a data refetch; the list/map active-tab toggle (mobile) is also local UI state.
- **Server State:** Fetch is re-triggered (client-side, debounced ~300-500ms after the map stops moving) whenever `bounds` settles or a filter param changes; response replaces the current property list and updates pins.
- **Form Handling:** The compact FilterSidebar reuses the same `react-hook-form` + Zod pattern as Search Result for validating price/bedroom inputs.

## 5. API Endpoints Referenced
- **Documentation gap:** There is currently **no documented endpoint** in `52_ENDPOINT_CATALOGUE.md` for a map-bounds/geo query. The existing `GET /api/v1/properties` only supports `q`, `minPrice`, `maxPrice`, `cursor`, `limit` — no `lat`/`lng`/bounds parameters exist today.
- **Proposed resolution (consistent with existing conventions):** extend the same endpoint rather than introduce a new one — e.g. `GET /api/v1/properties?minLat=..&maxLat=..&minLng=..&maxLng=..` (or `lat`/`lng`/`radiusKm` for a center+radius variant, shared with `04_NEARBY_SEARCH.md`) — combined with the existing `q`/`minPrice`/`maxPrice` filters and cursor pagination. This must be formally added to `52_ENDPOINT_CATALOGUE.md` and the request/response contract confirmed before implementation; this page cannot be built against a real API until that gap is closed.
- Same `AI_SERVICE_DOWN` (503) fallback applies if `q` is present: the map should still render pins from the structured-filter-only result set, never a blank map.

## 6. Acceptance Criteria (DoD)
- [ ] Panning/zooming the map re-queries properties within the new bounds (debounced) and updates both pins and the card list.
- [ ] Clicking a pin highlights/scrolls to its PropertyCard; clicking a card highlights/pans to its pin (bidirectional).
- [ ] A List/Map toggle provides a fully non-map, keyboard- and screen-reader-accessible alternative view of the same result set (required per `09_USER_JOURNEY.md` map accessibility rule).
- [ ] Verified properties are visually distinguished on the map (e.g. solid pin) and still rank first in the synced list.
- [ ] Zero results in the current viewport show EmptyState with a "zoom out" or "clear filters" CTA, never a silently empty map.
- [ ] Skeleton/pulse indicators appear during the debounced bounds-query fetch — no blank flash of pins disappearing.
- [ ] Documentation gap (map-bounds endpoint) is explicitly called out in this file and tracked, not silently worked around with an invented endpoint.
- [ ] Lighthouse accessibility score ≥ 90 for the non-map (list) view at minimum.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

- **`MapPin`** — used both for the page's map pins concept and inline on cards for address. 20-24px on the map itself (rendered as the marker), 16px inline on cards; markers are the one case where the icon IS the interactive element, so pins carry `aria-label="View property: {title}"`.
- **`Map`** / **`List`** — the two icons for the List/Map toggle control; both must have visible text labels ("Map", "List") in addition to the icon, plus `aria-pressed` state for the active view.
- **`SlidersHorizontal`** — opens the compact filter panel overlay. 20px, `text-slate-900`.
- **`Maximize`** — optional "expand to fullscreen map" control on mobile. 20px, `aria-label="Expand map"`.

## 8. UI/UX Aesthetic Rules
Background White `#FFFFFF` for surrounding chrome; map itself uses its own tile styling but overlay cards/panels follow the Surface Light Gray (`#F7F9FC`) + `rounded-2xl` + soft-shadow system. Primary Royal Blue (`blue-700`) for the active pin state and the List/Map toggle's selected segment. **Page-specific layout:** desktop uses a 60/40 split — map occupies ~60% width on the left/main area, the synced PropertyCard list occupies the remaining ~40% as a scrollable right-hand column; mobile uses a full-screen map with a draggable bottom-sheet list (collapsed to a peek height showing 1 card, expandable to full list) rather than a side-by-side split.

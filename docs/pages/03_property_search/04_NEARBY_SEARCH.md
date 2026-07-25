# NEARBY SEARCH PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Nearby Search
**Module:** 03 PROPERTY SEARCH
**Purpose:** A "properties near me" experience that uses the browser Geolocation API to center a radius-based query on the user's current physical location, returning verified/nearby properties sorted by distance. Distinct from Map Search (user manually explores a map) — Nearby Search is a one-tap, location-permission-driven shortcut, typically surfaced as a prominent CTA on the homepage or main nav for mobile users.

## 2. Next.js Routing Path
```text
app/(03_property_search)/nearby-search/page.tsx
```
Client component required (Geolocation API is browser-only); page requests permission on mount/CTA-tap and renders results once a position is obtained.

## 3. Required UI Components
- **LocationPermissionPrompt** — explicit UI state shown before the browser permission dialog resolves, and a distinct fallback state if the user denies permission (with a manual "Enter your city instead" fallback linking to Advanced Search).
- **RadiusSelector** — chip/segmented control to choose search radius (e.g. 1km / 5km / 10km / 25km).
- **PropertyCard grid/list** — same card component as Search Result, but each card additionally displays a computed distance (e.g. "1.2 km away").
- **Skeleton loaders** — shown while awaiting both the geolocation fix and the subsequent API response.
- **EmptyState** — "No properties found nearby" with a CTA to increase radius or switch to Map Search / Advanced Search.
- **Mini inline map (optional)** — small non-interactive map preview showing the user's location + nearby pins, linking through to full Map Search for deeper exploration.

## 4. Data & State Management
- **Local state (not URL params, by necessity):** the user's live `latitude`/`longitude` from `navigator.geolocation` are not persisted as shareable URL state — a location fix is inherently ephemeral/session-specific and re-sharing another user's coordinates would be meaningless (and a privacy concern). Geolocation permission status (`prompt` / `granted` / `denied`) is also local state.
- **URL search params (the parts that ARE legitimately shareable):** once a position is obtained, the *effective* query can still be reflected for shareability — `radiusKm` (selected radius) and the resulting `lat`/`lng` MAY be written to the URL after the fix is obtained, so a "share this nearby search" link is possible; but they are never the initial source of truth (browser geolocation always takes priority on fresh page load with no existing lat/lng params).
- **Server State:** Once coordinates + radius are known, an RSC or client fetch queries properties by distance and renders the sorted list.
- **Form Handling:** RadiusSelector is a simple controlled segmented control, not a full react-hook-form instance (no free-text validation needed).

## 5. API Endpoints Referenced
- **Documentation gap:** `52_ENDPOINT_CATALOGUE.md` has no documented geo-radius endpoint. `GET /api/v1/properties` today only accepts `q`, `minPrice`, `maxPrice`, `cursor`, `limit`.
- **Proposed resolution:** extend the same endpoint consistently with the Map Search proposal — `GET /api/v1/properties?lat=..&lng=..&radiusKm=..` — returning results sorted by computed distance (and still respecting `status = FULLY_VERIFIED` ranking priority within that radius per FR-SEARCH-002, or clearly documenting if distance sort overrides verification-first ranking for this page specifically — this precedence decision itself needs to be made explicit in `52_ENDPOINT_CATALOGUE.md` when the endpoint is added). Each returned item should additionally include a computed `distanceKm` field not currently in the documented response shape (`{id,title,price,status,imageUrl}`), which also needs to be added to the endpoint's response contract.
- This page cannot be implemented against a real backend until the above endpoint and response-shape additions are formally specified.
- `AI_SERVICE_DOWN` is not applicable here (no free-text `q` in the primary flow), but `VALIDATION_FAILED` (400) applies to malformed `lat`/`lng`/`radiusKm`.

## 6. Acceptance Criteria (DoD)
- [ ] On page load, the browser geolocation permission prompt is triggered (or, if already granted, the fix is obtained silently) before any list renders.
- [ ] If permission is denied, a clear fallback UI offers manual city entry (linking to Advanced Search) instead of a dead end.
- [ ] Changing the radius re-queries and re-renders the list without a full page reload.
- [ ] Each PropertyCard shows a human-readable distance value.
- [ ] Zero-results state offers a CTA to expand radius.
- [ ] Skeleton loaders cover both the "waiting for geolocation" and "waiting for API response" phases distinctly (no indefinite spinner with no explanation).
- [ ] Documentation gap (geo-radius endpoint + `distanceKm` field) is explicitly flagged here, not silently invented.
- [ ] Lighthouse accessibility score ≥ 90; radius selector is keyboard-operable.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

- **`LocateFixed`** — primary icon for the "Use my location" / nearby CTA and the permission-prompt state. 24px, `text-blue-700`.
- **`MapPin`** — inline on each PropertyCard next to the computed distance value. 16px, `text-muted-foreground`, decorative.
- **`Radar`** — represents the radius concept in the RadiusSelector header/label. 20px, `text-slate-500`, decorative.
- **`AlertTriangle`** — shown in the permission-denied fallback state. 20px, `text-amber-500`, paired with explanatory text (not standalone).

## 8. UI/UX Aesthetic Rules
Background White `#FFFFFF`; RadiusSelector chips use Surface Light Gray (`#F7F9FC`) inactive / Royal Blue (`blue-700`) active state, `rounded-2xl`. Distance text uses Muted Cool Gray (`slate-500`); property titles remain Heading Dark Navy (`slate-900`). **Page-specific layout:** single centered column on mobile (the primary target for a "near me" feature) with the RadiusSelector pinned beneath a compact page header; desktop optionally introduces a secondary column with the mini inline map preview, but the page must remain fully usable and CTA-clear on narrow viewports first.

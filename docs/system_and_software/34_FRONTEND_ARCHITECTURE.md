# 34. FRONTEND ARCHITECTURE
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Frontend Architectural Paradigm

## 2. Purpose
To define the global client-side strategy, focusing on State Management, Data Fetching, and Routing strategies that power the user experience.

## 3. Scope
Covers Global State, Caching, Mutational UI, and Route prefetching.

## 4. Audience
- **Frontend Engineers:** As the overarching strategy guide.

## 5. Dependencies
- Extends the component-level rules in `33_COMPONENT_ARCHITECTURE.md`.
- Governed by `94_FRONTEND_GOVERNANCE.md`'s SSOT ownership matrix (this document owns state management/URL/optimistic-UI patterns — it does not own any color/component/layout token, all of which live in `15_DESIGN_SYSTEM.md`/`17_COMPONENT_LIBRARY.md`).
- Cross-references `27_DASHBOARD_DESIGN_GUIDELINES.md` for dashboard-specific data patterns (e.g. per-role Empty/Loading/Error states) rather than restating them here.

## 6. Definitions
- **SWR / React Query:** Libraries for data fetching that provide automatic caching and revalidation.
- **Optimistic UI:** A pattern where the UI updates instantly after a user action, assuming the server request will succeed, hiding network latency.

## 7. Architecture
Server-driven UI (Next.js) heavily optimized for Edge caching.

## 8. Requirements

### 8.1. State Management Philosophy
- **Tinggalkan Redux:** Penggunaan *global state managers* berat seperti Redux sangat **DILARANG**. Mereka menambah *bundle size* yang tidak perlu dan menyulitkan integrasi dengan RSC.
- **Server State (90%):** Data properti, *booking*, dan profil pengguna harus dikelola oleh Next.js Server Components dan Route Cache. Gunakan Server Actions (`"use server"`) untuk mutasi data secara langsung.
- **Local State (10%):** State sementara seperti input form, status buka/tutup modal, atau nilai *filter* yang belum di-*submit*, cukup menggunakan React `useState` atau parameter URL (Search Params).

### 8.2. URL as the Source of Truth
- Filter pencarian (Lokasi, Harga, Kamar) TIDAK BOLEH disimpan dalam `useState`. 
- Filter HARUS disimpan sebagai parameter URL (misal: `?city=BSD&minPrice=1M`). 
- **Alasan:** Memungkinkan pengguna untuk menyalin URL (*Shareable Link*) dan membagikan hasil pencariannya yang spesifik kepada orang lain, yang merupakan *User Behavior* sangat umum di industri properti.

### 8.3. Optimistic UI Mutations
- **Pattern (apply whenever a mutation has a real, existing endpoint):** the UI should update instantly on user action (e.g. toggling a toggle-able icon state) without waiting for the API response, using React 19's built-in `useOptimistic` hook. If the API responds with an error, revert to the prior state and show a Toast.
- **Worked example, once the backing entity ships:** a "Favorit" (save/wishlist) icon on a PropertyCard would use exactly this pattern — instant fill on click, revert + Toast on failure. As of this revision, no `SavedProperty`/`Favorite` entity or endpoint exists in `40_ERD.md`/`52_ENDPOINT_CATALOGUE.md` yet (tracked as an open gap in `docs/pages/05_buyer_dashboard/03_SAVED_PROPERTY.md`) — this example illustrates the *pattern* to use once that entity exists, it is not a statement that the feature is currently implementable. Do not wire `useOptimistic` against an endpoint that doesn't exist; see `95_FRONTEND_ENGINEERING_HANDBOOK.md` §8.4 for this exact pitfall.

## 9. Implementation
- Frontend engineers must use Next.js `<Link>` tags extensively to trigger automatic background pre-fetching of route chunks, ensuring instant page transitions.

## 10. Acceptance Criteria
- [x] Replaces legacy state management (Redux) with modern Server Actions.
- [x] Mandates URL-based state for critical search functionality.

## 11. Future Improvements
- Implementation of Progressive Web App (PWA) offline caching strategies.

## 12. References
- *Next.js Caching Strategies*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.1.0   | 2026-07-27 | Frontend Documentation Suite Step 1 | APPROVED | Reworded §8.3's Optimistic UI example — it previously presented the "Favorit" feature as if its backing entity already existed; now explicitly framed as a pattern for once `SavedProperty`/`Favorite` ships, cross-referencing the real open gap in `docs/pages/05_buyer_dashboard/03_SAVED_PROPERTY.md`. Added `94`/`27` to Dependencies. |

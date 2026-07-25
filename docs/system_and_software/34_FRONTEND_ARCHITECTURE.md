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
- Saat pengguna mengklik ikon "Favorit" pada properti, UI harus langsung berubah seketika menjadi "Terisi" tanpa menunggu respon API (menggunakan hook `useOptimistic` bawaan React 19). Jika API merespons gagal (*error*), kembalikan ke *state* semula dan tampilkan pesan *Toast*.

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

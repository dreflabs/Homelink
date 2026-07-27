# 33. COMPONENT ARCHITECTURE
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 React Component Architecture

## 2. Purpose
To dictate how React components are built, structured, and composed within the application. This ensures components are performant, reusable, and easily testable.

## 3. Scope
Covers React 19 Client vs Server Components, Prop typing, and State Management at the component level.

## 4. Audience
- **Frontend Engineers:** As a strict coding standard for UI implementation.

## 5. Dependencies
- Complements `34_FRONTEND_ARCHITECTURE.md` and implements elements from `17_COMPONENT_LIBRARY.md` (26 components across Base Primitives, Overlay/Feedback, Data Display, the Card System, and Signature Composites — not merely the 5-component set from that document's earliest revision).
- Governed by `94_FRONTEND_GOVERNANCE.md`'s SSOT ownership matrix; onboarding path documented in `95_FRONTEND_ENGINEERING_HANDBOOK.md`.

## 6. Definitions
- **RSC (React Server Component):** Components that fetch data and render exclusively on the server, sending only HTML to the client (Zero JS bundle).
- **Client Component:** Standard interactive React components (useState, onClick) denoted by the `"use client"` directive.

## 7. Architecture
React 19 / Next.js App Router Component Paradigm.

## 8. Requirements

### 8.1. The "Default to Server" Rule
- Secara *default*, seluruh komponen baru yang dibuat HARUS berupa **React Server Component**.
- Jangan pernah menambahkan directive `"use client"` kecuali komponen tersebut benar-benar membutuhkan interaktivitas klien (misal: *onClick listeners*, hooks `useState/useEffect`, atau *Browser APIs*).

### 8.2. Composition Pattern (Interleaving)
Jika Anda memiliki hierarki di mana Server Component membungkus Client Component, namun perlu menyuntikkan data statis berat ke dalamnya, gunakan pola *children composition* alih-alih melempar prop.

```tsx
// BENAR: Menggunakan pola children
// ServerComponent.tsx
import ClientWrapper from './ClientWrapper';
import HeavyServerComponent from './HeavyServerComponent';

export default function Page() {
  return (
    <ClientWrapper>
      <HeavyServerComponent /> 
    </ClientWrapper>
  );
}
```

### 8.3. Type Safety (Zod & TypeScript)
- Setiap komponen HARUS mendefinisikan *interface props*-nya secara eksplisit.
- Komponen formulir (`<form>`) tidak boleh mengandalkan validasi manual kustom. Wajib menggunakan integrasi `react-hook-form` yang divalidasi oleh `zodResolver`.

## 9. Implementation
- Peer code reviews must reject Pull Requests that unnecessarily use `"use client"` at the root layout or high-level page components, as this ruins performance (LCP).

## 10. Acceptance Criteria
- [x] Clear rules for distinguishing and combining Server and Client components.
- [x] Mandatory Type Safety protocols defined.

## 11. Future Improvements
- Component-level automated visual regression testing (Chromatic) integration.

## 12. References
- *React Server Components Documentation*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.1.0   | 2026-07-27 | Frontend Documentation Suite Step 1 | APPROVED | Updated Dependencies to reflect `17_COMPONENT_LIBRARY.md`'s current 26-component inventory and to reference `94_FRONTEND_GOVERNANCE.md`/`95_FRONTEND_ENGINEERING_HANDBOOK.md`. No content contradictions found — this document's Server/Client Component rules and composition patterns remain accurate as written. |

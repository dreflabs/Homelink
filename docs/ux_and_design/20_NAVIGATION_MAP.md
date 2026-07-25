# 20. NAVIGATION MAP
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Global Navigation Map

## 2. Purpose
To map the interconnected pathways a user can take to move between different screens (defined in the Screen Inventory). This prevents dead-ends and ensures logical flow.

## 3. Scope
Covers Global Header navigation, Footer navigation, and Dashboard side-navigation.

## 4. Audience
- **Frontend Engineers:** For configuring the `<Navbar>` and `<Sidebar>` components.
- **UX Designers:** For linking Figma prototypes.

## 5. Dependencies
- Visualizes the structure defined in `19_INFORMATION_ARCHITECTURE.md`.

## 6. Definitions
- **Global Navigation:** The navigation bar that persists across almost all screens in the application.

## 7. Architecture
N/A

## 8. Requirements

### 8.1. Navigation Tree Diagram

```mermaid
graph TD
    %% Define Styles
    style GlobalNav fill:#0F172A,stroke:#F8FAFC,stroke-width:2px,color:#fff
    style DashboardNav fill:#10B981,stroke:#F8FAFC,stroke-width:2px,color:#fff

    GlobalNav[Global Header Nav] --> Home[Home (Logo)]
    GlobalNav --> Beli[Beli Properti]
    GlobalNav --> Sewa[Sewa Properti]
    GlobalNav --> Jual[Jual Properti (Owner Hub)]
    GlobalNav --> Auth[Masuk / Daftar]
    GlobalNav --> UserMenu[User Profile Dropdown]

    UserMenu --> DashboardNav[Dashboard Sidebar Nav]
    
    DashboardNav --> DB_Overview[Ringkasan]
    DashboardNav --> DB_Bookings[Jadwal Survey Saya]
    DashboardNav --> DB_Favorites[Favorit]
    DashboardNav --> DB_MyListings[Listing Saya (Owner)]
    DashboardNav --> DB_Settings[Pengaturan Akun]
```

### 8.2. Navigation Rules
1. **Sticky Header:** Global Navigation HARUS bersifat *sticky* (menempel di atas) saat di-*scroll*, menggunakan efek *Glassmorphism* agar konteks halaman tetap terlihat.
2. **Contextual Action:** Tombol CTA utama di Header berubah berdasarkan status login. 
   - *Guest:* "Masuk / Daftar"
   - *Logged In:* Menampilkan Avatar Pengguna dengan menu dropdown.
3. **No Dead Ends (Orphan Pages):** Setiap halaman HARUS memiliki rute kembali (*breadcrumbs* atau tautan balik) ke halaman sebelumnya atau Homepage.

## 9. Implementation
- Frontend team must implement active state styling for navigation links to indicate the user's current location (e.g., bolder text or underline for the active route).

## 10. Acceptance Criteria
- [x] All primary top-level routes are accessible within 1 click from the Homepage.
- [x] Clearly distinguishes between public navigation and authenticated dashboard navigation.

## 11. Future Improvements
- N/A

## 12. References
- `18_SCREEN_INVENTORY.md`

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

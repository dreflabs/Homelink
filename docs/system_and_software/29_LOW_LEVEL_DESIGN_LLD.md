# 29. LOW LEVEL DESIGN (LLD)
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Low Level Design (LLD) - Data Flow & Component Interfaces

## 2. Purpose
To define the granular details of how specific, critical subsystems work internally. This document outlines exact function signatures, data structures, and algorithms for core logic.

## 3. Scope
Covers the specific internal design of the "Booking Engine" and "Search Filter Logic" components.

## 4. Audience
- **Backend/Fullstack Engineers:** As direct instructions for writing functions and queries.

## 5. Dependencies
- Dependent on `28_HIGH_LEVEL_DESIGN_HLD.md`.

## 6. Definitions
- **Mutex / Lock:** A mechanism to prevent multiple threads (or requests) from modifying the same data simultaneously.

## 7. Architecture
N/A

## 8. Requirements

### 8.1. LLD: Survey Booking Engine
**Problem:** Mencegah *Double Booking* ketika dua pembeli menekan tombol "Jadwalkan" secara milidetik bersamaan pada slot waktu yang sama.

**Algorithm (Optimistic Concurrency Control):**
1. Menerima `POST /api/bookings` dengan *payload*: `{ propertyId, date, timeSlot }`.
2. Sistem memulai *Database Transaction* via Prisma.
3. Melakukan *query*: `SELECT id FROM Booking WHERE propertyId = ? AND date = ? AND timeSlot = ? FOR UPDATE`. (Row-level lock).
4. Jika hasil ditemukan $\rightarrow$ Lempar *Error 409 Conflict* (Slot sudah penuh).
5. Jika kosong $\rightarrow$ `INSERT` data *booking* baru.
6. *Commit Transaction*.

**Code Signature Expectation:**
```typescript
interface CreateBookingPayload {
  propertyId: string;
  buyerId: string;
  date: string; // ISO-8601 YYYY-MM-DD
  timeSlot: 'MORNING' | 'AFTERNOON' | 'EVENING';
}

async function createBookingTransaction(payload: CreateBookingPayload): Promise<BookingResult>;
```

### 8.2. LLD: Search Filter Pipeline
**Problem:** Membangun *query builder* dinamis berdasarkan input *filter* yang kompleks (Harga, Lokasi, Fasilitas) tanpa mengorbankan performa SQL.

**Logic Flow:**
1. Menerima *query parameters* dari URL: `?minPrice=1M&maxPrice=5M&city=BSD`.
2. Melewati validasi Zod Schema.
3. Membangun objek *query* Prisma secara kondisional.
4. Mengeksekusi pencarian dengan limit dan kursor paginasi.

**Code Signature Expectation:**
```typescript
const buildSearchQuery = (filters: ValidatedFilters) => {
  const where: Prisma.PropertyWhereInput = {
    status: 'FULLY_VERIFIED', // Immutable security rule
  };
  
  if (filters.minPrice || filters.maxPrice) {
    where.price = { gte: filters.minPrice, lte: filters.maxPrice };
  }
  
  return where;
}
```

## 9. Implementation
- Engineers must use Prisma's `$transaction` API for the Booking Engine to ensure ACID compliance.

## 10. Acceptance Criteria
- [x] Race conditions (Double booking) are explicitly addressed.
- [x] Clear typing and function signatures are provided.

## 11. Future Improvements
- N/A

## 12. References
- *Prisma Transactions Documentation*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |

# 40. ENTITY RELATIONSHIP DIAGRAM (ERD)
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Core Entity Relationship Diagram (ERD)

## 2. Purpose
To provide a visual and structural blueprint of the PostgreSQL database schema. This helps engineers understand how data entities interact and relate to each other.

## 3. Scope
Covers Phase 1 tables: Users, Properties, Bookings, and Verification Audits.

## 4. Audience
- **Database / Backend Engineers:** For writing Prisma schema files.
- **Data Analysts:** For crafting SQL joins.

## 5. Dependencies
- Directly dictates the Prisma modeling defined in `37_DATABASE_ARCHITECTURE.md`.

## 6. Definitions
- **PK:** Primary Key (UUID).
- **FK:** Foreign Key.
- **One-to-Many (1:N):** A relationship where one record in Table A relates to multiple records in Table B.

## 7. Architecture
PostgreSQL Relational DB.

## 8. Requirements

### 8.1. Mermaid ERD Visualization

```mermaid
erDiagram
    %% Entities
    USER {
        uuid id PK
        string email UK
        string name
        string role "GUEST, BUYER, OWNER, ADMIN, SURVEYOR"
        string passwordHash
        boolean isEmailVerified
        datetime createdAt
        datetime updatedAt
    }

    PROPERTY {
        uuid id PK
        uuid ownerId FK
        string title
        string description
        decimal price
        string propertyType "HOUSE, APARTMENT, LAND"
        string status "PENDING, REJECTED, PHYSICAL_VERIFIED, LEGAL_VERIFIED, FULLY_VERIFIED"
        string address
        float latitude
        float longitude
        string embeddingVector "pgvector(1536)"
        datetime createdAt
        datetime updatedAt
    }

    PROPERTY_MEDIA {
        uuid id PK
        uuid propertyId FK
        string mediaType "IMAGE, PDF_CERTIFICATE"
        string s3Url
        boolean isPrimary
        datetime createdAt
    }

    BOOKING {
        uuid id PK
        uuid propertyId FK
        uuid buyerId FK
        date surveyDate
        string timeSlot "MORNING, AFTERNOON, EVENING"
        string status "PENDING, CONFIRMED, COMPLETED, CANCELLED"
        datetime createdAt
    }

    VERIFICATION_AUDIT {
        uuid id PK
        uuid propertyId FK
        uuid surveyorId FK
        string action "APPROVED_PHYSICAL, REJECTED_LEGAL"
        string notes
        datetime createdAt
    }

    ACCOUNT {
        uuid id PK
        uuid userId FK
        string provider "GOOGLE, APPLE"
        string providerAccountId
        string refreshToken
        string accessToken
        datetime createdAt
    }

    AUDIT_LOG {
        uuid id PK
        uuid actorId FK
        string action "UPDATE_PROPERTY_PRICE, APPROVE_VERIFICATION, LOGIN_FAILED"
        uuid entityId
        json oldValues
        json newValues
        string ipAddress
        datetime createdAt
    }

    AGENCY {
        uuid id PK
        string name
        string address
        string phone
        datetime createdAt
    }

    PARTNER_AGENT_PROFILE {
        uuid id PK
        uuid userId FK
        uuid agencyId FK
        string licenseNo
        string bio
        decimal rating
        datetime createdAt
    }

    AGENT_CLIENT {
        uuid id PK
        uuid agentId FK
        string name
        string email
        string phone
        string status
        datetime createdAt
    }

    %% Relationships
    USER ||--o{ PROPERTY : "owns (1:N)"
    USER ||--o{ BOOKING : "books (1:N)"
    USER ||--o{ VERIFICATION_AUDIT : "performs (1:N)"
    USER ||--o{ ACCOUNT : "links OAuth (1:N)"
    USER ||--o{ AUDIT_LOG : "acts as (1:N)"
    
    PROPERTY ||--o{ PROPERTY_MEDIA : "has (1:N)"
    PROPERTY ||--o{ BOOKING : "receives (1:N)"
    PROPERTY ||--o{ VERIFICATION_AUDIT : "undergoes (1:N)"
    
    %% Phase 4 Relationships
    AGENCY ||--o{ PARTNER_AGENT_PROFILE : "employs (1:N)"
    USER ||--|| PARTNER_AGENT_PROFILE : "has profile (1:1)"
    PARTNER_AGENT_PROFILE ||--o{ AGENT_CLIENT : "manages client (1:N)"
    PARTNER_AGENT_PROFILE ||--o{ PROPERTY : "manages property (1:N)"
```

**Catatan v1.0.2:** Penambahan `AGENCY`, `PARTNER_AGENT_PROFILE`, dan `AGENT_CLIENT` untuk melengkapi Ekstensi ERD Fase 4 (Agent Management).

## 9. Implementation
- Backend engineers must map this ERD strictly into `schema.prisma`.
- All `id` fields MUST be `UUIDv4`, not auto-incrementing integers, to prevent enumeration attacks.

## 10. Acceptance Criteria
- [x] All primary entities for Phase 1 are mapped.
- [x] Cardinality (1:N, 1:1) is clearly visualized.
- [x] Phase 4 Agent models are integrated.

## 11. Future Improvements
- Expand ERD for Finance/Billing deeply.

## 12. References
- *Mermaid ER Diagram Syntax*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Status/TimeSlot updates. |
| 1.0.2   | 2026-07-28 | Data AI              | APPROVED | Phase 4 Agent extensions. |

# KBOB Fachdatenkatalog Requirements Specification

## Project Overview

**Project Name:** KBOB Fachdatenkatalog (KBOB BIM Data Catalog)

**Purpose:** An open-source, web-based reference catalog for Building Information Modeling (BIM) data requirements in Swiss public construction projects. It defines standardized building element classifications, Level of Information (LOI) requirements per project phase, and IFC mappings to reduce data ambiguity and improve interoperability across federal, cantonal, and municipal construction organizations.

**Target Users:**
- Federal, cantonal, and municipal authorities
- Public and institutional building owners
- Infrastructure operators and portfolio managers
- Architects and planning consultants
- Engineers and contractors
- BIM coordinators
- Software vendors and system integrators

**Current Status:** Production demonstration with comprehensive data model, five integrated catalogs, and static JSON data. Supabase backend and full multilingual UI support planned for future development.

---

## Implementation Status Legend

| Symbol | Status |
|--------|--------|
| ✅ | Implemented |
| 🔄 | Partially implemented |
| ⏳ | Planned |
| ❌ | Not started |

---

## Functional Requirements

### FR-1: Data Catalogs

| ID | Feature | Description | Status | Notes |
|----|---------|-------------|--------|-------|
| FR-1.1 | 5 browsable catalogs | Elements, Use Cases, Documents, Models, EPDs with list and detail views | ✅ | 80 / 30 / 130 / 10 / 20 records |
| FR-1.2 | Reference data | Attributes, Classifications, Tags used in relationships | 🔄 | 64 / 344 / 22 records; no standalone UI; attribute value lists pending |
| FR-1.3 | Detail views | Full specifications per entity with cross-entity navigation | ✅ | |
| FR-1.4 | Relationships | Bidirectional linking between entities with phase metadata | ✅ | |
| FR-1.5 | Versioning | Version number and last_change date displayed | 🔄 | No version history |

### FR-2: Search & Discovery

| ID | Feature | Description | Status | Notes |
|----|---------|-------------|--------|-------|
| FR-2.1 | Global search | Full-text search across all catalogs with suggestions | ✅ | Name, domain, description |
| FR-2.2 | Filtering | Category/domain and multi-select tag filtering | ✅ | URL persistence |
| FR-2.3 | Phase filtering | Filter by lifecycle phase | ⏳ | |

### FR-3: Multilingual Support

| ID | Feature | Description | Status | Notes |
|----|---------|-------------|--------|-------|
| FR-3.1 | 4 languages | German (primary), French, Italian, English | ✅ | |
| FR-3.2 | Data content | All catalog data translated | ✅ | JSONB i18n objects |
| FR-3.3 | UI text | Navigation, labels, messages | 🔄 | Hardcoded German |
| FR-3.4 | Language switcher | Dropdown for language selection | 🔄 | Present but not functional |

### FR-4: BIM Standards

| ID | Feature | Description | Status | Notes |
|----|---------|-------------|--------|-------|
| FR-4.1 | IFC 4.3 mappings | Entity types, predefined types, Property Sets | ✅ | |
| FR-4.2 | Authoring tools | Element mappings for Revit and ArchiCAD | ✅ | |
| FR-4.3 | VDI 2552 | Use case compliance and 5 lifecycle phases | ✅ | Per Blatt 12.2 |
| FR-4.4 | LOIN/LOG | Phase-specific attribute and geometry requirements | ✅ | |
| FR-4.5 | BPMN diagrams | Interactive process diagrams | ✅ | bpmn-js viewer |

### FR-5: Backend & API

| ID | Feature | Description | Status | Notes |
|----|---------|-------------|--------|-------|
| FR-5.1 | Data storage | Static JSON files | ✅ | /data folder |
| FR-5.2 | Supabase backend | PostgreSQL cloud database | ⏳ | |
| FR-5.3 | REST API | RESTful endpoints for all entities | 🔄 | OpenAPI spec defined; backend pending |
| FR-5.4 | API documentation | Interactive API explorer | ✅ | Swagger UI |

### FR-6: User Interface

| ID | Feature | Description | Status | Notes |
|----|---------|-------------|--------|-------|
| FR-6.1 | CD Bund design | Swiss Federal Corporate Design | 🔄 | Partial compliance |
| FR-6.2 | Responsive layout | Adapts to screen sizes | 🔄 | Desktop optimized; mobile needs work |
| FR-6.3 | Navigation | Sidebar, breadcrumbs, hash-based routing | ✅ | 7 main routes |
| FR-6.4 | Views | Card lists, detail pages, handbook section | ✅ | Sticky sidebar nav |
| FR-6.5 | Utilities | Print, share, deep linking | ✅ | |

### FR-7: Future Integrations

| ID | Feature | Description | Status | Notes |
|----|---------|-------------|--------|-------|
| FR-7.1 | IDS export | Information Delivery Specification rules | ⏳ | |
| FR-7.2 | EIR export | Exchange Information Requirements | ⏳ | Excel format |
| FR-7.3 | bSDD | buildingSMART Data Dictionary linking | ⏳ | |
| FR-7.4 | Swiss federal data | TERMDAT, I14Y, LINDAS integration | ⏳ | Major milestone |
| FR-7.5 | Authoring templates | Revit and ArchiCAD templates | ⏳ | Major milestone |
| FR-7.6 | CDE integration | Common Data Environment connectivity | ⏳ | PIM/AIM |

---

## Non-Functional Requirements

### NFR-1: Performance & Compatibility

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| NFR-1.1 | Page load < 2s, search < 200ms | ✅ | Static hosting optimized |
| NFR-1.2 | Desktop browsers | ✅ | Chrome, Firefox, Safari, Edge (latest 2) |
| NFR-1.3 | Mobile browsers | 🔄 | Basic support; UX needs work |
| NFR-1.4 | Static file hosting | ✅ | GitHub Pages compatible |

### NFR-2: Usability & Accessibility

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| NFR-2.1 | WCAG 2.1 AA | ✅ | Color contrast, ARIA, focus indicators |
| NFR-2.2 | Keyboard navigation | ✅ | |
| NFR-2.3 | Semantic HTML | ✅ | Proper heading hierarchy |
| NFR-2.4 | Print-friendly | ✅ | |

### NFR-3: Security & Maintainability

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| NFR-3.1 | HTTPS only | ✅ | GitHub Pages |
| NFR-3.2 | No framework dependency | ✅ | Vanilla JS, no build step |
| NFR-3.3 | Modular architecture | ✅ | 19 JS modules, CSS tokens |
| NFR-3.4 | MIT license | ✅ | Open source |

---

## Technology Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | HTML5, CSS3 (custom properties), Vanilla JS (ES6+) |
| **Libraries** | bpmn-js (diagrams), Swagger UI (API docs), Lucide (icons) |
| **Typography** | Noto Sans (Google Fonts) |
| **Data** | Static JSON (current), Supabase PostgreSQL (planned) |
| **Hosting** | GitHub Pages |

---

## Data Model Summary

| Entity | Count | Description |
|--------|-------|-------------|
| Elements | 80 | Building components with LOG/LOIN, IFC mappings |
| Use Cases | 30 | BIM processes per VDI 2552 with BPMN |
| Documents | 130 | KBOB/IPB document types with retention |
| Models | 10 | Discipline model definitions |
| EPDs | 20 | Environmental product declarations |
| Attributes | 64 | LOI property definitions (reference) |
| Classifications | 344 | eBKP-H and DIN 276 codes (reference) |
| Tags | 22 | Anwendungsfeld keywords (reference) |

**Lifecycle Phases (VDI 2552 Blatt 12.2):** Entwicklung, Planung, Realisierung, Betrieb, Abbruch

> Full documentation: [data-model.md](data-model.md)

---

## Implementation Roadmap

### Phase 1: Core Catalogs (Q4 2025 - Q1 2026)

**Done:** 5 catalog views, detail pages, search/filter, multilingual data, IFC mappings, BPMN viewer, OpenAPI spec

**Pending:** Functional language switcher, UI translations, mobile UX, full CD Bund compliance

### Phase 2: Enhanced Features (Q2-Q3 2026)

- Supabase backend migration and REST API deployment
- Full multilingual UI
- Mobile/responsive improvements
- Full CD Bund compliance
- Phase-based filtering
- Data export (CSV, JSON)

### Phase 3: Data Export & Validation (Q4 2026)

- IDS checking rules export
- EIR Excel export
- bSDD integration

### Phase 4: Swiss Data Ecosystem (2027)

- TERMDAT, I14Y, LINDAS integration
- Authoring software templates (Revit, ArchiCAD)

### Phase 5: Enterprise & Governance (2027+)

- Content management interface
- User management
- IFC validation engine
- Official KBOB governance framework

---

## Standards Compliance

| Category | Standards | Status |
|----------|-----------|--------|
| **BIM** | ISO 19650, IFC 4.3, EN 17412 (LOIN), VDI 2552, BPMN 2.0 | ✅ |
| **Environmental** | EN 15804 (EPD) | ✅ |
| **Classifications** | eBKP-H, DIN 276 | ✅ |
| **Swiss Federal** | CD Bund | 🔄 |
| **Planned** | bSDD, IDS, TERMDAT, I14Y, LINDAS | ⏳ |

---

## Open Questions

### Governance & Community

1. **Content stewardship**: Who owns and maintains the catalog data? KBOB working group, federal office, or community-driven?
2. **Community of Practice (CoP)**: How will the practitioner community be built and sustained? What events, communication channels, and coordination mechanisms are needed?
3. **Decision authority**: Who approves changes to element definitions, attribute requirements, and classification mappings?
4. **Stakeholder alignment**: How to coordinate federal, cantonal, and municipal interests?
5. **Funding model**: How will long-term maintenance and development be funded?

### Technical & Integration

6. Which CDEs should be prioritized for integration?
7. Should authoring templates be developed in-house or via partnerships?
8. How will data versioning and change management work?
9. Is a dedicated mobile app needed beyond responsive web?

---

## References

**Project:** [Live Demo](https://davras5.github.io/kbob-fdk/) | [GitHub](https://github.com/davras5/kbob-fdk) | [Data Model](data-model.md) | [Style Guide](styleguide.md)

**Standards:** [ISO 19650](https://www.iso.org/standard/68078.html) | [IFC](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/) | [VDI 2552](https://www.vdi.de/richtlinien/unsere-richtlinien-highlights/vdi-2552) | [CD Bund](https://www.bk.admin.ch/bk/de/home/kommunikation/corporate-design-bund.html)

---

## Metrics

| Metric | Value |
|--------|-------|
| Data Records | ~700 |
| Lines of Code | ~10,900 |
| JS Modules | 19 |
| Languages | 4 |
| Phases | 5 |

---

*Last Updated: January 2026 | Version: 2.1.0*

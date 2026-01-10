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
| ❌ | Not started / Out of scope |

---

## Functional Requirements

### FR-1: Data Catalogs

Browse and explore BIM reference data across multiple entity types with detail views, cross-entity navigation, and versioning support.

| Requirement | Status | Notes |
|-------------|--------|-------|
| **Core Catalogs** | | |
| Building Elements catalog | ✅ | 80 elements with geometry (LOG) and LOIN requirements |
| Use Cases catalog | ✅ | 30 BIM processes per VDI 2552 with BPMN diagrams |
| Documents catalog | ✅ | 130 document types per KBOB/IPB |
| Discipline Models catalog | ✅ | 10 BIM model definitions |
| EPD Data catalog | ✅ | 20 environmental product declarations (KBOB Ökobilanzdaten) |
| **Reference Data (used in relationships)** | | |
| Attributes | ✅ | 64 property definitions (displayed in LOIN tables, no standalone view) |
| Classifications | ✅ | 344 codes (displayed on detail pages, no standalone view) |
| Tags | ✅ | 22 keywords (used for filtering, no standalone view) |
| **Common Features** | | |
| Detail views with full specifications | ✅ | Per entity type |
| Cross-entity relationships | ✅ | Bidirectional linking with phase metadata |
| Versioning metadata | 🔄 | Version field + last_change date displayed; no version history |
| Visual identification (images/icons) | ✅ | |

### FR-2: Search & Filtering

| Requirement | Status | Notes |
|-------------|--------|-------|
| Global search across all catalogs | ✅ | |
| Full-text search (name, domain, description) | ✅ | |
| Search results grouped by entity type | ✅ | |
| Real-time search suggestions | ✅ | Dropdown |
| Category/domain filtering | ✅ | |
| Multi-select tag filtering | ✅ | |
| Filter state persistence via URL | ✅ | Hash-based |
| Phase-based filtering | ⏳ | Planned |

### FR-3: Multilingual Support

| Requirement | Status | Notes |
|-------------|--------|-------|
| German (DE) - primary language | ✅ | |
| French (FR) | ✅ | |
| Italian (IT) | ✅ | |
| English (EN) | ✅ | |
| Multilingual data content | ✅ | JSONB storage with i18n objects |
| Language switcher UI | 🔄 | Present but not functional |
| Translated UI text | 🔄 | Data translated; UI chrome hardcoded German |
| Fallback language system | ✅ | Defaults to German |

### FR-4: BIM Standards Integration

| Requirement | Status | Notes |
|-------------|--------|-------|
| IFC 4.3 class mappings | ✅ | Entity types and predefined types |
| IFC Property Set (PSet) specifications | ✅ | |
| Authoring software mappings | ✅ | Revit and ArchiCAD |
| VDI 2552 use case compliance | ✅ | Standard classification codes |
| BPMN 2.0 process diagrams | ✅ | Interactive bpmn-js viewer |
| VDI 2552 lifecycle phases | ✅ | 5 phases per Blatt 12.2 |
| Phase-specific LOIN requirements | ✅ | Attributes per phase |
| Phase-specific LOG requirements | ✅ | Geometry per phase |

### FR-5: Backend & API

| Requirement | Status | Notes |
|-------------|--------|-------|
| Static JSON data files | ✅ | Current implementation |
| Supabase PostgreSQL backend | ⏳ | Planned |
| OpenAPI 3.0 specification | ✅ | 1,313 lines defined |
| REST API endpoints | 🔄 | Spec defined; backend pending |
| Swagger UI documentation | ✅ | Interactive API docs |
| Response caching | ✅ | 5-minute duration |
| Row Level Security | ⏳ | Planned with Supabase |

### FR-6: User Interface

| Requirement | Status | Notes |
|-------------|--------|-------|
| Swiss Federal CD Bund design | 🔄 | Partial compliance |
| Responsive layout | 🔄 | Desktop optimized; mobile needs work |
| Navigation sidebar | ✅ | 7 main routes |
| Breadcrumb navigation | ✅ | |
| Card-based list views | ✅ | |
| Detail page layouts | ✅ | With sticky sidebar navigation |
| Hash-based SPA routing | ✅ | No server required |
| Deep linking support | ✅ | Direct URL to any view |
| Print and share functionality | ✅ | |
| Handbook & documentation section | ✅ | |

### FR-7: Future Integrations

| Requirement | Status | Notes |
|-------------|--------|-------|
| **Data Export & Validation** | | |
| IDS checking rules export | ⏳ | Information Delivery Specification |
| EIR Excel export | ⏳ | Exchange Information Requirements |
| IFC file validation | ⏳ | Long-term goal |
| **External Data Linking** | | |
| bSDD integration | ⏳ | buildingSMART Data Dictionary |
| TERMDAT integration | ⏳ | Federal terminology database |
| I14Y interoperability platform | ⏳ | Swiss data interoperability |
| LINDAS linked data service | ⏳ | Swiss linked open data |
| **Tools & Platforms** | | |
| Authoring software templates | ⏳ | Revit, ArchiCAD - major milestone |
| CDE integration | ⏳ | Common Data Environment (PIM/AIM) |
| Content management interface | ❌ | Manual JSON editing currently |

---

## Non-Functional Requirements

### NFR-1: Performance

| Requirement | Target | Status |
|-------------|--------|--------|
| Initial page load | < 2 seconds | ✅ |
| Catalog list render | < 500ms | ✅ |
| Search response | < 200ms | ✅ |
| Filter application | < 100ms | ✅ |

### NFR-2: Compatibility

| Requirement | Status | Notes |
|-------------|--------|-------|
| Chrome, Firefox, Safari, Edge (latest 2) | ✅ | Desktop browsers |
| Mobile browsers (Chrome, Safari) | 🔄 | Basic support; UX needs work |
| ES6+ JavaScript | ✅ | Required |
| Static file hosting | ✅ | GitHub Pages compatible |

### NFR-3: Usability & Accessibility

| Requirement | Status | Notes |
|-------------|--------|-------|
| WCAG 2.1 AA accessibility | ✅ | Color contrast, ARIA, focus indicators |
| Keyboard navigation | ✅ | |
| Semantic HTML | ✅ | Proper heading hierarchy |
| Print-friendly styles | ✅ | |

### NFR-4: Security

| Requirement | Status | Notes |
|-------------|--------|-------|
| HTTPS only | ✅ | GitHub Pages |
| No sensitive data exposure | ✅ | Public catalog |
| Row Level Security | ⏳ | Planned with Supabase |

### NFR-5: Maintainability

| Requirement | Status | Notes |
|-------------|--------|-------|
| No framework dependency | ✅ | Vanilla JS |
| No build step required | ✅ | Direct HTML/CSS/JS |
| Modular architecture | ✅ | 19 JS modules |
| CSS design tokens | ✅ | tokens.css |
| MIT license | ✅ | Open source |

---

## Technology Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| HTML5 / CSS3 / Vanilla JS (ES6+) | Core application |
| Lucide Icons | SVG iconography |
| Noto Sans | Typography (Google Fonts) |
| bpmn-js | BPMN process visualization |
| Swagger UI | API documentation |

### Backend (Current & Planned)

| Technology | Status | Notes |
|------------|--------|-------|
| JSON files | ✅ Current | /data/*.json |
| Supabase PostgreSQL | ⏳ Planned | Cloud database |
| OpenAPI 3.0 | ✅ Defined | API specification |

### Design System

| Aspect | Implementation |
|--------|----------------|
| Colors | Swiss Federal palette (CSS custom properties) |
| Typography | Noto Sans (400, 500, 600, 700) |
| Spacing | 4px base unit |
| Breakpoints | 640px / 768px / 1024px / 1280px |

---

## Data Model Summary

### Entities

| Entity | Records | Type | Key Features |
|--------|---------|------|--------------|
| Elements | 80 | Core (catalog) | LOG/LOIN requirements, IFC mappings |
| Use Cases | 30 | Core (catalog) | VDI 2552 processes, BPMN diagrams |
| Documents | 130 | Core (catalog) | KBOB/IPB types, retention periods |
| Models | 10 | Core (catalog) | Discipline model definitions |
| EPDs | 20 | Core (catalog) | Environmental impact data |
| Attributes | 64 | Reference (no UI) | LOI property definitions |
| Classifications | 344 | Reference (no UI) | eBKP-H, DIN 276 codes |
| Tags | 22 | Reference (no UI) | Anwendungsfeld keywords |

### Lifecycle Phases (VDI 2552 Blatt 12.2)

| Phase | Name (DE) | Name (EN) |
|-------|-----------|-----------|
| 1 | Entwicklung | Development |
| 2 | Planung | Planning |
| 3 | Realisierung | Construction |
| 4 | Betrieb | Operations |
| 5 | Abbruch | Demolition |

> **Note:** Full data model documentation in [data-model.md](data-model.md)

---

## Implementation Roadmap

### Phase 1: Core Catalogs (Current)

**Completed:**
- [x] All catalog views with browse/search/filter
- [x] Detail views for all entity types
- [x] Cross-entity navigation and relationships
- [x] Multilingual data content (DE/FR/IT/EN)
- [x] IFC and classification mappings
- [x] BPMN process viewer
- [x] OpenAPI specification
- [x] Desktop-optimized responsive design

**Pending:**
- [ ] Functional language switcher
- [ ] Multilingual UI text
- [ ] Mobile UX improvements
- [ ] Full CD Bund compliance

### Phase 2: Enhanced Features

- [ ] Supabase PostgreSQL backend migration
- [ ] REST API deployment
- [ ] Full multilingual UI
- [ ] Improved mobile/responsive design
- [ ] Full Swiss Federal CD Bund compliance
- [ ] Phase-based filtering
- [ ] Data export (CSV, JSON)
- [ ] Comparison view for elements

### Phase 3: Data Export & Validation

- [ ] IDS checking rules export (Information Delivery Specification)
- [ ] EIR Excel export (Exchange Information Requirements)
- [ ] bSDD integration (buildingSMART Data Dictionary)

### Phase 4: Swiss Data Ecosystem Integration

- [ ] TERMDAT integration (Federal terminology)
- [ ] I14Y interoperability platform
- [ ] LINDAS linked data service
- [ ] Authoring software templates (Revit, ArchiCAD)

### Phase 5: Enterprise & Governance

- [ ] Content management interface
- [ ] User management and access control
- [ ] Quality assurance integration
- [ ] IFC validation engine
- [ ] Official KBOB governance framework

---

## Standards Compliance

### BIM Standards

| Standard | Status |
|----------|--------|
| ISO 19650 (Information Management) | ✅ Aligned |
| IFC 4.3 | ✅ Mapped |
| EN 17412 (LOIN) | ✅ Implemented |
| EN 15804 (EPD) | ✅ Compliant |
| VDI 2552 (Use Cases & Phases) | ✅ Compliant |
| BPMN 2.0 | ✅ Implemented |
| bSDD (Data Dictionary) | ⏳ Planned |
| IDS (Information Delivery Spec) | ⏳ Planned |

### Swiss Federal Standards

| Standard | Status |
|----------|--------|
| CD Bund (Corporate Design) | 🔄 Partial |
| TERMDAT | ⏳ Planned |
| I14Y | ⏳ Planned |
| LINDAS | ⏳ Planned |
| DCAT-AP CH | ⏳ Planned |

### Classification Systems

| System | Status |
|--------|--------|
| eBKP-H (Swiss) | ✅ Included |
| DIN 276 (German) | ✅ Included |

---

## Open Questions

1. Which Common Data Environments should be prioritized for integration?
2. Should authoring software templates be developed in-house or via partnerships?
3. How will data standard versioning and change management work?
4. Should IFC validation be embedded or linked to external tools?
5. Is a dedicated mobile application needed beyond responsive web?
6. Should the catalog support offline browsing via service workers?

---

## References

### Project Resources
- [Live Demo](https://davras5.github.io/kbob-fdk/)
- [GitHub Repository](https://github.com/davras5/kbob-fdk)
- [Data Model Documentation](data-model.md)
- [Style Guide](styleguide.md)
- [Vision Document](vision.md)

### Standards
- [ISO 19650](https://www.iso.org/standard/68078.html) - BIM Information Management
- [buildingSMART IFC](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/)
- [VDI 2552](https://www.vdi.de/richtlinien/unsere-richtlinien-highlights/vdi-2552) - BIM Guidelines
- [CD Bund](https://www.bk.admin.ch/bk/de/home/kommunikation/corporate-design-bund.html) - Swiss Federal Design

### Technology
- [Supabase](https://supabase.com/docs)
- [bpmn-js](https://bpmn.io/toolkit/bpmn-js/)
- [OpenAPI 3.0](https://spec.openapis.org/oas/v3.0.0)

---

## Metrics

| Metric | Value |
|--------|-------|
| Total Data Records | ~700 |
| Building Elements | 80 |
| Use Cases | 30 |
| Documents | 130 |
| Supported Languages | 4 |
| Lifecycle Phases | 5 |
| Lines of Code | ~10,900 |
| JavaScript Modules | 19 |

---

*Last Updated: January 2026*
*Version: 2.0.0*

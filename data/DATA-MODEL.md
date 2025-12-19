# KBOB Fachdatenkatalog – Data Model Documentation

This document describes the conceptual and logical data model for the KBOB BIM Data Catalog, a web-based interactive catalog for Building Information Modeling (BIM) requirements, classifications, and information specifications for building elements and documents in Switzerland.

## Table of Contents

- [Purpose and Goals](#purpose-and-goals)
  - [Strategic Alignment](#strategic-alignment)
- [Design Principles](#design-principles)
- [Localization](#localization)
- [Entity Overview](#entity-overview)
- [Entity Relationship Diagram](#entity-relationship-diagram)
- [Common Attributes](#common-attributes)
- [Lifecycle Phases](#lifecycle-phases)
- [Tagging System](#tagging-system)
- [Entity Definitions](#entity-definitions)
  - [Element](#element)
  - [Document](#document)
  - [UseCase](#usecase)
  - [Model](#model)
  - [EPD](#epd)
- [Classification Systems](#classification-systems)
- [Business Rules](#business-rules)
- [Glossary](#glossary)

---

## Purpose and Goals

The KBOB Fachdatenkatalog data model serves as the foundation for standardizing BIM requirements across Swiss public construction projects. 

**Primary Goals:**

1. **Standardization** – Provide a consistent structure for defining BIM requirements that can be referenced in Auftraggeber-Informationsanforderungen (AIA) and BIM-Abwicklungspläne (BAP)

2. **Interoperability** – Enable data exchange through alignment with international standards (IFC, ISO 19650) and Swiss e-government architecture, supporting the federal digital transformation agenda

3. **Lifecycle Coverage** – Support all lifecycle phases from development through decommissioning, with phase-specific requirements for geometry, information, and documentation

4. **Traceability** – Maintain version history and change tracking for audit purposes in public procurement contexts

5. **Discoverability** – Enable filtering, searching, and cross-referencing across multiple classification systems and lifecycle phases

### Strategic Alignment

This data model contributes to Swiss federal digitalization initiatives:

| Initiative | Scope | Relevance |
|------------|-------|-----------|
| [Strategie Digitale Bundesverwaltung](https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/digitale-bundesverwaltung.html) | Federal administration digital transformation | Foundational strategy for digital services |
| [eCH-0279 Architekturvision 2050](https://www.ech.ch/de/ech/ech-0279/1.0.0) | E-government architecture vision | Target architecture for cross-agency data exchange |
| [Strategie Digitale Schweiz – BIM-Massnahme](https://digital.swiss/de/aktionsplan/massnahme/vereinfachung-des-bauens-durch-bessere-dateninteroperabilitat) | Construction data interoperability | Action plan for simplifying construction through better data interoperability (2023–2027) |

The catalog supports the goal of establishing non-discriminatory interoperability principles that benefit all construction stakeholders, from routine task automation to end-to-end data continuity across the building lifecycle.

---

## Design Principles

The data model follows these guiding principles:

| Principle | Description |
|-----------|-------------|
| **Phase-driven requirements** | All requirements (LOG, LOI, documentation) are tied to specific lifecycle phases, allowing progressive detail as projects advance |
| **Multi-classification** | Entities support multiple classification systems simultaneously to bridge Swiss, German, and international standards |
| **Separation of concerns** | Geometry (LOG), information (LOI), and documentation requirements are modeled as distinct concerns with independent phase applicability |
| **Self-describing** | Each entity carries sufficient metadata (version, lastChange, description) to be understood in isolation |
| **Extensible structure** | Nested collections (classifications, attributes, roles) allow entities to grow without schema changes |

---

## Localization

**Current State:** The data model is currently implemented in German (DE) only.

**Future State:** Multi-language support for German (DE), English (EN), French (FR), and Italian (IT) is planned. Localized attributes will include `title`, `description`, enumeration display values, and controlled vocabulary labels.

The underlying data structure and controlled vocabulary codes will remain language-neutral to ensure consistency across locales.

---

## Entity Overview

The catalog manages five main entity types:

| Entity | Purpose | Key Relationships |
|--------|---------|-------------------|
| **Element** | Physical building components with geometry and information requirements | Referenced by Models; linked to Documents |
| **Document** | Project documentation types with format and retention specifications | Referenced by Elements; supports all phases |
| **UseCase** | Standardized BIM processes with roles and responsibilities | References Standards; defines workflows |
| **Model** | BIM discipline and coordination model definitions | Contains Elements; spans phases |
| **EPD** | Environmental impact data for materials (KBOB Ökobilanzdaten) | Supports sustainability analysis |

---

## Entity Relationship Diagram

```mermaid
erDiagram
    ELEMENT ||--o{ GEOMETRY_REQUIREMENT : "has LOG"
    ELEMENT ||--o{ INFORMATION_REQUIREMENT : "has LOI"
    ELEMENT ||--o{ DOCUMENTATION_REQUIREMENT : "requires"
    ELEMENT ||--o{ IFC_MAPPING : "mapped to"
    ELEMENT }o--o{ CLASSIFICATION : "classified by"
    
    MODEL ||--o{ MODEL_ELEMENT : "contains"
    MODEL }o--o{ ELEMENT : "references"
    
    DOCUMENT }o--o{ CLASSIFICATION : "classified by"
    
    USECASE ||--o{ ROLE_DEFINITION : "assigns"
    USECASE ||--o{ PREREQUISITE : "requires"
    USECASE }o--o{ STANDARD : "references"
    
    EPD }o--|| CATEGORY : "belongs to"

    ELEMENT {
        id identifier PK
        version string
        lastChange date
        title string
        category enumeration
        phases phase_array
    }
    
    DOCUMENT {
        id identifier PK
        version string
        lastChange date
        title string
        category enumeration
        formats format_array
        retention enumeration
        phases phase_array
    }
    
    USECASE {
        id identifier PK
        version string
        lastChange date
        title string
        category enumeration
        definition text
        phases phase_array
    }
    
    MODEL {
        id identifier PK
        version string
        lastChange date
        title string
        category enumeration
        phases phase_array
    }
    
    EPD {
        id identifier PK
        uuid identifier UK
        unit enumeration
        gwp numeric
        ubp numeric
        penrt numeric
        pert numeric
    }
```

---

## Common Attributes

All entities share a base set of attributes for identification, versioning, and discoverability:

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | Identifier | ✓ | Unique identifier within entity type |
| `version` | String | ✓ | Version indicator for change tracking |
| `lastChange` | Date | ✓ | Date of last modification (ISO 8601) |
| `title` | String | ✓ | Human-readable display name |
| `image` | String | ✓ | Visual representation reference |
| `category` | Enumeration | ✓ | Primary grouping for filtering |
| `description` | Text | ✓ | Detailed explanation of purpose and scope |
| `tags` | String Collection | ✓ | Keywords for search and filtering (minimum 1) |
| `phases` | Phase Collection | ○ | Applicable lifecycle phases (1–5) |

---

## Lifecycle Phases

All phase-dependent attributes reference the lifecycle phases of a building or asset. The phase model is based on research by Bergische Universität Wuppertal (WUP), which provides a region-neutral framework that aligns with national standards.

| Phase | German | French | Italian | English |
|-------|--------|--------|---------|---------|
| 1 | Entwicklung | Développement | Sviluppo | Development |
| 2 | Planung | Planification | Progettazione | Planning |
| 3 | Realisierung | Réalisation | Realizzazione | Construction |
| 4 | Betrieb | Exploitation | Gestione | Operations |
| 5 | Abbruch | Déconstruction | Decostruzione | Demolition |

**References:**

| Standard | Region | Mapping |
|----------|--------|---------|
| WUP BIM-Handlungsempfehlung | DE (region-neutral) | Primary reference for this model |
| SIA 112 | CH | Phases 31, 32, 41–53, 61, 62 |
| HOAI | DE | Leistungsphasen 1–9 map across phases 1–3 |
| ISO 19650 | International | Information delivery stages |

**Phase Usage:**
- Phases are represented as integers 1–5
- Phase collections indicate when an entity or requirement is applicable
- Requirements may span multiple phases or be phase-specific
- Empty phase collection implies applicability across all phases

---

## Tagging System

### Purpose

The tagging system provides a controlled vocabulary for categorizing and filtering entities across the catalog. Unlike free-form keywords, tags are drawn from a standardized set of values to ensure consistency, enable reliable filtering, and support interoperability with external BIM platforms.

### Design Goals

1. **Consistency** – All entities use the same tag vocabulary, enabling cross-entity search and filtering
2. **Interoperability** – Tag values align with VDI 2552 Blatt 12.2 to support exchange with German BIM platforms (e.g., BIM-Portal von BIM Deutschland, buildingSMART UCM)
3. **Discoverability** – Tags complement the primary `category` attribute by providing secondary classification dimensions
4. **Extensibility** – New tags may be added following the extension rules defined in VDI 2552 Blatt 12.2 Section 6.3

### Normative Reference

**VDI/DIN-EE 2552 Blatt 12.2:2024-03** – Building Information Modeling: Metadaten zur Identifikation von BIM-Anwendungsfällen

This standard defines the metadata structure for identifying BIM use cases on platforms. The `Anwendungsfeld` (application field) metadata provides the controlled vocabulary for the tagging system.

### Tag Values (Anwendungsfeld)

The following tag values are derived from VDI 2552 Blatt 12.2 Anhang B1:

| Tag | Description |
|-----|-------------|
| Abnahme | Acceptance and handover processes |
| Änderungsmanagement | Change tracking, quantification, and billing |
| Ausschreibung und Vergabe | Tendering and procurement preparation |
| Bedarfsplanung | Requirements planning and feasibility variants |
| Bestandserfassung | Asset and existing conditions capture |
| Betrieb | Operations support and optimization |
| Dokumentation | Documentation and archiving purposes |
| Genehmigung | Permit and approval processes |
| Inbetriebnahme | Commissioning support |
| Koordination | Coordination of deliverables, models, and communication |
| Kosten | Cost estimation, verification, and optimization |
| Logistik | Logistics planning and support |
| Machbarkeit | Feasibility studies |
| Nachhaltigkeit | Sustainability assessment and optimization |
| Nachweise | Verification, analysis, and expert reports |
| Qualitätssicherung | Quality assurance and progress control |
| Risikomanagement | Risk identification, assessment, and tracking |
| Termine | Schedule planning and verification |
| Variantenvergleich | Design variant comparison |
| Versicherung | Insurance process support |
| Visualisierung | Graphical representation and analysis |
| Sonstiges | Use cases not fitting other categories |

### Application Rules

1. **Minimum Requirement** – Every entity must have at least one tag assigned
2. **Multiple Tags** – Entities may have multiple tags when applicable to several application fields
3. **Primary vs. Secondary** – The `category` attribute defines the primary classification; tags provide supplementary classification
4. **Consistency Across Entities** – The same tag vocabulary applies to Elements, Documents, UseCases, Models, and EPDs
5. **Extension Policy** – Custom tags outside the VDI vocabulary should be avoided; if necessary, use "Sonstiges" or propose additions through governance process

### Relationship to VDI 2552 Metadata

The tagging system implements the `Anwendungsfeld` metadata from VDI 2552 Blatt 12.2. Other VDI metadata map to catalog attributes as follows:

| VDI 2552 Metadata | Catalog Attribute | Notes |
|-------------------|-------------------|-------|
| Bezeichnung | `title` | Display name |
| Beschreibung | `description` | Detailed description |
| Version | `version` | Version indicator |
| Datum der Veröffentlichung | `lastChange` | Last modification date |
| Anwendungsfeld | `tags` | Controlled vocabulary (this section) |
| Lebenszyklusphase | `phases` | Maps to WUP phases |
| DOI | – | Not implemented (future consideration) |
| Autoren | – | Not implemented |
| Verantwortliche Institution | – | Not implemented |

---

## Entity Definitions

### Element

**Purpose:** Represents physical building components with their geometry requirements (LOG), information requirements (LOI), and documentation needs across project phases.

**Intent:** Enable consistent specification of what geometric detail, attribute data, and supporting documents are required for each building element at each project phase.

#### Core Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | Identifier | ✓ | Pattern: letter 'e' followed by number |
| `category` | Enumeration | ✓ | Discipline grouping (see below) |
| `classifications` | Classification Map | ○ | Codes from multiple classification systems |
| `ifcMapping` | IFC Mapping Collection | ○ | Mappings to IFC classes and authoring tools |
| `geometry` | Geometry Requirement Collection | ✓ | LOG specifications per phase |
| `information` | Information Requirement Collection | ✓ | LOI specifications per phase |
| `documentation` | Documentation Requirement Collection | ○ | Required documents per phase |

#### Element Categories

| Category | Description |
|----------|-------------|
| Architektur | Architectural elements (windows, doors, walls, roofs) |
| Tragwerk | Structural elements (columns, beams, slabs, foundations) |
| Gebäudetechnik | MEP elements (HVAC, plumbing, electrical, fire protection) |
| Ausbau | Interior finishing (floors, ceilings, partitions) |
| Umgebung | Site elements (landscaping, paving, infrastructure) |

#### IFC Mapping Structure

Maps element variants to IFC classes and authoring software representations:

| Attribute | Type | Description |
|-----------|------|-------------|
| `element` | String | Element variant description |
| `ifc` | String | IFC 4.3 class and predefined type |
| `revit` | String | Revit family/category mapping |
| `archicad` | String | ArchiCAD object mapping (optional) |

#### Geometry Requirement (LOG)

Defines geometric detail requirements per phase:

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | String | Geometry property name |
| `desc` | String | Description of the requirement |
| `phases` | Phase Collection | Phases where this geometry is required |

#### Information Requirement (LOI)

Defines attribute/property requirements per phase:

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | String | Property name |
| `desc` | String | Description and purpose |
| `format` | Enumeration | Data type: Real, String, Boolean, Integer, Date |
| `list` | Boolean | Whether value comes from controlled vocabulary |
| `phases` | Phase Collection | Phases where this information is required |
| `ifc` | String | IFC PropertySet and property reference |

#### Documentation Requirement

Defines required documents per phase:

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | String | Document type name |
| `desc` | String | Description and purpose |
| `phases` | Phase Collection | Phases where this document is required |

---

### Document

**Purpose:** Represents project documentation types with their format requirements and retention policies.

**Intent:** Standardize document management across BIM projects by defining what formats are acceptable, how long documents must be retained, and when in the project lifecycle they are relevant.

#### Core Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | Identifier | ✓ | Pattern: category letter + 5-digit number |
| `category` | Enumeration | ✓ | Document category (see below) |
| `formats` | Format Collection | ✓ | Acceptable file formats |
| `retention` | Enumeration | ✓ | Retention policy |
| `classifications` | Classification Map | ○ | Optional classification codes |

#### Document Categories

| Code | Category | Description |
|------|----------|-------------|
| O | Organisation | Project organization, teams, communication protocols |
| Q | Qualitätsmanagement | Quality plans, checklists, audit records |
| R | Risikomanagement | Risk registers, compliance documentation |
| D | Dokumentation | Archives, as-built records, handover documentation |
| G | Genehmigungen | Permits, approvals, regulatory submissions |
| B | Betriebsanleitungen | Operating manuals, maintenance handbooks |

#### Allowed Formats

| Format | Description |
|--------|-------------|
| PDF-A | Archival PDF for long-term preservation |
| PDF | Standard PDF for general documents |
| Office-Format | Editable office documents |
| DWG | CAD drawings |
| IFC | Industry Foundation Classes model files |
| BCF | BIM Collaboration Format for issues |
| Native | Original authoring application format |

#### Retention Policies

| Policy | Description |
|--------|-------------|
| bis Ersatz | Until superseded by newer version |
| Projektende | Until project completion |
| 5 Jahre | 5 years from creation |
| 10 Jahre | 10 years from creation |
| 30 Jahre | 30 years from creation |
| Gebäudelebensdauer | Entire building lifecycle |

---

### UseCase

**Purpose:** Defines standardized BIM processes with roles, responsibilities, inputs, outputs, and quality criteria.

**Intent:** Provide actionable process definitions that can be adopted in BAP documents, ensuring consistent implementation of BIM workflows across projects with clear accountability through RACI matrices.

#### Core Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | Identifier | ✓ | Pattern: 'uc' + 3-digit number |
| `category` | Enumeration | ✓ | Use case category (see below) |
| `definition` | Text | ✓ | Formal definition of the use case |
| `goals` | String Collection | ✓ | Objectives (minimum 1) |
| `inputs` | String Collection | ✓ | Required inputs and preconditions |
| `outputs` | String Collection | ✓ | Deliverables and results |
| `roles` | Role Definition Collection | ✓ | RACI responsibility matrix |
| `prerequisites` | Prerequisites Structure | ✓ | Requirements for client and contractor |
| `implementation` | String Collection | ✓ | Implementation steps |
| `qualityCriteria` | String Collection | ✓ | Acceptance and quality criteria |
| `standards` | String Collection | ○ | Referenced standards (SIA, ISO) |
| `process_url` | String | ○ | Link to BPMN process diagram |
| `examples` | String Collection | ○ | Example applications |
| `practiceExample` | Text | ○ | Detailed practical example |

#### UseCase Categories

| Category | Description |
|----------|-------------|
| Grundlagen | Foundation use cases (BIM execution plan, standards setup) |
| Koordination | Coordination (clash detection, model federation) |
| Planung | Planning and design (authoring, analysis, simulation) |
| Projektmanagement | Project management (scheduling, cost, progress tracking) |
| Qualitätssicherung | Quality assurance (model checking, validation, audits) |
| Nachhaltigkeit | Sustainability (LCA, energy analysis, certification) |

#### Role Definition (RACI)

| Attribute | Type | Description |
|-----------|------|-------------|
| `actor` | String | Role name (e.g., BIM-Manager, Projektleiter) |
| `responsible` | String Collection | Tasks this role performs (R) |
| `contributing` | String Collection | Tasks this role contributes to (A/C) |
| `informed` | String Collection | Information this role receives (I) |

#### Prerequisites Structure

| Attribute | Type | Description |
|-----------|------|-------------|
| `client` | String Collection | Auftraggeber prerequisites |
| `contractor` | String Collection | Auftragnehmer prerequisites |

---

### Model

**Purpose:** Represents BIM model types including discipline models, coordination models, and special-purpose models.

**Intent:** Define the scope and content of different model types to clarify responsibilities and expected deliverables in multi-discipline BIM projects.

#### Core Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | Identifier | ✓ | Pattern: letter 'm' followed by number |
| `category` | Enumeration | ✓ | Model category (see below) |
| `elements` | Model Element Collection | ✓ | Element types contained in model |
| `classifications` | Classification Map | ○ | Optional classification codes |

#### Model Categories

| Category | Code | Description |
|----------|------|-------------|
| Fachmodelle | FM | Discipline models (Architecture, Structure, MEP) |
| Koordination | KM | Coordination/federated models |
| Spezialmodelle | SM | Special purpose (fire safety, facade, acoustic) |
| Bestand | BM | As-built and existing conditions models |

#### Model Element Structure

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | String | Element type name |
| `description` | String | Element description and scope |
| `phases` | Phase Collection | Phases where element appears in model |

---

### EPD

**Purpose:** Contains environmental impact data for construction materials according to KBOB Ökobilanzdaten standards.

**Intent:** Enable sustainability analysis and life cycle assessment (LCA) by providing standardized environmental indicators for materials, supporting compliance with Swiss sustainability requirements.

#### Core Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | Identifier | ✓ | Pattern: 'kbob-' + group + sequence |
| `uuid` | Identifier | ✓ | Universal unique identifier for external reference |
| `category` | Enumeration | ✓ | Material category (see below) |
| `subcategory` | String | ✓ | Specific material group |
| `unit` | Enumeration | ✓ | Functional/reference unit |
| `gwp` | Numeric | ✓ | Global Warming Potential |
| `ubp` | Numeric | ✓ | Umweltbelastungspunkte |
| `penrt` | Numeric | ✓ | Primary Energy Non-Renewable Total |
| `pert` | Numeric | ✓ | Primary Energy Renewable Total |
| `density` | String | ○ | Material density |
| `biogenicCarbon` | Numeric | ○ | Biogenic carbon content |

#### Environmental Indicators

| Indicator | Unit | Description |
|-----------|------|-------------|
| GWP | kg CO₂-eq | Global Warming Potential – climate change impact |
| UBP | Points | Swiss ecological scarcity method – overall environmental impact |
| PENRT | MJ | Primary Energy Non-Renewable Total – fossil energy demand |
| PERT | MJ | Primary Energy Renewable Total – renewable energy demand |

#### Reference Units

| Unit | Description |
|------|-------------|
| kg | Mass (kilograms) |
| m² | Area (square meters) |
| m³ | Volume (cubic meters) |
| m | Length (meters) |
| kWh | Energy (kilowatt-hours) |
| MJ | Energy (megajoules) |
| Stk | Pieces/units |

#### EPD Categories

| Category | Typical Subcategories |
|----------|----------------------|
| Baumaterialien | Beton, Mauerwerk, Holz, Metall, Dämmstoffe, Glas |
| Energie | Strom, Wärme, Kälte |
| Gebäudetechnik | Heizung, Lüftung, Sanitär, Elektro |
| Transporte | LKW, Bahn, Schiff |

---

## Classification Systems

The catalog supports multiple classification systems to enable cross-referencing between Swiss, German, and international standards:

| System | Standard | Region | Primary Use |
|--------|----------|--------|-------------|
| eBKP-H | SN 506 511 | Switzerland | Cost planning for building construction |
| DIN 276 | DIN 276:2018 | Germany/DACH | Cost classification |
| Uniformat II | ASTM E1557 | International | Elemental cost classification |
| KBOB | Federal standard | Switzerland | Swiss federal building classification |
| IFC | ISO 16739-1:2024 | International | Open BIM data exchange |

### eBKP-H Code Structure

```
C 2.1
│ │ └── Detail level (Gliederung)
│ └──── Main group (Hauptgruppe)  
└────── Building part (Bauwerksgruppe)
```

**Building Part Codes:**
- B: Umgebung (Site)
- C: Rohbau (Shell)
- D: Technik (Services)
- E: Äussere Wandbekleidungen (External finishes)
- F: Bedachung (Roofing)
- G: Ausbau (Interior)

---

## Business Rules

### Identification Rules

| Entity | Pattern | Example | Rule |
|--------|---------|---------|------|
| Element | `e` + number | e1, e15 | Unique within Elements |
| Document | Letter + 5 digits | O01001, Q02003 | First letter indicates category |
| UseCase | `uc` + 3 digits | uc001, uc030 | Sequential numbering |
| Model | `m` + number | m1, m10 | Unique within Models |
| EPD | `kbob-` + group + sequence | kbob-01-042 | Aligned with KBOB database |

### Integrity Rules

1. **Version Consistency** – When an entity is modified, `version` and `lastChange` must both be updated

2. **Phase Validity** – All phase values must be integers between 1 and 5 inclusive

3. **Phase Inheritance** – Nested requirements (geometry, information, documentation) may only reference phases that are included in the parent entity's phase collection

4. **Tag Requirement** – Every entity must have at least one tag from the controlled vocabulary (see [Tagging System](#tagging-system))

5. **Classification Consistency** – Classification codes should be valid within their respective systems (e.g., eBKP-H codes should follow SN 506 511 structure)

6. **IFC Mapping Validity** – IFC class references should conform to IFC 4.3 schema

### Referential Guidelines

1. **Model-Element Relationship** – Model element names should correspond to defined Element titles where applicable

2. **Document References** – Element documentation requirements should align with defined Document types

3. **Role Consistency** – UseCase role names should be consistent across use cases to enable cross-referencing

4. **Standard References** – Referenced standards should use official designations (e.g., "SIA 2051", "ISO 19650-1")

---

## Glossary

| Term | German | Definition |
|------|--------|------------|
| AIA | Auftraggeber-Informationsanforderungen | Client information requirements document |
| BAP | BIM-Abwicklungsplan | BIM execution plan |
| eCH | eCH E-Government Standards | Swiss e-government standardization body |
| EPD | Umweltproduktdeklaration | Environmental Product Declaration |
| GWP | Treibhauspotenzial | Global Warming Potential |
| HOAI | Honorarordnung für Architekten und Ingenieure | German fee structure for architects and engineers, defines service phases (Leistungsphasen) |
| IFC | Industry Foundation Classes | Open standard for BIM data exchange |
| LOG | Level of Geometry | Geometric detail requirements |
| LOI | Level of Information | Attribute/property requirements |
| RACI | Responsible, Accountable, Consulted, Informed | Responsibility assignment matrix |
| SIA | Schweizerischer Ingenieur- und Architektenverein | Swiss Society of Engineers and Architects, defines Swiss lifecycle phases (SIA 112) |
| UBP | Umweltbelastungspunkte | Swiss environmental impact points |
| VDI 2552 | VDI-Richtlinie 2552 | German BIM standard series by Verein Deutscher Ingenieure |
| WUP | Bergische Universität Wuppertal | Source of region-neutral lifecycle phases used in this model |

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.2 | – | Added Tagging System section based on VDI 2552 Blatt 12.2; renamed Project Phases to Lifecycle Phases with WUP/SIA/HOAI references and multi-language support; added Localization section; added Strategic Alignment with Swiss digital transformation initiatives |
| 1.1 | – | Restructured as conceptual model; added goals, principles, business rules |
| 1.0 | – | Initial documentation |

# KBOB Fachdatenkatalog - Data Model Documentation

This document describes the data model used in the KBOB BIM Data Catalog, a web-based interactive catalog for Building Information Modeling (BIM) requirements, classifications, and information specifications for building elements and documents in Switzerland.

## Overview

The application manages five main entity types:

| Entity | File | Description |
|--------|------|-------------|-------|
| **Elements** | `elements.json` | Building elements with LOI specs |
| **Documents** | `documents.json` | Document types & retention policies |
| **Use Cases** | `usecases.json` | BIM use cases with RACI roles |
| **Models** | `models.json` | BIM model types |
| **EPDs** | `epds.json` | Environmental Product Declarations |

---

## Project Phases

All entities reference a common set of project phases (1-5):

| Phase | German | English |
|-------|--------|---------|
| 1 | Entwicklung | Development |
| 2 | Planung | Planning |
| 3 | Ausführung | Construction |
| 4 | Betrieb | Operations |
| 5 | Rückbau | Decommissioning |

---

## Entity Schemas

### Element (Building Elements)

Building elements represent physical components in construction projects with their geometry, information requirements, and documentation needs.

```typescript
interface Element {
  id: string;                        // Unique identifier, e.g., "e1"
  version: string;                   // Version number, e.g., "1.0"
  lastChange: string;                // ISO date string
  title: string;                     // Display name, e.g., "Fenster (Aussen)"
  image: string;                     // Image URL or path
  category: string;                  // e.g., "Architektur", "Tragwerk"
  description: string;               // Detailed description
  tags: string[];                    // Search/filter tags
  classifications: {
    [system: string]: string[];      // Classification codes by system
  };
  ifcMapping: IFCMapping[];          // IFC class mappings
  geometry: GeometryItem[];          // 3D geometry specifications (LOG)
  information: InformationItem[];    // Information attributes (LOI)
  documentation: DocumentationItem[];// Required documentation
  phases?: number[];                 // Project phases [1-5]
}

interface IFCMapping {
  element: string;                   // Element description
  ifc: string;                       // IFC class, e.g., "IfcWindow.WINDOW"
  revit: string;                     // Revit family type
}

interface GeometryItem {
  name: string;                      // Property name, e.g., "Länge"
  desc: string;                      // Description
  phases: number[];                  // Applicable phases
}

interface InformationItem {
  name: string;                      // Property name, e.g., "Wärmedurchgangskoeffizient"
  desc: string;                      // Description
  format: string;                    // Data type: Real, String, Boolean
  list: boolean;                     // Is dropdown list?
  phases: number[];                  // Applicable phases
  ifc: string;                       // IFC property set reference
}

interface DocumentationItem {
  name: string;                      // Document name, e.g., "Vorschriften"
  desc: string;                      // Description
  phases: number[];                  // Applicable phases
}
```

**Classification Systems:**
- **eBKP-H**: Swiss cost classification
- **DIN 276**: German cost classification
- **Uniformat II**: US cost classification
- **KBOB**: Swiss federal classification

---

### Document (Document Types)

Documents represent required documentation for BIM projects with format and retention specifications.

```typescript
interface Document {
  id: string;                        // Unique identifier, e.g., "O01001"
  version: string;                   // Version number
  lastChange: string;                // ISO date string
  title: string;                     // Display name
  image: string;                     // Image URL or path
  category: string;                  // e.g., "Organisation"
  description: string;               // Detailed description
  tags: string[];                    // Search/filter tags
  formats: string[];                 // e.g., "PDF-A", "Office-Format"
  retention: string;                 // e.g., "bis Ersatz", "5 Jahre"
  phases: number[];                  // Project phases [1-5]
  classifications?: {
    [system: string]: string[];      // Optional classification codes
  };
}
```

**Document Categories:**
- Organisation (projects, teams, communication)
- Quality Management (PQM, QM plans, checklists)
- Risk Management & Compliance
- Documentation & Archives
- Permits & Approvals
- Operating Manuals & Handbooks

---

### UseCase (BIM Use Cases)

Use cases define standardized BIM processes with roles, responsibilities, and implementation guidance.

```typescript
interface UseCase {
  id: string;                        // Unique identifier, e.g., "uc000"
  version: string;                   // Version number
  lastChange: string;                // ISO date string
  title: string;                     // Display name
  image: string;                     // Image URL or path
  category: string;                  // e.g., "Grundlagen", "Koordination"
  description: string;               // Detailed description
  tags: string[];                    // Search/filter tags
  phases: number[];                  // Project phases [1-5]
  process_url?: string;              // Camunda BPMN diagram URL
  examples: string[];                // Example applications
  standards: string[];               // Referenced standards (SIA 2051, ISO 19650)
  goals: string[];                   // Use case objectives
  inputs: string[];                  // Required inputs
  outputs: string[];                 // Deliverables
  roles: RoleDefinition[];           // RACI responsibility matrix
  definition: string;                // Formal definition
  prerequisites: {
    client: string[];                // Client prerequisites
    contractor: string[];            // Contractor prerequisites
  };
  implementation: string[];          // Implementation steps
  practiceExample?: string;          // Practical example
  qualityCriteria: string[];         // Quality criteria
}

interface RoleDefinition {
  actor: string;                     // Role name, e.g., "Projektleiter"
  responsible: string[];             // RACI: Responsible tasks
  contributing: string[];            // RACI: Contributing tasks
  informed: string[];                // RACI: Informed tasks
}
```

**Use Case Categories:**
- Grundlagen (Foundation)
- Koordination (Coordination)
- Planung (Planning)
- Projektmanagement (Project Management)
- Qualitätssicherung (Quality Assurance)
- Nachhaltigkeit (Sustainability)

---

### Model (BIM Models)

BIM models represent different discipline models used in construction projects.

```typescript
interface BIMModel {
  id: string;                        // Unique identifier, e.g., "m1"
  version: string;                   // Version number
  lastChange: string;                // ISO date string
  title: string;                     // Display name
  image: string;                     // Image URL or path
  category: string;                  // Model category
  description: string;               // Detailed description
  tags: string[];                    // Search/filter tags
  phases: number[];                  // Project phases [1-5]
  elements: ModelElement[];          // Contained elements
  classifications?: {
    [system: string]: string[];      // Optional classification codes
  };
}

interface ModelElement {
  name: string;                      // Element name, e.g., "Wand"
  description: string;               // Element description
  phases: number[];                  // Applicable phases
}
```

**Model Categories:**
- **Fachmodelle**: Discipline models (Architecture, Structure, MEP)
- **Koordination**: Coordination models (clash detection)
- **Spezialmodelle**: Special models (fire safety, facade)
- **Bestand**: As-built models

---

### EPD (Environmental Product Declarations)

EPDs contain environmental impact data for construction materials according to KBOB standards.

```typescript
interface EPD {
  id: string;                        // Unique identifier, e.g., "kbob-01-042"
  title: string;                     // Display name
  image: string;                     // Image URL or path
  category: string;                  // e.g., "Baumaterialien", "Energie"
  subcategory: string;               // e.g., "Beton", "Dämmstoffe"
  description: string;               // Detailed description
  tags: string[];                    // Search/filter tags
  version: string;                   // Version number
  lastChange: string;                // ISO date string
  uuid: string;                      // UUID identifier
  unit: string;                      // Reference unit: kg, m2, kWh, m
  gwp: number;                       // Global Warming Potential (kg CO2-eq)
  ubp: number;                       // Umweltbelastungspunkte (UBP)
  penrt: number;                     // Primary Energy Non-Renewable Total (MJ)
  pert: number;                      // Primary Energy Renewable Total (MJ)
  density?: string;                  // Material density
  biogenicCarbon?: number;           // Biogenic carbon content
  phases?: number[];                 // Project phases [1-5]
}
```

**Environmental Metrics:**
- **GWP**: Global Warming Potential (kg CO2-eq)
- **UBP**: Swiss environmental impact points
- **PENRT**: Primary Energy Non-Renewable Total (MJ)
- **PERT**: Primary Energy Renewable Total (MJ)

**EPD Categories:**
- Baumaterialien (Building Materials)
- Energie (Energy)
- Gebäudetechnik (Building Technology)
- Transporte (Transport)

---

## Entity Relationships

```
ELEMENTS
├── contains → GEOMETRY items (LOG requirements)
├── contains → INFORMATION items (LOI requirements)
├── contains → DOCUMENTATION items
├── maps to → IFC classes
├── filtered by → TAGS (many-to-many)
├── filtered by → CATEGORY (many-to-one)
└── filtered by → PHASES (many-to-many)

DOCUMENTS
├── has → RETENTION policy
├── supports → multiple FORMATS
├── filtered by → TAGS, CATEGORY, PHASES
└── applies to → PROJECT PHASES

USECASES
├── has → ROLES (RACI matrix)
├── has → PREREQUISITES (client & contractor)
├── has → IMPLEMENTATION steps
├── references → STANDARDS
├── can have → PROCESS DIAGRAMS (BPMN)
└── filtered by → TAGS, CATEGORY, PHASES

MODELS
├── categorized as → FACHMODELLE, KOORDINATION, BESTAND
├── contains → ELEMENTS (sub-components)
└── filtered by → TAGS, CATEGORY, PHASES

EPDs
├── has → ENVIRONMENTAL METRICS (GWP, UBP, PENRT, PERT)
├── has → UNIT (kg, m2, m, kWh)
└── filtered by → TAGS, CATEGORY, PHASES

PROJECT PHASES (1-5) ←── shared across all entities

TAGS ←── shared tagging system across all entities

CATEGORIES ←── entity-specific categorization
```

---

## Database Schema (PostgreSQL/Supabase)

The application optionally uses Supabase PostgreSQL with automatic fallback to JSON files.

### Table: elements

```sql
CREATE TABLE elements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT,
    category TEXT NOT NULL,
    description TEXT,
    tags JSONB DEFAULT '[]',
    classifications JSONB DEFAULT '[]',
    ifc_mapping JSONB DEFAULT '[]',
    geometry JSONB DEFAULT '[]',
    information JSONB DEFAULT '[]',
    documentation JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_elements_category ON elements(category);
CREATE INDEX idx_elements_tags ON elements USING GIN(tags);
```

### Table: documents

```sql
CREATE TABLE documents (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT,
    category TEXT NOT NULL,
    description TEXT,
    tags JSONB DEFAULT '[]',
    formats JSONB DEFAULT '[]',
    retention TEXT,
    phases JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_documents_category ON documents(category);
CREATE INDEX idx_documents_tags ON documents USING GIN(tags);
CREATE INDEX idx_documents_phases ON documents USING GIN(phases);
```

### Table: usecases

```sql
CREATE TABLE usecases (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT,
    category TEXT NOT NULL,
    description TEXT,
    tags JSONB DEFAULT '[]',
    phases JSONB DEFAULT '[]',
    process_url TEXT,
    examples JSONB DEFAULT '[]',
    standards JSONB DEFAULT '[]',
    goals JSONB DEFAULT '[]',
    inputs JSONB DEFAULT '[]',
    outputs JSONB DEFAULT '[]',
    roles JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_usecases_category ON usecases(category);
CREATE INDEX idx_usecases_tags ON usecases USING GIN(tags);
CREATE INDEX idx_usecases_phases ON usecases USING GIN(phases);
```

### Table: models

```sql
CREATE TABLE models (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT,
    category TEXT NOT NULL,
    description TEXT,
    tags JSONB DEFAULT '[]',
    classifications JSONB DEFAULT '[]',
    phases JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_models_category ON models(category);
CREATE INDEX idx_models_tags ON models USING GIN(tags);
```

### Table: epds

```sql
CREATE TABLE epds (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT,
    category TEXT NOT NULL,
    description TEXT,
    tags JSONB DEFAULT '[]',
    classifications JSONB DEFAULT '[]',
    gwp NUMERIC,
    unit TEXT,
    phases JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_epds_category ON epds(category);
CREATE INDEX idx_epds_tags ON epds USING GIN(tags);
```

### Database Features

- **Row Level Security (RLS)**: Enabled with public read access
- **Automatic Timestamps**: `updated_at` triggers on all tables
- **GIN Indexes**: On JSONB columns for efficient querying
- **Caching**: 5-minute client-side cache in Supabase client

---

## Data Flow

```
Browser Request
      │
      ▼
┌─────────────┐
│  index.html │ (SPA entry point)
└─────────────┘
      │
      ▼
┌─────────────┐
│   app.js    │ (initApp)
└─────────────┘
      │
      ▼
┌─────────────────────────────────────────────┐
│  Check Supabase Configuration (config.js)   │
├──────────────────────┬──────────────────────┤
│ Supabase Configured  │  Not Configured      │
│         │            │         │            │
│         ▼            │         ▼            │
│ supabase-client.js   │  Load JSON files:    │
│ (fetch + 5min cache) │  - elements.json     │
│                      │  - documents.json    │
│                      │  - usecases.json     │
│                      │  - models.json       │
│                      │  - epds.json         │
└──────────────────────┴──────────────────────┘
      │
      ▼
┌────────────────────────────────────┐
│ Store in Global Variables:         │
│  • globalElementsData[]            │
│  • globalDocumentsData[]           │
│  • globalUsecasesData[]            │
│  • globalModelsData[]              │
│  • globalEpdsData[]                │
└────────────────────────────────────┘
      │
      ▼
┌─────────────┐
│   url.js    │ (Hash-based routing)
└─────────────┘
      │
      ▼
┌─────────────┐
│  router.js  │ (Route matching)
└─────────────┘
      │
      ├── #home        → pages.js (renderHomePage)
      ├── #elements    → pages.js (renderCatalogPage)
      ├── #element/:id → details.js (renderElementDetailPage)
      ├── #documents   → pages.js (renderCatalogPage)
      ├── #document/:id→ details.js (renderDocumentDetailPage)
      ├── #usecases    → pages.js (renderCatalogPage)
      ├── #usecase/:id → details.js (renderUsecaseDetailPage)
      ├── #models      → pages.js (renderCatalogPage)
      ├── #model/:id   → details.js (renderModelDetailPage)
      ├── #epds        → pages.js (renderCatalogPage)
      ├── #epd/:id     → details.js (renderEpdDetailPage)
      ├── #search?q=   → search.js (renderSearchResults)
      └── #handbook    → handbook.js (renderHandbook)
```

---

## Filtering & Search

### Filter Logic (data.js)

1. **Tag Filtering (AND Logic)**
   - Items must match ALL selected tags
   - Example: `"Planung" AND "Betrieb"`

2. **Category Filtering (Exclusive)**
   - Only one category active at a time
   - Example: `category="Architektur"`

3. **Phase Filtering (OR Logic)**
   - Items must have AT LEAST ONE selected phase
   - Example: `phases includes 2 OR 3 OR 4`

### Search Functionality (search.js)

- Global full-text search across all entity types
- Searches in: title, description, category, classifications
- Debounced input with dropdown preview
- Dedicated search results page with sorting

### URL State Preservation

Filter state is preserved in URL hash:
```
#elements?tag=Planung&tag=Betrieb&category=Architektur&view=grid
```

---

## File Structure

```
/data/
├── elements.json      # Building elements with LOI specs
├── documents.json     # Document types & retention policies
├── usecases.json      # BIM use cases with RACI roles
├── models.json        # BIM model types
├── epds.json          # Environmental product declarations
└── DATA-MODEL.md      # This documentation

/js/
├── app.js             # App initialization & data loading
├── state.js           # Global state & XSS utilities
├── config.js          # Supabase configuration
├── supabase-client.js # Database client & caching
├── data.js            # Filter helpers & data utilities
├── router.js          # Route matching logic
├── url.js             # URL parsing & hash routing
├── filters.js         # Filter UI components
├── renderers.js       # Card/list rendering
├── details.js         # Detail page rendering
├── search.js          # Search engine & results
└── pages.js           # Catalog page renderers

/supabase/migrations/
├── 001_create_tables.sql  # Database schema
└── 002_seed_data.sql      # Data seed script
```

---

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Icons**: Lucide Icons (SVG)
- **Fonts**: Google Fonts (Noto Sans)
- **Data Storage**: JSON files (primary) + PostgreSQL via Supabase (optional)
- **Architecture**: Single-Page Application (SPA) with hash-based routing
- **Design System**: Swiss Federal Design System compliant

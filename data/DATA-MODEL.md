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

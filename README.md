# KBOB BIM Data Catalog (Mockup)

A web mockup for the digital **BIM Data Catalog** of KBOB (Coordination Conference of Construction and Real Estate Bodies of Public Building Owners in Switzerland).

This application serves as an interactive prototype to make BIM requirements, classifications, and attributes (LOI) for building elements accessible via the web.

- Deployed: [https://davras5.github.io/kbob-fdk/](https://davras5.github.io/kbob-fdk/)

<p align="center">
  <img src="assets/readme/preview1.JPG" width="45%"/>
  &nbsp;&nbsp;&nbsp;
  <img src="assets/readme/preview2.JPG" width="45%"/>
  &nbsp;&nbsp;&nbsp;
</p>


## About the Project

The KBOB BIM Data Catalog defines information requirements for the ordering and management of buildings. This project visualizes this data as a "Single Source of Truth" in a modern, responsive web application.

**Current Status:** Mockup V3.3

## Features

- **Catalog Overview:** Grid and list views of all defined building elements and documents
- **Search & Filter:** Real-time search by element name, classification, and tags
- **Tag-Based Filtering:** Click on tags to filter across catalogs (discipline, IFC class, category)
- **A-Z Navigation:** Quick alphabetical filtering
- **Detail View:** Comprehensive information for each element including:
  - Classifications (eBKP-H, DIN 276, Uniformat II)
  - IFC & Revit Mappings
  - Geometry requirements per phase
  - Information requirements (LOI) per phase
  - Documentation requirements
- **Documents Catalog:** 20 document types with classifications and phase requirements
- **Responsive Design:** Optimized for desktop and tablets
- **URL State:** Tags and filters are preserved in the URL for sharing

## Installation & Usage

Since the application loads data via `fetch` from local JSON files, **it cannot be opened directly via the file system (`file://`)** due to CORS security policies in modern browsers.

### Option 1: Local Web Server (Recommended for Development)

1. Clone the repository:
   ```bash
   git clone https://github.com/davras5/kbob-fdk.git
   ```

2. Open the folder in your IDE (e.g., VS Code)

3. Use an extension like **Live Server** to start `index.html`

### Option 2: Python Simple Server

If you have Python installed:

```bash
# Run in the project directory
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### Option 3: GitHub Pages

The project is optimized for hosting via GitHub Pages.

1. Go to the repository settings
2. Select the `main` branch as the source under "Pages"
3. The page will be available at `https://davras5.github.io/kbob-fdk/`

## Project Structure

```
/
├── index.html              # Main application (Single Page Application)
├── data/
│   ├── elements.json       # Building elements dataset (15 elements)
│   └── documents.json      # Documents dataset (20 document types)
├── assets/
│   └── img/                # Element images (17 images)
└── README.md               # Documentation
```

## Tech Stack

- **HTML5 / CSS3:** CSS Variables for easy theming
- **JavaScript (Vanilla):** No frameworks, no build steps required
- **Material Icons:** Integration via Google Fonts
- **Inter Font:** Modern sans-serif typography

## Data Structure

### Elements (`data/elements.json`)

Each element contains:

```json
{
  "id": "e1",
  "title": "Window (Exterior)",
  "classification": "IfcWindow",
  "image": "assets/img/window.jpg",
  "subtitle": "Description of the element",
  "tags": { "ifcClass": "IfcWindow", "disziplin": "Architecture" },
  "classifications": [...],
  "ifcMapping": [...],
  "geometry": [...],
  "information": [...],
  "documentation": [...]
}
```

### Documents (`data/documents.json`)

Each document contains:

```json
{
  "id": "d1",
  "title": "Project Order",
  "category": "Organization",
  "description": "Document description",
  "tags": { "disziplin": "Project Management", "kategorie": "Organization" },
  "classifications": [...],
  "formats": ["PDF-A", "Office-Format"],
  "retention": "5 years",
  "phases": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
}
```

## Building Elements

The catalog includes 15 building elements across different disciplines:

| Element | IFC Class | Discipline |
|---------|-----------|------------|
| Window (Exterior) | IfcWindow | Architecture |
| Interior Door (Wood) | IfcDoor | Architecture |
| Wall (Solid) | IfcWall | Architecture |
| Base Slab (Reinforced Concrete) | IfcSlab | Structural |
| Roof (Flat Roof) | IfcSlab | Architecture |
| Column (Precast) | IfcColumn | Structural |
| Beam (Reinforced Concrete) | IfcBeam | Structural |
| Duct (Rectangular) | IfcDuctSegment | MEP |
| Air Handling Unit | IfcUnitaryEquipment | MEP |
| Heating Pipe | IfcPipeSegment | MEP |
| Radiator | IfcSpaceHeater | MEP |
| Sanitary Fixture (WC) | IfcSanitaryTerminal | MEP |
| Distribution Board | IfcDistributionBoard | MEP |
| Cable Tray | IfcCableCarrierSegment | MEP |
| Elevator | IfcTransportElement | MEP |

## Document Types

The catalog includes 20 document types across categories:

- **Organization:** Project Order, Status Report, QM Plan, Schedule, Acceptance Protocol
- **Contracts & Costs:** Cost Estimate, Tender Documents, Works Contract
- **Concepts & Descriptions:** Energy Certificate, Fire Protection Concept, HVAC Concepts, Structural Analysis
- **Visualizations:** Floor Plans, Reinforcement Plans, Installation Plans, Fire Protection Plans

## License

This work is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

---

*This is an unofficial mockup for demonstration purposes.*

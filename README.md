# KBOB BIM Data Catalog (Fachdatenkatalog)

A web-based interactive catalog for BIM (Building Information Modeling) requirements, classifications, and information specifications for building elements, documents, use cases, models, and environmental product data in Switzerland. Designed as the foundation for **EIR (Exchange Information Requirements)** and **BEP (BIM Execution Plan)** for Swiss public agencies.

The platform standardizes BIM data across the building lifecycle and implements Swiss federal digitalization strategies (eCH-0279, Strategie Digitale Schweiz), eliminating data silos by providing standardized, machine-readable specifications.

**Live Demo:** [https://davras5.github.io/kbob-fdk/](https://davras5.github.io/kbob-fdk/)

<p align="center">
  <img src="assets/readme/preview1.JPG" width="45%"/>
  &nbsp;&nbsp;&nbsp;
  <img src="assets/readme/preview2.JPG" width="45%"/>
</p>

## Features

- **5 Catalogs** - Browse building elements, document types, BIM use cases, domain models, and EPD data
- **Grid & List Views** - Toggle between card grid and table layouts with state preserved in URL
- **Advanced Filtering** - Tag-based (AND logic), category (exclusive), and phase (OR logic) filters with A-Z navigation
- **Real-time Search** - Global search across all data types with dropdown preview and dedicated search results page
- **Detail Pages** - Comprehensive info including classifications (eBKP-H, DIN 276, Uniformat II, KBOB), IFC 4.3 mappings (Revit, ArchiCAD), geometry (LOG) and information (LOI) requirements per project phase (1-5)
- **Standards Compliance** - VDI 2552 lifecycle phases, ISO 19650 compliant use cases, KBOB document categories
- **Handbook & Downloads** - Documentation section with downloadable templates and resources
- **Multi-language Support** - Available in German, French, Italian, and English
- **Shareable URLs** - Filter states preserved in URL hash for easy sharing
- **Swiss Federal Design** - Compliant with Swiss Confederation design guidelines
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Print Support** - Print-optimized pages with dedicated print styles

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Single-page application structure |
| CSS3 | Swiss Federal Design System with design tokens, Flexbox/Grid layouts |
| Vanilla JavaScript | Zero NPM dependencies, ~3,900 lines across 15 modules |
| Lucide Icons | SVG icon library |
| Noto Sans | Typography (Google Fonts) |
| JSON | Primary static data storage |
| Supabase | Optional PostgreSQL backend with automatic fallback and 5-minute response caching |

**No build tools required** - Loads directly in browsers.

## Getting Started

> **Note:** Requires a web server due to CORS policy on local JSON files.

**Option 1: VS Code Live Server**
```bash
git clone https://github.com/davras5/kbob-fdk.git
cd kbob-fdk
# Open in VS Code and use Live Server extension
```

**Option 2: Python Server**
```bash
python -m http.server 8000
# Open http://localhost:8000
```

**Option 3: View Live**

Visit [https://davras5.github.io/kbob-fdk/](https://davras5.github.io/kbob-fdk/)

## Project Structure

```
kbob-fdk/
├── index.html              # Main SPA entry point
├── css/
│   ├── tokens.css          # Design tokens (colors, typography, spacing)
│   └── styles.css          # Component and layout styles
├── js/
│   ├── app.js              # Initialization & data loading
│   ├── state.js            # Global state & XSS utilities
│   ├── url.js              # URL parsing & hash-based routing
│   ├── router.js           # Main routing logic
│   ├── config.js           # Application configuration
│   ├── data.js             # Filter helpers
│   ├── search.js           # Search engines
│   ├── filters.js          # Filter bar components
│   ├── renderers.js        # Card/list rendering
│   ├── pages.js            # Catalog page renderers
│   ├── details.js          # Detail page renderers
│   ├── handbook.js         # Handbook & downloads page
│   ├── breadcrumb.js       # Breadcrumb navigation
│   ├── ui.js               # Language dropdown
│   └── supabase-client.js  # Database client & caching
├── data/
│   ├── elements.json       # 15+ building elements with LOG/LOI specs
│   ├── documents.json      # 20+ document types (KBOB categories)
│   ├── usecases.json       # 30+ BIM use cases (VDI 2552 Blatt 12.2)
│   ├── models.json         # 10+ BIM model types
│   └── epds.json           # 10+ environmental product declarations
├── assets/
│   ├── img/                # Element, document, usecase images
│   └── readme/             # Preview screenshots
├── documentation/
│   └── DATAMODEL.md       # Comprehensive data model documentation
├── tools/
│   └── optimize_images.py  # Image optimization utility
├── LICENSE                 # MIT License
└── README.md
```

## Data Architecture

### Data Sources

The application supports two data sources with automatic fallback:

1. **JSON Files (Default)** - Static files in `/data/` for zero-config deployment
2. **Supabase PostgreSQL (Optional)** - For dynamic data management with 5-minute response caching

Configure in `js/config.js`.

### Five Core Entity Types

| Entity | Description | Standards |
|--------|-------------|-----------|
| **Elements** | Building components with geometry (LOG) and information (LOI) requirements | IFC 4.3, eBKP-H, DIN 276, Uniformat II |
| **Documents** | Project documentation types | KBOB categories (O, K, B, V) |
| **Use Cases** | BIM processes and workflows | VDI 2552 Blatt 12.2, ISO 19650 |
| **Models** | BIM model type definitions | Domain-specific (Fachmodelle, Koordination) |
| **EPDs** | Environmental product declarations | GWP, UBP, PENRT, PERT indicators |

### Classification Systems

- **eBKP-H** - Swiss cost planning standard
- **DIN 276** - German cost classification
- **Uniformat II** - International classification
- **KBOB** - Federal construction standard
- **IFC 4.3** - Open BIM exchange format

### Lifecycle Phases (VDI 2552)

1. Entwicklung (Development)
2. Planung (Planning)
3. Realisierung (Construction)
4. Betrieb (Operations)
5. Abbruch (Demolition)

For detailed data model documentation including entity relationships, attribute definitions, and business rules, see [documentation/DATA-MODEL.md](documentation/DATA-MODEL.md).

## URL Routing

Hash-based routing preserves application state:

```
#home                                           # Home page
#elements?tag=Planung&category=Architektur      # Filtered catalog
#element/e1                                     # Detail page
#search?q=fenster                               # Search results
#handbook                                       # Handbook & downloads
```

## Tools

### Image Optimization

The `tools/optimize_images.py` utility provides batch image optimization:

```bash
# Requires Python 3.9+ and Pillow
pip install Pillow
python tools/optimize_images.py assets/img/element --max-width 800
```

Features: auto-backup, smart resizing, progressive JPEG, PNG compression.

## License

Licensed under [MIT](https://opensource.org/licenses/MIT)

---

*Unofficial mockup for demonstration purposes.*

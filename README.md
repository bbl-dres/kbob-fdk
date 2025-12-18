# KBOB BIM Data Catalog (Fachdatenkatalog)

A web-based interactive catalog for BIM (Building Information Modeling) requirements, classifications, and information specifications (LOI) for building elements and documents in Switzerland. Designed as the foundation for Auftraggeber-Informationsanforderungen (AIA) and BIM-Abwicklungspläne (BAP) for Swiss public agencies.

**Live Demo:** [https://davras5.github.io/kbob-fdk/](https://davras5.github.io/kbob-fdk/)

<p align="center">
  <img src="assets/readme/preview1.JPG" width="45%"/>
  &nbsp;&nbsp;&nbsp;
  <img src="assets/readme/preview2.JPG" width="45%"/>
</p>

## Features

- **5 Catalogs** - Browse building elements, document types, BIM use cases, professional models, and EPD data
- **Grid & List Views** - Toggle between card grid and table layouts with state preserved in URL
- **Advanced Filtering** - Tag-based (AND logic), category (exclusive), and phase (OR logic) filters with A-Z navigation
- **Real-time Search** - Global search across all data types with dropdown preview and dedicated search results page
- **Detail Pages** - Comprehensive info including classifications (eBKP-H, DIN 276, Uniformat II, KBOB), IFC 4.3 mappings (Revit, ArchiCAD), geometry and LOI requirements per project phase (1-5)
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
| CSS3 | Swiss Federal Design System, Flexbox/Grid layouts |
| Vanilla JavaScript | Zero NPM dependencies, ~3,700 lines across 15 modules |
| Lucide Icons | SVG icon library |
| Noto Sans | Typography (Google Fonts) |
| JSON | Primary static data storage |
| Supabase | Optional PostgreSQL backend with automatic fallback |

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
│   ├── tokens.css          # Design tokens (colors, typography)
│   └── styles.css          # Component and layout styles
├── js/
│   ├── app.js              # Initialization & data loading
│   ├── state.js            # Global state & XSS utilities
│   ├── url.js              # URL parsing & hash-based routing
│   ├── router.js           # Main routing logic
│   ├── data.js             # Filter helpers
│   ├── search.js           # Search engines
│   ├── filters.js          # Filter bar components
│   ├── renderers.js        # Card/list rendering
│   ├── pages.js            # Catalog page renderers
│   ├── details.js          # Detail page renderers
│   ├── handbook.js         # Handbook & downloads page
│   ├── breadcrumb.js       # Breadcrumb navigation
│   ├── ui.js               # Language dropdown
│   ├── config.js           # Application configuration
│   └── supabase-client.js  # Database client & caching
├── data/
│   ├── elements.json       # 15 building elements with LOI specs
│   ├── documents.json      # 20 document types
│   ├── usecases.json       # 30 BIM use cases
│   ├── models.json         # 10 professional BIM models
│   └── epds.json           # 10 environmental product declarations
├── assets/
│   ├── img/                # Element images
│   ├── document/           # Document images
│   ├── usecase/            # Use case images
│   └── readme/             # Preview screenshots
├── supabase/               # Optional database setup
│   ├── README.md           # Migration guide
│   ├── generate-seed.js    # SQL seed generator
│   └── migrations/         # Database schema & seed files
├── tools/
│   └── optimize_images.py  # Image optimization utility
└── README.md
```

## Data Architecture

The application supports two data sources with automatic fallback:

1. **JSON Files (Default)** - Static files in `/data/` for zero-config deployment
2. **Supabase PostgreSQL (Optional)** - For dynamic data management with 5-minute response caching

See [supabase/README.md](supabase/README.md) for database setup instructions.

## URL Routing

Hash-based routing preserves application state:

```
#home                                           # Home page
#elements?tag=Planung&category=Architektur      # Filtered catalog
#element/e1                                     # Detail page
#search?q=fenster                               # Search results
#handbook                                       # Handbook & downloads
```

## License

Licensed under [MIT](https://opensource.org/licenses/MIT)

---

*Unofficial mockup for demonstration purposes.*

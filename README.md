# KBOB BIM Data Catalog

A web-based interactive catalog for BIM (Building Information Modeling) requirements, classifications, and information specifications (LOI) for building elements and documents.

**Live Demo:** [https://davras5.github.io/kbob-fdk/](https://davras5.github.io/kbob-fdk/)

<p align="center">
  <img src="assets/readme/preview1.JPG" width="45%"/>
  &nbsp;&nbsp;&nbsp;
  <img src="assets/readme/preview2.JPG" width="45%"/>
</p>

## Features

- **Dual Catalogs** - Browse 15 building elements and 20 document types
- **Grid & List Views** - Toggle between card grid and table layouts
- **Search & Filter** - Real-time search with tag-based filtering and A-Z navigation
- **Detail Pages** - Comprehensive info including classifications (eBKP-H, DIN 276, Uniformat II), IFC mappings, geometry and LOI requirements per phase
- **Shareable URLs** - Filter states preserved in URL for easy sharing
- **Responsive Design** - Optimized for desktop and tablet

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Single-page application structure |
| CSS3 | Custom properties, Flexbox/Grid layouts |
| Vanilla JavaScript | No frameworks, zero dependencies |
| Material Icons | UI iconography |
| Inter Font | Typography |
| JSON | Static data storage |

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
├── index.html          # Main SPA (HTML + CSS + JS)
├── data/
│   ├── elements.json   # 15 building elements
│   └── documents.json  # 20 document types
├── assets/
│   ├── img/            # Element images
│   └── readme/         # Preview screenshots
└── README.md
```

## License

Licensed under [MIT](https://opensource.org/licenses/MIT)

---

*Unofficial mockup for demonstration purposes.*

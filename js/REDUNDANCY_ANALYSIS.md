# JavaScript Redundancy Analysis

This document analyzes code patterns that have been refactored to reduce redundancy in the KBOB Fachdatenkatalog codebase.

## Summary

The JavaScript codebase has been extracted from `index.html` into 13 organized modules in the `/js` folder and refactored to reduce duplication. **Total reduction: ~320 lines (~10%, from ~3,077 to ~2,820 lines).**

## Completed Refactoring

---

## 1. Grid Renderers - COMPLETED

**Files:** `js/renderers.js`

**What was done:** Consolidated 5 grid renderer functions into `renderGenericGridItems()` with `catalogTypeConfig` object.

```javascript
const catalogTypeConfig = {
    elements: { routePrefix: 'element', icon: 'image', ... },
    documents: { routePrefix: 'document', icon: 'file-text', ... },
    // ... etc
};

function renderGenericGridItems(type, items, activeTags, activeCategory) { ... }

// Backward-compatible wrappers preserved
function renderGridItemsHTML(items, activeTags, activeCategory) {
    return renderGenericGridItems('elements', items, activeTags, activeCategory);
}
```

---

## 2. List Renderers - COMPLETED

**Files:** `js/renderers.js`

**What was done:** Consolidated 5 list renderer functions into `renderGenericListItems()` using same `catalogTypeConfig` object. Backward-compatible wrappers preserved.

---

## 3. Catalog Page Renderers - COMPLETED

**Files:** `js/pages.js`

**What was done:** Consolidated 5 catalog page functions into `renderGenericCatalogPage()` with `catalogPageConfig` object.

```javascript
const catalogPageConfig = {
    elements: {
        title: 'Elemente',
        lead: 'Standardisierte BIM-Elemente...',
        searchPlaceholder: 'Suche nach Elementen...',
        filterType: 'elements'
    },
    // ... documents, usecases, models, epds
};

function renderGenericCatalogPage(type, activeTags, activeCategory) { ... }

// Backward-compatible wrappers preserved
```

---

## 4. Detail Page Placeholders - COMPLETED

**Files:** `js/details.js`

**What was done:** Consolidated 3 placeholder detail pages into `renderPlaceholderDetailPage()` with `placeholderDetailConfig` object.

```javascript
const placeholderDetailConfig = {
    documents: { getData: () => globalDocumentsData, icon: 'file-text', ... },
    models: { getData: () => globalModelsData, icon: 'boxes', ... },
    epds: { getData: () => globalEpdsData, icon: 'leaf', ... }
};

function renderPlaceholderDetailPage(type, id, activeTags, activeCategory) { ... }

// Backward-compatible wrappers preserved
```

---

## 5. Search Filter Logic - COMPLETED

**Files:** `js/search.js`

**What was done:** Consolidated search logic with `searchDataTypes` configuration array and `searchItems()` helper function.

```javascript
const searchDataTypes = [
    { key: 'usecases', resultKey: 'anwendungsfaelle', label: 'Anwendungsfälle', ... },
    { key: 'elements', resultKey: 'elemente', ... },
    // ... models, documents, epds
];

function searchItems(data, searchFields, searchTerm) { ... }
function performGlobalSearch(query) { ... } // Uses searchDataTypes
function performFullSearch(query) { ... }   // Uses searchDataTypes
```

---

## 6. Route Map Duplication (Low Impact) - EXISTING

**Status:** Already addressed by `detailToListRouteMap` in `js/state.js`.

---

## 7. Lucide Icon Initialization - COMPLETED

**Files:** `js/renderers.js`

**What was done:** Added `refreshIcons()` utility function for consistent icon initialization.

```javascript
function refreshIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
```

---

## 8. Filter Toggle Pattern - COMPLETED

**Files:** `js/router.js`

**What was done:** Refactored `toggleFilter()` to use `catalogTypeConfig` from renderers.js.

```javascript
window.toggleFilter = function(type = 'elements') {
    const config = catalogTypeConfig[type];
    if (config) {
        config.setFilterVisible(!config.getFilterVisible());
        renderGenericCatalogPage(type, getActiveTagsFromURL(), getActiveCategoryFromURL());
    }
}
```

---

## Final Results

**Actual Reduction:** ~320 lines (~10% reduction)
- From ~3,077 lines to ~2,820 lines

**Files Changed:**
- `js/renderers.js` - Grid/list consolidation + `refreshIcons()` utility
- `js/pages.js` - Catalog page consolidation
- `js/search.js` - Search function consolidation
- `js/details.js` - Placeholder detail page consolidation
- `js/router.js` - Filter toggle simplification

**Notes:**
- All backward-compatible wrapper functions preserved
- Configuration-driven approach allows easy addition of new data types
- No changes to HTML output or visual layout

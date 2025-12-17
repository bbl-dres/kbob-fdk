# JavaScript Redundancy Analysis

This document analyzes code patterns that could be refactored to reduce redundancy in the KBOB Fachdatenkatalog codebase.

## Summary

The JavaScript codebase (~3,077 lines) has been extracted from `index.html` into 13 organized modules in the `/js` folder. Analysis reveals several opportunities for reducing code duplication.

---

## 1. Grid Renderers (High Impact)

**Files:** `js/renderers.js`

**Pattern:** Five nearly identical grid renderer functions:
- `renderGridItemsHTML()` - Elements
- `renderDocGridItemsHTML()` - Documents
- `renderUsecasesGridItemsHTML()` - Use cases
- `renderModelsGridItemsHTML()` - Models
- `renderEpdsGridItemsHTML()` - EPDs

**Differences:** Only the icon type (`image`, `file-text`, `workflow`, `boxes`, `leaf`) and route prefix differ.

**Refactoring Opportunity:**
```javascript
// Single generic function with configuration
function renderGridItemsHTML(items, config) {
    const { routePrefix, icon, activeTags, activeCategory } = config;
    // ... shared rendering logic
}

// Usage
renderGridItemsHTML(globalElementsData, {
    routePrefix: 'element',
    icon: 'image',
    activeTags,
    activeCategory
});
```

**Estimated Reduction:** ~200 lines

---

## 2. List Renderers (High Impact)

**Files:** `js/renderers.js`

**Pattern:** Five nearly identical list renderer functions:
- `renderListItemsHTML()`
- `renderDocListItemsHTML()`
- `renderUsecasesListItemsHTML()`
- `renderModelsListItemsHTML()`
- `renderEpdsListItemsHTML()`

**Differences:** Only the route prefix differs.

**Refactoring Opportunity:** Same as grid renderers - create a single generic function.

**Estimated Reduction:** ~150 lines

---

## 3. Catalog Page Renderers (High Impact)

**Files:** `js/pages.js`

**Pattern:** Five nearly identical catalog page functions:
- `renderCatalogPage()` - Elements
- `renderDocumentsCatalogPage()` - Documents
- `renderUsecasesCatalogPage()` - Use cases
- `renderModelsCatalogPage()` - Models
- `renderEpdsCatalogPage()` - EPDs

**Differences:**
- Page title and description
- Data source (`globalElementsData`, etc.)
- Filter visibility state variable
- Search placeholder text
- Grid/List renderer functions used

**Refactoring Opportunity:**
```javascript
// Configuration object per data type
const catalogConfig = {
    elements: {
        title: 'Elemente',
        description: '...',
        data: () => globalElementsData,
        filterVisibleKey: 'elementsFilterVisible',
        searchPlaceholder: 'Suche nach Elementen...',
        gridRenderer: renderGridItemsHTML,
        listRenderer: renderListItemsHTML,
        searchId: 'catalogSearchInput'
    },
    // ... other types
};

// Single generic function
function renderCatalogPageGeneric(type, activeTags, activeCategory) {
    const config = catalogConfig[type];
    // ... shared rendering logic
}
```

**Estimated Reduction:** ~400 lines

---

## 4. Detail Page Placeholders (Medium Impact)

**Files:** `js/details.js`

**Pattern:** Three placeholder detail pages with identical "In Entwicklung" message:
- `renderDocumentDetailPage()`
- `renderModelDetailPage()`
- `renderEpdDetailPage()`

**Refactoring Opportunity:**
```javascript
function renderPlaceholderDetailPage(config) {
    const { title, description, icon, tags, backLink, activeTags } = config;
    // ... shared placeholder rendering
}
```

**Estimated Reduction:** ~80 lines

---

## 5. Search Filter Logic (Medium Impact)

**Files:** `js/search.js`

**Pattern:** `performGlobalSearch()` and `performFullSearch()` both iterate through all 5 data types with similar filtering logic.

**Current Code (repeated 5x in each function):**
```javascript
results.elemente = globalElementsData
    .filter(el =>
        (el.title && el.title.toLowerCase().includes(searchTerm)) ||
        (el.classification && el.classification.toLowerCase().includes(searchTerm)) ||
        (el.description && el.description.toLowerCase().includes(searchTerm))
    )
    .slice(0, 3);
```

**Refactoring Opportunity:**
```javascript
const dataTypes = [
    { key: 'elements', data: globalElementsData, fields: ['title', 'classification', 'description'] },
    { key: 'documents', data: globalDocumentsData, fields: ['title', 'category', 'description'] },
    // ...
];

function searchDataType(data, fields, searchTerm) {
    return data.filter(item =>
        fields.some(field => item[field]?.toLowerCase().includes(searchTerm))
    );
}
```

**Estimated Reduction:** ~100 lines

---

## 6. Route Map Duplication (Low Impact)

**Files:** `js/url.js`, `js/state.js`

**Pattern:** The detail-to-list route mapping is defined multiple times:
```javascript
const routeMap = {
    'element': 'elements',
    'document': 'documents',
    'usecase': 'usecases',
    'model': 'models',
    'epd': 'epds'
};
```

**Current Locations:**
- `js/state.js` - `detailToListRouteMap`
- `js/url.js` - Used in `toggleTagInURL`, `toggleCategoryInURL`, `togglePhaseInURL`

**Refactoring Opportunity:** Already partially addressed by having `detailToListRouteMap` in `state.js`, but some functions could be refactored to use it consistently.

**Estimated Reduction:** ~20 lines

---

## 7. Lucide Icon Initialization (Low Impact)

**Files:** Multiple files

**Pattern:** `lucide.createIcons()` is called repeatedly:
```javascript
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
```

**Occurrences:** ~15+ times across the codebase

**Refactoring Opportunity:**
```javascript
// In state.js or ui.js
function refreshIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
```

**Estimated Reduction:** Minimal line reduction but improved maintainability

---

## 8. Filter Toggle Pattern (Low Impact)

**Files:** `js/router.js`

**Pattern:** The `toggleFilter()` function has repetitive if-else blocks:
```javascript
window.toggleFilter = function(type = 'elements') {
    if (type === 'elements') {
        elementsFilterVisible = !elementsFilterVisible;
        renderCatalogPage(getActiveTagsFromURL(), getActiveCategoryFromURL());
    } else if (type === 'documents') {
        documentsFilterVisible = !documentsFilterVisible;
        renderDocumentsCatalogPage(getActiveTagsFromURL(), getActiveCategoryFromURL());
    }
    // ... 3 more
}
```

**Refactoring Opportunity:**
```javascript
const filterConfig = {
    elements: { visible: 'elementsFilterVisible', render: renderCatalogPage },
    documents: { visible: 'documentsFilterVisible', render: renderDocumentsCatalogPage },
    // ...
};

window.toggleFilter = function(type = 'elements') {
    const config = filterConfig[type];
    window[config.visible] = !window[config.visible];
    config.render(getActiveTagsFromURL(), getActiveCategoryFromURL());
}
```

**Estimated Reduction:** ~20 lines

---

## Refactoring Priority Recommendations

### Phase 1 (High Impact - ~750 lines reduction)
1. Create generic `renderGridItems()` and `renderListItems()` functions
2. Create generic `renderCatalogPage()` function with configuration

### Phase 2 (Medium Impact - ~180 lines reduction)
3. Consolidate search functions with data type configuration
4. Create shared placeholder detail page function

### Phase 3 (Low Impact - ~40 lines reduction)
5. Create `refreshIcons()` utility function
6. Refactor `toggleFilter()` to use configuration object
7. Ensure route maps are used consistently

---

## Potential Total Reduction

**Conservative Estimate:** ~500-600 lines (15-20% reduction)
**Aggressive Estimate:** ~900-1000 lines (30% reduction)

---

## Notes

- This analysis focuses on code deduplication, not micro-optimizations
- Some redundancy may be intentional for readability or future divergence
- Refactoring should be done incrementally with testing after each change
- Consider TypeScript migration for better type safety when refactoring

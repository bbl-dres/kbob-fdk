/**
 * KBOB Fachdatenkatalog - Search Functionality
 * Consolidated search implementations
 */

// ============================================
// SEARCH CONFIGURATION
// ============================================

/**
 * Configuration for search across data types
 */
const searchDataTypes = [
    {
        key: 'usecases',
        resultKey: 'anwendungsfaelle',
        label: 'Anwendungsfälle',
        type: 'Anwendungsfall',
        routePrefix: 'usecase',
        getData: () => globalUsecasesData,
        searchFields: ['title', 'category', 'description'],
        descriptionField: 'description'
    },
    {
        key: 'elements',
        resultKey: 'elemente',
        label: 'Elemente',
        type: 'Element',
        routePrefix: 'element',
        getData: () => globalElementsData,
        searchFields: ['title', 'classification', 'description'],
        descriptionField: 'classification' // fallback for description
    },
    {
        key: 'models',
        resultKey: 'fachmodelle',
        label: 'Fachmodelle',
        type: 'Fachmodell',
        routePrefix: 'model',
        getData: () => globalModelsData,
        searchFields: ['title', 'category', 'description'],
        descriptionField: 'description'
    },
    {
        key: 'documents',
        resultKey: 'dokumente',
        label: 'Dokumente',
        type: 'Dokument',
        routePrefix: 'document',
        getData: () => globalDocumentsData,
        searchFields: ['title', 'category', 'description'],
        descriptionField: 'description'
    },
    {
        key: 'epds',
        resultKey: 'oekobilanzdaten',
        label: 'Ökobilanzdaten',
        type: 'EPD',
        routePrefix: 'epd',
        getData: () => globalEpdsData,
        searchFields: ['title', 'category', 'description'],
        descriptionField: 'description'
    }
];

// ============================================
// SEARCH HELPERS
// ============================================

/**
 * Search items by term across specified fields
 */
function searchItems(data, searchFields, searchTerm) {
    return data.filter(item =>
        searchFields.some(field =>
            item[field] && item[field].toLowerCase().includes(searchTerm)
        )
    );
}

// ============================================
// GLOBAL SEARCH (Homepage Dropdown)
// ============================================

/**
 * Perform global search across all data types (for homepage dropdown)
 */
function performGlobalSearch(query) {
    const results = {};
    searchDataTypes.forEach(dt => {
        results[dt.resultKey] = [];
    });

    const searchTerm = query.toLowerCase().trim();
    if (searchTerm.length < 2) return results;

    searchDataTypes.forEach(dataType => {
        results[dataType.resultKey] = searchItems(
            dataType.getData(),
            dataType.searchFields,
            searchTerm
        ).slice(0, 3);
    });

    return results;
}

/**
 * Render search dropdown HTML
 */
function renderSearchDropdown(results, query) {
    let hasAnyResults = false;
    let html = '';

    searchDataTypes.forEach(dataType => {
        const items = results[dataType.resultKey];
        if (items && items.length > 0) {
            hasAnyResults = true;
            html += `<div class="search-dropdown-group">`;
            html += `<div class="search-dropdown-header">${dataType.label}</div>`;
            items.forEach(item => {
                html += `<a class="search-dropdown-item" href="#${dataType.routePrefix}/${item.id}">${item.title}</a>`;
            });
            html += `</div>`;
        }
    });

    if (!hasAnyResults) {
        html = `<div class="search-dropdown-empty">Keine Ergebnisse für "${query}"</div>`;
    }

    const encodedQuery = encodeURIComponent(query);
    html += `<a class="search-dropdown-footer" href="#search?q=${encodedQuery}">
        Alle Ergebnisse anzeigen
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    </a>`;

    return html;
}

// ============================================
// FULL SEARCH (Search Results Page)
// ============================================

/**
 * Perform full search across all categories (for search results page)
 */
function performFullSearch(query) {
    const results = [];
    const searchTerm = query.toLowerCase().trim();
    if (searchTerm.length < 2) return results;

    searchDataTypes.forEach(dataType => {
        const matchingItems = searchItems(
            dataType.getData(),
            dataType.searchFields,
            searchTerm
        );

        matchingItems.forEach(item => {
            results.push({
                type: dataType.type,
                category: dataType.routePrefix,
                id: item.id,
                title: item.title,
                description: item.description || item[dataType.descriptionField] || '',
                date: item.date || null
            });
        });
    });

    // Sort results
    if (currentSearchSort === 'date-desc') {
        results.sort((a, b) => {
            if (!a.date && !b.date) return 0;
            if (!a.date) return 1;
            if (!b.date) return -1;
            return new Date(b.date) - new Date(a.date);
        });
    } else if (currentSearchSort === 'date-asc') {
        results.sort((a, b) => {
            if (!a.date && !b.date) return 0;
            if (!a.date) return 1;
            if (!b.date) return -1;
            return new Date(a.date) - new Date(b.date);
        });
    }

    return results;
}

/**
 * Format date for search results display
 */
function formatSearchDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('de-CH', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ============================================
// SEARCH UI SETUP
// ============================================

/**
 * Setup search clear button functionality
 */
function setupSearchClearButton(inputId, clearBtnId, onClear) {
    const input = document.getElementById(inputId);
    const clearBtn = document.getElementById(clearBtnId);

    if (!input || !clearBtn) return;

    function updateClearVisibility() {
        clearBtn.classList.toggle('visible', input.value.length > 0);
    }

    input.addEventListener('input', updateClearVisibility);

    clearBtn.addEventListener('click', (e) => {
        e.preventDefault();
        input.value = '';
        clearBtn.classList.remove('visible');
        input.focus();
        if (onClear) onClear();
    });

    updateClearVisibility();
}

/**
 * Setup global search on homepage
 */
function setupGlobalSearch() {
    const searchInput = document.getElementById('globalSearchInput');
    const searchDropdown = document.getElementById('globalSearchDropdown');

    if (!searchInput || !searchDropdown) return;

    let debounceTimer;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        const query = e.target.value;

        if (query.length < 2) {
            searchDropdown.classList.remove('open');
            return;
        }

        debounceTimer = setTimeout(() => {
            const results = performGlobalSearch(query);
            searchDropdown.innerHTML = renderSearchDropdown(results, query);
            searchDropdown.classList.add('open');
        }, 150);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.gallery-filter-container') && !e.target.closest('.home-search-container')) {
            searchDropdown.classList.remove('open');
        }
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchDropdown.classList.remove('open');
            searchInput.blur();
        }
    });

    searchDropdown.addEventListener('click', (e) => {
        if (e.target.classList.contains('search-dropdown-item') ||
            e.target.classList.contains('search-dropdown-footer')) {
            searchDropdown.classList.remove('open');
            searchInput.value = '';
            const clearBtn = document.getElementById('globalSearchClear');
            if (clearBtn) clearBtn.classList.remove('visible');
        }
    });

    setupSearchClearButton('globalSearchInput', 'globalSearchClear', () => {
        searchDropdown.classList.remove('open');
    });
}

/**
 * Setup header search functionality
 */
function setupHeaderSearch() {
    const toggle = document.getElementById('headerSearchToggle');
    const searchContainer = document.querySelector('.header__search');
    const form = document.getElementById('headerSearchForm');
    const input = document.getElementById('headerSearchInput');

    if (!toggle || !searchContainer || !form || !input) return;

    let isExpanded = false;

    function expandSearch() {
        isExpanded = true;
        searchContainer.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        setTimeout(() => input.focus(), 100);
    }

    function collapseSearch() {
        isExpanded = false;
        searchContainer.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (!isExpanded) {
            expandSearch();
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = input.value.trim();
        if (query.length >= 2) {
            collapseSearch();
            window.location.hash = `search?q=${encodeURIComponent(query)}`;
        }
    });

    document.addEventListener('click', (e) => {
        if (isExpanded && !e.target.closest('.header__search')) {
            collapseSearch();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isExpanded) {
            collapseSearch();
            toggle.focus();
        }
    });

    setupSearchClearButton('headerSearchInput', 'headerSearchClear');
}

// ============================================
// SEARCH VIEW CONTROLS
// ============================================

/**
 * Switch search view mode
 */
window.switchSearchView = function(view) {
    const currentView = getActiveViewFromURL();
    if (view !== currentView) {
        const newHash = currentSearchQuery
            ? `search?q=${encodeURIComponent(currentSearchQuery)}&view=${view}`
            : `search?view=${view}`;
        window.location.hash = newHash;
    }
};

/**
 * Toggle search sort order
 */
window.toggleSearchSort = function() {
    currentSearchSort = currentSearchSort === 'date-desc' ? 'date-asc' : 'date-desc';
    renderSearchResultsPage(currentSearchQuery);
};

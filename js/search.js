/**
 * KBOB Fachdatenkatalog - Search Functionality
 * Global and full search implementations
 */

/**
 * Perform global search across all data types (for homepage dropdown)
 * @param {string} query - Search query
 * @returns {Object} Results organized by type
 */
function performGlobalSearch(query) {
    const results = {
        anwendungsfaelle: [],
        elemente: [],
        fachmodelle: [],
        dokumente: [],
        oekobilanzdaten: []
    };

    const searchTerm = query.toLowerCase().trim();
    if (searchTerm.length < 2) return results;

    // Search Elements
    results.elemente = globalElementsData
        .filter(el =>
            (el.title && el.title.toLowerCase().includes(searchTerm)) ||
            (el.classification && el.classification.toLowerCase().includes(searchTerm)) ||
            (el.description && el.description.toLowerCase().includes(searchTerm))
        )
        .slice(0, 3);

    // Search Documents
    results.dokumente = globalDocumentsData
        .filter(doc =>
            (doc.title && doc.title.toLowerCase().includes(searchTerm)) ||
            (doc.category && doc.category.toLowerCase().includes(searchTerm)) ||
            (doc.description && doc.description.toLowerCase().includes(searchTerm))
        )
        .slice(0, 3);

    // Search Usecases
    results.anwendungsfaelle = globalUsecasesData
        .filter(item =>
            (item.title && item.title.toLowerCase().includes(searchTerm)) ||
            (item.category && item.category.toLowerCase().includes(searchTerm)) ||
            (item.description && item.description.toLowerCase().includes(searchTerm))
        )
        .slice(0, 3);

    // Search Models
    results.fachmodelle = globalModelsData
        .filter(item =>
            (item.title && item.title.toLowerCase().includes(searchTerm)) ||
            (item.category && item.category.toLowerCase().includes(searchTerm)) ||
            (item.description && item.description.toLowerCase().includes(searchTerm))
        )
        .slice(0, 3);

    // Search EPDs
    results.oekobilanzdaten = globalEpdsData
        .filter(item =>
            (item.title && item.title.toLowerCase().includes(searchTerm)) ||
            (item.category && item.category.toLowerCase().includes(searchTerm)) ||
            (item.description && item.description.toLowerCase().includes(searchTerm))
        )
        .slice(0, 3);

    return results;
}

/**
 * Render search dropdown HTML
 * @param {Object} results - Search results
 * @param {string} query - Search query
 * @returns {string} HTML string
 */
function renderSearchDropdown(results, query) {
    const categories = [
        { key: 'anwendungsfaelle', label: 'Anwendungsfälle', hashPrefix: 'usecase' },
        { key: 'elemente', label: 'Elemente', hashPrefix: 'element' },
        { key: 'fachmodelle', label: 'Fachmodelle', hashPrefix: 'model' },
        { key: 'dokumente', label: 'Dokumente', hashPrefix: 'document' },
        { key: 'oekobilanzdaten', label: 'Ökobilanzdaten', hashPrefix: 'epd' }
    ];

    let hasAnyResults = false;
    let html = '';

    categories.forEach(cat => {
        const items = results[cat.key];
        if (items && items.length > 0) {
            hasAnyResults = true;
            html += `<div class="search-dropdown-group">`;
            html += `<div class="search-dropdown-header">${cat.label}</div>`;
            items.forEach(item => {
                html += `<a class="search-dropdown-item" href="#${cat.hashPrefix}/${item.id}">${item.title}</a>`;
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

/**
 * Setup search clear button functionality
 * @param {string} inputId - Input element ID
 * @param {string} clearBtnId - Clear button ID
 * @param {Function} onClear - Optional callback when cleared
 */
function setupSearchClearButton(inputId, clearBtnId, onClear) {
    const input = document.getElementById(inputId);
    const clearBtn = document.getElementById(clearBtnId);

    if (!input || !clearBtn) return;

    function updateClearVisibility() {
        if (input.value.length > 0) {
            clearBtn.classList.add('visible');
        } else {
            clearBtn.classList.remove('visible');
        }
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

/**
 * Perform full search across all categories (for search results page)
 * @param {string} query - Search query
 * @returns {Array} Combined results with metadata
 */
function performFullSearch(query) {
    const results = [];
    const searchTerm = query.toLowerCase().trim();
    if (searchTerm.length < 2) return results;

    // Search Use Cases
    globalUsecasesData.forEach(item => {
        if ((item.title && item.title.toLowerCase().includes(searchTerm)) ||
            (item.category && item.category.toLowerCase().includes(searchTerm)) ||
            (item.description && item.description.toLowerCase().includes(searchTerm))) {
            results.push({
                type: 'Anwendungsfall',
                category: 'usecase',
                id: item.id,
                title: item.title,
                description: item.description || '',
                date: item.date || null
            });
        }
    });

    // Search Elements
    globalElementsData.forEach(item => {
        if ((item.title && item.title.toLowerCase().includes(searchTerm)) ||
            (item.classification && item.classification.toLowerCase().includes(searchTerm)) ||
            (item.description && item.description.toLowerCase().includes(searchTerm))) {
            results.push({
                type: 'Element',
                category: 'element',
                id: item.id,
                title: item.title,
                description: item.description || item.classification || '',
                date: item.date || null
            });
        }
    });

    // Search Models
    globalModelsData.forEach(item => {
        if ((item.title && item.title.toLowerCase().includes(searchTerm)) ||
            (item.category && item.category.toLowerCase().includes(searchTerm)) ||
            (item.description && item.description.toLowerCase().includes(searchTerm))) {
            results.push({
                type: 'Fachmodell',
                category: 'model',
                id: item.id,
                title: item.title,
                description: item.description || '',
                date: item.date || null
            });
        }
    });

    // Search Documents
    globalDocumentsData.forEach(item => {
        if ((item.title && item.title.toLowerCase().includes(searchTerm)) ||
            (item.category && item.category.toLowerCase().includes(searchTerm)) ||
            (item.description && item.description.toLowerCase().includes(searchTerm))) {
            results.push({
                type: 'Dokument',
                category: 'document',
                id: item.id,
                title: item.title,
                description: item.description || '',
                date: item.date || null
            });
        }
    });

    // Search EPDs
    globalEpdsData.forEach(item => {
        if ((item.title && item.title.toLowerCase().includes(searchTerm)) ||
            (item.category && item.category.toLowerCase().includes(searchTerm)) ||
            (item.description && item.description.toLowerCase().includes(searchTerm))) {
            results.push({
                type: 'EPD',
                category: 'epd',
                id: item.id,
                title: item.title,
                description: item.description || '',
                date: item.date || null
            });
        }
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
 * @param {string} dateStr - Date string
 * @returns {string} Formatted date
 */
function formatSearchDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('de-CH', { day: 'numeric', month: 'long', year: 'numeric' });
}

/**
 * Switch search view mode
 * @param {string} view - View mode ('grid' or 'list')
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

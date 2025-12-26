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
        searchFields: ['name', 'domain', 'description']
    },
    {
        key: 'elements',
        resultKey: 'elemente',
        label: 'Elemente',
        type: 'Element',
        routePrefix: 'element',
        getData: () => globalElementsData,
        searchFields: ['name', 'domain', 'description']
    },
    {
        key: 'models',
        resultKey: 'fachmodelle',
        label: 'Fachmodelle',
        type: 'Fachmodell',
        routePrefix: 'model',
        getData: () => globalModelsData,
        searchFields: ['name', 'domain', 'description']
    },
    {
        key: 'documents',
        resultKey: 'dokumente',
        label: 'Dokumente',
        type: 'Dokument',
        routePrefix: 'document',
        getData: () => globalDocumentsData,
        searchFields: ['name', 'domain', 'description']
    },
    {
        key: 'epds',
        resultKey: 'oekobilanzdaten',
        label: 'Ökobilanzdaten',
        type: 'EPD',
        routePrefix: 'epd',
        getData: () => globalEpdsData,
        searchFields: ['name', 'domain', 'description']
    }
];

// ============================================
// SEARCH HELPERS
// ============================================

/**
 * Get searchable text value from an item field
 * Handles i18n object fields using the t() function
 */
function getSearchableValue(item, field) {
    const value = item[field];
    if (value === null || value === undefined) {
        return '';
    }
    // Handle i18n objects
    if (typeof value === 'object' && !Array.isArray(value)) {
        return t(value);
    }
    return String(value);
}

/**
 * Search items by term across specified fields
 */
function searchItems(data, searchFields, searchTerm) {
    return data.filter(item =>
        searchFields.some(field => {
            const value = getSearchableValue(item, field);
            return value && value.toLowerCase().includes(searchTerm);
        })
    );
}

// ============================================
// GLOBAL SEARCH (Homepage Dropdown)
// ============================================

/**
 * Perform global search across all data types (for homepage dropdown)
 * Returns top 3 results per category, sorted by relevance
 */
function performGlobalSearch(query) {
    const results = {};
    searchDataTypes.forEach(dt => {
        results[dt.resultKey] = [];
    });

    const searchTerm = query.toLowerCase().trim();
    if (searchTerm.length < 2) return results;

    searchDataTypes.forEach(dataType => {
        const matchingItems = searchItems(
            dataType.getData(),
            dataType.searchFields,
            searchTerm
        );

        // Sort by relevance before taking top 3
        matchingItems.sort((a, b) => {
            const titleA = t(a.name).toLowerCase();
            const titleB = t(b.name).toLowerCase();

            // Calculate relevance (lower = better)
            const getRelevance = (title) => {
                if (title === searchTerm) return 0;      // Exact match
                if (title.startsWith(searchTerm)) return 1; // Starts with
                if (title.includes(searchTerm)) return 2;   // Contains
                return 3;                                   // Other field match
            };

            const relA = getRelevance(titleA);
            const relB = getRelevance(titleB);

            if (relA !== relB) return relA - relB;
            return titleA.localeCompare(titleB, 'de');
        });

        results[dataType.resultKey] = matchingItems.slice(0, 3);
    });

    return results;
}

/**
 * Render search dropdown HTML
 */
function renderSearchDropdown(results, query) {
    let hasAnyResults = false;
    let html = '';
    const safeQuery = escapeHtml(query);

    searchDataTypes.forEach(dataType => {
        const items = results[dataType.resultKey];
        if (items && items.length > 0) {
            hasAnyResults = true;
            html += `<div class="search-dropdown-group">`;
            html += `<div class="search-dropdown-header">${escapeHtml(dataType.label)}</div>`;
            items.forEach(item => {
                const title = t(item.name);
                const safeTitle = escapeHtml(title);
                const safeId = escapeHtml(item.id || '');
                html += `<a class="search-dropdown-item" href="#${dataType.routePrefix}/${safeId}">${safeTitle}</a>`;
            });
            html += `</div>`;
        }
    });

    if (!hasAnyResults) {
        html = `<div class="search-dropdown-empty">Keine Ergebnisse für "${safeQuery}"</div>`;
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
 * Returns results sorted by relevance (exact name matches first)
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
            const title = t(item.name);
            const titleLower = title.toLowerCase();
            const desc = t(item.description);

            // Calculate relevance score (lower = better)
            let relevance = 3; // Default: match in other fields
            if (titleLower === searchTerm) {
                relevance = 0; // Exact name match
            } else if (titleLower.startsWith(searchTerm)) {
                relevance = 1; // Name starts with search term
            } else if (titleLower.includes(searchTerm)) {
                relevance = 2; // Name contains search term
            }

            results.push({
                type: dataType.type,
                category: dataType.routePrefix,
                id: item.id,
                title: title,
                description: desc,
                date: item.last_change || null,
                relevance: relevance
            });
        });
    });

    // Sort by relevance first (lower = better), then alphabetically by title
    results.sort((a, b) => {
        if (a.relevance !== b.relevance) {
            return a.relevance - b.relevance;
        }
        return a.title.localeCompare(b.title, 'de');
    });

    // Apply date sorting if requested (overrides relevance)
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
 * Create escape key and outside click handlers for closing UI elements
 * Returns cleanup function to remove listeners
 * @param {Object} options - Configuration options
 * @param {Function} options.onEscape - Callback when Escape is pressed
 * @param {Function} options.onOutsideClick - Callback when clicking outside
 * @param {string} options.containerSelector - Selector for the container element (for outside click detection)
 * @param {Function} options.isActiveCheck - Optional function to check if handlers should respond
 * @returns {Function} Cleanup function to remove event listeners
 */
function createDismissHandlers(options) {
    const { onEscape, onOutsideClick, containerSelector, isActiveCheck } = options;

    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            if (!isActiveCheck || isActiveCheck()) {
                onEscape?.();
            }
        }
    };

    const handleOutsideClick = (e) => {
        if (!isActiveCheck || isActiveCheck()) {
            if (containerSelector && !e.target.closest(containerSelector)) {
                onOutsideClick?.();
            }
        }
    };

    document.addEventListener('keydown', handleEscape);
    if (onOutsideClick && containerSelector) {
        document.addEventListener('click', handleOutsideClick);
    }

    // Return cleanup function
    return () => {
        document.removeEventListener('keydown', handleEscape);
        if (onOutsideClick && containerSelector) {
            document.removeEventListener('click', handleOutsideClick);
        }
    };
}

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
        // Dispatch input event to trigger re-filtering and re-rendering
        input.dispatchEvent(new Event('input', { bubbles: true }));
        if (onClear) onClear();
    });

    updateClearVisibility();
}

// Store debounce timer reference for cleanup
let globalSearchDebounceTimer = null;

/**
 * Cleanup global search resources (call before navigating away)
 */
function cleanupGlobalSearch() {
    if (globalSearchDebounceTimer) {
        clearTimeout(globalSearchDebounceTimer);
        globalSearchDebounceTimer = null;
    }
}

/**
 * Setup global search on homepage
 */
function setupGlobalSearch() {
    const searchInput = document.getElementById('globalSearchInput');
    const searchDropdown = document.getElementById('globalSearchDropdown');

    if (!searchInput || !searchDropdown) return;

    // Clear any existing timer from previous page
    cleanupGlobalSearch();

    const closeDropdown = () => {
        searchDropdown.classList.remove('open');
        searchInput.blur();
    };

    searchInput.addEventListener('input', (e) => {
        clearTimeout(globalSearchDebounceTimer);
        const query = e.target.value;

        if (query.length < 2) {
            searchDropdown.classList.remove('open');
            return;
        }

        globalSearchDebounceTimer = setTimeout(() => {
            const results = performGlobalSearch(query);
            searchDropdown.innerHTML = renderSearchDropdown(results, query);
            searchDropdown.classList.add('open');
        }, 150);
    });

    // Use shared dismiss handlers for escape and outside click
    createDismissHandlers({
        onEscape: closeDropdown,
        onOutsideClick: () => searchDropdown.classList.remove('open'),
        containerSelector: '.gallery-filter-container, .home-search-container',
        isActiveCheck: () => searchDropdown.classList.contains('open')
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

    // Use shared dismiss handlers for escape and outside click
    createDismissHandlers({
        onEscape: () => {
            collapseSearch();
            toggle.focus();
        },
        onOutsideClick: collapseSearch,
        containerSelector: '.header__search',
        isActiveCheck: () => isExpanded
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
 * Toggle sort dropdown visibility
 */
window.toggleSortDropdown = function() {
    const container = document.querySelector('.sort-dropdown-container');
    if (container) {
        container.classList.toggle('open');

        // Close dropdown when clicking outside
        if (container.classList.contains('open')) {
            const closeDropdown = (e) => {
                if (!container.contains(e.target)) {
                    container.classList.remove('open');
                    document.removeEventListener('click', closeDropdown);
                }
            };
            // Delay to avoid immediate close from the toggle click
            setTimeout(() => document.addEventListener('click', closeDropdown), 0);
        }
    }
};

/**
 * Set search sort order
 */
window.setSearchSort = function(sortValue) {
    currentSearchSort = sortValue;
    const container = document.querySelector('.sort-dropdown-container');
    if (container) {
        container.classList.remove('open');
    }
    renderSearchResultsPage(currentSearchQuery);
};

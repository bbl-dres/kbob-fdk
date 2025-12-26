/**
 * KBOB Fachdatenkatalog - Page Renderers
 * Consolidated page rendering functions
 */

// ============================================
// CATALOG PAGE CONFIGURATION
// ============================================

/**
 * Configuration for catalog pages
 */
const catalogPageConfig = {
    elements: {
        title: 'Elemente',
        lead: 'Standardisierte BIM-Elemente für den Hochbau mit LOD- und LOI-Anforderungen pro Projektphase.',
        searchPlaceholder: 'Suche nach Elementen oder Klassifikation...',
        searchInputId: 'catalogSearchInput',
        searchClearId: 'catalogSearchClear',
        contentId: 'catalogContent',
        filterType: 'elements'
    },
    documents: {
        title: 'Dokumente',
        lead: 'Dokumenttypen und Vorlagen für die standardisierte Bauwerksdokumentation im Hochbau.',
        searchPlaceholder: 'Suche nach Dokumenten oder Kategorie...',
        searchInputId: 'documentsSearchInput',
        searchClearId: 'documentsSearchClear',
        contentId: 'documentsContent',
        filterType: 'documents'
    },
    usecases: {
        title: 'Anwendungsfälle',
        lead: 'BIM-Anwendungsfälle für Planung, Koordination, Kostenmanagement und Betrieb.',
        searchPlaceholder: 'Suche nach Anwendungsfällen...',
        searchInputId: 'usecasesSearchInput',
        searchClearId: 'usecasesSearchClear',
        contentId: 'usecasesContent',
        filterType: 'usecases',
        hasPhases: true
    },
    models: {
        title: 'Fachmodelle',
        lead: 'Domänenspezifische BIM-Modelle für Architektur, Tragwerk, Haustechnik und weitere Fachbereiche.',
        searchPlaceholder: 'Suche nach Fachmodellen...',
        searchInputId: 'modelsSearchInput',
        searchClearId: 'modelsSearchClear',
        contentId: 'modelsContent',
        filterType: 'models'
    },
    epds: {
        title: 'Ökobilanzdaten',
        lead: 'Umweltproduktdeklarationen (EPD) und Ökobilanzkennwerte für Baumaterialien und Gebäudetechnik.',
        searchPlaceholder: 'Suche nach Ökobilanzdaten...',
        searchInputId: 'epdsSearchInput',
        searchClearId: 'epdsSearchClear',
        contentId: 'epdsContent',
        filterType: 'epds'
    }
};

// ============================================
// HOME PAGE
// ============================================

function renderHomePage() {
    contentArea.innerHTML = `
        <div class="home-hero-section">
            <h1 class="home-hero__title">Fachdatenkatalog für die digitale Bauwerksdokumentation</h1>
            <p class="hero__description">Der Fachdatenkatalog der KBOB definiert standardisierte Anforderungen an die BIM-basierte Dokumentation von Hochbauprojekten der öffentlichen Hand in der Schweiz. Er dient als Grundlage für Auftraggeber-Informationsanforderungen (AIA) und BIM-Abwicklungspläne (BAP).</p>
            <div class="home-search-container">
                <div class="gallery-filter-wrapper">
                    <input type="text" id="globalSearchInput" class="gallery-filter-input" placeholder="Suche nach Elementen oder Dokumenten..." autocomplete="off">
                    <button type="button" class="clear-btn search-clear-btn" id="globalSearchClear" aria-label="Suche löschen"><i data-lucide="x" aria-hidden="true"></i></button>
                    <button class="gallery-filter-btn" aria-label="Suchen"><i data-lucide="search" aria-hidden="true"></i></button>
                </div>
                <div id="globalSearchDropdown" class="search-dropdown"></div>
            </div>
        </div>

        <!-- Section 2: Themen - Light Background -->
        <section class="home-themen-section">
            <div class="container home-section">
                <header class="home-section__header">
                    <h2 class="home-section__title">Themen</h2>
                    <p class="home-section__subtitle">Entdecken Sie die verschiedenen Bereiche des Fachdatenkatalogs</p>
                </header>
                <div class="quick-access-grid">
                    <a href="#usecases" class="quick-card" data-route="usecases">
                        <h3 class="quick-card__title">Anwendungsfälle</h3>
                        <p class="quick-card__desc">BIM-Anwendungsfälle für Planung, Koordination und Betrieb</p>
                        <span class="arrow-btn quick-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                    </a>
                    <a href="#elements" class="quick-card" data-route="elements">
                        <h3 class="quick-card__title">Elemente</h3>
                        <p class="quick-card__desc">Standardisierte BIM-Elemente für den Hochbau mit LOD- und LOI-Anforderungen</p>
                        <span class="arrow-btn quick-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                    </a>
                    <a href="#models" class="quick-card" data-route="models">
                        <h3 class="quick-card__title">Fachmodelle</h3>
                        <p class="quick-card__desc">Domänenspezifische Modelle für Architektur, Statik und Gebäudetechnik</p>
                        <span class="arrow-btn quick-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                    </a>
                    <a href="#documents" class="quick-card" data-route="documents">
                        <h3 class="quick-card__title">Dokumente</h3>
                        <p class="quick-card__desc">Dokumenttypen und Vorlagen für die Bauwerksdokumentation</p>
                        <span class="arrow-btn quick-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                    </a>
                    <a href="#epds" class="quick-card" data-route="epds">
                        <h3 class="quick-card__title">Ökobilanzdaten</h3>
                        <p class="quick-card__desc">Umweltkennwerte für Baumaterialien und Gebäudetechnik</p>
                        <span class="arrow-btn quick-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                    </a>
                    <a href="#api-docs" class="quick-card" data-route="api-docs">
                        <h3 class="quick-card__title">REST API</h3>
                        <p class="quick-card__desc">Interaktive Dokumentation der REST-Endpunkte zum Testen und Erkunden</p>
                        <span class="arrow-btn quick-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                    </a>
                </div>
            </div>
        </section>`;

    setupGlobalSearch();
    refreshIcons();
    // Quick-card click handlers are managed via event delegation in app.js
}

// ============================================
// SEARCH RESULTS PAGE
// ============================================

function renderSearchResultsPage(query) {
    currentSearchQuery = query || '';
    const results = performFullSearch(currentSearchQuery);
    const resultCount = results.length;

    let resultsHtml = '';
    if (resultCount === 0 && currentSearchQuery.length >= 2) {
        resultsHtml = `
            <div class="search-results__empty">
                <div class="search-results__empty-icon"><i data-lucide="search-x" aria-hidden="true"></i></div>
                <h3 class="search-results__empty-title">Keine Ergebnisse gefunden</h3>
                <p class="search-results__empty-text">Versuchen Sie es mit anderen Suchbegriffen.</p>
            </div>
        `;
    } else if (getActiveViewFromURL() === 'list') {
        resultsHtml = `<div class="search-results__list">`;
        results.forEach(item => {
            const dateStr = formatSearchDate(item.date);
            const safeTitle = escapeHtml(item.title || '');
            const safeDesc = escapeHtml(item.description || '');
            const safeType = escapeHtml(item.type || '');
            const safeId = escapeHtml(item.id || '');
            const safeCat = escapeHtml(item.category || '');
            resultsHtml += `
                <a href="#${safeCat}/${safeId}" class="search-result-item">
                    <div class="search-result-item__meta">
                        <span class="search-result-item__type">${safeType}</span>
                        ${dateStr ? `<span class="search-result-item__date">${dateStr}</span>` : ''}
                    </div>
                    <h3 class="search-result-item__title">${safeTitle}</h3>
                    <p class="search-result-item__desc">${safeDesc}</p>
                </a>
            `;
        });
        resultsHtml += `</div>`;
    } else {
        resultsHtml = `<div class="search-results__grid">`;
        results.forEach(item => {
            const dateStr = formatSearchDate(item.date);
            const safeTitle = escapeHtml(item.title || '');
            const safeDesc = escapeHtml(item.description || '');
            const safeType = escapeHtml(item.type || '');
            const safeId = escapeHtml(item.id || '');
            const safeCat = escapeHtml(item.category || '');
            resultsHtml += `
                <a href="#${safeCat}/${safeId}" class="search-result-card">
                    <div class="search-result-card__meta">
                        <span class="search-result-card__type">${safeType}</span>
                        ${dateStr ? `<span class="search-result-card__date">${dateStr}</span>` : ''}
                    </div>
                    <h3 class="search-result-card__title">${safeTitle}</h3>
                    <p class="search-result-card__desc">${safeDesc}</p>
                    <span class="arrow-btn search-result-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                </a>
            `;
        });
        resultsHtml += `</div>`;
    }

    const safeSearchQuery = escapeHtml(currentSearchQuery);
    contentArea.innerHTML = `
        <div class="search-hero">
            <div class="container">
                <h1 class="search-hero__title">Suche</h1>
                <form class="search-hero__form" id="searchPageForm" role="search">
                    <div class="search-hero__input-wrapper">
                        <input type="search" id="searchPageInput" class="search-hero__input" value="${safeSearchQuery}" placeholder="Suchbegriff eingeben..." autocomplete="off">
                        <button type="button" class="clear-btn search-hero__clear ${currentSearchQuery ? 'visible' : ''}" id="searchPageClear" aria-label="Suche löschen">
                            <i data-lucide="x" aria-hidden="true"></i>
                        </button>
                        <button type="submit" class="search-hero__submit" aria-label="Suchen">
                            <i data-lucide="search" aria-hidden="true"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div class="search-results">
            <div class="container">
                ${currentSearchQuery.length >= 2 ? `
                <div class="search-results__header">
                    <span class="search-results__count">${resultCount} Suchergebnisse</span>
                    <div class="search-results__controls">
                        <div class="sort-dropdown-container">
                            <button class="search-results__sort" data-action="toggle-sort-dropdown">
                                <span>${currentSearchSort === 'relevance' ? 'Nach Relevanz sortieren' : currentSearchSort === 'date-desc' ? 'Nach Datum (Neueste zuerst)' : 'Nach Datum (Älteste zuerst)'}</span>
                                <i data-lucide="chevron-down" aria-hidden="true"></i>
                            </button>
                            <div class="sort-dropdown">
                                <button class="sort-dropdown__item ${currentSearchSort === 'relevance' ? 'active' : ''}" data-action="set-search-sort" data-sort="relevance">Nach Relevanz sortieren</button>
                                <button class="sort-dropdown__item ${currentSearchSort === 'date-desc' ? 'active' : ''}" data-action="set-search-sort" data-sort="date-desc">Nach Datum (Neueste zuerst)</button>
                                <button class="sort-dropdown__item ${currentSearchSort === 'date-asc' ? 'active' : ''}" data-action="set-search-sort" data-sort="date-asc">Nach Datum (Älteste zuerst)</button>
                            </div>
                        </div>
                        <div class="view-switcher toolbar-control">
                            <button class="view-btn ${getActiveViewFromURL() === 'list' ? 'active' : ''}" data-action="switch-search-view" data-view="list" title="Listenansicht" aria-label="Listenansicht">
                                <i data-lucide="list" aria-hidden="true"></i>
                            </button>
                            <button class="view-btn ${getActiveViewFromURL() === 'grid' ? 'active' : ''}" data-action="switch-search-view" data-view="grid" title="Rasteransicht" aria-label="Rasteransicht">
                                <i data-lucide="layout-grid" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
                ` : ''}
                ${resultsHtml}
            </div>
        </div>
    `;

    const searchForm = document.getElementById('searchPageForm');
    const searchInput = document.getElementById('searchPageInput');
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newQuery = searchInput.value.trim();
            if (newQuery.length >= 2) {
                const view = getActiveViewFromURL();
                const viewParam = view !== 'grid' ? `&view=${view}` : '';
                window.location.hash = `search?q=${encodeURIComponent(newQuery)}${viewParam}`;
            }
        });
    }

    refreshIcons();
    setupSearchClearButton('searchPageInput', 'searchPageClear');
}

// ============================================
// GENERIC CATALOG PAGE RENDERER
// ============================================

/**
 * Generic catalog page renderer
 * @param {string} type - Catalog type key (elements, documents, usecases, models, epds)
 * @param {string[]} activeTags - Active tag filters
 * @param {string} activeCategory - Active category filter
 */
function renderGenericCatalogPage(type, activeTags = [], activeCategory = '') {
    const pageConfig = catalogPageConfig[type];
    const typeConfig = catalogTypeConfig[type];

    if (!pageConfig || !typeConfig) {
        contentArea.innerHTML = '<div class="container error-state">Seite nicht gefunden.</div>';
        return;
    }

    // Get active phases for usecases
    const activePhases = typeConfig.hasPhases ? getActivePhasesFromURL() : [];

    // Apply filters (data is pre-sorted at load time for performance)
    let filteredData = filterDataByCategory(typeConfig.getData(), activeCategory);
    filteredData = filterDataByTags(filteredData, activeTags);
    if (typeConfig.hasPhases) {
        filteredData = filterDataByPhases(filteredData, activePhases);
    }

    const filterPanelClass = typeConfig.getFilterVisible() ? '' : 'closed';
    const currentView = getActiveViewFromURL();
    const gridActive = currentView === 'grid' ? 'active' : '';
    const listActive = currentView === 'list' ? 'active' : '';
    const activeFiltersCount = activeTags.length + (activeCategory ? 1 : 0) + activePhases.length;

    // Render page
    contentArea.innerHTML = `
        <div class="container">
            <div class="page-header">
                <h1 class="page-title">${pageConfig.title}</h1>
                <p class="page-lead">${pageConfig.lead}</p>
            </div>
            <div class="gallery-filter-container">
                <div class="gallery-filter-left">
                    <div class="gallery-filter-wrapper">
                        <input type="text" id="${pageConfig.searchInputId}" class="gallery-filter-input" placeholder="${pageConfig.searchPlaceholder}">
                        <button type="button" class="clear-btn search-clear-btn" id="${pageConfig.searchClearId}" aria-label="Suche löschen"><i data-lucide="x" aria-hidden="true"></i></button>
                        <button class="gallery-filter-btn" aria-label="Suchen"><i data-lucide="search" aria-hidden="true"></i></button>
                    </div>
                    ${renderFilterButton(pageConfig.filterType, typeConfig.getFilterVisible(), activeFiltersCount)}
                </div>
                <div class="search-results__controls">
                    <button class="search-results__sort">
                        <span>Sortiert nach Titel (A-Z)</span>
                        <i data-lucide="chevron-down" aria-hidden="true"></i>
                    </button>
                    <div class="view-switcher toolbar-control">
                        <button class="view-btn ${listActive}" data-action="switch-view" data-view="list" aria-label="Listenansicht"><i data-lucide="list" aria-hidden="true"></i></button>
                        <button class="view-btn ${gridActive}" data-action="switch-view" data-view="grid" aria-label="Rasteransicht"><i data-lucide="layout-grid" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>

            ${renderFilterBar({
                data: typeConfig.getData(),
                activeTags: activeTags,
                activeCategory: activeCategory,
                activePhases: activePhases,
                showPhases: typeConfig.hasPhases || false,
                filterPanelClass: filterPanelClass
            })}

            <div id="${pageConfig.contentId}" class="catalog-content">
                ${currentView === 'grid'
                    ? `<div class="element-grid">${renderGenericGridItems(type, filteredData, activeTags, activeCategory)}</div>`
                    : renderGenericListItems(type, filteredData, activeTags, activeCategory)
                }
            </div>
        </div>`;

    // Setup search input handler with debouncing for performance
    const searchInput = document.getElementById(pageConfig.searchInputId);
    if (searchInput) {
        let searchDebounceTimer = null;

        searchInput.addEventListener('input', (e) => {
            // Clear previous debounce timer
            clearTimeout(searchDebounceTimer);

            // Debounce search for 200ms to avoid excessive re-renders
            searchDebounceTimer = setTimeout(() => {
                document.querySelectorAll('.az-btn').forEach(b => b.classList.remove('active'));
                const searchTerm = e.target.value.toLowerCase();

                // Apply all filters plus search term
                let searchFilteredData = filterDataByCategory(typeConfig.getData(), activeCategory);
                searchFilteredData = filterDataByTags(searchFilteredData, activeTags);
                if (typeConfig.hasPhases) {
                    searchFilteredData = filterDataByPhases(searchFilteredData, activePhases);
                }

                // Filter by search term using configured search fields (i18n-aware)
                if (searchTerm) {
                    searchFilteredData = searchFilteredData.filter(item =>
                        typeConfig.searchFields.some(field => {
                            const value = getSearchableValue(item, field);
                            return value && value.toLowerCase().includes(searchTerm);
                        })
                    );
                }

                const container = document.getElementById(pageConfig.contentId);
                const isGridView = getActiveViewFromURL() === 'grid';
                container.innerHTML = isGridView
                    ? `<div class="element-grid">${renderGenericGridItems(type, searchFilteredData, activeTags, activeCategory)}</div>`
                    : renderGenericListItems(type, searchFilteredData, activeTags, activeCategory);
                refreshIcons(container);
                if (isGridView && typeof fitAllCardTagsToSingleRow === 'function') {
                    fitAllCardTagsToSingleRow();
                }
            }, 200);
        });
    }

    refreshIcons();
    setupSearchClearButton(pageConfig.searchInputId, pageConfig.searchClearId);

    // Fit card tags to single row in grid view
    if (getActiveViewFromURL() === 'grid' && typeof fitAllCardTagsToSingleRow === 'function') {
        fitAllCardTagsToSingleRow();
    }
}

// ============================================
// BACKWARD COMPATIBLE CATALOG PAGE WRAPPERS
// ============================================

function renderCatalogPage(activeTags = [], activeCategory = '') {
    renderGenericCatalogPage('elements', activeTags, activeCategory);
}

function renderDocumentsCatalogPage(activeTags = [], activeCategory = '') {
    renderGenericCatalogPage('documents', activeTags, activeCategory);
}

function renderUsecasesCatalogPage(activeTags = [], activeCategory = '') {
    renderGenericCatalogPage('usecases', activeTags, activeCategory);
}

function renderModelsCatalogPage(activeTags = [], activeCategory = '') {
    renderGenericCatalogPage('models', activeTags, activeCategory);
}

function renderEpdsCatalogPage(activeTags = [], activeCategory = '') {
    renderGenericCatalogPage('epds', activeTags, activeCategory);
}

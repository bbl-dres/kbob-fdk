/**
 * KBOB Fachdatenkatalog - Page Renderers
 * All page rendering functions
 */

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
                    <button type="button" class="search-clear-btn" id="globalSearchClear" aria-label="Suche löschen"><i data-lucide="x" aria-hidden="true"></i></button>
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
                        <span class="quick-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                    </a>
                    <a href="#elements" class="quick-card" data-route="elements">
                        <h3 class="quick-card__title">Elemente</h3>
                        <p class="quick-card__desc">Standardisierte BIM-Elemente für den Hochbau mit LOD- und LOI-Anforderungen</p>
                        <span class="quick-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                    </a>
                    <a href="#models" class="quick-card" data-route="models">
                        <h3 class="quick-card__title">Fachmodelle</h3>
                        <p class="quick-card__desc">Domänenspezifische Modelle für Architektur, Statik und Gebäudetechnik</p>
                        <span class="quick-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                    </a>
                    <a href="#documents" class="quick-card" data-route="documents">
                        <h3 class="quick-card__title">Dokumente</h3>
                        <p class="quick-card__desc">Dokumenttypen und Vorlagen für die Bauwerksdokumentation</p>
                        <span class="quick-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                    </a>
                    <a href="#epds" class="quick-card" data-route="epds">
                        <h3 class="quick-card__title">Ökobilanzdaten</h3>
                        <p class="quick-card__desc">Umweltkennwerte für Baumaterialien und Gebäudetechnik</p>
                        <span class="quick-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                    </a>
                </div>
            </div>
        </section>`;

    setupGlobalSearch();

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    document.querySelectorAll('.quick-card[data-route]').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const route = card.dataset.route;
            if (route) {
                window.location.hash = route;
            }
        });
    });
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
            resultsHtml += `
                <div class="search-result-item">
                    <div class="search-result-item__meta">
                        <span class="search-result-item__type">${item.type}</span>
                        ${dateStr ? `<span class="search-result-item__date">${dateStr}</span>` : ''}
                    </div>
                    <h3 class="search-result-item__title"><a href="#${item.category}/${item.id}">${item.title}</a></h3>
                    <p class="search-result-item__desc">${item.description}</p>
                </div>
            `;
        });
        resultsHtml += `</div>`;
    } else {
        resultsHtml = `<div class="search-results__grid">`;
        results.forEach(item => {
            const dateStr = formatSearchDate(item.date);
            resultsHtml += `
                <div class="search-result-card">
                    <div class="search-result-card__meta">
                        <span class="search-result-card__type">${item.type}</span>
                        ${dateStr ? `<span class="search-result-card__date">${dateStr}</span>` : ''}
                    </div>
                    <h3 class="search-result-card__title"><a href="#${item.category}/${item.id}">${item.title}</a></h3>
                    <p class="search-result-card__desc">${item.description}</p>
                    <div class="search-result-card__footer">
                        <a href="#${item.category}/${item.id}" class="search-result-card__link" aria-label="${item.title} öffnen">
                            <i data-lucide="arrow-right" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            `;
        });
        resultsHtml += `</div>`;
    }

    contentArea.innerHTML = `
        <div class="search-hero">
            <div class="container">
                <h1 class="search-hero__title">Suche</h1>
                <form class="search-hero__form" id="searchPageForm" role="search">
                    <div class="search-hero__input-wrapper">
                        <input type="search" id="searchPageInput" class="search-hero__input" value="${currentSearchQuery}" placeholder="Suchbegriff eingeben..." autocomplete="off">
                        <button type="button" class="search-hero__clear ${currentSearchQuery ? 'visible' : ''}" id="searchPageClear" aria-label="Suche löschen">
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
                        <button class="search-results__sort" onclick="toggleSearchSort()">
                            <span>${currentSearchSort === 'date-desc' ? 'Nach Datum sortieren (Absteigend)' : 'Nach Datum sortieren (Aufsteigend)'}</span>
                            <i data-lucide="chevron-down" aria-hidden="true"></i>
                        </button>
                        <div class="view-switcher toolbar-control">
                            <button class="view-btn ${getActiveViewFromURL() === 'list' ? 'active' : ''}" onclick="switchSearchView('list')" title="Listenansicht" aria-label="Listenansicht">
                                <i data-lucide="list" aria-hidden="true"></i>
                            </button>
                            <button class="view-btn ${getActiveViewFromURL() === 'grid' ? 'active' : ''}" onclick="switchSearchView('grid')" title="Rasteransicht" aria-label="Rasteransicht">
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

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    setupSearchClearButton('searchPageInput', 'searchPageClear');
}

// ============================================
// CATALOG PAGES
// ============================================

function renderCatalogPage(activeTags = [], activeCategory = '') {
    let filteredData = filterDataByCategory(globalElementsData, activeCategory);
    filteredData = filterDataByTags(filteredData, activeTags);

    const filterPanelClass = elementsFilterVisible ? '' : 'closed';
    const currentView = getActiveViewFromURL();
    const gridActive = currentView === 'grid' ? 'active' : '';
    const listActive = currentView === 'list' ? 'active' : '';
    const activeFiltersCount = activeTags.length + (activeCategory ? 1 : 0);

    contentArea.innerHTML = `
        <div class="container">
            <div class="page-header">
                <h1 class="page-title">Elemente</h1>
                <p class="page-lead">Standardisierte BIM-Elemente für den Hochbau mit LOD- und LOI-Anforderungen pro Projektphase.</p>
            </div>
            <div class="gallery-filter-container">
                <div class="gallery-filter-left">
                    <div class="gallery-filter-wrapper">
                        <input type="text" id="catalogSearchInput" class="gallery-filter-input" placeholder="Suche nach Elementen oder Klassifikation...">
                        <button type="button" class="search-clear-btn" id="catalogSearchClear" aria-label="Suche löschen"><i data-lucide="x" aria-hidden="true"></i></button>
                        <button class="gallery-filter-btn" aria-label="Suchen"><i data-lucide="search" aria-hidden="true"></i></button>
                    </div>
                    ${renderFilterButton('elements', elementsFilterVisible, activeFiltersCount)}
                </div>
                <div class="view-switcher toolbar-control">
                    <button class="view-btn ${listActive}" onclick="switchView('list')" aria-label="Listenansicht"><i data-lucide="list" aria-hidden="true"></i></button>
                    <button class="view-btn ${gridActive}" onclick="switchView('grid')" aria-label="Rasteransicht"><i data-lucide="layout-grid" aria-hidden="true"></i></button>
                </div>
            </div>

            ${renderFilterBar({
                data: globalElementsData,
                activeTags: activeTags,
                activeCategory: activeCategory,
                filterPanelClass: filterPanelClass
            })}

            <div id="catalogContent" class="catalog-content">
                ${currentView === 'grid'
                    ? `<div class="element-grid">${renderGridItemsHTML(filteredData, activeTags, activeCategory)}</div>`
                    : renderListItemsHTML(filteredData, activeTags, activeCategory)
                }
            </div>
        </div>`;

    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            document.querySelectorAll('.az-btn').forEach(b => b.classList.remove('active'));
            const searchTerm = e.target.value.toLowerCase();

            let searchFilteredData = filterDataByCategory(globalElementsData, activeCategory);
            searchFilteredData = filterDataByTags(searchFilteredData, activeTags);
            searchFilteredData = searchFilteredData.filter(el =>
                (el.title && el.title.toLowerCase().includes(searchTerm)) ||
                (el.classification && el.classification.toLowerCase().includes(searchTerm))
            );

            const container = document.getElementById('catalogContent');
            container.innerHTML = (getActiveViewFromURL() === 'grid')
                ? `<div class="element-grid">${renderGridItemsHTML(searchFilteredData, activeTags, activeCategory)}</div>`
                : renderListItemsHTML(searchFilteredData, activeTags, activeCategory);
        });
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    setupSearchClearButton('catalogSearchInput', 'catalogSearchClear');
}

function renderDocumentsCatalogPage(activeTags = [], activeCategory = '') {
    let filteredData = filterDataByCategory(globalDocumentsData, activeCategory);
    filteredData = filterDataByTags(filteredData, activeTags);

    const filterPanelClass = documentsFilterVisible ? '' : 'closed';
    const currentView = getActiveViewFromURL();
    const gridActive = currentView === 'grid' ? 'active' : '';
    const listActive = currentView === 'list' ? 'active' : '';
    const activeFiltersCount = activeTags.length + (activeCategory ? 1 : 0);

    contentArea.innerHTML = `
        <div class="container">
            <div class="page-header">
                <h1 class="page-title">Dokumente</h1>
                <p class="page-lead">Dokumenttypen und Vorlagen für die standardisierte Bauwerksdokumentation im Hochbau.</p>
            </div>
            <div class="gallery-filter-container">
                <div class="gallery-filter-left">
                    <div class="gallery-filter-wrapper">
                        <input type="text" id="documentsSearchInput" class="gallery-filter-input" placeholder="Suche nach Dokumenten oder Kategorie...">
                        <button type="button" class="search-clear-btn" id="documentsSearchClear" aria-label="Suche löschen"><i data-lucide="x" aria-hidden="true"></i></button>
                        <button class="gallery-filter-btn" aria-label="Suchen"><i data-lucide="search" aria-hidden="true"></i></button>
                    </div>
                    ${renderFilterButton('documents', documentsFilterVisible, activeFiltersCount)}
                </div>
                <div class="view-switcher toolbar-control">
                    <button class="view-btn ${listActive}" onclick="switchView('list')" aria-label="Listenansicht"><i data-lucide="list" aria-hidden="true"></i></button>
                    <button class="view-btn ${gridActive}" onclick="switchView('grid')" aria-label="Rasteransicht"><i data-lucide="layout-grid" aria-hidden="true"></i></button>
                </div>
            </div>

            ${renderFilterBar({
                data: globalDocumentsData,
                activeTags: activeTags,
                activeCategory: activeCategory,
                filterPanelClass: filterPanelClass
            })}

            <div id="documentsContent" class="catalog-content">
                ${currentView === 'grid'
                    ? `<div class="element-grid">${renderDocGridItemsHTML(filteredData, activeTags, activeCategory)}</div>`
                    : renderDocListItemsHTML(filteredData, activeTags, activeCategory)
                }
            </div>
        </div>`;

    const searchInput = document.getElementById('documentsSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            document.querySelectorAll('.az-btn').forEach(b => b.classList.remove('active'));
            const searchTerm = e.target.value.toLowerCase();

            let searchFilteredData = filterDataByCategory(globalDocumentsData, activeCategory);
            searchFilteredData = filterDataByTags(searchFilteredData, activeTags);
            searchFilteredData = searchFilteredData.filter(doc =>
                (doc.title && doc.title.toLowerCase().includes(searchTerm)) ||
                (doc.category && doc.category.toLowerCase().includes(searchTerm)) ||
                (doc.description && doc.description.toLowerCase().includes(searchTerm))
            );

            const container = document.getElementById('documentsContent');
            container.innerHTML = (getActiveViewFromURL() === 'grid')
                ? `<div class="element-grid">${renderDocGridItemsHTML(searchFilteredData, activeTags, activeCategory)}</div>`
                : renderDocListItemsHTML(searchFilteredData, activeTags, activeCategory);
        });
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    setupSearchClearButton('documentsSearchInput', 'documentsSearchClear');
}

function renderUsecasesCatalogPage(activeTags = [], activeCategory = '') {
    const activePhases = getActivePhasesFromURL();

    let filteredData = filterDataByCategory(globalUsecasesData, activeCategory);
    filteredData = filterDataByTags(filteredData, activeTags);
    filteredData = filterDataByPhases(filteredData, activePhases);

    const filterPanelClass = usecasesFilterVisible ? '' : 'closed';
    const currentView = getActiveViewFromURL();
    const gridActive = currentView === 'grid' ? 'active' : '';
    const listActive = currentView === 'list' ? 'active' : '';
    const activeFiltersCount = activeTags.length + (activeCategory ? 1 : 0) + activePhases.length;

    contentArea.innerHTML = `
        <div class="container">
            <div class="page-header">
                <h1 class="page-title">Anwendungsfälle</h1>
                <p class="page-lead">BIM-Anwendungsfälle für Planung, Koordination, Kostenmanagement und Betrieb.</p>
            </div>
            <div class="gallery-filter-container">
                <div class="gallery-filter-left">
                    <div class="gallery-filter-wrapper">
                        <input type="text" id="usecasesSearchInput" class="gallery-filter-input" placeholder="Suche nach Anwendungsfällen...">
                        <button type="button" class="search-clear-btn" id="usecasesSearchClear" aria-label="Suche löschen"><i data-lucide="x" aria-hidden="true"></i></button>
                        <button class="gallery-filter-btn" aria-label="Suchen"><i data-lucide="search" aria-hidden="true"></i></button>
                    </div>
                    ${renderFilterButton('usecases', usecasesFilterVisible, activeFiltersCount)}
                </div>
                <div class="view-switcher toolbar-control">
                    <button class="view-btn ${listActive}" onclick="switchView('list')" aria-label="Listenansicht"><i data-lucide="list" aria-hidden="true"></i></button>
                    <button class="view-btn ${gridActive}" onclick="switchView('grid')" aria-label="Rasteransicht"><i data-lucide="layout-grid" aria-hidden="true"></i></button>
                </div>
            </div>

            ${renderFilterBar({
                data: globalUsecasesData,
                activeTags: activeTags,
                activeCategory: activeCategory,
                activePhases: activePhases,
                showPhases: true,
                filterPanelClass: filterPanelClass
            })}

            <div id="usecasesContent" class="catalog-content">
                ${currentView === 'grid'
                    ? `<div class="element-grid">${renderUsecasesGridItemsHTML(filteredData, activeTags, activeCategory)}</div>`
                    : renderUsecasesListItemsHTML(filteredData, activeTags, activeCategory)
                }
            </div>
        </div>`;

    const searchInput = document.getElementById('usecasesSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            let searchFilteredData = filterDataByCategory(globalUsecasesData, activeCategory);
            searchFilteredData = filterDataByTags(searchFilteredData, activeTags);
            searchFilteredData = filterDataByPhases(searchFilteredData, activePhases);
            searchFilteredData = searchFilteredData.filter(item =>
                (item.title && item.title.toLowerCase().includes(searchTerm)) ||
                (item.category && item.category.toLowerCase().includes(searchTerm)) ||
                (item.description && item.description.toLowerCase().includes(searchTerm))
            );
            const container = document.getElementById('usecasesContent');
            container.innerHTML = (getActiveViewFromURL() === 'grid')
                ? `<div class="element-grid">${renderUsecasesGridItemsHTML(searchFilteredData, activeTags, activeCategory)}</div>`
                : renderUsecasesListItemsHTML(searchFilteredData, activeTags, activeCategory);
        });
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    setupSearchClearButton('usecasesSearchInput', 'usecasesSearchClear');
}

function renderModelsCatalogPage(activeTags = [], activeCategory = '') {
    let filteredData = filterDataByCategory(globalModelsData, activeCategory);
    filteredData = filterDataByTags(filteredData, activeTags);

    const filterPanelClass = modelsFilterVisible ? '' : 'closed';
    const currentView = getActiveViewFromURL();
    const gridActive = currentView === 'grid' ? 'active' : '';
    const listActive = currentView === 'list' ? 'active' : '';
    const activeFiltersCount = activeTags.length + (activeCategory ? 1 : 0);

    contentArea.innerHTML = `
        <div class="container">
            <div class="page-header">
                <h1 class="page-title">Fachmodelle</h1>
                <p class="page-lead">Domänenspezifische BIM-Modelle für Architektur, Tragwerk, Haustechnik und weitere Fachbereiche.</p>
            </div>
            <div class="gallery-filter-container">
                <div class="gallery-filter-left">
                    <div class="gallery-filter-wrapper">
                        <input type="text" id="modelsSearchInput" class="gallery-filter-input" placeholder="Suche nach Fachmodellen...">
                        <button type="button" class="search-clear-btn" id="modelsSearchClear" aria-label="Suche löschen"><i data-lucide="x" aria-hidden="true"></i></button>
                        <button class="gallery-filter-btn" aria-label="Suchen"><i data-lucide="search" aria-hidden="true"></i></button>
                    </div>
                    ${renderFilterButton('models', modelsFilterVisible, activeFiltersCount)}
                </div>
                <div class="view-switcher toolbar-control">
                    <button class="view-btn ${listActive}" onclick="switchView('list')" aria-label="Listenansicht"><i data-lucide="list" aria-hidden="true"></i></button>
                    <button class="view-btn ${gridActive}" onclick="switchView('grid')" aria-label="Rasteransicht"><i data-lucide="layout-grid" aria-hidden="true"></i></button>
                </div>
            </div>

            ${renderFilterBar({
                data: globalModelsData,
                activeTags: activeTags,
                activeCategory: activeCategory,
                filterPanelClass: filterPanelClass
            })}

            <div id="modelsContent" class="catalog-content">
                ${currentView === 'grid'
                    ? `<div class="element-grid">${renderModelsGridItemsHTML(filteredData, activeTags, activeCategory)}</div>`
                    : renderModelsListItemsHTML(filteredData, activeTags, activeCategory)
                }
            </div>
        </div>`;

    const searchInput = document.getElementById('modelsSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            let searchFilteredData = filterDataByCategory(globalModelsData, activeCategory);
            searchFilteredData = filterDataByTags(searchFilteredData, activeTags);
            searchFilteredData = searchFilteredData.filter(item =>
                (item.title && item.title.toLowerCase().includes(searchTerm)) ||
                (item.category && item.category.toLowerCase().includes(searchTerm)) ||
                (item.description && item.description.toLowerCase().includes(searchTerm))
            );
            const container = document.getElementById('modelsContent');
            container.innerHTML = (getActiveViewFromURL() === 'grid')
                ? `<div class="element-grid">${renderModelsGridItemsHTML(searchFilteredData, activeTags, activeCategory)}</div>`
                : renderModelsListItemsHTML(searchFilteredData, activeTags, activeCategory);
        });
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    setupSearchClearButton('modelsSearchInput', 'modelsSearchClear');
}

function renderEpdsCatalogPage(activeTags = [], activeCategory = '') {
    let filteredData = filterDataByCategory(globalEpdsData, activeCategory);
    filteredData = filterDataByTags(filteredData, activeTags);

    const filterPanelClass = epdsFilterVisible ? '' : 'closed';
    const currentView = getActiveViewFromURL();
    const gridActive = currentView === 'grid' ? 'active' : '';
    const listActive = currentView === 'list' ? 'active' : '';
    const activeFiltersCount = activeTags.length + (activeCategory ? 1 : 0);

    contentArea.innerHTML = `
        <div class="container">
            <div class="page-header">
                <h1 class="page-title">Ökobilanzdaten</h1>
                <p class="page-lead">Umweltproduktdeklarationen (EPD) und Ökobilanzkennwerte für Baumaterialien und Gebäudetechnik.</p>
            </div>
            <div class="gallery-filter-container">
                <div class="gallery-filter-left">
                    <div class="gallery-filter-wrapper">
                        <input type="text" id="epdsSearchInput" class="gallery-filter-input" placeholder="Suche nach Ökobilanzdaten...">
                        <button type="button" class="search-clear-btn" id="epdsSearchClear" aria-label="Suche löschen"><i data-lucide="x" aria-hidden="true"></i></button>
                        <button class="gallery-filter-btn" aria-label="Suchen"><i data-lucide="search" aria-hidden="true"></i></button>
                    </div>
                    ${renderFilterButton('epds', epdsFilterVisible, activeFiltersCount)}
                </div>
                <div class="view-switcher toolbar-control">
                    <button class="view-btn ${listActive}" onclick="switchView('list')" aria-label="Listenansicht"><i data-lucide="list" aria-hidden="true"></i></button>
                    <button class="view-btn ${gridActive}" onclick="switchView('grid')" aria-label="Rasteransicht"><i data-lucide="layout-grid" aria-hidden="true"></i></button>
                </div>
            </div>

            ${renderFilterBar({
                data: globalEpdsData,
                activeTags: activeTags,
                activeCategory: activeCategory,
                filterPanelClass: filterPanelClass
            })}

            <div id="epdsContent" class="catalog-content">
                ${currentView === 'grid'
                    ? `<div class="element-grid">${renderEpdsGridItemsHTML(filteredData, activeTags, activeCategory)}</div>`
                    : renderEpdsListItemsHTML(filteredData, activeTags, activeCategory)
                }
            </div>
        </div>`;

    const searchInput = document.getElementById('epdsSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            let searchFilteredData = filterDataByCategory(globalEpdsData, activeCategory);
            searchFilteredData = filterDataByTags(searchFilteredData, activeTags);
            searchFilteredData = searchFilteredData.filter(item =>
                (item.title && item.title.toLowerCase().includes(searchTerm)) ||
                (item.category && item.category.toLowerCase().includes(searchTerm)) ||
                (item.description && item.description.toLowerCase().includes(searchTerm))
            );
            const container = document.getElementById('epdsContent');
            container.innerHTML = (getActiveViewFromURL() === 'grid')
                ? `<div class="element-grid">${renderEpdsGridItemsHTML(searchFilteredData, activeTags, activeCategory)}</div>`
                : renderEpdsListItemsHTML(searchFilteredData, activeTags, activeCategory);
        });
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    setupSearchClearButton('epdsSearchInput', 'epdsSearchClear');
}

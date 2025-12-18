/**
 * KBOB Fachdatenkatalog - Item Renderers
 * Consolidated grid and list renderers for all data types
 */

// ============================================
// CATALOG TYPE CONFIGURATION
// ============================================

/**
 * Configuration for each catalog type
 * Used by generic render functions to generate type-specific output
 */
const catalogTypeConfig = {
    elements: {
        routePrefix: 'element',
        cardIdPrefix: 'element',
        icon: 'image',
        subtitleField: 'classification', // fallback field for subtitle
        searchFields: ['title', 'classification'],
        getData: () => globalElementsData,
        getFilterVisible: () => elementsFilterVisible,
        setFilterVisible: (val) => { elementsFilterVisible = val; }
    },
    documents: {
        routePrefix: 'document',
        cardIdPrefix: 'document',
        icon: 'file-text',
        subtitleField: 'category',
        searchFields: ['title', 'category', 'description'],
        getData: () => globalDocumentsData,
        getFilterVisible: () => documentsFilterVisible,
        setFilterVisible: (val) => { documentsFilterVisible = val; }
    },
    usecases: {
        routePrefix: 'usecase',
        cardIdPrefix: 'usecase',
        icon: 'workflow',
        subtitleField: 'category',
        searchFields: ['title', 'category', 'description'],
        getData: () => globalUsecasesData,
        getFilterVisible: () => usecasesFilterVisible,
        setFilterVisible: (val) => { usecasesFilterVisible = val; },
        hasPhases: true
    },
    models: {
        routePrefix: 'model',
        cardIdPrefix: 'model',
        icon: 'boxes',
        subtitleField: 'category',
        searchFields: ['title', 'category', 'description'],
        getData: () => globalModelsData,
        getFilterVisible: () => modelsFilterVisible,
        setFilterVisible: (val) => { modelsFilterVisible = val; }
    },
    epds: {
        routePrefix: 'epd',
        cardIdPrefix: 'epd',
        icon: 'leaf',
        subtitleField: 'category',
        searchFields: ['title', 'category', 'description'],
        getData: () => globalEpdsData,
        getFilterVisible: () => epdsFilterVisible,
        setFilterVisible: (val) => { epdsFilterVisible = val; }
    }
};

// ============================================
// TAG RENDERING HELPERS
// ============================================

/**
 * Render tags HTML for full view
 */
function renderTagsHtml(tagsData, activeTags = []) {
    if (!tagsData || !Array.isArray(tagsData)) return '';
    return tagsData.map(tag => {
        const safeTag = escapeHtml(tag);
        const isActive = activeTags.includes(tag);
        const activeClass = isActive ? 'active' : '';
        return `<span class="tag-badge ${activeClass}" onclick="event.stopPropagation(); toggleTagInURL('${safeTag}')" title="Filter: ${safeTag}">${safeTag}</span>`;
    }).join('');
}

/**
 * Toggle card tags expanded state
 * @param {Event} event - Click event
 * @param {string} cardId - Card identifier
 */
window.toggleCardTags = function(event, cardId) {
    event.stopPropagation();
    if (expandedCardTags.has(cardId)) {
        expandedCardTags.delete(cardId);
    } else {
        expandedCardTags.add(cardId);
    }
    const tagsContainer = document.querySelector(`[data-card-id="${cardId}"] .card__tags`);
    if (tagsContainer) {
        const tagsData = JSON.parse(tagsContainer.dataset.tags || '[]');
        const activeTags = getActiveTagsFromURL();
        tagsContainer.innerHTML = renderCardTagsHtml(cardId, tagsData, activeTags);
    }
};

/**
 * Render tags for card with +N / - toggle (max 2 visible by default)
 */
function renderCardTagsHtml(cardId, tagsData, activeTags = []) {
    if (!tagsData || !Array.isArray(tagsData) || tagsData.length === 0) return '';

    const maxVisible = 2;
    const isExpanded = expandedCardTags.has(cardId);
    const hiddenCount = tagsData.length - maxVisible;

    const renderTag = (tag) => {
        const safeTag = escapeHtml(tag);
        const isActive = activeTags.includes(tag);
        const activeClass = isActive ? 'active' : '';
        return `<span class="tag-badge ${activeClass}" onclick="event.stopPropagation(); toggleTagInURL('${safeTag}')" title="Filter: ${safeTag}">${safeTag}</span>`;
    };

    if (tagsData.length <= maxVisible || isExpanded) {
        const tagsHtml = tagsData.map(renderTag).join('');
        if (isExpanded && tagsData.length > maxVisible) {
            return tagsHtml + `<span class="tag-badge tag-badge--count" onclick="toggleCardTags(event, '${escapeHtml(cardId)}')" title="Weniger anzeigen">−</span>`;
        }
        return tagsHtml;
    }

    const visibleTags = tagsData.slice(0, maxVisible);
    const tagsHtml = visibleTags.map(renderTag).join('');
    return tagsHtml + `<span class="tag-badge tag-badge--count" onclick="toggleCardTags(event, '${escapeHtml(cardId)}')" title="${hiddenCount} weitere Tags anzeigen">+${hiddenCount}</span>`;
}

// ============================================
// UTILITY RENDERERS
// ============================================

/**
 * Render no results message
 */
function renderNoResults(hasActiveTags) {
    if (hasActiveTags) {
        return `
            <div class="no-results">
                <h3>Keine Ergebnisse gefunden</h3>
                <p>Die aktiven Filter ergeben keine Treffer.</p>
                <p><span class="clear-filter-link" onclick="clearAllTagsFromURL()">Filter zurücksetzen</span></p>
            </div>
        `;
    }
    return '<div class="no-results">Keine Elemente gefunden.</div>';
}

/**
 * Render phase badges
 */
function renderPhaseBadges(phases) {
    if (!phases || !Array.isArray(phases)) return '<span class="empty-text">-</span>';
    const allPhases = Object.keys(phaseLabels).map(Number).sort((a, b) => a - b);
    let badgesHtml = '<div class="phase-compact-wrapper">';
    allPhases.forEach(phase => {
        const statusClass = phases.includes(phase) ? 'active' : 'inactive';
        badgesHtml += `<div class="phase-badge ${statusClass}" title="${phaseLabels[phase] || 'Phase ' + phase}">${phase}</div>`;
    });
    badgesHtml += '</div>';
    return badgesHtml;
}

/**
 * Refresh Lucide icons (utility to avoid repetition)
 */
function refreshIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ============================================
// GENERIC GRID RENDERER
// ============================================

/**
 * Generic grid renderer for all catalog types
 * @param {string} type - Catalog type key (elements, documents, usecases, models, epds)
 * @param {Array} items - Array of data items
 * @param {string[]} activeTags - Currently active tags
 * @param {string} activeCategory - Currently active category
 * @returns {string} HTML string
 */
function renderGenericGridItems(type, items, activeTags = [], activeCategory = '') {
    if (!items || items.length === 0) return renderNoResults(activeTags.length > 0 || activeCategory);

    const config = catalogTypeConfig[type];
    if (!config) return renderNoResults(false);

    return items.map(item => {
        const hasTags = item.tags && Array.isArray(item.tags) && item.tags.length > 0;
        const cardId = `${config.cardIdPrefix}-${escapeHtml(item.id || '')}`;
        const isCategoryActive = activeCategory === item.category;
        const safeTitle = escapeHtml(item.title || '');
        const safeCategory = escapeHtml(item.category || '');
        const safeSubtitle = escapeHtml(item.description || item[config.subtitleField] || '');

        return `
        <article class="card" data-card-id="${cardId}" onclick="window.location.hash='${buildHashWithTags(config.routePrefix + '/' + item.id, activeTags, activeCategory)}'">
            <div class="card__image">
                ${item.category ? `<span class="tag-badge ${isCategoryActive ? 'active' : ''}" onclick="event.stopPropagation(); toggleCategoryInURL('${safeCategory}')">${safeCategory}</span>` : ''}
                ${item.image ? `<img src="${escapeHtml(item.image)}" alt="${safeTitle}">` : `<i data-lucide="${config.icon}" class="placeholder-icon icon--xl" aria-hidden="true"></i>`}
            </div>
            <div class="card__body">
                <h3 class="card__title">${safeTitle}</h3>
                <p class="card__subtitle">${safeSubtitle}</p>
                ${hasTags ? `<div class="card__tags" data-tags='${JSON.stringify(item.tags)}'>${renderCardTagsHtml(cardId, item.tags, activeTags)}</div>` : ''}
            </div>
            <footer class="card__footer card__footer--end">
                <span class="arrow-btn card__arrow-btn" aria-label="Details anzeigen">${arrowSvg}</span>
            </footer>
        </article>
    `}).join('');
}

// ============================================
// GENERIC LIST RENDERER
// ============================================

/**
 * Generic list renderer for all catalog types
 * @param {string} type - Catalog type key
 * @param {Array} items - Array of data items
 * @param {string[]} activeTags - Currently active tags
 * @param {string} activeCategory - Currently active category
 * @returns {string} HTML string
 */
function renderGenericListItems(type, items, activeTags = [], activeCategory = '') {
    if (!items || items.length === 0) return renderNoResults(activeTags.length > 0 || activeCategory);

    const config = catalogTypeConfig[type];
    if (!config) return renderNoResults(false);

    const headerHtml = `
        <div class="list-header-row">
            <div class="list-col-name">Name</div>
            <div class="list-col-desc">Beschreibung</div>
            <div class="list-col-tags">Tags</div>
        </div>
    `;

    const itemsHtml = items.map(item => {
        const safeTitle = escapeHtml(item.title || '');
        const safeSubtitle = escapeHtml(item.description || item[config.subtitleField] || '');
        return `
        <div class="element-list-item" onclick="window.location.hash='${buildHashWithTags(config.routePrefix + '/' + item.id, activeTags, activeCategory)}'">
            <div class="list-col-name">${safeTitle}</div>
            <div class="list-col-desc">${safeSubtitle}</div>
            <div class="list-col-tags">${renderTagsHtml(item.tags, activeTags)}</div>
        </div>
    `}).join('');

    return `<div class="element-list-container">${headerHtml}${itemsHtml}</div>`;
}

// ============================================
// BACKWARD COMPATIBLE WRAPPERS
// These maintain the original function names for compatibility
// ============================================

function renderGridItemsHTML(items, activeTags = [], activeCategory = '') {
    return renderGenericGridItems('elements', items, activeTags, activeCategory);
}

function renderListItemsHTML(items, activeTags = [], activeCategory = '') {
    return renderGenericListItems('elements', items, activeTags, activeCategory);
}

function renderDocGridItemsHTML(items, activeTags = [], activeCategory = '') {
    return renderGenericGridItems('documents', items, activeTags, activeCategory);
}

function renderDocListItemsHTML(items, activeTags = [], activeCategory = '') {
    return renderGenericListItems('documents', items, activeTags, activeCategory);
}

function renderUsecasesGridItemsHTML(items, activeTags = [], activeCategory = '') {
    return renderGenericGridItems('usecases', items, activeTags, activeCategory);
}

function renderUsecasesListItemsHTML(items, activeTags = [], activeCategory = '') {
    return renderGenericListItems('usecases', items, activeTags, activeCategory);
}

function renderModelsGridItemsHTML(items, activeTags = [], activeCategory = '') {
    return renderGenericGridItems('models', items, activeTags, activeCategory);
}

function renderModelsListItemsHTML(items, activeTags = [], activeCategory = '') {
    return renderGenericListItems('models', items, activeTags, activeCategory);
}

function renderEpdsGridItemsHTML(items, activeTags = [], activeCategory = '') {
    return renderGenericGridItems('epds', items, activeTags, activeCategory);
}

function renderEpdsListItemsHTML(items, activeTags = [], activeCategory = '') {
    return renderGenericListItems('epds', items, activeTags, activeCategory);
}

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
        return `<span class="tag-badge ${activeClass}" data-action="toggle-tag" data-tag="${safeTag}" title="Filter: ${safeTag}">${safeTag}</span>`;
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
        // After toggling, fit tags if collapsed
        if (!expandedCardTags.has(cardId)) {
            fitCardTagsToSingleRow(tagsContainer);
        }
    }
};

/**
 * Render tags for card with +N / - toggle
 * In collapsed mode, renders all tags initially for measurement, then fitCardTagsToSingleRow hides overflow
 */
function renderCardTagsHtml(cardId, tagsData, activeTags = []) {
    if (!tagsData || !Array.isArray(tagsData) || tagsData.length === 0) return '';

    const isExpanded = expandedCardTags.has(cardId);

    const renderTag = (tag, index) => {
        const safeTag = escapeHtml(tag);
        const isActive = activeTags.includes(tag);
        const activeClass = isActive ? 'active' : '';
        return `<span class="tag-badge ${activeClass}" data-tag-index="${index}" data-action="toggle-tag" data-tag="${safeTag}" title="Filter: ${safeTag}">${safeTag}</span>`;
    };

    const tagsHtml = tagsData.map((tag, index) => renderTag(tag, index)).join('');
    const safeCardId = escapeHtml(cardId);

    if (isExpanded) {
        // Expanded: show all tags + collapse button
        return tagsHtml + `<span class="tag-badge tag-badge--count" data-action="toggle-card-tags" data-card-id="${safeCardId}" title="Weniger anzeigen">−</span>`;
    }

    // Collapsed: render all tags + count badge placeholder (will be adjusted by fitCardTagsToSingleRow)
    return tagsHtml + `<span class="tag-badge tag-badge--count" data-count-badge data-action="toggle-card-tags" data-card-id="${safeCardId}" title="Mehr anzeigen">+${tagsData.length}</span>`;
}

/**
 * Fit card tags to a single row by hiding overflow tags
 * @param {HTMLElement} container - The .card__tags container element
 */
function fitCardTagsToSingleRow(container) {
    if (!container) return;

    const tags = container.querySelectorAll('.tag-badge:not(.tag-badge--count)');
    const countBadge = container.querySelector('.tag-badge--count');

    if (tags.length === 0) return;

    // Reset all tags to visible for measurement
    tags.forEach(tag => tag.classList.remove('tag-badge--hidden'));
    if (countBadge) countBadge.classList.remove('tag-badge--hidden');

    // Get the baseline top position from the first tag
    const firstTagTop = tags[0].offsetTop;

    // Find which tags overflow to a second row
    let hiddenCount = 0;
    let firstOverflowIndex = -1;

    // First pass: find where overflow starts (without count badge interfering)
    if (countBadge) countBadge.classList.add('tag-badge--hidden');

    for (let i = 0; i < tags.length; i++) {
        if (tags[i].offsetTop > firstTagTop) {
            firstOverflowIndex = i;
            break;
        }
    }

    if (firstOverflowIndex === -1) {
        // All tags fit in one row, hide count badge
        if (countBadge) countBadge.classList.add('tag-badge--hidden');
        return;
    }

    // Show count badge and re-measure (it might push earlier tags to overflow)
    if (countBadge) countBadge.classList.remove('tag-badge--hidden');

    // Hide tags from the overflow point onward
    for (let i = firstOverflowIndex; i < tags.length; i++) {
        tags[i].classList.add('tag-badge--hidden');
        hiddenCount++;
    }

    // Re-check if count badge causes earlier tags to overflow
    // Iterate backwards from firstOverflowIndex to find the stable fit
    for (let i = firstOverflowIndex - 1; i >= 0; i--) {
        // Check if count badge is now on a second row
        if (countBadge && countBadge.offsetTop > firstTagTop) {
            tags[i].classList.add('tag-badge--hidden');
            hiddenCount++;
        } else {
            break;
        }
    }

    // Update count badge text
    if (countBadge) {
        if (hiddenCount > 0) {
            countBadge.textContent = `+${hiddenCount}`;
            countBadge.title = `${hiddenCount} weitere Tags anzeigen`;
            countBadge.classList.remove('tag-badge--hidden');
        } else {
            countBadge.classList.add('tag-badge--hidden');
        }
    }
}

/**
 * Fit all card tags on the page to single rows
 * Call this after rendering cards or on window resize
 */
window.fitAllCardTagsToSingleRow = function() {
    document.querySelectorAll('.card__tags').forEach(container => {
        const cardEl = container.closest('[data-card-id]');
        if (cardEl) {
            const cardId = cardEl.dataset.cardId;
            // Only fit collapsed cards
            if (!expandedCardTags.has(cardId)) {
                fitCardTagsToSingleRow(container);
            }
        }
    });
};

// Debounced resize handler for fitting card tags
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (typeof fitAllCardTagsToSingleRow === 'function') {
            fitAllCardTagsToSingleRow();
        }
    }, 150);
});

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
                <p><span class="clear-filter-link" data-action="clear-tags">Filter zurücksetzen</span></p>
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
 * Refresh Lucide icons with optional scoping for performance
 * Skips the call entirely if no unprocessed icons exist in the scope
 * @param {HTMLElement} container - Optional container to scope icon check (defaults to document)
 */
function refreshIcons(container = null) {
    if (typeof lucide !== 'undefined') {
        const scope = container instanceof HTMLElement ? container : document;
        // Only call createIcons if there are unprocessed icons (data-lucide still present)
        const unprocessedIcons = scope.querySelectorAll('[data-lucide]');
        if (unprocessedIcons.length > 0) {
            lucide.createIcons();
        }
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
        const cardHref = buildHashWithTags(config.routePrefix + '/' + item.id, activeTags, activeCategory);

        return `
        <article class="card" data-card-id="${cardId}" data-href="${cardHref}">
            <div class="card__image">
                ${item.category ? `<span class="tag-badge ${isCategoryActive ? 'active' : ''}" data-action="toggle-category" data-category="${safeCategory}">${safeCategory}</span>` : ''}
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
        const itemHref = buildHashWithTags(config.routePrefix + '/' + item.id, activeTags, activeCategory);
        return `
        <div class="element-list-item" data-href="${itemHref}">
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

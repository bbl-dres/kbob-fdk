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
        getData: () => globalElementsData,
        getFilterVisible: () => elementsFilterVisible,
        setFilterVisible: (val) => { elementsFilterVisible = val; },
        searchFields: ['name', 'domain', 'description']
    },
    documents: {
        routePrefix: 'document',
        cardIdPrefix: 'document',
        icon: 'file-text',
        getData: () => globalDocumentsData,
        getFilterVisible: () => documentsFilterVisible,
        setFilterVisible: (val) => { documentsFilterVisible = val; },
        searchFields: ['name', 'domain', 'description']
    },
    usecases: {
        routePrefix: 'usecase',
        cardIdPrefix: 'usecase',
        icon: 'workflow',
        getData: () => globalUsecasesData,
        getFilterVisible: () => usecasesFilterVisible,
        setFilterVisible: (val) => { usecasesFilterVisible = val; },
        hasPhases: true,
        searchFields: ['name', 'domain', 'description']
    },
    models: {
        routePrefix: 'model',
        cardIdPrefix: 'model',
        icon: 'boxes',
        getData: () => globalModelsData,
        getFilterVisible: () => modelsFilterVisible,
        setFilterVisible: (val) => { modelsFilterVisible = val; },
        searchFields: ['name', 'domain', 'description']
    },
    epds: {
        routePrefix: 'epd',
        cardIdPrefix: 'epd',
        icon: 'leaf',
        getData: () => globalEpdsData,
        getFilterVisible: () => epdsFilterVisible,
        setFilterVisible: (val) => { epdsFilterVisible = val; },
        searchFields: ['name', 'domain', 'description']
    }
};

// ============================================
// TAG RENDERING HELPERS
// ============================================

/**
 * Render tags HTML for full view
 * @param {Array} relatedTags - Array of {id: "tag-id"} objects (related_tags format)
 * @param {string[]} activeTags - Array of active tag strings
 * @returns {string} HTML string
 */
function renderTagsHtml(relatedTags, activeTags = []) {
    if (!relatedTags || !Array.isArray(relatedTags)) return '';
    const localizedTags = resolveTagsToStrings(relatedTags);
    return localizedTags.map(tag => {
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
 * @param {string} cardId - Card identifier
 * @param {Array} relatedTags - Array of {id: "tag-id"} objects (related_tags format)
 * @param {string[]} activeTags - Array of active tag strings
 * @returns {string} HTML string
 */
function renderCardTagsHtml(cardId, relatedTags, activeTags = []) {
    if (!relatedTags || !Array.isArray(relatedTags) || relatedTags.length === 0) return '';

    const isExpanded = expandedCardTags.has(cardId);
    const localizedTags = resolveTagsToStrings(relatedTags);

    const renderTag = (tag, index) => {
        const safeTag = escapeHtml(tag);
        const isActive = activeTags.includes(tag);
        const activeClass = isActive ? 'active' : '';
        return `<span class="tag-badge ${activeClass}" data-tag-index="${index}" data-action="toggle-tag" data-tag="${safeTag}" title="Filter: ${safeTag}">${safeTag}</span>`;
    };

    const tagsHtml = localizedTags.map((tag, index) => renderTag(tag, index)).join('');
    const safeCardId = escapeHtml(cardId);

    if (isExpanded) {
        // Expanded: show all tags + collapse button
        return tagsHtml + `<span class="tag-badge tag-badge--count" data-action="toggle-card-tags" data-card-id="${safeCardId}" title="Weniger anzeigen">−</span>`;
    }

    // Collapsed: render all tags + count badge placeholder (will be adjusted by fitCardTagsToSingleRow)
    return tagsHtml + `<span class="tag-badge tag-badge--count" data-count-badge data-action="toggle-card-tags" data-card-id="${safeCardId}" title="Mehr anzeigen">+${localizedTags.length}</span>`;
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
        const hasTags = item.related_tags && Array.isArray(item.related_tags) && item.related_tags.length > 0;
        const cardId = `${config.cardIdPrefix}-${escapeHtml(item.id || '')}`;
        const itemCategory = t(item.domain);
        const isCategoryActive = activeCategory === itemCategory;
        const safeTitle = escapeHtml(t(item.name));
        const safeCategory = escapeHtml(itemCategory || '');
        const safeSubtitle = escapeHtml(t(item.description) || '');
        const cardHref = buildHashWithTags(config.routePrefix + '/' + item.id, activeTags, activeCategory);
        // Store related_tags as JSON for re-rendering (contains {id: "..."} objects)
        const tagsForJson = hasTags ? escapeHtml(JSON.stringify(item.related_tags)) : '[]';

        return `
        <article class="card" data-card-id="${cardId}" data-href="${cardHref}">
            <div class="card__image">
                ${itemCategory ? `<span class="tag-badge ${isCategoryActive ? 'active' : ''}" data-action="toggle-category" data-category="${safeCategory}">${safeCategory}</span>` : ''}
                ${item.image ? `<img src="${escapeHtml(item.image)}" alt="${safeTitle}">` : `<i data-lucide="${config.icon}" class="placeholder-icon icon--xl" aria-hidden="true"></i>`}
            </div>
            <div class="card__body">
                <h3 class="card__title">${safeTitle}</h3>
                <p class="card__subtitle">${safeSubtitle}</p>
                ${hasTags ? `<div class="card__tags" data-tags='${tagsForJson}'>${renderCardTagsHtml(cardId, item.related_tags, activeTags)}</div>` : ''}
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
        const safeTitle = escapeHtml(t(item.name));
        const safeSubtitle = escapeHtml(t(item.description) || '');
        const itemHref = buildHashWithTags(config.routePrefix + '/' + item.id, activeTags, activeCategory);
        return `
        <div class="element-list-item" data-href="${itemHref}">
            <div class="list-col-name">${safeTitle}</div>
            <div class="list-col-desc">${safeSubtitle}</div>
            <div class="list-col-tags">${renderTagsHtml(item.related_tags, activeTags)}</div>
        </div>
    `}).join('');

    return `<div class="element-list-container">${headerHtml}${itemsHtml}</div>`;
}

// ============================================
// TYPE-SPECIFIC RENDER WRAPPERS
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

// ============================================
// LAZY LOADING COMPONENTS
// ============================================

/**
 * Render loading sentinel element for infinite scroll
 * This invisible element triggers loading when it comes into view
 * @param {string} type - Catalog type key
 * @returns {string} HTML string
 */
function renderLoadingSentinel(type) {
    const safeType = escapeHtml(type);
    return `
        <div class="lazy-load-sentinel" data-type="${safeType}">
            <div class="lazy-load-indicator">
                <i data-lucide="loader" class="loading-spinner" aria-hidden="true"></i>
                <span>Weitere Einträge werden geladen...</span>
            </div>
        </div>
    `;
}

/**
 * Render "end of results" indicator
 * Shown when all items have been loaded
 * @param {number} loadedCount - Number of items loaded
 * @param {number} totalCount - Total number of items
 * @returns {string} HTML string
 */
function renderEndOfResults(loadedCount, totalCount) {
    return `
        <div class="lazy-load-end">
            <span>${loadedCount} von ${totalCount} Einträgen</span>
        </div>
    `;
}

/**
 * Render a single grid card (extracted for reuse in lazy loading)
 * @param {string} type - Catalog type key
 * @param {Object} item - Data item
 * @param {string[]} activeTags - Currently active tags
 * @param {string} activeCategory - Currently active category
 * @returns {string} HTML string
 */
function renderSingleGridItem(type, item, activeTags = [], activeCategory = '') {
    const config = catalogTypeConfig[type];
    if (!config) return '';

    const hasTags = item.related_tags && Array.isArray(item.related_tags) && item.related_tags.length > 0;
    const cardId = `${config.cardIdPrefix}-${escapeHtml(item.id || '')}`;
    const itemCategory = t(item.domain);
    const isCategoryActive = activeCategory === itemCategory;
    const safeTitle = escapeHtml(t(item.name));
    const safeCategory = escapeHtml(itemCategory || '');
    const safeSubtitle = escapeHtml(t(item.description) || '');
    const cardHref = buildHashWithTags(config.routePrefix + '/' + item.id, activeTags, activeCategory);
    const tagsForJson = hasTags ? escapeHtml(JSON.stringify(item.related_tags)) : '[]';

    return `
        <article class="card" data-card-id="${cardId}" data-href="${cardHref}">
            <div class="card__image">
                ${itemCategory ? `<span class="tag-badge ${isCategoryActive ? 'active' : ''}" data-action="toggle-category" data-category="${safeCategory}">${safeCategory}</span>` : ''}
                ${item.image ? `<img src="${escapeHtml(item.image)}" alt="${safeTitle}">` : `<i data-lucide="${config.icon}" class="placeholder-icon icon--xl" aria-hidden="true"></i>`}
            </div>
            <div class="card__body">
                <h3 class="card__title">${safeTitle}</h3>
                <p class="card__subtitle">${safeSubtitle}</p>
                ${hasTags ? `<div class="card__tags" data-tags='${tagsForJson}'>${renderCardTagsHtml(cardId, item.related_tags, activeTags)}</div>` : ''}
            </div>
            <footer class="card__footer card__footer--end">
                <span class="arrow-btn card__arrow-btn" aria-label="Details anzeigen">${arrowSvg}</span>
            </footer>
        </article>
    `;
}

/**
 * Render a single list row (extracted for reuse in lazy loading)
 * @param {string} type - Catalog type key
 * @param {Object} item - Data item
 * @param {string[]} activeTags - Currently active tags
 * @param {string} activeCategory - Currently active category
 * @returns {string} HTML string
 */
function renderSingleListItem(type, item, activeTags = [], activeCategory = '') {
    const config = catalogTypeConfig[type];
    if (!config) return '';

    const safeTitle = escapeHtml(t(item.name));
    const safeSubtitle = escapeHtml(t(item.description) || '');
    const itemHref = buildHashWithTags(config.routePrefix + '/' + item.id, activeTags, activeCategory);

    return `
        <div class="element-list-item" data-href="${itemHref}">
            <div class="list-col-name">${safeTitle}</div>
            <div class="list-col-desc">${safeSubtitle}</div>
            <div class="list-col-tags">${renderTagsHtml(item.related_tags, activeTags)}</div>
        </div>
    `;
}

/**
 * Append grid items to existing container (for lazy loading)
 * Uses DocumentFragment for better performance
 * @param {string} type - Catalog type key
 * @param {HTMLElement} container - Container element (#catalogContent etc.)
 * @param {Array} items - Array of items to append
 * @param {string[]} activeTags - Currently active tags
 * @param {string} activeCategory - Currently active category
 */
function appendGridItems(type, container, items, activeTags, activeCategory) {
    const config = catalogTypeConfig[type];
    if (!config || !items.length) return;

    // Find the grid element within the container
    const grid = container.querySelector('.element-grid');
    if (!grid) return;

    // Remove existing sentinel
    const existingSentinel = grid.querySelector('.lazy-load-sentinel');
    if (existingSentinel) {
        existingSentinel.remove();
    }

    // Remove existing end message
    const existingEnd = grid.querySelector('.lazy-load-end');
    if (existingEnd) {
        existingEnd.remove();
    }

    // Create fragment for better performance
    const fragment = document.createDocumentFragment();
    const tempDiv = document.createElement('div');

    items.forEach(item => {
        const cardHtml = renderSingleGridItem(type, item, activeTags, activeCategory);
        tempDiv.innerHTML = cardHtml;
        while (tempDiv.firstChild) {
            fragment.appendChild(tempDiv.firstChild);
        }
    });

    grid.appendChild(fragment);

    // Refresh icons for new items
    refreshIcons(grid);

    // Fit card tags for new items
    if (typeof fitAllCardTagsToSingleRow === 'function') {
        fitAllCardTagsToSingleRow();
    }
}

/**
 * Append list items to existing container (for lazy loading)
 * Uses DocumentFragment for better performance
 * @param {string} type - Catalog type key
 * @param {HTMLElement} container - Container element (#catalogContent etc.)
 * @param {Array} items - Array of items to append
 * @param {string[]} activeTags - Currently active tags
 * @param {string} activeCategory - Currently active category
 */
function appendListItems(type, container, items, activeTags, activeCategory) {
    const config = catalogTypeConfig[type];
    if (!config || !items.length) return;

    const listContainer = container.querySelector('.element-list-container');
    if (!listContainer) return;

    // Remove existing sentinel
    const existingSentinel = listContainer.querySelector('.lazy-load-sentinel');
    if (existingSentinel) {
        existingSentinel.remove();
    }

    // Remove existing end message
    const existingEnd = listContainer.querySelector('.lazy-load-end');
    if (existingEnd) {
        existingEnd.remove();
    }

    // Create fragment for better performance
    const fragment = document.createDocumentFragment();
    const tempDiv = document.createElement('div');

    items.forEach(item => {
        const itemHtml = renderSingleListItem(type, item, activeTags, activeCategory);
        tempDiv.innerHTML = itemHtml;
        while (tempDiv.firstChild) {
            fragment.appendChild(tempDiv.firstChild);
        }
    });

    listContainer.appendChild(fragment);

    // Refresh icons for new items
    refreshIcons(listContainer);
}

/**
 * Add sentinel or end message to grid container
 * @param {HTMLElement} grid - The .element-grid element
 * @param {string} type - Catalog type key
 * @param {boolean} hasMore - Whether more items are available
 * @param {number} loadedCount - Number of items loaded
 * @param {number} totalCount - Total number of items
 */
function updateGridSentinel(grid, type, hasMore, loadedCount, totalCount) {
    if (!grid) return;

    // Remove existing sentinel/end
    const existing = grid.querySelector('.lazy-load-sentinel, .lazy-load-end');
    if (existing) existing.remove();

    // Add appropriate element
    if (hasMore) {
        grid.insertAdjacentHTML('beforeend', renderLoadingSentinel(type));
    } else if (totalCount > 0) {
        grid.insertAdjacentHTML('beforeend', renderEndOfResults(loadedCount, totalCount));
    }

    refreshIcons(grid);
}

/**
 * Add sentinel or end message to list container
 * @param {HTMLElement} listContainer - The .element-list-container element
 * @param {string} type - Catalog type key
 * @param {boolean} hasMore - Whether more items are available
 * @param {number} loadedCount - Number of items loaded
 * @param {number} totalCount - Total number of items
 */
function updateListSentinel(listContainer, type, hasMore, loadedCount, totalCount) {
    if (!listContainer) return;

    // Remove existing sentinel/end
    const existing = listContainer.querySelector('.lazy-load-sentinel, .lazy-load-end');
    if (existing) existing.remove();

    // Add appropriate element
    if (hasMore) {
        listContainer.insertAdjacentHTML('beforeend', renderLoadingSentinel(type));
    } else if (totalCount > 0) {
        listContainer.insertAdjacentHTML('beforeend', renderEndOfResults(loadedCount, totalCount));
    }

    refreshIcons(listContainer);
}

/**
 * Render list content with sentinel inside the container
 * Used for initial page render to ensure sentinel is inside .element-list-container
 * @param {string} type - Catalog type key
 * @param {Array} items - Array of data items
 * @param {string[]} activeTags - Currently active tags
 * @param {string} activeCategory - Currently active category
 * @param {string} sentinelHtml - Sentinel or end HTML to include
 * @returns {string} HTML string
 */
function renderListContentWithSentinel(type, items, activeTags = [], activeCategory = '', sentinelHtml = '') {
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

    const itemsHtml = items.map(item => renderSingleListItem(type, item, activeTags, activeCategory)).join('');

    return `<div class="element-list-container">${headerHtml}${itemsHtml}${sentinelHtml}</div>`;
}

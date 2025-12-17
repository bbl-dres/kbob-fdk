/**
 * KBOB Fachdatenkatalog - Item Renderers
 * Grid and list renderers for all data types
 */

/**
 * Render tags HTML for full view
 * @param {Array} tagsData - Array of tag strings
 * @param {string[]} activeTags - Currently active tags
 * @returns {string} HTML string
 */
function renderTagsHtml(tagsData, activeTags = []) {
    if (!tagsData || !Array.isArray(tagsData)) return '';
    return tagsData.map(tag => {
        const isActive = activeTags.includes(tag);
        const activeClass = isActive ? 'active' : '';
        return `<span class="tag-badge ${activeClass}" onclick="event.stopPropagation(); toggleTagInURL('${tag}')" title="Filter: ${tag}">${tag}</span>`;
    }).join('');
}

/**
 * Toggle card tags expanded state
 * @param {string} cardId - Card identifier
 */
window.toggleCardTags = function(cardId) {
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
 * @param {string} cardId - Card identifier
 * @param {Array} tagsData - Array of tag strings
 * @param {string[]} activeTags - Currently active tags
 * @returns {string} HTML string
 */
function renderCardTagsHtml(cardId, tagsData, activeTags = []) {
    if (!tagsData || !Array.isArray(tagsData) || tagsData.length === 0) return '';

    const maxVisible = 2;
    const isExpanded = expandedCardTags.has(cardId);
    const hiddenCount = tagsData.length - maxVisible;

    if (tagsData.length <= maxVisible || isExpanded) {
        const tagsHtml = tagsData.map(tag => {
            const isActive = activeTags.includes(tag);
            const activeClass = isActive ? 'active' : '';
            return `<span class="tag-badge ${activeClass}" onclick="event.stopPropagation(); toggleTagInURL('${tag}')" title="Filter: ${tag}">${tag}</span>`;
        }).join('');

        if (isExpanded && tagsData.length > maxVisible) {
            return tagsHtml + `<span class="tag-badge tag-badge--count" onclick="toggleCardTags('${cardId}')" title="Weniger anzeigen">−</span>`;
        }
        return tagsHtml;
    }

    const visibleTags = tagsData.slice(0, maxVisible);
    const tagsHtml = visibleTags.map(tag => {
        const isActive = activeTags.includes(tag);
        const activeClass = isActive ? 'active' : '';
        return `<span class="tag-badge ${activeClass}" onclick="event.stopPropagation(); toggleTagInURL('${tag}')" title="Filter: ${tag}">${tag}</span>`;
    }).join('');

    return tagsHtml + `<span class="tag-badge tag-badge--count" onclick="toggleCardTags('${cardId}')" title="${hiddenCount} weitere Tags anzeigen">+${hiddenCount}</span>`;
}

/**
 * Render no results message
 * @param {boolean} hasActiveTags - Whether there are active filters
 * @returns {string} HTML string
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
 * @param {number[]} phases - Array of phase numbers
 * @returns {string} HTML string
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

// ============================================
// ELEMENTS RENDERERS
// ============================================

function renderGridItemsHTML(items, activeTags = [], activeCategory = '') {
    if (!items || items.length === 0) return renderNoResults(activeTags.length > 0 || activeCategory);

    return items.map(el => {
        const hasTags = el.tags && Array.isArray(el.tags) && el.tags.length > 0;
        const cardId = `element-${el.id}`;
        const isCategoryActive = activeCategory === el.category;

        return `
        <article class="card" data-card-id="${cardId}" onclick="window.location.hash='${buildHashWithTags('element/' + el.id, activeTags, activeCategory)}'">
            <div class="card__image">
                ${el.category ? `<span class="tag-badge ${isCategoryActive ? 'active' : ''}" onclick="event.stopPropagation(); toggleCategoryInURL('${el.category}')">${el.category}</span>` : ''}
                ${el.image ? `<img src="${el.image}" alt="${el.title}">` : '<i data-lucide="image" class="placeholder-icon icon--xl" aria-hidden="true"></i>'}
            </div>
            <div class="card__body">
                <h3 class="card__title">${el.title}</h3>
                <p class="card__subtitle">${el.description || el.classification}</p>
                ${hasTags ? `<div class="card__tags" data-tags='${JSON.stringify(el.tags)}'>${renderCardTagsHtml(cardId, el.tags, activeTags)}</div>` : ''}
            </div>
            <footer class="card__footer card__footer--end">
                <span class="card__arrow-btn" aria-label="Details anzeigen">${arrowSvg}</span>
            </footer>
        </article>
    `}).join('');
}

function renderListItemsHTML(items, activeTags = [], activeCategory = '') {
    if (!items || items.length === 0) return renderNoResults(activeTags.length > 0 || activeCategory);

    const headerHtml = `
        <div class="list-header-row">
            <div class="list-col-name">Name</div>
            <div class="list-col-desc">Beschreibung</div>
            <div class="list-col-tags">Tags</div>
        </div>
    `;

    const itemsHtml = items.map(el => {
        return `
        <div class="element-list-item" onclick="window.location.hash='${buildHashWithTags('element/' + el.id, activeTags, activeCategory)}'">
            <div class="list-col-name">${el.title}</div>
            <div class="list-col-desc">${el.description || el.classification}</div>
            <div class="list-col-tags">${renderTagsHtml(el.tags, activeTags)}</div>
        </div>
    `}).join('');

    return `<div class="element-list-container">${headerHtml}${itemsHtml}</div>`;
}

// ============================================
// DOCUMENTS RENDERERS
// ============================================

function renderDocGridItemsHTML(items, activeTags = [], activeCategory = '') {
    if (!items || items.length === 0) return renderNoResults(activeTags.length > 0 || activeCategory);

    return items.map(doc => {
        const hasTags = doc.tags && Array.isArray(doc.tags) && doc.tags.length > 0;
        const cardId = `document-${doc.id}`;
        const isCategoryActive = activeCategory === doc.category;

        return `
        <article class="card" data-card-id="${cardId}" onclick="window.location.hash='${buildHashWithTags('document/' + doc.id, activeTags, activeCategory)}'">
            <div class="card__image">
                ${doc.category ? `<span class="tag-badge ${isCategoryActive ? 'active' : ''}" onclick="event.stopPropagation(); toggleCategoryInURL('${doc.category}')">${doc.category}</span>` : ''}
                ${doc.image ? `<img src="${doc.image}" alt="${doc.title}">` : '<i data-lucide="file-text" class="placeholder-icon icon--xl" aria-hidden="true"></i>'}
            </div>
            <div class="card__body">
                <h3 class="card__title">${doc.title}</h3>
                <p class="card__subtitle">${doc.description || doc.category}</p>
                ${hasTags ? `<div class="card__tags" data-tags='${JSON.stringify(doc.tags)}'>${renderCardTagsHtml(cardId, doc.tags, activeTags)}</div>` : ''}
            </div>
            <footer class="card__footer card__footer--end">
                <span class="card__arrow-btn" aria-label="Details anzeigen">${arrowSvg}</span>
            </footer>
        </article>
    `}).join('');
}

function renderDocListItemsHTML(items, activeTags = [], activeCategory = '') {
    if (!items || items.length === 0) return renderNoResults(activeTags.length > 0 || activeCategory);

    const headerHtml = `
        <div class="list-header-row">
            <div class="list-col-name">Name</div>
            <div class="list-col-desc">Beschreibung</div>
            <div class="list-col-tags">Tags</div>
        </div>
    `;

    const itemsHtml = items.map(doc => {
        return `
        <div class="element-list-item" onclick="window.location.hash='${buildHashWithTags('document/' + doc.id, activeTags, activeCategory)}'">
            <div class="list-col-name">${doc.title}</div>
            <div class="list-col-desc">${doc.description || doc.category}</div>
            <div class="list-col-tags">${renderTagsHtml(doc.tags, activeTags)}</div>
        </div>
    `}).join('');

    return `<div class="element-list-container">${headerHtml}${itemsHtml}</div>`;
}

// ============================================
// USECASES RENDERERS
// ============================================

function renderUsecasesGridItemsHTML(items, activeTags = [], activeCategory = '') {
    if (!items || items.length === 0) return renderNoResults(activeTags.length > 0 || activeCategory);

    return items.map(item => {
        const hasTags = item.tags && Array.isArray(item.tags) && item.tags.length > 0;
        const cardId = `usecase-${item.id}`;
        const isCategoryActive = activeCategory === item.category;

        return `
        <article class="card" data-card-id="${cardId}" onclick="window.location.hash='${buildHashWithTags('usecase/' + item.id, activeTags, activeCategory)}'">
            <div class="card__image">
                ${item.category ? `<span class="tag-badge ${isCategoryActive ? 'active' : ''}" onclick="event.stopPropagation(); toggleCategoryInURL('${item.category}')">${item.category}</span>` : ''}
                ${item.image ? `<img src="${item.image}" alt="${item.title}">` : '<i data-lucide="workflow" class="placeholder-icon icon--xl" aria-hidden="true"></i>'}
            </div>
            <div class="card__body">
                <h3 class="card__title">${item.title}</h3>
                <p class="card__subtitle">${item.description || item.category}</p>
                ${hasTags ? `<div class="card__tags" data-tags='${JSON.stringify(item.tags)}'>${renderCardTagsHtml(cardId, item.tags, activeTags)}</div>` : ''}
            </div>
            <footer class="card__footer card__footer--end">
                <span class="card__arrow-btn" aria-label="Details anzeigen">${arrowSvg}</span>
            </footer>
        </article>
    `}).join('');
}

function renderUsecasesListItemsHTML(items, activeTags = [], activeCategory = '') {
    if (!items || items.length === 0) return renderNoResults(activeTags.length > 0 || activeCategory);

    const headerHtml = `
        <div class="list-header-row">
            <div class="list-col-name">Name</div>
            <div class="list-col-desc">Beschreibung</div>
            <div class="list-col-tags">Tags</div>
        </div>
    `;

    const itemsHtml = items.map(item => {
        return `
        <div class="element-list-item" onclick="window.location.hash='${buildHashWithTags('usecase/' + item.id, activeTags, activeCategory)}'">
            <div class="list-col-name">${item.title}</div>
            <div class="list-col-desc">${item.description || item.category}</div>
            <div class="list-col-tags">${renderTagsHtml(item.tags, activeTags)}</div>
        </div>
    `}).join('');

    return `<div class="element-list-container">${headerHtml}${itemsHtml}</div>`;
}

// ============================================
// MODELS RENDERERS
// ============================================

function renderModelsGridItemsHTML(items, activeTags = [], activeCategory = '') {
    if (!items || items.length === 0) return renderNoResults(activeTags.length > 0 || activeCategory);

    return items.map(item => {
        const hasTags = item.tags && Array.isArray(item.tags) && item.tags.length > 0;
        const cardId = `model-${item.id}`;
        const isCategoryActive = activeCategory === item.category;

        return `
        <article class="card" data-card-id="${cardId}" onclick="window.location.hash='${buildHashWithTags('model/' + item.id, activeTags, activeCategory)}'">
            <div class="card__image">
                ${item.category ? `<span class="tag-badge ${isCategoryActive ? 'active' : ''}" onclick="event.stopPropagation(); toggleCategoryInURL('${item.category}')">${item.category}</span>` : ''}
                ${item.image ? `<img src="${item.image}" alt="${item.title}">` : '<i data-lucide="boxes" class="placeholder-icon icon--xl" aria-hidden="true"></i>'}
            </div>
            <div class="card__body">
                <h3 class="card__title">${item.title}</h3>
                <p class="card__subtitle">${item.description || item.category}</p>
                ${hasTags ? `<div class="card__tags" data-tags='${JSON.stringify(item.tags)}'>${renderCardTagsHtml(cardId, item.tags, activeTags)}</div>` : ''}
            </div>
            <footer class="card__footer card__footer--end">
                <span class="card__arrow-btn" aria-label="Details anzeigen">${arrowSvg}</span>
            </footer>
        </article>
    `}).join('');
}

function renderModelsListItemsHTML(items, activeTags = [], activeCategory = '') {
    if (!items || items.length === 0) return renderNoResults(activeTags.length > 0 || activeCategory);

    const headerHtml = `
        <div class="list-header-row">
            <div class="list-col-name">Name</div>
            <div class="list-col-desc">Beschreibung</div>
            <div class="list-col-tags">Tags</div>
        </div>
    `;

    const itemsHtml = items.map(item => {
        return `
        <div class="element-list-item" onclick="window.location.hash='${buildHashWithTags('model/' + item.id, activeTags, activeCategory)}'">
            <div class="list-col-name">${item.title}</div>
            <div class="list-col-desc">${item.description || item.category}</div>
            <div class="list-col-tags">${renderTagsHtml(item.tags, activeTags)}</div>
        </div>
    `}).join('');

    return `<div class="element-list-container">${headerHtml}${itemsHtml}</div>`;
}

// ============================================
// EPDS RENDERERS
// ============================================

function renderEpdsGridItemsHTML(items, activeTags = [], activeCategory = '') {
    if (!items || items.length === 0) return renderNoResults(activeTags.length > 0 || activeCategory);

    return items.map(item => {
        const hasTags = item.tags && Array.isArray(item.tags) && item.tags.length > 0;
        const cardId = `epd-${item.id}`;
        const isCategoryActive = activeCategory === item.category;

        return `
        <article class="card" data-card-id="${cardId}" onclick="window.location.hash='${buildHashWithTags('epd/' + item.id, activeTags, activeCategory)}'">
            <div class="card__image">
                ${item.category ? `<span class="tag-badge ${isCategoryActive ? 'active' : ''}" onclick="event.stopPropagation(); toggleCategoryInURL('${item.category}')">${item.category}</span>` : ''}
                ${item.image ? `<img src="${item.image}" alt="${item.title}">` : '<i data-lucide="leaf" class="placeholder-icon icon--xl" aria-hidden="true"></i>'}
            </div>
            <div class="card__body">
                <h3 class="card__title">${item.title}</h3>
                <p class="card__subtitle">${item.description || item.category}</p>
                ${hasTags ? `<div class="card__tags" data-tags='${JSON.stringify(item.tags)}'>${renderCardTagsHtml(cardId, item.tags, activeTags)}</div>` : ''}
            </div>
            <footer class="card__footer card__footer--end">
                <span class="card__arrow-btn" aria-label="Details anzeigen">${arrowSvg}</span>
            </footer>
        </article>
    `}).join('');
}

function renderEpdsListItemsHTML(items, activeTags = [], activeCategory = '') {
    if (!items || items.length === 0) return renderNoResults(activeTags.length > 0 || activeCategory);

    const headerHtml = `
        <div class="list-header-row">
            <div class="list-col-name">Name</div>
            <div class="list-col-desc">Beschreibung</div>
            <div class="list-col-tags">Tags</div>
        </div>
    `;

    const itemsHtml = items.map(item => {
        return `
        <div class="element-list-item" onclick="window.location.hash='${buildHashWithTags('epd/' + item.id, activeTags, activeCategory)}'">
            <div class="list-col-name">${item.title}</div>
            <div class="list-col-desc">${item.description || item.category}</div>
            <div class="list-col-tags">${renderTagsHtml(item.tags, activeTags)}</div>
        </div>
    `}).join('');

    return `<div class="element-list-container">${headerHtml}${itemsHtml}</div>`;
}

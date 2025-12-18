/**
 * KBOB Fachdatenkatalog - Filter Components
 * Filter bar and filter-related helpers
 */

/**
 * Toggle filter dropdown open/closed
 * @param {Event} event - Click event
 * @param {string} groupId - The filter group identifier
 */
window.toggleFilterDropdown = function(event, groupId) {
    event.stopPropagation();
    const allGroups = document.querySelectorAll('.filter-group');
    allGroups.forEach(group => {
        if (group.dataset.filterId === groupId) {
            group.classList.toggle('open');
        } else {
            group.classList.remove('open');
        }
    });
}

/**
 * Close all filter dropdowns when clicking outside
 */
document.addEventListener('click', function(e) {
    if (!e.target.closest('.filter-group')) {
        document.querySelectorAll('.filter-group.open').forEach(group => {
            group.classList.remove('open');
        });
    }
});

/**
 * Render filter bar header with optional reset icon
 * @param {string[]} activeTags - Active tag filters
 * @param {string} activeCategory - Active category filter
 * @returns {string} HTML string
 */
function renderFilterBarHeader(activeTags, activeCategory = '') {
    const hasFilters = activeTags.length > 0 || activeCategory;
    const resetBtn = hasFilters
        ? `<button class="filter-bar__reset" onclick="clearAllFilters()" title="Filter zurücksetzen" aria-label="Filter zurücksetzen"><i data-lucide="x" aria-hidden="true"></i></button>`
        : '';

    let activeFiltersHtml = '';
    if (hasFilters) {
        const filterBadges = [];
        if (activeCategory) {
            const safeCat = escapeHtml(activeCategory);
            filterBadges.push(`<span class="tag-badge active" onclick="toggleCategoryInURL('${safeCat}')">${safeCat} <i data-lucide="x" style="width:12px;height:12px;vertical-align:middle;margin-left:4px;"></i></span>`);
        }
        activeTags.forEach(tag => {
            const safeTag = escapeHtml(tag);
            filterBadges.push(`<span class="tag-badge active" onclick="toggleTagInURL('${safeTag}')">${safeTag} <i data-lucide="x" style="width:12px;height:12px;vertical-align:middle;margin-left:4px;"></i></span>`);
        });
        activeFiltersHtml = `<div class="filter-bar__active-filters" style="display:flex;gap:var(--space-sm);flex-wrap:wrap;margin-top:var(--space-sm);">${filterBadges.join('')}</div>`;
    }

    return `<div class="filter-bar__header"><span>Filter</span>${resetBtn}</div>${activeFiltersHtml}`;
}

/**
 * Render complete filter bar with category and tags dropdowns
 * @param {Object} options - Configuration options
 * @returns {string} HTML string for the filter bar
 */
function renderFilterBar(options) {
    const {
        data = [],
        activeTags = [],
        activeCategory = '',
        activePhases = [],
        showPhases = false,
        filterPanelClass = ''
    } = options;

    const categories = getUniqueCategories(data);
    const tags = getUniqueTags(data);

    // Count items per category
    const categoryCounts = {};
    categories.forEach(cat => {
        categoryCounts[cat] = data.filter(item => item.category === cat).length;
    });

    // Count items per tag
    const tagCounts = {};
    tags.forEach(tag => {
        tagCounts[tag] = data.filter(item => item.tags && item.tags.includes(tag)).length;
    });

    // Render category dropdown items
    const categoryItemsHtml = categories.map(cat => {
        const safeCat = escapeHtml(cat);
        const isActive = activeCategory === cat;
        const count = categoryCounts[cat];
        return `<span class="filter-dropdown__item ${isActive ? 'active' : ''}" onclick="event.stopPropagation(); toggleCategoryInURL('${safeCat}')">${safeCat} <span class="filter-dropdown__count">${count}</span></span>`;
    }).join('');

    // Render tag dropdown items
    const tagItemsHtml = tags.map(tag => {
        const safeTag = escapeHtml(tag);
        const isActive = activeTags.includes(tag);
        const count = tagCounts[tag];
        return `<span class="filter-dropdown__item ${isActive ? 'active' : ''}" onclick="event.stopPropagation(); toggleTagInURL('${safeTag}')">${safeTag} <span class="filter-dropdown__count">${count}</span></span>`;
    }).join('');

    // Render phases dropdown if needed
    let phasesGroupHtml = '';
    if (showPhases) {
        const availablePhases = Object.keys(phaseLabels).map(Number).sort((a, b) => a - b);
        const phasesItemsHtml = availablePhases.map(phase => {
            const isActive = activePhases.includes(phase);
            const label = phaseLabels[phase];
            return `
                <div class="filter-dropdown__phase-item ${isActive ? 'active' : ''}" onclick="event.stopPropagation(); togglePhaseInURL(${phase})">
                    <span class="filter-dropdown__phase-number">${phase}</span>
                    <span class="filter-dropdown__phase-label">${label}</span>
                </div>
            `;
        }).join('');

        const activePhasesCount = activePhases.length;
        phasesGroupHtml = `
            <div class="filter-group" data-filter-id="phases">
                <div class="filter-toggle" onclick="toggleFilterDropdown(event, 'phases')">
                    Phase ${activePhasesCount > 0 ? `<span class="filter-count-badge" style="background:var(--color-primary);color:white;padding:2px 6px;border-radius:10px;font-size:11px;margin-left:4px;">${activePhasesCount}</span>` : ''}
                    <i data-lucide="chevron-down" aria-hidden="true"></i>
                </div>
                <div class="filter-dropdown">
                    <div class="filter-dropdown__title">Phasen</div>
                    <div class="filter-dropdown__phases">
                        ${phasesItemsHtml}
                    </div>
                </div>
            </div>
        `;
    }

    const hasFilters = activeTags.length > 0 || activeCategory || activePhases.length > 0;
    const resetBtn = hasFilters
        ? `<button class="filter-bar__reset" onclick="clearAllFilters()" title="Filter zurücksetzen" aria-label="Filter zurücksetzen"><i data-lucide="x" aria-hidden="true"></i></button>`
        : '';

    // Build active filters display
    let activeFiltersHtml = '';
    if (hasFilters) {
        const filterBadges = [];
        if (activeCategory) {
            const safeCat = escapeHtml(activeCategory);
            filterBadges.push(`<span class="tag-badge active" onclick="toggleCategoryInURL('${safeCat}')">${safeCat} <i data-lucide="x" style="width:12px;height:12px;vertical-align:middle;margin-left:4px;"></i></span>`);
        }
        activeTags.forEach(tag => {
            const safeTag = escapeHtml(tag);
            filterBadges.push(`<span class="tag-badge active" onclick="toggleTagInURL('${safeTag}')">${safeTag} <i data-lucide="x" style="width:12px;height:12px;vertical-align:middle;margin-left:4px;"></i></span>`);
        });
        activePhases.forEach(phase => {
            filterBadges.push(`<span class="tag-badge active" onclick="togglePhaseInURL(${phase})">Phase ${phase} <i data-lucide="x" style="width:12px;height:12px;vertical-align:middle;margin-left:4px;"></i></span>`);
        });
        activeFiltersHtml = `<div class="filter-bar__active-filters" style="display:flex;gap:var(--space-sm);flex-wrap:wrap;padding:var(--space-sm) var(--space-lg);border-top:1px solid var(--color-border-light);">${filterBadges.join('')}</div>`;
    }

    const activeCategoryCount = activeCategory ? 1 : 0;
    const activeTagsCount = activeTags.length;

    return `
        <div class="filter-bar ${filterPanelClass}">
            <div class="filter-bar__header"><span>Filter</span>${resetBtn}</div>
            <div class="filter-bar__groups">
                <div class="filter-group" data-filter-id="category">
                    <div class="filter-toggle" onclick="toggleFilterDropdown(event, 'category')">
                        Kategorie ${activeCategoryCount > 0 ? `<span class="filter-count-badge" style="background:var(--color-primary);color:white;padding:2px 6px;border-radius:10px;font-size:11px;margin-left:4px;">${activeCategoryCount}</span>` : ''}
                        <i data-lucide="chevron-down" aria-hidden="true"></i>
                    </div>
                    <div class="filter-dropdown">
                        <div class="filter-dropdown__title">Kategorie wählen</div>
                        <div class="filter-dropdown__items">
                            ${categoryItemsHtml}
                        </div>
                    </div>
                </div>
                <div class="filter-group" data-filter-id="tags">
                    <div class="filter-toggle" onclick="toggleFilterDropdown(event, 'tags')">
                        Tags ${activeTagsCount > 0 ? `<span class="filter-count-badge" style="background:var(--color-primary);color:white;padding:2px 6px;border-radius:10px;font-size:11px;margin-left:4px;">${activeTagsCount}</span>` : ''}
                        <i data-lucide="chevron-down" aria-hidden="true"></i>
                    </div>
                    <div class="filter-dropdown">
                        <div class="filter-dropdown__title">Tags wählen</div>
                        <div class="filter-dropdown__items">
                            ${tagItemsHtml}
                        </div>
                    </div>
                </div>
                ${phasesGroupHtml}
            </div>
            ${activeFiltersHtml}
        </div>
    `;
}

/**
 * Render filter button with reset button
 * @param {string} type - Filter type
 * @param {boolean} isVisible - Whether filter panel is visible
 * @param {number} activeTagCount - Number of active filters
 * @returns {string} HTML string
 */
function renderFilterButton(type, isVisible, activeTagCount) {
    const activeClass = isVisible ? 'active' : '';

    const resetBtn = activeTagCount > 0
        ? `<button class="filter-btn reset-filter-btn" onclick="clearAllFilters('${type}')" title="Filter zurücksetzen"><i data-lucide="refresh-cw" aria-hidden="true"></i> Zurücksetzen</button>`
        : '';

    return `
        <button class="filter-btn ${activeClass}" onclick="toggleFilter('${type}')">
            <i data-lucide="filter" aria-hidden="true"></i>
            Filter${activeTagCount > 0 ? `<span class="filter-count-badge">${activeTagCount}</span>` : ''}
        </button>
        ${resetBtn}
    `;
}

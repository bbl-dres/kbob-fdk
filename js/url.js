/**
 * KBOB Fachdatenkatalog - URL Utilities
 * URL parsing and building functions
 */

/**
 * Parse the current hash and extract route, id, and parameters
 * @returns {Object} { route, id, tags, phases, searchQuery, category, view }
 */
function parseHashWithParams() {
    const fullHash = window.location.hash.slice(1) || 'home';
    const [hashPart, queryPart] = fullHash.split('?');

    // Parse route and id
    let route = hashPart;
    let id = null;

    if (hashPart.startsWith('element/')) {
        route = 'element';
        id = hashPart.split('/')[1];
    } else if (hashPart.startsWith('document/')) {
        route = 'document';
        id = hashPart.split('/')[1];
    } else if (hashPart.startsWith('usecase/')) {
        route = 'usecase';
        id = hashPart.split('/')[1];
    } else if (hashPart.startsWith('model/')) {
        route = 'model';
        id = hashPart.split('/')[1];
    } else if (hashPart.startsWith('epd/')) {
        route = 'epd';
        id = hashPart.split('/')[1];
    }

    // Parse query params
    const tags = [];
    const phases = [];
    let searchQuery = '';
    let category = '';
    let view = 'grid'; // Default view
    if (queryPart) {
        const params = new URLSearchParams(queryPart);
        params.getAll('tag').forEach(tag => {
            if (tag) {
                tags.push(tag);
            }
        });
        params.getAll('phase').forEach(phase => {
            const phaseNum = parseInt(phase, 10);
            if (!isNaN(phaseNum) && phaseNum >= 1 && phaseNum <= 5) {
                phases.push(phaseNum);
            }
        });
        searchQuery = params.get('q') || '';
        category = params.get('category') || '';
        const viewParam = params.get('view');
        if (viewParam === 'list' || viewParam === 'grid') {
            view = viewParam;
        }
    }

    return { route, id, tags, phases, searchQuery, category, view };
}

/**
 * Get active tags from the current URL
 * @returns {string[]} Array of tag strings
 */
function getActiveTagsFromURL() {
    return parseHashWithParams().tags;
}

/**
 * Get active category from the current URL
 * @returns {string} Category string or empty string
 */
function getActiveCategoryFromURL() {
    return parseHashWithParams().category;
}

/**
 * Get active view from the current URL
 * @returns {string} View mode ('grid' or 'list'), defaults to 'grid'
 */
function getActiveViewFromURL() {
    return parseHashWithParams().view;
}

/**
 * Get active phases from the current URL
 * @returns {number[]} Array of phase numbers
 */
function getActivePhasesFromURL() {
    return parseHashWithParams().phases || [];
}

/**
 * Build a hash string with tags, category, phases, and view
 * @param {string} baseHash - The base hash without params
 * @param {string[]} tags - Array of tag strings
 * @param {string} category - Optional category string
 * @param {number[]} phases - Optional array of phase numbers
 * @param {string} view - Optional view mode ('grid' or 'list')
 * @returns {string} Complete hash string with params
 */
function buildHashWithTags(baseHash, tags, category = '', phases = [], view = '') {
    const params = [];
    if (tags && tags.length > 0) {
        tags.forEach(tag => params.push(`tag=${encodeURIComponent(tag)}`));
    }
    if (category) {
        params.push(`category=${encodeURIComponent(category)}`);
    }
    if (phases && phases.length > 0) {
        phases.forEach(phase => params.push(`phase=${phase}`));
    }
    if (view && (view === 'grid' || view === 'list')) {
        params.push(`view=${view}`);
    }
    if (params.length === 0) {
        return baseHash;
    }
    return `${baseHash}?${params.join('&')}`;
}

/**
 * Toggle a tag in the URL (add if missing, remove if present)
 * @param {string} tag - Tag string
 */
window.toggleTagInURL = function(tag) {
    const { route, id, tags, category, phases, view } = parseHashWithParams();

    const tagIndex = tags.indexOf(tag);
    if (tagIndex > -1) {
        tags.splice(tagIndex, 1);
    } else {
        tags.push(tag);
    }

    // Build base hash - redirect to list view if on detail page
    let baseHash = route;
    if (id) {
        baseHash = parentRoutes[route] || route;
    }

    window.location.hash = buildHashWithTags(baseHash, tags, category, phases, view);
}

/**
 * Toggle a category in the URL (add if not set, remove if same category)
 * @param {string} cat - Category string
 */
window.toggleCategoryInURL = function(cat) {
    const { route, id, tags, category, phases, view } = parseHashWithParams();

    const newCategory = (category === cat) ? '' : cat;

    let baseHash = route;
    if (id) {
        baseHash = parentRoutes[route] || route;
    }

    window.location.hash = buildHashWithTags(baseHash, tags, newCategory, phases, view);
}

/**
 * Toggle a phase in the URL (add if missing, remove if present)
 * @param {number} phase - Phase number (1-5)
 */
window.togglePhaseInURL = function(phase) {
    const { route, id, tags, category, phases, view } = parseHashWithParams();
    const phaseNum = parseInt(phase, 10);

    const phaseIndex = phases.indexOf(phaseNum);
    if (phaseIndex > -1) {
        phases.splice(phaseIndex, 1);
    } else {
        phases.push(phaseNum);
    }

    let baseHash = route;
    if (id) {
        baseHash = parentRoutes[route] || route;
    }

    window.location.hash = buildHashWithTags(baseHash, tags, category, phases, view);
}

/**
 * Clear all tags from URL
 */
window.clearAllTagsFromURL = function() {
    const { route, id } = parseHashWithParams();
    let baseHash = route;
    if (id) {
        baseHash = `${route}/${id}`;
    }
    window.location.hash = baseHash;
}

/**
 * Clear all filters (wrapper for toolbar reset button)
 */
window.clearAllFilters = function(type) {
    clearAllTagsFromURL();
}

/**
 * Navigate to a route while preserving current tags, category, phases, and view
 * @param {string} targetRoute - Target route
 */
function navigateWithTags(targetRoute) {
    const tags = getActiveTagsFromURL();
    const category = getActiveCategoryFromURL();
    const phases = getActivePhasesFromURL();
    const view = getActiveViewFromURL();
    window.location.hash = buildHashWithTags(targetRoute, tags, category, phases, view);
}

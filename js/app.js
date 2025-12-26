/**
 * KBOB Fachdatenkatalog - Main Application
 * Initialization and data loading
 */

// ============================================
// FETCH UTILITIES
// ============================================

/**
 * Fetch with timeout support
 * @param {string} url - URL to fetch
 * @param {number} timeout - Timeout in milliseconds (default: 10000)
 * @returns {Promise<Response>}
 */
async function fetchWithTimeout(url, timeout = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error(`Request timeout: ${url}`);
        }
        throw error;
    }
}

/**
 * Fetch with retry and exponential backoff
 * @param {string} url - URL to fetch
 * @param {Object} options - Options
 * @param {number} options.retries - Number of retries (default: 3)
 * @param {number} options.timeout - Timeout per request in ms (default: 10000)
 * @param {number} options.backoffMs - Initial backoff in ms (default: 1000)
 * @returns {Promise<Response>}
 */
async function fetchWithRetry(url, options = {}) {
    const { retries = 3, timeout = 10000, backoffMs = 1000 } = options;

    let lastError;
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            return await fetchWithTimeout(url, timeout);
        } catch (error) {
            lastError = error;
            if (attempt < retries) {
                // Exponential backoff: 1s, 2s, 4s
                const delay = backoffMs * Math.pow(2, attempt);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    throw lastError;
}

// ============================================
// DATA LOADING
// ============================================

/**
 * Load data from JSON files with retry support
 */
async function loadDataFromJson() {
    const fetchOptions = { retries: 3, timeout: 15000, backoffMs: 1000 };

    const [
        elementsResponse,
        documentsResponse,
        usecasesResponse,
        modelsResponse,
        epdsResponse,
        classificationsResponse,
        attributesResponse,
        tagsResponse
    ] = await Promise.all([
        fetchWithRetry('data/elements.json', fetchOptions),
        fetchWithRetry('data/documents.json', fetchOptions),
        fetchWithRetry('data/usecases.json', fetchOptions),
        fetchWithRetry('data/models.json', fetchOptions),
        fetchWithRetry('data/epds.json', fetchOptions),
        fetchWithRetry('data/classifications.json', fetchOptions),
        fetchWithRetry('data/attributes.json', fetchOptions),
        fetchWithRetry('data/tags.json', fetchOptions)
    ]);

    if (!elementsResponse.ok) throw new Error(`Elements: HTTP error! status: ${elementsResponse.status}`);
    if (!documentsResponse.ok) throw new Error(`Documents: HTTP error! status: ${documentsResponse.status}`);
    if (!usecasesResponse.ok) throw new Error(`Usecases: HTTP error! status: ${usecasesResponse.status}`);
    if (!modelsResponse.ok) throw new Error(`Models: HTTP error! status: ${modelsResponse.status}`);
    if (!epdsResponse.ok) throw new Error(`EPDs: HTTP error! status: ${epdsResponse.status}`);
    if (!classificationsResponse.ok) throw new Error(`Classifications: HTTP error! status: ${classificationsResponse.status}`);
    if (!attributesResponse.ok) throw new Error(`Attributes: HTTP error! status: ${attributesResponse.status}`);
    if (!tagsResponse.ok) throw new Error(`Tags: HTTP error! status: ${tagsResponse.status}`);

    return {
        elements: await elementsResponse.json(),
        documents: await documentsResponse.json(),
        usecases: await usecasesResponse.json(),
        models: await modelsResponse.json(),
        epds: await epdsResponse.json(),
        classifications: await classificationsResponse.json(),
        attributes: await attributesResponse.json(),
        tags: await tagsResponse.json()
    };
}

/**
 * Initialize the application
 */
async function initApp() {
    try {
        let data = null;

        // Try Supabase first if configured
        if (typeof isSupabaseConfigured === 'function' && isSupabaseConfigured()) {
            console.log('Loading data from Supabase...');
            data = await fetchAllDataFromSupabase();

            if (data) {
                console.log('Data loaded from Supabase successfully');
            } else {
                console.warn('Supabase fetch failed, falling back to JSON files');
            }
        }

        // Fall back to JSON files if Supabase is not configured or failed
        if (!data) {
            console.log('Loading data from JSON files...');
            data = await loadDataFromJson();
            console.log('Data loaded from JSON files successfully');
        }

        // Assign to global variables and sort once at load time (performance optimization)
        globalElementsData = sortDataByTitle(data.elements);
        globalDocumentsData = sortDataByTitle(data.documents);
        globalUsecasesData = sortDataByTitle(data.usecases);
        globalModelsData = sortDataByTitle(data.models);
        globalEpdsData = sortDataByTitle(data.epds);
        globalClassificationsData = data.classifications || [];
        globalAttributesData = data.attributes || [];
        globalTagsData = data.tags || [];

        // Build index maps for O(1) lookups (performance optimization)
        buildDataIndexMaps();

        // Build tags lookup map for resolving tag IDs to i18n objects
        buildTagsLookupMap();

        isDataLoaded = true;

        // Setup nav link click handlers for tag preservation
        setupNavLinks();

        // Setup header search toggle and form
        setupHeaderSearch();

        window.addEventListener('hashchange', router);
        router();
    } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
        contentArea.innerHTML = `
            <div class="container error-state">
                <i data-lucide="alert-circle" class="status-icon status-icon--error icon--3xl" aria-hidden="true"></i><br>
                <h2>Fehler beim Laden der Daten</h2>
                <p>Konnte Daten nicht laden.</p>
                <br><span class="error-detail">${error.message}</span>
            </div>`;
        lucide.createIcons();
    }
}

/**
 * Setup global event delegation for navigation and interactive elements
 * Uses event delegation to avoid attaching listeners to each element (performance + memory)
 * This centralizes all click handlers for better security (no inline onclick) and maintainability
 */
function setupEventDelegation() {
    document.addEventListener('click', (e) => {
        // Handle nav links with data-route attribute
        const navLink = e.target.closest('.main-nav .nav-link:not(.disabled)');
        if (navLink) {
            const route = navLink.getAttribute('data-route');
            if (route) {
                e.preventDefault();
                navigateWithTags(route);
            }
            return;
        }

        // Handle quick cards on home page
        const quickCard = e.target.closest('.quick-card[data-route]');
        if (quickCard) {
            e.preventDefault();
            window.location.hash = quickCard.dataset.route;
            return;
        }

        // Handle sidebar links on detail pages
        const sidebarLink = e.target.closest('.sidebar-link[data-target]');
        if (sidebarLink) {
            e.preventDefault();
            const targetId = sidebarLink.getAttribute('data-target');
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            return;
        }

        // Handle catalog cards with data-href (navigate to detail page)
        const card = e.target.closest('.card[data-href]');
        if (card && !e.target.closest('[data-action]')) {
            window.location.hash = card.dataset.href;
            return;
        }

        // Handle list items with data-href
        const listItem = e.target.closest('.element-list-item[data-href]');
        if (listItem && !e.target.closest('[data-action]')) {
            window.location.hash = listItem.dataset.href;
            return;
        }

        // Handle data-action elements (centralized action handlers)
        const actionElement = e.target.closest('[data-action]');
        if (actionElement) {
            const action = actionElement.dataset.action;

            switch (action) {
                case 'toggle-tag':
                    e.stopPropagation();
                    toggleTagInURL(actionElement.dataset.tag);
                    break;
                case 'toggle-category':
                    e.stopPropagation();
                    toggleCategoryInURL(actionElement.dataset.category);
                    break;
                case 'toggle-phase':
                    e.stopPropagation();
                    togglePhaseInURL(parseInt(actionElement.dataset.phase, 10));
                    break;
                case 'toggle-filter-dropdown':
                    e.stopPropagation();
                    handleFilterDropdownToggle(actionElement.dataset.filterId);
                    break;
                case 'toggle-card-tags':
                    e.stopPropagation();
                    toggleCardTags(e, actionElement.dataset.cardId);
                    break;
                case 'clear-all-filters':
                    clearAllFilters(actionElement.dataset.type);
                    break;
                case 'clear-tags':
                    clearAllTagsFromURL();
                    break;
                case 'toggle-filter':
                    toggleFilter(actionElement.dataset.type);
                    break;
                case 'switch-view':
                    switchView(actionElement.dataset.view);
                    break;
                case 'switch-search-view':
                    switchSearchView(actionElement.dataset.view);
                    break;
                case 'toggle-sort-dropdown':
                    toggleSortDropdown();
                    break;
                case 'set-search-sort':
                    setSearchSort(actionElement.dataset.sort);
                    break;
            }
            return;
        }
    });
}

/**
 * Handle filter dropdown toggle (extracted for event delegation)
 * @param {string} groupId - The filter group identifier
 */
function handleFilterDropdownToggle(groupId) {
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
 * Setup nav links to preserve tags when switching tabs
 * @deprecated Use setupEventDelegation instead - kept for backwards compatibility
 */
function setupNavLinks() {
    // Now handled by event delegation in setupEventDelegation()
    // This function is kept empty for backwards compatibility
}

/**
 * DOM Content Loaded event handler
 */
window.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons for loading state
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Setup global event delegation (once, at startup)
    setupEventDelegation();

    initLanguageDropdown();
    initApp();
});

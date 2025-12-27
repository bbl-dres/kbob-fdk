/**
 * KBOB Fachdatenkatalog - Pagination State Manager
 * Manages lazy loading state for catalog views using Intersection Observer
 */

// ============================================
// CONFIGURATION
// ============================================

const PAGINATION_CONFIG = {
    initialBatchSize: 24,       // First load - fills ~2-3 viewport heights
    subsequentBatchSize: 12,    // Load more batches - smaller for responsiveness
    observerRootMargin: '200px' // Trigger before reaching bottom
};

// ============================================
// PAGINATION STATE
// ============================================

/**
 * State per catalog type
 * Each type tracks its own loaded count, filtered data, and observer
 */
const paginationState = {
    elements: { loadedCount: 0, filteredData: [], observer: null },
    documents: { loadedCount: 0, filteredData: [], observer: null },
    usecases: { loadedCount: 0, filteredData: [], observer: null },
    models: { loadedCount: 0, filteredData: [], observer: null },
    epds: { loadedCount: 0, filteredData: [], observer: null }
};

// ============================================
// CORE PAGINATION FUNCTIONS
// ============================================

/**
 * Reset pagination state for a catalog type
 * Called when filters change or page navigates
 * @param {string} type - Catalog type key
 */
function resetPagination(type) {
    if (paginationState[type]) {
        // Disconnect existing observer
        if (paginationState[type].observer) {
            paginationState[type].observer.disconnect();
            paginationState[type].observer = null;
        }
        paginationState[type].loadedCount = 0;
        paginationState[type].filteredData = [];
    }
}

/**
 * Initialize pagination for a catalog type with filtered data
 * @param {string} type - Catalog type key
 * @param {Array} filteredData - Array of filtered data items
 * @returns {Object} Initial batch result { items, hasMore, totalCount, loadedCount }
 */
function initPagination(type, filteredData) {
    resetPagination(type);
    paginationState[type].filteredData = filteredData;
    return getNextBatch(type, true);
}

/**
 * Get next batch of items for a catalog type
 * @param {string} type - Catalog type key
 * @param {boolean} isInitial - Whether this is the initial load
 * @returns {Object} { items, hasMore, totalCount, loadedCount }
 */
function getNextBatch(type, isInitial = false) {
    const state = paginationState[type];
    if (!state) {
        return { items: [], hasMore: false, totalCount: 0, loadedCount: 0 };
    }

    const batchSize = isInitial
        ? PAGINATION_CONFIG.initialBatchSize
        : PAGINATION_CONFIG.subsequentBatchSize;

    const startIndex = state.loadedCount;
    const endIndex = Math.min(startIndex + batchSize, state.filteredData.length);
    const items = state.filteredData.slice(startIndex, endIndex);

    state.loadedCount = endIndex;

    return {
        items,
        hasMore: endIndex < state.filteredData.length,
        totalCount: state.filteredData.length,
        loadedCount: endIndex
    };
}

/**
 * Get all currently loaded items (useful for view switching)
 * @param {string} type - Catalog type key
 * @returns {Object} { items, hasMore, totalCount, loadedCount }
 */
function getLoadedItems(type) {
    const state = paginationState[type];
    if (!state) {
        return { items: [], hasMore: false, totalCount: 0, loadedCount: 0 };
    }

    return {
        items: state.filteredData.slice(0, state.loadedCount),
        hasMore: state.loadedCount < state.filteredData.length,
        totalCount: state.filteredData.length,
        loadedCount: state.loadedCount
    };
}

/**
 * Get pagination state info (for debugging or display)
 * @param {string} type - Catalog type key
 * @returns {Object} Current pagination state
 */
function getPaginationInfo(type) {
    const state = paginationState[type];
    if (!state) return null;

    return {
        loadedCount: state.loadedCount,
        totalCount: state.filteredData.length,
        hasMore: state.loadedCount < state.filteredData.length,
        hasObserver: !!state.observer
    };
}

// ============================================
// INTERSECTION OBSERVER SETUP
// ============================================

/**
 * Setup Intersection Observer for lazy loading
 * @param {string} type - Catalog type key
 * @param {HTMLElement} sentinelElement - The sentinel element to observe
 * @param {Function} loadMoreCallback - Callback when more items should be loaded
 */
function setupLazyLoadObserver(type, sentinelElement, loadMoreCallback) {
    const state = paginationState[type];
    if (!state) return;

    // Disconnect existing observer
    if (state.observer) {
        state.observer.disconnect();
    }

    // Create new observer
    state.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const batch = getNextBatch(type);
                if (batch.items.length > 0) {
                    loadMoreCallback(batch);
                }
                // Disconnect if no more items
                if (!batch.hasMore && state.observer) {
                    state.observer.disconnect();
                    state.observer = null;
                }
            }
        });
    }, {
        rootMargin: PAGINATION_CONFIG.observerRootMargin
    });

    // Start observing
    state.observer.observe(sentinelElement);
}

/**
 * Cleanup all pagination observers
 * Call this when navigating away from catalog pages
 */
function cleanupPagination() {
    Object.keys(paginationState).forEach(type => {
        if (paginationState[type].observer) {
            paginationState[type].observer.disconnect();
            paginationState[type].observer = null;
        }
    });
}

/**
 * Cleanup pagination for a specific type
 * @param {string} type - Catalog type key
 */
function cleanupPaginationType(type) {
    if (paginationState[type] && paginationState[type].observer) {
        paginationState[type].observer.disconnect();
        paginationState[type].observer = null;
    }
}

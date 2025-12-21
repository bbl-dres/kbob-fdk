/**
 * KBOB Fachdatenkatalog - Router
 * Main routing and view control functions
 */

/**
 * Main router function
 */
function router() {
    if (!isDataLoaded) return;

    // Scroll to top when navigating to a new page
    window.scrollTo(0, 0);

    const { route, id, tags, searchQuery, category } = parseHashWithParams();

    // Update nav active states
    document.querySelectorAll('.main-nav .nav-link:not(.disabled)').forEach(link => {
        const linkRoute = link.getAttribute('data-route');
        let isActive = false;
        if (route === 'element') {
            isActive = (linkRoute === 'elements');
        } else if (route === 'document') {
            isActive = (linkRoute === 'documents');
        } else if (route === 'usecase') {
            isActive = (linkRoute === 'usecases');
        } else if (route === 'model') {
            isActive = (linkRoute === 'models');
        } else if (route === 'epd') {
            isActive = (linkRoute === 'epds');
        } else {
            isActive = (linkRoute === route);
        }
        link.classList.toggle('active', isActive);
    });

    // Update breadcrumbs
    let itemTitle = null;
    if (id) {
        if (route === 'element') {
            const item = globalElementsData.find(e => e.id === id);
            itemTitle = item ? item.title : null;
        } else if (route === 'document') {
            const item = globalDocumentsData.find(d => d.id === id);
            itemTitle = item ? item.title : null;
        } else if (route === 'usecase') {
            const item = globalUsecasesData.find(u => u.id === id);
            itemTitle = item ? item.title : null;
        } else if (route === 'model') {
            const item = globalModelsData.find(m => m.id === id);
            itemTitle = item ? item.title : null;
        } else if (route === 'epd') {
            const item = globalEpdsData.find(e => e.id === id);
            itemTitle = item ? item.title : null;
        }
    }
    updateBreadcrumbs(route, id, itemTitle);

    contentArea.classList.remove('white-bg');

    switch (route) {
        case 'home': renderHomePage(); break;
        case 'search': renderSearchResultsPage(searchQuery); break;
        case 'elements': renderCatalogPage(tags, category); break;
        case 'documents': renderDocumentsCatalogPage(tags, category); break;
        case 'usecases': renderUsecasesCatalogPage(tags, category); break;
        case 'models': renderModelsCatalogPage(tags, category); break;
        case 'epds': renderEpdsCatalogPage(tags, category); break;
        case 'handbook': renderHandbookPage(); break;
        case 'api-docs':
            contentArea.classList.add('white-bg');
            renderApiDocsPage();
            break;
        case 'element':
            if (id) {
                contentArea.classList.add('white-bg');
                renderElementDetailPage(id, tags);
            } else {
                navigateWithTags('elements');
            }
            break;
        case 'document':
            if (id) {
                contentArea.classList.add('white-bg');
                renderDocumentDetailPage(id, tags, category);
            } else {
                navigateWithTags('documents');
            }
            break;
        case 'usecase':
            if (id) {
                contentArea.classList.add('white-bg');
                renderUsecaseDetailPage(id, tags, category);
            } else {
                navigateWithTags('usecases');
            }
            break;
        case 'model':
            if (id) {
                contentArea.classList.add('white-bg');
                renderModelDetailPage(id, tags, category);
            } else {
                navigateWithTags('models');
            }
            break;
        case 'epd':
            if (id) {
                contentArea.classList.add('white-bg');
                renderEpdDetailPage(id, tags, category);
            } else {
                navigateWithTags('epds');
            }
            break;
        default: navigateWithTags('home');
    }

    // Initialize Lucide icons after rendering
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/**
 * Switch view mode (grid/list)
 * @param {string} view - View mode ('grid' or 'list')
 */
window.switchView = function(view) {
    const { route, tags, category, phases } = parseHashWithParams();
    window.location.hash = buildHashWithTags(route, tags, category, phases, view);
}

/**
 * Toggle filter visibility for a specific type
 * Uses catalogTypeConfig from renderers.js for configuration
 * @param {string} type - Filter type
 */
window.toggleFilter = function(type = 'elements') {
    const config = catalogTypeConfig[type];
    if (config) {
        config.setFilterVisible(!config.getFilterVisible());
        renderGenericCatalogPage(type, getActiveTagsFromURL(), getActiveCategoryFromURL());
    }
}

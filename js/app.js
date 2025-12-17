/**
 * KBOB Fachdatenkatalog - Main Application
 * Initialization and data loading
 */

/**
 * Initialize the application
 */
async function initApp() {
    try {
        // Load all data in parallel
        const [elementsResponse, documentsResponse, usecasesResponse, modelsResponse, epdsResponse] = await Promise.all([
            fetch('data/elements.json'),
            fetch('data/documents.json'),
            fetch('data/usecases.json'),
            fetch('data/models.json'),
            fetch('data/epds.json')
        ]);

        if (!elementsResponse.ok) throw new Error(`Elements: HTTP error! status: ${elementsResponse.status}`);
        if (!documentsResponse.ok) throw new Error(`Documents: HTTP error! status: ${documentsResponse.status}`);
        if (!usecasesResponse.ok) throw new Error(`Usecases: HTTP error! status: ${usecasesResponse.status}`);
        if (!modelsResponse.ok) throw new Error(`Models: HTTP error! status: ${modelsResponse.status}`);
        if (!epdsResponse.ok) throw new Error(`EPDs: HTTP error! status: ${epdsResponse.status}`);

        globalElementsData = await elementsResponse.json();
        globalDocumentsData = await documentsResponse.json();
        globalUsecasesData = await usecasesResponse.json();
        globalModelsData = await modelsResponse.json();
        globalEpdsData = await epdsResponse.json();

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
                <p>Konnte JSON-Dateien nicht laden.</p>
                <br><span class="error-detail">${error.message}</span>
            </div>`;
        lucide.createIcons();
    }
}

/**
 * Setup nav links to preserve tags when switching tabs
 */
function setupNavLinks() {
    document.querySelectorAll('.main-nav .nav-link:not(.disabled)').forEach(link => {
        link.addEventListener('click', (e) => {
            const route = link.getAttribute('data-route');
            if (route) {
                e.preventDefault();
                navigateWithTags(route);
            }
        });
    });
}

/**
 * DOM Content Loaded event handler
 */
window.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons for loading state
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    initLanguageDropdown();
    initApp();
});

/**
 * KBOB Fachdatenkatalog - Swagger UI Page
 * API documentation with embedded Swagger UI
 */

/**
 * Render the API documentation page with Swagger UI
 */
function renderApiDocsPage() {
    const backLink = '#handbook';

    contentArea.innerHTML = `
        <section class="detail-hero">
            <div class="container detail-hero__inner">
                <div class="hero-content">
                    <div class="breadcrumb">
                        <a href="${backLink}">
                            <i data-lucide="arrow-left" style="vertical-align: text-bottom; margin-right:5px; width: 1.1rem; height: 1.1rem;"></i>
                            Zurück zu Handbuch & Downloads
                        </a>
                    </div>
                    <h1 class="hero-title">REST API Dokumentation</h1>
                    <p class="hero-subtitle">Öffentliche API für den programmatischen Zugriff auf den KBOB Fachdatenkatalog. Keine Authentifizierung erforderlich.</p>
                </div>
                <div class="hero-image-container">
                    <img src="assets/img/api/rest.jpg" alt="REST API Dokumentation">
                </div>
            </div>
        </section>

        <div class="container">
            <div class="detail-layout detail-layout--full">
                <div class="detail-content-area">
                    <div id="swagger-container" class="detail-section">
                        <h2>API Explorer</h2>
                        <div id="swagger-ui"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize Swagger UI
    initSwaggerUI();
}

// Track if we're on the API docs page
let isOnApiDocsPage = false;
let swaggerHashListener = null;

/**
 * Initialize Swagger UI with the OpenAPI specification from edge function
 */
function initSwaggerUI() {
    if (typeof SwaggerUIBundle === 'undefined') {
        console.error('SwaggerUIBundle not loaded');
        document.getElementById('swagger-ui').innerHTML = `
            <div class="error-state">
                <i data-lucide="alert-triangle"></i>
                <p>Swagger UI konnte nicht geladen werden. Bitte laden Sie die Seite neu.</p>
            </div>
        `;
        return;
    }

    isOnApiDocsPage = true;

    // Remove previous listener if exists
    if (swaggerHashListener) {
        window.removeEventListener('hashchange', swaggerHashListener);
    }

    // Listen for hash changes from Swagger UI and prefix with api-docs/
    swaggerHashListener = function(e) {
        if (!isOnApiDocsPage) return;

        const hash = window.location.hash;

        // If hash is just #/ or empty, set it to #api-docs
        if (hash === '#/' || hash === '#') {
            history.replaceState(null, '', '#api-docs');
            return;
        }

        // If hash starts with #/ but not #/api-docs, prefix it
        if (hash.startsWith('#/') && !hash.startsWith('#/api-docs')) {
            const swaggerPath = hash.slice(2); // Remove #/
            history.replaceState(null, '', '#api-docs/' + swaggerPath);
        }
    };

    window.addEventListener('hashchange', swaggerHashListener);

    // Extract Swagger path from current URL if we're loading with a deep link
    let initialHash = window.location.hash;
    if (initialHash.startsWith('#api-docs/')) {
        // Convert #api-docs/elements/get_elements to #/elements/get_elements for Swagger
        const swaggerPath = initialHash.slice(9); // Remove #api-docs
        history.replaceState(null, '', '#/' + swaggerPath.slice(1)); // Set to #/xxx for Swagger to pick up
    }

    // Get API URL from config
    const apiUrl = (typeof CONFIG !== 'undefined' && CONFIG.apiUrl)
        ? CONFIG.apiUrl
        : 'https://sdomjwahhqrlyqyfyyeo.supabase.co/functions/v1/kbob-api';

    // Use StandaloneLayout if preset is available, otherwise fall back to BaseLayout
    const useStandalone = typeof SwaggerUIStandalonePreset !== 'undefined';

    SwaggerUIBundle({
        url: apiUrl,
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: useStandalone
            ? [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset]
            : [SwaggerUIBundle.presets.apis],
        layout: useStandalone ? 'StandaloneLayout' : 'BaseLayout',
        defaultModelsExpandDepth: 1,
        defaultModelExpandDepth: 1,
        docExpansion: 'list',
        filter: true,
        tryItOutEnabled: true,
        // After Swagger loads, restore the api-docs prefix
        onComplete: () => {
            const hash = window.location.hash;
            if (hash.startsWith('#/') && !hash.startsWith('#/api-docs')) {
                const swaggerPath = hash.slice(2);
                if (swaggerPath) {
                    history.replaceState(null, '', '#api-docs/' + swaggerPath);
                } else {
                    history.replaceState(null, '', '#api-docs');
                }
            }
        }
    });
}

/**
 * Clean up when leaving the API docs page
 */
function cleanupSwaggerUI() {
    isOnApiDocsPage = false;
}

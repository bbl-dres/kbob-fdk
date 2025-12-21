/**
 * KBOB Fachdatenkatalog - Swagger UI Page
 * API documentation with embedded Swagger UI
 */

/**
 * Get the Supabase anon key from CONFIG or fallback
 * @returns {string} The API key
 */
function getSupabaseAnonKey() {
    // Try to get from CONFIG (loaded from config.js)
    if (typeof CONFIG !== 'undefined' && CONFIG.supabase && CONFIG.supabase.anonKey && CONFIG.supabase.anonKey !== 'YOUR_SUPABASE_ANON_KEY') {
        return CONFIG.supabase.anonKey;
    }
    // Return empty string if no valid key - user will need to use Authorize button
    return '';
}

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
                    <p class="hero-subtitle">Interaktive API-Dokumentation für den programmatischen Zugriff auf den KBOB Fachdatenkatalog. Die API basiert auf PostgREST und ermöglicht lesenden Zugriff auf alle Katalogdaten.</p>
                </div>
                <div class="hero-image-container">
                    <img src="assets/img/api/rest.jpg" alt="REST API Dokumentation">
                </div>
            </div>
        </section>

        <div class="container">
            <div class="detail-layout detail-layout--full">
                <div class="detail-content-area">
                    <div id="api-info" class="detail-section">
                        <h2>Übersicht</h2>
                        <p>Die KBOB Fachdatenkatalog API bietet programmatischen Zugriff auf alle Katalogdaten. Sie können Elemente, Dokumente, Anwendungsfälle, Fachmodelle und Ökobilanzdaten abfragen.</p>

                        <div class="api-info-cards">
                            <div class="api-info-card">
                                <i data-lucide="server" class="api-info-card__icon"></i>
                                <div class="api-info-card__content">
                                    <h3>Base URL</h3>
                                    <code>https://sdomjwahhqrlyqyfyyeo.supabase.co/rest/v1</code>
                                </div>
                            </div>
                            <div class="api-info-card">
                                <i data-lucide="shield-check" class="api-info-card__icon"></i>
                                <div class="api-info-card__content">
                                    <h3>Authentifizierung</h3>
                                    <span>Klicken Sie auf <strong>"Authorize"</strong> im API Explorer und geben Sie Ihren Supabase API-Key ein</span>
                                </div>
                            </div>
                            <div class="api-info-card">
                                <i data-lucide="file-json" class="api-info-card__icon"></i>
                                <div class="api-info-card__content">
                                    <h3>Format</h3>
                                    <span>JSON, CSV</span>
                                </div>
                            </div>
                        </div>

                        <div class="api-auth-info" style="margin-top: 1.5rem; padding: 1rem; background: var(--color-surface-secondary, #f5f5f5); border-radius: 8px; border-left: 4px solid var(--color-primary, #d32f2f);">
                            <h4 style="margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
                                <i data-lucide="key" style="width: 1.2rem; height: 1.2rem;"></i>
                                API-Authentifizierung erforderlich
                            </h4>
                            <p style="margin: 0 0 0.5rem 0;">Um die API zu testen, benötigen Sie einen Supabase API-Key. Fügen Sie diesen in beide Felder im "Authorize"-Dialog ein:</p>
                            <ul style="margin: 0; padding-left: 1.5rem;">
                                <li><strong>ApiKeyAuth:</strong> Ihr API-Key</li>
                                <li><strong>BearerAuth:</strong> Bearer [Ihr API-Key]</li>
                            </ul>
                        </div>
                    </div>

                    <div id="swagger-container" class="detail-section">
                        <h2>API Explorer</h2>
                        <p>Testen Sie die API-Endpunkte direkt in Ihrem Browser. Der API-Key wird automatisch mitgesendet.</p>
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
 * Enhance the OpenAPI spec at runtime for Supabase compatibility
 * This fixes issues with the auto-generated spec from Supabase:
 * - Removes :443 from host (causes CORS issues)
 * - Sets correct basePath for Supabase REST API
 * - Adds security definitions for the Authorize button
 * @param {Object} spec - The OpenAPI specification object
 * @returns {Object} The modified specification
 */
function enhanceOpenAPISpec(spec) {
    // Fix host - remove port 443 which causes CORS issues
    if (spec.host && spec.host.endsWith(':443')) {
        spec.host = spec.host.replace(':443', '');
    }

    // Fix basePath - Supabase REST API is at /rest/v1
    spec.basePath = '/rest/v1';

    // Add security definitions for Supabase authentication
    spec.securityDefinitions = {
        ApiKeyAuth: {
            'type': 'apiKey',
            'in': 'header',
            'name': 'apikey',
            'description': 'Supabase API Key (anon key for public read access)'
        },
        BearerAuth: {
            'type': 'apiKey',
            'in': 'header',
            'name': 'Authorization',
            'description': "Bearer token (use 'Bearer <your-api-key>')"
        }
    };

    // Apply security globally to all endpoints
    spec.security = [
        { ApiKeyAuth: [] },
        { BearerAuth: [] }
    ];

    return spec;
}

/**
 * Initialize Swagger UI with the OpenAPI specification
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
        // Swagger sets hashes like #/elements/get_elements or #/
        // We want to prefix with api-docs: #api-docs/elements/get_elements

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

    // Fetch the OpenAPI spec and add security definitions at runtime
    fetch('data/openapi.json')
        .then(response => response.json())
        .then(spec => {
            // Enhance the spec for Supabase compatibility
            const enhancedSpec = enhanceOpenAPISpec(spec);

            // Debug: log the enhanced spec
            console.log('Enhanced OpenAPI spec:', enhancedSpec);
            console.log('SwaggerUIStandalonePreset available:', typeof SwaggerUIStandalonePreset);

            // Use StandaloneLayout if preset is available, otherwise fall back to BaseLayout
            const useStandalone = typeof SwaggerUIStandalonePreset !== 'undefined';

            SwaggerUIBundle({
                spec: enhancedSpec,
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
                // Inject the API key header into all requests (if available from CONFIG)
                requestInterceptor: (request) => {
                    const apiKey = getSupabaseAnonKey();
                    if (apiKey) {
                        // Only set headers if we have a valid API key from CONFIG
                        // Otherwise, rely on the Authorize button for authentication
                        if (!request.headers['apikey']) {
                            request.headers['apikey'] = apiKey;
                        }
                        if (!request.headers['Authorization']) {
                            request.headers['Authorization'] = `Bearer ${apiKey}`;
                        }
                    }
                    return request;
                },
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
        })
        .catch(error => {
            console.error('Failed to load OpenAPI spec:', error);
            document.getElementById('swagger-ui').innerHTML = `
                <div class="error-state">
                    <i data-lucide="alert-triangle"></i>
                    <p>OpenAPI-Spezifikation konnte nicht geladen werden. Bitte laden Sie die Seite neu.</p>
                </div>
            `;
        });
}

/**
 * Clean up when leaving the API docs page
 */
function cleanupSwaggerUI() {
    isOnApiDocsPage = false;
}

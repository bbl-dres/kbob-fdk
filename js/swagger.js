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
                    <p class="hero-subtitle">Interaktive API-Dokumentation für den programmatischen Zugriff auf den KBOB Fachdatenkatalog. Die API basiert auf PostgREST und ermöglicht lesenden Zugriff auf alle Katalogdaten.</p>
                    <div class="hero-tags">
                        <span class="tag">OpenAPI</span>
                        <span class="tag">REST</span>
                        <span class="tag">JSON</span>
                    </div>
                </div>
                <div class="hero-image-container">
                    <i data-lucide="code-2" class="hero-image-placeholder icon--4xl"></i>
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
                                    <code>https://sdomjwahhqrlyqyfyyeo.supabase.co</code>
                                </div>
                            </div>
                            <div class="api-info-card">
                                <i data-lucide="shield-check" class="api-info-card__icon"></i>
                                <div class="api-info-card__content">
                                    <h3>Authentifizierung</h3>
                                    <span>Öffentlicher Lesezugriff (anon key)</span>
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
                    </div>

                    <div id="swagger-container" class="detail-section">
                        <h2>API Explorer</h2>
                        <p>Testen Sie die API-Endpunkte direkt in Ihrem Browser.</p>
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

    SwaggerUIBundle({
        url: 'data/openapi.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
        layout: 'BaseLayout',
        defaultModelsExpandDepth: 1,
        defaultModelExpandDepth: 1,
        docExpansion: 'list',
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
        tryItOutEnabled: false,
        supportedSubmitMethods: []
    });
}

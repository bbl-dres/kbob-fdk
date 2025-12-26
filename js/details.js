/**
 * KBOB Fachdatenkatalog - Detail Page Renderers
 * All detail page rendering functions
 */

// ============================================
// ELEMENT DETAIL PAGE
// ============================================

function renderElementDetailPage(id, activeTags = []) {
    // Use O(1) lookup instead of O(n) .find()
    const data = getItemById('elements', id);
    if (!data) {
        contentArea.innerHTML = '<div class="container error-state">Element nicht gefunden.</div>';
        return;
    }

    // Escape main content - support both legacy and new i18n fields
    const safeTitle = escapeHtml(data.name ? t(data.name) : data.title || '');
    const safeDesc = escapeHtml(data.description ? t(data.description) : 'Ein Standard-Element des KBOB Datenkatalogs.');
    const safeImage = escapeHtml(data.image || '');

    // Derive phases from geometry, information, and documentation arrays
    // Use optional chaining for defensive access
    const derivedPhases = new Set();
    (data.geometry || []).forEach(item => {
        item?.phases?.forEach(p => derivedPhases.add(p));
    });
    (data.information || []).forEach(item => {
        item?.phases?.forEach(p => derivedPhases.add(p));
    });
    (data.documentation || []).forEach(item => {
        item?.phases?.forEach(p => derivedPhases.add(p));
    });
    const elementPhases = Array.from(derivedPhases).sort((a, b) => a - b);
    const hasPhases = elementPhases.length > 0;

    // Find linked use cases (usecases that might be relevant to this element)
    const linkedUsecases = globalUsecasesData ? globalUsecasesData.filter(uc => {
        // Check if usecase phases overlap with element phases
        if (uc.phases && Array.isArray(uc.phases) && elementPhases.length > 0) {
            return uc.phases.some(p => elementPhases.includes(p));
        }
        return false;
    }) : [];

    const sidebarLinks = [
        { id: 'metadaten', text: 'Metadaten' },
        { id: 'phasen', text: 'Phasen' },
        { id: 'klassifizierung', text: 'Klassifizierung' },
        { id: 'ifc', text: 'IFC-Klasse' },
        { id: 'geometrie', text: 'Geometrie' },
        { id: 'informationen', text: 'Informationen' },
        { id: 'dokumentation', text: 'Dokumente' },
        { id: 'anwendungsfaelle', text: 'Anwendungsfälle' }
    ].map(link => `<a href="#${link.id}" class="sidebar-link" data-target="${link.id}">${link.text}</a>`).join('');

    // Build classification rows - support both legacy 'classifications' object and new 'related_classifications' array
    let classRows = '';
    if (data.related_classifications && Array.isArray(data.related_classifications) && data.related_classifications.length > 0) {
        // New schema: look up classifications by ID
        const classificationsBySystem = new Map();
        data.related_classifications.forEach(ref => {
            const clf = getItemById('classifications', ref.id);
            if (clf) {
                const system = clf.system;
                if (!classificationsBySystem.has(system)) {
                    classificationsBySystem.set(system, []);
                }
                const clfName = clf.name ? t(clf.name) : '';
                classificationsBySystem.get(system).push(`${clf.code} – ${clfName}`);
            }
        });
        if (classificationsBySystem.size > 0) {
            classRows = Array.from(classificationsBySystem.entries())
                .map(([system, codes]) => `<tr><td class="col-val">${escapeHtml(system)}</td><td class="col-val">${codes.map(c => escapeHtml(c)).join('<br>')}</td></tr>`)
                .join('');
        } else {
            classRows = '<tr><td colspan="2">Keine Klassifizierung verfügbar</td></tr>';
        }
    } else if (data.classifications && typeof data.classifications === 'object' && !Array.isArray(data.classifications)) {
        // Legacy schema: direct object with system keys
        classRows = Object.entries(data.classifications)
            .map(([system, values]) => `<tr><td class="col-val">${escapeHtml(system)}</td><td class="col-val">${Array.isArray(values) ? values.map(v => escapeHtml(v)).join('<br>') : escapeHtml(values)}</td></tr>`)
            .join('');
    } else {
        classRows = '<tr><td colspan="2">Keine Klassifizierung verfügbar</td></tr>';
    }

    // Support both legacy 'ifcMapping' and new 'tool_elements' field
    const toolElements = data.tool_elements || data.ifcMapping || [];
    const ifcRows = toolElements.length > 0
        ? toolElements.map(m => {
            // Support both legacy string and new i18n object for element name
            const elementName = m.element ? (typeof m.element === 'object' ? t(m.element) : m.element) : '-';
            return `
            <tr>
                <td class="col-val">${escapeHtml(elementName)}</td>
                <td class="col-val">${escapeHtml(m.ifc || '-')}</td>
                <td class="col-val">${escapeHtml(m.revit || '-')}</td>
            </tr>`;
        }).join('')
        : '<tr><td colspan="3">-</td></tr>';

    // Support both legacy string and new i18n object for geometry name/desc
    const geomRows = data.geometry && Array.isArray(data.geometry) ? data.geometry : [];
    const geomRowsHtml = geomRows.length > 0
        ? geomRows.map(row => {
            const rowName = row.name ? (typeof row.name === 'object' ? t(row.name) : row.name) : '-';
            const rowDesc = row.desc ? (typeof row.desc === 'object' ? t(row.desc) : row.desc) : '-';
            return `
            <tr>
                <td class="col-val">${escapeHtml(rowName)}</td>
                <td class="col-val">${escapeHtml(rowDesc)}</td>
                <td class="col-val">${renderPhaseBadges(row.phases)}</td>
            </tr>`;
        }).join('')
        : '<tr><td colspan="3" class="col-val empty-text">Keine Daten.</td></tr>';

    // Support both legacy 'information' array and new 'related_attributes' array
    let infoRowsHtml = '';
    if (data.related_attributes && Array.isArray(data.related_attributes) && data.related_attributes.length > 0) {
        // New schema: look up attributes by ID
        infoRowsHtml = data.related_attributes.map(ref => {
            const attr = getItemById('attributes', ref.id);
            if (attr) {
                const attrName = attr.name ? t(attr.name) : '';
                const attrDesc = attr.description ? t(attr.description) : '';
                const ifcMapping = attr.ifc_pset && attr.ifc_property
                    ? `${attr.ifc_pset}.${attr.ifc_property}`
                    : (attr.ifc_pset || '-');
                return `
                <tr>
                    <td class="col-val"><span class="info-name-tooltip" title="${escapeHtml(attrDesc)}">${escapeHtml(attrName)}</span></td>
                    <td class="col-val">${escapeHtml(attr.data_type || '-')}</td>
                    <td class="col-center">-</td>
                    <td class="col-val">${escapeHtml(ifcMapping)}</td>
                    <td class="col-val">${renderPhaseBadges(ref.phases)}</td>
                </tr>`;
            }
            return '';
        }).filter(Boolean).join('');
        if (!infoRowsHtml) {
            infoRowsHtml = '<tr><td colspan="5" class="col-val empty-text">Keine Attribute (LOI).</td></tr>';
        }
    } else if (data.information && Array.isArray(data.information) && data.information.length > 0) {
        // Legacy schema: direct information array
        infoRowsHtml = data.information.map(row => `
            <tr>
                <td class="col-val"><span class="info-name-tooltip" title="${escapeHtml(row.desc || '')}">${escapeHtml(row.name || '')}</span></td>
                <td class="col-val">${escapeHtml(row.format || '-')}</td>
                <td class="col-center">${row.list ? '<i data-lucide="circle-check" class="list-icon-active"></i>' : '-'}</td>
                <td class="col-val">${escapeHtml(row.ifc || '-')}</td>
                <td class="col-val">${renderPhaseBadges(row.phases)}</td>
            </tr>`).join('');
    } else {
        infoRowsHtml = '<tr><td colspan="5" class="col-val empty-text">Keine Attribute (LOI).</td></tr>';
    }

    // Support both legacy string and new i18n object for documentation name/desc
    const docRows = data.documentation && Array.isArray(data.documentation) ? data.documentation : [];
    const docRowsHtml = docRows.length > 0
        ? docRows.map(row => {
            const rowName = row.name ? (typeof row.name === 'object' ? t(row.name) : row.name) : '-';
            const rowDesc = row.desc ? (typeof row.desc === 'object' ? t(row.desc) : row.desc) : '-';
            return `
            <tr>
                <td class="col-val">${escapeHtml(rowName)}</td>
                <td class="col-val">${escapeHtml(rowDesc)}</td>
                <td class="col-val">${renderPhaseBadges(row.phases)}</td>
            </tr>`;
        }).join('')
        : '<tr><td colspan="3" class="col-val empty-text">Keine Dokumente.</td></tr>';

    // Build phases HTML (similar to usecase detail)
    const allPhases = Object.keys(phaseLabels).map(Number).sort((a, b) => a - b);
    const phasesHtml = allPhases.map(p => {
        const isActive = elementPhases.includes(p);
        return `<span class="phase-badge ${isActive ? 'active' : 'inactive'}" title="Phase ${p}">${phaseLabels[p]}</span>`;
    }).join('');

    const backLink = buildHashWithTags('elements', activeTags, '', [], getActiveViewFromURL());

    contentArea.innerHTML = `
        <section class="detail-hero">
            <div class="container detail-hero__inner">
                <div class="hero-content">
                    <div class="breadcrumb"><a href="#${backLink}"><i data-lucide="arrow-left" style="vertical-align: text-bottom; margin-right:5px; width: 1.1rem; height: 1.1rem;"></i> Zurück zur Liste</a></div>
                    <h1 class="hero-title">${safeTitle}</h1>
                    <p class="hero-subtitle">${safeDesc}</p>
                    <div class="hero-tags">${renderTagsHtml(data.tags, activeTags)}</div>
                </div>
                <div class="hero-image-container">
                    ${safeImage ? `<img src="${safeImage}" alt="${safeTitle}">` : '<i data-lucide="image" class="hero-image-placeholder icon--4xl"></i>'}
                </div>
            </div>
        </section>

        <div class="container">
            <div class="detail-layout">
                <aside class="detail-sidebar"><nav class="sticky-nav">${sidebarLinks}</nav></aside>
                <div class="detail-content-area">
                    ${renderMetadataTable(data, 'Element', data.name ? t(data.name) : data.title)}

                    ${hasPhases ? `
                    <div id="phasen" class="detail-section">
                        <h2>Projekt-/Lebenszyklusphasen</h2>
                        <p>Relevante Projektphasen für dieses Element.</p>
                        <div class="phases-container phases-container--large">${phasesHtml}</div>
                    </div>` : ''}

                    <div id="klassifizierung" class="detail-section">
                        <h2>Klassifizierung</h2>
                        <table class="data-table">
                            <thead><tr><th class="th-w-20">Klassifizierung</th><th>Nummer - Beschreibung</th></tr></thead>
                            <tbody>${classRows}</tbody>
                        </table>
                    </div>

                    <div id="ifc" class="detail-section">
                        <h2>IFC-Klasse</h2>
                        <table class="data-table">
                            <thead><tr><th class="th-w-20">Element</th><th>IFC 4.3</th><th>Revit ENG</th></tr></thead>
                            <tbody>${ifcRows}</tbody>
                        </table>
                    </div>

                    <div id="geometrie" class="detail-section">
                        <h2>Geometrie</h2>
                        <table class="data-table">
                            <thead><tr><th class="th-w-20">Element</th><th>Beschreibung</th><th class="th-w-phases">Phasen (1-5)</th></tr></thead>
                            <tbody>${geomRowsHtml}</tbody>
                        </table>
                    </div>

                    <div id="informationen" class="detail-section">
                        <h2>Informationen</h2>
                        <table class="data-table">
                            <thead><tr>
                                <th class="th-w-20">Name</th>
                                <th class="th-w-format">Format</th>
                                <th class="th-w-list">Liste</th>
                                <th>IFC Mapping</th>
                                <th class="th-w-phases">Phasen (1-5)</th>
                            </tr></thead>
                            <tbody>${infoRowsHtml}</tbody>
                        </table>
                    </div>

                    <div id="dokumentation" class="detail-section">
                        <h2>Dokumente</h2>
                        <table class="data-table">
                            <thead><tr><th class="th-w-20">Dokumententyp</th><th>Beschreibung</th><th class="th-w-phases">Phasen (1-5)</th></tr></thead>
                            <tbody>${docRowsHtml}</tbody>
                        </table>
                    </div>

                    <div id="anwendungsfaelle" class="detail-section">
                        <h2>Anwendungsfälle</h2>
                        <div class="info-box info-box--inline">
                            <i data-lucide="construction" class="info-box__icon"></i>
                            <div>
                                <p class="info-box__text">Diese Funktion wird derzeit entwickelt. Hier werden zukünftig verknüpfte Anwendungsfälle angezeigt.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    setupDetailInteractions();
}

// ============================================
// PLACEHOLDER DETAIL PAGE CONFIGURATION
// ============================================

/**
 * Configuration for placeholder detail pages (documents, models, epds)
 */
const placeholderDetailConfig = {
    documents: {
        getData: () => globalDocumentsData,
        backRoute: 'documents',
        icon: 'file-text',
        notFoundText: 'Dokument nicht gefunden. Detail-Seite für Dokumente ist noch in Entwicklung.',
        defaultDescription: 'Ein Dokument des KBOB Datenkatalogs.',
        infoBoxText: 'Die Detail-Ansicht für Dokumente wird derzeit entwickelt.'
    },
    models: {
        getData: () => globalModelsData,
        backRoute: 'models',
        icon: 'boxes',
        notFoundText: 'Fachmodell nicht gefunden.',
        defaultDescription: 'Ein Fachmodell des KBOB Datenkatalogs.',
        infoBoxText: 'Die Detail-Ansicht für Fachmodelle wird derzeit entwickelt.'
    },
    epds: {
        getData: () => globalEpdsData,
        backRoute: 'epds',
        icon: 'leaf',
        notFoundText: 'Ökobilanzdaten nicht gefunden.',
        defaultDescription: 'Ein Ökobilanzdatensatz des KBOB Datenkatalogs.',
        infoBoxText: 'Die Detail-Ansicht für Ökobilanzdaten wird derzeit entwickelt.'
    }
};

// ============================================
// GENERIC PLACEHOLDER DETAIL PAGE
// ============================================

/**
 * Generic renderer for placeholder detail pages
 * @param {string} type - Placeholder type key (documents, models, epds)
 * @param {string} id - Item ID
 * @param {string[]} activeTags - Active tag filters
 * @param {string} activeCategory - Active category filter
 */
function renderPlaceholderDetailPage(type, id, activeTags = [], activeCategory = '') {
    const config = placeholderDetailConfig[type];
    if (!config) {
        contentArea.innerHTML = '<div class="container error-state">Unbekannter Seitentyp.</div>';
        return;
    }

    // Use O(1) lookup instead of O(n) .find()
    const data = getItemById(type, id);
    if (!data) {
        contentArea.innerHTML = `<div class="container error-state">${escapeHtml(config.notFoundText)}</div>`;
        return;
    }

    // Escape main content
    const safeTitle = escapeHtml(data.title || '');
    const safeDesc = escapeHtml(data.description || config.defaultDescription);
    const safeImage = escapeHtml(data.image || '');

    const backLink = buildHashWithTags(config.backRoute, activeTags, activeCategory, [], getActiveViewFromURL());

    contentArea.innerHTML = `
        <section class="detail-hero">
            <div class="container detail-hero__inner">
                <div class="hero-content">
                    <div class="breadcrumb"><a href="#${backLink}"><i data-lucide="arrow-left" style="vertical-align: text-bottom; margin-right:5px; width: 1.1rem; height: 1.1rem;"></i> Zurück zur Liste</a></div>
                    <h1 class="hero-title">${safeTitle}</h1>
                    <p class="hero-subtitle">${safeDesc}</p>
                    <div class="hero-tags">${renderTagsHtml(data.tags, activeTags)}</div>
                </div>
                <div class="hero-image-container">
                    ${safeImage ? `<img src="${safeImage}" alt="${safeTitle}">` : `<i data-lucide="${config.icon}" class="hero-image-placeholder icon--4xl"></i>`}
                </div>
            </div>
        </section>
        <div class="container">
            <div class="info-box info-box--centered">
                <i data-lucide="hard-hat" class="info-box__icon icon--4xl"></i>
                <h2 class="info-box__title">In Entwicklung</h2>
                <p class="info-box__text">${escapeHtml(config.infoBoxText)}</p>
            </div>
        </div>`;
}

// ============================================
// DOCUMENT DETAIL PAGE
// ============================================

function renderDocumentDetailPage(id, activeTags = [], activeCategory = '') {
    // Use O(1) lookup instead of O(n) .find()
    const data = getItemById('documents', id);
    if (!data) {
        contentArea.innerHTML = '<div class="container error-state">Dokument nicht gefunden.</div>';
        return;
    }

    // Escape main content - support both legacy and new i18n fields
    const safeTitle = escapeHtml(data.name ? t(data.name) : data.title || '');
    const safeDesc = escapeHtml(data.description ? t(data.description) : 'Ein Dokument des KBOB Datenkatalogs.');
    const safeImage = escapeHtml(data.image || '');

    // Check for phases
    const documentPhases = data.phases && Array.isArray(data.phases) ? data.phases : [];
    const hasPhases = documentPhases.length > 0;

    // Build phases HTML
    const allPhases = Object.keys(phaseLabels).map(Number).sort((a, b) => a - b);
    const phasesHtml = allPhases.map(p => {
        const isActive = documentPhases.includes(p);
        return `<span class="phase-badge ${isActive ? 'active' : 'inactive'}" title="Phase ${p}">${phaseLabels[p]}</span>`;
    }).join('');

    // Build sidebar links
    const sidebarLinks = [
        { id: 'metadaten', text: 'Metadaten' },
        { id: 'phasen', text: 'Phasen' },
        { id: 'klassifizierung', text: 'Klassifizierung' },
        { id: 'details', text: 'Details' },
        { id: 'elemente', text: 'Elemente' },
        { id: 'anwendungsfaelle', text: 'Anwendungsfälle' }
    ].map(link => `<a href="#${link.id}" class="sidebar-link" data-target="${link.id}">${link.text}</a>`).join('');

    // Build classifications table rows - support both legacy 'classifications' object and new 'related_classifications' array
    let classRows = '';
    if (data.related_classifications && Array.isArray(data.related_classifications) && data.related_classifications.length > 0) {
        // New schema: look up classifications by ID
        const classificationsBySystem = new Map();
        data.related_classifications.forEach(ref => {
            const clf = getItemById('classifications', ref.id);
            if (clf) {
                const system = clf.system;
                if (!classificationsBySystem.has(system)) {
                    classificationsBySystem.set(system, []);
                }
                const clfName = clf.name ? t(clf.name) : '';
                classificationsBySystem.get(system).push(`${clf.code} – ${clfName}`);
            }
        });
        if (classificationsBySystem.size > 0) {
            classRows = Array.from(classificationsBySystem.entries())
                .map(([system, codes]) => `<tr><td class="col-val">${escapeHtml(system)}</td><td class="col-val">${codes.map(c => escapeHtml(c)).join('<br>')}</td></tr>`)
                .join('');
        } else {
            classRows = '<tr><td colspan="2" class="col-val empty-text">Keine Klassifizierung verfügbar</td></tr>';
        }
    } else if (data.classifications && typeof data.classifications === 'object' && !Array.isArray(data.classifications)) {
        // Legacy schema: direct object with system keys
        classRows = Object.entries(data.classifications)
            .map(([system, values]) => `<tr><td class="col-val">${escapeHtml(system)}</td><td class="col-val">${Array.isArray(values) ? values.map(v => escapeHtml(v)).join('<br>') : escapeHtml(values)}</td></tr>`)
            .join('');
    } else {
        classRows = '<tr><td colspan="2" class="col-val empty-text">Keine Klassifizierung verfügbar</td></tr>';
    }

    // Build details table rows
    const formatsText = data.formats && Array.isArray(data.formats) ? data.formats.join(', ') : '-';

    // Support both legacy string retention and new integer format
    // New schema: 0=indefinitely, null=not specified, >0=years
    let retentionText = '-';
    if (data.retention !== undefined && data.retention !== null) {
        if (typeof data.retention === 'number') {
            // New schema: integer
            if (data.retention === 0) {
                retentionText = 'unbefristet';
            } else {
                retentionText = `${data.retention} Jahre`;
            }
        } else {
            // Legacy schema: string value
            retentionText = data.retention;
        }
    }

    const backLink = buildHashWithTags('documents', activeTags, activeCategory, [], getActiveViewFromURL());

    contentArea.innerHTML = `
        <section class="detail-hero">
            <div class="container detail-hero__inner">
                <div class="hero-content">
                    <div class="breadcrumb"><a href="#${backLink}"><i data-lucide="arrow-left" style="vertical-align: text-bottom; margin-right:5px; width: 1.1rem; height: 1.1rem;"></i> Zurück zur Liste</a></div>
                    <h1 class="hero-title">${safeTitle}</h1>
                    <p class="hero-subtitle">${safeDesc}</p>
                    <div class="hero-tags">${renderTagsHtml(data.tags, activeTags)}</div>
                </div>
                <div class="hero-image-container">
                    ${safeImage ? `<img src="${safeImage}" alt="${safeTitle}">` : '<i data-lucide="file-text" class="hero-image-placeholder icon--4xl"></i>'}
                </div>
            </div>
        </section>

        <div class="container">
            <div class="detail-layout">
                <aside class="detail-sidebar"><nav class="sticky-nav">${sidebarLinks}</nav></aside>
                <div class="detail-content-area">
                    ${renderMetadataTable(data, 'Dokument', data.name ? t(data.name) : data.title)}

                    ${hasPhases ? `
                    <div id="phasen" class="detail-section">
                        <h2>Projekt-/Lebenszyklusphasen</h2>
                        <p>Relevante Projektphasen für dieses Dokument.</p>
                        <div class="phases-container phases-container--large">${phasesHtml}</div>
                    </div>` : ''}

                    <div id="klassifizierung" class="detail-section">
                        <h2>Klassifizierung</h2>
                        <table class="data-table">
                            <thead><tr><th class="th-w-20">Klassifizierung</th><th>Nummer - Beschreibung</th></tr></thead>
                            <tbody>${classRows}</tbody>
                        </table>
                    </div>

                    <div id="details" class="detail-section">
                        <h2>Details</h2>
                        <table class="data-table">
                            <thead><tr><th class="th-w-20">Attribut</th><th>Wert</th></tr></thead>
                            <tbody>
                                <tr><td class="col-val">Formate</td><td class="col-val">${escapeHtml(formatsText)}</td></tr>
                                <tr><td class="col-val">Aufbewahrung</td><td class="col-val">${escapeHtml(retentionText)}</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div id="elemente" class="detail-section">
                        <h2>Elemente</h2>
                        <div class="info-box info-box--inline">
                            <i data-lucide="construction" class="info-box__icon"></i>
                            <div>
                                <p class="info-box__text">Diese Funktion wird derzeit entwickelt. Hier werden zukünftig verknüpfte Elemente angezeigt.</p>
                            </div>
                        </div>
                    </div>

                    <div id="anwendungsfaelle" class="detail-section">
                        <h2>Anwendungsfälle</h2>
                        <div class="info-box info-box--inline">
                            <i data-lucide="construction" class="info-box__icon"></i>
                            <div>
                                <p class="info-box__text">Diese Funktion wird derzeit entwickelt. Hier werden zukünftig verknüpfte Anwendungsfälle angezeigt.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    setupDetailInteractions();
}

// ============================================
// USECASE DETAIL PAGE
// ============================================

/**
 * Helper function to check if data exists and is not empty
 */
function hasData(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string' && value.trim() === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) return false;
    return true;
}

/**
 * Format ISO date (YYYY-MM-DD) to German/Swiss format (DD.MM.YYYY)
 */
function formatDateToGerman(isoDate) {
    if (!isoDate) return '—';
    const parts = isoDate.split('-');
    if (parts.length !== 3) return isoDate;
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
}

/**
 * Render metadata table section
 * Supports both legacy fields (category, lastChange) and new i18n fields (domain, last_change)
 * @param {Object} data - Item data with id, version, lastChange/last_change, category/domain
 * @param {string} entityType - Type of entity (e.g., 'Anwendungsfall', 'Element', etc.)
 * @param {string} title - Name/title of the entity (already localized)
 * @returns {string} HTML for metadata table
 */
function renderMetadataTable(data, entityType, title) {
    const safeEntityType = escapeHtml(entityType || '—');
    const safeTitle = escapeHtml(title || '—');
    // Support both legacy 'category' and new 'domain' field
    const category = data.domain ? t(data.domain) : data.category;
    const safeCategory = escapeHtml(category || '—');
    const safeId = escapeHtml(data.id || '—');
    const safeVersion = escapeHtml(data.version || '—');
    // Support both legacy 'lastChange' and new 'last_change' field
    const dateValue = data.last_change || data.lastChange;
    const formattedDate = formatDateToGerman(dateValue);

    return `
        <div id="metadaten" class="detail-section">
            <h2>Metadaten</h2>
            <table class="data-table">
                <tbody>
                    <tr><td class="col-val metadata-label">Entität</td><td class="col-val">${safeEntityType}</td></tr>
                    <tr><td class="col-val metadata-label">Name</td><td class="col-val">${safeTitle}</td></tr>
                    <tr><td class="col-val metadata-label">Kategorie</td><td class="col-val">${safeCategory}</td></tr>
                    <tr><td class="col-val metadata-label">ID</td><td class="col-val">${safeId}</td></tr>
                    <tr><td class="col-val metadata-label">Version</td><td class="col-val">${safeVersion}</td></tr>
                    <tr><td class="col-val metadata-label">Letzte Änderung</td><td class="col-val">${formattedDate}</td></tr>
                </tbody>
            </table>
        </div>`;
}

function renderUsecaseDetailPage(id, activeTags = [], activeCategory = '') {
    // Use O(1) lookup instead of O(n) .find()
    const data = getItemById('usecases', id);
    if (!data) {
        contentArea.innerHTML = '<div class="container error-state">Anwendungsfall nicht gefunden.</div>';
        return;
    }

    // Escape main content - support both legacy and new i18n fields
    const safeTitle = escapeHtml(data.name ? t(data.name) : data.title || '');
    const safeDesc = escapeHtml(data.description ? t(data.description) : 'Ein Anwendungsfall des KBOB Datenkatalogs.');
    const safeImage = escapeHtml(data.image || '');

    // Helper to get text from potentially i18n value
    const getText = (val) => {
        if (!val) return '';
        if (typeof val === 'object' && !Array.isArray(val)) return t(val);
        return val;
    };

    // Helper to get text from potentially i18n array item
    const getArrayItemText = (arr, index) => {
        if (!arr || !arr[index]) return '';
        return getText(arr[index]);
    };

    // Check if process_url exists in the data (data-driven BPMN path)
    const processUrl = data.process_url || '';
    const hasProcess = !!processUrl;

    const backLink = buildHashWithTags('usecases', activeTags, activeCategory, [], getActiveViewFromURL());

    // Determine which sections have data (for conditional rendering)
    const hasPhases = hasData(data.phases);
    // definition field removed from schema - content now in description
    const hasGoals = hasData(data.goals);
    const hasPrerequisites = hasData(data.prerequisites) && (hasData(data.prerequisites.client) || hasData(data.prerequisites.contractor));
    const hasImplementation = hasData(data.implementation);
    const hasInputsOutputs = hasData(data.inputs) || hasData(data.outputs);
    // practiceExample field removed from schema
    const hasQualityCriteria = hasData(data.quality_criteria);
    const hasRoles = hasData(data.roles);

    // Build sidebar with group labels
    let sidebarHtml = '';

    // Metadaten always first
    sidebarHtml += '<a href="#metadaten" class="sidebar-link" data-target="metadaten">Metadaten</a>';

    // ALLGEMEINER TEIL
    const generalLinks = [];
    if (hasPhases) generalLinks.push({ id: 'phasen', text: 'Phasen' });
    // definition section removed from schema
    if (hasGoals) generalLinks.push({ id: 'nutzen', text: 'Nutzen' });
    if (hasPrerequisites) generalLinks.push({ id: 'voraussetzungen', text: 'Voraussetzungen' });
    if (hasImplementation) generalLinks.push({ id: 'umsetzung', text: 'Umsetzung' });
    if (hasInputsOutputs) generalLinks.push({ id: 'input-output', text: 'Input / Output' });
    // practiceExample section removed from schema

    if (generalLinks.length > 0) {
        sidebarHtml += generalLinks.map(link => `<a href="#${link.id}" class="sidebar-link" data-target="${link.id}">${link.text}</a>`).join('');
    }

    // UMSETZUNGSDETAILS
    const detailLinks = [];
    if (hasQualityCriteria) detailLinks.push({ id: 'qualitaetskriterien', text: 'Qualitätskriterien' });
    if (hasRoles) detailLinks.push({ id: 'beteiligte-akteure', text: 'Beteiligte Akteure' });
    if (hasProcess) detailLinks.push({ id: 'prozess', text: 'Prozess' });

    if (detailLinks.length > 0) {
        sidebarHtml += detailLinks.map(link => `<a href="#${link.id}" class="sidebar-link" data-target="${link.id}">${link.text}</a>`).join('');
    }

    // VERKNÜPFUNGEN (always shown as placeholder)
    sidebarHtml += '<a href="#dokumente" class="sidebar-link" data-target="dokumente">Dokumente</a>';
    sidebarHtml += '<a href="#elemente" class="sidebar-link" data-target="elemente">Elemente</a>';

    // Build phases HTML
    const allPhases = Object.keys(phaseLabels).map(Number).sort((a, b) => a - b);
    const phasesHtml = allPhases.map(p => {
        const isActive = data.phases && data.phases.includes(p);
        return `<span class="phase-badge ${isActive ? 'active' : 'inactive'}" title="Phase ${p}">${phaseLabels[p]}</span>`;
    }).join('');

    // Build goals table HTML - support both legacy strings and i18n objects
    const goalsHtml = hasGoals
        ? `<table class="data-table simple-numbered-table">
            <tbody>${data.goals.map((goal, index) => `<tr><td class="col-val">${index + 1}. ${escapeHtml(getText(goal))}</td></tr>`).join('')}</tbody>
        </table>`
        : '';

    // Build prerequisites table HTML - support both legacy strings and i18n objects
    let prerequisitesHtml = '';
    if (hasPrerequisites) {
        const clientItems = data.prerequisites.client || [];
        const contractorItems = data.prerequisites.contractor || [];
        const maxRows = Math.max(clientItems.length, contractorItems.length);

        let tableRows = '';
        for (let i = 0; i < maxRows; i++) {
            const clientItem = getArrayItemText(clientItems, i);
            const contractorItem = getArrayItemText(contractorItems, i);
            tableRows += `<tr><td class="col-val">${escapeHtml(clientItem)}</td><td class="col-val">${escapeHtml(contractorItem)}</td></tr>`;
        }

        prerequisitesHtml = `
            <table class="data-table prerequisites-table">
                <thead><tr><th>Auftraggeber (AG)</th><th>Auftragnehmer (AN)</th></tr></thead>
                <tbody>${tableRows}</tbody>
            </table>`;
    }

    // Build implementation table HTML - support both legacy strings and i18n objects
    const implementationHtml = hasImplementation
        ? `<table class="data-table simple-numbered-table">
            <tbody>${data.implementation.map((step, index) => `<tr><td class="col-val">${index + 1}. ${escapeHtml(getText(step))}</td></tr>`).join('')}</tbody>
        </table>`
        : '';

    // Build input/output table HTML - support both legacy strings and i18n objects
    let ioHtml = '';
    if (hasInputsOutputs) {
        const inputs = data.inputs || [];
        const outputs = data.outputs || [];
        const maxRows = Math.max(inputs.length, outputs.length);

        let tableRows = '';
        for (let i = 0; i < maxRows; i++) {
            const inputItem = getArrayItemText(inputs, i);
            const outputItem = getArrayItemText(outputs, i);
            tableRows += `<tr><td class="col-val">${escapeHtml(inputItem)}</td><td class="col-val">${escapeHtml(outputItem)}</td></tr>`;
        }

        ioHtml = `
            <table class="data-table io-table">
                <thead><tr><th>Input</th><th>Output</th></tr></thead>
                <tbody>${tableRows}</tbody>
            </table>`;
    }

    // practiceExample removed from schema


    // Build quality criteria table HTML - uses snake_case per schema
    const qualityCriteriaHtml = hasQualityCriteria
        ? `<table class="data-table simple-numbered-table">
            <tbody>${data.quality_criteria.map((criterion, index) => `<tr><td class="col-val">${index + 1}. ${escapeHtml(getText(criterion))}</td></tr>`).join('')}</tbody>
        </table>`
        : '';

    // Build roles table HTML - support both legacy strings and i18n objects
    const formatRoleItems = (items) => {
        if (!items || !Array.isArray(items) || items.length === 0) return '-';
        return escapeHtml(items.map(item => getText(item)).join(', '));
    };
    const rolesRowsHtml = hasRoles
        ? data.roles.map(role => `
            <tr>
                <td class="col-val col-actor">${escapeHtml(getText(role.actor) || '')}</td>
                <td class="col-val">${formatRoleItems(role.responsible)}</td>
                <td class="col-val">${formatRoleItems(role.contributing)}</td>
                <td class="col-val">${formatRoleItems(role.informed)}</td>
            </tr>`).join('')
        : '<tr><td colspan="4" class="col-center empty-text">Keine Rollen definiert.</td></tr>';

    contentArea.innerHTML = `
        <section class="detail-hero">
            <div class="container detail-hero__inner">
                <div class="hero-content">
                    <div class="breadcrumb"><a href="#${backLink}"><i data-lucide="arrow-left" style="vertical-align: text-bottom; margin-right:5px; width: 1.1rem; height: 1.1rem;"></i> Zurück zur Liste</a></div>
                    <h1 class="hero-title">${safeTitle}</h1>
                    <p class="hero-subtitle">${safeDesc}</p>
                    <div class="hero-tags">${renderTagsHtml(data.tags, activeTags)}</div>
                </div>
                <div class="hero-image-container">
                    ${safeImage ? `<img src="${safeImage}" alt="${safeTitle}">` : '<i data-lucide="workflow" class="hero-image-placeholder icon--4xl"></i>'}
                </div>
            </div>
        </section>

        <div class="container">
            <div class="detail-layout">
                <aside class="detail-sidebar"><nav class="sticky-nav">${sidebarHtml}</nav></aside>
                <div class="detail-content-area">
                    ${renderMetadataTable(data, 'Anwendungsfall', data.name ? t(data.name) : data.title)}

                    ${hasPhases ? `
                    <div class="detail-section" id="phasen">
                        <h2>Projekt-/Lebenszyklusphasen</h2>
                        <p>Relevante Projektphasen für diesen Anwendungsfall.</p>
                        <div class="phases-container phases-container--large">${phasesHtml}</div>
                    </div>` : ''}

                    ${hasGoals ? `
                    <div class="detail-section" id="nutzen">
                        <h2>Nutzen</h2>
                        ${goalsHtml}
                    </div>` : ''}

                    ${hasPrerequisites ? `
                    <div class="detail-section" id="voraussetzungen">
                        <h2>Voraussetzungen</h2>
                        ${prerequisitesHtml}
                    </div>` : ''}

                    ${hasImplementation ? `
                    <div class="detail-section" id="umsetzung">
                        <h2>Umsetzung</h2>
                        ${implementationHtml}
                    </div>` : ''}

                    ${hasInputsOutputs ? `
                    <div class="detail-section" id="input-output">
                        <h2>Input / Output</h2>
                        ${ioHtml}
                    </div>` : ''}



                    ${hasQualityCriteria ? `
                    <div class="detail-section" id="qualitaetskriterien">
                        <h2>Qualitätskriterien</h2>
                        ${qualityCriteriaHtml}
                    </div>` : ''}

                    ${hasRoles ? `
                    <div class="detail-section" id="beteiligte-akteure">
                        <h2>Beteiligte Akteure</h2>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th class="th-w-20">Akteur</th>
                                    <th>Verantwortlich (R)</th>
                                    <th>Mitwirkend (C)</th>
                                    <th>Informiert (I)</th>
                                </tr>
                            </thead>
                            <tbody>${rolesRowsHtml}</tbody>
                        </table>
                    </div>` : ''}

                    ${hasProcess ? `
                    <div class="detail-section" id="prozess">
                        <h2>Prozess</h2>
                        <p>BPMN-Prozessdiagramm für diesen Anwendungsfall.</p>
                        <div class="bpmn-viewer-container" id="bpmn-viewer-${data.id}">
                        </div>
                    </div>` : ''}

                    <div class="detail-section" id="dokumente">
                        <h2>Dokumente</h2>
                        <div class="info-box info-box--inline">
                            <i data-lucide="construction" class="info-box__icon"></i>
                            <div>
                                <p class="info-box__text">Diese Funktion wird derzeit entwickelt. Hier werden zukünftig verknüpfte Dokumente angezeigt.</p>
                            </div>
                        </div>
                    </div>

                    <div class="detail-section" id="elemente">
                        <h2>Elemente</h2>
                        <div class="info-box info-box--inline">
                            <i data-lucide="construction" class="info-box__icon"></i>
                            <div>
                                <p class="info-box__text">Diese Funktion wird derzeit entwickelt. Hier werden zukünftig verknüpfte Elemente angezeigt.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    setupDetailInteractions();

    // Initialize BPMN viewer if process section exists (using data-driven process_url)
    if (hasProcess && typeof renderBpmnDiagram === 'function') {
        renderBpmnDiagram(`bpmn-viewer-${data.id}`, processUrl, data.id);
    }
}

function renderModelDetailPage(id, activeTags = [], activeCategory = '') {
    // Use O(1) lookup instead of O(n) .find()
    const data = getItemById('models', id);
    if (!data) {
        contentArea.innerHTML = '<div class="container error-state">Fachmodell nicht gefunden.</div>';
        return;
    }

    // Escape main content - support both legacy and new i18n fields
    const safeTitle = escapeHtml(data.name ? t(data.name) : data.title || '');
    const safeDesc = escapeHtml(data.description ? t(data.description) : 'Ein Fachmodell des KBOB Datenkatalogs.');
    const safeImage = escapeHtml(data.image || '');

    const backLink = buildHashWithTags('models', activeTags, activeCategory, [], getActiveViewFromURL());

    // Determine which sections have data
    const hasPhases = hasData(data.phases);
    // Inline elements removed from schema - now uses related_elements for linking
    const hasRelatedElements = hasData(data.related_elements);

    // Build sidebar links
    const sidebarLinks = [];
    sidebarLinks.push({ id: 'metadaten', text: 'Metadaten' });
    if (hasPhases) sidebarLinks.push({ id: 'phasen', text: 'Phasen' });
    sidebarLinks.push({ id: 'elemente', text: 'Elemente' });
    sidebarLinks.push({ id: 'anwendungsfaelle', text: 'Anwendungsfälle' });

    const sidebarHtml = sidebarLinks.map(link =>
        `<a href="#${link.id}" class="sidebar-link" data-target="${link.id}">${link.text}</a>`
    ).join('');

    // Build phases HTML
    const allPhases = Object.keys(phaseLabels).map(Number).sort((a, b) => a - b);
    const phasesHtml = allPhases.map(p => {
        const isActive = data.phases && data.phases.includes(p);
        return `<span class="phase-badge ${isActive ? 'active' : 'inactive'}" title="Phase ${p}">${phaseLabels[p]}</span>`;
    }).join('');

    // Inline elements removed from schema - related_elements links to elements.json

    contentArea.innerHTML = `
        <section class="detail-hero">
            <div class="container detail-hero__inner">
                <div class="hero-content">
                    <div class="breadcrumb"><a href="#${backLink}"><i data-lucide="arrow-left" style="vertical-align: text-bottom; margin-right:5px; width: 1.1rem; height: 1.1rem;"></i> Zurück zur Liste</a></div>
                    <h1 class="hero-title">${safeTitle}</h1>
                    <p class="hero-subtitle">${safeDesc}</p>
                    <div class="hero-tags">${renderTagsHtml(data.tags, activeTags)}</div>
                </div>
                <div class="hero-image-container">
                    ${safeImage ? `<img src="${safeImage}" alt="${safeTitle}">` : '<i data-lucide="boxes" class="hero-image-placeholder icon--4xl"></i>'}
                </div>
            </div>
        </section>

        <div class="container">
            <div class="detail-layout">
                <aside class="detail-sidebar"><nav class="sticky-nav">${sidebarHtml}</nav></aside>
                <div class="detail-content-area">
                    ${renderMetadataTable(data, 'Fachmodell', data.name ? t(data.name) : data.title)}

                    ${hasPhases ? `
                    <div class="detail-section" id="phasen">
                        <h2>Projekt-/Lebenszyklusphasen</h2>
                        <div class="phases-container phases-container--large">${phasesHtml}</div>
                    </div>` : ''}

                    <div class="detail-section" id="elemente">
                        <h2>Elemente</h2>
                        <div class="info-box info-box--inline">
                            <i data-lucide="construction" class="info-box__icon"></i>
                            <div>
                                <p class="info-box__text">Diese Funktion wird derzeit entwickelt. Hier werden zukünftig verknüpfte Elemente angezeigt.</p>
                            </div>
                        </div>
                    </div>

                    <div class="detail-section" id="anwendungsfaelle">
                        <h2>Anwendungsfälle</h2>
                        <div class="info-box info-box--inline">
                            <i data-lucide="construction" class="info-box__icon"></i>
                            <div>
                                <p class="info-box__text">Diese Funktion wird derzeit entwickelt. Hier werden zukünftig verknüpfte Anwendungsfälle angezeigt.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    setupDetailInteractions();
}

function renderEpdDetailPage(id, activeTags = [], activeCategory = '') {
    // Use O(1) lookup instead of O(n) .find()
    const data = getItemById('epds', id);
    if (!data) {
        contentArea.innerHTML = '<div class="container error-state">Ökobilanzdaten nicht gefunden.</div>';
        return;
    }

    // Escape main content - support both legacy and new i18n fields
    const safeTitle = escapeHtml(data.name ? t(data.name) : data.title || '');
    const safeDesc = escapeHtml(data.description ? t(data.description) : 'Ein Ökobilanzdatensatz des KBOB Datenkatalogs.');
    const safeImage = escapeHtml(data.image || '');

    const backLink = buildHashWithTags('epds', activeTags, activeCategory, [], getActiveViewFromURL());

    // Determine which sections have data - support both biogenicCarbon and biogenic_carbon
    const biogenicCarbonValue = data.biogenic_carbon !== undefined ? data.biogenic_carbon : data.biogenicCarbon;
    const hasMaterialProperties = hasData(data.density) || hasData(biogenicCarbonValue);

    // Build sidebar links
    const sidebarLinks = [];
    sidebarLinks.push({ id: 'metadaten', text: 'Metadaten' });
    sidebarLinks.push({ id: 'allgemein', text: 'Allgemein' });
    sidebarLinks.push({ id: 'umweltindikatoren', text: 'Umweltindikatoren' });
    sidebarLinks.push({ id: 'energie', text: 'Energie' });
    if (hasMaterialProperties) {
        sidebarLinks.push({ id: 'materialeigenschaften', text: 'Materialeigenschaften' });
    }
    sidebarLinks.push({ id: 'elemente', text: 'Elemente' });
    sidebarLinks.push({ id: 'anwendungsfaelle', text: 'Anwendungsfälle' });

    const sidebarHtml = sidebarLinks.map(link =>
        `<a href="#${link.id}" class="sidebar-link" data-target="${link.id}">${link.text}</a>`
    ).join('');

    // Format category - subcategory removed from schema
    const category = data.domain ? t(data.domain) : data.category;
    const categoryDisplay = escapeHtml(category || '—');

    // Format numbers for display
    const formatNumber = (num) => {
        if (num === null || num === undefined) return '—';
        return typeof num === 'number' ? num.toLocaleString('de-CH') : escapeHtml(String(num));
    };

    // Build material properties rows (only if data exists)
    let materialPropertiesHtml = '';
    if (hasMaterialProperties) {
        const densityUnit = data.unit === 'm2' ? 'kg/m²' : 'kg/m³';
        materialPropertiesHtml = `
            <div id="materialeigenschaften" class="detail-section">
                <h2>Materialeigenschaften</h2>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th class="th-w-40">Eigenschaft</th>
                            <th class="th-w-30 col-right">Wert</th>
                            <th>Einheit</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${hasData(data.density) ? `<tr>
                            <td class="col-val">Rohdichte</td>
                            <td class="col-val col-right">${formatNumber(data.density)}</td>
                            <td class="col-val">${densityUnit}</td>
                        </tr>` : ''}
                        ${hasData(biogenicCarbonValue) ? `<tr>
                            <td class="col-val">Biogener Kohlenstoff</td>
                            <td class="col-val col-right">${formatNumber(biogenicCarbonValue)}</td>
                            <td class="col-val">kg C</td>
                        </tr>` : ''}
                    </tbody>
                </table>
            </div>`;
    }

    contentArea.innerHTML = `
        <section class="detail-hero">
            <div class="container detail-hero__inner">
                <div class="hero-content">
                    <div class="breadcrumb"><a href="#${backLink}"><i data-lucide="arrow-left" style="vertical-align: text-bottom; margin-right:5px; width: 1.1rem; height: 1.1rem;"></i> Zurück zur Liste</a></div>
                    <h1 class="hero-title">${safeTitle}</h1>
                    <p class="hero-subtitle">${safeDesc}</p>
                    <div class="hero-tags">${renderTagsHtml(data.tags, activeTags)}</div>
                </div>
                <div class="hero-image-container">
                    ${safeImage ? `<img src="${safeImage}" alt="${safeTitle}">` : '<i data-lucide="leaf" class="hero-image-placeholder icon--4xl"></i>'}
                </div>
            </div>
        </section>

        <div class="container">
            <div class="detail-layout">
                <aside class="detail-sidebar"><nav class="sticky-nav">${sidebarHtml}</nav></aside>
                <div class="detail-content-area">
                    <div id="metadaten" class="detail-section">
                        <h2>Metadaten</h2>
                        <table class="data-table">
                            <tbody>
                                <tr><td class="col-val metadata-label">Entität</td><td class="col-val">Ökobilanzdaten</td></tr>
                                <tr><td class="col-val metadata-label">Name</td><td class="col-val">${safeTitle || '—'}</td></tr>
                                <tr><td class="col-val metadata-label">Kategorie</td><td class="col-val">${categoryDisplay}</td></tr>
                                <tr><td class="col-val metadata-label">ID</td><td class="col-val">${escapeHtml(data.code || data.id || '—')}</td></tr>
                                <tr><td class="col-val metadata-label">Version</td><td class="col-val">${escapeHtml(data.version || '—')}</td></tr>
                                <tr><td class="col-val metadata-label">Letzte Änderung</td><td class="col-val">${formatDateToGerman(data.last_change || data.lastChange)}</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div id="allgemein" class="detail-section">
                        <h2>Allgemein</h2>
                        <table class="data-table">
                            <tbody>
                                <tr><td class="col-val metadata-label">UUID</td><td class="col-val"><code>${escapeHtml(data.uuid || '—')}</code></td></tr>
                                <tr><td class="col-val metadata-label">Bezugsgrösse</td><td class="col-val">${escapeHtml(data.unit || '—')}</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div id="umweltindikatoren" class="detail-section">
                        <h2>Umweltindikatoren</h2>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th class="th-w-40">Indikator</th>
                                    <th class="th-w-30 col-right">Wert</th>
                                    <th>Einheit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="col-val">Treibhauspotenzial (GWP)</td>
                                    <td class="col-val col-right">${formatNumber(data.gwp)}</td>
                                    <td class="col-val">kg CO₂-eq</td>
                                </tr>
                                <tr>
                                    <td class="col-val">Umweltbelastungspunkte (UBP)</td>
                                    <td class="col-val col-right">${formatNumber(data.ubp)}</td>
                                    <td class="col-val">UBP</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div id="energie" class="detail-section">
                        <h2>Energie</h2>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th class="th-w-40">Indikator</th>
                                    <th class="th-w-30 col-right">Wert</th>
                                    <th>Einheit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="col-val">Primärenergie nicht erneuerbar (PENRT)</td>
                                    <td class="col-val col-right">${formatNumber(data.penrt)}</td>
                                    <td class="col-val">kWh oil-eq</td>
                                </tr>
                                <tr>
                                    <td class="col-val">Primärenergie erneuerbar (PERT)</td>
                                    <td class="col-val col-right">${formatNumber(data.pert)}</td>
                                    <td class="col-val">kWh oil-eq</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    ${materialPropertiesHtml}

                    <div id="elemente" class="detail-section">
                        <h2>Elemente</h2>
                        <div class="info-box info-box--inline">
                            <i data-lucide="construction" class="info-box__icon"></i>
                            <div>
                                <p class="info-box__text">Diese Funktion wird derzeit entwickelt. Hier werden zukünftig verknüpfte Elemente angezeigt.</p>
                            </div>
                        </div>
                    </div>

                    <div id="anwendungsfaelle" class="detail-section">
                        <h2>Anwendungsfälle</h2>
                        <div class="info-box info-box--inline">
                            <i data-lucide="construction" class="info-box__icon"></i>
                            <div>
                                <p class="info-box__text">Diese Funktion wird derzeit entwickelt. Hier werden zukünftig verknüpfte Anwendungsfälle angezeigt.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    setupDetailInteractions();
}

// ============================================
// DETAIL PAGE INTERACTIONS
// ============================================

// Store reference to sidebar observer for cleanup (prevents memory leaks)
let sidebarObserver = null;

function setupDetailInteractions() {
    // Sidebar link click handlers are now managed via event delegation in app.js

    // Cleanup previous observer if it exists (prevents memory leaks)
    if (sidebarObserver) {
        sidebarObserver.disconnect();
        sidebarObserver = null;
    }

    setTimeout(() => {
        const sectionHash = window.location.hash.split('#')[2];
        if (sectionHash) document.getElementById(sectionHash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

        const sections = document.querySelectorAll('.detail-section');
        const navLinks = document.querySelectorAll('.sticky-nav a');

        // Create new observer and store reference for cleanup
        sidebarObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        const target = link.getAttribute('data-target');
                        link.classList.toggle('active', target === entry.target.id);
                    });
                }
            });
        }, { threshold: 0.2, rootMargin: "-10% 0px -70% 0px" });

        sections.forEach(section => sidebarObserver.observe(section));
    }, 100);
}

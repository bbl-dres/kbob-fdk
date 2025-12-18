/**
 * KBOB Fachdatenkatalog - Detail Page Renderers
 * All detail page rendering functions
 */

// ============================================
// ELEMENT DETAIL PAGE
// ============================================

function renderElementDetailPage(id, activeTags = []) {
    const data = globalElementsData.find(element => element.id === id);
    if (!data) {
        contentArea.innerHTML = '<div class="container error-state">Element nicht gefunden.</div>';
        return;
    }

    // Escape main content
    const safeTitle = escapeHtml(data.title || '');
    const safeDesc = escapeHtml(data.description || 'Ein Standard-Element des KBOB Datenkatalogs.');
    const safeImage = escapeHtml(data.image || '');

    const sidebarLinks = [
        { id: 'klassifizierung', text: 'Klassifizierung' },
        { id: 'ifc', text: 'IFC-Klasse' },
        { id: 'geometrie', text: 'Geometrie' },
        { id: 'informationen', text: 'Informationen' },
        { id: 'dokumentation', text: 'Dokumentation' }
    ].map(link => `<a href="#${link.id}" class="sidebar-link" data-target="${link.id}">${link.text}</a>`).join('');

    const classRows = data.classifications && Array.isArray(data.classifications)
        ? data.classifications.map(c => `<tr><td class="col-val">${escapeHtml(c.system || '')}</td><td class="col-val">${escapeHtml(c.code || '')} - ${escapeHtml(c.desc || '')}</td></tr>`).join('')
        : '<tr><td colspan="2">Keine Klassifizierung verfügbar</td></tr>';

    const ifcRows = data.ifcMapping && Array.isArray(data.ifcMapping)
        ? data.ifcMapping.map(m => `
            <tr>
                <td class="col-val">${escapeHtml(m.element || '')}</td>
                <td class="col-val">${escapeHtml(m.ifc || '')}</td>
                <td class="col-val">${escapeHtml(m.revit || '')}</td>
            </tr>`).join('')
        : '<tr><td colspan="3">-</td></tr>';

    const geomRows = data.geometry && Array.isArray(data.geometry) ? data.geometry : [];
    const geomRowsHtml = geomRows.length > 0
        ? geomRows.map(row => `
            <tr>
                <td class="col-val">${escapeHtml(row.name || '')}</td>
                <td class="col-val">${escapeHtml(row.desc || '')}</td>
                <td class="col-center">${renderPhaseBadges(row.phases)}</td>
            </tr>`).join('')
        : '<tr><td colspan="3" class="col-center empty-text">Keine Daten.</td></tr>';

    const infoRows = data.information && Array.isArray(data.information) ? data.information : [];
    const infoRowsHtml = infoRows.length > 0
        ? infoRows.map(row => `
            <tr>
                <td class="col-val"><span class="info-name-tooltip" title="${escapeHtml(row.desc || '')}">${escapeHtml(row.name || '')}</span></td>
                <td class="col-val">${escapeHtml(row.format || '-')}</td>
                <td class="col-center">${row.list ? '<i data-lucide="circle-check" class="list-icon-active"></i>' : '-'}</td>
                <td class="col-val">${escapeHtml(row.ifc || '-')}</td>
                <td class="col-center">${renderPhaseBadges(row.phases)}</td>
            </tr>`).join('')
        : '<tr><td colspan="5" class="col-center empty-text">Keine Attribute (LOI).</td></tr>';

    const docRows = data.documentation && Array.isArray(data.documentation) ? data.documentation : [];
    const docRowsHtml = docRows.length > 0
        ? docRows.map(row => `
            <tr>
                <td class="col-val">${escapeHtml(row.name || '')}</td>
                <td class="col-val">${escapeHtml(row.desc || '')}</td>
                <td class="col-center">${renderPhaseBadges(row.phases)}</td>
            </tr>`).join('')
        : '<tr><td colspan="3" class="col-center empty-text">Keine Dokumente.</td></tr>';

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
                        <p>Definiert die geometrischen Anforderungen an das Modellelement pro Phase.</p>
                        <table class="data-table">
                            <thead><tr><th class="th-w-20">Element</th><th>Beschreibung</th><th class="th-w-phases">Phasen (1-5)</th></tr></thead>
                            <tbody>${geomRowsHtml}</tbody>
                        </table>
                    </div>

                    <div id="informationen" class="detail-section">
                        <h2>Informationen</h2>
                        <p>Alphanumerische Attribute (LOI), die dem Element zugewiesen werden müssen.</p>
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
                        <h2>Dokumentation</h2>
                        <p>Erforderliche Dokumente, die mit dem Element verknüpft oder geliefert werden müssen.</p>
                        <table class="data-table">
                            <thead><tr><th class="th-w-20">Dokumententyp</th><th>Beschreibung</th><th class="th-w-phases">Phasen (1-5)</th></tr></thead>
                            <tbody>${docRowsHtml}</tbody>
                        </table>
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

    const data = config.getData().find(item => item.id === id);
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
// BACKWARD COMPATIBLE WRAPPERS
// ============================================

function renderDocumentDetailPage(id, activeTags = [], activeCategory = '') {
    renderPlaceholderDetailPage('documents', id, activeTags, activeCategory);
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

function renderUsecaseDetailPage(id, activeTags = [], activeCategory = '') {
    const data = globalUsecasesData.find(item => item.id === id);
    if (!data) {
        contentArea.innerHTML = '<div class="container error-state">Anwendungsfall nicht gefunden.</div>';
        return;
    }

    // Escape main content
    const safeTitle = escapeHtml(data.title || '');
    const safeDesc = escapeHtml(data.description || 'Ein Anwendungsfall des KBOB Datenkatalogs.');
    const safeImage = escapeHtml(data.image || '');
    // Validate process_url - only allow http/https URLs
    const safeProcessUrl = data.process_url && /^https?:\/\//i.test(data.process_url) ? escapeHtml(data.process_url) : '';

    const backLink = buildHashWithTags('usecases', activeTags, activeCategory, [], getActiveViewFromURL());

    // Determine which sections have data (for conditional rendering)
    const hasPhases = hasData(data.phases);
    const hasDefinition = hasData(data.definition);
    const hasGoals = hasData(data.goals);
    const hasPrerequisites = hasData(data.prerequisites) && (hasData(data.prerequisites.client) || hasData(data.prerequisites.contractor));
    const hasImplementation = hasData(data.implementation);
    const hasInputsOutputs = hasData(data.inputs) || hasData(data.outputs);
    const hasPracticeExample = hasData(data.practiceExample);
    const hasQualityCriteria = hasData(data.qualityCriteria);
    const hasRoles = hasData(data.roles);
    const hasProcess = !!safeProcessUrl;

    // Build sidebar with group labels
    let sidebarHtml = '';

    // ALLGEMEINER TEIL
    const generalLinks = [];
    if (hasPhases) generalLinks.push({ id: 'phasen', text: 'Phasen' });
    if (hasDefinition) generalLinks.push({ id: 'definition', text: 'Definition' });
    if (hasGoals) generalLinks.push({ id: 'nutzen', text: 'Nutzen' });
    if (hasPrerequisites) generalLinks.push({ id: 'voraussetzungen', text: 'Voraussetzungen' });
    if (hasImplementation) generalLinks.push({ id: 'umsetzung', text: 'Umsetzung' });
    if (hasInputsOutputs) generalLinks.push({ id: 'input-output', text: 'Input / Output' });
    if (hasPracticeExample) generalLinks.push({ id: 'praxisbeispiel', text: 'Praxisbeispiel' });

    if (generalLinks.length > 0) {
        sidebarHtml += '<span class="nav-group-label">Allgemeiner Teil</span>';
        sidebarHtml += generalLinks.map(link => `<a href="#${link.id}" class="sidebar-link" data-target="${link.id}">${link.text}</a>`).join('');
    }

    // UMSETZUNGSDETAILS
    const detailLinks = [];
    if (hasQualityCriteria) detailLinks.push({ id: 'qualitaetskriterien', text: 'Qualitätskriterien' });
    if (hasRoles) detailLinks.push({ id: 'beteiligte-akteure', text: 'Beteiligte Akteure' });
    if (hasProcess) detailLinks.push({ id: 'prozess', text: 'Prozess' });

    if (detailLinks.length > 0) {
        sidebarHtml += '<span class="nav-group-label">Umsetzungsdetails</span>';
        sidebarHtml += detailLinks.map(link => `<a href="#${link.id}" class="sidebar-link" data-target="${link.id}">${link.text}</a>`).join('');
    }

    // VERKNÜPFUNGEN (always shown as placeholder)
    sidebarHtml += '<span class="nav-group-label">Verknüpfungen</span>';
    sidebarHtml += '<a href="#dokumente" class="sidebar-link" data-target="dokumente">Dokumente</a>';
    sidebarHtml += '<a href="#elemente" class="sidebar-link" data-target="elemente">Elemente</a>';

    // Build phases HTML
    const allPhases = Object.keys(phaseLabels).map(Number).sort((a, b) => a - b);
    const phasesHtml = allPhases.map(p => {
        const isActive = data.phases && data.phases.includes(p);
        return `<span class="phase-badge ${isActive ? 'active' : 'inactive'}" title="Phase ${p}">${phaseLabels[p]}</span>`;
    }).join('');

    // Build goals list HTML
    const goalsHtml = hasGoals
        ? `<ul class="usecase-list">${data.goals.map(goal => `<li>${escapeHtml(goal)}</li>`).join('')}</ul>`
        : '';

    // Build prerequisites table HTML
    let prerequisitesHtml = '';
    if (hasPrerequisites) {
        const clientItems = data.prerequisites.client || [];
        const contractorItems = data.prerequisites.contractor || [];
        const maxRows = Math.max(clientItems.length, contractorItems.length);

        let tableRows = '';
        for (let i = 0; i < maxRows; i++) {
            const clientItem = clientItems[i] ? escapeHtml(clientItems[i]) : '';
            const contractorItem = contractorItems[i] ? escapeHtml(contractorItems[i]) : '';
            tableRows += `<tr><td class="col-val">${clientItem}</td><td class="col-val">${contractorItem}</td></tr>`;
        }

        prerequisitesHtml = `
            <table class="data-table prerequisites-table">
                <thead><tr><th>Auftraggeber (AG)</th><th>Auftragnehmer (AN)</th></tr></thead>
                <tbody>${tableRows}</tbody>
            </table>`;
    }

    // Build implementation list HTML
    const implementationHtml = hasImplementation
        ? `<ol class="usecase-list usecase-list--numbered">${data.implementation.map(step => `<li>${escapeHtml(step)}</li>`).join('')}</ol>`
        : '';

    // Build input/output table HTML
    let ioHtml = '';
    if (hasInputsOutputs) {
        const inputs = data.inputs || [];
        const outputs = data.outputs || [];
        const maxRows = Math.max(inputs.length, outputs.length);

        let tableRows = '';
        for (let i = 0; i < maxRows; i++) {
            const inputItem = inputs[i] ? escapeHtml(inputs[i]) : '';
            const outputItem = outputs[i] ? escapeHtml(outputs[i]) : '';
            tableRows += `<tr><td class="col-val">${inputItem}</td><td class="col-val">${outputItem}</td></tr>`;
        }

        ioHtml = `
            <table class="data-table io-table">
                <thead><tr><th>Input</th><th>Output</th></tr></thead>
                <tbody>${tableRows}</tbody>
            </table>`;
    }

    // Build practice example HTML
    let practiceExampleHtml = '';
    if (hasPracticeExample) {
        const example = data.practiceExample;
        const exampleImage = example.image ? escapeHtml(example.image) : '';
        const exampleTitle = escapeHtml(example.title || '');
        const exampleDesc = escapeHtml(example.description || '');

        practiceExampleHtml = `
            <div class="practice-example-card">
                ${exampleImage ? `<div class="practice-example-card__image"><img src="${exampleImage}" alt="${exampleTitle}"></div>` : ''}
                <div class="practice-example-card__content">
                    <h3 class="practice-example-card__title">${exampleTitle}</h3>
                    <p class="practice-example-card__description">${exampleDesc}</p>
                </div>
            </div>`;
    }


    // Build quality criteria HTML
    const qualityCriteriaHtml = hasQualityCriteria
        ? `<ul class="usecase-list">${data.qualityCriteria.map(criterion => `<li>${escapeHtml(criterion)}</li>`).join('')}</ul>`
        : '';

    // Build roles table HTML
    const rolesRowsHtml = hasRoles
        ? data.roles.map(role => `
            <tr>
                <td class="col-val col-actor">${escapeHtml(role.actor || '')}</td>
                <td class="col-val">${role.responsible && Array.isArray(role.responsible) && role.responsible.length > 0 ? escapeHtml(role.responsible.join(', ')) : '-'}</td>
                <td class="col-val">${role.contributing && Array.isArray(role.contributing) && role.contributing.length > 0 ? escapeHtml(role.contributing.join(', ')) : '-'}</td>
                <td class="col-val">${role.informed && Array.isArray(role.informed) && role.informed.length > 0 ? escapeHtml(role.informed.join(', ')) : '-'}</td>
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

                    ${hasPhases ? `
                    <div class="detail-section" id="phasen">
                        <h2>Projekt-/Lebenszyklusphasen</h2>
                        <p>Relevante Projektphasen für diesen Anwendungsfall.</p>
                        <div class="phases-container phases-container--large">${phasesHtml}</div>
                    </div>` : ''}

                    ${hasDefinition ? `
                    <div class="detail-section" id="definition">
                        <h2>Definition</h2>
                        <p class="definition-text">${escapeHtml(data.definition)}</p>
                    </div>` : ''}

                    ${hasGoals ? `
                    <div class="detail-section" id="nutzen">
                        <h2>Nutzen</h2>
                        ${goalsHtml}
                    </div>` : ''}

                    ${hasPrerequisites ? `
                    <div class="detail-section" id="voraussetzungen">
                        <h2>Voraussetzungen</h2>
                        <p>Anforderungen an Auftraggeber und Auftragnehmer für die erfolgreiche Umsetzung.</p>
                        ${prerequisitesHtml}
                    </div>` : ''}

                    ${hasImplementation ? `
                    <div class="detail-section" id="umsetzung">
                        <h2>Umsetzung</h2>
                        <p>Schritte zur Umsetzung dieses Anwendungsfalls.</p>
                        ${implementationHtml}
                    </div>` : ''}

                    ${hasInputsOutputs ? `
                    <div class="detail-section" id="input-output">
                        <h2>Input / Output</h2>
                        <p>Erforderliche Eingaben und erwartete Ergebnisse.</p>
                        ${ioHtml}
                    </div>` : ''}

                    ${hasPracticeExample ? `
                    <div class="detail-section" id="praxisbeispiel">
                        <h2>Praxisbeispiel</h2>
                        ${practiceExampleHtml}
                    </div>` : ''}


                    ${hasQualityCriteria ? `
                    <div class="detail-section" id="qualitaetskriterien">
                        <h2>Qualitätskriterien</h2>
                        <p>Kriterien zur Bewertung der erfolgreichen Umsetzung.</p>
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
                        <div class="bpmn-viewer-container">
                            <iframe
                                src="${safeProcessUrl}"
                                title="BPMN Prozessdiagramm"
                                sandbox="allow-scripts allow-same-origin"
                                allowfullscreen>
                            </iframe>
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
}

function renderModelDetailPage(id, activeTags = [], activeCategory = '') {
    renderPlaceholderDetailPage('models', id, activeTags, activeCategory);
}

function renderEpdDetailPage(id, activeTags = [], activeCategory = '') {
    renderPlaceholderDetailPage('epds', id, activeTags, activeCategory);
}

// ============================================
// DETAIL PAGE INTERACTIONS
// ============================================

function setupDetailInteractions() {
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const element = document.getElementById(targetId);
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    setTimeout(() => {
        const sectionHash = window.location.hash.split('#')[2];
        if (sectionHash) document.getElementById(sectionHash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

        const sections = document.querySelectorAll('.detail-section');
        const navLinks = document.querySelectorAll('.sticky-nav a');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        const target = link.getAttribute('data-target');
                        link.classList.toggle('active', target === entry.target.id);
                    });
                }
            });
        }, { threshold: 0.2, rootMargin: "-10% 0px -70% 0px" });

        sections.forEach(section => observer.observe(section));
    }, 100);
}

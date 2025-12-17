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

    const sidebarLinks = [
        { id: 'klassifizierung', text: 'Klassifizierung' },
        { id: 'ifc', text: 'IFC-Klasse' },
        { id: 'geometrie', text: 'Geometrie' },
        { id: 'informationen', text: 'Informationen' },
        { id: 'dokumentation', text: 'Dokumentation' }
    ].map(link => `<a href="#${link.id}" class="sidebar-link" data-target="${link.id}">${link.text}</a>`).join('');

    const classRows = data.classifications
        ? data.classifications.map(c => `<tr><td class="col-val">${c.system}</td><td class="col-val">${c.code} - ${c.desc}</td></tr>`).join('')
        : '<tr><td colspan="2">Keine Klassifizierung verfügbar</td></tr>';

    const ifcRows = data.ifcMapping
        ? data.ifcMapping.map(m => `
            <tr>
                <td class="col-val">${m.element}</td>
                <td class="col-val">${m.ifc}</td>
                <td class="col-val">${m.revit}</td>
            </tr>`).join('')
        : '<tr><td colspan="3">-</td></tr>';

    const geomRows = data.geometry && data.geometry.length > 0 ? data.geometry : [];
    const geomRowsHtml = geomRows.length > 0
        ? geomRows.map(row => `
            <tr>
                <td class="col-val">${row.name}</td>
                <td class="col-val">${row.desc}</td>
                <td class="col-center">${renderPhaseBadges(row.phases)}</td>
            </tr>`).join('')
        : '<tr><td colspan="3" class="col-center empty-text">Keine Daten.</td></tr>';

    const infoRows = data.information && data.information.length > 0 ? data.information : [];
    const infoRowsHtml = infoRows.length > 0
        ? infoRows.map(row => `
            <tr>
                <td class="col-val"><span class="info-name-tooltip" title="${row.desc || ''}">${row.name}</span></td>
                <td class="col-val">${row.format || '-'}</td>
                <td class="col-center">${row.list ? '<i data-lucide="circle-check" class="list-icon-active"></i>' : '-'}</td>
                <td class="col-val">${row.ifc || '-'}</td>
                <td class="col-center">${renderPhaseBadges(row.phases)}</td>
            </tr>`).join('')
        : '<tr><td colspan="5" class="col-center empty-text">Keine Attribute (LOI).</td></tr>';

    const docRows = data.documentation && data.documentation.length > 0 ? data.documentation : [];
    const docRowsHtml = docRows.length > 0
        ? docRows.map(row => `
            <tr>
                <td class="col-val">${row.name}</td>
                <td class="col-val">${row.desc}</td>
                <td class="col-center">${renderPhaseBadges(row.phases)}</td>
            </tr>`).join('')
        : '<tr><td colspan="3" class="col-center empty-text">Keine Dokumente.</td></tr>';

    const backLink = buildHashWithTags('elements', activeTags, '', [], getActiveViewFromURL());

    contentArea.innerHTML = `
        <section class="detail-hero">
            <div class="container detail-hero__inner">
                <div class="hero-content">
                    <div class="breadcrumb"><a href="#${backLink}"><i data-lucide="arrow-left" style="vertical-align: text-bottom; margin-right:5px; width: 1.1rem; height: 1.1rem;"></i> Zurück zur Liste</a></div>
                    <h1 class="hero-title">${data.title}</h1>
                    <p class="hero-subtitle">${data.description || 'Ein Standard-Element des KBOB Datenkatalogs.'}</p>
                    <div class="hero-tags">${renderTagsHtml(data.tags, activeTags)}</div>
                </div>
                <div class="hero-image-container">
                    ${data.image ? `<img src="${data.image}" alt="${data.title}">` : '<i data-lucide="image" class="hero-image-placeholder icon--4xl"></i>'}
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
// DOCUMENT DETAIL PAGE
// ============================================

function renderDocumentDetailPage(id, activeTags = [], activeCategory = '') {
    const data = globalDocumentsData.find(doc => doc.id === id);
    if (!data) {
        contentArea.innerHTML = '<div class="container error-state">Dokument nicht gefunden. Detail-Seite für Dokumente ist noch in Entwicklung.</div>';
        return;
    }

    const backLink = buildHashWithTags('documents', activeTags, activeCategory, [], getActiveViewFromURL());

    contentArea.innerHTML = `
        <section class="detail-hero">
            <div class="container detail-hero__inner">
                <div class="hero-content">
                    <div class="breadcrumb"><a href="#${backLink}"><i data-lucide="arrow-left" style="vertical-align: text-bottom; margin-right:5px; width: 1.1rem; height: 1.1rem;"></i> Zurück zur Liste</a></div>
                    <h1 class="hero-title">${data.title}</h1>
                    <p class="hero-subtitle">${data.description || 'Ein Dokument des KBOB Datenkatalogs.'}</p>
                    <div class="hero-tags">${renderTagsHtml(data.tags, activeTags)}</div>
                </div>
                <div class="hero-image-container">
                    ${data.image ? `<img src="${data.image}" alt="${data.title}">` : '<i data-lucide="file-text" class="hero-image-placeholder icon--4xl"></i>'}
                </div>
            </div>
        </section>
        <div class="container">
            <div class="info-box info-box--centered">
                <i data-lucide="hard-hat" class="info-box__icon icon--4xl"></i>
                <h2 class="info-box__title">In Entwicklung</h2>
                <p class="info-box__text">Die Detail-Ansicht für Dokumente wird derzeit entwickelt.</p>
            </div>
        </div>`;
}

// ============================================
// USECASE DETAIL PAGE
// ============================================

function renderUsecaseDetailPage(id, activeTags = [], activeCategory = '') {
    const data = globalUsecasesData.find(item => item.id === id);
    if (!data) {
        contentArea.innerHTML = '<div class="container error-state">Anwendungsfall nicht gefunden.</div>';
        return;
    }

    const backLink = buildHashWithTags('usecases', activeTags, activeCategory, [], getActiveViewFromURL());

    const sidebarLinksData = [
        { id: 'phasen', text: 'Phasen' },
        { id: 'ziele', text: 'Ziele' },
        { id: 'rollen', text: 'Rollen' },
        { id: 'eingaben', text: 'Eingaben' },
        { id: 'ausgaben', text: 'Ausgaben' },
        ...(data.process_url ? [{ id: 'prozess', text: 'Prozess' }] : []),
        { id: 'verknuepfungen', text: 'Verknüpfungen' }
    ];
    const sidebarLinks = sidebarLinksData.map(link => `<a href="#${link.id}" class="sidebar-link" data-target="${link.id}">${link.text}</a>`).join('');

    const allPhases = Object.keys(phaseLabels).map(Number).sort((a, b) => a - b);
    const phasesHtml = allPhases.map(p => {
        const isActive = data.phases && data.phases.includes(p);
        return `<span class="phase-badge ${isActive ? 'active' : 'inactive'}" title="Phase ${p}">${p}</span>`;
    }).join('');

    const goalsRowsHtml = data.goals && data.goals.length > 0
        ? data.goals.map(goal => `<tr><td class="col-val">${goal}</td></tr>`).join('')
        : '<tr><td class="col-center empty-text">Keine Ziele definiert.</td></tr>';

    const inputsRowsHtml = data.inputs && data.inputs.length > 0
        ? data.inputs.map(input => `<tr><td class="col-val">${input}</td></tr>`).join('')
        : '<tr><td class="col-center empty-text">Keine Eingaben definiert.</td></tr>';

    const outputsRowsHtml = data.outputs && data.outputs.length > 0
        ? data.outputs.map(output => `<tr><td class="col-val">${output}</td></tr>`).join('')
        : '<tr><td class="col-center empty-text">Keine Ausgaben definiert.</td></tr>';

    const rolesRowsHtml = data.roles && data.roles.length > 0
        ? data.roles.map(role => `
            <tr>
                <td class="col-val col-actor">${role.actor}</td>
                <td class="col-val">${role.responsible && role.responsible.length > 0 ? role.responsible.join(', ') : '-'}</td>
                <td class="col-val">${role.contributing && role.contributing.length > 0 ? role.contributing.join(', ') : '-'}</td>
                <td class="col-val">${role.informed && role.informed.length > 0 ? role.informed.join(', ') : '-'}</td>
            </tr>`).join('')
        : '<tr><td colspan="4" class="col-center empty-text">Keine Rollen definiert.</td></tr>';

    contentArea.innerHTML = `
        <section class="detail-hero">
            <div class="container detail-hero__inner">
                <div class="hero-content">
                    <div class="breadcrumb"><a href="#${backLink}"><i data-lucide="arrow-left" style="vertical-align: text-bottom; margin-right:5px; width: 1.1rem; height: 1.1rem;"></i> Zurück zur Liste</a></div>
                    <h1 class="hero-title">${data.title}</h1>
                    <p class="hero-subtitle">${data.description || 'Ein Anwendungsfall des KBOB Datenkatalogs.'}</p>
                    <div class="hero-tags">${renderTagsHtml(data.tags, activeTags)}</div>
                </div>
                <div class="hero-image-container">
                    ${data.image ? `<img src="${data.image}" alt="${data.title}">` : '<i data-lucide="workflow" class="hero-image-placeholder icon--4xl"></i>'}
                </div>
            </div>
        </section>

        <div class="container">
            <div class="detail-layout">
                <aside class="detail-sidebar"><nav class="sticky-nav">${sidebarLinks}</nav></aside>
                <div class="detail-content-area">
                    <div class="detail-section" id="phasen">
                        <h2>Projektphasen</h2>
                        <p>Relevante Projektphasen für diesen Anwendungsfall.</p>
                        <div class="phases-container phases-container--large">${phasesHtml}</div>
                    </div>

                    <div class="detail-section" id="ziele">
                        <h2>Ziele</h2>
                        <table class="data-table">
                            <thead><tr><th>Beschreibung</th></tr></thead>
                            <tbody>${goalsRowsHtml}</tbody>
                        </table>
                    </div>

                    <div class="detail-section" id="rollen">
                        <h2>Rollen & Verantwortlichkeiten</h2>
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
                    </div>

                    <div class="detail-section" id="eingaben">
                        <h2>Eingaben</h2>
                        <p>Erforderliche Informationen und Dokumente für diesen Anwendungsfall.</p>
                        <table class="data-table">
                            <thead><tr><th>Bezeichnung</th></tr></thead>
                            <tbody>${inputsRowsHtml}</tbody>
                        </table>
                    </div>

                    <div class="detail-section" id="ausgaben">
                        <h2>Ausgaben</h2>
                        <p>Ergebnisse und Lieferobjekte dieses Anwendungsfalls.</p>
                        <table class="data-table">
                            <thead><tr><th>Bezeichnung</th></tr></thead>
                            <tbody>${outputsRowsHtml}</tbody>
                        </table>
                    </div>

                    ${data.process_url ? `
                    <div class="detail-section" id="prozess">
                        <h2>Prozess</h2>
                        <p>BPMN-Prozessdiagramm für diesen Anwendungsfall.</p>
                        <div class="bpmn-viewer-container">
                            <iframe
                                src="${data.process_url}"
                                title="BPMN Prozessdiagramm"
                                allowfullscreen>
                            </iframe>
                        </div>
                    </div>` : ''}

                    <div class="detail-section" id="verknuepfungen">
                        <h2>Verknüpfungen</h2>
                        <p>Verknüpfte Dokumente und Elemente für diesen Anwendungsfall.</p>
                        <div class="info-box info-box--inline">
                            <i data-lucide="construction" class="info-box__icon"></i>
                            <div>
                                <p class="info-box__text">Diese Funktion wird derzeit entwickelt. Hier werden zukünftig verknüpfte Dokumente und Elemente angezeigt.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    setupDetailInteractions();
}

// ============================================
// MODEL DETAIL PAGE
// ============================================

function renderModelDetailPage(id, activeTags = [], activeCategory = '') {
    const data = globalModelsData.find(item => item.id === id);
    if (!data) {
        contentArea.innerHTML = '<div class="container error-state">Fachmodell nicht gefunden.</div>';
        return;
    }

    const backLink = buildHashWithTags('models', activeTags, activeCategory, [], getActiveViewFromURL());

    contentArea.innerHTML = `
        <section class="detail-hero">
            <div class="container detail-hero__inner">
                <div class="hero-content">
                    <div class="breadcrumb"><a href="#${backLink}"><i data-lucide="arrow-left" style="vertical-align: text-bottom; margin-right:5px; width: 1.1rem; height: 1.1rem;"></i> Zurück zur Liste</a></div>
                    <h1 class="hero-title">${data.title}</h1>
                    <p class="hero-subtitle">${data.description || 'Ein Fachmodell des KBOB Datenkatalogs.'}</p>
                    <div class="hero-tags">${renderTagsHtml(data.tags, activeTags)}</div>
                </div>
                <div class="hero-image-container">
                    ${data.image ? `<img src="${data.image}" alt="${data.title}">` : '<i data-lucide="boxes" class="hero-image-placeholder icon--4xl"></i>'}
                </div>
            </div>
        </section>
        <div class="container">
            <div class="info-box info-box--centered">
                <i data-lucide="hard-hat" class="info-box__icon icon--4xl"></i>
                <h2 class="info-box__title">In Entwicklung</h2>
                <p class="info-box__text">Die Detail-Ansicht für Fachmodelle wird derzeit entwickelt.</p>
            </div>
        </div>`;
}

// ============================================
// EPD DETAIL PAGE
// ============================================

function renderEpdDetailPage(id, activeTags = [], activeCategory = '') {
    const data = globalEpdsData.find(item => item.id === id);
    if (!data) {
        contentArea.innerHTML = '<div class="container error-state">Ökobilanzdaten nicht gefunden.</div>';
        return;
    }

    const backLink = buildHashWithTags('epds', activeTags, activeCategory, [], getActiveViewFromURL());

    contentArea.innerHTML = `
        <section class="detail-hero">
            <div class="container detail-hero__inner">
                <div class="hero-content">
                    <div class="breadcrumb"><a href="#${backLink}"><i data-lucide="arrow-left" style="vertical-align: text-bottom; margin-right:5px; width: 1.1rem; height: 1.1rem;"></i> Zurück zur Liste</a></div>
                    <h1 class="hero-title">${data.title}</h1>
                    <p class="hero-subtitle">${data.description || 'Ein Ökobilanzdatensatz des KBOB Datenkatalogs.'}</p>
                    <div class="hero-tags">${renderTagsHtml(data.tags, activeTags)}</div>
                </div>
                <div class="hero-image-container">
                    ${data.image ? `<img src="${data.image}" alt="${data.title}">` : '<i data-lucide="leaf" class="hero-image-placeholder icon--4xl"></i>'}
                </div>
            </div>
        </section>
        <div class="container">
            <div class="info-box info-box--centered">
                <i data-lucide="hard-hat" class="info-box__icon icon--4xl"></i>
                <h2 class="info-box__title">In Entwicklung</h2>
                <p class="info-box__text">Die Detail-Ansicht für Ökobilanzdaten wird derzeit entwickelt.</p>
            </div>
        </div>`;
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

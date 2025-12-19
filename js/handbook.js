/**
 * KBOB Fachdatenkatalog - Handbook Page
 * Handbook page renderer and related functions
 */

function renderHandbookPage() {
    contentArea.innerHTML = `
        <div class="container">
            <div class="page-header">
                <h1 class="page-title">Handbuch & Downloads</h1>
                <p class="page-lead">Alle Ressourcen zur Bauwerksdokumentation im Hochbau: Vorlagen, Prüfdateien und technische Schnittstellen.</p>
            </div>

            <!-- Handbook Layout with Sticky TOC -->
            <div class="handbook-layout">
                <!-- Main Content -->
                <div class="handbook-main">
                    <!-- Info Sections: Problem, Lösung, Kontext -->
                    <div class="info-sections">
                        <!-- Abschnitt 1: Das Problem -->
                        <article id="silos-zu-standards" class="info-section">
                            <div class="info-section__content">
                                <h2 class="info-section__header">Von Silos zu Standards</h2>
                                <p class="info-section__description">Die Digitalisierung im Bauwesen scheitert oft nicht an fehlender Technologie, sondern an fehlender Datenharmonisierung. Fachplaner verschiedener Disziplinen und Auftraggeber definieren Fachbegriffe und Datenstrukturen oft unterschiedlich. Das führt zu Medienbrüchen, manuellen Nachbearbeitungen und Informationsverlust über den gesamten Lebenszyklus. Der KBOB Fachdatenkatalog schafft ein gemeinsames Vokabular: standardisierte Bausteine für BIM-Prozesse, die durchgängige Datenflüsse ermöglichen.</p>
                            </div>
                            <figure class="info-section__figure">
                                <img src="assets/silos.jpg" alt="Datensilos im Bauwesen" class="info-section__image">
                                <figcaption class="info-section__caption">Ohne gemeinsame Standards bleiben Daten in Silos gefangen. Der Fachdatenkatalog schafft Durchgängigkeit.</figcaption>
                            </figure>
                        </article>

                        <!-- Abschnitt 2: Die Lösung -->
                        <article id="informationsaustausch" class="info-section">
                            <div class="info-section__content">
                                <h2 class="info-section__header">Klare Spielregeln für den Informationsaustausch</h2>
                                <p class="info-section__description">Im BIM-Prozess nach ISO 19650 definiert der Auftraggeber (AG), welche Informationen er benötigt, und der Auftragnehmer (AN) liefert sie. Doch was genau soll geliefert werden? Der Fachdatenkatalog beantwortet diese Frage mit standardisierten LOIN (Level of Information Need): Für jeden Anwendungsfall und jede Projektphase ist definiert, welche geometrischen und alphanumerischen Anforderungen ein Bauelement erfüllen muss. So wird aus abstrakten Auftraggeberinformationsanforderungen (AIA) ein konkreter, prüfbarer Datenstandard.</p>
                            </div>
                            <figure class="info-section__figure">
                                <img src="assets/lifecycle.jpg" alt="Informationsmanagement nach ISO 19650" class="info-section__image">
                                <figcaption class="info-section__caption">Informationsmanagement nach ISO 19650. Der Fachdatenkatalog definiert die LOIN-Bausteine für den Datenaustausch zwischen Auftraggeber und Auftragnehmer.</figcaption>
                            </figure>
                        </article>

                        <!-- Abschnitt 3: Der grössere Kontext -->
                        <article id="datenoekosystem" class="info-section">
                            <div class="info-section__content">
                                <h2 class="info-section__header">Ein Baustein im Datenökosystem Schweiz</h2>
                                <p class="info-section__description">Der Fachdatenkatalog ist Teil der Massnahme «Vereinfachung des Bauens durch bessere Dateninteroperabilität» der Strategie Digitale Schweiz und orientiert sich an den Prinzipien der eCH-0279 Architekturvision 2050. Ziel ist ein offener Standard nach dem Once-Only-Prinzip: Daten einmal strukturiert erfassen, über alle Phasen und Systeme hinweg nutzen. Open Source, damit alle profitieren.</p>
                            </div>
                            <figure class="info-section__figure">
                                <img src="assets/ecosystem.jpg" alt="Datenökosystem Schweiz" class="info-section__image">
                                <figcaption class="info-section__caption">Der Fachdatenkatalog als Teil der Schweizer Datenstrategie – eingebettet in digital.swiss, eCH-Standards und das Datenökosystem Schweiz.</figcaption>
                            </figure>
                        </article>
                    </div>

                    <h2 id="weitere-informationen" class="info-section__header" style="margin-top: var(--space-xl);">Weitere Informationen</h2>

                    <div class="handbook-accordion">
                        <!-- Downloads Section -->
                        <div class="accordion-item open">
                            <button class="accordion-header" aria-expanded="true">
                                <h2 class="accordion-title">Downloads</h2>
                                <i data-lucide="chevron-down" class="accordion-icon" aria-hidden="true"></i>
                            </button>
                            <div class="accordion-content">
                                <p class="accordion-description">Vorlagen und Prüfdateien für die digitale Bauwerksdokumentation.</p>
                                <ul class="download-list">
                                    <li class="download-item">
                                        <i data-lucide="download" class="download-item__icon" aria-hidden="true"></i>
                                        <div class="download-item__content">
                                            <a href="#" class="download-item__link">EIR-Excel</a>
                                            <div class="download-item__meta">
                                                <span>XLSX</span>
                                                <span>245 kB</span>
                                                <span>15. Oktober 2024</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="download-item">
                                        <i data-lucide="download" class="download-item__icon" aria-hidden="true"></i>
                                        <div class="download-item__content">
                                            <a href="#" class="download-item__link">IDS-Prüfregeln</a>
                                            <div class="download-item__meta">
                                                <span>ZIP</span>
                                                <span>128 kB</span>
                                                <span>15. Oktober 2024</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="download-item">
                                        <i data-lucide="download" class="download-item__icon" aria-hidden="true"></i>
                                        <div class="download-item__content">
                                            <a href="#" class="download-item__link">Revit Vorlagen</a>
                                            <div class="download-item__meta">
                                                <span>ZIP</span>
                                                <span>3.8 MB</span>
                                                <span>12. November 2024</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="download-item">
                                        <i data-lucide="download" class="download-item__icon" aria-hidden="true"></i>
                                        <div class="download-item__content">
                                            <a href="#" class="download-item__link">ArchiCAD Vorlagen</a>
                                            <div class="download-item__meta">
                                                <span>ZIP</span>
                                                <span>4.2 MB</span>
                                                <span>12. November 2024</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- Dokumentation Section -->
                        <div class="accordion-item open">
                            <button class="accordion-header" aria-expanded="true">
                                <h2 class="accordion-title">Dokumentation</h2>
                                <i data-lucide="chevron-down" class="accordion-icon" aria-hidden="true"></i>
                            </button>
                            <div class="accordion-content">
                                <p class="accordion-description">Anleitungen und Referenzmaterial für die Anwendung des Fachdatenkatalogs.</p>
                                <ul class="download-list">
                                    <li class="download-item">
                                        <i data-lucide="download" class="download-item__icon" aria-hidden="true"></i>
                                        <div class="download-item__content">
                                            <a href="#" class="download-item__link">Anwendungshandbuch</a>
                                            <div class="download-item__meta">
                                                <span>PDF</span>
                                                <span>2.4 MB</span>
                                                <span>23. September 2024</span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="download-item">
                                        <i data-lucide="download" class="download-item__icon" aria-hidden="true"></i>
                                        <div class="download-item__content">
                                            <a href="#" class="download-item__link">API-Dokumentation</a>
                                            <div class="download-item__meta">
                                                <span>PDF</span>
                                                <span>890 kB</span>
                                                <span>23. September 2024</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- Vernetzte Datenquellen Section -->
                        <div class="accordion-item open">
                            <button class="accordion-header" aria-expanded="true">
                                <h2 class="accordion-title">Vernetzte Datenquellen</h2>
                                <i data-lucide="chevron-down" class="accordion-icon" aria-hidden="true"></i>
                            </button>
                            <div class="accordion-content">
                                <p class="accordion-description">Nationale Dateninfrastrukturen und verknüpfte Dienste.</p>
                                <div class="external-item">
                                    <i data-lucide="database" class="external-item__icon" aria-hidden="true"></i>
                                    <a href="https://lindas.admin.ch/" target="_blank" rel="noopener" class="external-item__link">
                                        LINDAS – Linked Data Service
                                        <i data-lucide="external-link" class="external-icon" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div class="external-item">
                                    <i data-lucide="share-2" class="external-item__icon" aria-hidden="true"></i>
                                    <a href="https://www.i14y.admin.ch/de/home" target="_blank" rel="noopener" class="external-item__link">
                                        I14Y – Interoperabilitätsplattform
                                        <i data-lucide="external-link" class="external-icon" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div class="external-item">
                                    <i data-lucide="languages" class="external-item__icon" aria-hidden="true"></i>
                                    <a href="https://www.termdat.bk.admin.ch/" target="_blank" rel="noopener" class="external-item__link">
                                        TERMDAT – Terminologiedatenbank
                                        <i data-lucide="external-link" class="external-icon" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div class="external-item">
                                    <i data-lucide="book-open" class="external-item__icon" aria-hidden="true"></i>
                                    <a href="https://www.buildingsmart.org/users/services/buildingsmart-data-dictionary/" target="_blank" rel="noopener" class="external-item__link">
                                        bSDD – buildingSMART Data Dictionary
                                        <i data-lucide="external-link" class="external-icon" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- APIs Section -->
                        <div class="accordion-item open">
                            <button class="accordion-header" aria-expanded="true">
                                <h2 class="accordion-title">APIs</h2>
                                <i data-lucide="chevron-down" class="accordion-icon" aria-hidden="true"></i>
                            </button>
                            <div class="accordion-content">
                                <p class="accordion-description">Programmatische Schnittstellen für den Datenzugriff.</p>
                                <div class="external-item">
                                    <i data-lucide="arrow-right-left" class="external-item__icon" aria-hidden="true"></i>
                                    <a href="#" class="external-item__link">
                                        REST API
                                        <i data-lucide="external-link" class="external-icon" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div class="external-item">
                                    <i data-lucide="git-branch" class="external-item__icon" aria-hidden="true"></i>
                                    <a href="#" class="external-item__link">
                                        GraphQL API
                                        <i data-lucide="external-link" class="external-icon" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Links Section -->
                        <div class="accordion-item open">
                            <button class="accordion-header" aria-expanded="true">
                                <h2 class="accordion-title">Links</h2>
                                <i data-lucide="chevron-down" class="accordion-icon" aria-hidden="true"></i>
                            </button>
                            <div class="accordion-content">
                                <p class="accordion-description">Relevante Strategien und Standards für die digitale Transformation im Bauwesen.</p>
                                <div class="external-item">
                                    <i data-lucide="link" class="external-item__icon" aria-hidden="true"></i>
                                    <a href="https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/digitale-bundesverwaltung.html" target="_blank" rel="noopener" class="external-item__link">
                                        Strategie Digitale Bundesverwaltung
                                        <i data-lucide="external-link" class="external-icon" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div class="external-item">
                                    <i data-lucide="link" class="external-item__icon" aria-hidden="true"></i>
                                    <a href="https://digital.swiss/de/aktionsplan/massnahme/vereinfachung-des-bauens-durch-bessere-dateninteroperabilitat" target="_blank" rel="noopener" class="external-item__link">
                                        BIM - Vereinfachung der Prozesse im Bauwesen durch bessere Dateninteroperabilität
                                        <i data-lucide="external-link" class="external-icon" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div class="external-item">
                                    <i data-lucide="link" class="external-item__icon" aria-hidden="true"></i>
                                    <a href="https://www.kbob.admin.ch/de/digitalisierung-und-bim" target="_blank" rel="noopener" class="external-item__link">
                                        Strategie digitale Methoden der BLO und des ASTRA
                                        <i data-lucide="external-link" class="external-icon" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div class="external-item">
                                    <i data-lucide="link" class="external-item__icon" aria-hidden="true"></i>
                                    <a href="https://www.ech.ch/de/ech/ech-0279/1.0.0" target="_blank" rel="noopener" class="external-item__link">
                                        eCH-0279 Architekturvision 2050
                                        <i data-lucide="external-link" class="external-icon" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div class="external-item">
                                    <i data-lucide="link" class="external-item__icon" aria-hidden="true"></i>
                                    <a href="https://www.ech.ch/de/ech/ech-0122/2.0.0" target="_blank" rel="noopener" class="external-item__link">
                                        eCH-0122 Architektur E-Government Schweiz: Grundlagen
                                        <i data-lucide="external-link" class="external-icon" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div class="external-item">
                                    <i data-lucide="link" class="external-item__icon" aria-hidden="true"></i>
                                    <a href="https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/datenoekosystem_schweiz.html" target="_blank" rel="noopener" class="external-item__link">
                                        Datenökosystem Schweiz
                                        <i data-lucide="external-link" class="external-icon" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div class="external-item">
                                    <i data-lucide="link" class="external-item__icon" aria-hidden="true"></i>
                                    <a href="https://www.bk.admin.ch/bk/de/home/digitale-transformation-ikt-lenkung/bundesarchitektur/register.html" target="_blank" rel="noopener" class="external-item__link">
                                        Register
                                        <i data-lucide="external-link" class="external-icon" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <div class="external-item">
                                    <i data-lucide="link" class="external-item__icon" aria-hidden="true"></i>
                                    <a href="https://www.kbob.admin.ch/de/mustervertraege-und-publikationen" target="_blank" rel="noopener" class="external-item__link">
                                        KBOB Musterverträge und Publikationen
                                        <i data-lucide="external-link" class="external-icon" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sticky Table of Contents -->
                <aside class="handbook-toc" aria-label="Inhaltsverzeichnis">
                    <h2 class="handbook-toc__title">Inhaltsverzeichnis</h2>
                    <nav>
                        <ul class="handbook-toc__list">
                            <li class="handbook-toc__item active">
                                <a href="#silos-zu-standards" class="handbook-toc__link">
                                    <span>Von Silos zu Standards</span>
                                    <i data-lucide="corner-down-left" class="handbook-toc__icon" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li class="handbook-toc__item">
                                <a href="#informationsaustausch" class="handbook-toc__link">
                                    <span>Klare Spielregeln für den Informationsaustausch</span>
                                    <i data-lucide="corner-down-left" class="handbook-toc__icon" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li class="handbook-toc__item">
                                <a href="#datenoekosystem" class="handbook-toc__link">
                                    <span>Ein Baustein im Datenökosystem Schweiz</span>
                                    <i data-lucide="corner-down-left" class="handbook-toc__icon" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li class="handbook-toc__item">
                                <a href="#weitere-informationen" class="handbook-toc__link">
                                    <span>Weitere Informationen</span>
                                    <i data-lucide="corner-down-left" class="handbook-toc__icon" aria-hidden="true"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>
            </div>
        </div>`;

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    initAccordion();
    initHandbookToc();
}

/**
 * Initialize accordion functionality
 */
function initAccordion() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isOpen = item.classList.contains('open');

            item.classList.toggle('open');
            header.setAttribute('aria-expanded', !isOpen);
        });
    });
}

/**
 * Initialize sticky TOC with scroll highlighting
 */
function initHandbookToc() {
    const tocItems = document.querySelectorAll('.handbook-toc__item');
    const sections = document.querySelectorAll('.info-section[id], h2[id]');

    if (!tocItems.length || !sections.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                tocItems.forEach(item => {
                    const link = item.querySelector('a');
                    if (link && link.getAttribute('href') === '#' + targetId) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    tocItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    });
}

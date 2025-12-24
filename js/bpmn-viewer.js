/**
 * BPMN Viewer Module
 * Handles loading and rendering BPMN diagrams from local files
 */

// Cache for BPMN file list (to avoid multiple fetches)
let bpmnFileListCache = null;

/**
 * Get list of available BPMN files
 * @returns {Promise<string[]>} Array of BPMN filenames
 */
async function getBpmnFileList() {
    if (bpmnFileListCache) {
        return bpmnFileListCache;
    }

    // Hardcoded list of BPMN files (since we can't list directory contents from browser)
    bpmnFileListCache = [
        'uc000-minimalstandard.bpmn',
        'uc010-bestandserfassung.bpmn',
        'uc020-bedarfsplanung.bpmn',
        'uc030-planungsvarianten.bpmn',
        'uc040-visualisierung.bpmn',
        'uc050-koordination_der_fachgewerke.bpmn',
        'uc060-qualit_tspr_fung.bpmn',
        'uc070-bemessung_und_nachweisf_hrung.bpmn',
        'uc080-ableitung_von_planunterlagen.bpmn',
        'uc090-genehmigungsprozess.bpmn',
        'uc100-mengen__und_kostenermittlung.bpmn',
        'uc110-leistungsverzeichnis_und_ausschreibung.bpmn',
        'uc120-terminplanung_der_ausf_hrung.bpmn',
        'uc130-logistikplanung.bpmn',
        'uc140-baufortschrittskontrolle.bpmn',
        'uc150-_nderungs__und_nachtragsmanagement.bpmn',
        'uc160-abrechnung_von_bauleistungen.bpmn',
        'uc170-abnahme__und_m_ngelmanagement.bpmn',
        'uc180-inbetriebnahmemanagement.bpmn',
        'uc190-projekt__und_bauwerksdokumentation.bpmn',
        'uc200-nutzung_f_r_betrieb_und_erhaltung.bpmn',
        'uc210-gew_hrleistungsmanagement.bpmn',
        'uc220-wartungs__und_inspektionsmanagement.bpmn',
        'uc230-instandhaltungs__und_instandsetzungsmanagement.bpmn',
        'uc240-fl_chen__und_raumbelegungsmanagement.bpmn',
        'uc250-energiemanagement.bpmn',
        'uc260-betreiberverantwortung.bpmn',
        'uc270-nachhaltigkeitsnachweise.bpmn',
        'uc280-r_ckbauplanung.bpmn',
        'uc290-bauteilb_rse_und_wiederverwendung.bpmn'
    ];

    return bpmnFileListCache;
}

/**
 * Find BPMN file path for a given usecase ID
 * @param {string} usecaseId - The usecase ID (e.g., 'uc000')
 * @returns {Promise<string|null>} The file path or null if not found
 */
async function findBpmnFileForUsecase(usecaseId) {
    const files = await getBpmnFileList();
    const matchingFile = files.find(file => file.startsWith(usecaseId + '-'));

    if (matchingFile) {
        return `assets/bpmn/${matchingFile}`;
    }
    return null;
}

/**
 * Load BPMN XML content from file
 * @param {string} filePath - Path to the BPMN file
 * @returns {Promise<string>} The BPMN XML content
 */
async function loadBpmnFile(filePath) {
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Failed to load BPMN file: ${response.statusText}`);
    }
    return await response.text();
}

/**
 * Initialize and render BPMN diagram in a container
 * @param {string} containerId - The ID of the container element
 * @param {string} usecaseId - The usecase ID to load BPMN for
 * @returns {Promise<void>}
 */
async function renderBpmnDiagram(containerId, usecaseId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('BPMN container not found:', containerId);
        return;
    }

    // Show loading state
    container.innerHTML = `
        <div class="bpmn-loading">
            <i data-lucide="loader-2" class="bpmn-loading-spinner"></i>
            <span>Prozessdiagramm wird geladen...</span>
        </div>
    `;
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    try {
        // Find the BPMN file for this usecase
        const filePath = await findBpmnFileForUsecase(usecaseId);
        if (!filePath) {
            container.innerHTML = `
                <div class="bpmn-error">
                    <i data-lucide="file-x"></i>
                    <span>Kein Prozessdiagramm für diesen Anwendungsfall verfügbar.</span>
                </div>
            `;
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            return;
        }

        // Load the BPMN XML
        const bpmnXml = await loadBpmnFile(filePath);

        // Clear container and create canvas
        container.innerHTML = '<div class="bpmn-canvas"></div><div class="bpmn-controls"></div>';
        const canvas = container.querySelector('.bpmn-canvas');
        const controls = container.querySelector('.bpmn-controls');

        // Initialize bpmn-js viewer
        const viewer = new BpmnJS({
            container: canvas
        });

        // Import the BPMN diagram
        await viewer.importXML(bpmnXml);

        // Fit diagram to viewport
        const canvasModule = viewer.get('canvas');
        canvasModule.zoom('fit-viewport');

        // Add zoom controls
        controls.innerHTML = `
            <button class="bpmn-control-btn" data-action="zoom-in" title="Vergrössern">
                <i data-lucide="zoom-in"></i>
            </button>
            <button class="bpmn-control-btn" data-action="zoom-out" title="Verkleinern">
                <i data-lucide="zoom-out"></i>
            </button>
            <button class="bpmn-control-btn" data-action="zoom-reset" title="Zurücksetzen">
                <i data-lucide="maximize-2"></i>
            </button>
        `;
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Add control event listeners
        controls.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;

            const action = btn.dataset.action;
            const currentZoom = canvasModule.zoom();

            switch (action) {
                case 'zoom-in':
                    canvasModule.zoom(currentZoom * 1.2);
                    break;
                case 'zoom-out':
                    canvasModule.zoom(currentZoom / 1.2);
                    break;
                case 'zoom-reset':
                    canvasModule.zoom('fit-viewport');
                    break;
            }
        });

    } catch (error) {
        console.error('Error rendering BPMN diagram:', error);
        container.innerHTML = `
            <div class="bpmn-error">
                <i data-lucide="alert-triangle"></i>
                <span>Fehler beim Laden des Prozessdiagramms.</span>
            </div>
        `;
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// Export for use in other modules
window.renderBpmnDiagram = renderBpmnDiagram;
window.findBpmnFileForUsecase = findBpmnFileForUsecase;

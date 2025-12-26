/**
 * BPMN Viewer Module
 * Handles loading and rendering BPMN diagrams from local files
 *
 * BPMN file paths are now data-driven via process_url field in usecases.json
 */

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
 * @param {string} processUrl - The path to the BPMN file (from usecase.process_url)
 * @param {string} usecaseId - The usecase ID (for display purposes)
 * @returns {Promise<void>}
 */
async function renderBpmnDiagram(containerId, processUrl, usecaseId) {
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
        // Validate that we have a process URL
        if (!processUrl) {
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

        // Load the BPMN XML from the data-driven path
        const bpmnXml = await loadBpmnFile(processUrl);

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
                <i data-lucide="scan"></i>
            </button>
            <button class="bpmn-control-btn" data-action="fullscreen" title="Vollbild">
                <i data-lucide="maximize"></i>
            </button>
        `;
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Make bpmn.io logo open link directly (disable popup)
        setTimeout(() => {
            const poweredByLink = container.querySelector('.bjs-powered-by');
            if (poweredByLink) {
                // Remove the default click handler and make it a direct link
                const newLink = poweredByLink.cloneNode(true);
                newLink.setAttribute('href', 'https://bpmn.io');
                newLink.setAttribute('target', '_blank');
                newLink.setAttribute('rel', 'noopener noreferrer');
                newLink.style.cursor = 'pointer';
                poweredByLink.parentNode.replaceChild(newLink, poweredByLink);
            }
        }, 100);

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
                case 'fullscreen':
                    openBpmnFullscreen(bpmnXml, usecaseId);
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

/**
 * Open BPMN diagram in fullscreen modal
 * @param {string} bpmnXml - The BPMN XML content
 * @param {string} usecaseId - The usecase ID for the title
 */
async function openBpmnFullscreen(bpmnXml, usecaseId) {
    // Remove existing modal if any
    const existingModal = document.getElementById('bpmn-fullscreen-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal HTML
    const modal = document.createElement('div');
    modal.id = 'bpmn-fullscreen-modal';
    modal.className = 'bpmn-fullscreen-modal';
    modal.innerHTML = `
        <div class="bpmn-fullscreen-backdrop"></div>
        <div class="bpmn-fullscreen-content">
            <div class="bpmn-fullscreen-header">
                <h2 class="bpmn-fullscreen-title">Prozessdiagramm - ${usecaseId.toUpperCase()}</h2>
                <button class="bpmn-fullscreen-close" title="Schliessen">
                    <i data-lucide="x"></i>
                </button>
            </div>
            <div class="bpmn-fullscreen-body">
                <div class="bpmn-fullscreen-canvas"></div>
                <div class="bpmn-fullscreen-controls">
                    <button class="bpmn-control-btn" data-action="zoom-in" title="Vergrössern">
                        <i data-lucide="zoom-in"></i>
                    </button>
                    <button class="bpmn-control-btn" data-action="zoom-out" title="Verkleinern">
                        <i data-lucide="zoom-out"></i>
                    </button>
                    <button class="bpmn-control-btn" data-action="zoom-reset" title="Zurücksetzen">
                        <i data-lucide="scan"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize bpmn-js viewer in fullscreen
    const canvas = modal.querySelector('.bpmn-fullscreen-canvas');
    const fullscreenViewer = new BpmnJS({
        container: canvas
    });

    try {
        await fullscreenViewer.importXML(bpmnXml);
        const canvasModule = fullscreenViewer.get('canvas');
        canvasModule.zoom('fit-viewport');

        // Make bpmn.io logo open link directly in fullscreen too
        setTimeout(() => {
            const poweredByLink = canvas.querySelector('.bjs-powered-by');
            if (poweredByLink) {
                const newLink = poweredByLink.cloneNode(true);
                newLink.setAttribute('href', 'https://bpmn.io');
                newLink.setAttribute('target', '_blank');
                newLink.setAttribute('rel', 'noopener noreferrer');
                newLink.style.cursor = 'pointer';
                poweredByLink.parentNode.replaceChild(newLink, poweredByLink);
            }
        }, 100);

        // Add control event listeners for fullscreen
        const controls = modal.querySelector('.bpmn-fullscreen-controls');
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
        console.error('Error rendering fullscreen BPMN diagram:', error);
        canvas.innerHTML = `
            <div class="bpmn-error">
                <i data-lucide="alert-triangle"></i>
                <span>Fehler beim Laden des Prozessdiagramms.</span>
            </div>
        `;
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Close modal handlers
    const closeModal = () => {
        fullscreenViewer.destroy();
        modal.remove();
        document.body.style.overflow = '';
    };

    modal.querySelector('.bpmn-fullscreen-close').addEventListener('click', closeModal);
    modal.querySelector('.bpmn-fullscreen-backdrop').addEventListener('click', closeModal);

    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Activate modal with animation
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
}

// Export for use in other modules
window.renderBpmnDiagram = renderBpmnDiagram;
window.openBpmnFullscreen = openBpmnFullscreen;

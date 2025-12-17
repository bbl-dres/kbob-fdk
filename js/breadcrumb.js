/**
 * KBOB Fachdatenkatalog - Breadcrumb Navigation
 */

/**
 * Update breadcrumb navigation based on current route
 * @param {string} route - Current route
 * @param {string} id - Current item ID (for detail pages)
 * @param {string} itemTitle - Title of the current item
 */
function updateBreadcrumbs(route, id, itemTitle) {
    const breadcrumbNav = document.getElementById('breadcrumb-nav');
    if (!breadcrumbNav) return;

    let breadcrumbs = [];

    // Home is always first
    breadcrumbs.push({ label: 'Startseite', href: '#home' });

    if (route === 'home') {
        breadcrumbs = [
            { label: 'Startseite', href: '#home' },
            { label: 'Fachdatenkatalog', href: null, current: true }
        ];
    } else if (parentRoutes[route]) {
        // Detail page - show parent category and current item
        const parentRoute = parentRoutes[route];
        breadcrumbs.push({
            label: routeNames[parentRoute],
            href: `#${parentRoute}`
        });
        breadcrumbs.push({
            label: itemTitle || routeNames[route],
            href: null,
            current: true
        });
    } else {
        // List/category page
        breadcrumbs.push({
            label: routeNames[route] || route,
            href: null,
            current: true
        });
    }

    // Build HTML with dropdown icons
    const html = breadcrumbs.map((crumb, index) => {
        const separator = index > 0
            ? '<span class="breadcrumb-separator"><i data-lucide="chevron-right" aria-hidden="true"></i></span>'
            : '';

        if (crumb.current) {
            return `${separator}<span class="breadcrumb-item"><span class="breadcrumb-current">${crumb.label}</span></span>`;
        } else {
            return `${separator}<span class="breadcrumb-item"><a href="${crumb.href}">${crumb.label}</a></span>`;
        }
    }).join('');

    breadcrumbNav.innerHTML = html;

    // Re-initialize lucide icons for the chevrons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/**
 * Share current page using Web Share API or fallback to clipboard
 */
function shareCurrentPage() {
    const url = window.location.href;
    const title = document.title;

    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).catch(() => {
            copyToClipboard(url);
        });
    } else {
        copyToClipboard(url);
    }
}

/**
 * Copy text to clipboard with toast notification
 * @param {string} text - Text to copy
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Link in Zwischenablage kopiert', 'success');
    }).catch(() => {
        showToast('Kopieren fehlgeschlagen', 'error');
    });
}

/**
 * Show toast notification (placeholder - needs implementation)
 * @param {string} message - Toast message
 * @param {string} type - Toast type ('success' or 'error')
 */
function showToast(message, type) {
    // TODO: Implement toast notification UI
    console.log(`Toast [${type}]: ${message}`);
}

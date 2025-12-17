/**
 * KBOB Fachdatenkatalog - UI Utilities
 * Language dropdown and other UI helpers
 */

/**
 * Initialize language dropdown
 */
function initLanguageDropdown() {
    const dropdown = document.getElementById('langDropdown');
    if (!dropdown) return;

    const toggle = dropdown.querySelector('.lang-dropdown__toggle');
    const menu = dropdown.querySelector('.lang-dropdown__menu');
    const items = dropdown.querySelectorAll('.lang-dropdown__item');
    const currentLang = document.getElementById('currentLang');

    // Toggle dropdown
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
    });

    // Select language
    items.forEach(item => {
        item.addEventListener('click', () => {
            const lang = item.dataset.lang;

            // Update active state
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Update button text
            currentLang.textContent = lang.toUpperCase();

            // Close dropdown
            dropdown.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');

            console.log('Language selected:', lang);
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Keyboard support
    toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

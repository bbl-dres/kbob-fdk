/**
 * KBOB Fachdatenkatalog - Internationalization (i18n) Helpers
 * Provides utilities for accessing localized strings from i18n objects
 */

// ============================================
// LANGUAGE CONFIGURATION
// ============================================

/**
 * Current display language
 * Supported: 'de', 'fr', 'it', 'en'
 */
let currentLang = 'de';

/**
 * Set the current display language
 * @param {string} lang - Language code ('de', 'fr', 'it', 'en')
 */
function setLanguage(lang) {
    if (['de', 'fr', 'it', 'en'].includes(lang)) {
        currentLang = lang;
    }
}

/**
 * Get the current display language
 * @returns {string} Current language code
 */
function getLanguage() {
    return currentLang;
}

// ============================================
// TRANSLATION HELPERS
// ============================================

/**
 * Get localized string from an i18n object
 *
 * @param {Object} i18nObj - i18n object like {"de": "...", "fr": "..."}
 * @param {string} [fallbackLang='de'] - Fallback language if current language has no value
 * @returns {string} The localized string, or empty string if not found
 *
 * @example
 * t({"de": "Wand", "fr": "Mur", "it": "Parete", "en": "Wall"}) // Returns "Wand" (if currentLang is 'de')
 * t(null) // Returns ""
 */
function t(i18nObj, fallbackLang = 'de') {
    if (i18nObj === null || i18nObj === undefined) {
        return '';
    }

    // Handle plain string (defensive)
    if (typeof i18nObj === 'string') {
        return i18nObj;
    }

    // Handle i18n object
    if (typeof i18nObj === 'object') {
        // Try current language first
        if (i18nObj[currentLang]) {
            return i18nObj[currentLang];
        }
        // Fall back to specified fallback language (default: German)
        if (i18nObj[fallbackLang]) {
            return i18nObj[fallbackLang];
        }
        // Last resort: return first non-empty value
        for (const lang of ['de', 'fr', 'it', 'en']) {
            if (i18nObj[lang]) {
                return i18nObj[lang];
            }
        }
    }

    return '';
}

/**
 * Get localized strings from an array of i18n objects (tags)
 *
 * @param {Array<Object>} tagsArray - Array of i18n objects
 * @returns {string[]} Array of localized strings
 *
 * @example
 * tTags([{"de": "Betrieb", "fr": "Exploitation"}, {"de": "Koordination", "fr": "Coordination"}])
 * // Returns ["Betrieb", "Koordination"] (if currentLang is 'de')
 */
function tTags(tagsArray) {
    if (!tagsArray || !Array.isArray(tagsArray)) {
        return [];
    }

    return tagsArray.map(tag => t(tag));
}

/**
 * Check if a value is an i18n object (has language keys)
 * @param {*} value - Value to check
 * @returns {boolean} True if value is an i18n object
 */
function isI18nObject(value) {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }
    // Check if it has at least one language key
    return ['de', 'fr', 'it', 'en'].some(lang => lang in value);
}

/**
 * Create an i18n object with German value and empty placeholders for other languages
 *
 * @param {string} germanValue - The German text value
 * @returns {Object} i18n object with German value and empty placeholders
 *
 * @example
 * createI18n("Wand") // Returns {"de": "Wand", "fr": "", "it": "", "en": ""}
 */
function createI18n(germanValue) {
    return {
        de: germanValue || '',
        fr: '',
        it: '',
        en: ''
    };
}

/**
 * Create an array of i18n objects from an array of German strings
 *
 * @param {string[]} germanArray - Array of German strings
 * @returns {Object[]} Array of i18n objects
 *
 * @example
 * createI18nArray(["Betrieb", "Koordination"])
 * // Returns [{"de": "Betrieb", "fr": "", "it": "", "en": ""}, {"de": "Koordination", "fr": "", "it": "", "en": ""}]
 */
function createI18nArray(germanArray) {
    if (!Array.isArray(germanArray)) {
        return [];
    }
    return germanArray.map(value => createI18n(value));
}

# Code Review Recommendations

This document summarizes actionable recommendations from a comprehensive code review of the KBOB Fachdatenkatalog codebase.

---

## Priority 1: Critical (Security & Stability)

### 1.1 Migrate Inline Event Handlers to Event Delegation
**Impact:** Security, Maintainability
**Files:** `js/renderers.js`, `js/filters.js`, `js/pages.js`

**Current Problem:**
```javascript
onclick="event.stopPropagation(); toggleTagInURL('${safeTag}')"
```

**Solution:** Extend the existing event delegation pattern in `js/app.js` to cover all interactive elements. Use `data-*` attributes instead of inline handlers.

**Example:**
```javascript
// Instead of inline onclick
<span class="tag" onclick="toggleTagInURL('${tag}')">

// Use data attributes
<span class="tag" data-action="toggle-tag" data-tag="${escapeHtml(tag)}">

// Handle in setupEventDelegation()
if (action === 'toggle-tag') {
    toggleTagInURL(target.dataset.tag);
}
```

---

### 1.2 Fix Memory Leaks in Event Listeners
**Impact:** Performance, Stability
**Files:** `js/bpmn-viewer.js:266-276`, `js/search.js:246-261`

**Current Problem:**
- BPMN modal adds `document.addEventListener('keydown')` but only removes it on Escape key
- If modal closed via X button, listener remains attached
- Search debounce timer not cleared on navigation

**Solution:**
```javascript
// In closeModal function, always remove listener
function closeModal() {
    document.removeEventListener('keydown', handleEscape);
    modal.remove();
}

// Attach to both close triggers
modal.querySelector('.bpmn-fullscreen-close').addEventListener('click', closeModal);
modal.querySelector('.bpmn-fullscreen-backdrop').addEventListener('click', closeModal);
```

---

### 1.3 Add Defensive Null Checks
**Impact:** Stability
**Files:** `js/details.js`, `js/renderers.js`

**Current Problem:**
```javascript
data.geometry.forEach(item => { ... }); // Crashes if geometry undefined
```

**Solution:** Use optional chaining consistently:
```javascript
data.geometry?.forEach(item => { ... });
// Or with fallback
(data.geometry || []).forEach(item => { ... });
```

---

## Priority 2: High (Code Quality & Maintainability)

### 2.1 Use O(1) Lookups Consistently
**Impact:** Performance
**Files:** `js/details.js:11`

**Current Problem:**
```javascript
const data = globalElementsData.find(element => element.id === id); // O(n)
```

**Solution:** Use the existing optimized function:
```javascript
const data = getItemById('elements', id); // O(1)
```

Apply to all detail page renderers:
- `renderElementDetailPage()`
- `renderDocumentDetailPage()`
- `renderUsecaseDetailPage()`
- `renderModelDetailPage()`
- `renderEpdDetailPage()`

---

### 2.2 Implement Toast Notification UI
**Impact:** User Experience
**File:** `js/breadcrumb.js:99-106`

**Current Problem:**
```javascript
function showToast(message, type) {
    // TODO: Implement toast notification UI
    console.log(`Toast [${type}]: ${message}`);
}
```

**Solution:** Implement a simple toast component:
```javascript
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('visible'), 10);
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
```

Add corresponding CSS for `.toast` styling.

---

### 2.3 Reduce Duplicate Search Code
**Impact:** Maintainability
**File:** `js/search.js:240-340`

**Current Problem:** `setupGlobalSearch()` and `setupHeaderSearch()` have ~50 lines of duplicated logic.

**Solution:** Extract shared logic into a factory function:
```javascript
function createSearchHandler(inputSelector, dropdownSelector, options = {}) {
    const input = document.querySelector(inputSelector);
    const dropdown = document.querySelector(dropdownSelector);
    if (!input || !dropdown) return;

    // Shared debounce, escape, outside-click logic
    // Return cleanup function for proper teardown
}
```

---

### 2.4 Add Error Boundaries for Data Loading
**Impact:** User Experience
**File:** `js/app.js`

**Current Problem:** Network failures show generic error or hang indefinitely.

**Solution:**
```javascript
async function fetchWithTimeout(url, timeout = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

// Add retry logic
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fetchWithTimeout(url);
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(r => setTimeout(r, 1000 * (i + 1))); // Backoff
        }
    }
}
```

---

## Priority 3: Medium (Architecture Improvements)

### 3.1 Consolidate Global State
**Impact:** Maintainability, Testability
**File:** `js/state.js`

**Current Problem:** 15+ scattered global variables.

**Solution:** Consolidate into a single state object:
```javascript
const AppState = {
    data: {
        elements: [],
        documents: [],
        usecases: [],
        models: [],
        epds: []
    },
    indices: {
        elements: new Map(),
        documents: new Map(),
        usecases: new Map(),
        models: new Map(),
        epds: new Map()
    },
    ui: {
        filterVisible: {
            elements: false,
            documents: false,
            usecases: false,
            models: false,
            epds: false
        },
        expandedCardTags: new Set(),
        currentSearchQuery: '',
        currentSearchSort: 'date-desc'
    },
    isLoaded: false
};
```

---

### 3.2 Extract Magic Numbers to Constants
**Impact:** Maintainability
**Files:** Multiple

**Current Problem:** Hardcoded values scattered throughout:
- Search minimum length: 2
- Max dropdown results: 3
- Debounce delay: 150ms
- Focus delay: 100ms

**Solution:** Add to a constants section:
```javascript
const UI_CONSTANTS = {
    SEARCH_MIN_LENGTH: 2,
    SEARCH_MAX_DROPDOWN_RESULTS: 3,
    DEBOUNCE_DELAY_MS: 150,
    FOCUS_DELAY_MS: 100,
    TOAST_DURATION_MS: 3000
};
```

---

### 3.3 Pin CDN Library Versions
**Impact:** Stability
**File:** `index.html:10-18`

**Current Problem:**
```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```

**Solution:** Pin to specific versions:
```html
<script src="https://unpkg.com/lucide@0.263.1/dist/umd/lucide.min.js"></script>
<script src="https://unpkg.com/bpmn-js@17.11.1/dist/bpmn-navigated-viewer.production.min.js"></script>
```

Consider adding SRI (Subresource Integrity) hashes for security.

---

## Priority 4: Low (Future Improvements)

### 4.1 Add ESLint Configuration
**Impact:** Code Quality

Create `.eslintrc.json`:
```json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-unused-vars": "warn",
        "no-undef": "error",
        "eqeqeq": "error"
    },
    "globals": {
        "lucide": "readonly",
        "BpmnJS": "readonly"
    }
}
```

### 4.2 Add Basic Unit Tests
**Impact:** Reliability

Start with pure functions that have no DOM dependencies:
- `js/data.js`: `filterDataByTags()`, `filterDataByCategory()`, `getUniqueTags()`, `sortDataByTitle()`
- `js/state.js`: `escapeHtml()`
- `js/url.js`: URL parsing functions (after extracting from globals)

### 4.3 Consider ES6 Modules (Future)
**Impact:** Architecture

Migrate from script concatenation to ES6 modules:
```javascript
// js/state.js
export const AppState = { ... };
export function escapeHtml(str) { ... }

// js/app.js
import { AppState } from './state.js';
```

This eliminates the brittle script loading order.

### 4.4 Remove Unused Supabase Code (Optional)
**Impact:** Code Cleanliness
**Files:** `js/config.js`, `js/supabase-client.js`

Since Supabase is not currently in use, these files can be:
1. Removed entirely, or
2. Kept but clearly marked as "future implementation"

If keeping, remove from `index.html` script loading to reduce initial load.

---

## Summary Table

| Priority | Item | Effort | Impact |
|----------|------|--------|--------|
| 🔴 P1 | Migrate inline event handlers | Medium | High |
| 🔴 P1 | Fix memory leaks | Low | High |
| 🔴 P1 | Add null checks | Low | Medium |
| 🟠 P2 | Use O(1) lookups consistently | Low | Medium |
| 🟠 P2 | Implement toast UI | Low | Medium |
| 🟠 P2 | Reduce duplicate search code | Medium | Medium |
| 🟠 P2 | Add error boundaries | Medium | High |
| 🟡 P3 | Consolidate global state | High | High |
| 🟡 P3 | Extract magic numbers | Low | Low |
| 🟡 P3 | Pin CDN versions | Low | Medium |
| 🟢 P4 | Add ESLint | Low | Medium |
| 🟢 P4 | Add unit tests | High | High |
| 🟢 P4 | Consider ES6 modules | High | High |
| 🟢 P4 | Remove/defer Supabase code | Low | Low |

---

## Quick Wins (< 1 hour each)

1. ✅ Replace `.find()` with `getItemById()` in detail pages
2. ✅ Add optional chaining for data property access
3. ✅ Pin CDN library versions
4. ✅ Fix BPMN viewer memory leak
5. ✅ Extract magic numbers to constants

---

*Generated from code review on 2024-12-26*

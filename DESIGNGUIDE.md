# KBOB Fachdatenkatalog – Design Guide

> **Comprehensive Design System Documentation**
> Version: 1.0 | Last Updated: December 2024

This document serves as the authoritative design guide for the KBOB Fachdatenkatalog application. It documents the **current implementation state**, establishes a **target vision** aligned with the Swiss Federal Corporate Design (CD Bund) guidelines, and provides actionable recommendations for improvement.

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Component Library](#5-component-library)
6. [Accessibility (A11y)](#6-accessibility-a11y)
7. [Responsive Design](#7-responsive-design)
8. [Iconography](#8-iconography)
9. [Motion & Animation](#9-motion--animation)
10. [Gap Analysis & Roadmap](#10-gap-analysis--roadmap)
11. [Implementation Guidelines](#11-implementation-guidelines)

---

## 1. Design Philosophy

### Core Principles

The KBOB Fachdatenkatalog follows the **Swiss Federal Corporate Design (CD Bund)** guidelines, emphasizing:

| Principle | Description |
|-----------|-------------|
| **Clarity** | Information hierarchy through consistent typography and spacing |
| **Accessibility** | WCAG 2.1 AA compliance as minimum standard |
| **Trust** | Official government aesthetics that convey authority and reliability |
| **Efficiency** | Task-focused interfaces that minimize cognitive load |
| **Consistency** | Unified visual language across all touchpoints |

### Design System Architecture

```
tokens.css          → Design tokens (colors, typography, spacing)
    ↓
styles.css          → Component styles consuming tokens
    ↓
index.html          → Semantic HTML structure
    ↓
js/*.js             → Behavior and interactivity
```

---

## 2. Color System

### 2.1 Current Implementation

The application uses a token-based color system defined in `css/tokens.css`.

#### Primary Brand Colors (Swiss Confederation Red)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#DC0018` | Primary actions, links, active states |
| `--color-primary-light` | `#F7001D` | Hover states (lighter) |
| `--color-primary-dark` | `#B00014` | Pressed states, strong emphasis |

#### Interactive Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-interactive` | `#006699` | Secondary buttons, info elements |
| `--color-interactive-hover` | `#005580` | Secondary button hover |
| `--color-focus` | `#66AFE9` | Focus outlines (accessibility) |
| `--color-focus-input` | `#6366f1` | Form input focus borders |

#### Neutral Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-text-primary` | `#1a2a3a` | Body text, headings |
| `--color-text-secondary` | `#4a5568` | Secondary text, descriptions |
| `--color-text-muted` | `#718096` | Captions, placeholders |
| `--color-border` | `#e2e8f0` | Default borders |
| `--color-border-light` | `#e5e7eb` | Subtle dividers |
| `--color-border-input` | `#9ca3af` | Form input borders |

#### Surface Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-white` | `#FFFFFF` | Primary background |
| `--color-surface` | `#f7fafc` | Alternate backgrounds, cards |
| `--color-surface-alt` | `#edf2f7` | Tertiary backgrounds |
| `--color-bg-light` | `#f0f4f7` | Hero sections, subtle backgrounds |
| `--color-surface-dark` | `#3d4f5f` | Footer, dark UI sections |
| `--color-surface-darker` | `#2d3a44` | Active dark states, tag badges |

#### Status Colors

| Status | Text Color | Background Color |
|--------|------------|------------------|
| Success | `#3C763D` | `#DFF0D8` |
| Warning | `#8A6D3B` | `#FCF8E3` |
| Error | `#A94442` | `#F2DEDE` |
| Info | `#31708F` | `#D9EDF7` |

### 2.2 Target Vision: CD Bund Color Palette

The official Swiss Federal Design System uses a 10-step color scale for each palette:

#### Primary Palette (Federal Red)

| Step | Hex Value | Usage |
|------|-----------|-------|
| 50 | `#ffedee` | Lightest tint, subtle backgrounds |
| 100 | `#fae1e2` | Light backgrounds |
| 200 | `#ffccce` | Hover backgrounds |
| 300 | `#fa9da1` | Disabled states |
| 400 | `#fc656b` | Secondary emphasis |
| 500 | `#e53940` | Mid-range accent |
| 600 | `#d8232a` | **Primary action color** |
| 700 | `#bf1f25` | Hover on primary |
| 800 | `#99191e` | Active/pressed states |
| 900 | `#801519` | Darkest, high contrast |

#### Secondary Palette (Blue-Gray)

| Step | Hex Value | Usage |
|------|-----------|-------|
| 50 | `#f0f4f7` | Light surface |
| 100 | `#dfe4e9` | Borders, dividers |
| 200 | `#acb4bd` | Disabled text |
| 300 | `#828e9a` | Muted text |
| 400 | `#596978` | Secondary text |
| 500 | `#46596b` | Body text |
| 600 | `#2f4356` | Dark surfaces |
| 700 | `#263645` | Footer backgrounds |
| 800 | `#1c2834` | Primary text |
| 900 | `#131b22` | Darkest text |

### 2.3 Gap Analysis: Colors

| Aspect | Current | Target | Priority |
|--------|---------|--------|----------|
| Color scale | Flat values | 10-step scales | Medium |
| Primary red | `#DC0018` | `#d8232a` (600) | Low |
| Semantic naming | Basic | Semantic + Scale | Medium |
| Dark mode | Not implemented | Optional support | Low |

---

## 3. Typography

### 3.1 Current Implementation

#### Font Families

```css
--font-family-primary: 'Noto Sans', 'Helvetica Neue', 'Arial', sans-serif;
--font-family-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

**Noto Sans** is chosen for excellent multi-language support (DE, FR, IT, EN) and readability at various sizes.

#### Type Scale (Major Third Ratio: 1.25)

| Token | Size | Pixels | Usage |
|-------|------|--------|-------|
| `--text-display` | 2.25rem | 36px | Hero headlines |
| `--text-h1` | 1.75rem | 28px | Page titles |
| `--text-h2` | 1.5rem | 24px | Section headers |
| `--text-h3` | 1.25rem | 20px | Subsection headers |
| `--text-h4` | 1.125rem | 18px | Card titles |
| `--text-h5` | 1rem | 16px | Small headers |
| `--text-body` | 1rem | 16px | Body text |
| `--text-body-sm` | 0.875rem | 14px | Secondary text |
| `--text-body-xs` | 0.6875rem | 11px | Confederation text |
| `--text-caption` | 0.75rem | 12px | Captions, labels |

#### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `--font-weight-normal` | 400 | Body text |
| `--font-weight-medium` | 500 | Buttons, labels |
| `--font-weight-semibold` | 600 | Headings |
| `--font-weight-bold` | 700 | Strong emphasis |

#### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--line-height-tight` | 1.2 | Headings |
| `--line-height-snug` | 1.3 | Subheadings |
| `--line-height-normal` | 1.5 | Body text |
| `--line-height-relaxed` | 1.6 | Long-form content |
| `--line-height-loose` | 1.8 | Large text blocks |

### 3.2 Target Vision: CD Bund Typography

The official design system uses responsive typography with breakpoint-based scaling:

```css
/* Example: Responsive heading scale */
.text--5xl {
  font-size: 2rem;     /* base */
  font-size: 2.5rem;   /* lg: 992px */
  font-size: 3rem;     /* xl: 1200px */
  font-size: 3.5rem;   /* 3xl: 1536px */
}
```

#### Additional Typography Features

- **Word spacing**: `0.0625em` for improved readability
- **Font smoothing**: `antialiased` for crisp rendering
- **Leading trim**: Tight line-height for headlines

### 3.3 Gap Analysis: Typography

| Aspect | Current | Target | Priority |
|--------|---------|--------|----------|
| Responsive scaling | Fixed sizes | Breakpoint-based | Medium |
| Font loading | Google Fonts | Self-hosted | Low |
| Word spacing | None | 0.0625em | Low |
| Variable fonts | Standard | Consider variable | Low |

---

## 4. Spacing & Layout

### 4.1 Current Implementation

#### Spacing Scale (4px Base Unit)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Tight spacing, icon gaps |
| `--space-sm` | 8px | Component internal padding |
| `--space-md` | 16px | Standard spacing |
| `--space-lg` | 24px | Section spacing |
| `--space-xl` | 32px | Large gaps, container padding |
| `--space-2xl` | 48px | Section margins |
| `--space-3xl` | 64px | Page sections |
| `--space-4xl` | 80px | Hero spacing |

#### Layout Tokens

```css
--container-max-width: 1564px;
--container-padding: 32px;
--grid-gutter: 24px;
```

#### Breakpoints

| Token | Value | Description |
|-------|-------|-------------|
| `--breakpoint-sm` | 576px | Mobile landscape |
| `--breakpoint-md` | 768px | Tablet portrait |
| `--breakpoint-lg` | 992px | Tablet landscape / Small desktop |
| `--breakpoint-xl` | 1200px | Desktop |
| `--breakpoint-logo` | 1024px | Logo full/minimal switch |

#### Component Dimensions

| Token | Value | Usage |
|-------|-------|-------|
| `--header-height` | 146px | Main header |
| `--nav-height` | 64px | Navigation bar |
| `--footer-height` | 64px | Footer |
| `--toolbar-height` | 46px | Top bar, toolbars |

### 4.2 Target Vision: CD Bund Layout

The official design system emphasizes:

- **12-column grid** for flexible layouts
- **Container breakpoints** aligned with content needs
- **Consistent section padding** across pages
- **Sticky navigation patterns** for long pages

### 4.3 Gap Analysis: Layout

| Aspect | Current | Target | Priority |
|--------|---------|--------|----------|
| Grid system | Flexbox-based | 12-column CSS Grid | Medium |
| Container queries | None | Progressive enhancement | Low |
| Sticky sections | Partial | Consistent sticky nav | Medium |

---

## 5. Component Library

### 5.1 Buttons

#### Current Implementation

```css
/* Base button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  transition: all 150ms ease;
}
```

#### Button Variants

| Variant | Class | Usage |
|---------|-------|-------|
| Primary | `.btn--primary` | Main CTA, form submissions |
| Secondary | `.btn--secondary` | Alternative actions |
| Outline | `.btn--outline` | Secondary CTA, less emphasis |
| Ghost | `.btn--ghost` | Tertiary actions, icon buttons |

#### Button Sizes

| Size | Class | Padding |
|------|-------|---------|
| Small | `.btn--sm` | 4px 8px |
| Default | `.btn` | 8px 16px |
| Large | `.btn--lg` | 16px 24px |

#### Button States

- **Hover**: Background color shift, subtle shadow
- **Active**: Darker background, pressed effect
- **Focus**: 2px solid focus ring (`--color-focus`)
- **Disabled**: 50% opacity, cursor not-allowed

### 5.2 Form Elements

#### Text Inputs

```css
.form-input {
  width: 100%;
  padding: 8px 16px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 16px;
}

.form-input:focus {
  border-color: var(--color-focus);
  box-shadow: 0 0 0 3px rgba(102, 175, 233, 0.25);
}
```

#### Form Labels

```css
.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}
```

#### Toggle Switch

- Track: 48×26px, rounded
- Thumb: 20×20px circle
- States: unchecked (gray), checked (dark surface)

### 5.3 Cards

#### Base Card

```css
.card {
  background: white;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 150ms, box-shadow 150ms;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
```

#### Card Structure

- **Image**: 200px height, object-fit cover
- **Body**: Title, description, metadata
- **Tags**: Pill-shaped badges, single row with overflow
- **Footer**: Actions, dates, links

### 5.4 Tag Badges

```css
.tag-badge {
  display: inline-flex;
  padding: 8px 16px;
  border: 1px solid var(--color-border-input);
  border-radius: 9999px;  /* Full pill shape */
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.tag-badge.active {
  background: var(--color-surface-darker);
  color: white;
}
```

### 5.5 Tables

#### Data Table Structure

- **Header row**: Surface background, bold text
- **Body rows**: Alternating hover states
- **Cells**: 12px 16px padding
- **Sorting**: Arrow indicators in primary color

#### Responsive Behavior

- Tables become horizontally scrollable on mobile
- Header row may be hidden with data labels on cells

### 5.6 Modals

```css
.modal {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal__content {
  max-width: 600px;
  max-height: 90vh;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}
```

### 5.7 Navigation

#### Top Bar (CD Bund)

- Background: `#3e5060` (dark blue-gray)
- Height: 46px
- Contains: Language selector

#### Main Navigation

- Horizontal list with active underline (3px primary red)
- Font size: 16px
- Hover: Underline appears

#### Breadcrumb

- Separator icons between items
- Current page not linked
- Font size: 14px

### 5.8 Accordion

```css
.accordion__item {
  border-top: 1px solid var(--color-border);
}

.accordion__button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 16px 8px;
  background: transparent;
}

.accordion__drawer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms ease-out;
}

.accordion__item.open .accordion__drawer {
  max-height: 2000px;
}
```

### 5.9 Toast Notifications

```css
.toast-container {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--z-tooltip);
}

.toast {
  background: var(--color-text-primary);
  color: white;
  padding: 16px 24px;
  border-radius: 4px;
  animation: toast-slide-in 300ms ease-out;
}
```

#### Toast Variants

- **Success**: Green background (`#3C763D`)
- **Error**: Red background (`#A94442`)
- **Info**: Blue background (`#31708F`)

### 5.10 Target Vision: CD Bund Components

The official design system includes additional components:

| Component | Status | Priority |
|-----------|--------|----------|
| Buttons (all variants) | ✅ Implemented | - |
| Form inputs | ✅ Implemented | - |
| Cards | ✅ Implemented | - |
| Tables | ✅ Implemented | - |
| Modals | ✅ Implemented | - |
| Accordions | ✅ Implemented | - |
| Tabs | ⚠️ Partial | Medium |
| Steppers | ❌ Missing | Low |
| Pagination | ✅ Implemented | - |
| Tooltips | ⚠️ Basic | Low |
| Alerts/Banners | ⚠️ Toast only | Medium |
| Progress bars | ❌ Missing | Low |
| Breadcrumbs | ✅ Implemented | - |
| Navigation | ✅ Implemented | - |

---

## 6. Accessibility (A11y)

### 6.1 Current Implementation

#### Semantic HTML

- Proper landmark elements: `<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`
- Heading hierarchy: H1 → H6 in logical order
- Lists for navigation items
- Tables with proper `<thead>`, `<tbody>`, `<th>` structure

#### ARIA Attributes

```html
<!-- Navigation -->
<nav aria-label="Breadcrumb">
<button aria-expanded="false" aria-haspopup="true">

<!-- Forms -->
<form role="search" aria-label="Website durchsuchen">
<input aria-label="Suche">

<!-- Interactive elements -->
<button aria-label="Seite drucken">
<div role="menu">
```

#### Focus Management

```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;  /* Hide for mouse users */
}
```

#### Screen Reader Support

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

#### Skip Links

```css
.sr-only--focusable:focus {
  position: fixed;
  top: 8px;
  left: 8px;
  width: auto;
  height: auto;
  /* Visible styles for keyboard users */
}
```

### 6.2 Target Vision: WCAG 2.1 AA Compliance

| Criterion | Current Status | Target |
|-----------|----------------|--------|
| Color contrast (4.5:1 text) | ✅ Compliant | Maintain |
| Color contrast (3:1 UI) | ✅ Compliant | Maintain |
| Focus visible | ✅ Implemented | Enhance |
| Keyboard navigation | ✅ Working | Complete audit |
| Screen reader testing | ⚠️ Untested | Formal testing |
| Reduced motion | ⚠️ Not implemented | Implement |
| Touch targets (44×44px) | ⚠️ Some too small | Review |

### 6.3 Gap Analysis: Accessibility

| Aspect | Current | Target | Priority |
|--------|---------|--------|----------|
| Reduced motion | None | `prefers-reduced-motion` | High |
| High contrast | None | `prefers-contrast` | Medium |
| Screen reader audit | Informal | Formal NVDA/VoiceOver | High |
| Touch targets | 36px minimum | 44px minimum | Medium |
| Error handling | Basic | WCAG-compliant | Medium |

#### Recommended Addition

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Responsive Design

### 7.1 Current Implementation

#### Breakpoint Strategy

The application uses a **mobile-first** approach with three major breakpoints:

```css
/* Tablet (max-width: 992px) */
@media (max-width: 992px) {
  --container-padding: 24px;
  /* 2-column → 1-column */
  /* Sidebar becomes full-width */
}

/* Mobile (max-width: 576px) */
@media (max-width: 576px) {
  --container-padding: 16px;
  /* Header stacks */
  /* Navigation collapses */
}
```

#### Responsive Patterns

| Component | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| Container padding | 32px | 24px | 16px |
| Grid columns | 2-3 | 1-2 | 1 |
| Hero image | Visible | Hidden | Hidden |
| Sidebar | Sticky | Full-width | Full-width |
| Tables | Full display | Scrollable | Scrollable |
| Cards | Multi-column | 2-column | Single |

### 7.2 Target Vision: Enhanced Responsive Design

| Enhancement | Current | Target | Priority |
|-------------|---------|--------|----------|
| Hamburger menu | None | Mobile navigation | Medium |
| Fluid typography | None | clamp() values | Low |
| Container queries | None | Component-level | Low |
| Touch gestures | None | Swipe for cards | Low |

---

## 8. Iconography

### 8.1 Current Implementation

The application uses **Lucide Icons** via CDN:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```

#### Icon Base Styles

```css
[data-lucide] {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
```

#### Icon Sizes

| Class | Size | Usage |
|-------|------|-------|
| `.icon--sm` | 16×16px | Inline text icons |
| (default) | 20×20px | Standard UI icons |
| `.icon--lg` | 24×24px | Button icons |
| `.icon--xl` | 80×80px | Empty states |
| `.icon--3xl` | 48×48px | Feature icons |
| `.icon--4xl` | 64×64px | Hero icons |

#### Common Icons Used

| Icon | Usage |
|------|-------|
| `search` | Search functionality |
| `chevron-down` | Dropdowns, accordions |
| `chevron-up` | Scroll to top |
| `x` | Close buttons, clear |
| `printer` | Print action |
| `share-2` | Share action |
| `external-link` | External links |
| `refresh-cw` | Loading spinner |

### 8.2 Target Vision: CD Bund Iconography

The official design system uses custom SVG icons with responsive sizing:

```css
.icon--md {
  height: 1.25rem;  /* 20px */
}

@media (min-width: 992px) {
  .icon--md {
    height: 1.5rem;  /* 24px */
  }
}
```

### 8.3 Gap Analysis: Icons

| Aspect | Current | Target | Priority |
|--------|---------|--------|----------|
| Icon library | Lucide (CDN) | Self-hosted SVGs | Low |
| Responsive icons | Fixed sizes | Breakpoint scaling | Low |
| Icon sprite | None | SVG sprite sheet | Low |

---

## 9. Motion & Animation

### 9.1 Current Implementation

#### Transition Tokens

```css
--transition-fast: 150ms ease;    /* Hover, color changes */
--transition-normal: 250ms ease;  /* Transforms, larger changes */
--transition-slow: 350ms ease;    /* Rare, dramatic transitions */
```

#### Keyframe Animations

```css
/* Loading spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Toast notifications */
@keyframes toast-slide-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Copy confirmation */
@keyframes copy-flash {
  0%, 60% { background: var(--color-success-bg); }
  100% { background: transparent; }
}
```

#### Interactive Transitions

- **Cards**: `translateY(-2px)` on hover with shadow enhancement
- **Accordions**: `max-height` transition for drawer open/close
- **Dropdowns**: Opacity and visibility transitions
- **Buttons**: Background color and box-shadow transitions

### 9.2 Target Vision: Motion Guidelines

| Principle | Implementation |
|-----------|----------------|
| Purpose | Animation serves function, not decoration |
| Duration | Fast (150ms) for micro-interactions |
| Easing | `ease` or `ease-out` for natural feel |
| Reduced motion | Respect `prefers-reduced-motion` |

### 9.3 Gap Analysis: Motion

| Aspect | Current | Target | Priority |
|--------|---------|--------|----------|
| Reduced motion | Not implemented | Media query | High |
| Page transitions | None | Subtle crossfade | Low |
| Skeleton loading | None | Shimmer effect | Medium |

---

## 10. Gap Analysis & Roadmap

### 10.1 Critical Gaps (High Priority)

| Gap | Current State | Target State | Effort |
|-----|---------------|--------------|--------|
| Reduced motion | Not implemented | `prefers-reduced-motion` support | Low |
| Screen reader audit | Untested | NVDA/VoiceOver verified | Medium |
| Error message accessibility | Basic | WCAG-compliant live regions | Medium |

### 10.2 Important Gaps (Medium Priority)

| Gap | Current State | Target State | Effort |
|-----|---------------|--------------|--------|
| Color scale expansion | Flat colors | 10-step palettes | Medium |
| Mobile navigation | None | Hamburger menu | Medium |
| Skeleton loaders | None | Content placeholders | Low |
| Alert/banner component | Toast only | Full alert system | Medium |
| Touch targets | 36px | 44px minimum | Low |
| Responsive typography | Fixed | clamp() based | Medium |

### 10.3 Nice-to-Have Gaps (Low Priority)

| Gap | Current State | Target State | Effort |
|-----|---------------|--------------|--------|
| Dark mode | None | Theme toggle | High |
| Variable fonts | Standard weights | Variable font file | Low |
| Self-hosted fonts | Google Fonts | Local files | Low |
| Icon sprite | CDN | Bundled SVG sprite | Medium |
| CSS Grid layout | Flexbox | 12-column grid | Medium |
| Print styles | Basic | Comprehensive | Low |

### 10.4 Implementation Roadmap

#### Phase 1: Accessibility Hardening (Immediate)

1. Add `prefers-reduced-motion` media query
2. Audit and fix touch target sizes
3. Implement ARIA live regions for dynamic content
4. Formal screen reader testing

#### Phase 2: Design System Maturity (Short-term)

1. Expand color tokens to 10-step scales
2. Add skeleton loading states
3. Implement mobile hamburger navigation
4. Create alert/banner component

#### Phase 3: Advanced Features (Long-term)

1. Consider dark mode support
2. Migrate to self-hosted fonts
3. Implement responsive typography with `clamp()`
4. Add page transition animations

---

## 11. Implementation Guidelines

### 11.1 CSS Architecture

#### File Organization

```
css/
├── tokens.css       # Design tokens (source of truth)
└── styles.css       # Component styles
```

#### Token Usage

**Always** use CSS custom properties instead of hardcoded values:

```css
/* ✅ Correct */
.component {
  color: var(--color-text-primary);
  padding: var(--space-md);
}

/* ❌ Incorrect */
.component {
  color: #1a2a3a;
  padding: 16px;
}
```

#### BEM-Inspired Naming

```css
/* Block */
.card { }

/* Element */
.card__header { }
.card__body { }
.card__footer { }

/* Modifier */
.card--featured { }
.card--compact { }
```

### 11.2 Component Guidelines

#### Button Best Practices

1. Always include an accessible name (text or `aria-label`)
2. Use appropriate variant for action importance
3. Ensure minimum 44×44px touch target
4. Include focus-visible styles

#### Form Best Practices

1. Always associate labels with inputs (`for`/`id`)
2. Provide clear error states with ARIA
3. Use autocomplete attributes where appropriate
4. Validate on blur, not on input

#### Modal Best Practices

1. Trap focus within modal when open
2. Return focus to trigger element on close
3. Close on Escape key
4. Provide visible close button

### 11.3 Testing Checklist

#### Visual Testing

- [ ] All breakpoints render correctly
- [ ] Color contrast passes WCAG AA
- [ ] Focus states are visible
- [ ] Hover states are distinct

#### Accessibility Testing

- [ ] Keyboard navigation works end-to-end
- [ ] Screen reader announces content correctly
- [ ] No focus traps (except modals)
- [ ] Skip links function properly

#### Cross-Browser Testing

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari
- [ ] Chrome for Android

---

## Appendix: Quick Reference

### Color Tokens

```css
/* Primary actions */
var(--color-primary)          /* #DC0018 */
var(--color-primary-dark)     /* #B00014 */

/* Text hierarchy */
var(--color-text-primary)     /* #1a2a3a */
var(--color-text-secondary)   /* #4a5568 */
var(--color-text-muted)       /* #718096 */

/* Surfaces */
var(--color-white)            /* #FFFFFF */
var(--color-surface)          /* #f7fafc */
var(--color-surface-dark)     /* #3d4f5f */

/* Interactive */
var(--color-interactive)      /* #006699 */
var(--color-focus)            /* #66AFE9 */
```

### Spacing Tokens

```css
var(--space-xs)    /* 4px */
var(--space-sm)    /* 8px */
var(--space-md)    /* 16px */
var(--space-lg)    /* 24px */
var(--space-xl)    /* 32px */
var(--space-2xl)   /* 48px */
var(--space-3xl)   /* 64px */
```

### Typography Tokens

```css
var(--text-display)     /* 36px */
var(--text-h1)          /* 28px */
var(--text-h2)          /* 24px */
var(--text-h3)          /* 20px */
var(--text-body)        /* 16px */
var(--text-body-sm)     /* 14px */
var(--text-caption)     /* 12px */
```

### Z-Index Scale

```css
var(--z-dropdown)       /* 100 */
var(--z-topbar)         /* 150 */
var(--z-sticky)         /* 200 */
var(--z-modal-backdrop) /* 300 */
var(--z-modal)          /* 400 */
var(--z-tooltip)        /* 500 */
```

---

## References

- [Swiss Federal Design System](https://github.com/swiss/designsystem)
- [Swiss Government Web Guidelines](https://www.bk.admin.ch/bk/de/home/dokumentation/cd-bund.html)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lucide Icons](https://lucide.dev/)

---

*This design guide is a living document. Update it as the design system evolves.*

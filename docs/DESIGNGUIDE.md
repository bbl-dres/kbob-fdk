# KBOB Fachdatenkatalog – Design Guide

> **Comprehensive Design System Documentation**
> Version: 2.0 | Last Updated: February 2025

This document is the authoritative design guide for the KBOB Fachdatenkatalog application. It documents the **current implementation**, which has been aligned with the Swiss Federal Corporate Design (CD Bund) modern design system ([swiss/designsystem](https://github.com/swiss/designsystem)).

---

> **IMPORTANT: Modern Design System Reference**
>
> This guide and the application's CSS are aligned with the **modern** Swiss Federal Design System ([swiss/designsystem](https://github.com/swiss/designsystem)), NOT the legacy Confederation Web Guidelines ([swiss/styleguide](https://github.com/swiss/styleguide)) which was **archived on March 20, 2024**.
>
> | Aspect | Legacy (Archived) | Modern (Current) |
> |--------|-------------------|------------------|
> | Repository | swiss/styleguide | swiss/designsystem |
> | Font | Frutiger (licensed) | System fonts / Noto Sans |
> | Grid | Bootstrap 3.x | CSS Grid / Flexbox |
> | CSS | Traditional | PostCSS / Tailwind-based |
> | Status | Archived | Active development |
>
> **Do not reference** the legacy styleguide for new development.

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
10. [Print Styles](#10-print-styles)
11. [Implementation Guidelines](#11-implementation-guidelines)

---

## 1. Design Philosophy

### Core Principles

The KBOB Fachdatenkatalog follows the **Swiss Federal Corporate Design (CD Bund)** guidelines:

| Principle | Description |
|-----------|-------------|
| **Clarity** | Information hierarchy through consistent typography and spacing |
| **Accessibility** | WCAG 2.1 AA compliance as minimum standard |
| **Trust** | Official government aesthetics that convey authority and reliability |
| **Efficiency** | Task-focused interfaces that minimize cognitive load |
| **Consistency** | Unified visual language across all touchpoints |

### Design System Architecture

```
tokens.css          → Design tokens (colors, typography, spacing, shadows)
    ↓                  Source of truth: designsystem/css/skins/default.postcss
    ↓                                   designsystem/app/tailwind.config.js
styles.css          → Component styles consuming tokens (zero hardcoded values)
    ↓
index.html          → Semantic HTML structure
    ↓
js/*.js             → Behavior and interactivity (no style changes)
```

### Token-First Rule

**Every** color, font-size, spacing, radius, shadow, and transition value in `styles.css` references a CSS custom property from `tokens.css`. The only acceptable raw values are: `0`, `none`, `transparent`, `inherit`, `currentColor`, `100%`, `auto`, and structural values like `flex`, `grid`, `relative`.

---

## 2. Color System

All colors are defined in `css/tokens.css` and sourced from:
- `designsystem/css/skins/default.postcss` (primary + secondary scales)
- `designsystem/app/tailwind.config.js` (text, blue, green, yellow, orange, purple scales)

### 2.1 Primary Brand Colors (Swiss Confederation Red)

Full 10-step scale from `default.postcss`:

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary-50` | `#ffedee` | Lightest tint, error backgrounds |
| `--color-primary-100` | `#fae1e2` | Light backgrounds |
| `--color-primary-200` | `#ffccce` | Hover backgrounds |
| `--color-primary-300` | `#fa9da1` | Disabled states |
| `--color-primary-400` | `#fc656b` | Secondary emphasis |
| `--color-primary-500` | `#e53940` | Mid-range accent, prototype banners |
| `--color-primary-600` | `#d8232a` | **Primary action color** (alias: `--color-primary`) |
| `--color-primary-700` | `#bf1f25` | Hover on primary (alias: `--color-primary-dark`) |
| `--color-primary-800` | `#99191e` | Active/pressed states |
| `--color-primary-900` | `#801519` | Darkest, high contrast |

Convenience aliases:
- `--color-primary` → `var(--color-primary-600)`
- `--color-primary-light` → `var(--color-primary-500)`
- `--color-primary-dark` → `var(--color-primary-700)`

### 2.2 Secondary Colors (Blue-Gray)

Full 10-step scale from `default.postcss`:

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-secondary-50` | `#f0f4f7` | Light surface, table header bg |
| `--color-secondary-100` | `#dfe4e9` | Borders, badge bg (gray) |
| `--color-secondary-200` | `#acb4bd` | Disabled borders, accordion borders |
| `--color-secondary-300` | `#828e9a` | Muted text, disabled button text |
| `--color-secondary-400` | `#596978` | Interactive color on dark bg |
| `--color-secondary-500` | `#46596b` | Filled buttons, lang-dropdown hover |
| `--color-secondary-600` | `#2f4356` | **Top-bar bg, contact section** (alias: `--color-surface-dark`) |
| `--color-secondary-700` | `#263645` | **Footer bg** (alias: `--color-surface-darker`) |
| `--color-secondary-800` | `#1c2834` | Bare button text color |
| `--color-secondary-900` | `#131b22` | Darkest |

### 2.3 Text Colors (Gray Scale)

From `tailwind.config.js`:

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-text-50` | `#f9fafb` | Disabled input bg, search input bg |
| `--color-text-100` | `#f3f4f6` | — |
| `--color-text-200` | `#e5e7eb` | Borders (`--color-border`, `--color-border-light`) |
| `--color-text-300` | `#d1d5db` | — |
| `--color-text-400` | `#9ca3af` | Placeholders |
| `--color-text-500` | `#6b7280` | Muted text (`--color-text-muted`), input borders |
| `--color-text-600` | `#4b5563` | Secondary text (`--color-text-secondary`) |
| `--color-text-700` | `#374151` | — |
| `--color-text-800` | `#1f2937` | **Body text** (`--color-text-primary`) |
| `--color-text-900` | `#111827` | — |

### 2.4 Focus & Interactive Colors

| Token | Value | Source |
|-------|-------|--------|
| `--color-focus` | `#8655F6` | purple-500 — official CD Bund focus ring |
| `--color-focus-light` | `#c4b5fd` | purple-300 — focus on dark backgrounds |
| `--color-focus-ring-shadow` | `rgba(134, 85, 246, 0.25)` | Purple-500 at 25% for box-shadow rings |

### 2.5 Semantic Status Colors

| Status | Token (text) | Token (bg) | Token (bg-light) |
|--------|-------------|-----------|-----------------|
| Success | `--color-success` (`#047857`) | `--color-success-bg` (`#d1fae5`) | `--color-success-bg-light` (`#ecfdf5`) |
| Warning | `--color-warning` (`#b45309`) | `--color-warning-bg` (`#fef3c7`) | `--color-warning-bg-light` (`#fffbeb`) |
| Error | `--color-error` (`#bf1f25`) | `--color-error-bg` (`#fae1e2`) | `--color-error-bg-light` (`#ffedee`) |
| Info | `--color-info` (`#1d4ed8`) | `--color-info-bg` (`#dbeafe`) | `--color-info-bg-light` (`#eff6ff`) |

### 2.6 Alpha Variants (Overlays & Shadows)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-white-alpha-10` | `rgba(255,255,255,0.1)` | Scroll-top button bg |
| `--color-white-alpha-20` | `rgba(255,255,255,0.2)` | Hover states on dark bg |
| `--color-white-alpha-30` | `rgba(255,255,255,0.3)` | Borders on dark bg |
| `--color-white-alpha-50` | `rgba(255,255,255,0.5)` | Hover borders on dark bg |
| `--color-backdrop` | `rgba(0,0,0,0.6)` | Modal backdrop |
| `--color-backdrop-heavy` | `rgba(0,0,0,0.75)` | BPMN fullscreen overlay |
| `--color-primary-alpha-8` | `rgba(216,35,42,0.08)` | Search dropdown hover |

### 2.7 Badge Colors

Each badge variant uses a text/bg pair from the official color scales:

| Variant | Text Token | Bg Token |
|---------|-----------|---------|
| Gray | `--color-badge-gray-text` | `--color-badge-gray-bg` |
| Red | `--color-badge-red-text` | `--color-badge-red-bg` |
| Green | `--color-badge-green-text` | `--color-badge-green-bg` |
| Blue | `--color-badge-blue-text` | `--color-badge-blue-bg` |
| Yellow | `--color-badge-yellow-text` | `--color-badge-yellow-bg` |
| Orange | `--color-badge-orange-text` | `--color-badge-orange-bg` |
| Indigo | `--color-badge-indigo-text` | `--color-badge-indigo-bg` |
| Purple | `--color-badge-purple-text` | `--color-badge-purple-bg` |

---

## 3. Typography

### 3.1 Font Families

```css
--font-family-primary: 'Noto Sans', 'Helvetica Neue', 'Arial', sans-serif;
--font-family-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

**Noto Sans** provides excellent multi-language support (DE, FR, IT, EN). The official design system uses `Font-Regular` / `Font-Bold` custom fonts — since we use Google Fonts, we map bold via `font-weight: 700` instead of font-family switching.

### 3.2 Type Scale

Aligned with the official design system's `typography.postcss`. Base (mobile) sizes shown; responsive overrides follow the official progression.

| Token | Base Size | Official Equivalent | Usage |
|-------|-----------|-------------------|-------|
| `--text-display` | 2.5rem (40px) | `text-5xl` / `text--5xl` | Hero headlines |
| `--text-h1` | 1.625rem (26px) | `text-3xl` / `text--3xl` | Page titles |
| `--text-h2` | 1.375rem (22px) | `text-2xl` / `text--2xl` | Section headers |
| `--text-h3` | 1.25rem (20px) | `text-xl` / `text--xl` | Subsection headers |
| `--text-h4` | 1.125rem (18px) | `text-lg` / `text--lg` | Card titles |
| `--text-h5` | 1rem (16px) | `text-base` / `text--base` | Small headers |
| `--text-body` | 1rem (16px) | `text-base` | Body text |
| `--text-body-sm` | 0.875rem (14px) | `text-sm` / `text--sm` | Secondary text, labels |
| `--text-body-xs` | 0.75rem (12px) | `text-xs` / `text--xs` | Captions, small text |
| `--text-caption` | 0.75rem (12px) | `text-xs` | Captions |

#### Official Responsive Typography Progression

The design system scales text at breakpoints (lg, xl, 3xl). Example:

```
text--base:  1rem      → xl: 1.125rem  → 3xl: 1.25rem
text--lg:    1.125rem  → xl: 1.25rem   → 3xl: 1.375rem
text--xl:    1.25rem   → lg: 1.375rem  → xl: 1.625rem  → 3xl: 2rem
text--2xl:   1.375rem  → lg: 1.625rem  → xl: 2rem      → 3xl: 2.5rem
text--3xl:   1.625rem  → lg: 2rem      → xl: 2.5rem    → 3xl: 3rem
```

### 3.3 Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `--font-weight-normal` | 400 | Body text, buttons (official uses font-family for bold) |
| `--font-weight-medium` | 500 | Labels, form labels |
| `--font-weight-semibold` | 600 | Headings, emphasis |
| `--font-weight-bold` | 700 | Strong emphasis, card titles |

### 3.4 Line Heights

Aligned with Tailwind's `leading-*` utilities:

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `--line-height-tight` | 1.25 | `leading-tight` | Headings, display text |
| `--line-height-snug` | 1.375 | `leading-snug` | Subheadings, card titles |
| `--line-height-normal` | 1.5 | `leading-normal` | Body text |
| `--line-height-relaxed` | 1.625 | `leading-relaxed` | Long-form content, descriptions |
| `--line-height-loose` | 2 | `leading-loose` | Spacious text blocks |

---

## 4. Spacing & Layout

### 4.1 Spacing Scale

Numeric spacing scale (4px base) with semantic aliases:

| Numeric Token | Value | Semantic Alias |
|---------------|-------|----------------|
| `--space-1` | 4px | `--space-xs` |
| `--space-2` | 8px | `--space-sm` |
| `--space-3` | 12px | — |
| `--space-4` | 16px | `--space-md` |
| `--space-5` | 20px | — |
| `--space-6` | 24px | `--space-lg` |
| `--space-7` | 28px | — |
| `--space-8` | 32px | `--space-xl` |
| `--space-9` | 36px | — |
| `--space-10` | 40px | — |
| `--space-12` | 48px | `--space-2xl` |
| `--space-14` | 56px | — |
| `--space-16` | 64px | `--space-3xl` |
| `--space-20` | 80px | `--space-4xl` |
| `--space-32` | 128px | — |

### 4.2 Container System

Source: `designsystem/css/layouts/container.postcss`

#### Max-Width

| Breakpoint | Max-Width |
|------------|-----------|
| Below 2xl | Fluid (100%) |
| 2xl (1544px) | `1544px` (`--container-max-width-2xl`) |
| 3xl (1920px) | `1676px` (`--container-max-width-3xl`) |

Default: `--container-max-width` = `var(--container-max-width-2xl)` = 1544px

#### Responsive Container Padding

Official 7-step progression implemented as CSS custom property `--container-padding`:

| Breakpoint | Padding | Token |
|------------|---------|-------|
| Base (< 480px) | 16px | `--space-md` |
| xs (480px) | 28px | `--space-7` |
| sm (640px) | 36px | `--space-9` |
| lg (1024px) | 40px | `--space-10` |
| xl (1280px) | 48px | `--space-12` |
| 3xl (1920px) | 64px | `--space-16` |

#### Container Modifiers

```css
.container           /* Base: max-width + responsive padding */
.container--flex     /* display: flex; justify-content: space-between */
.container--grid     /* display: grid; grid-template-columns: repeat(12, 1fr) */
```

#### Section Vertical Padding

Source: `designsystem/css/layouts/section.postcss`

| Breakpoint | Padding (top + bottom) |
|------------|----------------------|
| Base | 56px (`--space-14`) |
| lg (1024px) | 80px (`--space-20`) |
| 3xl (1920px) | 128px (`--space-32`) |

### 4.3 Breakpoints

Aligned with `tailwind.config.js` screens:

| Token | Value | Description |
|-------|-------|-------------|
| `--breakpoint-xs` | 480px | Small mobile |
| `--breakpoint-sm` | 640px | Mobile landscape |
| `--breakpoint-md` | 768px | Tablet portrait |
| `--breakpoint-lg` | 1024px | Tablet landscape / Desktop |
| `--breakpoint-xl` | 1280px | Desktop |
| `--breakpoint-2xl` | 1544px | Large desktop |
| `--breakpoint-3xl` | 1920px | Extra large |
| `--breakpoint-logo` | 1024px | Logo full/minimal switch |

All `@media` queries in `styles.css` use these official values.

### 4.4 Component Dimensions

| Token | Value | Usage |
|-------|-------|-------|
| `--header-height` | 146px | Main header |
| `--nav-height` | 64px | Navigation bar |
| `--footer-height` | 64px | Footer |
| `--toolbar-height` | 46px | Top bar, toolbars |
| `--input-min-height` | 44px | Form inputs, buttons (base) |
| `--input-min-height-xl` | 48px | Inputs/buttons at xl |
| `--input-min-height-3xl` | 52px | Inputs/buttons at 3xl |

---

## 5. Component Library

### 5.1 Buttons

Source: `designsystem/css/components/btn.postcss`

#### Base Button

```css
.btn {
  min-height: 44px;         /* → xl: 48px → 3xl: 52px */
  padding: 8px 16px;
  font-weight: 400;         /* Official uses font-regular */
  line-height: 1.25;        /* leading-tight */
  border-radius: 0.125rem;  /* rounded-sm = 2px */
  border: 1px solid transparent;
}
```

#### Button Variants

| Variant | Class | Description |
|---------|-------|-------------|
| **Primary** | `.btn--primary` | Swiss Red bg, white text. Main CTA. |
| **Secondary** | `.btn--secondary` | Interactive blue bg. Alternative actions. |
| **Outline** | `.btn--outline` | Primary-600 border/text. Official `btn--outline`. |
| **Ghost/Bare** | `.btn--ghost`, `.btn--bare` | Transparent bg, secondary-800 text. Official `btn--bare`. |
| **Filled** | `.btn--filled` | Secondary-500 bg, white text, bold. Official `btn--filled`. |
| **Outline Negative** | `.btn--outline-negative` | White border on dark bg. Official `btn--outline-negative`. |
| **Bare Negative** | `.btn--bare-negative` | White text on dark bg. Official `btn--bare-negative`. |

#### Button Sizes

| Size | Class | Min-Height | Responsive |
|------|-------|------------|------------|
| Small | `.btn--sm` | 34px | xl: 40px, 3xl: 44px |
| Default | `.btn` | 44px | xl: 48px, 3xl: 52px |
| Large | `.btn--lg` | 48px | xl: 52px, 3xl: 56px |

#### Button States

- **Hover**: Color/border shift (outline: primary-700, bare: primary-600)
- **Active**: Dark surface bg, white text
- **Focus**: 2px solid `#8655F6` outline (purple-500)
- **Disabled**: Muted colors, `pointer-events: none`

### 5.2 Form Elements

Source: `designsystem/css/components/input.postcss`

#### Text Inputs

```css
.form-input {
  border: 1px solid var(--color-border-input);  /* text-500 = #6b7280 */
  border-radius: 0.0625rem;                     /* rounded-xs */
  padding: 0.625rem 16px;
  min-height: 44px;
  box-shadow: var(--shadow);                    /* Official uses shadow on inputs */
}

.form-input:focus {
  border-color: var(--color-focus);             /* #8655F6 */
  box-shadow: 0 0 0 3px var(--color-focus-ring-shadow);
}
```

#### Toggle Switch

- Track: 48x26px, `border-radius: 9999px`
- Thumb: 20x20px circle, shadow
- Checked state: `--color-surface-dark` background

### 5.3 Cards

Source: `designsystem/css/components/card.postcss`

```css
.card {
  box-shadow: var(--shadow-card);       /* = shadow-lg */
  transition: box-shadow 300ms ease-in-out;
}

.card:hover {
  box-shadow: var(--shadow-card-hover); /* = shadow-2xl */
}

.card:hover .card__title {
  color: var(--color-primary-700);      /* Official hover color */
}
```

#### Card Structure

- **Image**: 200px height, `object-fit: cover`
- **Body**: `padding: 24px` (official: `px-6 py-10`)
- **Title**: `text-lg` (1.125rem), bold, `leading-snug`, `word-break: break-word`
- **Footer**: `padding: 0 24px 24px` (official: `px-6 pb-6`)

### 5.4 Tag Badges

Source: `designsystem/css/components/badge.postcss`

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.219em 1em;
  border-radius: 9999px;          /* rounded-full */
}
```

Color variants: gray, red, green, blue, yellow, orange, indigo, purple (see badge tokens in Section 2.7).

### 5.5 Tables

Source: `designsystem/css/components/table.postcss`

- Header: `--color-surface` bg, uppercase `text-sm`, `text-text-700`
- Body cells: `padding: 16px 24px`, `border-top: 1px solid`
- Sortable headers: `.table__sorter` with arrow indicators
- Official variants: `.table--compact`, `.table--zebra`, `.table--bare`

### 5.6 Accordion

Source: `designsystem/css/components/accordion.postcss`

```css
.accordion__item {
  border-top: 1px solid var(--color-secondary-200);
}

.accordion__button {
  padding: 12px 8px;         /* py-3 px-2, responsive: 2xl: px-3 py-5 */
  font-weight: 700;          /* font-bold */
}

.accordion__button:hover {
  color: var(--color-primary-500);
}
```

Arrow rotation: `rotate(180deg)` when active. Drawer: `max-height` transition (300ms ease-out).

### 5.7 Pagination

Source: `designsystem/css/components/pagination.postcss`

- Link size: 36x36px minimum, `border-radius: var(--border-radius)`
- Active: primary bg + border, white text
- Hover: primary border color
- Focus: purple ring via `--color-focus-ring-shadow`

### 5.8 Modal

Source: `designsystem/css/components/modal.postcss`

```css
.modal {
  padding: 10vh 16px;        /* Official: py-[10vh] */
}

.modal__backdrop {
  background: var(--color-backdrop);  /* rgba(0,0,0,0.6) — official: bg-text-900/70 */
}

.modal__content {
  max-height: 80vh;
  box-shadow: var(--shadow-modal);    /* = shadow-2xl */
}
```

### 5.9 Notifications & Alerts

Source: `designsystem/css/components/notification.postcss`

Alerts use a border-left pattern with semantic background colors:

```css
.alert {
  border-left: 4px solid;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
}
```

| Variant | Background | Border | Text |
|---------|-----------|--------|------|
| Info | `--color-info-bg-light` | `--color-info` | `--color-info-text` |
| Success | `--color-success-bg-light` | `--color-success` | `--color-success-text` |
| Warning | `--color-warning-bg-light` | `--color-warning` | `--color-warning-text` |
| Error | `--color-error-bg-light` | `--color-error` | `--color-error-text` |

Toast messages: dark bg, positioned fixed bottom-center, slide-in/out animation.

### 5.10 Navigation

#### Top Bar (CD Bund)

Source: `designsystem/css/sections/top-bar.postcss`

- Background: `--color-secondary-600` (`#2f4356`)
- Min-height: `2.75rem` (44px)
- Font: `text-sm` (14px), white text
- Language dropdown: focus border `--color-focus` (`#8655F6`)

#### Header / Top Header

Source: `designsystem/css/sections/top-header.postcss`

- Background: white, `border-bottom`
- Responsive padding: `py-3 → md:py-4 → lg:py-6 → xl:py-8 → 3xl:py-10`
- Contains: Logo, confederation text, separator, title, controls

#### Main Navigation

- Active indicator: 3px solid `--color-primary` bottom border
- Gap: `--space-xl` (32px) between items
- Height: `--nav-height` (64px)

#### Breadcrumb

Source: `designsystem/css/sections/breadcrumb.postcss`

- Font: `text-sm`, `--color-text-secondary`
- `z-index: 20`
- Current page: `--color-text-primary` (not linked)

### 5.11 Footer & Contact

Source: `designsystem/css/sections/footer.postcss`

| Section | Background Token | Resolved Color |
|---------|-----------------|----------------|
| Contact | `--color-surface-dark` | `#2f4356` (secondary-600) |
| Footer | `--color-surface-darker` | `#263645` (secondary-700) |

Footer links: white text, `text-sm`, hover `--color-text-300`.

---

## 6. Accessibility (A11y)

### 6.1 Focus States

All focus indicators use the official CD Bund purple focus ring:

```css
:focus-visible {
  outline: 2px solid var(--color-focus);    /* #8655F6 — purple-500 */
  outline-offset: 2px;
}
```

Form elements use a box-shadow ring:
```css
box-shadow: 0 0 0 3px var(--color-focus-ring-shadow);  /* purple at 25% */
```

On dark backgrounds (top-bar, contact, footer), use `--color-focus-light` (`#c4b5fd`, purple-300).

### 6.2 Semantic HTML

- Landmark elements: `<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`
- Heading hierarchy: H1-H6 in logical order
- ARIA attributes: `aria-expanded`, `aria-haspopup`, `aria-label`, `role="menu"`/`role="search"`

### 6.3 Screen Reader Support

```css
.sr-only { /* Visually hidden, accessible to screen readers */ }
.sr-only--focusable:focus { /* Becomes visible on focus (skip links) */ }
```

### 6.4 Touch Targets

All interactive elements meet the 44x44px minimum:
- Buttons: `min-height: 44px` (base), 48px (xl), 52px (3xl)
- Form inputs: `min-height: 44px`
- Pagination links: 36x36px (acceptable for inline repeated items)

---

## 7. Responsive Design

### 7.1 Breakpoint Strategy

The application uses official CD Bund breakpoints with a **mobile-first** approach for container padding and **max-width** queries for component adjustments:

| Breakpoint | Value | CSS Query |
|------------|-------|-----------|
| xs | 480px | `@media (min-width: 480px)` |
| sm | 640px | `@media (max-width: 639px)` for below-sm |
| md | 768px | `@media (max-width: 768px)` for below-md |
| lg | 1024px | `@media (max-width: 1023px)` for below-lg |
| xl | 1280px | `@media (max-width: 1279px)` for below-xl |
| 2xl | 1544px | `@media (min-width: 1544px)` |
| 3xl | 1920px | `@media (min-width: 1920px)` |

### 7.2 Responsive Patterns

| Component | Desktop | Tablet (< lg) | Mobile (< sm) |
|-----------|---------|---------------|----------------|
| Container padding | 40-64px | 28-36px | 16px |
| Grid columns | 2-3 | 1-2 | 1 |
| Header padding | py-8 (32px) | py-4 (16px) | py-3 (12px) |
| Detail sidebar | Sticky side | Full-width | Full-width |
| Tables | Full display | Scrollable | Scrollable |
| Filter dropdowns | Positioned | Positioned | Bottom sheet |
| Navigation | Horizontal | Scrollable | Scrollable |

---

## 8. Iconography

### 8.1 Implementation

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
  fill: none;
}
```

#### Icon Sizes

| Class | Size | Usage |
|-------|------|-------|
| `.icon--sm` | 16x16px | Inline text icons |
| (default) | 20x20px | Standard UI icons |
| `.icon--lg` | 24x24px | Button icons |
| `.icon--3xl` | 48x48px | Feature icons |
| `.icon--4xl` | 64x64px | Hero icons |
| `.icon--xl` | 80x80px | Empty states |

---

## 9. Motion & Animation

### 9.1 Transition Tokens

```css
--transition-fast: 150ms ease;    /* Hover, color changes */
--transition-normal: 250ms ease;  /* Transforms, larger changes */
--transition-slow: 350ms ease;    /* Rare, dramatic transitions */
```

### 9.2 Keyframe Animations

- **Spinner**: `@keyframes spin` (360deg rotation)
- **Toast slide-in/out**: `@keyframes toast-slide-in` / `toast-slide-out` (translateY + opacity)
- **Copy flash**: `@keyframes copy-flash` (success bg flash)

### 9.3 Interactive Transitions

- **Cards**: `box-shadow` 300ms transition on hover (no `translateY` — matches official)
- **Accordions**: `max-height` transition for drawer open/close (300ms ease-out)
- **Accordion arrow**: `transform: rotate(180deg)` (200ms)
- **Buttons**: `all` transition (150ms)

---

## 10. Print Styles

Print styles are included via `@media print` at the end of `styles.css`.

### Hidden Elements

Top bar, prototype banners, navigation, breadcrumb toolbar, filters, pagination, toast notifications, modals, footer — all hidden in print.

### Print Adjustments

- Body: 12pt font, black text, white background
- Links: black text with underline
- Cards/alerts: no shadows, thin border
- Page break handling: avoid breaks inside cards, accordion items, tables; avoid breaks after headings

---

## 11. Implementation Guidelines

### 11.1 CSS Architecture

```
css/
├── tokens.css       # Design tokens (source of truth — 341 lines)
└── styles.css       # Component styles (5220 lines)
```

### 11.2 Token Usage Rules

**Always** use CSS custom properties:

```css
/* CORRECT */
color: var(--color-text-primary);
padding: var(--space-md);
box-shadow: var(--shadow-card);
border-radius: var(--border-radius);
font-weight: var(--font-weight-bold);

/* INCORRECT — never hardcode */
color: #1f2937;
padding: 16px;
box-shadow: 0 2px 8px rgba(0,0,0,0.08);
border-radius: 4px;
font-weight: 700;
```

**Acceptable raw values**: `0`, `none`, `transparent`, `inherit`, `currentColor`, `100%`, `auto`, `flex`, `grid`, `relative`, `1px` (structural borders).

### 11.3 Adding New Tokens

1. Check if a matching token already exists in `tokens.css`
2. If the value comes from the design system, add it under the appropriate CD Bund section
3. If the value is project-specific (BPMN, Swagger), add it under the "Project-Specific Tokens" section
4. Use clear naming: `--color-{category}-{variant}`, `--space-{number}`, `--shadow-{size}`

### 11.4 BEM-Inspired Naming

```css
.card { }                /* Block */
.card__header { }        /* Element */
.card__body { }
.card__footer { }
.card--featured { }      /* Modifier */
.card--compact { }
```

### 11.5 Testing Checklist

#### Visual Testing
- [ ] All breakpoints render correctly (xs, sm, md, lg, xl, 2xl, 3xl)
- [ ] Focus rings are purple (#8655F6) everywhere
- [ ] Hover states use correct color scale values
- [ ] Compare against Storybook: https://swiss.github.io/designsystem/

#### Token Compliance
- [ ] Zero hardcoded hex colors in `styles.css`
- [ ] Zero hardcoded `rgba()` values in `styles.css`
- [ ] Zero hardcoded `font-weight` numbers
- [ ] Zero hardcoded `border-radius` pixel values
- [ ] Zero hardcoded `box-shadow` definitions

#### Accessibility Testing
- [ ] Keyboard navigation works end-to-end
- [ ] Screen reader announces content correctly
- [ ] Focus states visible on all interactive elements
- [ ] Skip links function properly

#### Cross-Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari
- [ ] Chrome for Android

---

## Borders & Shadows Reference

Source: `tailwind.config.js`

### Border Radius Scale

| Token | Value | Tailwind |
|-------|-------|----------|
| `--border-radius-xs` | 0.0625rem (1px) | `rounded-xs` |
| `--border-radius-sm` | 0.125rem (2px) | `rounded-sm` |
| `--border-radius` | 0.1875rem (3px) | `rounded` (DEFAULT) |
| `--border-radius-lg` | 0.3125rem (5px) | `rounded-lg` |
| `--border-radius-xl` | 0.375rem (6px) | `rounded-xl` |
| `--border-radius-2xl` | 0.5rem (8px) | `rounded-2xl` |
| `--border-radius-full` | 9999px | `rounded-full` |

### Box Shadow Scale

| Token | Description |
|-------|-------------|
| `--shadow-sm` | Subtle, 1px offset |
| `--shadow` | Default, light double-layer |
| `--shadow-md` | Medium, 4px blur |
| `--shadow-lg` | Large, 20px blur — cards default (`--shadow-card`) |
| `--shadow-xl` | Extra large — dropdowns (`--shadow-dropdown`) |
| `--shadow-2xl` | Heaviest — card hover (`--shadow-card-hover`), modals (`--shadow-modal`) |

---

## Z-Index Scale

```css
--z-dropdown:       100
--z-topbar:         150
--z-sticky:         200
--z-modal-backdrop: 300
--z-modal:          400
--z-tooltip:        500
```

---

## References

### Primary Sources

- [Swiss Federal Design System](https://github.com/swiss/designsystem) — **Primary reference** (active development)
- [Design System Storybook](https://swiss.github.io/designsystem/) — Live component documentation
- [Swiss Government CD Guidelines](https://www.bk.admin.ch/bk/de/home/dokumentation/cd-bund.html) — Official corporate design documentation

### Key Source Files in the Design System

| What | File |
|------|------|
| Color definitions | `css/skins/default.postcss` |
| Tailwind config (colors, breakpoints, shadows, radii) | `app/tailwind.config.js` |
| Typography foundations | `css/foundations/typography.postcss` |
| Container layout | `css/layouts/container.postcss` |
| Grid/gap system | `css/layouts/grids.postcss` |
| Section layout | `css/layouts/section.postcss` |
| Button component | `css/components/btn.postcss` |
| Card component | `css/components/card.postcss` |
| Badge component | `css/components/badge.postcss` |
| Input component | `css/components/input.postcss` |
| Table component | `css/components/table.postcss` |
| Accordion component | `css/components/accordion.postcss` |
| Notification component | `css/components/notification.postcss` |
| Modal component | `css/components/modal.postcss` |
| Pagination component | `css/components/pagination.postcss` |
| Top Bar section | `css/sections/top-bar.postcss` |
| Top Header section | `css/sections/top-header.postcss` |
| Footer section | `css/sections/footer.postcss` |
| Breadcrumb section | `css/sections/breadcrumb.postcss` |

### Standards & Tools

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) — Accessibility requirements
- [Lucide Icons](https://lucide.dev/) — Icon library

### Legacy Resources (DO NOT USE)

- ~~swiss/styleguide~~ — **ARCHIVED March 2024**, replaced by swiss/designsystem
- ~~Confederation Web Guidelines~~ — Legacy documentation, do not reference

---

*This design guide is a living document. Update it as the design system evolves.*

# Style Guide

**Swiss Federal Design System Adaptation**  
Version 1.0 | Prototype Application

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Icons](#icons)
7. [Accessibility](#accessibility)
8. [Naming Conventions](#naming-conventions)
9. [CSS Variables Reference](#css-variables-reference)

---

## Design Philosophy

This application follows design principles inspired by the Swiss Federal Design System (Webguidelines Bund), adapted for a prototype context. The design aims to be clean, professional, and recognizable as a Swiss federal application while allowing flexibility for development.

### Core Principles

**Clarity over decoration**  
Every design element serves a purpose. Avoid decorative elements that don't contribute to usability or communication.

**Consistency creates trust**  
Consistent use of colors, typography, and spacing signals professionalism and reliability—essential for government applications.

**Content first**  
Design supports content, not the other way around. Typography and layout guide users to information efficiently.

**Accessible by default**  
All design decisions consider accessibility. Color contrast, font sizes, and interactive elements meet WCAG 2.1 AA standards.

### Swiss Design Characteristics

- **Grid-based layouts**: Structured, aligned content
- **Sans-serif typography**: Clean, readable text
- **Generous whitespace**: Breathing room improves comprehension
- **Restrained color palette**: Limited colors applied purposefully
- **Functional minimalism**: Every element earns its place

---

## Color System

The color palette adapts the official Swiss Federal Corporate Design colors. Colors are organized into semantic categories for consistent application.

### Primary Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| **Confederation Red** | `#DC0018` | `--color-primary` | Primary brand color, accents, selected states, important actions |
| **Accent Red** | `#F7001D` | `--color-primary-light` | Hover states, highlights |
| **Interactive Blue** | `#006699` | `--color-interactive` | Links, interactive elements, buttons |
| **Focus Blue** | `#66AFE9` | `--color-focus` | Focus states, input highlights |

### Neutral Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| **Black** | `#000000` | `--color-black` | Reserved for logo elements only |
| **Text Primary** | `#333333` | `--color-text-primary` | Headings, primary text |
| **Text Secondary** | `#454545` | `--color-text-secondary` | Body text, paragraphs |
| **Text Muted** | `#757575` | `--color-text-muted` | Captions, helper text, metadata |
| **Border** | `#CCCCCC` | `--color-border` | Borders, dividers |
| **Border Light** | `#D5D5D5` | `--color-border-light` | Subtle separators |
| **Background Alt** | `#E5E5E5` | `--color-bg-alt` | Alternate backgrounds, disabled states |
| **Background Light** | `#F5F5F5` | `--color-bg-light` | Page background, cards |
| **White** | `#FFFFFF` | `--color-white` | Content areas, inputs |

### Semantic Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| **Surface** | `#F2F7F9` | `--color-surface` | Card backgrounds, panels |
| **Surface Alt** | `#E7EDEF` | `--color-surface-alt` | Alternate surface, hover states |
| **Surface Blue** | `#D8E8EF` | `--color-surface-blue` | Info panels, highlighted sections |
| **Highlight** | `#FFFAB2` | `--color-highlight` | Warnings, highlighted content |

### Status Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| **Success** | `#3C763D` | `--color-success` | Success messages, valid states |
| **Warning** | `#8A6D3B` | `--color-warning` | Warnings, cautions |
| **Error** | `#A94442` | `--color-error` | Errors, invalid states |
| **Info** | `#31708F` | `--color-info` | Informational messages |

### Color Application Rules

**Red (`--color-primary`)**
- Header separator line (4px solid)
- Selected navigation items
- Active/selected states
- Important call-to-action buttons
- Do NOT use for large background areas

**Blue (`--color-interactive`)**
- All hyperlinks
- Secondary buttons
- Interactive icons
- Form focus states
- Clickable elements (non-primary)

**Grays**
- Use darker grays for text hierarchy
- Lighter grays for backgrounds and borders
- Never use pure black (`#000000`) for text

### Contrast Requirements

All text must meet WCAG 2.1 AA contrast ratios:
- Normal text (< 18pt): 4.5:1 minimum
- Large text (≥ 18pt or 14pt bold): 3:1 minimum
- UI components and graphics: 3:1 minimum

| Text Color | Background | Ratio | Pass |
|------------|------------|-------|------|
| `#333333` | `#FFFFFF` | 12.6:1 | ✓ |
| `#454545` | `#FFFFFF` | 9.7:1 | ✓ |
| `#757575` | `#FFFFFF` | 4.6:1 | ✓ |
| `#006699` | `#FFFFFF` | 5.9:1 | ✓ |
| `#DC0018` | `#FFFFFF` | 5.5:1 | ✓ |

---

## Typography

### Font Stack

Since Frutiger (the official Swiss Federal font) requires licensing, use the following open-source alternatives:

**Primary Font (UI & Text)**
```css
--font-family-primary: 'Inter', 'Helvetica Neue', 'Arial', sans-serif;
```

**Monospace (Code & Data)**
```css
--font-family-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

Inter is recommended as it was designed for screen readability and shares the clarity of Swiss-style typography.

### Type Scale

Use a consistent type scale based on a 1.25 ratio (Major Third):

| Name | Size | Line Height | Weight | CSS Variable |
|------|------|-------------|--------|--------------|
| **Display** | 36px / 2.25rem | 1.2 | 600 | `--text-display` |
| **H1** | 28px / 1.75rem | 1.3 | 600 | `--text-h1` |
| **H2** | 24px / 1.5rem | 1.3 | 600 | `--text-h2` |
| **H3** | 20px / 1.25rem | 1.4 | 600 | `--text-h3` |
| **H4** | 18px / 1.125rem | 1.4 | 600 | `--text-h4` |
| **Body** | 16px / 1rem | 1.5 | 400 | `--text-body` |
| **Body Small** | 14px / 0.875rem | 1.5 | 400 | `--text-body-sm` |
| **Caption** | 12px / 0.75rem | 1.4 | 400 | `--text-caption` |
| **Label** | 14px / 0.875rem | 1.3 | 500 | `--text-label` |

### Typography Rules

**Headings**
- Use `--color-text-primary` (#333333)
- Font weight: 600 (Semi-bold)
- Avoid all-caps except for short labels
- Maximum 70-80 characters per line

**Body Text**
- Use `--color-text-secondary` (#454545)
- Font weight: 400 (Regular)
- Optimal line length: 50-75 characters
- Paragraph spacing: 1em between paragraphs

**Links**
- Color: `--color-interactive` (#006699)
- Underlined by default
- Hover: `--color-primary` (#DC0018), underline
- Visited: can remain same as default

**Emphasis**
- Bold (`font-weight: 600`) for important text
- Avoid italics for long passages
- Never use underline for emphasis (reserved for links)

---

## Spacing & Layout

### Spacing Scale

Use a consistent 4px base unit for all spacing:

| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| **xs** | 4px | `--space-xs` | Tight spacing, icon padding |
| **sm** | 8px | `--space-sm` | Related elements, compact lists |
| **md** | 16px | `--space-md` | Default spacing, card padding |
| **lg** | 24px | `--space-lg` | Section spacing, larger gaps |
| **xl** | 32px | `--space-xl` | Section separation |
| **2xl** | 48px | `--space-2xl` | Major sections |
| **3xl** | 64px | `--space-3xl` | Page-level spacing |

### Grid System

Use a 12-column grid with consistent gutters:

```css
--grid-columns: 12;
--grid-gutter: 24px;
--container-max-width: 1200px;
--container-padding: 16px;
```

**Breakpoints**

| Name | Width | CSS Variable |
|------|-------|--------------|
| **sm** | 576px | `--breakpoint-sm` |
| **md** | 768px | `--breakpoint-md` |
| **lg** | 992px | `--breakpoint-lg` |
| **xl** | 1200px | `--breakpoint-xl` |

### Layout Principles

**Container**
- Maximum width: 1200px
- Centered with auto margins
- Horizontal padding: 16px (mobile), 24px (desktop)

**Cards & Panels**
- Border radius: 4px (subtle rounding)
- Padding: 16px–24px
- Background: `--color-white` or `--color-surface`
- Shadow (optional): `0 1px 3px rgba(0, 0, 0, 0.1)`

**Content Sections**
- Vertical spacing between sections: 32px–48px
- Group related content visually
- Use horizontal rules sparingly

---

## Components

### Buttons

**Primary Button**
```css
.btn-primary {
  background-color: var(--color-primary);      /* #DC0018 */
  color: var(--color-white);
  border: none;
  padding: var(--space-sm) var(--space-md);    /* 8px 16px */
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--color-primary-light); /* #F7001D */
}
```

**Secondary Button**
```css
.btn-secondary {
  background-color: var(--color-interactive);   /* #006699 */
  color: var(--color-white);
  border: none;
  padding: var(--space-sm) var(--space-md);
  font-weight: 500;
  border-radius: 4px;
}

.btn-secondary:hover {
  background-color: #005580;
}
```

**Outline Button**
```css
.btn-outline {
  background-color: transparent;
  color: var(--color-interactive);
  border: 1px solid var(--color-interactive);
  padding: var(--space-sm) var(--space-md);
  font-weight: 500;
  border-radius: 4px;
}

.btn-outline:hover {
  background-color: var(--color-interactive);
  color: var(--color-white);
}
```

### Form Elements

**Input Fields**
```css
.form-input {
  border: 1px solid var(--color-border);        /* #CCCCCC */
  border-radius: 4px;
  padding: var(--space-sm) var(--space-md);     /* 8px 16px */
  font-size: var(--text-body);
  background-color: var(--color-white);
}

.form-input:focus {
  border-color: var(--color-focus);             /* #66AFE9 */
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 175, 233, 0.25);
}

.form-input:invalid {
  border-color: var(--color-error);
}
```

**Labels**
```css
.form-label {
  font-size: var(--text-label);
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
  display: block;
}
```

**Select Dropdowns**
- Same styling as inputs
- Include chevron icon on right
- Native select for accessibility

### Cards

```css
.card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border-light);
  border-radius: 4px;
  padding: var(--space-md);                     /* 16px */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.card-header {
  border-bottom: 1px solid var(--color-border-light);
  padding-bottom: var(--space-sm);
  margin-bottom: var(--space-md);
}

.card-title {
  font-size: var(--text-h4);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}
```

### Tables

```css
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  background-color: var(--color-surface);       /* #F2F7F9 */
  color: var(--color-text-primary);
  font-weight: 600;
  text-align: left;
  padding: var(--space-sm) var(--space-md);
  border-bottom: 2px solid var(--color-border);
}

.table td {
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--color-border-light);
  color: var(--color-text-secondary);
}

.table tr:hover {
  background-color: var(--color-surface);
}
```

### Navigation

**Header**
- Height: 60-80px
- Background: `--color-white`
- Border bottom: 4px solid `--color-primary` (red line)
- Logo on left, navigation on right

**Navigation Links**
```css
.nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: var(--space-sm) var(--space-md);
  font-weight: 500;
}

.nav-link:hover {
  color: var(--color-interactive);
}

.nav-link.active {
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
}
```

### Alerts & Messages

```css
.alert {
  padding: var(--space-md);
  border-radius: 4px;
  border-left: 4px solid;
  margin-bottom: var(--space-md);
}

.alert-info {
  background-color: var(--color-surface-blue);
  border-left-color: var(--color-info);
  color: var(--color-info);
}

.alert-success {
  background-color: #DFF0D8;
  border-left-color: var(--color-success);
  color: var(--color-success);
}

.alert-warning {
  background-color: var(--color-highlight);
  border-left-color: var(--color-warning);
  color: var(--color-warning);
}

.alert-error {
  background-color: #F2DEDE;
  border-left-color: var(--color-error);
  color: var(--color-error);
}
```

---

## Icons

### Icon Guidelines

- Use simple, one-color icons
- Size: 16px (inline), 20px (default), 24px (large)
- Color: Inherit from text or use `--color-interactive`
- Provide aria-labels for standalone icons

### Recommended Icon Libraries

1. **Lucide Icons** (recommended): Clean, consistent, open-source
2. **Feather Icons**: Simple and minimal
3. **Heroicons**: Good for UI elements

### Icon Usage

```html
<!-- Decorative icon (hidden from screen readers) -->
<span class="icon icon--pdf" aria-hidden="true"></span>

<!-- Interactive icon (needs label) -->
<button aria-label="Download PDF">
  <span class="icon icon--download"></span>
</button>

<!-- Icon with text -->
<a href="/document.pdf" class="icon-link">
  <span class="icon icon--pdf" aria-hidden="true"></span>
  <span>Download Document</span>
</a>
```

---

## Accessibility

### Checklist

- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 for text)
- [ ] All interactive elements are keyboard accessible
- [ ] Focus states are clearly visible
- [ ] Images have alt text
- [ ] Form inputs have associated labels
- [ ] Error messages are descriptive
- [ ] Language is declared (`lang` attribute)
- [ ] Heading hierarchy is logical (h1 → h2 → h3)
- [ ] Skip link provided for main content

### Focus States

All focusable elements must have visible focus indicators:

```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* Remove default outline only when custom focus is applied */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Screen Reader Only

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

---

## Naming Conventions

### CSS Classes

Use BEM (Block Element Modifier) methodology:

```css
/* Block */
.card { }

/* Element */
.card__header { }
.card__title { }
.card__body { }
.card__footer { }

/* Modifier */
.card--highlighted { }
.card--compact { }
```

### CSS Variables

Use semantic naming with kebab-case:

```css
/* Color */
--color-{category}-{variant}
--color-primary
--color-text-secondary
--color-bg-light

/* Spacing */
--space-{size}
--space-md
--space-lg

/* Typography */
--text-{element}
--font-family-{type}
```

### File Naming

- Components: `ComponentName.vue` (PascalCase)
- Styles: `component-name.css` (kebab-case)
- Utilities: `_utilities.css` (prefixed with underscore)
- Images: `icon-name.svg`, `image-description.png` (kebab-case)

---

## CSS Variables Reference

Complete CSS custom properties for copy-paste implementation:

```css
:root {
  /* =====================
     COLOR SYSTEM
     ===================== */
  
  /* Primary */
  --color-primary: #DC0018;
  --color-primary-light: #F7001D;
  --color-primary-dark: #B00014;
  
  /* Interactive */
  --color-interactive: #006699;
  --color-interactive-hover: #005580;
  --color-focus: #66AFE9;
  
  /* Neutrals */
  --color-black: #000000;
  --color-text-primary: #333333;
  --color-text-secondary: #454545;
  --color-text-muted: #757575;
  --color-border: #CCCCCC;
  --color-border-light: #D5D5D5;
  --color-bg-alt: #E5E5E5;
  --color-bg-light: #F5F5F5;
  --color-white: #FFFFFF;
  
  /* Surfaces */
  --color-surface: #F2F7F9;
  --color-surface-alt: #E7EDEF;
  --color-surface-blue: #D8E8EF;
  --color-highlight: #FFFAB2;
  
  /* Status */
  --color-success: #3C763D;
  --color-success-bg: #DFF0D8;
  --color-warning: #8A6D3B;
  --color-warning-bg: #FCF8E3;
  --color-error: #A94442;
  --color-error-bg: #F2DEDE;
  --color-info: #31708F;
  --color-info-bg: #D9EDF7;
  
  /* =====================
     TYPOGRAPHY
     ===================== */
  
  --font-family-primary: 'Inter', 'Helvetica Neue', 'Arial', sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  
  --text-display: 2.25rem;    /* 36px */
  --text-h1: 1.75rem;         /* 28px */
  --text-h2: 1.5rem;          /* 24px */
  --text-h3: 1.25rem;         /* 20px */
  --text-h4: 1.125rem;        /* 18px */
  --text-body: 1rem;          /* 16px */
  --text-body-sm: 0.875rem;   /* 14px */
  --text-caption: 0.75rem;    /* 12px */
  --text-label: 0.875rem;     /* 14px */
  
  --line-height-tight: 1.2;
  --line-height-snug: 1.3;
  --line-height-normal: 1.5;
  
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* =====================
     SPACING
     ===================== */
  
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  /* =====================
     LAYOUT
     ===================== */
  
  --container-max-width: 1200px;
  --container-padding: 16px;
  --grid-gutter: 24px;
  
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  
  /* =====================
     BORDERS & SHADOWS
     ===================== */
  
  --border-radius-sm: 2px;
  --border-radius: 4px;
  --border-radius-lg: 8px;
  --border-radius-full: 9999px;
  
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* =====================
     TRANSITIONS
     ===================== */
  
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;
  
  /* =====================
     Z-INDEX SCALE
     ===================== */
  
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal-backdrop: 300;
  --z-modal: 400;
  --z-tooltip: 500;
}
```

---

## Quick Reference Card

### Essential Colors

| Purpose | Variable | Hex |
|---------|----------|-----|
| Primary brand | `--color-primary` | #DC0018 |
| Links & buttons | `--color-interactive` | #006699 |
| Body text | `--color-text-secondary` | #454545 |
| Borders | `--color-border` | #CCCCCC |
| Page background | `--color-bg-light` | #F5F5F5 |
| Card background | `--color-white` | #FFFFFF |

### Essential Spacing

| Size | Variable | Value |
|------|----------|-------|
| Small | `--space-sm` | 8px |
| Medium | `--space-md` | 16px |
| Large | `--space-lg` | 24px |

### Essential Typography

| Element | Size | Weight |
|---------|------|--------|
| Heading 1 | 28px | 600 |
| Heading 2 | 24px | 600 |
| Body | 16px | 400 |
| Label | 14px | 500 |

---

## References

- [Swiss Design System (Webguidelines Bund)](https://github.com/swiss/designsystem)
- [Swiss Confederation Styleguide](https://swiss.github.io/styleguide/en/)
- [geo.admin.ch Map Viewer](https://github.com/geoadmin/web-mapviewer)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*This style guide is an adaptation of Swiss Federal design principles for prototype development. For official federal applications, consult the official Webguidelines Bund and CD Bund documentation.*

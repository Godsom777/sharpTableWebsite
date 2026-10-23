# SharpTable Universal Design Guide

This guide codifies the design language of the approved SharpTable homepage for all other pages (`/features`, `/for-hotels`, `/pricing`, `/faq`, `/partnership`). It serves as the single source of truth to ensure zero stylistic divergence, consistent component mechanics, and 100% functional parity.

---

## 1. Core Aesthetic Principles

Inspired by Apple's developer and product showcase architecture:
1. **One Core Focus Per Band:** Every full-width section communicates exactly one message with an impactful headline, a concise supporting lead paragraph, an optional action row, and a structured visual or interactive component.
2. **Alternating Section Rhythm:** Bands strictly alternate between White (`--bg`) and Light Gray (`--bg2`). The footer always uses `--bg2`.
3. **Generous, Disciplined Spacing:** Standard section vertical padding is `96px 22px`. Hero sections use `72px 22px 96px`. Visuals sit `56px` below their heading block.
4. **Text-First & Code-Driven Mockups:** No stock photography, generic clip art, or heavy illustration libraries. Features and dashboards are rendered using clean semantic HTML and CSS shapes.
5. **No Visual Clutter:** No gradients (laptop base is the only exception), no decorative drop shadows (only `.card` and `.phone` use disciplined shadows), no borders thicker than 1px.
6. **No Runtime Motion Fatigue:** Zero parallax, reveal animations, or scroll observers. Only crisp hover states (e.g. brightness filter on buttons, underline on links) and smooth anchor scrolling.

---

## 2. Design Tokens & Theming

### 2.1 CSS Custom Properties

```css
:root, .st-home, .st-page {
  --bg: #ffffff;
  --bg2: #f5f5f7;
  --card: #ffffff;
  --tx: #1d1d1f;
  --mu: #6e6e73;
  --bl: #0071e3;
  --lk: #0066cc;
  --ln: #d2d2d7;
  --nav: rgba(255, 255, 255, 0.82);
  --ok: #248a3d;
  --sh: 0 12px 40px rgba(0, 0, 0, 0.07);
  color-scheme: light;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .st-page,
  .st-page:not([data-theme="light"]) {
    --bg: #000000;
    --bg2: #161617;
    --card: #1d1d1f;
    --tx: #f5f5f7;
    --mu: #a1a1a6;
    --lk: #2997ff;
    --ln: #3a3a3c;
    --nav: rgba(22, 22, 23, 0.82);
    --ok: #30d158;
    --sh: none;
    color-scheme: dark;
  }
}

:root[data-theme="dark"] .st-page,
.st-page[data-theme="dark"] {
  --bg: #000000;
  --bg2: #161617;
  --card: #1d1d1f;
  --tx: #f5f5f7;
  --mu: #a1a1a6;
  --lk: #2997ff;
  --ln: #3a3a3c;
  --nav: rgba(22, 22, 23, 0.82);
  --ok: #30d158;
  --sh: none;
  color-scheme: dark;
}
```

### 2.2 Fixed Colors (Unchanged Across Themes)

- **Device bezels & islands:** `#0b0b0c`
- **Bezel outer stroke:** `#3a3a3c`
- **Alert / Flag accent:** `#d9480f`
- **Traffic light dots:** `#ff5f57` (red), `#febc2e` (yellow), `#28c840` (green)
- **Laptop base gradient:** `linear-gradient(#e3e3e6, #c4c4c9)`
- **White text on buttons:** `#ffffff`

---

## 3. Typography Scale

**Font Stacks:**
- Body & Labels: `-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, "Helvetica Neue", Arial, sans-serif`
- Brand Wordmark: `-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, "Helvetica Neue", Arial, sans-serif`

| Role | Font Size | Weight | Tracking | Line Height | Color | Usage |
|---|---|---|---|---|---|---|
| **H1** | `clamp(42px, 8vw, 80px)` | 600 | -0.03em | 1.04 | `--tx` | Hero headline, centered, max-width 12em |
| **H2** | `clamp(32px, 5.4vw, 56px)` | 600 | -0.03em | 1.08 | `--tx` | Section titles, centered, max-width 15em |
| **H3** | 24px – 28px | 600 | -0.02em | 1.2 | `--tx` | Card & tile headings |
| **Lead** | `clamp(19px, 2.3vw, 24px)` | 400 | -0.015em | 1.38 | `--mu` | Subheadings, centered, max-width 640px |
| **Body** | 17px | 400 | -0.01em | 1.47 | `--tx` | Standard content and lists |
| **Proof Num** | `clamp(88px, 20vw, 200px)` | 600 | -0.05em | 1.0 | `--tx` | Stat callouts (e.g. +42%) |
| **Muted Meta**| 14px – 15px | 400 | 0 | 1.4 | `--mu` | Table subtitles, timestamps, notes |
| **Caption** | 12px – 13px | 400 – 600 | 0 | 1.3 | `--mu` / `--ok` | Window headers, badges, chips |

---

## 4. Reusable Component Catalog

### 4.1 Navigation (`nav`)
- Sticky to top: `top: env(safe-area-inset-top, 0px)`, `z-index: 11`
- Background: `--nav` with `-webkit-backdrop-filter: saturate(180%) blur(20px)` and `backdrop-filter: saturate(180%) blur(20px)`
- Inner bar: `max-width: 1024px`, height `52px`, padding `0 22px`, flex, gap `24px`
- Brand: 21px 600, link to `/`
- Desktop links: 12px `--mu`, hover `--tx`
- Small pill button: "Get started", padding `5px 12px`, 12px
- Mobile: hamburger toggle (44x44px target) opens drawer on `--bg` with `--ln` dividers and 17px links.

### 4.2 Buttons & Links
- **Primary Pill (`.btn`):**
  `display: inline-block; background: var(--bl); color: #fff; border-radius: 980px; padding: 12px 24px; font-size: 17px; line-height: 1.2; text-decoration: none;`
  Hover: `filter: brightness(1.1)`
- **Chevron Link (`.lnk`):**
  `color: var(--lk); text-decoration: none; font-size: 19px;`
  CSS pseudo-element: `::after { content: " \203A"; }`
  Hover: `text-decoration: underline`
  *(Never type the chevron character in the HTML text!)*

### 4.3 Container & Bands
- Standard Section: `padding: 96px 22px; text-align: center;`
- Alt Section: `background: var(--bg2);`
- Max Width Wrapper (`.w`): `max-width: 980px; margin: 0 auto;`

### 4.4 Cards (`.card`)
- `background: var(--card); border: 1px solid var(--ln); border-radius: 28px; box-shadow: var(--sh); text-align: left; overflow: hidden;`

### 4.5 Data Rows (`.row`)
- `display: flex; flex-wrap: wrap; align-items: center; gap: 4px 16px; padding: 16px 28px; border-top: 1px solid var(--ln);`
- `b`: title, basis 150px
- `span`: muted metadata, 15px
- `.amt`: 15px 600 `--tx`, right-aligned

### 4.6 Window Title Bar (`.tb`)
- Padding `14px 20px`, 13px `--mu`, flex row.
- Three traffic dots: red `#ff5f57`, yellow `#febc2e`, green `#28c840` (11px each, gap 7px).
- Right count / badge: `margin-left: auto`, 600 weight, `--ok` green (or `.fl` in orange `#d9480f`).

### 4.7 Step / Feature Tiles (`.grid` > `.tile`)
- `display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; text-align: left;`
- `.tile`: background `--card`, radius `28px`, padding `36px 32px`, **no border, no shadow**.
- Number: 48px 600 in `--lk`, margin-bottom 56px.

### 4.8 Pricing Tiers (`.two` > `.tier`)
- Grid 2-column: `repeat(auto-fit, minmax(300px, 1fr))`, gap 20px.
- Background `--card`, radius `28px`, 1px `--ln` border, padding 36px, flex column.
- List items have `✓` prefix in `--lk` (`::before`), 12px vertical padding, 1px top border.
- The list has `flex: 1` so buttons align at the bottom.

### 4.9 Accordion / FAQ Item
- 1px top border in `--ln`, padding `20px 0`, text-align left.
- Question: 20px 600 `--tx`, clean expand/collapse trigger with chevron.
- Answer: 17px `--mu`, line-height 1.5.

### 4.10 Footer (`footer`)
- Full width, `--bg2`, 1px top border, padding `20px 22px`, 12px `--mu`.
- Inner `.w`: `display: flex; flex-wrap: wrap; gap: 8px 24px; justify-content: space-between;`
- Right links: SharpTable Manager (Google Play), iOS (Coming Soon), Support, Contact, Privacy Policy (modal trigger), Terms of Service (modal trigger).

---

## 5. Strict Execution Checklist for Each Page

When adapting each page (`/features`, `/for-hotels`, `/pricing`, `/faq`, `/partnership`):
1. **Preserve All Functionality:** Form submissions, contact mailto, payment modal triggers, auth contexts, URL routing.
2. **Apply The Scoped Design System:** Wrap in `.st-page` (inheriting all tokens and rules).
3. **Use the Standard Shared `HomeNav` and `HomeFooter`:** Keep consistent navigation across the whole site.
4. **Transform Feature Grids & Content Blocks:**
   - Convert old dark-only card grids into alternating light/dark bands, tiles, and structured cards.
   - Maintain exact copy, pricing logic, and feature descriptions.
5. **Verify Breakpoints (980px & 734px):** Ensure zero horizontal scroll and fluid clamp typography.

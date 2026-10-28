# SharpTable Website — Design Guide

**Source of truth for `sharpTableWebsite` (the marketing site).** It describes the live homepage system in `components/apple/apple.css`, `app/(site)/page.tsx` and `components/apple/` (Nav, Bits, Compare, Foot). If code and this guide disagree, fix one so they match. Do not add a second aesthetic.

## Principles
- **Sparse, like apple.com.** Clean, minimal, very few words.
- **One message per band.** Bands (`.tile`) alternate white and pale (`.tile.pale`).
- **Real product screenshots in device frames:** phone, tablet, or the baked desktop lockup. Do not use invented HTML dashboards or code mockups as the marketing hero.
- **Honesty.** No fake pilots, quotes or logos. Staff and dashboard shots carry a "Sample data" label. The proof strip (`.points`) lists product truths only.
- **Restrained motion.** Use hover and press feedback only. Respect `prefers-reduced-motion`. No scroll-reveal fatigue.

## Tokens (`.ap`)
| Token | Value | Use |
|---|---|---|
| `--ink` | `#0b1b33` | Primary text |
| `--ink2` | `#5b6476` | Secondary text |
| `--pale` | `#eef4fb` | Alternate band, footer |
| `--blue` | `#dbe8f7` | Soft surfaces |
| `--navy` | `#0b1b33` | Dark accents |
| `--y` | `#F5C518` | Primary CTA fill |

- **Font:** `-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, "Helvetica Neue", sans-serif`
- **Primary CTA** (`.pill`): yellow `--y` fill, dark text `#1d1d1f`, `border-radius: 980px`, min-height 44px.
- **Text link** (`.lm`): `#0a66c2`. Links that need an arrow have a `›` written into the link text.

## Type
Sizes are listed as mobile / ≥734px / ≥1068px.

| Role | Size | Weight / notes |
|---|---|---|
| H1 (hero, `.home h1`) | 40 / 56 / 64px | **700**, tracking ≈ −0.025em |
| H2 section titles | 40 / 56 / 64px | 600, tracking −0.02em |
| H3 | 21px | 600 |
| Sub / lede (`.home .sub`) | 17 / 21 / 24px, line-heights 22 / 26 / 29 | 400 |
| Proof strip (`.home .points`) | 13 / 15px | `--ink2` |
| FAQ answers | 15px, 16px from 734px | `--ink2` |
| Compare footnote | 11px | `--ink2` |

Hierarchy runs H1 (boldest) → section titles → smaller sub and body copy. Homepage overrides live under the `.home` wrapper at the end of `apple.css`.

## Nav
- Primary: **"Book a demo"** (yellow) → `DEMO_URL`.
- A small **"Log in"** link sits on the right → `/account`. Do not label it "Account".

## CTAs
- Primary: **Book a 15-minute demo** → `DEMO_URL`. This is a placeholder (`/pricing`) until Okoro supplies the real URL.
- Secondary: **Chat on WhatsApp** → `WA_URL`. This is a placeholder (`#whatsapp`).
- Both constants live in `components/apple/Bits.tsx`. Never invent real URLs for them.

## Lockups
- **Desktop "Every branch":** one baked composite image (laptop and phone overlapping inside the art). Do not use separately CSS-positioned devices.
- **Mobile:** stacked or separate devices are allowed.
- Show at most **one** "Sample data" label per page section/lockup, and keep it as quiet as `.tag`.

## Compare
- Rows start with the features where SharpTable wins.
- The **From (monthly)** price row sits at the bottom.
- There is no "Every feature on every plan" row; that claim lives in the proof strip.
- The footnote states honestly how MyQR and SambaPOS figures were sourced.

## Scope
- This guide governs the marketing site.
- Product UI (Admin/Manager) must not invent a conflicting marketing aesthetic. In-app UI follows Apple-light chrome: clean, calm, minimal. Do not bring navy/yellow marketing chrome into Admin unless a screen is intentionally matching a marketing frame.

## Conflicts / do not use
Ignore these older instructions:
- The old DESIGN_GUIDE tokens: `--bl: #0071e3`, snow/milk SF-white marketing palette.
- A **"Get started"** CTA. Use "Book a demo".
- Code-only or HTML mockups as the default hero.
- Midnight/charcoal surfaces or a red accent as website defaults (these came from the product `apple-polish-ui` skill).
- Heavy glass, glow or blur decoration, and "premium" entrance or scroll motion.

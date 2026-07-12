---
name: Arise Asia
description: A missions movement landing site — bold, urgent, joyful
colors:
  signal-blue: "#0062ff"
  ember: "#ffa45a"
  flare: "#ff5f5a"
  violet: "#9d8ae6"
  cinnabar: "#fe4c5a"
  warm-paper: "#fff9f4"
  sand: "#f8eadf"
  stone: "#cacad8"
  charcoal: "#000000"
  white: "#ffffff"
  signal-gradient-start: "#2781ff"
  signal-gradient-mid-blue: "#6ba7ff"
  signal-gradient-mid-orange: "#ffa456"
  signal-gradient-end: "#fe4c5a"
typography:
  display:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.1
  headline:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "clamp(1.5rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "clamp(1.125rem, 2vw, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "clamp(0.875rem, 1.5vw, 1rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Unbounded, sans-serif"
    fontSize: "clamp(0.75rem, 1.5vw, 1rem)"
    fontWeight: 600
    letterSpacing: "0.05em"
    textTransform: "uppercase"
rounded:
  full: "9999px"
  xl: "12px"
  lg: "8px"
spacing:
  section-y: "clamp(4rem, 8vw, 8rem)"
  container-x: "clamp(1rem, 4vw, 2rem)"
  gutter: "1rem"
  grid-gap: "1rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    padding: "10px 32px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.full}"
    typography: "{typography.label}"
  navbar:
    backgroundColor: "rgba(0,0,0,0.75)"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
---

# Design System: Arise Asia

## 1. Overview

**Creative North Star: "The Movement Poster"**

Arise Asia's design language carries the energy of a protest poster pinned to a community board — bold typography, high-contrast color blocking, and iconography that speaks without words. This is a movement calling people to action, not a brochure asking for polite consideration. Every section recruits: attend, give, volunteer, pray, bring it to your country.

The system pairs an urgent, saturated palette (signal blue, ember orange, flare red) with warm paper-toned backgrounds that keep the feel human and approachable rather than cold or corporate. Two display sans-serifs — the geometric, weighty Unbounded for headlines and the humanist Montserrat for body — create a typographic contrast that mirrors the brand's character: bold proclamation grounded in real people.

The Signal Gradient (blue → orange → red) is the system's signature visual device, used sparingly on CTAs and decorative icon masks. It never becomes a background texture; its rarity is the point.

**Key Characteristics:**
- High-contrast, saturated color palette on warm neutral grounds
- Bold display typography with uppercase label conventions
- Custom SVG icon language (fire, cross, stone, spark, wave, altar, path) used as CSS masks
- Floating decorative icon animations for atmospheric depth
- Large background images with dark gradient overlays for text legibility
- Rounded pill buttons as the primary interactive affordance

## 2. Colors

A deliberately warm-saturated palette. Blues carry the authority and urgency; oranges and reds add warmth and energy; purples appear in the Take Action ecosystem as a secondary accent. Neutrals lean warm (cream, tan) rather than cool, keeping the brand approachable.

### Primary

- **Signal Blue** (#0062ff): The anchor brand color. Used in hero headings (via gradient text), countdown display numbers, the gradient start, and as the dominant blue in the Signal Gradient. Conveys trust, urgency, and movement.
- **Ember** (#ffa45a): Warm secondary. Appears in the gradient middle, navigation accent (Donate button), hover underlines, and as a tonal accent on the Give page.
- **Flare** (#ff5f5a): High-energy accent. Used in the gradient end, impact stat numbers (`text-accent-red-dark` variant #b3433f), and icon hover states.

### Secondary

- **Violet** (#9d8ae6): The Take Action accent. Saturated purple powers the Take Action section background gradient (`accent-purple-dark` #6e61a1 → `accent-purple-primary` #9d8ae6) and carries through to Give/Volunteer card accents. Signals a tonal shift from informational (blue) to participatory (purple).
- **Cinnabar** (#fe4c5a): The iconic accent. Used exclusively for icon hover states (`group-hover:text-accent-red`) on ActionButton. A sharper red than Flare, reserved for micro-interactions.

### Neutral

- **Warm Paper** (#fff9f4): Primary page background. A barely-there warm tint that keeps the site from feeling sterile. Used between sections and as the base for gradient overlays.
- **Sand** (#f8eadf): Secondary warm neutral. Used as card and section backgrounds (the featured campaign cards, the "Go where there is no Gospel" section). Provides subtle warmth without competing with primary colors.
- **Stone** (#cacad8): Cool mid-gray. Used sparingly for borders, dividers (impact stat grid), and muted text. Low chroma keeps it receding.
- **Charcoal** (#000000): Body text and high-contrast overlays. Black body text on warm paper provides maximum readability.
- **White** (#ffffff): Text on dark backgrounds, overlay sections, and the inverted variant of ActionButton.

### Named Rules

**The Signal Gradient Rule.** The 4-stop gradient (#2781ff → #6ba7ff → #ffa456 → #fe4c5a, 100deg) is the system's signature device. Apply it only to: (a) decorative icon CSS masks, (b) ActionButton outer ring background, (c) hero heading gradient text, and (d) the "Go where there is no Gospel" headline. Never use it as a page background, card fill, or border treatment. Its rarity is the point.

**The Purple Threshold Rule.** Purple (#9d8ae6 / #6e61a1) signals the transition from information to participation. The palette is blue-dominant above the fold; purple enters at the Take Action section and carries through the Give page. Purple should never appear in the hero, vision, or impact sections.

## 3. Typography

**Display Font:** Unbounded (Google Fonts, sans-serif)
**Body Font:** Montserrat (Google Fonts, sans-serif)

**Character:** A geometric display face (Unbounded) paired with a humanist body face (Montserrat) — contrast by construction rather than similarity. Unbounded is weighty and slightly compressed, carrying the bold declarative voice. Montserrat is open and readable, keeping long-form text approachable. Every heading is uppercase by convention.

### Hierarchy

- **Display** (Unbounded 700, clamp(2.25rem, 5vw, 4.5rem), 1.1): Hero "For The Joy" headline and full-width section titles. Used once per viewport. Always uppercase.
- **Headline** (Unbounded 600, clamp(1.5rem, 4vw, 3rem), 1.2): Section headings (Vision, Take Action, About Us). May appear 2-3 times per page.
- **Title** (Unbounded 500, clamp(1.125rem, 2vw, 1.5rem), 1.3): Card titles, inset section labels, "More ways to take action" column header.
- **Body** (Montserrat 400, clamp(0.875rem, 1.5vw, 1rem), 1.6): Most prose. Line length capped at 65–75ch via container constraints.
- **Label** (Unbounded 600, 0.75rem–1rem, 0.05em letter-spacing, uppercase): Button text, stat category labels ("countries", "cities"), countdown unit labels, nav items. The system's most common typographic pattern.

### Named Rules

**The Unbounded Rule.** Unbounded is always uppercase and never drops below 500 weight. It is a display voice, not a reading voice. For any text longer than 60 characters, use Montserrat.

## 4. Elevation

A mixed system. Large surfaces are flat by default — depth comes from color blocking, gradient overlays, and photographic content rather than shadows. Interactive chrome (navigation, buttons) uses shadows to lift above the page.

### Shadow Vocabulary

- **Nav Lifted** (`box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25)` — shadow-2xl): The navbar. The only element with significant shadow, signaling its fixed overlay role.
- **Card Hover** (`box-shadow` via transition): Give/Volunteer cards use an opacity shift on hover (`group-hover:opacity-80`) rather than shadow. True elevation comes from the scale/translate interaction on ActionButtons.
- **Flat Default**: Sections, background containers, and stat grids have no shadow. Separation comes from alternating background colors (cream → white → image → tan → gradient).

### Named Rules

**The Flat Section Rule.** Section backgrounds never carry shadow. The page reads as stacked colored planes, not stacked cards. Only the navbar and interactive overlay elements lift off the surface.

## 5. Components

### Buttons

Three button primitives, each serving a distinct role.

**ActionButton** (React, primary CTA): A two-layer pill (gradient outer ring + solid inner button). Wraps content in a rounded-full `<a>` with the Signal Gradient outer background and a padded inner `<div>`. Text is Unbounded uppercase, with a Lucide icon (default: `ArrowUpRight`) that appears inline after text. On hover, the inner background transitions to white and the text/icon adopt gradient or accent colors via `group-hover:` utilities. All color props are configurable per instance (outerBg, textColor, bg, hoverBg, textHover, hoverIcon). Shape: fully rounded.

- **Default variant** (gradient outer, transparent inner, white text): "Learn more now" on hero.
- **Inverted variant** (black outer, white inner, black text): "Learn About Us" on the dark About Us overlay.
- **Outline variant** (transparent outer, transparent inner): "Our Partners" on the dark About Us overlay.
- **Purple variant** (red-dark outer, transparent inner, icon to arrow-right): "Learn more about our impact".

**SimpleButton** (Astro, secondary CTA): A single-layer pill `<a>` with all styling passed via `className`. Has `sm`/`md`/`lg` size variants controlling padding. The anchor uses `flex items-center` for vertical centering in grid layouts. Used in the "More ways to take action" column with border-2 purple styling.

**LinkButton** (React, for islands): Programmatic React `<a>` wrapper identical in sizing to SimpleButton. Uses `flex items-center gap-2` with `w-fit` for inline use. Accepts `href`, `size`, `target`/`rel`, `className`, `children`. Used in campaign carousel cards where React state management requires client-side rendering.

### Cards

- **Corner Style**: `rounded-xl` (12px).
- **Background**: Photo with dark gradient overlay (linear `to-t from-black via-black/40 to-transparent`), or solid/tan for the featured campaign stack.
- **Shadow Strategy**: None at rest. Hover reveals opacity shift on the overlay (`group-hover:opacity-80`) and scale on arrow icons (`group-hover:scale-110`).
- **Internal Padding**: `px-3.5 py-7` mobile, `p-7` desktop (`md:p-7`).
- **Featured Campaign Stack**: Custom stacked-card layout (not Embla). Top card responds to drag with `translateX(%)`, revealing cards beneath with scale cascade (0.9, 0.8, 0.7). Each card uses `aspect-[16/10]` images and `min-h-[28rem]` / `lg:min-h-[32rem]`.

### Navigation

- **Style**: Fixed position (`fixed z-20 w-full pt-12`), glass-black background (`bg-black/75`), rounded-full container. Logo left, links centered, Contact/Donate right on `lg+`. Mobile is hamburger toggle.
- **Typography**: Unbounded uppercase, white.
- **Hover**: Underline gradient (yellow → red) on desktop; text on mobile.
- **Donate Button**: Ember background (`bg-yellow-500`), rounded-full pill, heart icon.
- **Contact Button**: Ember border, transparent fill, arrow-up-right icon.
- **Language Switcher**: Fixed top-right, minimal inline text with locale codes.

### Decorative Icons

- **Style**: CSS mask pattern — a `<div>` with background color/gradient and `mask: url('/icons/NAME.svg') no-repeat center / contain`. Icons are never rendered as `<img>` or inline SVG; they inherit the background color of their parent.
- **Color**: Always `bg-gradient-accent` (Signal Gradient). The gradient is the icon's fill.
- **Positioning**: Absolute within `overflow-hidden` parent. Desktop gets 18 icons (9 left, 9 right) in a zigzag pattern. Mobile gets 7 scattered icons.
- **Animation**: `animate-float` utility — `@keyframes float` translates Y by -8px in a 3s ease-in-out loop. Staggered `animation-delay` per icon (150ms increments).
- **Blur**: Icons smaller than `size-28` get `opacity-50 blur-sm` to recede into the background.
- **Icon Set**: 7 custom SVGs — fire, cross, stone, spark, wave, altar, path. All single-color silhouette designs optimized for mask usage.

### Countdown Timer

- **Style**: Four inline stat-like displays (Days : Hours : Minutes : Seconds) below the hero. Each has a large number (Unbounded, Signal Blue, `text-h2` → `lg:text-h1`) and a small label (Unbounded uppercase, medium weight).
- **Separators**: Colons in `text-neutral-500`.
- **Behavior**: Client-side `setInterval(updateCountdown, 1000)` inside inline `<script>`. Target: `2026-07-27T00:00:00+08:00`.

### Carousels

- **Featured Campaign Carousel**: Custom stacked-card implementation (not Embla). Top card is draggable with touch/mouse; drag reveals stacked cards beneath. Uses `translateX(%)` for drag cascade. Touch/mouse drag handlers call `preventDefault()` and container has `touchAction: "none"` to suppress page shift.
- **All Campaign Carousel**: Embla-based (`embla-carousel-react`) via `ui/Carousel.tsx`. `dragFree: true`, `align: "start"`, scroll-wheel navigation. Cards are fixed width (320px) — no percentage resizing.

### Accordion (Give page FAQ)

- **Style**: Toggle list using `@base-ui/react`. Each item shows a Question (Unbounded) with a Plus/Minus icon toggle. Answer slides open below.
- **State**: Single or multiple open via `allowMultiple` prop.

### Animated Counter

- **Behavior**: Intersection Observer triggers count-up animation from 0 to target number. Duration scales with target (300ms–1000ms). Numbers appear in `font-heading text-accent-red-dark` styling.

## 6. Do's and Don'ts

### Do:

- **Do** use the Signal Gradient on decorative icon masks, ActionButton outer rings, hero heading text, and the "Go where there is no Gospel" display line — and nowhere else.
- **Do** keep buttons as fully rounded pills. No square or slightly rounded buttons.
- **Do** use uppercase Unbounded for all headings, buttons, labels, and stat categories.
- **Do** use Montserrat for any text exceeding 60 characters.
- **Do** use warm paper (#fff9f4) or sand (#f8eadf) as the default background for content sections.
- **Do** maintain the purple threshold: blue/orange/red above Take Action, purple entering at Take Action and below.
- **Do** use black (#000000) for body text on light backgrounds. No dark gray for elegance.
- **Do** use `relative z-10` on text containers that overlap decorative icons or gradient overlays.
- **Do** support reduced motion (`@media (prefers-reduced-motion: reduce)`) for float animations and counter transitions.

### Don't:

- **Don't** use the Signal Gradient as a page background, card fill, or border treatment.
- **Don't** use purple (#9d8ae6 / #6e61a1) in the hero, vision, or impact sections above Take Action.
- **Don't** use shadows on section backgrounds or card containers at rest.
- **Don't** use `min-h-screen` for sections that should be content-driven (use responsive padding instead).
- **Don't** render decorative icons as `<img>` or inline SVG — use the CSS mask pattern so the Signal Gradient fills the icon shape.
- **Don't** use square buttons. All interactive pills must be `rounded-full`.
- **Don't** add background textures, patterns, or noise overlays. Depth comes from color blocking and photography.
- **Don't** use glassmorphism or backdrop blurs on cards or overlays.
- **Don't** use side-stripe borders (border-left/right > 1px as accent) — use full borders, background tints, or nothing.
- **Don't** use gradient text except on the three approved elements (hero headings, "Go where there is no Gospel", and ActionButton hover state).

<!-- Last updated: 2026-07-11 -->

# wp-test — AGENTS.md

## Stack

- **CMS**: WordPress (Docker local, Dockerfile on Railway), serves headless REST API
- **Frontend**: Astro SSR (`output: 'server'`, `@astrojs/node` standalone), React islands, Tailwind v4
- **Package manager**: pnpm (v9.11.0), Node >= 22.12.0
- **i18n**: Astro built-in — locales `en`, `id`, `zh-TW` with `routing: { prefixDefaultLocale: true }`
- **Polylang**: WordPress plugin used for i18n content filtering via `&lang=` query param on WP REST API

## Commands (run from `frontend/`)

| Command          | Action                                   |
| ---------------- | ---------------------------------------- |
| `pnpm dev`       | Start Astro dev server (localhost:4321)  |
| `pnpm build`     | Build SSR output to `dist/`              |
| `pnpm format`    | Prettier — `src/**/*.{astro,css,ts,mjs}` |
| `pnpm astro ...` | Run Astro CLI                            |

No test suite or typecheck script configured. Run `pnpm build` to verify correctness.

## WordPress (local)

```
cd cms && docker compose up -d   # start (wait ~30s for MySQL)
cd cms && docker compose down     # stop
cd cms && docker compose down -v  # stop + delete DB
```

- Admin: http://localhost:8080 — `admin` / `admin123`
- DB: `wpdb` / `wpuser` / `wppass`
- Must-use plugin `mu-plugins/headless-redirect.php` redirects non-logged-in visitors to Astro frontend
- Dockerfile bakes in Polylang and ACF plugins

## ActionButton (`src/components/shared/ActionButton.tsx`)

- Icon uses `inline size-5 align-middle ml-1` — flows inline with text and wraps naturally on mobile (not flex-separated)
- Inner `<p>` has no flex; icon is a true inline element after `{children}`

| Prop            | Default                            | Layer it controls                 |
| --------------- | ---------------------------------- | --------------------------------- |
| `outerBg`       | `bg-gradient-accent`               | Outer wrapper ring background     |
| `textColor`     | `text-white`                       | Button text color                 |
| `bg`            | `""`                               | Button body background            |
| `hoverBg`       | `hover:bg-white`                   | Button body hover background      |
| `textHover`     | `group-hover:text-gradient-accent` | Text color on hover               |
| `hoverIcon`     | `group-hover:text-accent-red`      | Icon color on hover               |
| `iconComponent` | `ArrowUpRight`                     | Lucide icon component to render   |
| `className`     | `""`                               | Additional classes on outer `<a>` |

## LinkButton props (`src/components/shared/LinkButton.tsx`)

React `<a>` wrapper for use inside islands (replaces deprecated `OutlineButton`). Pass visual styling via `className` — no hardcoded colors.

| Prop        | Default                 | Notes                                            |
| ----------- | ----------------------- | ------------------------------------------------ |
| `href`      | required                | Link URL                                         |
| `size`      | `"md"`                  | `sm` / `md` / `lg` — matches SimpleButton sizing |
| `target`    | `"_blank"`              | Pass `"_self"` for internal links                |
| `rel`       | `"noopener noreferrer"` |                                                  |
| `className` | `""`                    | All visual styling (border, color, hover)        |
| `children`  | required                |                                                  |

## Architecture

- **Two top-level directories**: `cms/` (WordPress) and `frontend/` (Astro)
- **Pages**: `/src/pages/[locale]/` — `index.astro` (landing page), `posts/[slug].astro` (single + ACF), `give.astro` (giving page), `about.astro` + `/about/*` subpages
- **Layout** (`src/layouts/Layout.astro`): Uses `ClientRouter` from `astro/components/ClientRouter.astro` for client-side view transitions (navbar stays mounted on navigation). Preloads 7 latin-subset `.woff2` font files (Unbounded 500/600/700, Montserrat 400/500/600/700) in `<head>` to eliminate FOUT on page load.
- **Font display**: PostCSS plugin in `astro.config.mjs` transforms all `font-display: swap` → `font-display: block` in @fontsource CSS at build time. No runtime overhead. Combined with preloads, text appears in the correct font immediately (no fallback flash, no invisible text).
- **Navbar** (`src/components/layout/Navbar.astro`): Peach glass pill (`bg-accent-orange-lighter/30 backdrop-blur-2xl`), fixed top, rounded-full. Three breakpoints — `lg+` (≥1024px) desktop shows nav items + Donate + hamburger inline; `<lg` (<1024px) shows logo + hamburger only (no globe or language selector). Active page gets `font-semibold` + `w-full` gradient underline indicator. Nav items: About Us, Arise 2026 (home), Upcoming Events.
  - Wrapper: `fixed top-0 z-20 w-full overflow-visible pt-8 sm:pt-10 md:pt-14`
  - Nav element: `relative z-10` (sits above mobile overlay within the wrapper)
  - Mobile overlay: `fixed inset-0 z-40` (full viewport, behind navbar), uses `invisible`/`opacity-0`/`pointer-events-none` classes with `transition-all duration-300` for smooth fade in/out. JS toggles these classes and sets `padding-top` on `#mobile-menu-content` to `nav.getBoundingClientRect().bottom + 32px` so menu items start below the navbar.
  - Desktop nav items (`#desktop-nav-items`) and Donate button (`#desktop-donate-btn`) get `display: none` via JS when overlay opens to avoid duplication with menu items; restored to `display: ""` on close.
  - Lucide React icons: `Heart`, `Menu`, `X`. Font Awesome 6 Brands via `astro-icon/components`: `x-twitter`, `instagram`, `youtube`.
  - Social media accounts placeholder under `/data`.
- **Home page components**: `/src/components/home/` — `Hero.astro`, `DecorativeIcons.astro`
- **Give page components**: `/src/components/give/` — `FeaturedCampaignCarousel`, `AllCampaignCarousel`, `GivingOptionsAccordion`, `GiveDecorativeIcons.astro`
- **UI**: `/src/components/ui/` — custom `Carousel` wrapper around `embla-carousel-react`, `Accordion` wrapper around `@base-ui/react`
- **Shared**: `/src/components/shared/` — `ActionButton.tsx` (props table below), `LinkButton.tsx` (React `<a>` wrapper for islands, accepts `href`, `size` sm/md/lg, `target`/`rel`, `className`), `SimpleButton.astro`, `AnimatedCounter.astro`
- **Data files**: `/src/data/` — `home.json` (stats, videoUrl), `give.json` (campaigns, giving options). Imported via `import homeData from "@/data/home.json"` (Astro imports JSON natively)
- **lib**: `wordpress.ts` — locale-aware WP REST API client using `?rest_route=/wp/v2` format
- **`@/` path alias** → `src/`
- **`cn()`** utility from `clsx` + `tailwind-merge` (in `src/lib/utils.ts`)
- **Formatted with**: Prettier + `prettier-plugin-astro` + `prettier-plugin-tailwindcss`
- **Prettier quirk**: `prettier-plugin-astro` does not support the `htmlSelfClosing` option — empty non-void elements like `<div />` are always expanded to `<div></div>` on format. No config workaround.
- **ACF**: Custom fields exposed as top-level `acf` object on WP REST post responses

## Deployment

Two deployment targets with conditional adapter in `astro.config.mjs`:

- **Vercel**: `@astrojs/vercel@10` (v11+ requires Astro 7). Set env var `VERCEL=1` at build time to activate.
- **Railway**: `@astrojs/node` standalone. Set `WP_API_URL` (Astro → WP) and `FRONTEND_URL` (WP → Astro redirect) as runtime env vars.

## Carousel quirks

- Standard Carousel uses Embla (`embla-carousel-react`) via `ui/carousel.tsx`
- `CarouselItem` default has `basis-auto` (not `basis-[85%]`) — width-based sizing by default. Pass explicit `basis-[XX%]` if percentage sizing is needed.
- The Embla viewport (`overflow-hidden`) clips box-shadows — fix by adding padding to the viewport div
- Embla viewport's `overflow-hidden` also clips `pr-*` padding on CarouselContent — to add space after the last card, use `mr-3 md:mr-4` on the **last** `CarouselItem` instead (margin extends past the clip)
- If all React islands fail to hydrate with `Failed to fetch dynamically imported module` errors in console, delete `frontend/node_modules/.vite` and restart the dev server — Vite's pre-bundled dep cache is stale/corrupt

### FeaturedCampaignCarousel (`src/components/give/FeaturedCampaignCarousel.tsx`)

- Custom stacked-card implementation (not Embla) with `translateX(%)` cascade offsets
- Cards use `aspect-[16/10]` images, responsive widths (`max-w-sm` mobile/md, `max-w-lg` desktop), and responsive `min-h-[28rem]` / `lg:min-h-[32rem]`
- Touch/mouse drag handled via `onTouchStart/Move/End` + `onMouseDown/Move/Up` handlers
- `handleTouchMove` and `handleMouseMove` call `e.preventDefault()` to prevent browser page-shift during drag
- Card wrapper has inline `style={{ touchAction: "none" }}` to suppress browser swipe gestures
- Drag threshold: 80px — above it triggers `goNext()` (right→left) or `goPrev()` (left→right)
- Both drag handlers share `isDraggingRef` ref to avoid stale closure issues with `isDragging` state

### AllCampaignCarousel (`src/components/give/AllCampaignCarousel.tsx`)

- Uses the Embla-based `Carousel` from `ui/carousel.tsx`
- `opts={{ align: "start", dragFree: true }}` for smoother free-scroll drag feel
- `wheel` event listener on the container with 50px accumulator threshold — fires `scrollNext()`/`scrollPrev()` after accumulating enough delta
- No navigation buttons (intentional — no prev/next or dots)
- Cards are fixed width `w-80` (320px) with `shrink-0 grow-0` from CarouselItem default — no percentage sizing
- Last `CarouselItem` gets `mr-3 md:mr-4` for trailing scroll space (margin extends past the Embla viewport clip)

## Decorative Icons (`src/components/home/DecorativeIcons.astro`)

- Used in `<header>` for homepage visual flair: CSS-masked gradient icons (`bg-gradient-accent`), `pointer-events-none`, `aria-hidden="true"`
- **18 desktop icons** (visible `md:`+): 9 left, 9 right, arranged in a zigzag pattern (alternating shallow/deep from center)
- **7 mobile icons** (visible below `md:`): scattered across full width/height, some with `opacity-50 blur-sm`, `sm:` variants for larger sizes
- Icons smaller than `size-28` get `opacity-50 blur-sm`
- Use CSS mask pattern: `<div class="bg-gradient-accent absolute ..." style="mask: url('/icons/NAME.svg') no-repeat center / contain;" />`
- `overflow-hidden` on parent `<header>` prevents scrollbar from absolute icons
- `animate-float` utility (`@keyframes float` with random-ish delay classes) for gentle vertical drift

### xl is the base truth

The user sets `xl:left-*` / `xl:right-*` and `xl:size-*` directly to avoid overlap with center content. **Never change xl values** — they are the user's preferred shape.

### Deriving md and lg from xl

When xl values change (e.g., to fix overlap), derive md/lg positions and sizes using these scale factors:

| Breakpoint  | Position factor | Size factor |
| ----------- | --------------- | ----------- |
| lg (1024px) | × 0.75          | × 0.75      |
| md (768px)  | × 0.4           | × 0.57      |

- Round to nearest standard Tailwind spacing value (list: 0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96)
- **Always add an explicit `xl:size-*`** — `lg:size-*` cascades upward to xl, so without `xl:size-*` the lg size would bleed into xl
- The cascade order: `md:left-* md:size-* lg:left-* lg:size-* xl:size-* xl:left-*`

### Current xl shape (reference — dotted icons use `opacity-50 blur-sm`)

**Left side:**

| #   | Icon   | top | xl:left | xl:size | Blur? |
| --- | ------ | --- | ------- | ------- | ----- |
| 1   | fire   | 8   | 52      | 36      |       |
| 2   | cross  | 48  | 16      | 24      | •     |
| 3   | stone  | 80  | 18      | 28      |       |
| 4   | spark  | 128 | 26      | 20      | •     |
| 5   | wave   | 152 | 48      | 28      |       |
| 6   | altar  | 188 | 30      | 24      | •     |
| 7   | path   | 224 | 52      | 40      |       |
| 8   | fire²  | 270 | 50      | 20      | •     |
| 9   | cross² | 296 | 80      | 24      | •     |

**Right side:**

| #   | Icon   | top | xl:right | xl:size | Blur? |
| --- | ------ | --- | -------- | ------- | ----- |
| 1   | spark  | 8   | 64       | 32      |       |
| 2   | wave   | 44  | 36       | 24      | •     |
| 3   | path   | 80  | 12       | 28      |       |
| 4   | cross  | 116 | 20       | 40      |       |
| 5   | stone  | 164 | 70       | 20      | •     |
| 6   | fire   | 188 | 32       | 36      |       |
| 7   | altar  | 228 | 56       | 24      | •     |
| 8   | spark² | 260 | 72       | 30      |       |
| 9   | wave²  | 296 | 64       | 24      | •     |

## Give Decorative Icons (`src/components/give/GiveDecorativeIcons.astro`)

- Used on the give page, spanning the description + join us banner sections
- Both sections wrapped in a single `relative overflow-hidden` div; component is the only child with `absolute inset-0`
- **lg+ (6 icons)**: fire, stone, wave sharp — path, cross, altar blurred — all on the right side with varied `right-*` depths (18–80) and heights (top-36–92)
- **<lg (4 icons)**: fire, wave sharp — cross, altar blurred — right-side with compact positions
- Follows same CSS mask pattern as `DecorativeIcons.astro`
- Same `animate-float` + `opacity-50 blur-sm` rules for readability
- Text containers in each section get `relative z-10` so opaque icons don't overlap letters

## Featured Campaign section (`give.astro`)

- The `bg-accent-orange-lightest` background is split into two absolute-positioned divs: one for mobile (`lg:hidden`, starts at `top: 10rem` so orange begins below the card), one for lg+ (`hidden lg:block` with `inset-0` for full fill). This keeps the card visually above the orange on mobile while maintaining full-height orange on desktop.
- Parent wrapper has `overflow-visible relative pb-10 lg:py-20`

## Countdown timer (`index.astro`)

- Countdown target date (`2026-07-27T00:00:00+08:00`) is hardcoded as a string literal inside the `<script>` tag.
- Do NOT pull it from `home.json` or use `define:vars`/DOM data-attributes — the value is used in exactly one place (the countdown script) and hardcoding avoids Astro server→client serialization issues.
- Four `<span id="countdown-{days,hours,minutes,seconds}">` elements updated by `setInterval(updateCountdown, 1000)`.

## Take Action quirks (`index.astro`)

- Two layout blocks: mobile (`md:hidden`) and desktop (`hidden md:flex`), like the hero
- On mobile, icons are in an `absolute left-1/2 top-0 h-full w-[384px] -translate-x-1/2` centered wrapper (accommodates the widest icon at 384px right edge) inside `overflow-hidden` on the container; text centers on top with `relative z-10` and `min-h-[24rem]` for icon breathing room
- On desktop/md, icons sit in a `size-60 shrink-0` column beside the text in a `flex-row` layout; the gradient container has `overflow-hidden` to clip any overflow past rounded corners
- Some icon positions (`left-*`) exceed the `size-60` container at wider breakpoints — these use `md:` compressed values that fit within 240px and `lg:` values for the original wide spread
- The `-rotate-8 / -rotate-15 / -rotate-96 / rotate-24 / rotate-16` angles are preserved on both blocks
- When duplicating icon markup between layout blocks, remove `shrink-0` from the mobile version (no length-constrained parent)
- **"More ways to take action"** column uses `grid grid-cols-1 gap-2` (not flex) so all buttons stretch to equal height in the md 3-col grid. SimpleButton's `<a>` uses `flex items-center` to vertically center text within the stretched cell.

## Hero quirks (`index.astro`)

- Two layout blocks: mobile (`md:hidden`) and desktop (`hidden md:flex`), sharing the same `container` padding
- On mobile the hero uses `px-4` (not `px-8`) to gain horizontal space for the FOR THE + JOY pair (`px-4 sm:px-8` on the container)
- "For The" is forced to 2 lines on mobile using `<span class="block">` per word — never rely on width constraints (`w-*`) for wrapping since font-size/family changes break them
- JOY sits beside "For The" as a direct `<img>` (no wrapper) with `w-56 shrink-0` — proportionally wider and taller, extending below the text
- The pair uses `flex items-start justify-center` — aligned at top, centered as a group, no overflow clipping

## About-us quirks (`index.astro`)

- Section uses `py-16 sm:py-20 md:py-24 lg:py-32` instead of `min-h-screen` — content determines height, no wasted space on desktop or mobile
- Background image: `bg-[url('/about-us-bg.png')] bg-cover bg-center` with dark overlay for text readability
- `flex flex-col items-center justify-center` centers content vertically within the padded section

## Footer quirks

- **Footer.astro** has a decorative "Arise Asia" background `<p>` with `font-size: clamp(160px,20vw,262px)` and `absolute inset-0`
- On mobile viewports, the large text is wider than the footer and overflows visibly unless the `<p>` has `overflow-hidden`
- When adding large decorative text inside an `absolute inset-0` container, always add `overflow-hidden` to prevent text bleed past the component edges

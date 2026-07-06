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

## ActionButton props (`src/components/shared/ActionButton.tsx`)

| Prop | Default | Layer it controls |
|------|---------|-------------------|
| `outerBg` | `bg-gradient-accent` | Outer wrapper ring background |
| `textColor` | `text-white` | Button text color |
| `bg` | `""` | Button body background |
| `hoverBg` | `hover:bg-white` | Button body hover background |
| `textHover` | `group-hover:text-gradient-accent` | Text color on hover |
| `hoverIcon` | `group-hover:text-accent-red` | Icon color on hover |
| `iconComponent` | `ArrowUpRight` | Lucide icon component to render |
| `className` | `""` | Additional classes on outer `<a>` |

## Architecture

- **Two top-level directories**: `cms/` (WordPress) and `frontend/` (Astro)
- **Pages**: `/src/pages/[locale]/` — `index.astro` (landing page), `posts/[slug].astro` (single + ACF), `give.astro` (giving page)
- **Home page components**: `/src/components/home/` — `Hero.astro`, `DecorativeIcons.astro`
- **Give page components**: `/src/components/give/` — `FeaturedCampaignCarousel`, `AllCampaignCarousel`, `GivingOptionsAccordion`
- **UI**: `/src/components/ui/` — custom `Carousel` wrapper around `embla-carousel-react`, `Accordion` wrapper around `@base-ui/react`
- **Shared**: `/src/components/shared/` — `ActionButton.tsx` (props table below), `SimpleButton.astro`, `AnimatedCounter.astro`
- **Data files**: `/src/data/` — `home.json` (stats, videoUrl), `give.json` (campaigns, giving options). Imported via `import homeData from "@/data/home.json"` (Astro imports JSON natively)
- **lib**: `wordpress.ts` — locale-aware WP REST API client using `?rest_route=/wp/v2` format
- **`@/` path alias** → `src/`
- **`cn()`** utility from `clsx` + `tailwind-merge` (in `src/lib/utils.ts`)
- **Formatted with**: Prettier + `prettier-plugin-astro` + `prettier-plugin-tailwindcss`
- **ACF**: Custom fields exposed as top-level `acf` object on WP REST post responses

## Deployment

Two deployment targets with conditional adapter in `astro.config.mjs`:
- **Vercel**: `@astrojs/vercel@10` (v11+ requires Astro 7). Set env var `VERCEL=1` at build time to activate.
- **Railway**: `@astrojs/node` standalone. Set `WP_API_URL` (Astro → WP) and `FRONTEND_URL` (WP → Astro redirect) as runtime env vars.

## Carousel quirks

- Standard Carousel uses Embla (`embla-carousel-react`) via `ui/carousel.tsx`
- FeaturedCampaignCarousel is a custom stacked-card implementation (not Embla) with `translateX(%)` cascade offsets
- AllCampaignCarousel uses the Embla-based `Carousel` from `ui/carousel.tsx`
- AllCampaignCarousel uses `opts={{ align: "start", dragFree: true }}` for smoother free-scroll drag feel
- AllCampaignCarousel has a `wheel` event listener on the container with a 100px accumulator threshold — fires `scrollNext()`/`scrollPrev()` after accumulating enough delta, making mouse wheel/trackpad scroll one slide per rotation
- No navigation buttons on AllCampaignCarousel (intentional design — no prev/next or dots)
- The Embla viewport (`overflow-hidden`) clips box-shadows — fix by adding padding to the viewport div
- Embla viewport's `overflow-hidden` also clips `pr-*` padding on CarouselContent — to add space after the last card, use `mr-3 md:mr-4` on the **last** `CarouselItem` instead (margin extends past the clip)
- Featured carousel cards use `aspect-[16/10]` images, responsive widths (`max-w-sm` mobile/md, `max-w-lg` desktop), and responsive `min-h-[28rem]` / `lg:min-h-[32rem]`
- Both carousels use `client:load` directive (React islands hydrated on the client)
- If all React islands fail to hydrate with `Failed to fetch dynamically imported module` errors in console, delete `frontend/node_modules/.vite` and restart the dev server — Vite's pre-bundled dep cache is stale/corrupt

## Decorative Icons (`src/components/home/DecorativeIcons.astro`)

- Used in `<header>` for homepage visual flair: CSS-masked gradient icons (`bg-gradient-accent`), `pointer-events-none`, `aria-hidden="true"`
- **18 desktop icons** (visible `md:`+): positioned with absolute coordinates, responsive sizes/positions (`md:` smaller + edge, `lg:` larger, `xl:` shifted inward by 16px)
- **7 mobile icons** (visible below `md:`): scattered across full width/height, some with `opacity-50 blur-sm`, `sm:` variants for larger sizes
- Icons smaller than `size-28` get `opacity-50 blur-sm`
- Use CSS mask pattern: `<div class="bg-gradient-accent absolute ..." style="mask: url('/icons/NAME.svg') no-repeat center / contain;" />`
- `overflow-hidden` on parent `<header>` prevents scrollbar from absolute icons
- `animate-float` utility (`@keyframes float` with random-ish delay classes) for gentle vertical drift

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

## Hero quirks (`index.astro`)

- Two layout blocks: mobile (`md:hidden`) and desktop (`hidden md:flex`), sharing the same `container` padding
- On mobile the hero uses `px-4` (not `px-8`) to gain horizontal space for the FOR THE + JOY pair (`px-4 sm:px-8` on the container)
- "For The" is forced to 2 lines on mobile using `<span class="block">` per word — never rely on width constraints (`w-*`) for wrapping since font-size/family changes break them
- JOY sits beside "For The" as a direct `<img>` (no wrapper) with `w-56 shrink-0` — proportionally wider and taller, extending below the text
- The pair uses `flex items-start justify-center` — aligned at top, centered as a group, no overflow clipping

## Footer quirks

- **Footer.astro** has a decorative "Arise Asia" background `<p>` with `font-size: clamp(160px,20vw,262px)` and `absolute inset-0`
- On mobile viewports, the large text is wider than the footer and overflows visibly unless the `<p>` has `overflow-hidden`
- When adding large decorative text inside an `absolute inset-0` container, always add `overflow-hidden` to prevent text bleed past the component edges

# MyPrivateTours Homepage — Redesign Spec (v2)

**Date:** 2026-04-21
**Status:** Approved — ready for implementation plan
**Supersedes:** `docs/superpowers/specs/2026-04-20-homepage-design.md` (v1, three-concept exploration)
**Reference:** [travel-sensations.com](https://www.travel-sensations.com/nl/) — design theme only (not a copy)

---

## 1. Why v2

The v1 spec produced three concept directions; only Concept C (Cinematic Immersive) was ever built, and the client rejected it as not hitting the quality bar — empty sections, simplified nav that did not match the `/index.html` wireframe sitemap, animation and font choices that did not feel considered. This rewrite commits to a single polished direction inspired by travel-sensations.com and implements the full wireframe nav and a 13-section homepage.

The existing `/homepage/` codebase (Concept C files under `assets/css/concept-c.css`, `assets/js/concept-c.js`, the current `index.html` body) is being replaced. Shared infrastructure (Nunito fonts, base CSS, tokens, GSAP+Lenis+split-type dependencies) is reused where it helps.

---

## 2. Goal

One production-quality homepage design expressing a warm editorial magazine feel (per travel-sensations.com), on the MyPrivateTours brand system, populated with real content across every section of the homepage, with motion and typographic polish that matches the reference quality floor.

---

## 3. Non-goals

- Not designing or building city, category, tour-detail, blog, About, B2B, or Contact pages — those remain as they are in `/index.html`, `/paris.html`, etc.
- Not wiring Bokun, Mailchimp, GA4, Meta Pixel — static markup with hooks the dev team ports later.
- Not producing a WordPress theme. Output is static HTML/CSS/JS; port is a downstream task.
- Not producing multiple concepts. One polished direction only.

---

## 4. Deliverable

A single `/homepage/index.html` page with supporting asset files. The 2026-04-20 Concept C files are removed; the Approach B ("Collector's set") direction replaces them.

```
/homepage/
├── index.html                → Single committed homepage
├── README.md                 → Handoff notes (updated)
├── assets/
│   ├── css/
│   │   ├── tokens.css        → Brand tokens (reused, extended with deep-maroon footer token)
│   │   ├── base.css          → Reset, layout primitives (reused, tightened)
│   │   └── homepage.css      → All homepage-specific styles (replaces concept-c.css)
│   ├── js/
│   │   ├── motion-core.js    → Lenis + GSAP init (reused, tightened)
│   │   └── homepage.js       → All homepage behavior (replaces concept-c.js)
│   ├── data/
│   │   ├── cities.json       → 8 cities (reused)
│   │   ├── tours.json        → 6–8 tours (reused)
│   │   ├── testimonials.json → 3–5 reviews (reused)
│   │   └── blog-posts.json   → 3 latest articles (reused)
│   ├── fonts/                → Nunito (self-hosted), EB Garamond (to be added)
│   └── images/               → Reorganized: cities/, tours/, blog/, hero/, inspire/, partner/
└── docs/                     → Spec + plan docs
```

---

## 5. Tech stack

- **Static HTML5** — no build step required to view locally.
- **Plain CSS + Tailwind CDN utility layer** — keep Tailwind CDN for utility speed, but all critical section styles live in `homepage.css` so the page works even if the CDN is blocked.
- **Vanilla JS** — no framework.
- **GSAP Core + ScrollTrigger** — scroll-linked animations (loaded from jsDelivr CDN).
- **split-type** (MIT) — headline splitting; replaces paid SplitText.
- **Lenis** — smooth scroll (from jsDelivr CDN), tuned `duration: 1.2`, gentle easing.
- **Self-hosted Nunito** — weights 500, 700, 800, 900 (already available in the MPT brand pack).
- **Self-hosted EB Garamond** — weights 400 / 400 italic / 500 italic (download from Google Fonts as WOFF2 at build time; italic used sparingly for emphasis words and eyebrow accents).

---

## 6. Brand system

Reuse the existing MPT tokens, with one addition for the footer:

| Token | Hex | Role |
|---|---|---|
| `--mpt-orange` | `#E0653C` | Primary — CTAs, accents, orbital mark, emphasis-word color |
| `--mpt-sand` | `#EDD285` | Secondary — subtle highlights |
| `--mpt-beige` | `#E5E3D6` | Neutral — alt section backgrounds |
| `--mpt-cream` | `#F1ECDF` | Hero canvas (new token — warmer than beige, reads as aged paper) |
| `--mpt-off` | `#F8F8F8` | Light canvas — most sections |
| `--mpt-ink` | `#252525` | Primary text, dark inks |
| `--mpt-maroon` | `#2F1412` | Footer canvas (new token — deep warm-maroon, echoes reference footer) |
| `--mpt-orange-soft` | `#FDEEE7` | Orange-tinted surface for pills, value-prop icon tiles |

**Logo:** use `MPT___Open_Files-20260420T075612Z-3-001/MPT _ Open Files/Logos/SVG/LOGO.svg`. A simplified "orbital mark" (small circle with 1px ring offset at −18°) is used as a decorative motif in the hero, inspire section, and footer wordmark.

---

## 7. Typography

- **UI / body / headlines:** Nunito — 500, 700, 800, 900.
- **Italic emphasis accent:** EB Garamond — 400 italic, 500 italic. Used for single emphasis words inside benefit-forward headlines (`<em>`) and for eyebrow-adjacent decorative text. Never for long-form body.
- **Eyebrow:** Nunito 800, uppercase, `letter-spacing: .3em`, 11px. Often preceded by a 34px hairline rule in brand-orange or ink.

**Hierarchy:**

| Role | Font | Size (desktop / mobile) | Leading |
|---|---|---|---|
| H1 (hero) | Nunito 900, −.035em | 64 / 44 | .98 |
| H1 emphasis `<em>` | EB Garamond 400 italic | .88em of parent | inherits |
| H2 (section) | Nunito 900, −.03em | 44 / 32 | 1.02 |
| H3 (card) | Nunito 800, −.02em | 20 / 18 | 1.25 |
| Body | Nunito 500 | 16 / 15 | 1.6 |
| Small / meta | Nunito 700 | 13 / 12 | 1.5 |
| Eyebrow | Nunito 800 caps | 11 / 11 | 1 |

---

## 8. Section inventory — 13 sections

Order is fixed. Every section ships with real content (no empty placeholders). Copy below is draft; the client's copywriter may rewrite.

### §01 — Global nav (sticky)

Two-row header on light canvas, fixed at scroll with a hairline border and 10px blur when scrolled past 40px.

**Top row (utility):** `♡ Wishlist` · `EN / USD` · `Sign in` (filled ink pill)

**Primary row:** logo (orbital mark + `MyPrivate<em>Tours</em>` wordmark) | nav items. No additional search icon — the hero search pill is the canonical search entry from the homepage.

**Nav items with mega-menus — from existing `/index.html` wireframe verbatim:**

- **Home** (link)
- **City Tours ▾** (mega menu):
  - Sidebar: Paris · Rome · London · Barcelona · Florence · Prague · Venice · New York
  - Main: `Top attractions` grid of 18 attraction tiles with thumbnail + title + `Attraction in City, Country` subtitle (Eiffel Tower, Colosseum, Sagrada Familia, Vatican, Disneyland Paris, Memorial & Museum, Warner Bros. Studio, Seine, Van Gogh, Louvre, Anne Frank, Alhambra, Park Guell, Keukenhof, Montserrat, Last Supper, Moulin Rouge, + 1 more)
- **Blog ▾** (mega menu):
  - Sidebar: All Articles · Travel Tips · Destination Guides · Food & Culture · Family Travel · Hidden Gems
  - Main: `Latest articles` grid of 9 article cards with thumbnail + title + category · read-time
- **About** (link)
- **B2B ▾** (mega menu):
  - Sidebar: Overview · Travel Agencies · Hotels & Concierge · Corporate Groups · DMCs & Operators · Affiliate Program
  - Main: `Partner solutions` grid of 9 tiles (White-Label, API, Commission, Group Bookings, Concierge Desk, Corporate, MICE, DMC, Affiliate)
- **Contact** (link)

**Mobile:** hamburger opens full-screen overlay with accordion groups matching the mega menu structure.

### §02 — Hero (magazine-stack)

**Canvas:** `--mpt-cream` (`#F1ECDF`), minimum height `clamp(640px, 88vh, 820px)`.

**Background:** three concentric thin rings centered behind content (720px / 540px / 360px, `border: 1px solid rgba(37,37,37,.07)`). Below rings, four city "brochure" photographs scattered at gentle angles — real cover-style photography, not stylized cards. Positions (desktop):

- `v-m1`: 240×300, left 4% / top 10%, rotate(−11°)
- `v-m2`: 200×266, left 14% / top 54%, rotate(+6°)
- `v-m3`: 220×275, right 6% / top 9%, rotate(+9°)
- `v-m4`: 210×280, right 14% / top 56%, rotate(−5°)

Mobile: rings shrink, brochures hide behind content, opacity reduced to .4 to prevent crowding.

**Centered content:** orbital logomark (54×54, ink ring with orange dot and orange orbit ring rotated −18°) → eyebrow "Private tours · Est. 2014" → H1 "Your trusted *Private Tour Designer.*" (italic-serif on the emphasis line) → subhead "Expert local guides across eight cities. 100% private groups. Flexible booking. Tours designed around your pace, not a bus schedule." → orange pill CTA "Explore all tours →".

**Search pill:** docked at hero bottom center, 540px max-width, 4-cell (City / Dates / Guests / Search). Visual shell only — submit is a no-op with a data-attribute the dev team wires to Bokun.

### §03 — Brand promise (orbital split)

**Canvas:** `--mpt-off`. Two-column 1fr/1fr, section height ≈ 640px.

**Left column:** eyebrow "Why travellers trust us" → H2 "Together with your Private Tour Designer, we listen, advise, and piece together the perfect private experience — so every moment of your trip becomes *real.*" → 3-line body → two quiet links: "Meet our designers →" and "See how it works →".

**Right column:** full-bleed cinematic photograph (airplane wing above clouds, warm cinematic LUT, 16:9 or taller).

**Orbital overlay** on right column: thin white circle (300–360px) centered, 1px `rgba(255,255,255,.6)` stroke. Four short labels positioned at 12, 3, 6, 9 o'clock around the ring:

- 12 o'clock: `DREAMING THE TRIP`
- 3 o'clock: `DESIGNING THE ROUTE`
- 6 o'clock: `LIVING THE MOMENTS`
- 9 o'clock: `REMEMBERING FOREVER`

Labels are 11px Nunito 800 caps, tracking .3em, white. Hairline sand-colored tick marks at each label position on the ring.

### §04 — OUR CITIES (title + region tabs)

**Canvas:** `--mpt-off`. Centered title block, section padding 100px top / 40px bottom.

Orange eyebrow rule → large centered H2 "OUR CITIES" in Nunito 900, tracking .04em (slight caps feel via font size + weight). Subhead in body: "Eight iconic destinations, each led by local experts."

Tab row: `Paris (12) · Rome (9) · London (11) · Barcelona (8) · Florence (6) · Prague (7) · Venice (5) · New York (10)` — tour counts in smaller muted caps. Active tab: thin 1.5px orange underline + ink text; inactive: muted ink.

### §05 — Featured city experience (peek carousel)

**Canvas:** `--mpt-off`. Horizontal scroll snap carousel. One city at a time is the active card.

Active card: 880×500 desktop, 16:9 aspect, edge-to-edge city photograph with a bottom gradient. Caption block bottom-left inside the image: chapter number "No. 01" (EB Garamond italic, 14px, sand color) → city name + tagline e.g. "PARIS — THE CITY OF LIGHT, PRIVATELY" (Nunito 900, 32px, city tagline sourced per-city from `cities.json`) → city chip "Private tour" in orange pill top-right.

Neighbors: peek at 240px visible on each side, scaled 0.82, opacity 0.55, slightly desaturated. Clicking a neighbor advances.

Controls: arrow buttons (◀ / ▶) bottom-center, and drag-to-advance on desktop. Auto-advance every 7s, pauses on hover and on user drag.

Syncs with §04 tabs: clicking a tab animates the carousel to that city.

### §06 — Why MyPrivateTours (value grid)

**Canvas:** `--mpt-beige`. 4-column row on desktop, 2×2 on tablet, 1-col stack on mobile.

4 cards on cream-tinted tiles (`--mpt-orange-soft` small icon holder, cream card):

1. **Expert local guides.** City specialists who live and teach where they guide. Vetted for 5+ years of experience.
2. **100% private groups.** Only you and your party. Your pace, your questions, your conversations.
3. **Flexible booking.** Free cancellation up to 48 hours before. Reschedule at no cost, any time.
4. **Fully curated.** Skip-the-line. After-hours access. End-to-end trip design with a dedicated designer.

Each card: small hairline-circle icon (sized to match orbital motif), H3 (Nunito 800), 2-line body. 6px lift on hover, soft shadow.

### §07 — Featured tours (6-tour grid)

**Canvas:** `--mpt-off`. Eyebrow "Signature tours" → H2 "Private tours, *built for you.*" → 3×2 grid of 6 tour cards (data from `tours.json`).

**Tour card:** 4:3 image (rounded 8px), city chip overlay top-left, title below (Nunito 800), meta row (duration · guide language · rating with orange star), price "from €XXX — per private group, up to 8".

Hover: image zooms `scale(1.04)` over 360ms ease-out, card lifts 6px, soft drop shadow, subtle orange "View tour →" link fades in under price.

Below grid: centered "Browse all 68 tours →" text link.

### §08 — Testimonials (peek carousel)

**Canvas:** `--mpt-cream`. Horizontal snap carousel, 3 visible on desktop (1 large centered + 2 peeks), 1 on mobile.

**Review card:** 5 small orange stars → 3–4 line quote in EB Garamond italic 400, −.02em → `— Reviewer name, City toured · Month YYYY`. Thin 2px orange rule above reviewer line, 24px long, centered.

5 reviews in `testimonials.json`. Drag-to-advance on desktop, auto-advance 8s with pause on hover.

### §09 — Trust by the numbers

**Canvas:** `--mpt-off`. Horizontal 5-item strip, full section padding 80px top / 80px bottom.

Eyebrow "By the numbers" centered. Below: `500,000+` · `4.9★` · `8` · `24/7` · `48h` with labels "Travellers guided · Average rating · Iconic cities · Concierge · Free cancellation". Thin hairline dividers (`1px`, `rgba(37,37,37,.12)`) between items.

Numbers: Nunito 900, 48px, tabular-nums. Labels: Nunito 700 caps, 11px, .2em tracking, muted ink.

Counter animation: numbers tween from 0 to target over 1.6s `power2.out` when section enters viewport.

### §10 — Let yourself be inspired (dark inspire section)

**Canvas:** full-bleed dark photograph (close-up of a travel journal with handwritten notes and vintage map, warm cinematic LUT). Dark overlay 50% → gradient at bottom.

**Content (centered):** small white orbital mark → eyebrow "The inspiration tool" (sand) → H2 "Let yourself be *inspired.*" in EB Garamond italic 400 (white, 56px, centered) → 2-line body in Nunito 500 (white 85%) "Answer a few questions about what you want from your trip. Our tool maps the perfect private tours to your pace, interests, and travel style — in under a minute." → orange pill CTA with soft glow "Start planning →".

Section height: 520px desktop, 460px mobile.

### §11 — From the Journal (blog)

**Canvas:** `--mpt-off`. Eyebrow "From the Journal" → H2 "Stories *before departure.*" → 3-col grid of 3 latest articles from `blog-posts.json`.

**Article card:** 16:9 image (rounded 8px), category tag pill (orange-soft fill, orange text), title in EB Garamond 400 italic (24px), meta row "6 min read · Apr 2026" in Nunito 700 caps 11px muted.

Hover: image zooms `scale(1.04)`, title color shifts to orange over 260ms. Below grid: centered "Read all stories →" text link.

### §12 — Dual row (Newsletter + Partner)

**Canvas:** `--mpt-beige`. Two equal cards side by side on desktop, stacked on mobile.

**Left card — Newsletter:** seasonal photo background (low-contrast, warm LUT). Ink overlay 30%. Eyebrow "Subscribe to our newsletter" → H3 (white, Nunito 900) "Quiet seasonal notes, direct to your inbox." → inline email form (email input + "Subscribe" orange pill submit) → tiny consent micro-copy ("We respect your inbox. One letter a month.") Mailchimp markup hooks (`honeypot` field, hidden audience ID placeholder).

**Right card — Partner:** B2B photo (rooftop-negotiation or hotel-concierge feel). Ink overlay 35%. Eyebrow "Partner with MyPrivateTours" → H3 (white) "Travel agents, hotels, concierge desks." → 1-line benefit "Exclusive rates, commission, white-label options." → ghost-white-outline CTA "Contact our team →" linking to `/b2b.html`.

Card aspect ratio ≈ 2.4:1 each, 420px minimum height.

### §13 — Footer

**Canvas:** `--mpt-maroon` (`#2F1412`), text white with 85% opacity.

**Top band:** Oversized `MyPrivate<em>Tours</em>` wordmark (EB Garamond italic on the `<em>`, Nunito 900 on the rest, 84px desktop, responsive shrink). Under wordmark: 1-line tag "Private tours, expertly designed — across eight cities worldwide." Orbital mark at left of wordmark, small scale.

**Mid band:** 5-column link grid:

1. **Cities** — Paris / Rome / London / Barcelona / Florence / Prague / Venice / New York
2. **Company** — About / Journal / Careers / Press / Contact
3. **Partners** — Travel Agencies / Hotels & Concierge / Corporate Groups / DMCs / Affiliate Program
4. **Support** — FAQ / Cancellation Policy / Safety / Accessibility
5. **Legal** — Terms / Privacy / Cookies / Ethical Travel

**Bottom band:** social icons row (Instagram, Facebook, Pinterest, TikTok, LinkedIn), centered email `hello@myprivatetours.com` + phone, `© MyPrivateTours 2026 · All rights reserved`, small italic "Made privately, with care." at right.

**Float:** WhatsApp widget sits bottom-right above the footer — frosted cream circle, ink WhatsApp glyph, thin orange ring.

---

## 9. Motion language

**Lenis:** `duration: 1.2`, `easing: t => 1 - Math.pow(1 - t, 3)` (power3.out), smoothTouch off.

**Section entry (default):** 24px y-rise + fade, 480ms, `power2.out`, trigger at `top 82%`. Headlines use split-type word-by-word 80ms stagger, 360ms each, `power3.out` with a 6px y-rise per word.

**Hero-specific:**
- Rings: scale from 0.85 → 1 with opacity 0 → .12 over 900ms on load, staggered 120ms.
- Magazine brochures: each card enters from its off-axis starting rotation + 40px displacement toward center + opacity 0 → 1, 700ms `power3.out`, staggered 100ms.
- Parallax on scroll: each brochure translates y at a different rate (−15%, −8%, −20%, −11%) for depth.
- Logomark: subtle 8s orbital rotation loop (the outer ring tilt element, not the dot).

**§03 orbital split:** on scroll-in, the white ring draws via `stroke-dasharray` from 0 to full over 900ms. The 4 labels fade and translate 8px toward their final radial position, staggered 120ms starting after the ring completes 40% of its draw.

**§05 city carousel:** active card scale 1, opacity 1; neighbors scale 0.82, opacity 0.55, transform-origin center. Transition 500ms `cubic-bezier(.4,0,.2,1)` on city switch.

**§06 why cards:** hover lift `translateY(-6px)` + shadow intensifies, 260ms `power2.out`.

**§07 tour cards:** image zoom `scale(1.04)` 360ms, card lift `translateY(-6px)`, orange "View tour →" link fades in bottom-right.

**§09 counters:** tween 0 → target, 1.6s `power2.out`, triggered on viewport entry.

**§10 inspire:** background photo has 20s Ken Burns `scale(1) → scale(1.05)` alternate-reverse, `ease-in-out`. Orange CTA has slow 3s `box-shadow` pulse from `0 0 0 rgba(224,101,60,.4)` to `0 0 40px rgba(224,101,60,.25)`.

**Buttons (primary orange pill):** hover — `translateY(-2px)`, shadow intensifies to `0 18px 42px rgba(224,101,60,.4)`, 180ms. Active — `scale(.98)` 100ms.

**Mega menu open:** 180ms fade + 6px y-slide in, `power2.out`.

**`prefers-reduced-motion`:** disable Ken Burns, ring-draw, parallax, orbital rotation, magazine stagger-entry. Preserve 200ms opacity fades only.

---

## 10. Content pack

### Copy (draft)

- **Hero H1:** "Your trusted *Private Tour Designer.*"
- **Hero subhead:** "Expert local guides across eight cities. 100% private groups. Flexible booking. Tours designed around your pace, not a bus schedule."
- **Hero CTA:** "Explore all tours →"
- **§03 H2:** "Together with your Private Tour Designer, we listen, advise, and piece together the perfect private experience — so every moment of your trip becomes *real.*"
- **§04 H2:** "OUR CITIES"
- **§06 H2:** "Why travellers choose us."
- **§07 H2:** "Private tours, *built for you.*"
- **§10 H2:** "Let yourself be *inspired.*"
- **§10 CTA:** "Start planning →"
- **§11 H2:** "Stories *before departure.*"
- **§12 left H3:** "Quiet seasonal notes, direct to your inbox."
- **§12 right H3:** "Travel agents, hotels, concierge desks."

### Imagery

Source from Unsplash under the Unsplash license, documented with photographer credit in `/homepage/assets/images/sources.md`.

- **Hero brochures (4):** Paris (Eiffel from below), Rome (Colosseum interior), London (Tower Bridge dusk), Barcelona (Sagrada Familia spires).
- **§03 right:** airplane wing above clouds, warm LUT.
- **§05 city carousel (8):** one signature shot per city.
- **§07 tours (6):** one photo per featured tour.
- **§10 inspire:** close-up of a travel journal on linen, warm tone, some ink/calligraphy visible.
- **§11 blog (3):** 16:9 thumbnails matching latest article topics.
- **§12 left:** seasonal landscape at low contrast (lavender field / coastal path / dolomites).
- **§12 right:** hotel lobby concierge / travel-desk scene.

### Data

JSON files reused from the v1 delivery where content is still valid:

- `tours.json` — keep the 6 current tours; rewrite price + duration fields if needed.
- `cities.json` — all 8 cities; each with chapter number, tagline, signature photo URL.
- `testimonials.json` — 5 reviews; add `trip_date` field if missing.
- `blog-posts.json` — 3 latest; ensure category tag + read time + date fields.

---

## 11. Accessibility

- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>` throughout.
- WCAG AA contrast — orange CTA text on white (4.5:1), white on maroon footer (>11:1), body on canvas (>11:1).
- Keyboard nav — all interactive elements reachable with tab; focus-visible ring in orange.
- `alt` text on every image with meaningful description + city context.
- Carousel: arrow keys advance on focus, `aria-live="polite"` on active caption, neighbors `aria-hidden="true"`.
- Mega menus: `aria-expanded`, `aria-haspopup`, ESC closes, click-outside closes.
- `prefers-reduced-motion`: see §9.
- Forms: labels visible or `sr-only`, inline error messages, inputs with `autocomplete` and `inputmode`.

---

## 12. Performance

- Hero LCP target < 2.5s on 4G.
- Hero image preload with `<link rel="preload" as="image">` for the most prominent brochure.
- Images served via `<picture>`: AVIF → WebP → JPEG fallback, responsive `srcset` at 480/768/1200/1600/2000.
- Fonts self-hosted, `font-display: swap`, preload Nunito 900 + 500 and EB Garamond italic 400.
- JS bundle: GSAP+ScrollTrigger+Lenis+split-type+homepage.js target < 95KB gzipped.
- Defer non-critical scripts; inline critical CSS for the hero into `<head>`.
- Lazy-load images below the fold with native `loading="lazy"` + `decoding="async"`.

---

## 13. Sitemap compliance

The nav in §01 is derived verbatim from `D:\Code Files\my private tours\index.html` (the wireframe, which is the authoritative sitemap source). Every mega menu entry, sidebar link, and attraction tile listed there appears in the redesigned homepage's nav. Links point to the matching pages in the existing wireframe set — `paris.html`, `paris-eiffel-tower-tours.html`, `blog.html`, `blog-article.html`, `about.html`, `b2b.html`, `contact.html`, `faq.html`, `privacy.html`, `terms.html`, `404.html`. Unresolved targets use `#` placeholders the dev team replaces during WordPress port.

The PDF `myprivatetours_sitemap_v3.pdf` cannot be parsed in this environment; if any additional sections appear there beyond what's in the wireframe nav, the implementation phase surfaces them to the client before final handoff rather than silently dropping them.

---

## 14. Removal

Before rebuilding, remove from `/homepage/`:

- `assets/css/concept-c.css` (replaced by `homepage.css`)
- `assets/js/concept-c.js` (replaced by `homepage.js`)
- References in `index.html` pointing to concept-c files
- `README.md` language specific to Cinematic Immersive

Keep:
- `assets/css/tokens.css` (extend with new tokens)
- `assets/css/base.css` (tighten)
- `assets/js/motion-core.js` (tighten)
- `assets/data/*.json` (reuse, touch up fields)
- `assets/images/` subfolder structure (reorganize)
- `docs/` structure

---

## 15. Out of scope

- Bokun, Mailchimp, GA4, Meta Pixel live wiring.
- WordPress port.
- A/B test instrumentation.
- City / tour detail / blog / About / B2B / Contact page redesigns.
- Additional pages surfaced by the sitemap PDF if they are not in the wireframe nav.

---

## 16. Success criteria

- Every section in §8 is implemented and populated with real content — no empty placeholders.
- Nav in §01 matches the wireframe verbatim including all mega menu entries.
- Visual fidelity at least matches the level of polish seen in travel-sensations.com reference — typography, spacing, photography treatment, motion.
- Animations are considered and `prefers-reduced-motion` is honored.
- Page passes Lighthouse Accessibility ≥ 95, Performance ≥ 85 on a mid-tier mobile.
- Client can open `/homepage/index.html` in a browser and see a complete homepage that does not require a separate "concept picker" page.

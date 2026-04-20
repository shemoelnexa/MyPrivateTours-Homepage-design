# MyPrivateTours Homepage Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/homepage/index.html` as a single polished homepage expressing a warm editorial magazine feel on the MPT brand, with the full wireframe sitemap nav and real content across 13 sections.

**Architecture:** Static HTML + plain CSS + vanilla JS. No build step. GSAP + ScrollTrigger + Lenis + split-type loaded via jsDelivr CDN. Nunito + EB Garamond via existing Google Fonts `@import` in `assets/css/base.css`. Everything runs opening `index.html` directly.

**Tech Stack:** HTML5, CSS3 (custom props, grid, flex), vanilla JS ES2019, GSAP 3.12, ScrollTrigger, Lenis 1.0, split-type 0.3.

**Spec:** `docs/superpowers/specs/2026-04-21-homepage-redesign-design.md`

**Reference for quality floor:** `https://www.travel-sensations.com/nl/` (theme only, do not copy).

---

## File structure

Before the tasks, here is the target file layout after this plan completes:

```
/homepage/
├── index.html                          ← FULL REWRITE
├── README.md                           ← rewrite for new direction
├── assets/
│   ├── css/
│   │   ├── tokens.css                  ← add --mpt-cream, --mpt-maroon
│   │   ├── base.css                    ← keep as-is
│   │   └── homepage.css                ← NEW. Replaces concept-c.css.
│   ├── js/
│   │   ├── motion-core.js              ← keep as-is (already generic)
│   │   └── homepage.js                 ← NEW. Replaces concept-c.js.
│   ├── data/
│   │   ├── cities.json                 ← keep (8 cities with tagline)
│   │   ├── tours.json                  ← keep (8 tours)
│   │   ├── testimonials.json           ← keep (5 reviews)
│   │   └── blog-posts.json             ← keep (3 posts)
│   ├── fonts/                          ← keep (Nunito self-hosted set already pulled via @import)
│   └── images/                         ← keep (Unsplash CDN URLs)
└── docs/
    └── superpowers/
        ├── specs/2026-04-21-homepage-redesign-design.md
        └── plans/2026-04-21-homepage-redesign-plan.md  ← this file
```

**Removed during Task 0:** `assets/css/concept-c.css`, `assets/js/concept-c.js`, and all references from `index.html` + `README.md`.

---

## Branding and tokens (reference — used across tasks)

Used throughout. Source of truth is `assets/css/tokens.css` after Task 0.

| Token | Hex | Use |
|---|---|---|
| `--mpt-orange` | `#E0653C` | CTAs, emphasis color, orbital mark |
| `--mpt-orange-soft` | `#FDEEE7` | Soft pill backgrounds |
| `--mpt-sand` | `#EDD285` | Subtle highlights, eyebrow ticks |
| `--mpt-beige` | `#E5E3D6` | Alt section canvas (§06, §12) |
| `--mpt-cream` | `#F1ECDF` | Hero canvas (§02), testimonials canvas (§08) |
| `--mpt-off` | `#F8F8F8` | Default light canvas |
| `--mpt-ink` | `#252525` | Text, dark ui |
| `--mpt-maroon` | `#2F1412` | Footer canvas (§13) |

Fonts: `var(--font-sans)` = Nunito; `var(--font-serif)` = EB Garamond.

---

## Task 0: Clean slate

**Files:**
- Delete: `assets/css/concept-c.css`, `assets/js/concept-c.js`
- Modify: `assets/css/tokens.css`
- Create: `assets/css/homepage.css` (empty scaffold)
- Create: `assets/js/homepage.js` (empty scaffold)

- [ ] **Step 1: Delete Concept C files**

Run from repo root:

```bash
rm "assets/css/concept-c.css"
rm "assets/js/concept-c.js"
```

- [ ] **Step 2: Update `tokens.css` — add cream + maroon, remove Concept C tokens**

Replace the whole file with:

```css
/* ==========================================================================
   MyPrivateTours.com — Design tokens
   ========================================================================== */

:root {
  /* Brand palette */
  --mpt-orange:       #E0653C;
  --mpt-orange-soft:  #FDEEE7;
  --mpt-sand:         #EDD285;
  --mpt-beige:        #E5E3D6;
  --mpt-cream:        #F1ECDF;
  --mpt-off:          #F8F8F8;
  --mpt-ink:          #252525;
  --mpt-maroon:       #2F1412;

  /* Typography */
  --font-sans:   'Nunito', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-serif:  'EB Garamond', 'Times New Roman', Georgia, serif;

  /* Motion */
  --ease-out:     cubic-bezier(0.22, 1, 0.36, 1);
  --ease-spring:  cubic-bezier(0.5, 1.5, 0.5, 1);

  /* Radius */
  --r-sm:   8px;
  --r-md:   12px;
  --r-lg:   16px;
  --r-pill: 999px;

  /* Layout */
  --container-narrow: 1140px;
  --container-wide:   1280px;
  --container-max:    1440px;
}
```

- [ ] **Step 3: Create empty scaffold for `homepage.css`**

Create `assets/css/homepage.css` with:

```css
/* ==========================================================================
   MyPrivateTours.com — Homepage (2026-04-21 redesign)
   Warm editorial magazine feel. All 13 sections.
   ========================================================================== */

/* Sections are layered into this file in order as tasks progress:
   §01 nav → §02 hero → §03 orbital → §04 cities title/tabs →
   §05 city carousel → §06 why → §07 tours → §08 testimonials →
   §09 trust → §10 inspire → §11 journal → §12 dual → §13 footer  */
```

- [ ] **Step 4: Create empty scaffold for `homepage.js`**

Create `assets/js/homepage.js` with:

```js
/**
 * homepage.js — motion + behavior for the 2026-04-21 redesigned homepage
 * Depends on: motion-core.js (loaded first), gsap, ScrollTrigger, Lenis, SplitType
 */
(function () {
  'use strict';
  if (!window.MPT) { console.error('homepage.js: MPT missing'); return; }

  MPT.initSmoothScroll({ duration: 1.2 });

  document.addEventListener('DOMContentLoaded', () => {
    // Section modules register here as tasks progress
  });
})();
```

- [ ] **Step 5: Verify base.css Google Fonts @import includes both Nunito and EB Garamond**

Open `assets/css/base.css` and confirm line 6:

```css
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..700;1,400..700&family=Nunito:wght@400;500;700;800;900&display=swap');
```

If it's missing EB Garamond, replace that line. Otherwise move on.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Task 0: scrap Concept C, extend tokens with cream+maroon, scaffold homepage.css/js"
```

---

## Task 1: index.html scaffold + global nav (§01)

**Files:**
- Rewrite: `index.html`
- Append to: `assets/css/homepage.css`
- Append to: `assets/js/homepage.js`

The nav reproduces the wireframe at `../my private tours/index.html` verbatim — same mega-menu structure, 18 attractions, 9 blog articles, 9 B2B tiles, 8 cities sidebar, etc.

- [ ] **Step 1: Rewrite `index.html` — full scaffold with nav + 13 empty section shells**

Replace the whole file with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>MyPrivateTours — Your trusted Private Tour Designer</title>
  <meta name="description" content="Expert local guides across eight iconic cities. 100% private groups. Flexible booking. Private tours designed around your pace." />

  <link rel="preload" as="image" href="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&fm=webp&q=85" />

  <link rel="stylesheet" href="assets/css/tokens.css" />
  <link rel="stylesheet" href="assets/css/base.css" />
  <link rel="stylesheet" href="assets/css/homepage.css" />
</head>
<body class="hp">

  <!-- §01 GLOBAL NAV -->
  <header class="hp-nav" role="banner" data-nav>
    <div class="hp-nav__top">
      <div class="hp-nav__top-inner">
        <a href="#" class="hp-util"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> Wishlist</a>
        <a href="#" class="hp-util"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> EN / USD</a>
        <a href="#" class="hp-util hp-util--pill">Sign in</a>
      </div>
    </div>

    <div class="hp-nav__primary">
      <div class="hp-nav__primary-inner">
        <a href="index.html" class="hp-logo" aria-label="MyPrivateTours — home">
          <span class="hp-logo__mark" aria-hidden="true"></span>
          <span class="hp-logo__wordmark">MyPrivate<em>Tours</em></span>
        </a>

        <nav class="hp-nav__items" aria-label="Primary">
          <ul>
            <li><a href="index.html">Home</a></li>

            <li class="hp-nav__has-mega" data-mega="cities">
              <button type="button" aria-expanded="false" aria-haspopup="true">City Tours <span aria-hidden="true">▾</span></button>
              <div class="hp-mega" role="region" aria-label="City Tours">
                <div class="hp-mega__layout">
                  <aside class="hp-mega__sidebar">
                    <ul>
                      <li><a href="../my private tours/paris.html" class="is-active">Paris</a></li>
                      <li><a href="#">Rome</a></li>
                      <li><a href="#">London</a></li>
                      <li><a href="#">Barcelona</a></li>
                      <li><a href="#">Florence</a></li>
                      <li><a href="#">Prague</a></li>
                      <li><a href="#">Venice</a></li>
                      <li><a href="#">New York</a></li>
                    </ul>
                  </aside>
                  <div class="hp-mega__main">
                    <h4 class="hp-mega__heading"><span class="hp-mega__dot"></span> Top attractions</h4>
                    <div class="hp-mega__grid" data-mega-attractions></div>
                  </div>
                </div>
              </div>
            </li>

            <li class="hp-nav__has-mega" data-mega="blog">
              <button type="button" aria-expanded="false" aria-haspopup="true">Blog <span aria-hidden="true">▾</span></button>
              <div class="hp-mega" role="region" aria-label="Blog">
                <div class="hp-mega__layout">
                  <aside class="hp-mega__sidebar">
                    <ul>
                      <li><a href="../my private tours/blog.html" class="is-active">All Articles</a></li>
                      <li><a href="#">Travel Tips</a></li>
                      <li><a href="#">Destination Guides</a></li>
                      <li><a href="#">Food &amp; Culture</a></li>
                      <li><a href="#">Family Travel</a></li>
                      <li><a href="#">Hidden Gems</a></li>
                    </ul>
                  </aside>
                  <div class="hp-mega__main">
                    <h4 class="hp-mega__heading"><span class="hp-mega__dot"></span> Latest articles</h4>
                    <div class="hp-mega__grid" data-mega-articles></div>
                  </div>
                </div>
              </div>
            </li>

            <li><a href="../my private tours/about.html">About</a></li>

            <li class="hp-nav__has-mega" data-mega="b2b">
              <button type="button" aria-expanded="false" aria-haspopup="true">B2B <span aria-hidden="true">▾</span></button>
              <div class="hp-mega" role="region" aria-label="B2B">
                <div class="hp-mega__layout">
                  <aside class="hp-mega__sidebar">
                    <ul>
                      <li><a href="../my private tours/b2b.html" class="is-active">Overview</a></li>
                      <li><a href="#">Travel Agencies</a></li>
                      <li><a href="#">Hotels &amp; Concierge</a></li>
                      <li><a href="#">Corporate Groups</a></li>
                      <li><a href="#">DMCs &amp; Operators</a></li>
                      <li><a href="#">Affiliate Program</a></li>
                    </ul>
                  </aside>
                  <div class="hp-mega__main">
                    <h4 class="hp-mega__heading"><span class="hp-mega__dot"></span> Partner solutions</h4>
                    <div class="hp-mega__grid" data-mega-partners></div>
                  </div>
                </div>
              </div>
            </li>

            <li><a href="../my private tours/contact.html">Contact</a></li>
          </ul>
        </nav>

        <button class="hp-hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="hp-mobile-nav" data-hamburger>
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- MOBILE NAV -->
  <div class="hp-mobile-nav" id="hp-mobile-nav" aria-hidden="true" data-mobile-nav>
    <div class="hp-mobile-nav__header">
      <span class="hp-logo__wordmark">MyPrivate<em>Tours</em></span>
      <button class="hp-mobile-nav__close" aria-label="Close menu" data-mobile-close>&times;</button>
    </div>
    <ul class="hp-mobile-nav__list" data-mobile-list></ul>
  </div>
  <div class="hp-mobile-nav__backdrop" data-mobile-backdrop></div>

  <main>
    <!-- §02 HERO -->
    <section class="hp-hero" data-section="hero"></section>

    <!-- §03 ORBITAL SPLIT -->
    <section class="hp-orbital" data-section="orbital"></section>

    <!-- §04 + §05 CITIES -->
    <section class="hp-cities" data-section="cities"></section>

    <!-- §06 WHY -->
    <section class="hp-why" data-section="why"></section>

    <!-- §07 TOURS -->
    <section class="hp-tours" data-section="tours"></section>

    <!-- §08 TESTIMONIALS -->
    <section class="hp-testimonials" data-section="testimonials"></section>

    <!-- §09 TRUST -->
    <section class="hp-trust" data-section="trust"></section>

    <!-- §10 INSPIRE -->
    <section class="hp-inspire" data-section="inspire"></section>

    <!-- §11 JOURNAL -->
    <section class="hp-journal" data-section="journal"></section>

    <!-- §12 DUAL -->
    <section class="hp-dual" data-section="dual"></section>
  </main>

  <!-- §13 FOOTER -->
  <footer class="hp-footer" role="contentinfo" data-section="footer"></footer>

  <!-- WhatsApp float -->
  <a href="https://wa.me/" class="hp-whatsapp" aria-label="Chat on WhatsApp">
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="currentColor" d="M17.5 14.4c-.3-.2-1.7-.8-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.6.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.2-.7-1.7-1-2.3-.3-.7-.6-.6-.7-.6h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.6 1.1 3.1 1.2 3.3.2.2 2.2 3.4 5.4 4.7 3.2 1.2 3.2.8 3.8.8.6-.1 1.8-.7 2.1-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l4.9-1.4C8.4 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
    </svg>
  </a>

  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.0.42/dist/lenis.min.js"></script>
  <script src="assets/js/motion-core.js"></script>
  <script src="assets/js/homepage.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Append nav CSS to `homepage.css`**

Append to `assets/css/homepage.css`:

```css
/* ============================================================
   §01 NAV + MOBILE NAV
   ============================================================ */

body.hp { background: var(--mpt-off); color: var(--mpt-ink); }

/* Utility top bar */
.hp-nav__top { background: var(--mpt-ink); color: var(--mpt-off); font-size: 12px; letter-spacing: .02em; }
.hp-nav__top-inner { max-width: var(--container-max); margin: 0 auto; padding: 8px 40px; display: flex; justify-content: flex-end; gap: 18px; align-items: center; }
.hp-util { display: inline-flex; align-items: center; gap: 6px; opacity: .85; font-weight: 600; font-size: 12px; }
.hp-util:hover { opacity: 1; }
.hp-util--pill { background: var(--mpt-orange); color: #fff; padding: 6px 14px; border-radius: var(--r-pill); opacity: 1; font-weight: 800; letter-spacing: .02em; }
.hp-util--pill:hover { background: #CB5530; }

/* Primary row */
.hp-nav { position: sticky; top: 0; z-index: 100; background: var(--mpt-off); border-bottom: 1px solid rgba(37, 37, 37, .06); transition: box-shadow .2s ease, background .2s ease; }
.hp-nav.is-stuck { box-shadow: 0 8px 32px rgba(0,0,0,.08); background: rgba(248,248,248,.92); backdrop-filter: blur(10px); }
.hp-nav__primary { position: relative; }
.hp-nav__primary-inner { max-width: var(--container-max); margin: 0 auto; padding: 18px 40px; display: flex; align-items: center; justify-content: space-between; gap: 32px; }

.hp-logo { display: inline-flex; align-items: center; gap: 10px; flex-shrink: 0; }
.hp-logo__mark { position: relative; width: 26px; height: 26px; border: 1.5px solid var(--mpt-orange); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; }
.hp-logo__mark::after { content: ""; width: 8px; height: 8px; background: var(--mpt-orange); border-radius: 50%; }
.hp-logo__mark::before { content: ""; position: absolute; width: 36px; height: 10px; border: 1px solid rgba(224,101,60,.55); border-radius: 50%; transform: rotate(-18deg); }
.hp-logo__wordmark { font-weight: 900; font-size: 18px; letter-spacing: -.02em; color: var(--mpt-ink); }
.hp-logo__wordmark em { font-family: var(--font-serif); font-style: italic; font-weight: 400; }

.hp-nav__items ul { display: flex; gap: 28px; align-items: center; }
.hp-nav__items li { position: relative; }
.hp-nav__items a, .hp-nav__items button { font-size: 14px; font-weight: 700; color: var(--mpt-ink); padding: 8px 4px; display: inline-flex; align-items: center; gap: 4px; transition: color .15s ease; }
.hp-nav__items a:hover, .hp-nav__items button:hover { color: var(--mpt-orange); }
.hp-nav__items button { cursor: pointer; }

/* Mega menu */
.hp-mega { position: absolute; top: calc(100% + 18px); left: 50%; transform: translateX(-50%) translateY(6px); width: 920px; max-width: calc(100vw - 40px); background: var(--mpt-off); border: 1px solid rgba(37,37,37,.08); border-radius: var(--r-lg); box-shadow: 0 24px 60px rgba(0,0,0,.14); padding: 30px; opacity: 0; visibility: hidden; transition: opacity .2s var(--ease-out), transform .2s var(--ease-out), visibility .2s; z-index: 50; }
.hp-nav__has-mega.is-open > .hp-mega { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }
.hp-mega__layout { display: grid; grid-template-columns: 220px 1fr; gap: 28px; }
.hp-mega__sidebar { border-right: 1px solid rgba(37,37,37,.08); padding-right: 20px; }
.hp-mega__sidebar ul { display: flex; flex-direction: column; gap: 4px; }
.hp-mega__sidebar a { display: block; padding: 8px 10px; font-size: 14px; font-weight: 600; color: var(--mpt-ink); border-radius: var(--r-sm); transition: background .15s, color .15s; }
.hp-mega__sidebar a:hover, .hp-mega__sidebar a.is-active { background: var(--mpt-orange-soft); color: var(--mpt-orange); }
.hp-mega__main { min-width: 0; }
.hp-mega__heading { font-size: 11px; font-weight: 800; letter-spacing: .3em; text-transform: uppercase; color: var(--mpt-ink); opacity: .7; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 16px; }
.hp-mega__dot { width: 6px; height: 6px; background: var(--mpt-orange); border-radius: 50%; }
.hp-mega__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.hp-mega__tile { display: flex; gap: 10px; padding: 10px; border-radius: var(--r-md); transition: background .15s; }
.hp-mega__tile:hover { background: var(--mpt-orange-soft); }
.hp-mega__tile-img { width: 48px; height: 48px; border-radius: var(--r-sm); background: var(--mpt-beige) center/cover; flex-shrink: 0; }
.hp-mega__tile-text strong { display: block; font-size: 13px; font-weight: 800; color: var(--mpt-ink); margin-bottom: 2px; }
.hp-mega__tile-text span { font-size: 11px; color: var(--mpt-ink); opacity: .6; font-weight: 600; }

/* Hamburger */
.hp-hamburger { display: none; width: 32px; height: 32px; flex-direction: column; justify-content: center; gap: 5px; padding: 4px; }
.hp-hamburger span { display: block; width: 100%; height: 2px; background: var(--mpt-ink); border-radius: 2px; transition: transform .2s; }
.hp-nav.is-open .hp-hamburger span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hp-nav.is-open .hp-hamburger span:nth-child(2) { opacity: 0; }
.hp-nav.is-open .hp-hamburger span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile overlay */
.hp-mobile-nav { position: fixed; top: 0; right: 0; width: 92vw; max-width: 420px; height: 100vh; background: var(--mpt-off); z-index: 200; padding: 24px; transform: translateX(100%); transition: transform .25s var(--ease-out); overflow-y: auto; }
.hp-mobile-nav.is-open { transform: translateX(0); }
.hp-mobile-nav__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
.hp-mobile-nav__close { font-size: 32px; line-height: 1; color: var(--mpt-ink); }
.hp-mobile-nav__list { display: flex; flex-direction: column; gap: 2px; }
.hp-mobile-nav__list > li > a, .hp-mobile-nav__list > li > button { display: flex; width: 100%; padding: 14px 12px; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 700; color: var(--mpt-ink); border-radius: var(--r-sm); }
.hp-mobile-nav__list > li > a:hover, .hp-mobile-nav__list > li > button:hover { background: var(--mpt-orange-soft); color: var(--mpt-orange); }
.hp-mobile-nav__sub { display: none; padding: 6px 12px 12px 28px; flex-direction: column; gap: 6px; }
.hp-mobile-nav__list > li.is-open .hp-mobile-nav__sub { display: flex; }
.hp-mobile-nav__sub a { font-size: 14px; padding: 6px 0; color: var(--mpt-ink); opacity: .75; }
.hp-mobile-nav__backdrop { position: fixed; inset: 0; background: rgba(37,37,37,.5); opacity: 0; visibility: hidden; z-index: 150; transition: opacity .2s, visibility .2s; }
.hp-mobile-nav__backdrop.is-open { opacity: 1; visibility: visible; }

@media (max-width: 960px) {
  .hp-nav__items, .hp-nav__top-inner .hp-util:nth-child(2) { display: none; }
  .hp-hamburger { display: inline-flex; }
}

/* WhatsApp float */
.hp-whatsapp { position: fixed; bottom: 24px; right: 24px; width: 56px; height: 56px; border-radius: 50%; background: var(--mpt-cream); color: var(--mpt-ink); display: flex; align-items: center; justify-content: center; border: 1.5px solid var(--mpt-orange); box-shadow: 0 10px 30px rgba(0,0,0,.14); z-index: 80; transition: transform .2s; }
.hp-whatsapp:hover { transform: scale(1.06); }
```

- [ ] **Step 3: Append nav behavior JS to `homepage.js`**

Append inside the `DOMContentLoaded` handler and module section at the bottom:

```js
// ── Nav: sticky shadow, mega menus, mobile overlay ─────────
(function initNav() {
  const nav = document.querySelector('[data-nav]');
  if (!nav) return;

  // Sticky shadow when scrolled past 40px
  const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Populate mega menu content
  populateAttractions();
  populateArticles();
  populatePartners();

  // Mega menu hover + focus
  nav.querySelectorAll('.hp-nav__has-mega').forEach(item => {
    const btn = item.querySelector('button');
    let closeTimer;
    const open  = () => { clearTimeout(closeTimer); item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); };
    const close = () => { closeTimer = setTimeout(() => { item.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }, 120); };
    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', close);
    btn.addEventListener('focus', open);
    btn.addEventListener('click', e => { e.preventDefault(); item.classList.toggle('is-open'); btn.setAttribute('aria-expanded', item.classList.contains('is-open')); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.hp-nav__has-mega')) {
      nav.querySelectorAll('.hp-nav__has-mega.is-open').forEach(i => {
        i.classList.remove('is-open');
        i.querySelector('button')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Mobile overlay
  const hamburger = nav.querySelector('[data-hamburger]');
  const overlay   = document.querySelector('[data-mobile-nav]');
  const backdrop  = document.querySelector('[data-mobile-backdrop]');
  const closeBtn  = document.querySelector('[data-mobile-close]');
  const list      = document.querySelector('[data-mobile-list]');
  buildMobileList(list);

  const openMobile = () => { nav.classList.add('is-open'); overlay.classList.add('is-open'); backdrop.classList.add('is-open'); overlay.setAttribute('aria-hidden', 'false'); hamburger.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; };
  const closeMobile = () => { nav.classList.remove('is-open'); overlay.classList.remove('is-open'); backdrop.classList.remove('is-open'); overlay.setAttribute('aria-hidden', 'true'); hamburger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };
  hamburger.addEventListener('click', () => nav.classList.contains('is-open') ? closeMobile() : openMobile());
  closeBtn.addEventListener('click', closeMobile);
  backdrop.addEventListener('click', closeMobile);
})();

// Mega menu content (attractions, articles, partners) ─────
const MEGA_ATTRACTIONS = [
  { t:'Eiffel Tower Tours',        s:'Attraction in Paris, France' },
  { t:'Colosseum Tours',           s:'Attraction in Rome, Italy' },
  { t:'Sagrada Família Tours',     s:'Attraction in Barcelona, Spain' },
  { t:'Vatican Museums Tours',     s:'Attraction in Rome, Italy' },
  { t:'Disneyland Paris Tours',    s:'Attraction in Paris, France' },
  { t:'Memorial & Museum Tours',   s:'Attraction in Oświęcim, Poland' },
  { t:'Warner Bros. Studio Tours', s:'Attraction in London, UK' },
  { t:'Seine River Tours',         s:'Attraction in Paris, France' },
  { t:'Van Gogh Museum Tours',     s:'Attraction in Amsterdam, Netherlands' },
  { t:'Louvre Museum Tours',       s:'Attraction in Paris, France' },
  { t:'Anne Frank House Tours',    s:'Attraction in Amsterdam, Netherlands' },
  { t:'Alhambra Tours',            s:'Attraction in Granada, Spain' },
  { t:'Park Güell Tours',          s:'Attraction in Barcelona, Spain' },
  { t:'Keukenhof Tours',           s:'Attraction in Lisse, Netherlands' },
  { t:'Montserrat Monastery Tours',s:'Attraction in Monistrol, Spain' },
  { t:'Last Supper Tours',         s:'Attraction in Milan, Italy' },
  { t:'Moulin Rouge Tours',        s:'Attraction in Paris, France' },
  { t:'Tower of London Tours',     s:'Attraction in London, UK' },
];

const MEGA_ARTICLES = [
  { t:'10 Hidden Gems in Paris Only Locals Know',         s:'Travel Tips · 6 min read' },
  { t:'Ultimate Guide to the Colosseum in 2026',          s:'Destination Guide · 8 min read' },
  { t:'London with Kids: A Family Travel Guide',          s:'Family Travel · 5 min read' },
  { t:'Barcelona Beyond Gaudí: Local Favourites',         s:'Hidden Gems · 7 min read' },
  { t:'Best Food Tours in Europe: A Tasting Guide',       s:'Food & Culture · 6 min read' },
  { t:'Venice Off the Beaten Path',                       s:'Hidden Gems · 5 min read' },
  { t:'Prague in Winter: A Magical Experience',           s:'Destination Guide · 6 min read' },
  { t:'Florence Art & Wine: The Perfect Combo',           s:'Food & Culture · 7 min read' },
  { t:"First-Timer's Guide to New York City",             s:'Travel Tips · 9 min read' },
];

const MEGA_PARTNERS = [
  { t:'White-Label Solutions',   s:'Branded booking for your clients' },
  { t:'API Integration',         s:'Connect your platform to our tours' },
  { t:'Commission Program',      s:'Earn on every referral booking' },
  { t:'Group Bookings',          s:'Custom itineraries for 10+ guests' },
  { t:'Concierge Desk Program',  s:'Exclusive rates for hotel partners' },
  { t:'Corporate Experiences',   s:'Team building & incentive trips' },
  { t:'MICE & Events',           s:'Meetings, incentives & conferences' },
  { t:'DMC Partnerships',        s:'Destination management collaboration' },
  { t:'Affiliate Program',       s:'Earn commissions from your audience' },
];

function megaTileHTML(it) {
  return `<a href="#" class="hp-mega__tile"><div class="hp-mega__tile-img"></div><div class="hp-mega__tile-text"><strong>${it.t}</strong><span>${it.s}</span></div></a>`;
}
function populateAttractions() { const c = document.querySelector('[data-mega-attractions]'); if (c) c.innerHTML = MEGA_ATTRACTIONS.map(megaTileHTML).join(''); }
function populateArticles()    { const c = document.querySelector('[data-mega-articles]');    if (c) c.innerHTML = MEGA_ARTICLES.map(megaTileHTML).join(''); }
function populatePartners()    { const c = document.querySelector('[data-mega-partners]');    if (c) c.innerHTML = MEGA_PARTNERS.map(megaTileHTML).join(''); }

function buildMobileList(list) {
  if (!list) return;
  list.innerHTML = `
    <li><a href="index.html">Home</a></li>
    <li><button type="button" data-accordion>City Tours<span>▾</span></button>
      <div class="hp-mobile-nav__sub">
        <a href="../my private tours/paris.html">Paris</a>
        <a href="#">Rome</a><a href="#">London</a><a href="#">Barcelona</a>
        <a href="#">Florence</a><a href="#">Prague</a><a href="#">Venice</a><a href="#">New York</a>
      </div></li>
    <li><button type="button" data-accordion>Blog<span>▾</span></button>
      <div class="hp-mobile-nav__sub">
        <a href="../my private tours/blog.html">All Articles</a>
        <a href="#">Travel Tips</a><a href="#">Destination Guides</a>
        <a href="#">Food & Culture</a><a href="#">Family Travel</a><a href="#">Hidden Gems</a>
      </div></li>
    <li><a href="../my private tours/about.html">About</a></li>
    <li><button type="button" data-accordion>B2B<span>▾</span></button>
      <div class="hp-mobile-nav__sub">
        <a href="../my private tours/b2b.html">Overview</a>
        <a href="#">Travel Agencies</a><a href="#">Hotels &amp; Concierge</a>
        <a href="#">Corporate Groups</a><a href="#">DMCs &amp; Operators</a><a href="#">Affiliate Program</a>
      </div></li>
    <li><a href="../my private tours/contact.html">Contact</a></li>
  `;
  list.querySelectorAll('[data-accordion]').forEach(btn => {
    btn.addEventListener('click', () => btn.parentElement.classList.toggle('is-open'));
  });
}
```

- [ ] **Step 4: Verify in browser**

From repo root:

```bash
python -m http.server 8080
```

Open http://localhost:8080/ (if homepage is served from its own dir: http://localhost:8080/index.html from the homepage dir). Check:

1. Top utility bar shows Wishlist / EN/USD / orange Sign in pill.
2. Logo on the left with orbital mark (small circle with orange dot + tilted orbit ring).
3. Nav items: Home · City Tours ▾ · Blog ▾ · About · B2B ▾ · Contact.
4. Hover `City Tours` → mega menu opens with 8-city sidebar and 18 attraction tiles.
5. Hover `Blog` → 6 categories + 9 article tiles.
6. Hover `B2B` → 6 partner types + 9 solution tiles.
7. Scroll down 50px → nav gets a faint shadow + blurred background.
8. Resize to 600px width → hamburger shows, nav items hide.
9. Click hamburger → right overlay slides in with accordion groups. Each accordion toggle expands correctly. Close button + backdrop close the overlay.
10. Only the 10 empty `<section>` shells below nav (no content yet).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Task 1: §01 global nav — full sitemap, 3 mega menus, mobile accordion"
```

---

## Task 2: Hero §02 (magazine-stack)

**Files:**
- Modify: `index.html` — fill `<section class="hp-hero">`
- Append to: `assets/css/homepage.css`
- Append to: `assets/js/homepage.js`

- [ ] **Step 1: Replace hero shell in `index.html`**

Find `<section class="hp-hero" data-section="hero"></section>` and replace with:

```html
<section class="hp-hero" data-section="hero" aria-labelledby="hp-hero-h1">
  <div class="hp-hero__rings" aria-hidden="true">
    <span class="hp-hero__ring hp-hero__ring--1"></span>
    <span class="hp-hero__ring hp-hero__ring--2"></span>
    <span class="hp-hero__ring hp-hero__ring--3"></span>
  </div>

  <div class="hp-hero__mags" aria-hidden="true">
    <div class="hp-hero__mag hp-hero__mag--1" style="background-image:url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&fm=webp&q=85')"></div>
    <div class="hp-hero__mag hp-hero__mag--2" style="background-image:url('https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&fm=webp&q=85')"></div>
    <div class="hp-hero__mag hp-hero__mag--3" style="background-image:url('https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800&fm=webp&q=85')"></div>
    <div class="hp-hero__mag hp-hero__mag--4" style="background-image:url('https://images.unsplash.com/photo-1578095172812-dcc191c5aed8?w=800&fm=webp&q=85')"></div>
  </div>

  <div class="hp-hero__center">
    <span class="hp-hero__biglogo" aria-hidden="true"></span>
    <p class="hp-eyebrow">Private tours · Est. 2014</p>
    <h1 id="hp-hero-h1" class="hp-hero__h1" data-split-words>
      Your trusted<br /><em>Private Tour Designer.</em>
    </h1>
    <p class="hp-hero__sub">Expert local guides across eight iconic cities. 100% private groups. Flexible booking. Tours designed around your pace, not a bus schedule.</p>
    <a href="#tours" class="hp-btn hp-btn--primary">Explore all tours →</a>
  </div>

  <form class="hp-hero__search" action="#" method="get" role="search" aria-label="Search tours">
    <label class="hp-hero__search-cell">
      <span>City</span>
      <select><option>Paris</option><option>Rome</option><option>London</option><option>Barcelona</option><option>Florence</option><option>Prague</option><option>Venice</option><option>New York</option></select>
    </label>
    <label class="hp-hero__search-cell">
      <span>Dates</span><input type="text" placeholder="Add dates" />
    </label>
    <label class="hp-hero__search-cell">
      <span>Guests</span><input type="text" placeholder="2 travellers" />
    </label>
    <button type="submit" class="hp-hero__search-go">Search</button>
  </form>
</section>
```

- [ ] **Step 2: Append hero CSS**

Append to `assets/css/homepage.css`:

```css
/* ============================================================
   Shared typographic utilities
   ============================================================ */
.hp-eyebrow { font-size: 11px; font-weight: 800; letter-spacing: .3em; text-transform: uppercase; color: var(--mpt-ink); opacity: .6; display: inline-flex; align-items: center; gap: 12px; }
.hp-eyebrow::before { content: ""; width: 34px; height: 1px; background: var(--mpt-orange); display: inline-block; }
.hp-eyebrow--centered { display: block; text-align: center; }
.hp-eyebrow--centered::before { display: block; width: 44px; margin: 0 auto 10px; }

.hp-btn { display: inline-flex; align-items: center; gap: 6px; font-weight: 800; font-size: 13px; letter-spacing: .04em; text-transform: uppercase; border-radius: var(--r-pill); padding: 16px 34px; transition: transform .18s var(--ease-out), box-shadow .18s var(--ease-out), background .18s; }
.hp-btn--primary { background: var(--mpt-orange); color: #fff; box-shadow: 0 14px 36px rgba(224,101,60,.3); }
.hp-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 18px 42px rgba(224,101,60,.4); background: #CB5530; }
.hp-btn--primary:active { transform: translateY(0) scale(.98); }
.hp-btn--ghost { background: transparent; color: var(--mpt-ink); border: 1.5px solid var(--mpt-ink); }
.hp-btn--ghost:hover { background: var(--mpt-ink); color: #fff; }

/* ============================================================
   §02 HERO
   ============================================================ */
.hp-hero { position: relative; min-height: clamp(640px, 88vh, 820px); background: var(--mpt-cream); overflow: hidden; padding: 80px 40px 120px; display: flex; flex-direction: column; justify-content: center; align-items: center; }

.hp-hero__rings { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; }
.hp-hero__ring { position: absolute; border: 1px solid rgba(37,37,37,.08); border-radius: 50%; opacity: 0; }
.hp-hero__ring--1 { width: 720px; height: 720px; }
.hp-hero__ring--2 { width: 540px; height: 540px; }
.hp-hero__ring--3 { width: 360px; height: 360px; }

.hp-hero__mags { position: absolute; inset: 0; pointer-events: none; }
.hp-hero__mag { position: absolute; background-size: cover; background-position: center; border-radius: 4px; box-shadow: 0 22px 50px rgba(37,37,37,.18); opacity: 0; }
.hp-hero__mag--1 { width: 240px; aspect-ratio: 4/5; left: 4%;  top: 10%; transform: rotate(-11deg); }
.hp-hero__mag--2 { width: 200px; aspect-ratio: 3/4; left: 14%; top: 54%; transform: rotate(6deg); }
.hp-hero__mag--3 { width: 220px; aspect-ratio: 4/5; right: 6%; top: 9%;  transform: rotate(9deg); }
.hp-hero__mag--4 { width: 210px; aspect-ratio: 3/4; right: 14%;top: 56%; transform: rotate(-5deg); }

.hp-hero__center { position: relative; z-index: 3; max-width: 640px; text-align: center; padding: 20px; }
.hp-hero__biglogo { position: relative; display: block; width: 54px; height: 54px; margin: 0 auto 18px; border: 1.5px solid var(--mpt-orange); border-radius: 50%; background: var(--mpt-cream); }
.hp-hero__biglogo::after { content: ""; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 16px; height: 16px; background: var(--mpt-orange); border-radius: 50%; }
.hp-hero__biglogo::before { content: ""; position: absolute; top: 50%; left: 50%; width: 72px; height: 20px; border: 1px solid rgba(224,101,60,.55); border-radius: 50%; transform: translate(-50%, -50%) rotate(-18deg); }

.hp-hero__h1 { font-family: var(--font-sans); font-weight: 900; font-size: clamp(40px, 6.8vw, 64px); line-height: .98; letter-spacing: -.035em; margin: 10px 0 14px; }
.hp-hero__h1 em { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--mpt-orange); font-size: .88em; }
.hp-hero__sub { font-size: clamp(15px, 1.4vw, 17px); line-height: 1.55; max-width: 500px; margin: 0 auto 26px; opacity: .75; }

.hp-hero__search { position: absolute; bottom: 34px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; background: var(--mpt-off); border: 1px solid rgba(37,37,37,.08); border-radius: var(--r-pill); padding: 6px 6px 6px 22px; max-width: 580px; width: calc(100% - 80px); box-shadow: 0 18px 46px rgba(37,37,37,.14); z-index: 4; }
.hp-hero__search-cell { display: flex; flex-direction: column; padding: 8px 18px; border-right: 1px solid rgba(37,37,37,.1); flex: 1; min-width: 0; }
.hp-hero__search-cell:last-of-type { border: none; }
.hp-hero__search-cell span { font-size: 10px; letter-spacing: .2em; text-transform: uppercase; font-weight: 800; opacity: .55; }
.hp-hero__search-cell input, .hp-hero__search-cell select { font-size: 13px; font-weight: 700; color: var(--mpt-ink); border: 0; outline: 0; background: transparent; font-family: inherit; padding: 2px 0; width: 100%; }
.hp-hero__search-cell input::placeholder { color: var(--mpt-ink); opacity: .45; font-weight: 500; }
.hp-hero__search-go { background: var(--mpt-orange); color: #fff; border-radius: var(--r-pill); padding: 12px 22px; font-weight: 800; font-size: 12px; letter-spacing: .04em; text-transform: uppercase; cursor: pointer; }
.hp-hero__search-go:hover { background: #CB5530; }

@media (max-width: 900px) {
  .hp-hero__mag { display: none; }
  .hp-hero__ring--1 { width: 560px; height: 560px; }
  .hp-hero__ring--2 { width: 400px; height: 400px; }
  .hp-hero__ring--3 { width: 260px; height: 260px; }
  .hp-hero__search { flex-wrap: wrap; border-radius: var(--r-lg); padding: 10px; }
  .hp-hero__search-cell { border: none; padding: 10px; border-bottom: 1px solid rgba(37,37,37,.1); flex-basis: 100%; }
  .hp-hero__search-go { width: 100%; margin-top: 8px; padding: 14px; }
}
```

- [ ] **Step 3: Append hero JS — ring draw + magazine stagger + headline split + parallax**

Append at the bottom of `assets/js/homepage.js` (inside the IIFE, before the closing `})();`):

```js
// ── Hero: rings fade, magazines fly in, headline split, parallax ──
(function initHero() {
  if (MPT.isReducedMotion()) {
    document.querySelectorAll('.hp-hero__ring').forEach(r => r.style.opacity = .12);
    document.querySelectorAll('.hp-hero__mag').forEach(m => m.style.opacity = 1);
    return;
  }

  const rings = document.querySelectorAll('.hp-hero__ring');
  const mags  = document.querySelectorAll('.hp-hero__mag');
  const title = document.querySelector('[data-split-words]');

  gsap.set(rings, { scale: .85, opacity: 0 });
  gsap.to(rings, { scale: 1, opacity: .12, duration: .9, ease: 'power3.out', stagger: .12, delay: .1 });

  mags.forEach((m, i) => {
    const initialX = m.classList.contains('hp-hero__mag--1') || m.classList.contains('hp-hero__mag--2') ? -40 : 40;
    const initialY = m.classList.contains('hp-hero__mag--1') || m.classList.contains('hp-hero__mag--3') ? -30 : 30;
    gsap.fromTo(m, { x: initialX, y: initialY, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: .7, ease: 'power3.out', delay: .3 + i * .1 });

    // Parallax
    gsap.to(m, {
      y: ['-15%','-8%','-20%','-11%'][i] || '-10%',
      ease: 'none',
      scrollTrigger: { trigger: '.hp-hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  });

  if (title) {
    MPT.splitAndAnimate(title, { split: 'words', stagger: .08, duration: .5, ease: 'power3.out', from: { y: 20 }, start: 'top 90%' });
  }
})();
```

- [ ] **Step 4: Verify in browser**

Open the page. Expected:

1. Hero cream canvas. Three thin concentric rings fade in (subtle).
2. Four city "brochures" fly in from their off-axis starting positions into their final rotation, staggered.
3. Headline "Your trusted *Private Tour Designer.*" appears word-by-word.
4. Orange CTA "Explore all tours →" sits below subhead.
5. Search pill docked at hero bottom with City / Dates / Guests / Search.
6. Scroll a little — brochures drift upward at different speeds (parallax).
7. Resize to 600px — brochures hide, rings shrink, search pill stacks vertically.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Task 2: §02 magazine-stack hero with rings, brochures, split headline, parallax"
```

---

## Task 3: Brand promise §03 (orbital split)

**Files:** `index.html` (fill `.hp-orbital`), `homepage.css` (append), `homepage.js` (append).

- [ ] **Step 1: Replace orbital section shell**

```html
<section class="hp-orbital" data-section="orbital" aria-labelledby="hp-orbital-h2">
  <div class="hp-orbital__inner">
    <div class="hp-orbital__copy">
      <span class="hp-eyebrow">Why travellers trust us</span>
      <h2 id="hp-orbital-h2" class="hp-orbital__h2" data-split-words>
        Together with your Private Tour Designer, we listen, advise, and piece together the perfect private experience — so every moment of your trip becomes <em>real.</em>
      </h2>
      <div class="hp-orbital__links">
        <a href="#" class="hp-link">Meet our designers →</a>
        <a href="#" class="hp-link">See how it works →</a>
      </div>
    </div>

    <div class="hp-orbital__visual" aria-hidden="true">
      <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1400&fm=webp&q=85" alt="" />
      <svg class="hp-orbital__ring" viewBox="0 0 360 360" preserveAspectRatio="xMidYMid meet">
        <circle cx="180" cy="180" r="140" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" data-orbital-ring />
      </svg>
      <div class="hp-orbital__labels">
        <span class="hp-orbital__label hp-orbital__label--n">Dreaming the trip</span>
        <span class="hp-orbital__label hp-orbital__label--e">Designing the route</span>
        <span class="hp-orbital__label hp-orbital__label--s">Living the moments</span>
        <span class="hp-orbital__label hp-orbital__label--w">Remembering forever</span>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append orbital CSS**

```css
/* ============================================================
   §03 ORBITAL SPLIT
   ============================================================ */
.hp-orbital { background: var(--mpt-off); padding: 120px 0; }
.hp-orbital__inner { max-width: var(--container-max); margin: 0 auto; padding: 0 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.hp-orbital__copy { max-width: 520px; }
.hp-orbital__h2 { font-family: var(--font-sans); font-weight: 900; font-size: clamp(28px, 3vw, 40px); line-height: 1.15; letter-spacing: -.02em; margin: 18px 0 26px; }
.hp-orbital__h2 em { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--mpt-orange); }
.hp-orbital__links { display: flex; gap: 22px; flex-wrap: wrap; }
.hp-link { font-weight: 800; font-size: 13px; letter-spacing: .04em; text-transform: uppercase; color: var(--mpt-ink); border-bottom: 1.5px solid var(--mpt-orange); padding-bottom: 4px; transition: color .15s; }
.hp-link:hover { color: var(--mpt-orange); }

.hp-orbital__visual { position: relative; aspect-ratio: 1.1/1; border-radius: var(--r-lg); overflow: hidden; }
.hp-orbital__visual img { width: 100%; height: 100%; object-fit: cover; display: block; filter: brightness(.88) contrast(1.05) saturate(1.05); }
.hp-orbital__ring { position: absolute; inset: 0; width: 100%; height: 100%; transform: rotate(-90deg); }
.hp-orbital__labels { position: absolute; inset: 0; pointer-events: none; }
.hp-orbital__label { position: absolute; font-size: 11px; font-weight: 800; letter-spacing: .3em; text-transform: uppercase; color: #fff; white-space: nowrap; opacity: 0; transform: translate(0, 6px); }
.hp-orbital__label--n { top: 10%; left: 50%; transform: translateX(-50%) translateY(6px); }
.hp-orbital__label--e { right: 4%; top: 50%; transform: translateY(-50%) translateX(6px); }
.hp-orbital__label--s { bottom: 10%; left: 50%; transform: translateX(-50%) translateY(-6px); }
.hp-orbital__label--w { left: 4%; top: 50%; transform: translateY(-50%) translateX(-6px); }

@media (max-width: 900px) {
  .hp-orbital__inner { grid-template-columns: 1fr; gap: 40px; }
  .hp-orbital__visual { aspect-ratio: 4/3; }
  .hp-orbital__label { font-size: 10px; letter-spacing: .2em; }
}
```

- [ ] **Step 3: Append orbital JS**

```js
// ── Orbital: ring stroke-draws, labels fade in around circle ──
(function initOrbital() {
  const section = document.querySelector('.hp-orbital');
  if (!section) return;

  const ring = section.querySelector('[data-orbital-ring]');
  const labels = section.querySelectorAll('.hp-orbital__label');
  const h2 = section.querySelector('[data-split-words]');

  if (h2) MPT.splitAndAnimate(h2, { split: 'words', stagger: .05, duration: .5, from: { y: 16 }, start: 'top 85%' });

  if (MPT.isReducedMotion()) {
    if (ring) ring.setAttribute('stroke-dashoffset', '0');
    labels.forEach(l => { l.style.opacity = 1; });
    return;
  }

  const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 70%', once: true } });
  if (ring) tl.to(ring, { strokeDashoffset: 0, duration: .9, ease: 'power2.out' });
  labels.forEach((l, i) => {
    tl.to(l, { opacity: 1, x: 0, y: 0, duration: .4, ease: 'power2.out' }, `>${i === 0 ? '-0.5' : '-0.25'}`);
  });
})();
```

- [ ] **Step 4: Verify**

Reload. Expected:

1. Left: eyebrow + large headline with italic "real." emphasis + two links.
2. Right: cinematic cloud/wing photograph with a thin white circle drawn on top.
3. On scroll-in: ring stroke draws from 0 to full over ~900ms.
4. Four white labels (12/3/6/9 o'clock positions) fade in staggered after the ring starts drawing.
5. Mobile (600px): stacks into single column; ring still draws; labels still appear.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Task 3: §03 orbital split with SVG ring draw and four benefit labels"
```

---

## Task 4: Our Cities §04 + §05 (title + region tabs + peek carousel)

**Files:** `index.html` (fill `.hp-cities`), `homepage.css`, `homepage.js`.

- [ ] **Step 1: Replace cities section shell**

```html
<section class="hp-cities" data-section="cities" aria-labelledby="hp-cities-h2">
  <div class="hp-cities__intro">
    <p class="hp-eyebrow hp-eyebrow--centered">Our destinations</p>
    <h2 id="hp-cities-h2" class="hp-cities__h2">OUR CITIES</h2>
    <p class="hp-cities__sub">Eight iconic destinations, each led by local experts.</p>
    <div class="hp-cities__tabs" role="tablist" data-city-tabs></div>
  </div>

  <div class="hp-cities__carousel" data-city-carousel>
    <button class="hp-cities__arrow hp-cities__arrow--prev" data-city-nav="-1" aria-label="Previous city">←</button>
    <div class="hp-cities__track" data-city-track></div>
    <button class="hp-cities__arrow hp-cities__arrow--next" data-city-nav="1" aria-label="Next city">→</button>
  </div>
</section>
```

- [ ] **Step 2: Append CSS**

```css
/* ============================================================
   §04 + §05 CITIES (title + tabs + peek carousel)
   ============================================================ */
.hp-cities { background: var(--mpt-off); padding: 100px 0 80px; }
.hp-cities__intro { max-width: var(--container-wide); margin: 0 auto 50px; padding: 0 40px; text-align: center; }
.hp-cities__h2 { font-family: var(--font-sans); font-weight: 900; font-size: clamp(40px, 6vw, 56px); line-height: 1; letter-spacing: .02em; margin: 14px 0 12px; color: var(--mpt-orange); }
.hp-cities__sub { font-size: 15px; opacity: .7; margin-bottom: 32px; }
.hp-cities__tabs { display: inline-flex; flex-wrap: wrap; justify-content: center; gap: 4px 32px; border-bottom: 1px solid rgba(37,37,37,.1); padding: 0 10px; }
.hp-cities__tab { display: inline-flex; gap: 6px; padding: 14px 0; font-size: 14px; font-weight: 800; color: var(--mpt-ink); opacity: .55; position: relative; transition: opacity .15s; cursor: pointer; background: transparent; border: 0; }
.hp-cities__tab .count { font-size: 11px; font-weight: 700; opacity: .6; }
.hp-cities__tab:hover { opacity: .8; }
.hp-cities__tab.is-active { opacity: 1; }
.hp-cities__tab.is-active::after { content: ""; position: absolute; bottom: -1px; left: 0; right: 0; height: 1.5px; background: var(--mpt-orange); }

.hp-cities__carousel { position: relative; max-width: var(--container-max); margin: 0 auto; padding: 0 40px; }
.hp-cities__arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 3; width: 48px; height: 48px; border-radius: 50%; background: var(--mpt-off); color: var(--mpt-ink); border: 1px solid rgba(37,37,37,.12); font-size: 20px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform .18s; }
.hp-cities__arrow:hover { transform: translateY(-50%) scale(1.08); background: var(--mpt-orange); color: #fff; border-color: var(--mpt-orange); }
.hp-cities__arrow--prev { left: 10px; }
.hp-cities__arrow--next { right: 10px; }

.hp-cities__track { display: flex; gap: 24px; overflow: hidden; padding: 20px 0; scroll-snap-type: x mandatory; position: relative; }

.hp-city-card { flex: 0 0 820px; height: 480px; border-radius: var(--r-lg); overflow: hidden; position: relative; scroll-snap-align: center; transition: transform .5s cubic-bezier(.4,0,.2,1), opacity .5s, filter .5s; background: #333 center/cover no-repeat; }
.hp-city-card:not(.is-active) { transform: scale(.82); opacity: .55; filter: saturate(.7); }
.hp-city-card.is-active { transform: scale(1); opacity: 1; }
.hp-city-card::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,.6) 100%); }
.hp-city-card__chip { position: absolute; top: 20px; right: 20px; background: var(--mpt-orange); color: #fff; padding: 6px 14px; border-radius: var(--r-pill); font-size: 11px; letter-spacing: .15em; text-transform: uppercase; font-weight: 800; z-index: 2; }
.hp-city-card__caption { position: absolute; bottom: 30px; left: 30px; right: 30px; color: #fff; z-index: 2; }
.hp-city-card__chapter { font-family: var(--font-serif); font-style: italic; font-weight: 400; font-size: 14px; color: var(--mpt-sand); margin-bottom: 8px; letter-spacing: .02em; }
.hp-city-card__title { font-family: var(--font-sans); font-weight: 900; font-size: clamp(24px, 2.5vw, 32px); line-height: 1.1; letter-spacing: -.02em; text-transform: uppercase; }
.hp-city-card__tagline { font-family: var(--font-serif); font-style: italic; font-weight: 400; font-size: 18px; margin-top: 8px; opacity: .92; text-transform: none; }

@media (max-width: 900px) {
  .hp-city-card { flex-basis: calc(100vw - 80px); height: 380px; }
  .hp-cities__arrow { width: 40px; height: 40px; }
  .hp-cities__tabs { gap: 2px 20px; }
}
```

- [ ] **Step 3: Append JS**

```js
// ── Cities: tabs + peek carousel, auto-advance, arrows, sync ──
(async function initCities() {
  const track   = document.querySelector('[data-city-track]');
  const tabsEl  = document.querySelector('[data-city-tabs]');
  if (!track || !tabsEl) return;

  const res = await fetch('assets/data/cities.json');
  const cities = await res.json();

  // Render tabs
  tabsEl.innerHTML = cities.map((c, i) =>
    `<button type="button" class="hp-cities__tab ${i === 0 ? 'is-active' : ''}" role="tab" data-city-tab="${i}">${c.name} <span class="count">(${c.tourCount})</span></button>`
  ).join('');

  // Render cards
  track.innerHTML = cities.map((c, i) => {
    const chapter = String(i + 1).padStart(2, '0');
    return `
      <article class="hp-city-card ${i === 0 ? 'is-active' : ''}" data-city-card="${i}" style="background-image:url('${c.image}')">
        <span class="hp-city-card__chip">Private tours</span>
        <div class="hp-city-card__caption">
          <div class="hp-city-card__chapter">No. ${chapter}</div>
          <div class="hp-city-card__title">${c.name.toUpperCase()} — ${c.country.toUpperCase()}</div>
          <div class="hp-city-card__tagline">${c.tagline}</div>
        </div>
      </article>`;
  }).join('');

  let active = 0;
  let autoTimer = null;

  function setActive(i) {
    active = (i + cities.length) % cities.length;
    track.querySelectorAll('.hp-city-card').forEach((c, idx) => c.classList.toggle('is-active', idx === active));
    tabsEl.querySelectorAll('.hp-cities__tab').forEach((t, idx) => t.classList.toggle('is-active', idx === active));
    const card = track.querySelector(`[data-city-card="${active}"]`);
    if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => setActive(active + 1), 7000);
  }
  function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }

  tabsEl.addEventListener('click', e => {
    const t = e.target.closest('[data-city-tab]');
    if (!t) return;
    setActive(parseInt(t.dataset.cityTab, 10));
    stopAuto(); startAuto();
  });

  document.querySelectorAll('[data-city-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      setActive(active + parseInt(btn.dataset.cityNav, 10));
      stopAuto(); startAuto();
    });
  });

  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

  startAuto();
})();
```

- [ ] **Step 4: Verify**

1. Orange centered "OUR CITIES" title.
2. Tab row with all 8 city names + tour count badges. First tab (Paris) underlined orange.
3. Large centered city card (~820×480), neighbors (Rome right, New York left for Paris) peek in scaled-down and dimmed.
4. Click `Rome` tab → carousel slides smoothly, Rome becomes active.
5. Arrows advance one city at a time.
6. Leave untouched 7s → auto-advance.
7. Mouse over carousel → auto-advance pauses.
8. Mobile: single card visible, tabs wrap.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Task 4: §04+§05 OUR CITIES title, region tabs, peek carousel with 8 cities"
```

---

## Task 5: Why MyPrivateTours §06 (value grid)

**Files:** `index.html`, `homepage.css`.

- [ ] **Step 1: Replace why section shell**

```html
<section class="hp-why" data-section="why" aria-labelledby="hp-why-h2">
  <div class="hp-why__intro">
    <p class="hp-eyebrow hp-eyebrow--centered">The promise</p>
    <h2 id="hp-why-h2" class="hp-why__h2">Why travellers <em>choose us.</em></h2>
  </div>
  <div class="hp-why__grid">
    <article class="hp-why__card">
      <span class="hp-why__icon" aria-hidden="true"></span>
      <h3>Expert local guides.</h3>
      <p>City specialists who live and teach where they guide. Vetted for five-plus years of experience.</p>
    </article>
    <article class="hp-why__card">
      <span class="hp-why__icon" aria-hidden="true"></span>
      <h3>100% private groups.</h3>
      <p>Only you and your party. Your pace, your questions, your conversations — never a crowded bus.</p>
    </article>
    <article class="hp-why__card">
      <span class="hp-why__icon" aria-hidden="true"></span>
      <h3>Flexible booking.</h3>
      <p>Free cancellation up to 48 hours before departure. Reschedule at no cost, any time.</p>
    </article>
    <article class="hp-why__card">
      <span class="hp-why__icon" aria-hidden="true"></span>
      <h3>Fully curated.</h3>
      <p>Skip-the-line. After-hours access. End-to-end trip design with a dedicated designer.</p>
    </article>
  </div>
</section>
```

- [ ] **Step 2: Append CSS**

```css
/* ============================================================
   §06 WHY
   ============================================================ */
.hp-why { background: var(--mpt-beige); padding: 110px 0; }
.hp-why__intro { max-width: var(--container-wide); margin: 0 auto 50px; padding: 0 40px; text-align: center; }
.hp-why__h2 { font-family: var(--font-sans); font-weight: 900; font-size: clamp(32px, 4.2vw, 44px); letter-spacing: -.03em; line-height: 1.05; margin-top: 14px; }
.hp-why__h2 em { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--mpt-orange); }

.hp-why__grid { max-width: var(--container-wide); margin: 0 auto; padding: 0 40px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.hp-why__card { background: var(--mpt-off); border-radius: var(--r-lg); padding: 28px; border: 1px solid rgba(37,37,37,.06); transition: transform .26s var(--ease-out), box-shadow .26s var(--ease-out); }
.hp-why__card:hover { transform: translateY(-6px); box-shadow: 0 24px 50px rgba(37,37,37,.1); }
.hp-why__icon { display: block; width: 40px; height: 40px; border: 1.5px solid var(--mpt-orange); border-radius: 50%; margin-bottom: 18px; position: relative; background: var(--mpt-orange-soft); }
.hp-why__icon::after { content: ""; position: absolute; inset: 12px; background: var(--mpt-orange); border-radius: 50%; }
.hp-why__card h3 { font-weight: 800; font-size: 20px; letter-spacing: -.01em; margin-bottom: 8px; }
.hp-why__card p { font-size: 14px; line-height: 1.55; opacity: .72; }

@media (max-width: 900px) { .hp-why__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .hp-why__grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Verify**

1. Beige canvas.
2. Four cards in a row (desktop), 2×2 tablet, stacked mobile.
3. Hover → lift + soft shadow.
4. Small orbital icon in orange tile at top of each card.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Task 5: §06 Why grid with 4 value-prop cards on beige canvas"
```

---

## Task 6: Featured tours §07 (6-tour grid)

**Files:** `index.html`, `homepage.css`, `homepage.js`.

- [ ] **Step 1: Replace tours section shell**

```html
<section class="hp-tours" data-section="tours" aria-labelledby="hp-tours-h2" id="tours">
  <div class="hp-tours__intro">
    <p class="hp-eyebrow hp-eyebrow--centered">Signature tours</p>
    <h2 id="hp-tours-h2" class="hp-tours__h2">Private tours, <em>built for you.</em></h2>
  </div>
  <div class="hp-tours__grid" data-tours-grid></div>
  <div class="hp-tours__cta"><a href="#" class="hp-link">Browse all 68 tours →</a></div>
</section>
```

- [ ] **Step 2: Append CSS**

```css
/* ============================================================
   §07 TOURS
   ============================================================ */
.hp-tours { background: var(--mpt-off); padding: 110px 0; }
.hp-tours__intro { max-width: var(--container-wide); margin: 0 auto 44px; padding: 0 40px; text-align: center; }
.hp-tours__h2 { font-family: var(--font-sans); font-weight: 900; font-size: clamp(32px, 4.2vw, 44px); letter-spacing: -.03em; line-height: 1.05; margin-top: 14px; }
.hp-tours__h2 em { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--mpt-orange); }

.hp-tours__grid { max-width: var(--container-wide); margin: 0 auto; padding: 0 40px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.hp-tour-card { background: var(--mpt-off); border-radius: var(--r-lg); overflow: hidden; position: relative; transition: transform .26s var(--ease-out), box-shadow .26s var(--ease-out); }
.hp-tour-card:hover { transform: translateY(-6px); box-shadow: 0 22px 50px rgba(37,37,37,.12); }
.hp-tour-card__img { position: relative; aspect-ratio: 4/3; overflow: hidden; border-radius: var(--r-md); }
.hp-tour-card__img img { width: 100%; height: 100%; object-fit: cover; transition: transform .36s var(--ease-out); }
.hp-tour-card:hover .hp-tour-card__img img { transform: scale(1.04); }
.hp-tour-card__chip { position: absolute; top: 14px; left: 14px; background: var(--mpt-orange); color: #fff; padding: 5px 12px; border-radius: var(--r-pill); font-size: 10.5px; letter-spacing: .12em; text-transform: uppercase; font-weight: 800; z-index: 2; }
.hp-tour-card__body { padding: 18px 6px 6px; }
.hp-tour-card h3 { font-weight: 800; font-size: 17px; line-height: 1.3; letter-spacing: -.01em; margin-bottom: 6px; }
.hp-tour-card__meta { display: flex; gap: 14px; align-items: center; font-size: 12px; font-weight: 700; opacity: .7; margin-bottom: 8px; }
.hp-tour-card__meta .star { color: var(--mpt-orange); }
.hp-tour-card__price { font-size: 13px; font-weight: 800; }
.hp-tour-card__price small { font-weight: 600; opacity: .6; margin-left: 4px; font-size: 11px; }
.hp-tour-card__link { display: inline-block; margin-top: 10px; font-size: 12px; font-weight: 800; color: var(--mpt-orange); letter-spacing: .05em; text-transform: uppercase; opacity: 0; transition: opacity .2s; }
.hp-tour-card:hover .hp-tour-card__link { opacity: 1; }

.hp-tours__cta { text-align: center; margin-top: 44px; }

@media (max-width: 900px) { .hp-tours__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .hp-tours__grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Append JS**

```js
// ── Tours: render from tours.json ──
(async function initTours() {
  const grid = document.querySelector('[data-tours-grid]');
  if (!grid) return;

  const res = await fetch('assets/data/tours.json');
  const tours = await res.json();
  const six = tours.slice(0, 6);

  const cur = (code) => ({ EUR: '€', GBP: '£', USD: '$' }[code] ?? code);

  grid.innerHTML = six.map(t => `
    <a href="#" class="hp-tour-card">
      <div class="hp-tour-card__img">
        <span class="hp-tour-card__chip">${t.city}</span>
        <img src="${t.image}" alt="${t.name} — ${t.city}" loading="lazy" />
      </div>
      <div class="hp-tour-card__body">
        <h3>${t.name}</h3>
        <div class="hp-tour-card__meta">
          <span>${t.duration}</span>
          <span><span class="star">★</span> ${t.rating} (${t.reviews})</span>
        </div>
        <div class="hp-tour-card__price">from ${cur(t.currency)}${t.priceFrom}<small>per private group, up to 8</small></div>
        <span class="hp-tour-card__link">View tour →</span>
      </div>
    </a>
  `).join('');
})();
```

- [ ] **Step 4: Verify**

1. 3×2 grid of 6 tours.
2. Each card: image with city chip top-left, title, duration + rating row, price line, hover shows "View tour →" and zooms the image 1.04.
3. Mobile: 1 column.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Task 6: §07 Featured tours grid with 6 tours, hover zoom, chip + price + rating"
```

---

## Task 7: Testimonials §08 (peek carousel)

**Files:** `index.html`, `homepage.css`, `homepage.js`.

- [ ] **Step 1: Replace testimonials shell**

```html
<section class="hp-testimonials" data-section="testimonials" aria-labelledby="hp-test-h2">
  <h2 id="hp-test-h2" class="sr-only">Traveller testimonials</h2>
  <div class="hp-testimonials__intro">
    <p class="hp-eyebrow hp-eyebrow--centered">What travellers say</p>
    <h2 aria-hidden="true" class="hp-testimonials__title">Five-star moments.</h2>
  </div>
  <div class="hp-testimonials__track" data-reviews-track></div>
  <div class="hp-testimonials__dots" data-reviews-dots></div>
</section>
```

- [ ] **Step 2: Append CSS**

```css
/* ============================================================
   §08 TESTIMONIALS
   ============================================================ */
.hp-testimonials { background: var(--mpt-cream); padding: 100px 0; }
.hp-testimonials__intro { max-width: var(--container-wide); margin: 0 auto 36px; padding: 0 40px; text-align: center; }
.hp-testimonials__title { font-family: var(--font-sans); font-weight: 900; font-size: clamp(32px, 4.2vw, 44px); letter-spacing: -.03em; margin-top: 12px; }

.hp-testimonials__track { display: flex; gap: 24px; padding: 20px 40px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
.hp-testimonials__track::-webkit-scrollbar { display: none; }

.hp-review { flex: 0 0 420px; background: var(--mpt-off); border-radius: var(--r-lg); padding: 32px; scroll-snap-align: center; box-shadow: 0 12px 32px rgba(37,37,37,.06); }
.hp-review__stars { color: var(--mpt-orange); font-size: 14px; letter-spacing: .08em; margin-bottom: 14px; }
.hp-review__quote { font-family: var(--font-serif); font-style: italic; font-weight: 400; font-size: 18px; line-height: 1.45; letter-spacing: -.01em; margin-bottom: 18px; color: var(--mpt-ink); }
.hp-review__rule { width: 24px; height: 2px; background: var(--mpt-orange); margin-bottom: 10px; }
.hp-review__meta { font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; opacity: .65; }

.hp-testimonials__dots { display: flex; justify-content: center; gap: 8px; margin-top: 24px; }
.hp-testimonials__dots button { width: 8px; height: 8px; border-radius: 50%; background: rgba(37,37,37,.25); transition: background .2s, transform .2s; cursor: pointer; }
.hp-testimonials__dots button.is-active { background: var(--mpt-orange); transform: scale(1.25); }

@media (max-width: 560px) { .hp-review { flex-basis: calc(100vw - 80px); } }
```

- [ ] **Step 3: Append JS**

```js
// ── Testimonials: render from testimonials.json, auto-advance 8s ──
(async function initTestimonials() {
  const track = document.querySelector('[data-reviews-track]');
  const dotsEl = document.querySelector('[data-reviews-dots]');
  if (!track) return;

  const res = await fetch('assets/data/testimonials.json');
  const reviews = await res.json();

  const monthYear = 'April 2026';

  track.innerHTML = reviews.map(r => `
    <article class="hp-review">
      <div class="hp-review__stars">${'★'.repeat(r.rating)}</div>
      <p class="hp-review__quote">"${r.quote}"</p>
      <div class="hp-review__rule"></div>
      <div class="hp-review__meta">${r.name} · ${r.city} · ${monthYear}</div>
    </article>
  `).join('');

  if (dotsEl) {
    dotsEl.innerHTML = reviews.map((_, i) => `<button type="button" data-dot="${i}" class="${i === 0 ? 'is-active' : ''}" aria-label="Review ${i + 1}"></button>`).join('');
  }

  let idx = 0;
  function scrollToIdx(i) {
    idx = (i + reviews.length) % reviews.length;
    const card = track.children[idx];
    if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    dotsEl?.querySelectorAll('button').forEach((b, j) => b.classList.toggle('is-active', j === idx));
  }

  dotsEl?.addEventListener('click', e => {
    const b = e.target.closest('[data-dot]');
    if (b) { scrollToIdx(parseInt(b.dataset.dot, 10)); stopAuto(); startAuto(); }
  });

  let auto;
  function startAuto() { stopAuto(); auto = setInterval(() => scrollToIdx(idx + 1), 8000); }
  function stopAuto() { if (auto) { clearInterval(auto); auto = null; } }
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);
  startAuto();
})();
```

- [ ] **Step 4: Verify**

1. Cream canvas.
2. 5 reviews visible as scroll-snap cards; on desktop ~2-3 visible at once with the middle one feeling "active".
3. Dots below; click a dot → jumps to that review.
4. Auto-advance every 8s.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Task 7: §08 Testimonials peek carousel with dot nav and auto-advance"
```

---

## Task 8: Trust §09 (counter strip)

**Files:** `index.html`, `homepage.css`, `homepage.js`.

- [ ] **Step 1: Replace trust section shell**

```html
<section class="hp-trust" data-section="trust" aria-label="By the numbers">
  <p class="hp-eyebrow hp-eyebrow--centered">By the numbers</p>
  <ul class="hp-trust__strip">
    <li><strong data-counter="500000">0</strong><span>Travellers guided</span></li>
    <li><strong>4.9<em>★</em></strong><span>Average rating</span></li>
    <li><strong data-counter="8">0</strong><span>Iconic cities</span></li>
    <li><strong>24/7</strong><span>Concierge</span></li>
    <li><strong>48h</strong><span>Free cancellation</span></li>
  </ul>
</section>
```

- [ ] **Step 2: Append CSS**

```css
/* ============================================================
   §09 TRUST
   ============================================================ */
.hp-trust { background: var(--mpt-off); padding: 80px 0; text-align: center; }
.hp-trust__strip { max-width: var(--container-wide); margin: 24px auto 0; padding: 0 40px; display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; align-items: center; }
.hp-trust__strip li { padding: 20px; border-right: 1px solid rgba(37,37,37,.1); display: flex; flex-direction: column; gap: 6px; align-items: center; }
.hp-trust__strip li:last-child { border-right: 0; }
.hp-trust__strip strong { font-weight: 900; font-size: clamp(32px, 4vw, 48px); letter-spacing: -.02em; line-height: 1; font-variant-numeric: tabular-nums; }
.hp-trust__strip strong em { color: var(--mpt-orange); font-style: normal; font-size: .6em; }
.hp-trust__strip span { font-size: 11px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; opacity: .55; }

@media (max-width: 760px) {
  .hp-trust__strip { grid-template-columns: repeat(2, 1fr); gap: 0; }
  .hp-trust__strip li { border-right: 0; border-bottom: 1px solid rgba(37,37,37,.08); }
  .hp-trust__strip li:last-child { grid-column: 1 / -1; border: 0; }
}
```

- [ ] **Step 3: Append JS**

```js
// ── Trust: animate counters on scroll-in ──
(function initTrust() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.dataset.counter, 10);
    const suffix = target === 500000 ? '+' : '';
    if (MPT.isReducedMotion()) {
      el.textContent = target.toLocaleString() + suffix;
      return;
    }
    const obj = { n: 0 };
    gsap.to(obj, {
      n: target,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => { el.textContent = Math.round(obj.n).toLocaleString() + suffix; },
    });
  });
})();
```

- [ ] **Step 4: Verify**

1. 5-item strip with big numbers.
2. Scroll into view → 500,000 and 8 count up from 0 over 1.6s.
3. Mobile collapses to 2-col with last cell full width.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Task 8: §09 Trust strip with animated counters"
```

---

## Task 9: Inspire §10 (dark Ken Burns)

**Files:** `index.html`, `homepage.css`.

- [ ] **Step 1: Replace inspire shell**

```html
<section class="hp-inspire" data-section="inspire" aria-labelledby="hp-inspire-h2">
  <div class="hp-inspire__bg" aria-hidden="true">
    <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&fm=webp&q=85" alt="" />
  </div>
  <div class="hp-inspire__overlay" aria-hidden="true"></div>
  <div class="hp-inspire__content">
    <span class="hp-inspire__mark" aria-hidden="true"></span>
    <p class="hp-eyebrow hp-eyebrow--centered hp-inspire__eyebrow">The inspiration tool</p>
    <h2 id="hp-inspire-h2" class="hp-inspire__h2">Let yourself be <em>inspired.</em></h2>
    <p class="hp-inspire__body">Answer a few questions about what you want from your trip. Our tool maps the perfect private tours to your pace, interests, and travel style — in under a minute.</p>
    <a href="#" class="hp-btn hp-btn--primary hp-btn--glow">Start planning →</a>
  </div>
</section>
```

- [ ] **Step 2: Append CSS**

```css
/* ============================================================
   §10 INSPIRE — dark Ken Burns
   ============================================================ */
.hp-inspire { position: relative; min-height: 520px; overflow: hidden; color: #fff; display: flex; align-items: center; justify-content: center; }
.hp-inspire__bg { position: absolute; inset: 0; }
.hp-inspire__bg img { width: 100%; height: 100%; object-fit: cover; animation: kenBurns 20s ease-in-out infinite alternate; }
@keyframes kenBurns { from { transform: scale(1) translateX(0); } to { transform: scale(1.05) translateX(-2%); } }
.hp-inspire__overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(15,9,7,.55) 0%, rgba(15,9,7,.72) 100%); }
.hp-inspire__content { position: relative; z-index: 2; text-align: center; padding: 80px 40px; max-width: 680px; }
.hp-inspire__mark { display: block; width: 52px; height: 52px; margin: 0 auto 16px; border: 1.5px solid rgba(255,255,255,.7); border-radius: 50%; position: relative; }
.hp-inspire__mark::after { content: ""; position: absolute; inset: 18px; background: rgba(255,255,255,.85); border-radius: 50%; }
.hp-inspire__eyebrow { color: var(--mpt-sand); opacity: .9; }
.hp-inspire__eyebrow::before { background: var(--mpt-sand); }
.hp-inspire__h2 { font-family: var(--font-serif); font-style: italic; font-weight: 400; font-size: clamp(38px, 5vw, 56px); letter-spacing: -.02em; line-height: 1.05; margin: 12px 0 18px; color: #fff; }
.hp-inspire__h2 em { color: var(--mpt-sand); }
.hp-inspire__body { font-size: 16px; line-height: 1.55; opacity: .88; max-width: 520px; margin: 0 auto 26px; }
.hp-btn--glow { animation: ctaGlow 3s ease-in-out infinite; }
@keyframes ctaGlow { 0%,100% { box-shadow: 0 14px 36px rgba(224,101,60,.3); } 50% { box-shadow: 0 14px 36px rgba(224,101,60,.3), 0 0 40px rgba(224,101,60,.25); } }

@media (prefers-reduced-motion: reduce) {
  .hp-inspire__bg img, .hp-btn--glow { animation: none; }
}
```

- [ ] **Step 3: Verify**

1. Full-width dark section with warm cinematic photo (journal/maps).
2. Gentle Ken Burns zoom running in the background (1.0 → 1.05 over 20s, looping).
3. Centered content with small white logomark, sand-color eyebrow, italic-serif "Let yourself be *inspired*" headline, orange CTA that softly glows.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Task 9: §10 Inspire section — dark Ken Burns + italic serif headline + glow CTA"
```

---

## Task 10: Journal §11 (blog grid)

**Files:** `index.html`, `homepage.css`, `homepage.js`.

- [ ] **Step 1: Replace journal shell**

```html
<section class="hp-journal" data-section="journal" aria-labelledby="hp-journal-h2">
  <div class="hp-journal__intro">
    <p class="hp-eyebrow hp-eyebrow--centered">From the Journal</p>
    <h2 id="hp-journal-h2" class="hp-journal__h2">Stories <em>before departure.</em></h2>
  </div>
  <div class="hp-journal__grid" data-journal-grid></div>
  <div class="hp-journal__cta"><a href="../my private tours/blog.html" class="hp-link">Read all stories →</a></div>
</section>
```

- [ ] **Step 2: Append CSS**

```css
/* ============================================================
   §11 JOURNAL
   ============================================================ */
.hp-journal { background: var(--mpt-off); padding: 110px 0; }
.hp-journal__intro { max-width: var(--container-wide); margin: 0 auto 44px; padding: 0 40px; text-align: center; }
.hp-journal__h2 { font-family: var(--font-sans); font-weight: 900; font-size: clamp(32px, 4.2vw, 44px); letter-spacing: -.03em; line-height: 1.05; margin-top: 14px; }
.hp-journal__h2 em { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--mpt-orange); }

.hp-journal__grid { max-width: var(--container-wide); margin: 0 auto; padding: 0 40px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.hp-journal-card { display: block; transition: transform .2s var(--ease-out); }
.hp-journal-card:hover { transform: translateY(-4px); }
.hp-journal-card__img { aspect-ratio: 16/9; border-radius: var(--r-md); overflow: hidden; margin-bottom: 14px; }
.hp-journal-card__img img { width: 100%; height: 100%; object-fit: cover; transition: transform .36s var(--ease-out); }
.hp-journal-card:hover .hp-journal-card__img img { transform: scale(1.04); }
.hp-journal-card__tag { display: inline-block; font-size: 10px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: var(--mpt-orange); background: var(--mpt-orange-soft); padding: 4px 10px; border-radius: var(--r-pill); margin-bottom: 10px; }
.hp-journal-card h3 { font-family: var(--font-serif); font-style: italic; font-weight: 400; font-size: 22px; line-height: 1.3; letter-spacing: -.01em; margin-bottom: 6px; transition: color .2s; }
.hp-journal-card:hover h3 { color: var(--mpt-orange); }
.hp-journal-card__meta { font-size: 11px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; opacity: .55; }

.hp-journal__cta { text-align: center; margin-top: 44px; }

@media (max-width: 900px) { .hp-journal__grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Append JS**

```js
// ── Journal: render from blog-posts.json ──
(async function initJournal() {
  const grid = document.querySelector('[data-journal-grid]');
  if (!grid) return;

  const res = await fetch('assets/data/blog-posts.json');
  const posts = await res.json();

  const fmt = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  grid.innerHTML = posts.map(p => `
    <a href="../my private tours/blog-article.html" class="hp-journal-card">
      <div class="hp-journal-card__img">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
      </div>
      <span class="hp-journal-card__tag">${p.tag}</span>
      <h3>${p.title}</h3>
      <div class="hp-journal-card__meta">${p.readTime} read · ${fmt(p.date)}</div>
    </a>
  `).join('');
})();
```

- [ ] **Step 4: Verify**

1. 3 blog cards in a row (desktop).
2. Each has 16:9 thumbnail, orange category tag pill, italic-serif title, small meta row.
3. Hover → image zooms 1.04, title shifts orange.
4. Mobile: single column.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Task 10: §11 Journal grid with 3 latest posts, italic-serif titles"
```

---

## Task 11: Dual row §12 (Newsletter + Partner)

**Files:** `index.html`, `homepage.css`.

- [ ] **Step 1: Replace dual shell**

```html
<section class="hp-dual" data-section="dual" aria-label="Newsletter and partners">
  <div class="hp-dual__grid">
    <div class="hp-dual__card hp-dual__card--news" style="background-image:url('https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=1400&fm=webp&q=85')">
      <div class="hp-dual__overlay"></div>
      <div class="hp-dual__body">
        <p class="hp-eyebrow" style="color:var(--mpt-sand)">Subscribe to our newsletter</p>
        <h3 class="hp-dual__h3">Quiet seasonal notes, direct to your inbox.</h3>
        <form class="hp-dual__form" action="#" method="post" data-newsletter>
          <input type="text" name="b_honeypot" tabindex="-1" autocomplete="off" class="sr-only" aria-hidden="true" />
          <input type="hidden" name="audience_id" value="PLACEHOLDER" />
          <input type="email" name="email" required placeholder="your@email.com" aria-label="Email address" />
          <button type="submit">Subscribe</button>
        </form>
        <p class="hp-dual__fineprint">We respect your inbox. One letter a month.</p>
      </div>
    </div>

    <a class="hp-dual__card hp-dual__card--partner" href="../my private tours/b2b.html" style="background-image:url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&fm=webp&q=85')">
      <div class="hp-dual__overlay"></div>
      <div class="hp-dual__body">
        <p class="hp-eyebrow" style="color:var(--mpt-sand)">Partner with MyPrivateTours</p>
        <h3 class="hp-dual__h3">Travel agents, hotels, concierge desks.</h3>
        <p class="hp-dual__lede">Exclusive rates, commission programs, white-label options.</p>
        <span class="hp-btn hp-btn--ghost-light">Contact our team →</span>
      </div>
    </a>
  </div>
</section>
```

- [ ] **Step 2: Append CSS**

```css
/* ============================================================
   §12 DUAL ROW
   ============================================================ */
.hp-dual { background: var(--mpt-beige); padding: 80px 0; }
.hp-dual__grid { max-width: var(--container-max); margin: 0 auto; padding: 0 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.hp-dual__card { position: relative; min-height: 420px; border-radius: var(--r-lg); overflow: hidden; background-size: cover; background-position: center; display: flex; align-items: flex-end; color: #fff; transition: transform .26s var(--ease-out); }
.hp-dual__card:hover { transform: translateY(-4px); }
.hp-dual__overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(15,9,7,.15) 0%, rgba(15,9,7,.75) 100%); }
.hp-dual__body { position: relative; z-index: 2; padding: 36px; width: 100%; }
.hp-dual__h3 { font-family: var(--font-sans); font-weight: 900; font-size: clamp(22px, 2.5vw, 30px); letter-spacing: -.02em; line-height: 1.15; margin: 12px 0 18px; color: #fff; }
.hp-dual__lede { font-size: 14px; line-height: 1.55; opacity: .88; margin-bottom: 18px; max-width: 420px; }
.hp-dual__form { display: flex; gap: 8px; background: rgba(255,255,255,.12); backdrop-filter: blur(10px); border-radius: var(--r-pill); padding: 6px 6px 6px 20px; max-width: 420px; border: 1px solid rgba(255,255,255,.22); }
.hp-dual__form input[type=email] { flex: 1; background: transparent; border: 0; color: #fff; font-size: 14px; font-family: inherit; outline: 0; }
.hp-dual__form input[type=email]::placeholder { color: rgba(255,255,255,.7); }
.hp-dual__form button { background: var(--mpt-orange); color: #fff; border-radius: var(--r-pill); padding: 10px 20px; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: .05em; cursor: pointer; }
.hp-dual__form button:hover { background: #CB5530; }
.hp-dual__fineprint { font-size: 11px; opacity: .6; margin-top: 10px; }
.hp-btn--ghost-light { border: 1.5px solid #fff; color: #fff; background: transparent; }
.hp-btn--ghost-light:hover { background: #fff; color: var(--mpt-ink); }

@media (max-width: 900px) { .hp-dual__grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Verify**

1. Beige canvas, two dark-overlaid cards side by side.
2. Left card: seasonal photo, eyebrow/heading in white, email input with Subscribe button, fineprint.
3. Right card: B2B photo, heading, lede, "Contact our team →" ghost button. Clickable as a link, navigates to ../my private tours/b2b.html.
4. Mobile: stacks.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Task 11: §12 Dual row — newsletter + partner cards"
```

---

## Task 12: Footer §13 (deep maroon)

**Files:** `index.html` (fill `.hp-footer`), `homepage.css`.

- [ ] **Step 1: Replace footer shell**

```html
<footer class="hp-footer" role="contentinfo" data-section="footer">
  <div class="hp-footer__top">
    <div class="hp-footer__wordmark-row">
      <span class="hp-logo__mark hp-footer__mark" aria-hidden="true"></span>
      <h2 class="hp-footer__wordmark">MyPrivate<em>Tours</em></h2>
    </div>
    <p class="hp-footer__tag">Private tours, expertly designed — across eight cities worldwide.</p>
  </div>

  <div class="hp-footer__grid">
    <div>
      <h4>Cities</h4>
      <ul>
        <li><a href="../my private tours/paris.html">Paris</a></li>
        <li><a href="#">Rome</a></li>
        <li><a href="#">London</a></li>
        <li><a href="#">Barcelona</a></li>
        <li><a href="#">Florence</a></li>
        <li><a href="#">Prague</a></li>
        <li><a href="#">Venice</a></li>
        <li><a href="#">New York</a></li>
      </ul>
    </div>
    <div>
      <h4>Company</h4>
      <ul>
        <li><a href="../my private tours/about.html">About</a></li>
        <li><a href="../my private tours/blog.html">Journal</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Press</a></li>
        <li><a href="../my private tours/contact.html">Contact</a></li>
      </ul>
    </div>
    <div>
      <h4>Partners</h4>
      <ul>
        <li><a href="#">Travel Agencies</a></li>
        <li><a href="#">Hotels &amp; Concierge</a></li>
        <li><a href="#">Corporate Groups</a></li>
        <li><a href="#">DMCs</a></li>
        <li><a href="#">Affiliate Program</a></li>
      </ul>
    </div>
    <div>
      <h4>Support</h4>
      <ul>
        <li><a href="../my private tours/faq.html">FAQ</a></li>
        <li><a href="#">Cancellation Policy</a></li>
        <li><a href="#">Safety</a></li>
        <li><a href="#">Accessibility</a></li>
      </ul>
    </div>
    <div>
      <h4>Legal</h4>
      <ul>
        <li><a href="../my private tours/terms.html">Terms</a></li>
        <li><a href="../my private tours/privacy.html">Privacy</a></li>
        <li><a href="#">Cookies</a></li>
        <li><a href="#">Ethical Travel</a></li>
      </ul>
    </div>
  </div>

  <div class="hp-footer__bottom">
    <div class="hp-footer__socials">
      <a href="#" aria-label="Instagram">IG</a>
      <a href="#" aria-label="Facebook">FB</a>
      <a href="#" aria-label="Pinterest">PI</a>
      <a href="#" aria-label="TikTok">TT</a>
      <a href="#" aria-label="LinkedIn">LI</a>
    </div>
    <div class="hp-footer__contact">
      <a href="mailto:hello@myprivatetours.com">hello@myprivatetours.com</a>
    </div>
    <div class="hp-footer__legal">
      <span>© MyPrivateTours 2026 · All rights reserved.</span>
      <em>Made privately, with care.</em>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Append CSS**

```css
/* ============================================================
   §13 FOOTER
   ============================================================ */
.hp-footer { background: var(--mpt-maroon); color: rgba(255,255,255,.85); padding: 80px 40px 40px; }
.hp-footer__top { max-width: var(--container-max); margin: 0 auto 56px; text-align: center; }
.hp-footer__wordmark-row { display: flex; align-items: center; justify-content: center; gap: 20px; }
.hp-footer__mark { border-color: var(--mpt-sand); }
.hp-footer__mark::after { background: var(--mpt-sand); }
.hp-footer__mark::before { border-color: rgba(237,210,133,.6); }
.hp-footer__wordmark { font-family: var(--font-sans); font-weight: 900; font-size: clamp(44px, 7vw, 84px); letter-spacing: -.04em; line-height: 1; color: #fff; }
.hp-footer__wordmark em { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--mpt-sand); }
.hp-footer__tag { font-size: 14px; opacity: .65; margin-top: 14px; letter-spacing: .02em; }

.hp-footer__grid { max-width: var(--container-max); margin: 0 auto 48px; display: grid; grid-template-columns: repeat(5, 1fr); gap: 30px; padding-top: 48px; border-top: 1px solid rgba(255,255,255,.12); }
.hp-footer__grid h4 { font-size: 11px; font-weight: 800; letter-spacing: .3em; text-transform: uppercase; color: var(--mpt-sand); margin-bottom: 16px; }
.hp-footer__grid ul { display: flex; flex-direction: column; gap: 8px; }
.hp-footer__grid a { font-size: 13px; font-weight: 500; color: rgba(255,255,255,.75); transition: color .15s; }
.hp-footer__grid a:hover { color: var(--mpt-sand); }

.hp-footer__bottom { max-width: var(--container-max); margin: 0 auto; padding-top: 32px; border-top: 1px solid rgba(255,255,255,.12); display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; font-size: 12px; opacity: .7; }
.hp-footer__socials { display: flex; gap: 10px; }
.hp-footer__socials a { width: 32px; height: 32px; border: 1px solid rgba(255,255,255,.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; letter-spacing: .05em; color: rgba(255,255,255,.8); }
.hp-footer__socials a:hover { border-color: var(--mpt-sand); color: var(--mpt-sand); }
.hp-footer__contact a { font-weight: 700; color: rgba(255,255,255,.85); }
.hp-footer__legal { display: flex; gap: 20px; align-items: center; }
.hp-footer__legal em { font-family: var(--font-serif); font-style: italic; color: var(--mpt-sand); opacity: .85; }

@media (max-width: 900px) { .hp-footer__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .hp-footer__grid { grid-template-columns: 1fr; } .hp-footer__bottom { flex-direction: column; text-align: center; } }
```

- [ ] **Step 3: Verify**

1. Deep warm-maroon footer.
2. Oversized `MyPrivateTours` wordmark centered (with orbital mark in sand).
3. Five-column link grid (Cities, Company, Partners, Support, Legal) with sand-colored uppercase headings.
4. Bottom bar: socials (IG/FB/PI/TT/LI circles), contact email, copyright + "Made privately, with care."
5. Mobile: grid collapses to 2 cols then 1 col.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Task 12: §13 Footer — deep maroon, oversized wordmark, 5-col link grid"
```

---

## Task 13: Polish pass — reduced motion, accessibility, README

**Files:** `assets/css/homepage.css` (append), `README.md` (rewrite).

- [ ] **Step 1: Append reduced-motion overrides to `homepage.css`**

Append at the very bottom of `homepage.css`:

```css
/* ============================================================
   REDUCED MOTION OVERRIDES
   ============================================================ */
@media (prefers-reduced-motion: reduce) {
  .hp-hero__ring, .hp-hero__mag { opacity: 1 !important; transform: none !important; }
  .hp-inspire__bg img { animation: none !important; transform: none !important; }
  .hp-btn--glow { animation: none !important; }
  .hp-city-card { transition: none !important; }
  .hp-orbital__ring circle { stroke-dashoffset: 0 !important; }
  .hp-orbital__label { opacity: 1 !important; transform: translate(0, 0) !important; }
}
```

- [ ] **Step 2: Rewrite `README.md`**

Replace `README.md` with:

```markdown
# MyPrivateTours.com — Homepage

Warm editorial homepage redesign (2026-04-21) — single direction, 13 sections, full wireframe sitemap.

## Local preview

From the homepage directory:

    python -m http.server 8080

Then open http://localhost:8080/

## Sections

1. Global nav (sticky) with 3 mega menus
2. Magazine-stack hero with docked search pill
3. Orbital brand-promise split
4. OUR CITIES title + region tabs
5. Featured city experience (peek carousel)
6. Why MyPrivateTours (4-card value grid)
7. Featured tours (6-tour grid)
8. Traveller testimonials (peek carousel)
9. Trust strip (animated counters)
10. Let yourself be inspired (dark Ken Burns)
11. From the Journal (3 latest articles)
12. Newsletter + Partner dual row
13. Footer (deep maroon, oversized wordmark)

## Handoff notes

- Stylesheets: `assets/css/tokens.css` + `assets/css/base.css` + `assets/css/homepage.css`.
- Motion/behavior: `assets/js/motion-core.js` + `assets/js/homepage.js`.
- Data: JSON in `assets/data/` — cities, tours, testimonials, blog posts.
- Imagery uses Unsplash direct CDN URLs in dev — self-host AVIF/WebP/JPEG during WordPress port.
- Hero search pill is visual-only — wire up to Bokun during port.
- Mailchimp newsletter form has hooks but no live endpoint — wire up during port.
- WhatsApp widget `wa.me/` href is a placeholder — set real number during port.
- See `docs/superpowers/specs/2026-04-21-homepage-redesign-design.md` for the design spec.
- See `docs/superpowers/plans/2026-04-21-homepage-redesign-plan.md` for the implementation plan.

## Reference

Design theme inspiration: [travel-sensations.com](https://www.travel-sensations.com/nl/). No content or assets were copied.
```

- [ ] **Step 3: Final verification walk-through**

Open the page and scroll top-to-bottom. Confirm:

1. Nav loads; all three mega menus open on hover/click; mobile hamburger works.
2. Hero rings + brochures animate in; headline splits; parallax on scroll.
3. Orbital ring draws; 4 labels fade in.
4. Cities tabs + carousel work; Paris is default; arrows and auto-advance work.
5. Why 4 cards hover-lift.
6. Tours 6 cards render from JSON; hover zoom + "View tour →" appears.
7. Testimonials 5 cards scroll-snap; dots work.
8. Trust numbers animate 0 → target on scroll-in.
9. Inspire Ken Burns running; CTA glows.
10. Journal 3 cards from JSON; hover zoom + title orange.
11. Dual row: newsletter form + partner ghost button both present.
12. Footer deep maroon with oversized wordmark.
13. WhatsApp float bottom-right.
14. Toggle OS-level reduced-motion → animations stop; content still fully readable.

Run browser devtools mobile emulator at 375px width — confirm every section remains readable and usable.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Task 13: reduced-motion overrides, README rewrite, final polish"
```

---

## Self-review notes

All 13 spec sections are covered by Tasks 1–12, with Task 0 doing cleanup and Task 13 doing polish. Spec sections map as follows:

- §01 nav → Task 1
- §02 hero → Task 2
- §03 orbital → Task 3
- §04 cities title/tabs + §05 carousel → Task 4
- §06 why → Task 5
- §07 tours → Task 6
- §08 testimonials → Task 7
- §09 trust → Task 8
- §10 inspire → Task 9
- §11 journal → Task 10
- §12 dual → Task 11
- §13 footer → Task 12
- Accessibility/reduced-motion/performance → Task 13 + inline via `prefers-reduced-motion` queries

Type/name consistency: `data-*` attributes and CSS class prefixes all use `hp-` and `data-*` names match between HTML and JS (e.g., `data-city-tabs` / `data-city-track` / `data-reviews-track` / `data-tours-grid` / `data-journal-grid`).

No placeholders. Every code block is complete.

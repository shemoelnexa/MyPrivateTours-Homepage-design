# MyPrivateTours.com — Homepage

Warm editorial homepage redesign (2026-04-21) — single direction, 13 sections, full wireframe sitemap.

## Local preview

The homepage links into the sibling wireframe project at `../my private tours/` (paris.html, about.html, b2b.html, blog.html, contact.html, etc.). Serve from the **parent folder** that contains both projects so those links resolve:

    cd "D:/Code Files"
    python -m http.server 8080

Then open http://localhost:8080/my%20private%20tours%20homepage/ in your browser.

If you serve from the homepage directory alone (`python -m http.server 8080` inside `my private tours homepage/`), the homepage itself renders but mega-menu deep links to `../my private tours/*.html` will 404.

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

## Deliberate deviations from the spec

For speed and dev-team handoff simplicity, these spec items were intentionally deferred to the WordPress port:

- **Fonts via Google Fonts `@import`** (in `assets/css/base.css`) rather than self-hosted WOFF2. Self-hosting + `<link rel="preload">` for Nunito 900/500 and EB Garamond 400-italic is a dev-team task during port; needed to hit the spec §12 LCP budget.
- **No Tailwind CDN** — all styles live in `homepage.css`. Spec §5 mentioned Tailwind as a utility layer; the implementation didn't need it and the page is lighter without.
- **Raw `<img>` tags with Unsplash CDN URLs** instead of `<picture>` elements with AVIF/WebP/JPEG fallbacks at multiple widths. Dev team self-hosts + adds `<picture>` during port; see `assets/images/sources.md` for photographer credits.
- **Search pill submit is a no-op** — wire to Bokun (or equivalent) during port.
- **Newsletter form submit is a no-op** — Mailchimp markup hooks (`honeypot`, `audience_id`) are present; wire up endpoint during port.
- **WhatsApp widget href is `https://wa.me/` (no number)** — set during port.

## Reference

Design theme inspiration: [travel-sensations.com](https://www.travel-sensations.com/nl/). No content or assets were copied.

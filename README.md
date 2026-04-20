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

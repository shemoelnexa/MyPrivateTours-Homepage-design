# MyPrivateTours.com — Homepage

Cinematic Immersive homepage design. Open `index.html` in a browser to view.

## Local preview

From repo root:

    python -m http.server 8080

Then open http://localhost:8080/homepage/

## Handoff notes

- Stylesheet: `assets/css/concept-c.css` (plus shared `tokens.css` + `base.css`).
- Motion: `assets/js/concept-c.js` (plus shared `motion-core.js`).
- Imagery uses Unsplash direct CDN URLs in dev; self-host during WordPress port.
- Search bar in the hero is visual-only — wire up to search endpoint during port.
- Mailchimp newsletter form has hooks but no live endpoint — wire up during port.
- See `docs/superpowers/specs/2026-04-20-homepage-design.md` §9 for the full design spec.

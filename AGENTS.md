# AGENTS

## Repo shape
- This is a plain static site (no Node/Python project config, no build pipeline, no test/lint/typecheck scripts).
- Main runtime entrypoint is `index.html`; it directly loads `style.css` and `scripts.js`.
- External runtime dependencies are CDN-loaded in `index.html` (Boxicons, Typed.js, GSAP + ScrollTrigger, hCaptcha).

## What to run
- Local preview: `python -m http.server 8000` from repo root, then open `http://localhost:8000/`.
- There is no repo-native automated verification command; do manual browser checks after edits.

## Wiring that is easy to break
- `scripts.js` initializes features on `DOMContentLoaded`; many behaviors depend on exact IDs/classes in `index.html` (for example `#hero-canvas`, `#mobile-menu`, `#contact-form`, `#typed-text`, `#typed-cmd-*`, `.domain-card`, `.project-card`, `.cert-iframe`). Rename selectors only with synchronized JS updates.
- Certification previews are lazy-loaded by JS from each iframe `data-src` attribute (`initCertIframe`), not hardcoded `src` in HTML.
- Contact submit is wired to Formspree via the form `action` in `index.html` and checks `hcaptcha.getResponse()` in JS before sending; current values are placeholders/test values and must stay consistent if either side is changed.

## Content/assets conventions
- PDF/image/resume paths are referenced directly with relative links, including filenames with spaces; keep exact filenames or update every matching link.
- Portfolio project/social links currently use placeholder `href="#"` in several spots; do not assume they are intentionally complete.

## Existing agent instructions status
- No `README*`, `CLAUDE.md`, `.cursorrules`, `.cursor/rules/`, `.github/copilot-instructions.md`, CI workflows, or `opencode.json` exist in this repo as of this snapshot.

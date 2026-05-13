# AGENTS

## Repo shape
- Plain static site (no Node/Python project config, no build pipeline, no test/lint/typecheck scripts).
- Main runtime entrypoint is `index.html`; it directly loads `style.css` and `scripts.js`.
- Case studies under `case-studies/` are standalone HTML pages that reuse `../style.css`.
- External runtime dependencies are CDN-loaded in `index.html` (Boxicons, Typed.js, GSAP + ScrollTrigger). No hCaptcha is currently wired in.

## What to run
- Local preview: `python -m http.server 8000` from repo root, then open `http://localhost:8000/`.
- There is no repo-native automated verification command; do manual browser checks after edits.

## Wiring that is easy to break
- `scripts.js` initializes features on `DOMContentLoaded`; many behaviors depend on exact IDs/classes in `index.html` (`#hero-canvas`, `#mobile-menu`, `#contact-form`, `#typed-text`, `#typed-cmd-1..4`, `.domain-card`, `.project-card`, `.cert-iframe`, `#lead-chat-*`, `#lead-capture-form`). Rename selectors only with synchronized JS updates.
- Certification previews are lazy-loaded by JS from each iframe `data-src` attribute (`initCertIframe`), not hardcoded `src` in HTML.
- Contact submit is wired to Formspree via the form `action` in `index.html` (form ID `meevkvpj`). Spam protection is a `_gotcha` honeypot field + a 3-second min submit delay; there is no CAPTCHA.
- The floating "Project Scoping" widget (`#lead-chat-toggle` / `#lead-chat-panel`) is currently a **rule-based responder**, not an LLM. Quick-intent buttons map to hard-coded replies in `scripts.js:botReplies`. The lead capture form posts to the same Formspree endpoint with the transcript and intent attached. Upgrade path: replace the keyword matcher with a server-proxied LLM call.

## Content/assets conventions
- PDF/image/resume paths are referenced directly with relative links. Resume filename is `Imtiaz-Nabi-AI-Engineer-2026.pdf` (no spaces, single extension); update all 4 references in `index.html` and any case studies if it changes.
- The AI Readiness Checklist (`lead-magnets/ai-readiness-checklist.md`) is offered as a download from the services section CTA.
- Canonical URL in `<link rel="canonical">` and the Open Graph / JSON-LD blocks defaults to `https://imtiazndma.github.io/aifolio/`. Update this in one place if a custom domain is configured.

## Known TODOs (callout for future agents)
- `cal.com` booking link is intentionally pointed at `#contact-form` (not a live Cal URL). When a real Cal handle is available, swap `.cal-com-link` `href`.
- No real LLM is integrated yet on the scoping widget (see above).
- No `prefers-reduced-motion` gating on the hero particles, custom cursor, GSAP reveals, or Typed.js — accessibility followup.
- No SRI hashes on CDN scripts.

## Existing agent instructions status
- No `README*`, `CLAUDE.md`, `.cursorrules`, `.cursor/rules/`, `.github/copilot-instructions.md`, CI workflows, or `opencode.json` exist in this repo as of this snapshot.

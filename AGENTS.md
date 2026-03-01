# AGENTS.md

## Build & Dev

- **Build:** `npm run build` (runs Eleventy, outputs to `_site/`)
- **Dev server:** `npm run serve` (Eleventy with live reload)
- **No test framework configured.**

## Architecture

- **Static site** built with [Eleventy v3](https://www.11ty.dev/) (ESM, `"type": "module"`).
- **Source:** `src/` → **Output:** `_site/`
- **Templates:** Liquid (`.liquid`). Pages in `src/`, layouts in `src/_includes/`, partials in `src/_includes/partials/`.
- **CSS:** Tailwind CSS v4 processed via PostCSS + cssnano in `eleventy.config.js`. Entry point: `src/assets/styles/index.css`.
- **Config:** `eleventy.config.js` — ESM default export; handles CSS build in `eleventy.before` hook.

## Code Style

- ESM imports (`import`/`export`), no CommonJS.
- Tailwind utility classes for styling; avoid custom CSS unless necessary.
- Liquid templates: lowercase filenames, use `{% render %}` for partials.
- Front matter in YAML format at the top of content files (e.g., `title`, `layout`).
- HTML in templates uses 4-space indentation.

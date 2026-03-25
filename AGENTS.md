# AGENTS.md

## Build & Dev

- **Build:** `npm run build` (runs Hugo + Pagefind, outputs to `public/`)
- **Dev server:** `hugo server` (live reload at http://localhost:1313)
- **No test framework configured.**

## Architecture

- **Static site** built with [Hugo](https://gohugo.io/).
- **Content:** `content/` (Markdown) → **Output:** `public/`
- **Templates:** Go templates (`.html`) in `layouts/`. Base layout in `layouts/_default/baseof.html`, partials in `layouts/partials/`, shortcodes in `layouts/shortcodes/`.
- **CSS:** Tailwind CSS v4 via `css.TailwindCSS` Hugo pipe. Entry point: `assets/css/main.css`.
- **Static assets:** `static/` (fonts, images, favicon) copied directly to output.
- **Config:** `hugo.toml` — site configuration, taxonomies, permalinks, markup settings.

## Code Style

- Go template syntax (`{{ }}`) in layout files.
- Tailwind utility classes for styling; avoid custom CSS unless necessary.
- Templates: lowercase filenames, use `{{ partial "name.html" . }}` for partials.
- Front matter in YAML format at the top of content files (e.g., `title`, `date`, `tags`).
- HTML in templates uses 4-space indentation.

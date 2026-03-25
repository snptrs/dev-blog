# Dev Blog

Software development blog at [snptrs.dev](https://snptrs.dev), built with [Hugo](https://gohugo.io/).

## Getting started

```bash
npm install
hugo server         # Dev server with live reload at http://localhost:1313
npm run build       # Production build → public/
```

Requires Hugo (extended edition) and Node.js 20+.

## Project structure

```
content/
├── posts/                    # Blog posts (Markdown, date-prefixed filenames)
├── _index.md                 # Homepage content
└── search.md                 # Search page
layouts/
├── _default/
│   ├── baseof.html           # Base HTML layout
│   ├── search.html           # Search page layout
│   ├── section.html          # Section list layout
│   ├── taxonomy.html         # Tag page layout
│   └── terms.html            # Tag index layout
├── partials/                 # Reusable template partials (nav, pagination, etc.)
├── posts/                    # Post-specific layouts
├── shortcodes/               # Custom shortcodes (callout, github_repo)
├── 404.html
└── index.html                # Homepage template
assets/
└── css/
    └── main.css              # Tailwind CSS entry point
static/
├── assets/
│   ├── fonts/                # Self-hosted Fira Sans (woff2)
│   └── images/               # Post images and site assets
└── favicon.ico
hugo.toml                     # Hugo configuration
package.json                  # Node dependencies (Tailwind, Pagefind)
```

## Posts

Posts are Markdown files in `content/posts/`, named with a date prefix: `YYYY-MM-DD-slug.md`.

Permalinks are configured in `hugo.toml` to generate URLs from the content base name (e.g., `/improving-my-git-workflow/`).

### Front matter

```yaml
---
title: "Post title"
date: 2025-07-23
tags: [workflow]
featured: true                # Optional — includes post in the featured section on the homepage
coverImage: /assets/images/posts/photo.jpg  # Optional — used in featured cards
summary: A short summary of the post.       # Optional
draft: true                   # Optional — excluded from production builds, visible in dev
---
```

### Tags

- Tags are added per-post in front matter.
- Tag pages are generated automatically at `/tags/<tag>/`.
- A tag index is at `/tags/`.

### Draft posts

Posts with `draft: true` in front matter are excluded from production builds but visible during local development (`hugo server -D`).

## Shortcodes

### Callout

A styled callout box. Available types: `takeaways` (💡 green), `challenges` (🤔 purple), and `tips` (🚀 blue). Content is parsed as Markdown.

```markdown
{{< callout "takeaways" >}}
- First point
- Second point
{{< /callout >}}

{{< callout "challenges" >}}
The trickiest part was...
{{< /callout >}}
```

### GitHub repo

An inline link card for a GitHub repository. Accepts a GitHub URL and an optional description.

```markdown
{{< github_repo "https://github.com/owner/repo" "A short description of the repo" >}}
{{< github_repo "https://github.com/owner/repo" >}}
```

## CSS

CSS is processed by Hugo's `css.TailwindCSS` pipe:

1. **Entry point:** `assets/css/main.css`
2. **Processing:** Tailwind CSS v4 with tree-shaking via `hugo_stats.json`
3. **Output:** Minified and fingerprinted in production builds

### Theme

Custom theme values are defined in `main.css` using Tailwind's `@theme` directive:

- **Font:** Fira Sans (self-hosted, `--font-sans`)
- **Colours:** `--color-bg: #282c35`, `--color-accent: #82c6bf`, `--color-accent-dark: #68a099`

## Markup

Hugo uses Goldmark for Markdown rendering, configured in `hugo.toml`:

- **Footnotes** enabled
- **Typographer** enabled (smart quotes and dashes)
- **Syntax highlighting** via Chroma with the Nord theme (inline styles)

## Search

Full-text search is powered by [Pagefind](https://pagefind.app/). The Pagefind index is generated as part of `npm run build` by running `pagefind --site public` after Hugo builds. The search UI is at `/search/`.

## Deployment

The site is deployed to **GitHub Pages** via a GitHub Actions workflow (`.github/workflows/deploy-pages.yml`):

1. Triggered on push to `main` or manually via `workflow_dispatch`.
2. Sets up Hugo (extended), installs Node dependencies (`npm ci`), builds the site (`npm run build`).
3. Uploads `public/` as a Pages artifact and deploys it.

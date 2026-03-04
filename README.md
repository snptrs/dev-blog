# Dev Blog

Software development blog at [snptrs.dev](https://snptrs.dev), built with [Eleventy](https://www.11ty.dev/).

## Getting started

```bash
npm install
npm run serve    # Dev server with live reload at http://localhost:8080
npm run build    # Production build → _site/
```

Requires Node.js 20+.

## Project structure

```
src/
├── _data/
│   └── metadata.json         # Global site metadata (title, URL, author)
├── _includes/
│   ├── partials/             # Reusable Vento partials (nav, pagination, etc.)
│   ├── default.vto           # Base HTML layout
│   └── post.vto              # Blog post layout
├── assets/
│   ├── fonts/                # Self-hosted Fira Sans (light, regular, bold)
│   ├── images/               # Post images and site assets
│   └── styles/
│       ├── index.css         # Main CSS entry point (Tailwind + custom styles)
│       └── prism-coldark-dark.css  # Syntax highlighting theme
├── posts/                    # Blog posts (Markdown)
│   └── posts.json            # Directory data file (sets layout, tags, permalink)
├── index.vto                 # Homepage (paginated post list + featured posts)
├── search.vto                # Search page (Pagefind UI)
├── tags.vto                  # Individual tag pages (paginated by collection)
├── tag-list.vto              # Tag index page
└── 404.vto
config/
├── markdown.js               # Markdown-it config (typographer, footnotes)
└── shortcodes.js             # Custom shortcodes (callout, github_repo)
eleventy.config.js            # Main Eleventy configuration
```

## Eleventy plugins

| Plugin                                                                                          | Config                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **[@11ty/eleventy-img](https://www.11ty.dev/docs/plugins/image/)**                              | Image transform plugin. Outputs `webp`, `png`, and `jpeg` formats. Adds `loading="lazy"` and `decoding="async"` to all images.                               |
| **[@11ty/eleventy-plugin-rss](https://www.11ty.dev/docs/plugins/rss/)**                         | RSS feed at `/feed.xml` from the `posts` collection.                                                                                                         |
| **[@11ty/eleventy-plugin-syntaxhighlight](https://www.11ty.dev/docs/plugins/syntaxhighlight/)** | Prism.js syntax highlighting for fenced code blocks. Uses the Coldark Dark theme. Default config.                                                            |
| **[@11ty/font-awesome](https://github.com/11ty/font-awesome)**                                  | Font Awesome icons (SVG). Default icon size set to `1.25em × 1.25em`.                                                                                        |
| **[eleventy-plugin-vento](https://www.npmjs.com/package/eleventy-plugin-vento)**               | Adds Vento template support across `.vto` templates and Markdown/data templating.                                                                            |
| **[markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote)**                 | Footnote support in Markdown (configured in `config/markdown.js`). The Markdown-it library also has `typographer: true` enabled for smart quotes and dashes. |

## Posts

Posts are Markdown files in `src/posts/`, named with a date prefix: `YYYY-MM-DD-slug.md`.

The directory data file (`posts.json`) automatically applies the `post.vto` layout, adds the `posts` tag, and generates a permalink from the file slug (e.g., `/improving-my-git-workflow/`).

### Front matter

```yaml
---
title: "Post title"
date: 2025-07-23 # Optional — will come from filename if not set
tags: workflow # Additional tag(s) beyond the default "posts"
featured: true # Optional — includes post in the featured section on the homepage
coverImage: /assets/images/posts/photo.jpg # Optional — used in the featured cards
summary: A short summary of the post. # Optional
draft: true # Optional — excluded from production builds, visible in dev
---
```

### Tags and collections

- Every post automatically gets the `posts` tag via `posts.json`.
- Additional tags can be added per-post in front matter.
- The `featured` collection is a custom collection of the 3 most recent posts with `featured: true`.
- Tag pages are generated automatically at `/tags/<tag>/`.
- A tag index is at `/tags/`.

### Draft posts

Posts with `draft: true` in front matter are excluded from production builds but visible during local development (`npm run serve`).

## Custom shortcodes

Defined in `config/shortcodes.js`.

### Callout

A styled callout box. Available types: `takeaways` (💡 green), `challenges` (🤔 purple), and `tips` (🚀 blue). Content is parsed as Markdown.

```vento
{{ callout "takeaways" }}
- First point
- Second point
{{ /callout }}

{{ callout "challenges" }}
The trickiest part was...
{{ /callout }}
```

### GitHub repo

An inline link card for a GitHub repository. Accepts a GitHub URL and an optional description.

```vento
{{ github_repo "https://github.com/owner/repo", "A short description of the repo" }}
{{ github_repo "https://github.com/owner/repo" }}
```

## CSS pipeline

CSS is built via PostCSS in Eleventy's `eleventy.before` hook:

1. **Entry point:** `src/assets/styles/index.css`
2. **Processing:** Tailwind CSS v4 (`@tailwindcss/postcss`) → cssnano (minification)
3. **Output:** `_site/assets/styles/index.css`

The dev server watches `_site/assets/styles/**/*.css` for live reload on CSS changes.

### Theme

Custom theme values are defined in `index.css` using Tailwind's `@theme` directive:

- **Font:** Fira Sans (self-hosted, `--font-sans`)
- **Colours:** `--color-bg: #282c35`, `--color-accent: #82c6bf`, `--color-accent-dark: #68a099`

A custom Prism theme (`prism-coldark-dark.css`) is passed through as a static asset for syntax highlighting.

## Search

Full-text search is powered by [Pagefind](https://pagefind.app/). The Pagefind index is generated in the `eleventy.after` hook by running `pagefind --site _site` after every build. The search UI is at `/search/`.

## Deployment

The site is deployed to **GitHub Pages** via a GitHub Actions workflow (`.github/workflows/deploy-pages.yml`):

1. Triggered on push to `main` or manually via `workflow_dispatch`.
2. Installs dependencies (`npm ci`), builds the site (`npm run build`).
3. Uploads `_site/` as a Pages artifact and deploys it.

## Passthrough copies

These files are copied directly to the output without processing:

- `src/favicon.ico`
- `src/assets/fonts/` (self-hosted Fira Sans woff2 files)
- `src/assets/styles/prism-coldark-dark.css`

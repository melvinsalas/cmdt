# CMDT Web

Official website for the Tucurrique District Municipal Council. It is built with Astro, MDX,
Tailwind CSS, and Pagefind.

## Requirements

- Node.js 22.12 or newer
- npm

## Setup

Install the dependencies:

```bash
npm install
```

Start the development server in the background:

```bash
npm run astro -- dev --background
```

Stop the development server:

```bash
npm run stop
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm run check` | Check Astro files, types, and content |
| `npm run build` | Build the site and the Pagefind search index |
| `npm run search:index` | Rebuild search from the current `dist` folder |
| `npm run preview` | Preview the production build |
| `npm run validate` | Run checks and a full production build |

## Project structure

- `src/pages`: site pages and routes
- `src/content/archive`: archive content grouped by year
- `src/components`: reusable Astro components
- `src/layouts`: shared page layouts
- `src/data`: navigation and site settings
- `public/files`: public PDF and document downloads
- `scripts/build-search-index.mjs`: Pagefind and PDF index builder

## Content

Archive entries use the `archive` content collection. Their full folder path is kept in the URL
so entries from different years do not conflict.

Public documents are referenced from pages with links under `/files/`. Keep each document
linked from at least one page if it should appear in search results.

## Search

The production build uses Pagefind. The index builder reads the generated HTML and detects
links to PDF files. It adds the extracted PDF text to the search record for the page that links
to that document.

The source Markdown and published HTML stay small because the PDF text exists only inside
the Pagefind index. PDF extraction results are cached in `.cache/pdf-text`.

See [PAGEFIND.md](PAGEFIND.md) for more details.

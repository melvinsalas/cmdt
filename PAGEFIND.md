# Search with Pagefind

The site uses [Pagefind](https://pagefind.app/) for static search.

## Main files

- Search page: `/buscador`
- Search UI: `src/components/PagefindUI.astro`
- Search button: `src/components/SearchButton.astro`
- Configuration: `pagefind.json`
- Index script: `scripts/build-search-index.mjs`

## How it works

Astro builds the site into `dist`. The index script then reads every generated HTML page.

If a page links to a PDF under `/files/`, the script:

1. Extracts the PDF text with `unpdf`.
2. Adds the text to an in-memory copy of that page.
3. Sends the page to Pagefind.

The published HTML and the source Markdown files are not changed. Search results link to the
page that contains the PDF link, not directly to the PDF.

If two pages link to the same PDF, both pages can appear in search results. A PDF that is not
linked from any page is not indexed.

Extracted text is cached by file hash in `.cache/pdf-text`. The cache is ignored by Git and is
updated automatically when a PDF changes.

## Configuration

`pagefind.json` contains the main settings:

```json
{
  "site": "dist",
  "output_subdir": "pagefind",
  "exclude_selectors": [".no-search"]
}
```

| Setting | Purpose |
| --- | --- |
| `site` | Folder that contains the built site |
| `output_subdir` | Folder where Pagefind writes the search files |
| `exclude_selectors` | Extra elements that Pagefind should ignore |

## Commands

Build the site and the search index:

```bash
npm run build
```

Build only the search index from the current `dist` folder:

```bash
npm run search:index
```

The search index is not available in the Astro development server. To test search locally:

```bash
npm run build
npm run preview
```

## Excluding content

Add the `no-search` class to content that should not be indexed:

```astro
<div class="no-search">
  This content will not appear in search results.
</div>
```

## Generated files

Pagefind writes its files to `dist/pagefind/`. This folder contains the search JavaScript,
styles, metadata, and index chunks.

## References

- [Pagefind documentation](https://pagefind.app/docs/)
- [Running Pagefind](https://pagefind.app/docs/running-pagefind/)
- [Pagefind configuration](https://pagefind.app/docs/config-options/)

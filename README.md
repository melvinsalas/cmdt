# CMDT Web

Institutional website for the Tucurrique District Municipal Council, built with Astro and MDX.

## Requirements

- Node.js 22.12 or higher
- npm

## Commands

- `npm run dev`: starts the development server
- `npm run stop`: stops the server started with `astro dev --background`
- `npm run check`: runs Astro type and content checks
- `npm run build`: builds the site for production
- `npm run preview`: previews the production build locally
- `npm run validate`: runs `check` and then `build`

## Main Structure

- `src/pages`: site pages (including MDX pages)
- `src/content`: versioned content collections (`actas`, `concursos`, `licitaciones`)
- `src/components`: reusable components
- `src/layouts`: base HTML/MDX layouts
- `src/data`: navigation and site metadata configuration
- `public/files`: downloadable public files

## Content Notes

- Transparency collections are rendered using dynamic routes and a shared component.
- Transparency section links come from a single data source (`menus`).
- Slugs keep their full hierarchy to avoid collisions between years or subfolders.

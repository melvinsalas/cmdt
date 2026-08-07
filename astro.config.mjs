// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkToc from 'remark-toc';
import rehypeWrapTables from './src/utils/rehype-wrap-tables.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://tucurrique.go.cr',
	integrations: [mdx(), sitemap()],
	markdown: {
		processor: unified({
			remarkPlugins: [[remarkToc, {
				heading: 'En esta página',
				maxDepth: 2,
				skip: 'Fuentes de referencia',
			}]],
			rehypePlugins: [rehypeWrapTables],
		}),
	},
	vite: {
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
				'@components': fileURLToPath(new URL('./src/components', import.meta.url)),
				'@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
			},
		},
		plugins: [tailwindcss()],
	},
});

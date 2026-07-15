import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as pagefind from 'pagefind';
import { extractText, getDocumentProxy } from 'unpdf';

const projectRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const publicRoot = path.join(projectRoot, 'public');
const cacheRoot = path.join(projectRoot, '.cache/pdf-text');
const pagefindConfig = JSON.parse(
	await readFile(path.join(projectRoot, 'pagefind.json'), 'utf8'),
);
const siteRoot = path.resolve(projectRoot, pagefindConfig.site ?? 'dist');
const outputRoot = pagefindConfig.output_path
	? path.resolve(projectRoot, pagefindConfig.output_path)
	: path.join(siteRoot, pagefindConfig.output_subdir ?? 'pagefind');
const extractedTextCache = new Map();

const stats = {
	htmlPages: 0,
	pagesWithPdf: 0,
	pdfReferences: 0,
	uniquePdfs: new Set(),
	cacheHits: 0,
	withoutText: 0,
	errors: 0,
};

async function findHtmlFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];

	for (const entry of entries) {
		if (entry.name === (pagefindConfig.output_subdir ?? 'pagefind')) continue;

		const entryPath = path.join(directory, entry.name);
		if (entry.isDirectory()) {
			files.push(...await findHtmlFiles(entryPath));
		} else if (entry.isFile() && entry.name.endsWith('.html')) {
			files.push(entryPath);
		}
	}

	return files.sort();
}

function decodePublicPath(publicPath) {
	try {
		return decodeURIComponent(publicPath);
	} catch {
		return publicPath;
	}
}

function normalizePublicPath(publicPath) {
	return decodePublicPath(publicPath.split(/[?#]/u, 1)[0]);
}

function resolvePdfPath(publicPath) {
	const absolutePath = path.resolve(publicRoot, `.${normalizePublicPath(publicPath)}`);

	if (!absolutePath.startsWith(`${publicRoot}${path.sep}`)) {
		throw new Error(`Ruta fuera de public/: ${publicPath}`);
	}

	return absolutePath;
}

function normalizeText(text) {
	return text
		.normalize('NFC')
		.replaceAll('\0', '')
		.replaceAll('\f', '\n\n')
		.split(/\r?\n/u)
		.map((line) => line.replace(/\s+/gu, ' ').trim())
		.join('\n')
		.replace(/\n{3,}/gu, '\n\n')
		.trim();
}

function escapeHtml(text) {
	return text
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;');
}

function findPdfLinks(html) {
	const links = [];
	const matches = html.matchAll(/href\s*=\s*(["'])(\/files\/[^"']+?\.pdf(?:[?#][^"']*)?)\1/giu);

	for (const match of matches) {
		const publicPath = normalizePublicPath(match[2]);
		if (!links.includes(publicPath)) links.push(publicPath);
	}

	return links;
}

function pageUrlFor(htmlPath) {
	const relativePath = path.relative(siteRoot, htmlPath).split(path.sep).join('/');

	if (relativePath === 'index.html') return '/';
	if (relativePath.endsWith('/index.html')) {
		return encodeURI(`/${relativePath.slice(0, -'index.html'.length)}`);
	}

	return encodeURI(`/${relativePath}`);
}

function addPdfContentToHtml(html, documents) {
	const pdfContent = documents
		.map(({ publicPath, text }) => [
			`<section data-pagefind-weight="0.5" data-pagefind-filter="format:PDF">`,
			`<p data-pagefind-meta="pdf_url:${escapeHtml(encodeURI(publicPath))}">${escapeHtml(text)}</p>`,
			'</section>',
		].join(''))
		.join('');
	const indexOnlyContent = `<div data-pagefind-meta="content_source:PDF">${pdfContent}</div>`;

	return html.includes('</body>')
		? html.replace('</body>', `${indexOnlyContent}</body>`)
		: `${html}${indexOnlyContent}`;
}

async function extractPdfText(publicPath) {
	const normalizedPath = normalizePublicPath(publicPath);
	if (extractedTextCache.has(normalizedPath)) {
		return extractedTextCache.get(normalizedPath);
	}

	const extraction = (async () => {
		const file = await readFile(resolvePdfPath(normalizedPath));
		const hash = createHash('sha256').update(file).digest('hex');
		const cachePath = path.join(cacheRoot, `${hash}.txt`);

		try {
			const cachedText = await readFile(cachePath, 'utf8');
			stats.cacheHits += 1;
			return cachedText;
		} catch (error) {
			if (error.code !== 'ENOENT') throw error;
		}

		const pdf = await getDocumentProxy(new Uint8Array(file), { verbosity: 0 });
		let normalizedText;

		try {
			const { text } = await extractText(pdf, { mergePages: true });
			normalizedText = normalizeText(text);
		} finally {
			await pdf.destroy();
		}

		if (normalizedText.length >= 20) {
			await mkdir(cacheRoot, { recursive: true });
			await writeFile(cachePath, normalizedText, 'utf8');
		}

		return normalizedText;
	})();

	extractedTextCache.set(normalizedPath, extraction);
	return extraction;
}

function assertNoErrors(action, errors) {
	if (errors?.length) {
		throw new Error(`${action}:\n${errors.join('\n')}`);
	}
}

const { index, errors: createErrors } = await pagefind.createIndex({
	excludeSelectors: pagefindConfig.exclude_selectors,
	forceLanguage: pagefindConfig.force_language ?? 'es',
	includeCharacters: pagefindConfig.include_characters,
	keepIndexUrl: pagefindConfig.keep_index_url,
	verbose: pagefindConfig.verbose ?? false,
});

try {
	assertNoErrors('No se pudo crear el índice de Pagefind', createErrors);

	for (const htmlPath of await findHtmlFiles(siteRoot)) {
		let html = await readFile(htmlPath, 'utf8');
		const pdfLinks = findPdfLinks(html);

		if (pdfLinks.length > 0) {
			stats.pagesWithPdf += 1;
			stats.pdfReferences += pdfLinks.length;
			const documents = [];

			for (const publicPath of pdfLinks) {
				stats.uniquePdfs.add(publicPath);

				try {
					const text = await extractPdfText(publicPath);
					if (text.length < 20) {
						stats.withoutText += 1;
						console.warn(`Sin texto extraíble: ${publicPath}`);
						continue;
					}

					documents.push({ publicPath, text });
				} catch (error) {
					stats.errors += 1;
					console.error(`Error al procesar ${publicPath}: ${error.message}`);
				}
			}

			if (documents.length > 0) html = addPdfContentToHtml(html, documents);
		}

		const result = await index.addHTMLFile({
			url: pageUrlFor(htmlPath),
			content: html,
		});
		assertNoErrors(`No se pudo indexar ${htmlPath}`, result.errors);
		stats.htmlPages += 1;
	}

	await rm(outputRoot, { recursive: true, force: true });
	const writeResult = await index.writeFiles({ outputPath: outputRoot });
	assertNoErrors('No se pudo escribir el índice', writeResult.errors);
} finally {
	await index?.deleteIndex();
	await pagefind.close();
}

console.log('\nResumen del índice de búsqueda');
console.log(`  Páginas HTML: ${stats.htmlPages}`);
console.log(`  Páginas con PDF: ${stats.pagesWithPdf}`);
console.log(`  Referencias a PDF: ${stats.pdfReferences}`);
console.log(`  PDF únicos: ${stats.uniquePdfs.size}`);
console.log(`  Lecturas desde caché: ${stats.cacheHits}`);
console.log(`  PDF sin texto extraíble: ${stats.withoutText}`);
console.log(`  Errores: ${stats.errors}`);

if (stats.errors > 0) process.exitCode = 1;

import { getCollection } from 'astro:content';

type TransparencyCollection = 'actas' | 'concursos' | 'licitaciones';

export async function buildCollectionStaticPaths(collection: TransparencyCollection) {
	const entries = await getCollection(collection);

	return entries.map((entry) => ({
		params: { slug: entry.id.replace(/\.(md|mdx)$/, '').split('/').pop() ?? '' },
		props: { entry },
	}));
}

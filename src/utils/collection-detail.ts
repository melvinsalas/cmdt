import { getCollection, type CollectionEntry } from 'astro:content';

type ArchiveType = CollectionEntry<'archive'>['data']['type'];

export async function buildCollectionStaticPaths(types: ArchiveType[]) {
	const entries = await getCollection('archive', ({ data }) => types.includes(data.type));

	return entries.map((entry) => ({
		params: { slug: entry.id.replace(/\.(md|mdx)$/, '') },
		props: { entry },
	}));
}

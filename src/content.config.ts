import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const actas = defineCollection({
	loader: glob({
		base: './src/content/actas',
		pattern: '**/*.md',
	}),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		url: z.string(),
		type: z.enum(['ordinaria', 'extraordinaria']),
	}),
});

export const collections = {
	actas,
};

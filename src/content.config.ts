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

const concursos = defineCollection({
	loader: glob({
		base: './src/content/concursos',
		pattern: '**/*.md',
	}),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		date: z.coerce.date().optional(),
		category: z.string().optional(),
		document: z.string().optional(),
	}),
});

export const collections = {
	actas,
	concursos,
};

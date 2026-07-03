import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const schema = z.object({
	title: z.string(),
	date: z.coerce.date(),
	type: z.string().optional(),
	file: z.string().optional(),
});

const actas = defineCollection({
	loader: glob({
		base: './src/content/actas',
		pattern: '**/*.{md,mdx}',
	}),
	schema,
});

const concursos = defineCollection({
	loader: glob({
		base: './src/content/concursos',
		pattern: '**/*.{md,mdx}',
	}),
	schema,
});

const licitaciones = defineCollection({
	loader: glob({
		base: './src/content/licitaciones',
		pattern: '**/*.{md,mdx}',
	}),
	schema,
});

export const collections = { actas, concursos, licitaciones };

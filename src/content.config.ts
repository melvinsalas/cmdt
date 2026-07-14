import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const schema = z.object({
	title: z.string(),
	date: z.coerce.date(),
	type: z.enum(['ordinaria', 'extraordinaria', 'concurso', 'licitacion', 'plan']),
	description: z.string().optional(),
	files: z.array(z.string()).optional(),
});

const archive = defineCollection({
	loader: glob({
		base: './src/content/archive',
		pattern: '**/*.{md,mdx}',
	}),
	schema,
});

export const collections = { archive };

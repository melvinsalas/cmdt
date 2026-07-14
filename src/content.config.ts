import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const schema = z.object({
	title: z.string(),
	date: z.coerce.date(),
	type: z.enum(['ordinaria', 'extraordinaria', 'concurso', 'licitacion']),
	'\u0064\u0065\u0073\u0063\u0072\u0069\u0070\u0063\u0069\u00f3\u006e': z.string().optional(),
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

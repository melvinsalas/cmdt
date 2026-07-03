import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Schema base para colecciones de datos (actas, concursos, licitaciones)
const dataSchema = z.object({
	title: z.string(),
	date: z.coerce.date(),
	type: z.string().optional(),
	file: z.string().optional(),
});

const actas = defineCollection({
	loader: glob({
		base: './src/content/actas',
		pattern: '**/*.md',
	}),
	schema: dataSchema,
});

const concursos = defineCollection({
	loader: glob({
		base: './src/content/concursos',
		pattern: '**/*.md',
	}),
	schema: dataSchema,
});

const licitaciones = defineCollection({
	loader: glob({
		base: './src/content/licitaciones',
		pattern: '**/*.md',
	}),
	schema: dataSchema,
});

const pages = defineCollection({
	loader: glob({
		base: './src/content/pages',
		pattern: '**/*.md',
	}),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		slug: z.string(),
	}),
});

export const collections = {
	actas,
	concursos,
	licitaciones,
	pages,
};

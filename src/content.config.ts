import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const sessions = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/sessions' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    lang: z.enum(['pt-BR', 'en']),
    translationKey: z.string(),
    order: z.number(),
    summary: z.string(),
    readingTime: z.number(),
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    tags: z.array(z.string()),
    heroLabel: z.string(),
    references: z.array(z.string()).default([]),
    updatedAt: z.coerce.date(),
  }),
});

const references = defineCollection({
  loader: file('./src/content/references/references.json'),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    type: z.enum(['artigo', 'documentacao', 'talk', 'video', 'pesquisa']),
    source: z.string(),
    category: z.string(),
    relatedSessions: z.array(z.string()).default([]),
    priority: z.number().optional(),
  }),
});

export const collections = { sessions, references };

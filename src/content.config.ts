import {defineCollection, z} from 'astro:content'
import { glob } from 'astro/loaders';

const talks = defineCollection({
  loader: glob({
    pattern: '*/slides.md',
    base: '.',
    generateId: ({entry}) => entry.split('/')[0],
  }),
  schema: z.object({
    title: z.string(),
    info: z.string().optional(),
    date: z.coerce.date().optional(),
    event: z.string().optional(),
    location: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
  }).passthrough(),
});

export const collections = { talks };

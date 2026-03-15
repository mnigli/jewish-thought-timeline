import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sourcesCollection = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/sources' }),
    schema: z.object({
        id: z.number(),
        nameHe: z.string(),
        nameEn: z.string(),
        workTitleHe: z.string(),
        workTitleEn: z.string(),
        dateStart: z.number(),
        dateEnd: z.number().optional(),
        dateDisplay: z.string(),
        sourceType: z.enum(['diary', 'travel', 'autobiography', 'memoirs', 'letters']),
        sourceTypeHe: z.string(),
        authorGender: z.enum(['male', 'female']),
        region: z.string(),
        regionHe: z.string(),
        originCity: z.string(),
        language: z.string(),
        reliability: z.enum(['high', 'moderate', 'disputed']),
        era: z.enum(['medieval', 'early-modern', 'enlightenment', 'modern']),
        relevantQuestions: z.array(z.number()),
        color: z.string(),
    }),
});

const questionsCollection = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/questions' }),
    schema: z.object({
        id: z.number(),
        questionHe: z.string(),
        shortTitleHe: z.string(),
        category: z.enum(['identity', 'society', 'religion', 'politics', 'culture', 'overarching']),
        relevantSources: z.array(z.number()),
        isOverarching: z.boolean().default(false),
    }),
});

export const collections = {
    sources: sourcesCollection,
    questions: questionsCollection,
};

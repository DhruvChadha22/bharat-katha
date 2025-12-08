import * as z from "zod";

export const SearchStoriesRequestSchema = z.object({
    search: z.string().trim().min(1).optional(),
    languageId: z.uuid().optional(),
    categoryId: z.uuid().optional(),
    regionId: z.uuid().optional(),
});

export const StoriesByCategoryRequestSchema = z.object({
    categoryId: z.uuid(),
    excludeId: z.uuid().optional(),
});

export const StoriesByAuthorRequestSchema = z.object({
    authorId: z.uuid(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(12).default(8),
});

export const StoriesByIdRequestSchema = z.object({
    storyId: z.uuid(),
});

export const CreateStoryRequestSchema = z.object({
    title: z.string().min(2),
    description: z.string(),
    transcript: z.string(),
    audioUrl: z.string(),
    audioId: z.string(),
    languageId: z.uuid(),
    categoryId: z.uuid(),
    regionId: z.uuid(),
    duration: z.coerce.number().int().min(1),
});

export const UpdateStoryRequestSchema = z.object({
    storyId: z.uuid(),
    title: z.string().min(2),
    description: z.string(),
    categoryId: z.uuid(),
    regionId: z.uuid(),
});

export const DeleteStoryRequestSchema = z.object({
    storyId: z.uuid(),
});

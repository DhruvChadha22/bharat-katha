import * as z from "zod";

export const AddFavoriteStoryRequestSchema = z.object({
    storyId: z.uuid(),
});

export const DeleteFavoriteStoryRequestSchema = z.object({
    storyId: z.uuid(),
});

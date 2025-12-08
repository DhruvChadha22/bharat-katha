import * as z from "zod";

export const UserByIdRequestSchema = z.object({
    userId: z.uuid(),
});

export const UpdateUserRequestSchema = z.object({
    name: z.string().min(2).max(20),
});

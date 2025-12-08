import * as z from "zod";

export const GenerateAudioRequestSchema = z.object({
    transcript: z.string(),
    languageId: z.uuid(),
    voiceType: z.enum(["Male", "Female"]),
});

export const DeleteAudioRequestSchema = z.object({
    publicId: z.string(),
});

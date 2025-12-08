import { Request, Response } from "express";
import { prisma } from "../config/db";
import { generateAndUploadTTS } from "../utils/generateTTS";
import { deleteResource } from "../utils/cloudinaryHandler";
import { 
    GenerateAudioRequestSchema,
    DeleteAudioRequestSchema,
} from "../schemas/audio.schema";

export const generateAudio = async (req: Request, res: Response) => {
    try {
        const validation = GenerateAudioRequestSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Missing or Invalid Inputs",
            });
        }

        const { transcript, languageId, voiceType } = validation.data;

        const language = await prisma.language.findUnique({
            where: { id: languageId },
        });

        if (!language) {
            return res.status(404).json({
                success: false,
                message: "Language NOT Found",
            });
        }

        const voice = await prisma.voice.findUnique({
            where: {
                languageId_type: {
                    languageId: language.id,
                    type: voiceType,
                },
            },
        });

        if (!voice) {
            return res.status(404).json({
                success: false,
                message: "Voice NOT Found",
            });
        }

        const data = await generateAndUploadTTS(transcript, voice.name);

        return res.status(200).json({
            success: true,
            message: "Audio generated successfully",
            data,
        });
    }
    catch (error: any) {
        console.log("Error while generating audio: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while generating audio",
        });
    }
};

export const deleteAudio = async (req: Request, res: Response) => {
    try {
        const validation = DeleteAudioRequestSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Missing or Invalid Inputs",
            });
        }

        const { publicId } = validation.data;
        const deletion = await deleteResource(publicId, "video");
        console.log(deletion);

        if (deletion.result === "not found") {
            return res.status(404).json({
                success: false,
                message: "Audio file NOT found",
            });
        }

        if (deletion.result !== "ok") {
            throw new Error(`Unexpected Cloudinary response: ${deletion.result}`);
        }

        return res.status(200).json({
            success: true,
            message: "Audio file deleted successfully",
        });
    }
    catch (error: any) {
        console.log("Error while deleting audio: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while deleting audio",
        });
    }
};

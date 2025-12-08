import { EdgeTTS } from "@andresaya/edge-tts";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { deleteResource } from "./cloudinaryHandler";

export const generateAndUploadTTS = async (transcript: string, voice: string): Promise<{ audioUrl: string, audioId: string }> => {
    const tts = new EdgeTTS();
    const publicId = `tts_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    return new Promise((resolve, reject) => {
        try {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "video",
                    folder: process.env.CLOUDINARY_AUDIO_FOLDER,
                    format: "mp3",
                    public_id: publicId,
                },
                (error, result) => {
                    if (error) reject(error);
                    else if (result) {
                        resolve({
                            audioUrl: result.secure_url,
                            audioId: result.public_id,
                        });
                    }
                }
            );

            // Convert EdgeTTS async generator into a Node.js readable stream
            const readable = Readable.from(tts.synthesizeStream(transcript, voice));

            readable.on("error", async (err) => {
                await deleteResource(publicId);
                uploadStream.destroy();
                reject(err);
            });
            uploadStream.on("error", async (err) => {
                await deleteResource(publicId);
                readable.destroy();
                reject(err);
            });
            
            // Pipe audio chunks directly into Cloudinary
            readable.pipe(uploadStream);
        }
        catch (error) {
            reject(error);
        }
    });
};

import toast from "react-hot-toast";
import { useState } from "react";
import { generateAudio } from "@/services/operations/audio";
import type { AudioHooksProps } from "@/types/props";
import type { GenerateAudioRequest } from "@/types/audio";

export const useGenerateAudio = ({
    setGeneratedAudio,
}: AudioHooksProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGenerateAudio = async ({
        transcript,
        languageId,
        voiceType,
    }: GenerateAudioRequest) => {
        try {
            setIsLoading(true);
            const result = await generateAudio({ 
                transcript, 
                languageId,
                voiceType, 
            });
            setGeneratedAudio(result.data);
            toast.success("Audio generated successfully");
        }
        catch (error: any) {
            toast.error("Error while generating audio");
        }
        finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleGenerateAudio,
    };
};

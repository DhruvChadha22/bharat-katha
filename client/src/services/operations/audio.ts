import { audioAPI } from "../apiRoutes";
import { apiConnector } from "../apiConnector";
import type { ApiResponse } from "@/types/api-response";
import type { DeleteAudioRequest, GenerateAudioRequest, GeneratedAudio } from "@/types/audio";

const {
    GENERATE_AUDIO,
    DELETE_AUDIO,
} = audioAPI;

export const generateAudio = async ({
    transcript,
    languageId,
    voiceType,
}: GenerateAudioRequest) => {
    const response = await apiConnector("post", GENERATE_AUDIO, {
        transcript,
        languageId,
        voiceType,
    });
    const result: ApiResponse<GeneratedAudio> = response.data;
    return result;
};

export const deleteAudio = async ({
    publicId,
}: DeleteAudioRequest) => {
    await apiConnector("delete", DELETE_AUDIO, {
        publicId,
    });
};

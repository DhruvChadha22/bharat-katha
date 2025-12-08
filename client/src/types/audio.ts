
export interface Audio {
    storyId: string;
    title: string;
    audioUrl: string;
    imageUrl: string;
    author: {
        id: string;
        name: string;
    };
    duration: number;
    currentTime: number;
    volume: number;
    isPlaying: boolean;
    isMuted: boolean;
};

export interface AudioState {
    audio: Audio | null;
    isStoryDetailsOpen: boolean;
};

export interface GenerateAudioRequest {
    transcript: string;
    languageId: string;
    voiceType: "Male" | "Female" | "";
};

export interface GeneratedAudio {
    audioUrl: string;
    audioId: string;
};

export interface DeleteAudioRequest {
    publicId: string;
};

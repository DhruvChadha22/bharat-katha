import type { Audio, AudioState } from "@/types/audio";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: AudioState = {
    audio: null,
    isStoryDetailsOpen: false,
};

const audioSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
        setAudio: (state, action: PayloadAction<Audio | null>) => {
            state.audio = action.payload;
        },
        setDuration: (state, action: PayloadAction<number>) => {
            if (state.audio) state.audio.duration = action.payload;
        },
        setCurrentTime: (state, action: PayloadAction<number>) => {
            if (state.audio) state.audio.currentTime = action.payload;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            if (state.audio) state.audio.volume = action.payload;
        },
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            if (state.audio) state.audio.isPlaying = action.payload;
        },
        setIsMuted: (state, action: PayloadAction<boolean>) => {
            if (state.audio) state.audio.isMuted = action.payload;
        },
        setIsStoryDetailsOpen: (state, action: PayloadAction<boolean>) => {
            state.isStoryDetailsOpen = action.payload;
        },
    },
});

export const { setAudio, setDuration, setCurrentTime, setVolume, setIsPlaying, setIsMuted, setIsStoryDetailsOpen } = audioSlice.actions;
export default audioSlice.reducer;

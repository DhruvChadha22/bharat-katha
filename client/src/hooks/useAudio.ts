import { useAudioRef } from "@/providers/AudioProvider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsMuted, setIsPlaying, setVolume } from "@/store/slices/audioSlice";

export const useAudio = () => {
    const audioRef = useAudioRef();

    const { audio } = useAppSelector(state => state.audio);
    const dispatch = useAppDispatch();

    const togglePlay = () => {
        if (audioRef.current?.paused) {
            audioRef.current?.play().then(() => dispatch(setIsPlaying(true)));
        } else {
            audioRef.current?.pause();
            dispatch(setIsPlaying(false));
        }
    };

    const toggleMute = () => {
        if (!audio || !audioRef.current) return;

        audioRef.current.muted = !audio.isMuted;
        dispatch(setIsMuted(audioRef.current.muted));
    };

    const changeVolume = (volume: number) => {
        const audioElement = audioRef.current;
        if (!audioElement) return;

        audioElement.volume = Math.min(Math.max(volume, 0), 1);
        if (audioElement.volume === 0) {
            audioElement.muted = true;
            dispatch(setIsMuted(true));
        } else if (audioElement.muted) {
            audioElement.muted = false;
            dispatch(setIsMuted(false));
        }

        dispatch(setVolume(audioElement.volume));
    };

    const forward = () => {
        const audioElement = audioRef.current;
        if (!audioElement) return;
        
        audioElement.currentTime = Math.min(audioElement.currentTime + 10, audioElement.duration);
    };

    const rewind = () => {
        const audioElement = audioRef.current;
        if (!audioElement) return;
        
        audioElement.currentTime = Math.max(audioElement.currentTime - 10, 0);
    };

    return {
        togglePlay,
        toggleMute,
        changeVolume,
        forward,
        rewind,
    };
};

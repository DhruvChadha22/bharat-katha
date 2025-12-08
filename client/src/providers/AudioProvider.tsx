import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentTime, setDuration, setIsPlaying } from "@/store/slices/audioSlice";
import { createContext, useContext, useEffect, useRef, type RefObject } from "react";

const AudioContext = createContext<RefObject<HTMLAudioElement | null> | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const { audio } = useAppSelector(state => state.audio);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const audioElement = audioRef.current;
        if (!audioElement) return;

        const updateCurrentTime = () => dispatch(setCurrentTime(audioElement.currentTime));
        const handleLoadedMetadata = () => dispatch(setDuration(audioElement.duration));
        const handleAudioEnded = () => dispatch(setIsPlaying(false));
        const handlePlay = () => dispatch(setIsPlaying(true));
        const handlePause = () => dispatch(setIsPlaying(false));

        audioElement.addEventListener("timeupdate", updateCurrentTime);
        audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
        audioElement.addEventListener("ended", handleAudioEnded);
        audioElement.addEventListener("play", handlePlay);
        audioElement.addEventListener("pause", handlePause);

        return () => {
            audioElement.removeEventListener("timeupdate", updateCurrentTime);
            audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audioElement.removeEventListener("ended", handleAudioEnded);
            audioElement.removeEventListener("play", handlePlay);
            audioElement.removeEventListener("pause", handlePause);
        };
    }, []);

    useEffect(() => {
        const audioElement = audioRef.current;
        if (!audioElement) return;

        if (audio?.audioUrl) {
            if (audioElement.src !== audio.audioUrl) {
                audioElement.src = audio.audioUrl;
                audioElement.load();
            }
            audioElement.play()
                .then(() => dispatch(setIsPlaying(true)))
                .catch(() => dispatch(setIsPlaying(false)));
            audioElement.muted = false;
        } else {
            audioElement.pause();
        }
    }, [audio?.audioUrl, audioRef]);

    return (
        <AudioContext.Provider value={audioRef}>
            <audio 
                ref={audioRef} 
                className="hidden"
            />
            {children}
        </AudioContext.Provider>
    );
};

export const useAudioRef = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error("useAudioRef must be used within an AudioProvider");
    }
    return context;
};

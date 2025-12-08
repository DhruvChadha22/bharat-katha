import { cn, formatTime } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { useAudio } from "@/hooks/useAudio";
import { Link } from "react-router-dom";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";

export const StoryPlayer: React.FC = () => {    
    const { audio, isStoryDetailsOpen } = useAppSelector(state => state.audio);
    const {
        togglePlay,
        toggleMute,
        changeVolume,
        forward,
        rewind,
    } = useAudio();

    if (!audio) return;

    return (
        <div className={cn("sticky bottom-0 left-0 z-10 flex size-full flex-col", {
            "hidden": isStoryDetailsOpen, 
        })}>
            <Progress
                value={(audio.currentTime / audio.duration) * 100}
                className="h-1.5 w-full"
                max={audio.duration}
            />
            <section className="bg-background-200/25 backdrop-blur-sm flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
                <div className="flex items-center gap-4 max-md:hidden">
                    <Link to={`/stories/${audio.storyId}`}>
                        <img
                            src={audio.imageUrl}
                            width={64}
                            height={64}
                            alt="story-img"
                            className="aspect-square rounded-xl"
                        />
                    </Link>
                    <div className="flex w-[160px] flex-col">
                        <h2 className="text-[14px] leading-normal truncate font-semibold">
                            {audio.title}
                        </h2>
                        <p className="text-[12px] leading-normal font-normal">{audio.author.name}</p>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-3 md:gap-6">
                    <div className="flex items-center gap-1.5">
                        <img
                            src="/rewind.svg"
                            width={24}
                            height={24}
                            alt="rewind"
                            onClick={rewind}
                            className="cursor-pointer"
                        />
                        <h2 className="text-[12px] leading-normal font-bold">-10</h2>
                    </div>
                    <img
                        src={audio.isPlaying ? "/pause.svg" : "/play.svg"}
                        width={50}
                        height={50}
                        alt="pause/play"
                        onClick={togglePlay}
                        className="cursor-pointer"
                    />
                    <div className="flex items-center gap-1.5">
                        <h2 className="text-[12px] leading-normal font-bold">+10</h2>
                        <img
                            src="/forward.svg"
                            width={24}
                            height={24}
                            alt="forward"
                            onClick={forward}
                            className="cursor-pointer"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <h2 className="text-[14px] leading-normal font-semibold max-md:hidden">
                        {formatTime(audio.currentTime)} / {formatTime(audio.duration)}
                    </h2>
                    <div className="flex gap-2">
                        <img
                            src={audio.isMuted ? "/unmute.svg" : "/mute.svg"}
                            width={24}
                            height={24}
                            alt="mute/unmute"
                            onClick={toggleMute}
                            className="cursor-pointer"
                        />
                        <Slider 
                            min={0}
                            max={1}
                            step={0.1}
                            value={[audio.volume]}
                            onValueChange={val => changeVolume(val[0])}
                            className="w-24"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

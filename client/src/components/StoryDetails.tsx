import { cn, formatTime, formatViewsWithCommas } from "@/lib/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToggleFavorite } from "@/hooks/useToggleFavorite";
import { useDeleteStory } from "@/hooks/useDeleteStory";
import { useAudio } from "@/hooks/useAudio";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAudio, setIsStoryDetailsOpen } from "@/store/slices/audioSlice";
import { Star } from "lucide-react";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";
import { ActionMenu } from "./ActionMenu";
import type { StoryDetailsProps } from "@/types/props";

export const StoryDetails: React.FC<StoryDetailsProps> = ({ 
    story,
    setIsEditing, 
}) => {
    const { user } = useAppSelector(state => state.user);
    const isOwner = user?.id === story.author.id;

    const {
        togglePlay,
        toggleMute,
        changeVolume,
        forward,
        rewind,
    } = useAudio();

    const { audio } = useAppSelector(state => state.audio);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const {
        isFavoriteState,
        isLoading,
        handleToggleFavorite,
    } = useToggleFavorite(story.id, story.isFavorite);

    const {
        isLoading: isDeleting,
        handleDeleteStory,
    } = useDeleteStory();

    useEffect(() => {
        dispatch(setIsStoryDetailsOpen(true));
        if (story.id !== audio?.storyId) {
            dispatch(setAudio({
                storyId: story.id,
                title: story.title,
                audioUrl: story.audioUrl,
                imageUrl: story.imageUrl,
                author: {
                    id: story.author.id,
                    name: story.author.name,
                },
                duration: 0,
                currentTime: 0,
                volume: audio?.volume || 1,
                isPlaying: false,
                isMuted: false,
            }));
        } else if (story.title !== audio.title || story.imageUrl !== audio.imageUrl) {
            dispatch(setAudio({
                ...audio,
                title: story.title,
                imageUrl: story.imageUrl,
            }));
        }
        
        return () => {
            dispatch(setIsStoryDetailsOpen(false));
        };
    }, [story]);

    return (
        <section className="flex flex-col">
            <header className="mt-9 flex items-center justify-between">
                <h1 className="text-[20px] leading-normal font-bold">
                    Currently Playing
                </h1>
                <figure className="flex items-center gap-2">
                    <img
                        src="/headphones.svg"
                        width={28}
                        height={28}
                        alt="headphone"
                    />
                    <h2 className="text-[16px] leading-normal text-primary-400 font-bold">{formatViewsWithCommas(story.views)}</h2>
                </figure>
            </header>
            
            <div className="mt-6 flex w-full justify-between max-md:justify-center">
                <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
                    <div className="relative">
                        <img
                            src={story.imageUrl}
                            width={380}
                            height={380}
                            alt="Story image"
                            className="aspect-square rounded-lg"
                        />
                        <button
                            onClick={() => handleToggleFavorite()}
                            className={cn("absolute top-1 right-1 transition-all", {
                                "cursor-pointer": !isLoading
                            })}
                            disabled={isLoading}
                        >
                            <Star
                                className={cn("stroke-[0.5px] fill-background-200", {
                                    "stroke-secondary-200 fill-secondary-200": isFavoriteState,
                                })}
                            />
                        </button>
                    </div>
                    <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
                        <article className="flex flex-col gap-2 max-md:items-center">
                            <h1 className="text-[32px] leading-normal font-extrabold tracking-[-0.32px]">
                                {story.title}
                            </h1>
                            <figure
                                className="flex cursor-pointer items-center gap-2 w-fit"
                                onClick={() => {
                                    navigate(`/profiles/${story.author.id}`);
                                }}
                            >
                                <img
                                    src={story.author.imageUrl}
                                    width={30}
                                    height={30}
                                    alt="Author icon"
                                    className="size-[30px] rounded-full object-cover"
                                />
                                <h2 className="text-[16px] leading-normal font-normal">{story.author.name}</h2>
                            </figure>
                        </article>

                        {audio && 
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center max-md:justify-center gap-3 md:gap-6">
                                    <img
                                        src="/rewind.svg"
                                        width={24}
                                        height={24}
                                        alt="rewind"
                                        onClick={rewind}
                                        className="cursor-pointer"
                                    />
                                    <img
                                        src={audio.isPlaying ? "/pause.svg" : "/play.svg"}
                                        width={50}
                                        height={50}
                                        alt="pause/play"
                                        onClick={togglePlay}
                                        className="cursor-pointer"
                                    />
                                    <img
                                        src="/forward.svg"
                                        width={24}
                                        height={24}
                                        alt="forward"
                                        onClick={forward}
                                        className="cursor-pointer"
                                    />
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

                                <div className="flex flex-col gap-1">
                                    <h2 className="text-[14px] leading-normal text-muted-foreground font-semibold">
                                        {formatTime(audio.currentTime)} / {formatTime(audio.duration)}
                                    </h2>
                                    <Progress
                                        value={(audio.currentTime / audio.duration!) * 100}
                                        className="h-1.5 w-xs"
                                        max={audio.duration}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {isOwner && (
                    <ActionMenu
                        deleteDialogDescription="This action cannot be undone. Are you sure you want to permanently delete this story from our servers?"
                        setIsEditing={setIsEditing}
                        isDeleting={isDeleting}
                        onDelete={() => handleDeleteStory(story.id)}
                    />
                )}
            </div>

            <div className="mt-6 flex items-start max-md:justify-center gap-3">
                <div className="flex items-center justify-center gap-1">
                    <img
                        src="/tags.svg"
                        width={30}
                        height={30}
                        alt="tags"
                    />
                    <h2 className="text-[16px] leading-normal text-primary-400 font-semibold">Tags:</h2>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <div className="flex items-center justify-center w-fit gap-1 rounded-2xl border-[1px] border-secondary-400 bg-secondary-100 py-[2px] px-2">
                        <img
                            src="/globe.svg"
                            width={20}
                            height={20}
                            alt="globe"
                        />
                        <p className="text-[15px] leading-normal font-medium">{story.language.name}</p>
                    </div>
                    <div className="flex items-center justify-center w-fit gap-1 rounded-2xl border-[1px] border-[#059669] bg-[#B2F7E1] py-[2px] px-2">
                        <img
                            src="/location.svg"
                            width={20}
                            height={20}
                            alt="location"
                        />
                        <p className="text-[15px] leading-normal font-medium">{story.region.name}</p>
                    </div>
                    <div className="flex items-center justify-center w-fit gap-1 rounded-2xl border-[1px] border-[#6A12B7] bg-[#E0C1FA] py-[2px] px-2">
                        <img
                            src="/shapes.svg"
                            width={20}
                            height={20}
                            alt="shapes"
                        />
                        <p className="text-[15px] leading-normal font-medium">{story.category.name}</p>
                    </div>
                </div>
            </div>

            <p className="text-[16px] leading-normal pb-8 pt-[45px] font-medium max-md:text-center">{story.description}</p>

            <div className="flex flex-col gap-4">
                <h1 className="text-[18px] leading-normal font-bold">Transcript</h1>
                <p className="text-[16px] leading-normal font-medium whitespace-pre-line">{story.transcript}</p>
            </div>
        </section>
    );
};

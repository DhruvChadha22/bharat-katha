import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAudioRef } from "@/providers/AudioProvider";
import { useAppDispatch } from "@/store/hooks";
import { useGetAllTags } from "@/hooks/useGetAllTags";
import { useCreateStory } from "@/hooks/useCreateStory";
import { useDeleteAudio } from "@/hooks/useDeleteAudio";
import { setAudio } from "@/store/slices/audioSlice";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { StoryInfoForm } from "@/components/StoryInfoForm";
import { GenerateAudio } from "@/components/GenerateAudio";
import { UploadImage } from "@/components/UploadImage";
import { StoryInfoFormSchema } from "@/types/form-schemas";
import { CreateStorySkeleton } from "@/components/CreateStorySkeleton";
import type { StoryTagsId } from "@/types/props";
import type { GeneratedAudio } from "@/types/audio";

const CreateStory: React.FC = () => {
    const audioRef = useAudioRef();
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(setAudio(null));
        if (audioRef.current)
            audioRef.current.src = "";
    }, []);

    const form = useForm<z.infer<typeof StoryInfoFormSchema>>({
        resolver: zodResolver(StoryInfoFormSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });
    
    const {
        languages,
        categories,
        regions,
        isLoading: isLoadingTags,
    } = useGetAllTags();

    const [selectedTags, setSelectedTags] = useState<StoryTagsId>({
        languageId: "",
        categoryId: "",
        regionId: "",
    });

    const [voiceType, setVoiceType] = useState<"Male" | "Female" | "">("");
    const [transcript, setTranscript] = useState<string>("");
    const [generatedAudio, setGeneratedAudio] = useState<GeneratedAudio>();
    const [audioDuration, setAudioDuration] = useState<number>();
    const [storyImage, setStoryImage] = useState<File | null>(null);

    const hasCreatedStoryRef = useRef<boolean>(false);
    const {
        handleDeleteAudio,
    } = useDeleteAudio({ setGeneratedAudio });

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (generatedAudio && !hasCreatedStoryRef.current) {
                handleDeleteAudio(generatedAudio.audioId);
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            handleBeforeUnload();
        };
    }, []);

    const {
        isLoading: isSubmitting,
        handleCreateStory,
    } = useCreateStory();
    const isSubmissionDisabled = !generatedAudio || !selectedTags.languageId || !selectedTags.categoryId || !selectedTags.regionId || !audioDuration || !storyImage;

    const onSubmit = ({
        title,
        description,
    }: z.infer<typeof StoryInfoFormSchema>) => {
        if (isSubmissionDisabled) return;

        handleCreateStory({
            title,
            description,
            transcript,
            audioUrl: generatedAudio.audioUrl,
            audioId: generatedAudio.audioId,
            languageId: selectedTags.languageId,
            categoryId: selectedTags.categoryId,
            regionId: selectedTags.regionId,
            duration: audioDuration,
            storyImage,
            hasCreatedStoryRef,
        });
    };

    if (isLoadingTags) {
        return (
            <CreateStorySkeleton />
        );
    }
    
    return (
        <section className="mt-10 flex flex-col">
            <h1 className="text-[20px] leading-normal font-bold">Create Story</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex flex-col max-w-[calc(100vw-80px)] sm:max-w-[calc(100vw-128px)] md:max-w-[calc(100vw-328px)] lg:max-w-[calc(100vw-400px)] xl:max-w-[calc(100vw-708px)]">
                    <StoryInfoForm
                        form={form}
                        selectedTags={selectedTags}
                        categories={categories}
                        regions={regions}
                        disabled={isSubmitting}
                        setSelectedTags={setSelectedTags}
                    />

                    <div className="flex flex-col pt-10">
                        <GenerateAudio 
                            voiceType={voiceType}
                            transcript={transcript}
                            languageId={selectedTags.languageId}
                            languages={languages}
                            generatedAudio={generatedAudio}
                            isSubmitting={isSubmitting}
                            setSelectedTags={setSelectedTags}
                            setVoiceType={setVoiceType}
                            setTranscript={setTranscript}
                            setGeneratedAudio={setGeneratedAudio}
                            setAudioDuration={setAudioDuration}
                        />

                        <div className="flex flex-col gap-4 mt-5">
                            <Label className="text-[16px] leading-normal font-bold">
                                Upload Story Image
                            </Label>
                            <UploadImage
                                disabled={isSubmitting} 
                                setImage={setStoryImage}
                            />
                        </div>
                    </div>

                    <div className="mt-10 w-full">
                        <Button 
                            type="submit" 
                            className="cursor-pointer text-[16px] leading-normal w-full bg-primary-300 py-4 font-extrabold transition-all duration-500 hover:bg-primary-400"
                            disabled={isSubmitting || isSubmissionDisabled}
                        >
                            {isSubmitting ? (
                                <>
                                    Submitting
                                    <Loader2 className="size-5 animate-spin ml-2" />
                                </>
                            ) : (
                                "Submit & Publish Story"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    );
};

export default CreateStory;

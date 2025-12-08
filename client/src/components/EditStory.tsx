import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAudioRef } from "@/providers/AudioProvider";
import { useAppDispatch } from "@/store/hooks";
import { useGetAllTags } from "@/hooks/useGetAllTags";
import { useUpdateStory } from "@/hooks/useUpdateStory";
import { setAudio } from "@/store/slices/audioSlice";
import { Loader2, X } from "lucide-react";
import { Form } from "./ui/form";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { StoryInfoForm } from "./StoryInfoForm";
import { UploadImage } from "./UploadImage";
import { StoryInfoFormSchema } from "@/types/form-schemas";
import { StoryInfoFormSkeleton } from "./StoryInfoFormSkeleton";
import { UploadImageSkeleton } from "./UploadImageSkeleton";
import type { EditStoryProps, StoryTagsId } from "@/types/props";

export const EditStory: React.FC<EditStoryProps> = ({
    storyId,
    title, 
    description,
    categoryId,
    regionId,
    imageUrl,
    setIsEditing,
}) => {
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
            title: title,
            description: description,
        },
    });
    
    const {
        categories,
        regions,
        isLoading: isLoadingTags,
    } = useGetAllTags();

    const [selectedTags, setSelectedTags] = useState<StoryTagsId>({
        languageId: "",
        categoryId: categoryId,
        regionId: regionId,
    });
    const [storyImage, setStoryImage] = useState<File | null>(null);

    const {
        isLoading: isSubmitting,
        handleUpdateStory,
    } = useUpdateStory({ setIsEditing });
    const isSubmissionDisabled = !selectedTags.categoryId || !selectedTags.regionId;

    const onSubmit = ({
        title,
        description,
    }: z.infer<typeof StoryInfoFormSchema>) => {
        if (isSubmissionDisabled) return;

        handleUpdateStory({
            storyId,
            title,
            description,
            categoryId: selectedTags.categoryId,
            regionId: selectedTags.regionId,
            storyImage,
        });
    };

    if (isLoadingTags) {
        return (
            <section className="mt-10 flex flex-col">
                <header className="flex items-center justify-between mb-12">
                    <h1 className="text-[20px] leading-normal font-bold">Edit Story</h1>
                    <button 
                        onClick={() => setIsEditing(false)}
                        className={cn("h-fit", {
                            "cursor-pointer": !isSubmitting,
                        })}
                        disabled={isSubmitting}
                    >
                        <X className="size-5" />
                    </button>
                </header>

                <StoryInfoFormSkeleton />
                <UploadImageSkeleton />

                <div className="mt-10 w-full h-9 bg-background-400 rounded-md" />
            </section>
        );
    }

    return (
        <section className="mt-10 flex flex-col">
            <header className="flex items-center justify-between">
                <h1 className="text-[20px] leading-normal font-bold">Edit Story</h1>
                <button 
                    onClick={() => setIsEditing(false)}
                    className={cn("h-fit", {
                        "cursor-pointer": !isSubmitting,
                    })}
                    disabled={isSubmitting}
                >
                    <X className="size-5" />
                </button>
            </header>

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

                    <div className="flex flex-col gap-4 mt-5">
                        <Label className="text-[16px] leading-normal font-bold">
                            Upload Story Image
                        </Label>
                        <UploadImage
                            imageUrl={imageUrl}
                            disabled={isSubmitting} 
                            setImage={setStoryImage}
                        />
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
                                "Submit & Update Story"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    );
};

import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { createStory } from "@/services/operations/stories";
import { invalidateGetPopularStories, invalidateGetTopUsers } from "@/store/slices/queryInvalidationSlice";
import type { CreateStoryRequest } from "@/types/stories";

export const useCreateStory = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleCreateStory = async ({
        title,
        description,
        transcript,
        audioUrl,
        audioId,
        languageId,
        categoryId,
        regionId,
        duration,
        storyImage,
        hasCreatedStoryRef,
    }: CreateStoryRequest) => {
        try {
            setIsLoading(true);

            const roundedDuration = Math.round(duration);

            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("transcript", transcript);
            formData.append("audioUrl", audioUrl);
            formData.append("audioId", audioId);
            formData.append("languageId", languageId);
            formData.append("categoryId", categoryId);
            formData.append("regionId", regionId);
            formData.append("duration", roundedDuration.toString());
            formData.append("storyImage", storyImage);

            const result = await createStory(formData);
            hasCreatedStoryRef.current = true;
            dispatch(invalidateGetPopularStories());
            dispatch(invalidateGetTopUsers());
            navigate(`/stories/${result.data.id}`);
            toast.success("Story created successfully");
        }
        catch (error: any) {
            toast.error("Error while creating story");
        }
        finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleCreateStory,
    };
};

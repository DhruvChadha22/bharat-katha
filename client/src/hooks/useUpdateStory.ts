import toast from "react-hot-toast";
import { useState } from "react";
import { updateStory } from "@/services/operations/stories";
import { useAppDispatch } from "@/store/hooks";
import { invalidateGetPopularStories, invalidateGetStoryById } from "@/store/slices/queryInvalidationSlice";
import type { UpdateStoryRequest } from "@/types/stories";
import type { UpdateStoryHookProps } from "@/types/props";

export const useUpdateStory = ({
    setIsEditing,
}: UpdateStoryHookProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    
    const handleUpdateStory = async ({
        storyId,
        title,
        description,
        categoryId,
        regionId,
        storyImage,
    }: UpdateStoryRequest) => {
        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("categoryId", categoryId);
            formData.append("regionId", regionId);
            if (storyImage) formData.append("storyImage", storyImage);

            await updateStory(storyId, formData);
            dispatch(invalidateGetStoryById());
            dispatch(invalidateGetPopularStories());
            setIsEditing(false);
            toast.success("Story updated successfully");
        }
        catch (error: any) {
            toast.error("Error while updating story");
        }
        finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleUpdateStory,
    };
};

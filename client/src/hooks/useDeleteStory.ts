import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { deleteStory } from "@/services/operations/stories";
import { setAudio } from "@/store/slices/audioSlice";
import { invalidateGetPopularStories, invalidateGetTopUsers } from "@/store/slices/queryInvalidationSlice";

export const useDeleteStory = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleDeleteStory = async (storyId: string) => {
        try {
            setIsLoading(true);
            await deleteStory(storyId);
            dispatch(setAudio(null));
            dispatch(invalidateGetPopularStories());
            dispatch(invalidateGetTopUsers());
            navigate("/home");
            toast.success("Story deleted successfully");
        }
        catch (error: any) {
            toast.error("Error while deleting story");
        }
        finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleDeleteStory,
    };
};

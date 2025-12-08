import { useState } from "react";
import { addStoryToFavorites, removeStoryFromFavorites } from "@/services/operations/favorites";
import toast from "react-hot-toast";

export const useToggleFavorite = (storyId: string, isFavorite: boolean) => {
    const [isFavoriteState, setIsFavoriteState] = useState<boolean>(isFavorite || false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleToggleFavorite = async () => {
        try {
            setIsLoading(true);
            let newState;
            if (!isFavoriteState) {
                await addStoryToFavorites({
                    storyId,
                });
                newState = true;
                toast.success("Added to Favorites");
            } else {
                await removeStoryFromFavorites({
                    storyId,
                });
                newState = false;
                toast.success("Removed from Favorites");
            }
            setIsFavoriteState(newState);
            return newState;
        }
        catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Internal Server Error");
            }
        }
        finally {
            setIsLoading(false);
        }
    };

    return {
        isFavoriteState,
        isLoading,
        handleToggleFavorite,
    };
};

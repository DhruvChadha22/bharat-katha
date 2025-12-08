import { useEffect, useState } from "react";
import { getFavoriteStories } from "@/services/operations/favorites";
import type { StoriesWithIsFavorite } from "@/types/stories";

export const useGetFavoriteStories = () => {
    const [favoriteStories, setFavoriteStories] = useState<StoriesWithIsFavorite>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFavoriteStories = async () => {
            try {
                setIsLoading(true);
                const result = await getFavoriteStories();
                setFavoriteStories(result.data);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchFavoriteStories();
    }, []);

    return {
        favoriteStories,
        isLoading,
    };
};

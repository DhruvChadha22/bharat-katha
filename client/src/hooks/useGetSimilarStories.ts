import type { StoriesWithIsFavorite } from "@/types/stories";
import { useEffect, useState } from "react";
import { getStoriesByCategory } from "@/services/operations/stories";

export const useGetSimilarStories = (categoryId: string, excludeId: string) => {
    const [similarStories, setSimilarStories] = useState<StoriesWithIsFavorite>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSimilarStories = async () => {
            try {
                setIsLoading(true);
                const result = await getStoriesByCategory({
                    categoryId,
                    excludeId,
                });
                setSimilarStories(result.data);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchSimilarStories();
    }, []);

    return {
        similarStories,
        isLoading,
    };
};

import { useEffect, useState } from "react";
import { getTrendingStories } from "@/services/operations/stories";
import type { StoriesWithIsFavorite } from "@/types/stories";

export const useGetTrendingStories = () => {
    const [trendingStories, setTrendingStories] = useState<StoriesWithIsFavorite>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTrendingStories = async () => {
            try {
                setIsLoading(true);
                const result = await getTrendingStories();
                setTrendingStories(result.data);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchTrendingStories();
    }, []);

    return {
        trendingStories,
        isLoading,
    };
};

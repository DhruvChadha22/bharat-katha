import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { getPopularStories } from "@/services/operations/stories";
import type { PopularStories } from "@/types/stories";

export const useGetPopularStories = () => {
    const [popularStories, setPopularStories] = useState<PopularStories>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { popularStoriesRefreshKey } = useAppSelector(state => state.queryInvalidation);

    useEffect(() => {
        const fetchPopularStories = async () => {
            try {
                setIsLoading(true);
                const result = await getPopularStories();
                setPopularStories(result.data);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchPopularStories();
    }, [popularStoriesRefreshKey]);

    return {
        popularStories,
        isLoading,
    };
};

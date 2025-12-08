import { useEffect, useState } from "react";
import { getLatestStories } from "@/services/operations/stories";
import type { LatestStories } from "@/types/stories";

export const useGetLatestStories = () => {
    const [latestStories, setLatestStories] = useState<LatestStories>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLatestStories = async () => {
            try {
                setIsLoading(true);
                const result = await getLatestStories();
                setLatestStories(result.data);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchLatestStories();
    }, []);

    return {
        latestStories,
        isLoading,
    };
};

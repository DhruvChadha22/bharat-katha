import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { getStoryById } from "@/services/operations/stories";
import type { Story } from "@/types/stories";

export const useGetStoryById = (storyId: string) => {
    const [story, setStory] = useState<Story>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { storyByIdRefreshKey } = useAppSelector(state => state.queryInvalidation);

    useEffect(() => {
        const fetchStoryById = async () => {
            try {
                setIsLoading(true);
                const result = await getStoryById({ storyId });
                setStory(result.data);
            }
            finally {
                setIsLoading(false);
            }
        };
        
        fetchStoryById();
    }, [storyId, storyByIdRefreshKey]);

    return {
        story,
        isLoading,
    };
};

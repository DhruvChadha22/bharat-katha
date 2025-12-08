import { useEffect, useState } from "react";
import { getStoriesBySearch } from "@/services/operations/stories";
import type { StoriesWithIsFavorite } from "@/types/stories";
import type { GetStoriesBySearchProps } from "@/types/props";

export const useGetStoriesBySearch = ({
    searchParams,
    languages,
    categories,
    regions,
}: GetStoriesBySearchProps) => {
    const [stories, setStories] = useState<StoriesWithIsFavorite>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!languages.length || !categories.length || !regions.length) return;

        const search = searchParams.get("search") || undefined;
        const language = searchParams.get("language");
        const category = searchParams.get("category");
        const region = searchParams.get("region");

        const languageId = languages.find(l => l.name === language)?.id;
        const categoryId = categories.find(c => c.name === category)?.id;
        const regionId = regions.find(r => r.name === region)?.id;

        const fetchStoriesBySearch = async () => {
            try {
                setIsLoading(true);
                const result = await getStoriesBySearch({
                    search,
                    languageId,
                    categoryId,
                    regionId,
                });
                setStories(result.data);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchStoriesBySearch();
    }, [searchParams, languages, categories, regions]);

    return {
        stories,
        isLoading,
    };
};

import { useEffect, useState } from "react";
import { getStoriesByAuthor } from "@/services/operations/stories";
import type { GetStoriesByAuthorProps } from "@/types/props";
import type { Pagination, StoriesWithIsFavorite } from "@/types/stories";

export const useGetStoriesByAuthor = ({
    authorId,
    searchParams,
    setSearchParams,
}: GetStoriesByAuthorProps) => {
    const [stories, setStories] = useState<StoriesWithIsFavorite>([]);
    const [pagination, setPagination] = useState<Pagination>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getValidParam = (param: string | null) => {
            if (!param) return undefined;
            const num = Number(param);
            return Number.isInteger(num) && num > 0 ? param : undefined;
        };

        const validPage = getValidParam(searchParams.get("page"));
        const validLimit = getValidParam(searchParams.get("limit"));

        const params = new URLSearchParams(searchParams);
        let shouldUpdate = false;

        if (!validPage && params.has("page")) {
            params.delete("page");
            shouldUpdate = true;
        }
        if (!validLimit && params.has("limit")) {
            params.delete("limit");
            shouldUpdate = true;
        }

        if (shouldUpdate) {
            setSearchParams(params);
            return;
        }

        const fetchStoriesByAuthor = async () => {
            try {
                setIsLoading(true);
                const result = await getStoriesByAuthor({
                    authorId,
                    page: validPage,
                    limit: validLimit,
                });
                setStories(result.data.stories);
                setPagination(result.data.pagination);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchStoriesByAuthor();
    }, [authorId, searchParams]);

    return {
        stories,
        pagination,
        isLoading,
    };
};

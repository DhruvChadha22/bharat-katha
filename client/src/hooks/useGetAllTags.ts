import { useEffect, useState } from "react";
import { getAllLanguages } from "@/services/operations/languages";
import { getAllCategories } from "@/services/operations/categories";
import { getAllRegions } from "@/services/operations/regions";
import type { Languages } from "@/types/languages";
import type { Categories } from "@/types/categories";
import type { Regions } from "@/types/regions";

export const useGetAllTags = () => {
    const [languages, setLanguages] = useState<Languages>([]);
    const [categories, setCategories] = useState<Categories>([]);
    const [regions, setRegions] = useState<Regions>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAllFilters = async () => {
            try {
                setIsLoading(true);

                const [languagesResult, categoriesResult, regionsResult] = await Promise.all([
                    getAllLanguages(),
                    getAllCategories(),
                    getAllRegions(),
                ]);

                setLanguages(languagesResult.data);
                setCategories(categoriesResult.data);
                setRegions(regionsResult.data);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchAllFilters();
    }, []);

    return {
        languages,
        categories,
        regions,
        isLoading,
    };
};

import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetAllTags } from "@/hooks/useGetAllTags";
import { useGetStoriesBySearch } from "@/hooks/useGetStoriesBySearch";
import { ListFilter, ListFilterPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Filters } from "@/components/Filters";
import { Searchbar } from "@/components/Searchbar";
import { StoryCard } from "@/components/StoryCard";
import { EmptyState } from "@/components/EmptyState";
import { StoryCardSkeleton } from "@/components/StoryCardSkeleton";
import type { UpdateQueryParamFn } from "@/types/props";

const Discover: React.FC = () => {
    const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const {
        languages,
        categories,
        regions,
        isLoading: isLoadingTags,
    } = useGetAllTags();

    const {
        stories,
        isLoading: isLoadingStories,
    } = useGetStoriesBySearch({ searchParams, languages, categories, regions });

    const updateParams: UpdateQueryParamFn = (key, value) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        setSearchParams(params);
    };

    const appliedFiltersCount = useMemo(() => {
        let count = 0;
        
        if (searchParams.get("language")) count++; 
        if (searchParams.get("category")) count++; 
        if (searchParams.get("region")) count++;
        
        return count;
    }, [searchParams]);

    const clearFilters = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("region");
        params.delete("language");
        params.delete("category");
        setSearchParams(params);
    };

    return (
        <div className="flex flex-col gap-9">
            <Searchbar 
                search={searchParams.get("search") || ""}
                setSearch={(val) => updateParams("search", val)}
            />
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-[20px] leading-normal font-bold">
                        {isFiltersOpen
                            ? "Apply Filters to Search"
                            : (
                                !searchParams.get("search") 
                                ? "Discover Community Stories" 
                                : `Search results for ${searchParams.get("search")}`
                            )
                        }
                    </h1>
                    <Button
                        onClick={() => setIsFiltersOpen(prev => !prev)}
                        disabled={isLoadingTags}
                        className={cn(
                            "cursor-pointer",
                            isFiltersOpen ? "bg-primary-300 text-white hover:bg-primary-400" : "text-black bg-secondary-300 hover:bg-secondary-300",
                        )}
                    >
                        {isFiltersOpen
                            ? <ListFilterPlus className="size-4 stroke-3" />
                            : <ListFilter className="size-4 stroke-3" /> 
                        }
                        <span className="text-[14px] leading-normal font-semibold">
                            {isFiltersOpen ? "Apply" : "Filters"}
                        </span>
                        {appliedFiltersCount > 0 &&
                            <p 
                                className={cn(
                                    "text-[10px] leading-normal py-0.5 px-1.5 rounded-full",
                                    isFiltersOpen ? "bg-secondary-300 text-black" : "bg-primary-300 text-white",
                                )}
                            >{appliedFiltersCount}</p>
                        }
                    </Button>
                </div>
                {
                    isFiltersOpen
                    ? (
                        <Filters 
                            languages={languages}
                            categories={categories}
                            regions={regions}
                            values={{
                                language: searchParams.get("language") || "",
                                category: searchParams.get("category") || "",
                                region: searchParams.get("region") || "",
                            }}
                            onChange={updateParams}
                            onClear={clearFilters}
                        />
                    ) : (
                        isLoadingStories
                        ? (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                                {[...Array(8)].map((_, index) => (
                                    <StoryCardSkeleton key={index} />
                                ))}
                            </div>
                        ) : (
                            stories.length > 0
                            ? (
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                                    {stories.map(({ id, title, imageUrl, author, language, isFavorite }) => (
                                        <StoryCard
                                            key={id}
                                            id={id}
                                            title={title}
                                            imageUrl={imageUrl}
                                            author={author}
                                            language={language}
                                            isFavorite={isFavorite}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState
                                    title="No results found"
                                />
                            )
                        )
                    )
                }
            </div>
        </div>
    );
};

export default Discover;

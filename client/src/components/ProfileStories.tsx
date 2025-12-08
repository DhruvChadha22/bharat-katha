import { useGetStoriesByAuthor } from "@/hooks/useGetStoriesByAuthor";
import { useParams, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StoryCard } from "./StoryCard";
import { StoryCardSkeleton } from "./StoryCardSkeleton";
import { EmptyState } from "./EmptyState";

export const ProfileStories: React.FC = () => {
    const { profileId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const {
        stories,
        pagination,
        isLoading,
    } = useGetStoriesByAuthor({ authorId: profileId || "", searchParams, setSearchParams });

    const onClickPrev = () => {
        const currentPage = Number(searchParams.get("page") || "1");
        if (currentPage <= 1) return;
        const params = new URLSearchParams(searchParams);
        params.set("page", String(currentPage - 1));
        setSearchParams(params);
    };
    
    const onClickNext = () => {
        const currentPage = Number(searchParams.get("page") || "1");
        if (pagination && currentPage >= pagination.totalPages) return;
        const params = new URLSearchParams(searchParams);
        params.set("page", String(currentPage + 1));
        setSearchParams(params);
    };

    return (
        <section className="mt-9 flex flex-col gap-5">
            <h1 className="text-[20px] leading-normal font-bold">All Stories</h1>
            {
                isLoading
                ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {[...Array(4)].map((_, index) => (
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
            }
            {
                (pagination && pagination.page <= pagination.totalPages && stories.length > 0) && (
                    <div className="flex items-center justify-center gap-4">
                        <Button
                            size="icon"
                            variant="ghost" 
                            disabled={pagination?.page === 1} 
                            onClick={onClickPrev}
                            className="cursor-pointer hover:bg-background-400"
                        >
                            <ChevronLeft className="size-8 stroke-2 stroke-primary-300" />
                        </Button>
                        <div className="flex items-center gap-4 text-[16px] leading-normal font-bold">
                            <p>Page</p>
                            <span className="rounded-md px-3 py-2 bg-primary-300 text-white">{pagination?.page}</span>
                            <p>of</p>
                            <span className="rounded-md px-3 py-2 bg-background-300">{pagination?.totalPages}</span>
                        </div>
                        <Button 
                            size="icon"
                            variant="ghost" 
                            disabled={pagination?.page === pagination?.totalPages} 
                            onClick={onClickNext}
                            className="cursor-pointer hover:bg-background-400"
                        >
                            <ChevronRight className="size-8 stroke-2 stroke-primary-300" />
                        </Button>
                    </div>
                )
            }
        </section>
    );
};

import { Link } from "react-router-dom";
import { StoryCard } from "./StoryCard";
import { useGetTrendingStories } from "@/hooks/useGetTrendingStories";
import { StoryCardSkeleton } from "./StoryCardSkeleton";
import { EmptyState } from "./EmptyState";

export const TrendingStories: React.FC = () => {
    const { trendingStories, isLoading } = useGetTrendingStories();

    return (
        <section className="flex flex-col gap-5">
            <header className="flex items-center justify-between">
                <h1 className="text-[20px] leading-normal font-bold">Trending Stories</h1>
                <Link to="/discover" className="text-[16px] leading-normal font-semibold text-primary-300">
                    See all
                </Link>
            </header>

            {
                isLoading
                ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {[...Array(4)].map((_, index) => (
                            <StoryCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    trendingStories.length > 0
                    ? (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                            {trendingStories.map(({ id, title, imageUrl, author, language, isFavorite }) => (
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
                            title="No trending stories found"
                        />
                    )
                )
            }
        </section>
    );
};

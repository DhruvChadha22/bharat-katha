import { useGetSimilarStories } from "@/hooks/useGetSimilarStories";
import { StoryCard } from "./StoryCard";
import { EmptyState } from "./EmptyState";
import { StoryCardSkeleton } from "./StoryCardSkeleton";
import type { Story } from "@/types/stories";

export const SimilarStories: React.FC<{ story: Story }> = ({ story }) => {
    const { similarStories, isLoading } = useGetSimilarStories(story.category.id, story.id);

    return (
        <section className="mt-8 flex flex-col gap-5">
            <h1 className="text-[20px] leading-normal font-bold">Similar Stories</h1>
            {
                isLoading
                ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {[...Array(4)].map((_, index) => (
                            <StoryCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    similarStories.length > 0 
                    ? (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                            {similarStories.map(({ id, title, imageUrl, author, language, isFavorite }) => (
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
                            title="No similar stories found"
                            buttonLink="/discover"
                            buttonText="Discover more stories"
                        />
                    )
                )
            }
        </section>
    );
};

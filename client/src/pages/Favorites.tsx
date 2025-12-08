import { EmptyState } from "@/components/EmptyState";
import { StoryCard } from "@/components/StoryCard";
import { StoryCardSkeleton } from "@/components/StoryCardSkeleton";
import { useEffect, useState } from "react";
import { useGetFavoriteStories } from "@/hooks/useGetFavoriteStories";

const Favorites: React.FC = () => {
    const { 
        favoriteStories: fetchedFavorites, 
        isLoading, 
    } = useGetFavoriteStories();

    const [favoriteStories, setFavoriteStories] = useState(fetchedFavorites);

    useEffect(() => {
        setFavoriteStories(fetchedFavorites);
    }, [fetchedFavorites]);
    
    const handleUnfavorite = (storyId: string) => {
        setFavoriteStories(prev => prev.filter((story) => story.id !== storyId));
    };

    return (
        <section className="flex flex-col gap-5 mt-9">
            <header className="flex items-center justify-between">
                <h1 className="text-[20px] leading-normal font-bold">Your Favorites</h1>
            </header>

            {
                isLoading
                ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {[...Array(8)].map((_, index) => (
                            <StoryCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    favoriteStories.length > 0
                    ? (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                            {favoriteStories.map(({ id, title, imageUrl, author, language, isFavorite }) => (
                                <StoryCard
                                    key={id}
                                    id={id}
                                    title={title}
                                    imageUrl={imageUrl}
                                    author={author}
                                    language={language}
                                    isFavorite={isFavorite}
                                    onUnfavorite={(id) => handleUnfavorite(id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No Stories marked as Favorite"
                            buttonLink="/discover"
                            buttonText="Discover more stories"
                        />
                    )
                )
            }
        </section>
    );
};

export default Favorites;

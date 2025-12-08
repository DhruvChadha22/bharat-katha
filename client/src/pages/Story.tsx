import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetStoryById } from "@/hooks/useGetStoryById";
import { StoryDetails } from "@/components/StoryDetails";
import { SimilarStories } from "@/components/SimilarStories";
import { EmptyState } from "@/components/EmptyState";
import { EditStory } from "@/components/EditStory";
import { StoryDetailsSkeleton } from "@/components/StoryDetailsSkeleton";

const Story: React.FC = () => {
    const { storyId } = useParams();

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const { 
        story, 
        isLoading,
    } = useGetStoryById(storyId || "");

    useEffect(() => {
        if (!isEditing) {
            window.scrollTo(0, 0);
        }
    }, [isEditing]);

    if (isLoading) {
        return (
            <StoryDetailsSkeleton />
        );
    }

    if (!story) {
        return (
            <div className="h-[calc(100vh-140px)]">
                <EmptyState
                    title="Story no longer Available"
                    buttonLink="/discover"
                    buttonText="Discover more stories"
                />
            </div>
        );
    }

    return (
        <section className="flex w-full flex-col">
            {
                !isEditing
                ? (
                    <>
                        <StoryDetails 
                            story={story} 
                            setIsEditing={setIsEditing}
                        />
                        <SimilarStories story={story} />
                    </>
                ) : (
                    <EditStory
                        storyId={story.id}
                        title={story.title}
                        description={story.description}
                        categoryId={story.category.id}
                        regionId={story.region.id}
                        imageUrl={story.imageUrl}
                        setIsEditing={setIsEditing}
                    />
                )
            }
        </section>
    );
};

export default Story;

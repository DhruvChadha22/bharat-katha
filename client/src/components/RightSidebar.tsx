import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { useGetTopUsers } from "@/hooks/useGetTopUsers";
import { UserButton } from "./UserButton";
import { TopUserCard } from "./TopUserCard";
import { TopUserCardSkeleton } from "./TopUserCardSkeleton";
import { EmptyState } from "./EmptyState";
import { EmblaCarousel } from "./EmblaCarousel";
import { useGetPopularStories } from "@/hooks/useGetPopularStories";
import { Link } from "react-router-dom";

export const RightSidebar: React.FC = () => {
    const {
        popularStories,
        isLoading: isLoadingPopularStories,
    } = useGetPopularStories();
    const { 
        topUsers, 
        isLoading: isLoadingTopUsers, 
    } = useGetTopUsers();

    const { audio, isStoryDetailsOpen } = useAppSelector(state => state.audio);

    return (
        <section className={cn("sticky right-0 top-0 flex w-[310px] flex-col border-none bg-background-300 px-[30px] pt-8 max-xl:hidden h-screen overflow-y-auto no-scrollbar", {
            "h-[calc(100vh-118px)]": audio?.audioUrl && !isStoryDetailsOpen,
        })}>
            <UserButton />
            <section>
                <header className="flex items-center justify-between pb-6">
                    <h1 className="text-[18px] leading-normal font-bold">Popular Stories</h1>
                    <Link to="/discover" className="text-[16px] leading-normal font-semibold text-primary-300">
                        See all
                    </Link>
                </header>
                {
                    isLoadingPopularStories
                    ? (
                        <div className="w-[250px] h-[250px] bg-background-400 rounded-xl animate-pulse" />
                    ) : (
                        popularStories.length > 0
                        ? (
                            <EmblaCarousel
                                popularStories={popularStories}
                            />
                        ) : (
                            <EmptyState
                                title="No stories found"
                            />
                        )
                    )
                }
            </section>
            <section className="flex flex-col gap-6 pt-6">
                <h1 className="text-[18px] leading-normal font-bold">Top Collaborators</h1>
                <div className="flex flex-col gap-6">
                    {
                        isLoadingTopUsers
                        ? (
                            [...Array(4)].map((_, index) => (
                                <TopUserCardSkeleton key={index} />
                            ))
                        ) : (
                            topUsers.length > 0
                            ? (
                                topUsers.map(({ id, name, imageUrl, totalStories }) => (
                                    <TopUserCard
                                        key={id}
                                        id={id}
                                        name={name}
                                        imageUrl={imageUrl}
                                        totalStories={totalStories}
                                    />
                                ))
                            ) : (
                                <EmptyState
                                    title="No users found"
                                />
                            )
                        )
                    }
                </div>
            </section>
        </section>
    );
};

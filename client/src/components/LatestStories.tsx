import { formatTime, formatViewsWithSuffix } from "@/lib/utils";
import { useGetLatestStories } from "@/hooks/useGetLatestStories";
import { Link, useNavigate } from "react-router-dom";
import { EmptyState } from "./EmptyState";
import { LatestStoriesSkeleton } from "./LatestStoriesSkeleton";

export const LatestStories: React.FC = () => {
    const {
        latestStories,
        isLoading,
    } = useGetLatestStories();

    const navigate = useNavigate();
    
    return (
        <section className="flex flex-col gap-5">
            <header className="flex items-center justify-between">
                <h1 className="text-[20px] leading-normal font-bold">Latest Stories</h1>
                <Link to="/discover" className="text-[16px] leading-normal font-semibold text-primary-300">
                    See all
                </Link>
            </header>

            {
                isLoading
                ? (
                    <LatestStoriesSkeleton />
                ) : (
                    latestStories.length > 0
                    ? (
                        <div className="flex flex-col gap-4 overflow-x-hidden">
                            {latestStories.map(({ id, title, imageUrl, duration, views, language }, index) => (
                                <div 
                                    key={id}
                                    className="cursor-pointer flex items-center justify-start lg:justify-between gap-4 pb-4 border-b-2 border-background-400 group"
                                    onClick={() => navigate(`/stories/${id}`)}
                                >
                                    <div className="flex items-center gap-4 max-w-[360px] 2xl:max-w-[420px] group-hover:text-primary-300">
                                        <span className="font-bold">{index + 1}</span>
                                        <img
                                            src={imageUrl}
                                            width={50}
                                            height={50}
                                            className="rounded-md"
                                            alt="Story image"
                                        />
                                        <h1 className="text-[16px] leading-normal truncate font-bold">{title}</h1>                                           
                                    </div>
                                    <div className="flex items-center justify-start gap-4 w-2xs max-lg:hidden">
                                        <figure className="flex items-center gap-2 w-20">
                                            <img
                                                src="/headphones.svg"
                                                width={25}
                                                height={25}
                                                alt="views"
                                            />
                                            <h2 className="text-[16px] leading-normal text-primary-400 font-bold">{formatViewsWithSuffix(views)}</h2>
                                        </figure>
                                        <figure className="flex gap-2 w-20">
                                            <img
                                                src="/clock.svg"
                                                width={25}
                                                height={25}
                                                alt="duration"
                                            />
                                            <h2 className="text-[16px] leading-normal font-bold">{formatTime(duration)}</h2>
                                        </figure>
                                        <div className="flex items-center justify-center w-fit gap-1 rounded-2xl border-[1px] border-secondary-400 bg-secondary-100 py-[2px] pl-1.5 pr-2">
                                            <img
                                                src="/globe.svg"
                                                width={14}
                                                height={14}
                                                alt="globe"
                                            />
                                            <p className="text-[12px] leading-normal font-semibold">{language.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No latest stories found"
                        />
                    )
                )
            }
        </section>
    );
};

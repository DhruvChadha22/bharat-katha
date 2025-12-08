
export const StoryCardSkeleton: React.FC = () => {

    return (
        <div className="bg-background-100 rounded-xl shadow-sm shadow-background-400 animate-pulse">
            <figure className="flex flex-col gap-2">
                <div className="aspect-square h-fit w-full rounded-t-xl bg-background-400" />

                <div className="flex flex-col px-2 pb-2 rounded-t-xl">
                    <div className="h-4 w-3/4 bg-background-400 rounded mt-2" />
                    <div className="h-3 w-1/2 bg-background-400 rounded mt-1" />
                </div>
            </figure>
        </div>
    );
};

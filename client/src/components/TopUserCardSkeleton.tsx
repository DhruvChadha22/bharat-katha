
export const TopUserCardSkeleton: React.FC = () => {

    return (
        <div className="flex justify-between items-center py-2 animate-pulse">
            <figure className="flex items-center gap-2">
                <div className="w-[44px] h-[44px] bg-background-400 rounded-lg" />
                <div className="h-[16px] w-24 bg-background-400 rounded-md" />
            </figure>

            <div className="h-[16px] w-16 bg-background-400 rounded-md" />
        </div>
    );
};

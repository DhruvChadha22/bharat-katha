
export const LatestStoriesSkeleton: React.FC = () => {

    return (
        <div className="flex flex-col gap-4 overflow-x-hidden">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center justify-start lg:justify-between gap-4 pb-4 border-b-2 border-background-400 group animate-pulse">
                    <div className="flex items-center gap-4 max-w-[360px] 2xl:max-w-[420px]">
                        <div className="w-3 h-6 bg-background-400 rounded-md" />
                        <div className="w-12 h-12 bg-background-400 rounded-md" />
                        <div className="w-3xs h-6 bg-background-400 rounded-md" />
                    </div>

                    <div className="flex items-center justify-start gap-4 w-2xs max-lg:hidden">
                        <div className="flex items-center gap-2 w-20">
                            <div className="w-6 h-6 bg-background-400 rounded-md" />
                            <div className="w-12 h-4 bg-background-400 rounded-md" />
                        </div>
                        <div className="flex items-center gap-2 w-20">
                            <div className="w-6 h-6 bg-background-400 rounded-md" />
                            <div className="w-12 h-4 bg-background-400 rounded-md" />
                        </div>
                        <div className="flex items-center justify-center w-fit gap-1 rounded-2xl border-[1px] border-secondary-400 bg-secondary-100 py-[2px] px-2">
                            <div className="w-16 h-4 bg-background-400 rounded-md" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

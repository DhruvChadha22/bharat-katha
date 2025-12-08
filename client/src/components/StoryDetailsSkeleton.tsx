
export const StoryDetailsSkeleton: React.FC = () => {

    return (
        <section className="flex flex-col">
            <header className="mt-9 flex items-center justify-between">
                <div className="w-32 h-6 bg-background-400 rounded-md animate-pulse" />
                <figure className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-background-400 rounded-full animate-pulse" />
                    <div className="w-16 h-4 bg-background-400 rounded-md animate-pulse" />
                </figure>
            </header>

            <div className="mt-6 flex w-full justify-between max-md:justify-center">
                <div className="flex flex-col w-full gap-8 max-md:items-center md:flex-row">
                    <div className="w-[380px] md:w-1/3 aspect-square bg-background-400 rounded-lg animate-pulse" />

                    <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-9">
                        <article className="flex flex-col gap-2 max-md:items-center">
                            <div className="w-56 h-12 bg-background-400 rounded-md animate-pulse" />
                            <figure className="flex cursor-pointer items-center gap-2 w-fit">
                                <div className="w-8 h-8 bg-background-400 rounded-full animate-pulse" />
                                <div className="w-24 h-4 bg-background-400 rounded-md animate-pulse" />
                            </figure>
                        </article>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center max-md:justify-center gap-3 md:gap-6">
                                <div className="w-6 h-6 bg-background-400 rounded-md animate-pulse" />
                                <div className="w-12 h-12 bg-background-400 rounded-full animate-pulse" />
                                <div className="w-6 h-6 bg-background-400 rounded-md animate-pulse" />
                                <div className="w-6 h-6 bg-background-400 rounded-md animate-pulse" />
                                <div className="w-24 h-3 bg-background-400 rounded-md animate-pulse" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="w-24 h-4 bg-background-400 rounded-md animate-pulse" />
                                <div className="w-full h-1.5 bg-background-400 rounded-md animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center max-md:justify-center gap-3">
                <div className="flex items-center justify-center gap-1">
                    <div className="w-8 h-8 bg-background-400 rounded-md animate-pulse" />
                    <div className="w-16 h-4 bg-background-400 rounded-md animate-pulse" />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                    {[...Array(3)].map((_, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-center w-fit gap-1 rounded-2xl border-[1px] border-background-400 bg-background-300 py-[2px] px-2 animate-pulse"
                        >
                            <div className="w-5 h-5 bg-background-400 rounded-md animate-pulse" />
                            <div className="w-16 h-4 bg-background-400 rounded-md animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="pb-8 pt-[45px] max-md:text-center">
                <div className="w-full h-10 bg-background-400 rounded-md animate-pulse mt-2" />
            </div>

            <div className="flex flex-col gap-4 mt-6">
                <div className="w-32 h-6 bg-background-400 rounded-md animate-pulse" />
                <div className="w-full h-40 bg-background-400 rounded-md animate-pulse mt-2" />
            </div>
        </section>
    );
};

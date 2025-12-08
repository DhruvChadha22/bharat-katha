
export const ProfileDetailsSkeleton: React.FC = () => {

    return (
        <section className="mt-9 flex flex-col">
            <header className="flex items-center justify-between">
                <h1 className="text-[20px] leading-normal font-bold max-md:text-center">
                    Creator Profile
                </h1>
            </header>

            <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
                <div className="flex w-full justify-between max-md:justify-center">
                    <div className="flex flex-col gap-6 max-md:items-center md:flex-row">
                        <div className="w-[250px] h-[250px] bg-background-400 rounded-lg animate-pulse" />

                        <div className="flex flex-col max-md:items-center">
                            <div className="w-44 h-12 bg-background-400 rounded-md animate-pulse" />

                            <figure className="flex items-center gap-3 pt-6 pb-3">
                                <div className="w-7 h-7 bg-background-400 rounded-full animate-pulse" />
                                <div className="w-32 h-4 bg-background-400 rounded-md animate-pulse" />
                            </figure>

                            <figure className="flex items-center gap-3 py-3">
                                <div className="w-7 h-7 bg-background-400 rounded-full animate-pulse" />
                                <div className="w-32 h-4 bg-background-400 rounded-md animate-pulse" />
                            </figure>

                            <figure className="flex items-center gap-3 py-3">
                                <div className="w-7 h-7 bg-background-400 rounded-full animate-pulse" />
                                <div className="w-32 h-4 bg-background-400 rounded-md animate-pulse" />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

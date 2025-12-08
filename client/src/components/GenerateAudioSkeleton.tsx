
export const GenerateAudioSkeleton: React.FC = () => {

    return (
        <div className="flex flex-col pt-10 gap-[30px] animate-pulse">
            <div className="flex flex-col gap-2.5">
                <div className="w-28 h-6 bg-background-400 rounded-md" />
                <div className="w-full h-9 bg-background-400 rounded-[6px]" />
            </div>
            <div className="flex flex-col gap-2.5">
                <div className="w-36 h-6 bg-background-400 rounded-md" />
                <div className="w-full h-9 bg-background-400 rounded-[6px]" />
            </div>
            <div className="flex flex-col gap-2.5">
                <div className="w-56 h-6 bg-background-400 rounded-md" />
                <div className="w-full h-60 bg-background-400 rounded-[6px]" />
            </div>
            <div className="w-36 h-9 bg-background-400 rounded-md" />
        </div>
    );
};

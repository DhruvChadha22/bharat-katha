
export const StoryInfoFormSkeleton: React.FC = () => {

    return (
        <div className="flex flex-col gap-[30px] border-b-2 border-background-400 pb-10 animate-pulse">
            <div className="flex flex-col gap-2.5">
                <div className="w-20 h-6 bg-background-400 rounded-md" />
                <div className="w-full h-9 bg-background-400 rounded-[6px]" />
            </div>
            <div className="flex flex-col gap-2.5">
                <div className="w-32 h-6 bg-background-400 rounded-md" />
                <div className="w-full h-24 bg-background-400 rounded-[6px]" />
            </div>
            <div className="flex flex-col gap-2.5">
                <div className="w-28 h-6 bg-background-400 rounded-md" />
                <div className="w-full h-9 bg-background-400 rounded-[6px]" />
            </div>
            <div className="flex flex-col gap-2.5">
                <div className="w-24 h-6 bg-background-400 rounded-md" />
                <div className="w-full h-9 bg-background-400 rounded-[6px]" />
            </div>
        </div>
    );
};

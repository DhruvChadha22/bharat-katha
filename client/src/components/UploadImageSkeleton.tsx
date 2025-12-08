
export const UploadImageSkeleton: React.FC = () => {

    return (
        <div className="flex flex-col gap-4 mt-5 animate-pulse">
            <div className="w-48 h-6 bg-background-400 rounded-md" />
            <div className="w-[250px] h-[250px] bg-background-400 rounded-lg" />
        </div>
    );
};

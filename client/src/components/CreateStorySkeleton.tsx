import { GenerateAudioSkeleton } from "./GenerateAudioSkeleton";
import { StoryInfoFormSkeleton } from "./StoryInfoFormSkeleton";
import { UploadImageSkeleton } from "./UploadImageSkeleton";

export const CreateStorySkeleton: React.FC = () => {

    return (
        <section className="mt-10 flex flex-col">
            <h1 className="text-[20px] leading-normal font-bold mb-12">Create Story</h1>

            <StoryInfoFormSkeleton />
            <GenerateAudioSkeleton />
            <UploadImageSkeleton />

            <div className="mt-10 w-full h-9 bg-background-400 rounded-md" />
        </section>
    );
};

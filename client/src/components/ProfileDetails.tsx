import { formatDate, formatViewsWithCommas } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { useDeleteProfile } from "@/hooks/useDeleteProfile";
import { ActionMenu } from "./ActionMenu";
import type { ProfileDetailsProps } from "@/types/props";

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({ 
    profile,
    setIsEditing, 
}) => {
    const { user } = useAppSelector(state => state.user);
    const isOwner = user?.id === profile.id;

    const {
        isLoading: isDeleting,
        handleDeleteProfile,
    } = useDeleteProfile();

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
                        <img
                            src={profile.imageUrl}
                            width={250}
                            height={250}
                            alt="profile-img"
                            className="aspect-square rounded-lg"
                        />
                        <div className="flex flex-col max-md:items-center">
                            <h1 className="text-[32px] leading-normal font-extrabold tracking-[-0.32px]">
                                {profile.name}
                            </h1>
                            <figure className="flex items-center gap-3 pt-6 pb-3">
                                <img
                                    src="/headphones.svg"
                                    width={28}
                                    height={28}
                                    alt="headphones"
                                />
                                <h2 className="text-[16px] leading-normal font-semibold">
                                    {formatViewsWithCommas(profile.totalListeners)} &nbsp;
                                    <span className="font-normal">total listeners</span>
                                </h2>
                            </figure>
                            <figure className="flex items-center gap-3 py-3">
                                <img
                                    src="/book.svg"
                                    width={28}
                                    height={28}
                                    alt="book"
                                />
                                <h2 className="text-[16px] leading-normal font-semibold">
                                    {profile.totalStories} &nbsp;
                                    <span className="font-normal">stories</span>
                                </h2>
                            </figure>
                            <figure className="flex items-center gap-3 py-3">
                                <img
                                    src="/info.svg"
                                    width={28}
                                    height={28}
                                    alt="info"
                                />
                                <h2 className="text-[16px] leading-normal font-semibold">
                                    <span className="font-normal">Joined &nbsp;</span>
                                    {formatDate(profile.createdAt)} &nbsp;
                                </h2>
                            </figure>
                        </div>
                    </div>
                    {isOwner && (
                        <ActionMenu
                            deleteDialogDescription="This action cannot be undone. Are you sure you want to permanently delete your profile and all it's stories from our servers?"
                            setIsEditing={setIsEditing}
                            isDeleting={isDeleting}
                            onDelete={handleDeleteProfile}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

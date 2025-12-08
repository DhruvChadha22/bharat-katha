import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import { ProfileDetails } from "@/components/ProfileDetails";
import { EmptyState } from "@/components/EmptyState";
import { EditProfile } from "@/components/EditProfile";
import { ProfileStories } from "@/components/ProfileStories";
import { ProfileDetailsSkeleton } from "@/components/ProfileDetailsSkeleton";

const Profile: React.FC = () => {
    const { profileId } = useParams();

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const {
        profile,
        isLoading,
    } = useGetUserProfile(profileId || "");

    if (isLoading) {
        return (
            <ProfileDetailsSkeleton />
        );
    }

    if (!profile) {
        return (
            <div className="h-[calc(100vh-140px)]">
                <EmptyState
                    title="Profile no longer available"
                />
            </div>
        );
    }

    return (
        <>
            {
                !isEditing
                ? (
                    <ProfileDetails
                        profile={profile}
                        setIsEditing={setIsEditing}
                    />    
                ) : (
                    <EditProfile
                        name={profile.name}
                        imageUrl={profile.imageUrl}
                        setIsEditing={setIsEditing}
                    />
                )
            }
            <ProfileStories />
        </>
    );
};

export default Profile;

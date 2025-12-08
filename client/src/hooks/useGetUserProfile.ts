import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { getUserById } from "@/services/operations/users";
import type { UserProfile } from "@/types/users";

export const useGetUserProfile = (profileId: string) => {
    const [profile, setProfile] = useState<UserProfile>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { userProfileRefreshKey } = useAppSelector(state => state.queryInvalidation);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setIsLoading(true);
                const result = await getUserById(profileId);
                setProfile(result.data);
            }
            finally {
                setIsLoading(false);
            }
        };
        
        fetchUserProfile();
    }, [profileId, userProfileRefreshKey]);

    return {
        profile,
        isLoading,
    };
};

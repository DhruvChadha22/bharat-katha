import type { TopUsers } from "@/types/users";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { getTopUsers } from "@/services/operations/users";

export const useGetTopUsers = () => {
    const [topUsers, setTopUsers] = useState<TopUsers>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { topUsersRefreshKey } = useAppSelector(state => state.queryInvalidation);

    useEffect(() => {
        const fetchTopUsers = async () => {
            try {
                setIsLoading(true);
                const result = await getTopUsers();
                setTopUsers(result.data);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchTopUsers();
    }, [topUsersRefreshKey]);

    return {
        topUsers,
        isLoading,
    };
};

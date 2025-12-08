import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setIsLoading, setUser } from "@/store/slices/userSlice";
import { getUser } from "@/services/operations/users";

export const useGetUser = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                dispatch(setIsLoading(true));
                const result = await getUser();
                dispatch(setUser(result.data));
            }
            finally {
                dispatch(setIsLoading(false));
            }
        };
        fetchUser();
    }, []);
};

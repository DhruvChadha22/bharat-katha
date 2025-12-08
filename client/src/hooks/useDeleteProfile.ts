import toast from "react-hot-toast";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { deleteUser } from "@/services/operations/users";
import { setUser } from "@/store/slices/userSlice";

export const useDeleteProfile = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const handleDeleteProfile = async () => {
        try {
            setIsLoading(true);
            await deleteUser();
            dispatch(setUser(null));
            toast.success("User account deleted successfully");
        }
        catch (error: any) {
            toast.error("Error while deleting user account");
        }
        finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleDeleteProfile,
    };
};

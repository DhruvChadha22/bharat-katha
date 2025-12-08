import toast from "react-hot-toast";
import { useState } from "react";
import { updateUser } from "@/services/operations/users";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";
import { setAudio } from "@/store/slices/audioSlice";
import { invalidateGetTopUsers, invalidateGetUserProfile } from "@/store/slices/queryInvalidationSlice";
import type { UpdateUserProfileHookProps } from "@/types/props";
import type { UpdateUserRequest } from "@/types/users";

export const useUpdateUserProfile = ({
    setIsEditing,
}: UpdateUserProfileHookProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { audio }= useAppSelector(state => state.audio);
    const dispatch = useAppDispatch();

    const handleUpdateUserProfile = async ({
        name,
        profileImage,
    }: UpdateUserRequest) => {
        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("name", name);
            if (profileImage) formData.append("profileImage", profileImage);

            const result = await updateUser(formData);
            const updatedUser = result.data;
            
            dispatch(setUser({
                id: updatedUser.id,
                name: updatedUser.name,
                imageUrl: updatedUser.imageUrl,
            }));

            if (updatedUser.id === audio?.author.id && updatedUser.name !== audio.author.name) {
                dispatch(setAudio({
                    ...audio,
                    author: {
                        ...audio.author,
                        name: updatedUser.name,
                    },
                }));
            }
            dispatch(invalidateGetUserProfile());
            dispatch(invalidateGetTopUsers());
            setIsEditing(false);
            toast.success("Profile updated successfully");
        }
        catch (error: any) {
            toast.error("Error while updating profile");
        }
        finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleUpdateUserProfile,
    };
};

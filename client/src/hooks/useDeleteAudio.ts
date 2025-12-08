import toast from "react-hot-toast";
import { useState } from "react";
import { deleteAudio } from "@/services/operations/audio";
import type { AudioHooksProps } from "@/types/props";

export const useDeleteAudio = ({
    setGeneratedAudio,
}: AudioHooksProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleDeleteAudio = async (audioId: string) => {
        try {
            setIsLoading(true);
            await deleteAudio({ publicId: audioId });
            setGeneratedAudio(undefined);
        }
        catch (error: any) {
            toast.error("Error while deleting audio");
        }
        finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleDeleteAudio,
    };
};

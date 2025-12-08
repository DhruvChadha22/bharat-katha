import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUserProfile } from "@/hooks/useUpdateUserProfile";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, X } from "lucide-react";
import { UploadImage } from "./UploadImage";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { UpdateProfileFormSchema } from "@/types/form-schemas";
import type { EditProfileProps } from "@/types/props";

export const EditProfile: React.FC<EditProfileProps> = ({
    name,
    imageUrl,
    setIsEditing,
}) => {
    const form = useForm<z.infer<typeof UpdateProfileFormSchema>>({
        resolver: zodResolver(UpdateProfileFormSchema),
        defaultValues: {
            name: name,
        },
    });

    const [profileImage, setProfileImage] = useState<File | null>(null);

    const {
        isLoading: isSubmitting,
        handleUpdateUserProfile,
    } = useUpdateUserProfile({ setIsEditing });

    const onSubmit = ({
        name,
    }: z.infer<typeof UpdateProfileFormSchema>) => {
        handleUpdateUserProfile({
            name,
            profileImage,
        });
    };

    return (
        <section className="mt-9 flex flex-col">
            <header className="flex items-center justify-between">
                <h1 className="text-[20px] leading-normal font-bold max-md:text-center">
                    Edit Profile
                </h1>
                <button 
                    onClick={() => setIsEditing(false)}
                    className={cn("h-fit", {
                        "cursor-pointer": !isSubmitting,
                    })}
                    disabled={isSubmitting}
                >
                    <X className="size-5" />
                </button>
            </header>
            <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col">
                        <div className="flex flex-col gap-6 w-full max-md:items-center md:flex-row">
                            <UploadImage
                                imageUrl={imageUrl}
                                disabled={isSubmitting} 
                                setImage={setProfileImage}
                            />

                            <div className="flex flex-col max-md:items-center">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    disabled={isSubmitting}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2.5">
                                            <FormLabel className="text-[16px] leading-normal font-bold">Name</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    className="text-[16px] leading-normal placeholder:text-[16px] placeholder:leading-normal bg-background-300 rounded-[6px] border-none focus-visible:ring-offset-primary-300" 
                                                    placeholder="Enter username" {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="mt-10 w-full">
                                    <Button 
                                        type="submit" 
                                        className="cursor-pointer text-[16px] leading-normal w-full bg-primary-300 py-4 font-extrabold transition-all duration-500 hover:bg-primary-400"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                Submitting
                                                <Loader2 className="size-5 animate-spin ml-2" />
                                            </>
                                        ) : (
                                            "Submit & Update Profile"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </section>
    );
};

import type z from "zod";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { SetURLSearchParams } from "react-router-dom";
import type { Languages } from "./languages";
import type { Categories } from "./categories";
import type { Regions } from "./regions";
import type { Story, StoryWithIsFavorite } from "./stories";
import type { GeneratedAudio } from "./audio";
import type { StoryInfoFormSchema } from "./form-schemas";
import type { UserProfile } from "./users";

export interface StoryCardProps extends StoryWithIsFavorite {
    onUnfavorite?: (storyId: string) => void;
};

export interface StoryDetailsProps {
    story: Story;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export interface GetStoriesBySearchProps {
    searchParams: URLSearchParams;
    languages: Languages;
    categories: Categories;
    regions: Regions;
};

export interface GetStoriesByAuthorProps {
    authorId: string;
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
};

export type UpdateQueryParamFn = (key: "search" | "language" | "category" | "region", value: string) => void;

export interface SearchbarProps {
    search: string;
    setSearch: (val: string) => void;
};

export interface IndiaMapProps {
    region: string;
    setRegion: (val: string) => void;
};

export interface StoryTagsId {
    languageId: string;
    categoryId: string;
    regionId: string;
};

export interface StoryTagsName {
    language: string;
    category: string;
    region: string;
};

export interface FiltersProps {
    languages: Languages;
    categories: Categories;
    regions: Regions;
    values: StoryTagsName;
    onChange: UpdateQueryParamFn;
    onClear: () => void;
};

export interface SelectStoryTagProps {
    name: "Language" | "Category" | "Region" | "Voice Type";
    value: string;
    valueType: "id" | "name";
    allValues: Languages | Categories | Regions;
    disabled?: boolean;
    onChange: (val: string) => void;
};

export interface StoryInfoFormProps {
    form: UseFormReturn<z.infer<typeof StoryInfoFormSchema>>;
    selectedTags: StoryTagsId;
    categories: Categories;
    regions: Regions;
    disabled: boolean;
    setSelectedTags: Dispatch<SetStateAction<StoryTagsId>>;
};

export interface GenerateAudioProps {
    voiceType: "Male" | "Female" | "";
    transcript: string;
    languageId: string;
    languages: Languages;
    generatedAudio: GeneratedAudio | undefined;
    isSubmitting: boolean;
    setSelectedTags: Dispatch<SetStateAction<StoryTagsId>>;
    setVoiceType: Dispatch<SetStateAction<"Male" | "Female" | "">>;
    setTranscript: Dispatch<SetStateAction<string>>;
    setGeneratedAudio: Dispatch<SetStateAction<GeneratedAudio | undefined>>;
    setAudioDuration: Dispatch<SetStateAction<number | undefined>>;
};

export interface AudioHooksProps {
    setGeneratedAudio: Dispatch<SetStateAction<GeneratedAudio | undefined>>;
};

export interface UploadImageProps {
    imageUrl?: string;
    disabled: boolean;
    setImage: Dispatch<SetStateAction<File | null>>;
};

export interface EditStoryProps {
    storyId: string;
    title: string;
    description: string;
    categoryId: string;
    regionId: string;
    imageUrl: string;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export interface EditProfileProps {
    name: string;
    imageUrl: string;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export interface UpdateStoryHookProps {
    setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export interface UpdateUserProfileHookProps {
    setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export interface ActionMenuProps {
    deleteDialogDescription: string;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    isDeleting: boolean;
    onDelete: () => void;
};

export interface ProfileDetailsProps {
    profile: UserProfile;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export interface EmptyStateProps {
    title: string;
    search?: boolean;
    buttonText?: string;
    buttonLink?: string;
};

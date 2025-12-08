import { favoritesAPI } from "../apiRoutes";
import { apiConnector } from "../apiConnector";
import type { ApiResponse } from "@/types/api-response";
import type { StoriesWithIsFavorite } from "@/types/stories";
import type { ToggleFavoriteRequest } from "@/types/favorites";

const {
    GET_ALL_FAVORITE_STORIES,
    ADD_TO_FAVORITES,
    REMOVE_FROM_FAVORITES,
} = favoritesAPI;

export const getFavoriteStories = async () => {
    const response = await apiConnector("get", GET_ALL_FAVORITE_STORIES);
    const result: ApiResponse<StoriesWithIsFavorite> = response.data;
    return result;
};

export const addStoryToFavorites = async ({
    storyId,
}: ToggleFavoriteRequest) => {
    await apiConnector("post", `${ADD_TO_FAVORITES}/${storyId}`);
};

export const removeStoryFromFavorites = async ({
    storyId,
}: ToggleFavoriteRequest) => {
    await apiConnector("delete", `${REMOVE_FROM_FAVORITES}/${storyId}`);
};

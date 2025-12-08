import { apiConnector } from "../apiConnector";
import { storiesAPI } from "../apiRoutes";
import type { ApiResponse } from "@/types/api-response";
import type { 
    AuthorStoriesRequest,
    AuthorStoriesResponse,
    CreateStoryResponse,
    GetStoryRequest,
    LatestStories,
    PopularStories, 
    SearchStoriesRequest, 
    SimilarStoriesRequest, 
    StoriesWithIsFavorite,
    Story,
    UpdateStoryResponse,
} from "@/types/stories";

const {
    GET_STORIES_BY_SEARCH,
    GET_STORIES_BY_CATEGORY,
    GET_STORIES_BY_AUTHOR,
    GET_TRENDING_STORIES,
    GET_LATEST_STORIES,
    GET_POPULAR_STORIES,
    GET_STORY_BY_ID,
    CREATE_STORY,
    UPDATE_STORY,
    DELETE_STORY,
} = storiesAPI;

export const getStoriesBySearch = async ({ 
    search, 
    languageId, 
    categoryId, 
    regionId, 
}: SearchStoriesRequest) => {
    const response = await apiConnector("get", GET_STORIES_BY_SEARCH, undefined, {
        search,
        languageId,
        categoryId,
        regionId,
    });
    const result: ApiResponse<StoriesWithIsFavorite> = response.data;
    return result;
};

export const getStoriesByCategory = async ({
    categoryId,
    excludeId,
}: SimilarStoriesRequest) => {
    const response = await apiConnector("get", `${GET_STORIES_BY_CATEGORY}/${categoryId}`, undefined, {
        excludeId,
    });
    const result: ApiResponse<StoriesWithIsFavorite> = response.data;
    return result;
};

export const getStoriesByAuthor = async ({
    authorId,
    page,
    limit,
}: AuthorStoriesRequest) => {
    const response = await apiConnector("get", `${GET_STORIES_BY_AUTHOR}/${authorId}`, undefined, {
        page,
        limit,
    });
    const result: ApiResponse<AuthorStoriesResponse> = response.data;
    return result;
};

export const getTrendingStories = async () => {
    const response = await apiConnector("get", GET_TRENDING_STORIES);
    const result: ApiResponse<StoriesWithIsFavorite> = response.data;
    return result;
};

export const getLatestStories = async () => {
    const response = await apiConnector("get", GET_LATEST_STORIES);
    const result: ApiResponse<LatestStories>  = response.data;
    return result;        
};

export const getPopularStories = async () => {
    const response = await apiConnector("get", GET_POPULAR_STORIES);
    const result: ApiResponse<PopularStories> = response.data;
    return result;
};

export const getStoryById = async ({
    storyId,
}: GetStoryRequest) => {
    const response = await apiConnector("get", `${GET_STORY_BY_ID}/${storyId}`);
    const result: ApiResponse<Story> = response.data;
    return result;
};

export const createStory = async (formData: FormData) => {
    const response = await apiConnector("post", CREATE_STORY, formData);
    const result: ApiResponse<CreateStoryResponse> = response.data;
    return result;
};

export const updateStory = async (storyId: string, formData: FormData) => {
    const response = await apiConnector("patch", `${UPDATE_STORY}/${storyId}`, formData);
    const result: ApiResponse<UpdateStoryResponse> = response.data;
    return result;
};

export const deleteStory = async (storyId: string) => {
    await apiConnector("delete", `${DELETE_STORY}/${storyId}`);
};

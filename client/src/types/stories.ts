import type { RefObject } from "react";

export interface Story {
    id: string;
    title: string;
    description: string;
    transcript: string;
    audioUrl: string;
    imageUrl: string;
    duration: number;
    views: number;
    isFavorite: boolean;
    author: {
        id: string;
        imageUrl: string;
        name: string;
    };
    language: {
        name: string;
    };
    region: {
        id: string;
        name: string;
    };
    category: {
        id: string;
        name: string;
    };
};

export interface GetStoryRequest {
    storyId: string;
};

export interface StoryWithIsFavorite {
    id: string;
    title: string;
    imageUrl: string;
    author: {
        name: string;
    };
    language: {
        name: string;
    };
    isFavorite: boolean;
};

export interface StoriesWithIsFavorite extends Array<StoryWithIsFavorite> {};

export interface SearchStoriesRequest {
    search?: string;
    languageId?: string;
    categoryId?: string;
    regionId?: string;
};

export interface SimilarStoriesRequest {
    categoryId: string;
    excludeId: string;
};

interface PopularStory {
    id: string;
    title: string;
    imageUrl: string;
    author: {
        name: string;
    };
    _count: {
        favorites: number;
    };
};

export interface PopularStories extends Array<PopularStory> {};

interface LatestStory {
    id: string;
    title: string;
    imageUrl: string;
    duration: number;
    views: number;
    language: {
        name: string;
    };
};

export interface LatestStories extends Array<LatestStory> {};

export interface AuthorStoriesRequest {
    authorId: string;
    page?: string;
    limit?: string;
};

export interface Pagination {
    page: number;
    limit: number;
    totalStories: number;
    totalPages: number;
};

export interface AuthorStoriesResponse {
    stories: StoriesWithIsFavorite;
    pagination: Pagination;
};

export interface CreateStoryRequest {
    title: string;
    description: string;
    transcript: string;
    audioUrl: string;
    audioId: string;
    languageId: string;
    categoryId: string;
    regionId: string;
    duration: number;
    storyImage: File;
    hasCreatedStoryRef: RefObject<boolean>;
};

export interface CreateStoryResponse {
    id: string;
};

export interface UpdateStoryRequest {
    storyId: string;
    title: string;
    description: string;
    categoryId: string;
    regionId: string;
    storyImage: File | null;
};

export interface UpdateStoryResponse {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    categoryId: string;
    regionId: string;
};

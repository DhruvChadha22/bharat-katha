
export interface User {
    id: string;
    name: string;
    imageUrl: string;
};

export interface UserState {
    user: User | null ;
    isLoading: boolean;
};

export interface TopUser {
    id: string;
    name: string;
    imageUrl: string;
    totalStories: number;
};

export interface TopUsers extends Array<TopUser> {};

export interface UserProfile {
    id: string;
    name: string;
    imageUrl: string;
    totalStories: number;
    totalListeners: number;
    createdAt: Date;
};

export interface UpdateUserRequest {
    name: string;
    profileImage: File | null;
};

export interface UpdateUserResponse {
    id: string;
    name: string;
    imageUrl: string;
};

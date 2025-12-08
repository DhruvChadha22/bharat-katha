
export const authAPI = {
    SEND_OTP: "/auth/send-otp",
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
};

export const usersAPI = {
    GET_USER: "/users",
    GET_TOP_USERS: "/users/top-users",
    GET_USER_BY_ID: "/users",
    UPDATE_USER: "/users",
    DELETE_USER: "/users",
};

export const storiesAPI = {
    GET_STORIES_BY_SEARCH: "/stories",
    GET_STORIES_BY_CATEGORY: "/stories/category",
    GET_STORIES_BY_AUTHOR: "/stories/author",
    GET_TRENDING_STORIES: "/stories/trending",
    GET_LATEST_STORIES: "/stories/latest",
    GET_POPULAR_STORIES: "/stories/popular",
    GET_STORY_BY_ID: "/stories",
    CREATE_STORY: "/stories",
    UPDATE_STORY: "/stories",
    DELETE_STORY: "/stories",
};

export const audioAPI = {
    GENERATE_AUDIO: "/audio",
    DELETE_AUDIO: "/audio",
};

export const favoritesAPI = {
    GET_ALL_FAVORITE_STORIES: "/favorites",
    ADD_TO_FAVORITES: "/favorites",
    REMOVE_FROM_FAVORITES: "/favorites",
};

export const languagesAPI = {
    GET_ALL_LANGUAGES: "/languages",
};

export const categoriesAPI = {
    GET_ALL_CATEGORIES: "/categories",
};

export const regionsAPI = {
    GET_ALL_REGIONS: "/regions",
};

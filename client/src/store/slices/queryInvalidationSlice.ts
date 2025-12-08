import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    storyByIdRefreshKey: 0,
    userProfileRefreshKey: 0,
    popularStoriesRefreshKey: 0,
    topUsersRefreshKey: 0,
};

const queryInvalidation = createSlice({
    name: "queryInvalidation",
    initialState,
    reducers: {
        invalidateGetStoryById: (state) => {
            state.storyByIdRefreshKey++;
        },
        invalidateGetUserProfile: (state) => {
            state.userProfileRefreshKey++;
        },
        invalidateGetPopularStories: (state) => {
            state.popularStoriesRefreshKey++;
        },
        invalidateGetTopUsers: (state) => {
            state.topUsersRefreshKey++;
        },
    },
});

export const { invalidateGetStoryById, invalidateGetUserProfile, invalidateGetPopularStories, invalidateGetTopUsers } = queryInvalidation.actions;
export default queryInvalidation.reducer;

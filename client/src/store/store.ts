import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import audioReducer from "./slices/audioSlice";
import queryInvalidationReducer from "./slices/queryInvalidationSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        audio: audioReducer,
        queryInvalidation: queryInvalidationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

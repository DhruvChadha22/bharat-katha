import type { AuthState, SignupData } from "@/types/auth";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
    signupData: null,
    isLoading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignupData: (state, action: PayloadAction<SignupData | null>) => {
            state.signupData = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setSignupData, setIsLoading } = authSlice.actions;
export default authSlice.reducer;

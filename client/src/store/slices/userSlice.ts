import type { User, UserState } from "@/types/users";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
    user: null,
    isLoading: true,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setUser, setIsLoading } = userSlice.actions;
export default userSlice.reducer;

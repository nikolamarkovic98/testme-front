import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    userId: "",
    token: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signIn: (state, action) => {
            return action.payload;
        },
        signOut: () => {
            return initialState;
        },
    },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;

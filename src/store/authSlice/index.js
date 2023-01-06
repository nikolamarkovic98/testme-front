import { createSlice } from "@reduxjs/toolkit";
import { getLSState } from "../../utils/utils";

const initialState = {
    username: "",
    userId: "",
    token: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState: getLSState() || initialState,
    reducers: {
        signIn: (state, action) => {
            localStorage.setItem("testme-app", JSON.stringify(action.payload));
            return action.payload;
        },
        signOut: () => {
            localStorage.setItem("testme-app", "");
            return initialState;
        },
    },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;

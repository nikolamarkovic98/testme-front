import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";

export default configureStore({
    reducer: {
        auth: AuthReducer,
    },
});

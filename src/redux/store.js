import { configureStore } from "@reduxjs/toolkit";
import leadReducer from "./features/leadSlice"

export const store = configureStore({
    reducer: {
        lead: leadReducer
    }
})
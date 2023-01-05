import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import ThemeSlice from "../reducers/ThemeSlice";

const store=configureStore({
    reducer:{
        Theme:ThemeSlice.reducer,
    },

})

export default store
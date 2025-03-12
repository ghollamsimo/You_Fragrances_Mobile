import {configureStore} from "@reduxjs/toolkit";
import brandSlice from "./slices/BrandSlice";
import perfumeSlice from "./slices/PerfumeSlice";
import authSlice from "./slices/AuthSlice";
import chatbotSlice from "./slices/ChatbotSlice";


export const store = configureStore({
    reducer: {
        brands: brandSlice,
        perfumes: perfumeSlice,
        auth: authSlice,
        chat: chatbotSlice,
    }
})
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
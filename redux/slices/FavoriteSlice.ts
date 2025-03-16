import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addFavoriteField} from "../../constant";
import {initialState} from "../initialisation";

import FavoriteServicePromise from "../../services/FavoriteService";

export const addFavorite = createAsyncThunk(
    "favorites/:perfumeId",
    async (perfumeId: string, { rejectWithValue }) => {
        try {
            const favoriteService = await FavoriteServicePromise;
            return await favoriteService.addFavorite(perfumeId);
        } catch (err) {
            return rejectWithValue(err.response?.data || "Something went wrong.");
        }
    }
);

export const getUserFavorites = createAsyncThunk(
    "favorites/get",
    async (_ , {rejectWithValue}) => {
        try {
            const favoriteService = await FavoriteServicePromise;
            return await favoriteService.getUserFavorites()
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)

export const removeFavorite = createAsyncThunk(
    "favorites/remove",
    async (perfumeId : string , {rejectWithValue}) => {
        try {
            return await FavoriteService.removeFavorite(perfumeId)
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        changeStateTrue: (state) => {
            state.updateState = true;
        },
        changeStateFalse: (state) => {
            state.updateState = false;
        },
        clearResponse: (state) => {
            state.response = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addFavorite.pending, (state) => {
                state.loading = true;
            })
            .addCase(addFavorite.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.favoritesData = action.payload.favoritesData || [];
                state.errorMessage = null;
            })

            .addCase(addFavorite.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "add failed";
            })
            .addCase(getUserFavorites.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserFavorites.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.favoritesData = action.payload.map((fav: any) => fav.perfume._id);
                state.errorMessage = null;
            })

            .addCase(getUserFavorites.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "get failed";
            })
            .addCase(removeFavorite.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFavorite.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.favoritesData = action.payload.favoritesData;
                state.errorMessage = null;
            })

            .addCase(removeFavorite.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "remove failed";
            })
    }
})
export default favoriteSlice.reducer;
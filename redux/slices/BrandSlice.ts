import {initialState} from "../initialisation";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import BrandService from "../../services/BrandService";

export const index = createAsyncThunk(
    "brand/allBrands",
    async (_ , {rejectWithValue}) => {
        try {
            return await BrandService.index()
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)


const brandSlice = createSlice({
    name: 'brands',
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


            .addCase(index.pending, (state) => {
                state.loading = true;
            })
            .addCase(index.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.brandData = action.payload;
                state.errorMessage = null;
            })
            .addCase(index.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "index failed";
            })

    }
})

export default brandSlice.reducer;
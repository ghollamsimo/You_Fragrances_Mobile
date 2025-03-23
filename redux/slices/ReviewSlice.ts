import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "../initialisation";
import PerfumeService from "../../services/PerfumeService";
import ReviewService from "../../services/ReviewService";

export const addReview = createAsyncThunk(
    "favorites/:perfumeId",
    async ({perfumeId, data}: {perfumeId: string, data: any}, { rejectWithValue }) => {
        try {
            const reviewService = await ReviewService;
            return { review : await reviewService.addReview(perfumeId, data),
                updatedProduct : await PerfumeService.perfumeDetail(perfumeId)
            };
        } catch (err) {
            return rejectWithValue(err.response?.data || "Something went wrong.");
        }
    }
);

export const getUserReviews = createAsyncThunk(
    "favorites/get",
    async (_ , {rejectWithValue}) => {
        try {
            const reviewService = await ReviewService;
            return await reviewService.getUserReviews()
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)

export const getReviewsByPerfume = createAsyncThunk(
    "reviews/perfume",
    async (perfumeId: string , {rejectWithValue}) => {
        try {
            const reviewService = await ReviewService;
            const response = await reviewService.getReviewsByPerfume(perfumeId);
            return response;
        } catch (err) {
            console.error("Error fetching reviews: ", err);
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
);



const reviewSlice = createSlice({
    name: 'reviews',
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
            .addCase(addReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedPerfume = action.payload.updatedProduct;
                state.errorMessage = null;
                console.log("Updated selectedPerfume:", state.selectedPerfume);
            })

            .addCase(addReview.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "add failed";
            })
            .addCase(getUserReviews.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserReviews.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.reviewData = action.payload
                state.errorMessage = null;
            })

            .addCase(getUserReviews.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "get failed";
            })
            .addCase(getReviewsByPerfume.pending, (state) => {
                state.loading = true;
            })
            .addCase(getReviewsByPerfume.fulfilled, (state, action) => {
                state.loading = false;
                state.reviewData = action.payload;
                state.selectedPerfume = {
                    ...state.selectedPerfume,
                    reviews: action.payload,
                };
                state.errorMessage = null;
            })

            .addCase(getReviewsByPerfume.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload || 'Failed to get reviews.';
            });

    }
})
export default reviewSlice.reducer;
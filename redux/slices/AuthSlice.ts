import AuthService from "../../services/AuthService";
import {initialState} from "../initialisation";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginField, RegisterField} from "../../constant";
import {indexPerfumes} from "./PerfumeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const register = createAsyncThunk(
    "users/store",
    async (data: RegisterField , {rejectWithValue}) => {
        try {
            return await AuthService.register(data)
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)

export const login = createAsyncThunk(
    "users/login",
    async (data: LoginField , {rejectWithValue}) => {
        try {
            return await AuthService.login(data)
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)


export const followBrand = createAsyncThunk(
    "follow",
    async (brandId:string , {rejectWithValue}) => {
        try {
            return await AuthService.followBrand(brandId)
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)

export const fetchFollowedBrands = createAsyncThunk(
    "followed",
    async (_ , {rejectWithValue}) => {
        try {
            return await AuthService.fetchFollowedBrands()
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
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
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.usersData = action.payload;
                state.errorMessage = null;
            })
            .addCase(register.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "register failed";
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                if (action.payload && action.payload.token) {
                    state.token = action.payload.token;
                    AsyncStorage.setItem('token', action.payload.token);
                } else {
                    console.error("Token is missing in the response:", action.payload);
                }
                state.errorMessage = null;
            })

            .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "login failed";
            })
            .addCase(followBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(followBrand.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.followBrandData = action.payload;
                state.errorMessage = null;
            })

            .addCase(followBrand.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "failed";
            })
            .addCase(fetchFollowedBrands.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFollowedBrands.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.followBrandData = action.payload;
                state.errorMessage = null;
            })

            .addCase(fetchFollowedBrands.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "failed";
            })
    }
})
export default authSlice.reducer;
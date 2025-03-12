import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import PerfumeService from "../../services/PerfumeService";
import {initialState} from "../initialisation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const indexPerfumes = createAsyncThunk(
    "perfumes/index",
    async (_ , {rejectWithValue}) => {
        try {
            return await PerfumeService.index()
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)
const saveHistoryToStorage = async (history) => {
    try {
        await AsyncStorage.setItem('perfumeHistory', JSON.stringify(history));
    } catch (error) {
        console.error("Error saving history to AsyncStorage", error);
    }
};

const loadHistoryFromStorage = async () => {
    try {
        const storedHistory = await AsyncStorage.getItem('perfumeHistory');
        return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (error) {
        console.error("Error loading history from AsyncStorage", error);
        return [];
    }
};

const perfumesSlice = createSlice({
    name: 'perfumes',
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
        setSelectedPerfume: (state, action: PayloadAction<any>) => {
            state.selectedPerfume = action.payload;
            state.history = [...state.history, action.payload];
            saveHistoryToStorage(state.history);
        },
        clearSelectedPerfume: (state) => {
            state.selectedPerfume = null;
        },
        setHistoryFromStorage: (state, action: PayloadAction<any[]>) => {
            state.history = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder


            .addCase(indexPerfumes.pending, (state) => {
                state.loading = true;
            })
            .addCase(indexPerfumes.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.perfumesData = action.payload;
                state.errorMessage = null;
            })
            .addCase(indexPerfumes.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "index failed";
            })

    }
})
export const { setSelectedPerfume, clearSelectedPerfume, setHistoryFromStorage } = perfumesSlice.actions;

export const loadPerfumeHistory = () => async (dispatch) => {
    const history = await loadHistoryFromStorage();
    dispatch(setHistoryFromStorage(history));
};

export default perfumesSlice.reducer;
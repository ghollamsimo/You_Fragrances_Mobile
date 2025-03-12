import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChatbotField} from "../../constant";
import ChatbotService from "../../services/ChatbotService";
import {initialState} from "../initialisation";

export const sendMessages = createAsyncThunk(
    "chatbot/store",
    async (data: ChatbotField , {rejectWithValue}) => {
        try {
            return await ChatbotService.sendMessage(data)
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)

export const history = createAsyncThunk(
    "chatbot/history",
    async (_ , {rejectWithValue}) => {
        try {
            return await ChatbotService.history()
        }catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong.');
        }
    }
)

const chatbotSlice = createSlice({
    name: 'chat',
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
            .addCase(sendMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendMessages.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                console.log('Payload from backend:', action.payload);
                state.chatbotMessages = action.payload.chatbotMessages || [];
                state.errorMessage = null;
            })

            .addCase(sendMessages.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "sendMessages failed";
            })
            .addCase(history.pending, (state) => {
                state.loading = true;
            })
            .addCase(history.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.history = action.payload.history;
                state.errorMessage = null;
            })

            .addCase(history.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.errorMessage = action.payload || "history failed";
            })

    }
})
export default chatbotSlice.reducer;
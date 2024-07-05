import axiosInstance from "../../helpers/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    userProfile: null,
    watchHistory: []
};

export const getUserCurrentProfile = createAsyncThunk("getUserCurrentProfile", async(username) => {
    try {
        const response = await axiosInstance.get(`/users/c/${username}`);
        return response.data.message;
    } catch (error) {
        toast.error(error?.message);
        throw error;
    }
});

export const getWatchHistory = createAsyncThunk("getWatchHistory", async() => {
    try {
        const response = await axiosInstance.get(`/users/history`);
        return response.data.message;
    } catch (error) {
        toast.error(error?.message);
        throw error;
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUserCurrentProfile.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUserCurrentProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.userProfile = action.payload;
        })
       .addCase(getWatchHistory.pending, (state) => {
            state.loading = true;
        })
       .addCase(getWatchHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.watchHistory = action.payload;
        })
    }
})

export default userSlice.reducer;
import axiosInstance from "../../helpers/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    likedVideos: []
};

export const toggleVideoLike = createAsyncThunk("toggleVideoLike", async(videoId) => {
    try {

        const response = await axiosInstance.post(`/likes/toggle/v/${videoId}`);
        console.log("toggleVideoLike", response.data.message);
        return response.data.message;
        
    } catch (error) {
        toast.error(error?.message);
        throw error;
    }
})

export const toggleCommentLike = createAsyncThunk("toggleCommentLike", async(commentId) => {
    try {
        const reponse = await axiosInstance.post(`/likes/toggle/c/${commentId}`);
        return reponse.data.message;
    } catch (error) {
        toast.error(error?.message);
        throw error;
    }
})

export const toggleTweetLike = createAsyncThunk("toggleTweetLike", async(tweetId) => {
    try {
        const response = await axiosInstance.post(`/likes/toggle/t/${tweetId}`);
        console.log("toggle tweet like ", response);
        return response.data.message;
    } catch (error) {
        toast.error(error?.message);
        throw error;
    }
});

export const getLikedVideos = createAsyncThunk("getLikedVideos", async() => {
    try {
        const response = await axiosInstance.get("/likes/videos");
        return response.data.message;
    } catch (error) {
        toast.error(error?.message);
        throw error;
    }
}) 

const likeSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLikedVideos.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getLikedVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.likedVideos = action.payload;
            console.log("state.likedVideos", state.likedVideos);
        })
    }
})

export default likeSlice.reducer;
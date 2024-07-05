import axiosInstance from "../../helpers/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    playlist: []
};

export const createPlaylist = createAsyncThunk("createPlaylist", async({name, description}) => {
    try {
        const response = await axiosInstance.post("/playlists", {name, description});
        toast.success("Playlist created successfully");
        return response.data.message;
    } catch (error) {
        toast.error(error?.message);
        throw error;
    }
})

export const addVideoToPlaylist = createAsyncThunk("addVideoToPlaylist", async({playlistId, videoId}) => {
    try {
        const response = await axiosInstance.patch(`/playlists/add/${videoId}/${playlistId}`);
        return response.data.message;
    } catch (error) {
        toast.error(error?.message);
        throw error;
    }
})

export const removeVideoFromPlaylist = createAsyncThunk("removeVideoFromPlaylist", async({playlistId, videoId}) => {
    try {
        const response = await axiosInstance.patch(`/playlists/remove/${videoId}/${playlistId}`);
        return response.data.message;
    } catch (error) {
        toast.error(error?.message);
        throw error;
    }
})

export const getPlaylistById = createAsyncThunk("getPlaylistById", async(playlistId) => {
    try {
        const response = await axiosInstance.get(`/playlists/${playlistId}`);
        return response.data.message;
    } catch (error) {
        toast.error(error?.message);
        throw error;
    }
})

export const updatePlaylist = createAsyncThunk("updatePlaylist", async({playlistId, name, description}) => {
    try {
        const response = await axiosInstance.patch(`/playlists/${playlistId}`, {name, description});
        toast.success(response.data.data);
        return response.data.message;
    } catch (error) {
        toast.error(error?.message);
        throw error;
    }
})

export const deletePlaylist = createAsyncThunk("deletePlaylist", async(playlistId) => {
    try {
        const response = await axiosInstance.delete(`/playlists/${playlistId}`);
        toast.success(response.data.data);
        return response.data.message;
    } catch (error) {
        toast.error(error?.message);
        throw error;
    }
})

export const getUserPlaylists = createAsyncThunk("getUserPlaylists", async(userId) => {
    try {
        const response = await axiosInstance.get(`/playlists/user/${userId}`);
        console.log("get user playlist in playlistSlice", response.data);
        return response.data.message;
    } catch (error) {
        toast.error(error?.message);
        throw error;
    }
})

const playlistSlice = createSlice({
    name: "playlists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserPlaylists.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getUserPlaylists.fulfilled, (state, action) => {
            state.loading = false;
            state.playlist = action.payload;
        })
    } 
})

export default playlistSlice.reducer;
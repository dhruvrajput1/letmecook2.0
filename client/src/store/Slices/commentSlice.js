import { BASE_URL } from "../../constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
    loading: false,
    comments: [],
    totalComments: null,
    hasNextPage: false
};

export const createAComment = createAsyncThunk("createAComment", async ({ videoId, content }) => {
    try {

        const response = await axiosInstance.post(`/comments/${videoId}`, { content: content });
        toast.success(response.data.data);
        return response.data.message;
        

    } catch (error) {
        toast.error(error.message);
        throw error;
    }
})

export const editAComment = createAsyncThunk(
    "editAComment",
    async ({ commentId, content }) => {
        try {
            const response = await axiosInstance.patch(
                `/comments/c/${commentId}`,
                { content }
            );
            toast.success(response.data?.data);
            return response.data.message;
        } catch (error) {
            toast.error(error?.message);
            throw error;
        }
    }
);

export const deleteAComment = createAsyncThunk(
    "deleteAComment",
    async (commentId) => {
        try {
            const response = await axiosInstance.delete(
                `/comments/c/${commentId}`
            );
            toast.success(response.data.data);
            return response.data.message;
        } catch (error) {
            toast.error(error?.message);
            throw error;
        }
    }
);

export const getVideoComments = createAsyncThunk(
    "getVideoComments",
    async ({ videoId, page, limit }) => {
        const url = new URL(`${BASE_URL}/comments/${videoId}`);
        if (page) url.searchParams.set("page", page);
        if (limit) url.searchParams.set("limit", limit);

        try {
            const response = await axiosInstance.get(url);
            return response.data.message.docs;
        } catch (error) {
            toast.error(error?.message);
            throw error;
        }
    }
);

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        cleanUpComments: (state) => {
            state.comments = [];
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getVideoComments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getVideoComments.fulfilled, (state, action) => {
            state.loading = false;
            state.comments = [...state.comments,...action.payload];
            state.totalComments = action.payload.totalDocs;
            state.hasNextPage = action.payload.hasNextPage;
        });
        builder.addCase(createAComment.fulfilled, (state, action) => {
            state.comments.unshift(action.payload);
            state.totalComments++;
        });
        builder.addCase(deleteAComment.fulfilled, (state, action) => {
            state.comments = state.comments.filter(
                (comment) => comment._id !== action.payload.commentId
            );
            state.totalComments--;
        });
    }

})

export const { cleanUpComments } = commentSlice.actions;

export default commentSlice.reducer;

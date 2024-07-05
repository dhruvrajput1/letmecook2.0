import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import commentSlice from "./Slices/commentSlice";
import dashboardSlice from "./Slices/dashboardSlice";
import likeSlice from "./Slices/likeSlice";
import playlistSlice from "./Slices/playlistSlice";
import subscriptionSlice from "./Slices/subscriptionSlice";
import tweetSlice from "./Slices/tweetSlice";
import userSlice from "./Slices/userSlice";
import videoSlice from "./Slices/videoSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        comment: commentSlice,
        dashboard: dashboardSlice,
        like: likeSlice,
        playlist: playlistSlice,
        subscription: subscriptionSlice,
        tweet: tweetSlice,
        video: videoSlice,
    }
})

export default store;
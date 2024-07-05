import { useEffect } from "react";
import { getUserTweets } from "../../store/Slices/tweetSlice";
import { useDispatch, useSelector } from "react-redux";
import { TweetAndComment, TweetsList } from "../../components";

export default function ChannelTweets() {
    const dispatch = useDispatch();

    const authId = useSelector((state) => state.auth?.userData?._id); // logged in user
    const userId = useSelector((state) => state.user?.userProfile?._id); // user whose channel we are visiting

    const tweets = useSelector((state) => state.tweet?.tweets);

    console.log("tweets in channel tweets, ", tweets);

    useEffect(() => {
        if(userId) {
            dispatch(getUserTweets(userId));
        }
    }, [dispatch, userId])

    return (
        <>
            {authId === userId && <TweetAndComment tweet={true}/>}
            {tweets?.map((tweet) => (
                <TweetsList
                    key={tweet?._id}
                    avatar={tweet?.ownerDetails?.avatar}
                    content={tweet?.content}
                    createdAt={tweet?.createdAt}
                    likesCount={tweet?.likesCount}
                    tweetId={tweet?._id}
                    username={tweet?.ownerDetails?.username}
                    isLiked={tweet?.isLiked}
                />
            ))}
        </>
    );
}
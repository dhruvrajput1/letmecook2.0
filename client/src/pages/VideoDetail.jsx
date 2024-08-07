import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById } from "../store/Slices/videoSlice";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import {
    CommentList,
    TweetAndComment,
    Video,
    VideoList,
    Container,
    Description,
    Spinner,
    InfiniteScroll,
    Navbar,
} from "../components";
import {
    cleanUpComments,
    getVideoComments,
} from "../store/Slices/commentSlice";

export default function VideoDetail() {
    const dispatch = useDispatch();
    const { videoId } = useParams();
    const video = useSelector((state) => state.video?.video);
    console.log("videooo in videoDetail,,, ", video);
    const comments = useSelector((state) => state.comment?.comments);
    const totalComments = useSelector((state) => state.comment?.totalComments);
    const hasNextPage = useSelector((state) => state.comment?.hasNextPage);
    const loading = useSelector((state) => state.comment?.loading);
    const videoDetails = useSelector((state) => state.video?.videoDetails);
    const [page, setPage] = useState(1);
    const videos = useSelector((state) => state.video?.videos?.docs);

    console.log("videos in video ", videos)

    console.log("commentsssssssssss", comments);

    console.log("videoDetails in videoDetail,,, ", videoDetails);

    useEffect(() => {
        dispatch(getAllVideos({}));

        return () => dispatch(makeVideosNull());
    }, [dispatch]);

    useEffect(() => {
        if (videoId) {
            dispatch(getVideoById({ videoId }));
            dispatch(getVideoComments({ videoId }));
        }

        return () => dispatch(cleanUpComments());
    }, [dispatch, videoId]);

    const fetchMoreComments = useCallback(() => {
        if (!loading && hasNextPage) {
            dispatch(getVideoComments({ videoId, page: page + 1 }));
            setPage((prev) => prev + 1);
        }
    }, [page, loading, hasNextPage, dispatch, videoId]);

    return (
        <>
            <Navbar />
            {/* make div flex only if in big screen */}
            <div className="flex xl:flex-row sm:flex-col">
                <div className="w-3/4">
                    <Video
                        src={video?.videoFile}
                        poster={video?.thumbnail?.url}
                    />
                    <Description
                        avatar={video?.owner?.avatar}
                        channelName={video?.owner?.username}
                        createdAt={video?.createdAt}
                        description={video?.description}
                        isSubscribed={video?.owner?.isSubscribed}
                        likesCount={video?.likesCount}
                        subscribersCount={video?.owner?.subscribersCount}
                        title={video?.title}
                        views={video?.views}
                        key={video?._id}
                        isLiked={video?.isLiked}
                        videoId={video?._id}
                        channelId={video?.owner?._id}
                    />
                    <div className="text-white font-semibold sm:px-5 px-3">
                        {totalComments} Comments
                    </div>
                    <TweetAndComment
                        comment={true}
                        videoId={video?._id}
                    />
                    <InfiniteScroll
                        fetchMore={fetchMoreComments}
                        hasNextPage={hasNextPage}
                    >
                        <div className="w-full sm:max-w-4xl">
                            {comments?.map((comment) => (
                                <CommentList
                                    key={comment?._id}
                                    avatar={comment?.owner?.avatar}
                                    commentId={comment?._id}
                                    content={comment?.content}
                                    createdAt={comment?.createdAt}
                                    fullName={comment?.owner?.fullName}
                                    isLiked={comment?.isLiked}
                                    likesCount={comment?.likesCount}
                                    username={comment?.owner?.username}
                                />
                            ))}
                            {loading && (
                                <div className="w-full flex justify-center items-center">
                                    <Spinner width={10} />
                                </div>
                            )}
                        </div>
                    </InfiniteScroll>
                </div>
                <div>
                    <Container>
                        <InfiniteScroll
                            hasNextPage={hasNextPage}
                        >
                            <div className="text-white xl:mr-4  sm:m-0 w-full align-center max-h-screen grid xl:grid-cols-1 sm:grid-cols-1 grid-cols-1 overflow-y-scroll">
                                {videos?.map((video) => (
                                    <VideoList
                                        key={video._id}
                                        avatar={video.ownerDetails?.avatar}
                                        duration={video.duration}
                                        title={video.title}
                                        thumbnail={video.thumbnail}
                                        createdAt={video.createdAt}
                                        views={video.views}
                                        channelName={video.ownerDetails.username}
                                        videoId={video._id}
                                    />
                                ))}
                            </div>
                        </InfiniteScroll>
                    </Container>
                </div>

            </div>

        </>
    );
}

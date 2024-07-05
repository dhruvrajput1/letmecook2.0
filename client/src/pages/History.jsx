import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Container, NoVideosFound, VideoList } from "../components";
import { getWatchHistory } from "../store/Slices/userSlice";
import HomeSkeleton from "../skeleton/HomeSkeleton";

export default function History() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.user?.loading);
    const videos = useSelector((state) => state.user?.watchHistory);

    console.log("videos in history,, ", videos);

    window.scrollTo(0, 0);

    useEffect(() => {
        dispatch(getWatchHistory());
    }, [dispatch]);

    if(loading) {
        return <HomeSkeleton />
    }

    if(videos.length === 0) {
        return <NoVideosFound />
    }

    if(videos && videos.length > 0) {
        return (
            <>
                <Container>
                    <div className="grid max-h-screen mb-20 sm:m-0 overflow-y-scroll lg:grid-cols-3 sm:grid-cols-2 text-white">
                        {videos.map((video) => (
                            <VideoList
                                key={video._id}
                                avatar={video.owner?.avatar}
                                duration={video.duration}
                                title={video.title}
                                thumbnail={video.thumbnail}
                                createdAt={video.createdAt}
                                views={video.views}
                                channelName={video.owner.username}
                                videoId={video._id}
                            />
                        ))}
                    </div>
                </Container>
            </>
        );
    }

    return <></> // we have to return something
}
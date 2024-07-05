import { useEffect, useState } from "react";
import {
    Container,
    DeleteConfirmation,
    HeaderSection,
    Navbar,
    Spinner,
    StatsSection,
    VideoTable,
    EditVideo,
    UploadVideo,
} from "../components";

import { useDispatch, useSelector } from "react-redux";
import { getChannelStats, getChannelVideos } from "../store/Slices/dashboardSlice";
import { deleteAVideo } from "../store/Slices/videoSlice";

export default function AdminDashboard() {
    const dispatch = useDispatch();

    const dashboard = useSelector((state) => state.dashboard?.channelStats);
    const videos = useSelector((state) => state.dashboard?.channelVideos);
    const username = useSelector((state) => state.auth?.userData?.username);
    const uploaded = useSelector((state) => state.video?.uploaded);
    console.log("Uploaded", uploaded);
    const publishToggled = useSelector((state) => state.video?.publishToggled);
    const deleting = useSelector((state) => state.video?.loading); // loading

    const [videoDetails, setVideoDetails] = useState(null);
    const [popup, setPopup] = useState({
        uploadVideo: false,
        editVideo: false,
        deleteVideo: false
    });

    const handleDeleteVideo = async () => {
        dispatch(deleteAVideo(videoDetails?._id));
        setPopup((prev) => ({
            ...prev,
            deleteVideo: !prev.deleteVideo,
        }));
    };

    useEffect(() => {
        dispatch(getChannelStats());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getChannelVideos());
    }, [dispatch, uploaded, publishToggled, deleting]);

    window.scrollTo(0, 0);

    return (
        <>
            <Navbar />
            <Container>
                <div className=" w-full relative h-screen text-white space-y-5 z-10 py-4 px-1">
                    {/* uploadVideoPopup */}
                    {popup.uploadVideo && (
                        <UploadVideo setUploadVideoPopup={setPopup} />
                    )}

                    {/* editVideoPopup */}
                    {popup.editVideo && (
                        <div className="w-full flex justify-center top-24 fixed z-20">
                            <EditVideo
                                setEditVideoPopup={setPopup}
                                title={videoDetails?.title}
                                description={videoDetails?.description}
                                videoId={videoDetails?._id}
                            />
                        </div>
                    )}

                    {/* deleteVideoPopup */}
                    {popup.deleteVideo && (
                        <div className="w-full fixed top-52 flex justify-center z-20">
                            <DeleteConfirmation
                                video={true}
                                onCancel={() =>
                                    setPopup((prev) => ({
                                        ...prev,
                                        deleteVideo: !prev.deleteVideo,
                                    }))
                                }
                                onDelete={handleDeleteVideo}
                            />
                        </div>
                    )}

                    {deleting && (
                        <div className="w-full fixed top-20 flex justify-center z-20">
                            <div className="w-52 border border-slate-600 bg-black flex gap-2 p-3">
                                <Spinner />
                                <span className="text-md font-bold">
                                    Deleting video...
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Dashboard Header */}
                    <HeaderSection
                        username={username}
                        setPopUp={setPopup}
                    />

                    {/* channel stats section */}
                    <StatsSection dashboard={dashboard} />

                    {/* Table for managing channel videos */}
                    <VideoTable
                        videos={videos}
                        setPopUp={setPopup}
                        setVideoDetails={setVideoDetails}
                    />
                </div>
            </Container>
        </>
    );
}
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserChannelSubscribers } from "../../store/Slices/subscriptionSlice";
import { Avatar, Button } from "../../components";
import { Link } from "react-router-dom";

export default function ChannelSubscribers() {
    const dispatch = useDispatch();

    const channelId = useSelector((state) => state.user?.userProfile?._id);

    console.log("channelId in channel subscribers, ", channelId);

    const subscribers = useSelector((state) => state.subscription?.channelSubscribers);

    console.log("subscribers in channel subscribers, ", subscribers);

    useEffect(() => {
        if (channelId) {
            dispatch(getUserChannelSubscribers(channelId));
        }
    }, [dispatch, channelId]);

    if(subscribers?.length === 0) {
        return (
            // display no subscribers message
            <div className="flex flex-col items-center justify-center gap-3">
                <h1 className="text-xl">No Subscribers</h1>
            </div>

        );
    }

    return (
        <>
            {subscribers?.map((subscriber) => (
                <Link
                    to={`/channel/${subscriber?.subscriber?.username}`}
                    key={subscriber?.subscriber?._id}
                    className="flex border-b border-slate-500 px-3 py-1 justify-between items-center text-white"
                >
                    <div className="flex gap-3 items-center">
                        <Avatar
                            src={subscriber?.subscriber?.avatar}
                            channelName={subscriber?.subscriber?.username}
                        />
                        <div>
                            <h5 className="text-sm">
                                {subscriber?.subscriber?.username}
                            </h5>
                            <span className="text-xs text-slate-400">
                                {subscriber?.subscriber?.subscribersCount}{" "}
                                Subscribers
                            </span>
                        </div>
                    </div>
                    <div>
                        <button className="bg-purple-500 text-black text-xs py-1 px-2" type="button">
                            {subscriber?.subscriber?.subscribedToSubscriber
                                ? "Subscribed"
                                : "subscribe"}
                        </button>
                    </div>
                </Link>
            ))}
        </>
    );
}
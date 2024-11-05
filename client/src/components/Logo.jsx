import { PiAlien } from "react-icons/pi";
import { Link } from "react-router-dom";

function Logo({size="30"}) {
    return (
        <>
            <Link to={"/"} className="flex gap-2 items-center">
                <PiAlien
                    size={size}
                    color="rgb(236 72 153)"
                    />
                    <span className="text-3xl font-bold text-pink-500">letmecook 2.0</span>
            </Link>
        </>
    )
}

export default Logo;
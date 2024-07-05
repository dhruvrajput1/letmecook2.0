import JWT from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';

const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        console.log("access token: ", accessToken);

        if (!accessToken) {
            throw new ApiError(401, "Unauthorized request");
        }
    
        const decodedToken = JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        console.log("decoded token: ", decodedToken);
    
        const user = await User.findById(decodedToken?._id).select(" -password -refreshToken");

        console.log("user: ", user);
    
        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }
    
        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, `error while verifying token: ${error.message}`);
    }
});

export {verifyJWT}
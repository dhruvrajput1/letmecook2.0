import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", ""); // or part is for the mobile browser

    console.log("Token received:", token);

    if (!token) {
      throw new ApiError(401, "Unauthorized access");
    }

    const decodedTokenInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded token info:", decodedTokenInfo);

    const user = await User.findById(decodedTokenInfo._id).select("-password -refreshToken");
    console.log("User found:", user);

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user; // this req.user will be used in logging out the user
    next();
  } catch (error) {
    console.error("Error in verifying token:", error);
    throw new ApiError(401, `Error in verifying token: ${error.message}`);
  }
});

export { verifyJWT };

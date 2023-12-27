import jwt from 'jsonwebtoken';
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const verifyJwt = asyncHandler ( async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        // console.log(token);

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
        console.log(token);
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(decodedToken);

        const user = await User.findById(decodedToken._id);
        
        if (!user) {
            throw new ApiError(401, "Invalid Token");
        }

        if (!user.refreshToken) {
            throw new ApiError(401, "Token has been expired or invalid");
        }

        user.password = undefined;
        user.refreshToken = undefined;

        req.user = user;
        console.log("RequestUser", req.user);
        next();
    } catch (error) {
        throw new ApiError(401, "Token invalid or expired");
    }
});

export default verifyJwt;
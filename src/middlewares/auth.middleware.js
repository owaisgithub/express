import jwt from 'jsonwebtoken';
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const verifyJwt = asyncHandler ( async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthoeized request");
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(decodedToken);

        const user = await User.findById(decodedToken._id).select(
            "-password -refreshToken"
        );
        console.log(user);
        if (!user) {
            throw new ApiError(401, "Invalid Token");
        }
    
        req.user = user;
        //console.log("RequestUser", req.user);
        next();
    } catch (error) {
        throw new ApiError(401, "Invalid Token");
    }
});

export default verifyJwt;
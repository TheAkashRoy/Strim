import {asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
    const {fullName, email, password, username } = req.body;
    
    if (!fullName || !email || !password || !username) {
        throw new ApiError(400, "Please provide all required fields");
    };

    const exsistedUser = User.findOne({
        $or: [{email}, {username}]
    })

    if (exsistedUser) {
        throw new ApiError(400, "User with this email or username already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path; 
    
    if (!avatarLocalPath || !coverImageLocalPath) {
        throw new ApiError(400, "Please provide avatar and cover image");
    } 

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if (!avatar || !coverImage) {
        throw new ApiError(500, "Failed to upload images");
    }

    User.create({
        fullName,
        email,
        password,
        username,
        avatar: avatar.secure_url,
        coverImage: coverImage.secure_url
    });



}); 


export { registerUser };
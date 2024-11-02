const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Achievement = require("../models/achievementModel");
const Notification = require("../models/notificationModel");
const { generateToken } = require('../utils/generateToken');
const { getIpInformation } = require('../utils/getIpInformation');
const { createLog } = require('../utils/createLog');

// @desc Login user with a token
// @route POST /api/user/login
// @access Public
const login = asyncHandler(async (req, res) => {
    // Getting the form fields
    const { email, password } = req.body;

    // Check if the fields are filled
    if(!email || !password || email === '' || password === ''){
        res.status(401);
        throw new Error("Please fill all fields");
    }

    // Getting the user
    const user = await User.findOne({ email }).select('+password');

    // Check if the user exist and if the password is correct
    if(user && await user.matchPassword(password)){
        // Fetching IP info only if it's not a private IP address
        const result = await getIpInformation(req);

        // Creation of the login log
        await createLog(result, user);

        // Generate a token for the user and sending the user's information
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            description: user.description,
            rights: user.rights,
            level: user.level,
            xp: user.xp,
            achievements: user.achievements,
            followedCount: user.followedCount,
            followerCount: user.followerCount,
            createdAt: user.createdAt,
        });
    }else{
        // Sending an error
        res.status(401);
        throw new Error("A problem occur with your password or email.");
    }
});

// @desc Register a user into the DB
// @route POST /api/user/register
// @access Public
const register = asyncHandler(async (req, res) => {
    // Getting the form fields
    const { username, email, password, description } = req.body;

    // Check if the fields are filled
    if(!username || !email || !password || username === '' || email === '' || password === ''){
        res.status(400);
        throw new Error("Please fill all the required fields");
    }

    // Checking if a user with this email exist, if yes sending an error
    const emailExists = await User.findOne({email: email});
    if(emailExists){
        res.status(400);
        throw new Error("This email is already in use.");
    }

    // Checking if a user with this username exist, if yes sending an error
    const usernameExists = await User.findOne({username: username});
    if(usernameExists){
        res.status(400);
        throw new Error("This username is already taken.");
    }

    // Checks if the username is not too long or too short
    if(username.length < 3){
        res.status(400);
        throw new Error("The username must be at least 3 characters.");
    }
    if(username.length > 20){
        res.status(400);
        throw new Error("The username must be under 20 characters.");
    }

    const userDescription = description ?? '';

    // Creating the new user
    const user = await User.create({
        username: username,
        email: email,
        password: password,
        description: userDescription
    });

    // Sending the user's information or an error
    if(user){
        generateToken(res, user._id);

        // Fetching IP info only if it's not a private IP address
        const result = await getIpInformation(req);

        // Creation of the register log
        await createLog(result, user);

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            description: user.description,
            rights: user.rights,
            level: user.level,
            xp: user.xp,
            achievements: user.achievements,
            followedCount: user.followedCount,
            followerCount: user.followerCount,
            createdAt: user.createdAt,
        });
    }else{
        res.status(400);
        throw new Error("An error occur while attempting to create the user. Please retry later.");
    }
});

// @desc Update a user from the DB using his id
// @route PUT /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    // Checking if the user exist, if no we send an error
    const user = await User.findById(req.user._id);
    if(!user){
        res.status(400);
        throw new Error("The user doesn't exist.");
    }

    // Updating the user's information with the new one or the old one
    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;
    user.description = req.body.description || user.description;

    // Checking if the username is not too small or too big
    if(user.username.length < 3 || user.username.length > 20){
        res.status(400);
        throw new Error("The username must be at least 3 characters and under 20 characters.");
    }

    // Checking if the password has been modified
    if(req.body.password){
        user.password = req.body.password;
    }

    // Updating the user
    const updatedUser = await user.save();

    // Sending the user's information or an error
    if(updatedUser){
        res.status(201).json({updatedUser});
    }else{
        res.status(400);
        throw new Error("An error occur while modifying the profile. Please retry later.");
    }
});

// @desc Update a user from the DB using his id to add an achievement to his account
// @route PATCH /api/user/profile/:_id
// @access Private
const addAchievement = asyncHandler(async (req, res) => {
    // Getting the achievement id
    const achievementId = req.params._id;

    // Checking if the user exist
    const user = await User.findById(req.user._id);
    if(!user){
        res.status(400);
        throw new Error("The user doesn't exist.");
    }

    // Checking if the achievement exist and sending an error if no
    const achievement = await Achievement.findById(achievementId);
    if(!achievement){
        res.status(400);
        throw new Error("The achievement doesn't exist.");
    }

    // Checking if the user already got the achievement
    if(user.achievements.indexOf(achievementId) >= 0){
        res.status(400);
        throw new Error("The achievement is already set.");
    }

    // Adding the achievement to the user and saving
    user.achievements.push(achievement);
    const updatedUser = await user.save();

    // Sending the user's information or an error
    if(updatedUser){
        res.status(201).json({updatedUser});
    }else{
        res.status(400);
        throw new Error("An error occur while modifying the profile. Please retry later.");
    }
});

// @desc Logout a user
// @route POST /api/user/logout
// @access Private
const logout = asyncHandler(async (req, res) => {
    // Deleting the token
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({message: 'User has been logged out.'});
});

// @desc Getting a user from the DB using his id
// @route POST /api/user/profile/:_id
// @access Public
const getUserProfile = asyncHandler(async (req, res) => {
    // Getting a user using his id
    const user = await User.findById(req.params._id);

    // Sending the user's information or an error
    if(user){
        res.status(200).json({user});
    }else{
        res.status(400);
        throw new Error("No user found.");
    }
});

// @desc Deleting a user from his id
// @route DELETE /api/user/delete
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    // Deleting the user from the DB and deleting the token
    await User.findByIdAndDelete(req.user._id);
    await Notification.deleteMany({user: req.user._id});
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({message: `The user has been deleted successfully.`});
    // We don't delete the messages from the user till it's the policy of the app, everything will be there forever.
});

module.exports = {
    login,
    register,
    updateUserProfile,
    addAchievement,
    logout,
    getUserProfile,
    deleteUser,
}
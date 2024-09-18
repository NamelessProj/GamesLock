const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Achievement = require("../models/achievementModel");
const { generateToken } = require('../utils/generateToken');

// @desc Login user with a token
// @route POST /api/user/login
// @access Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password || email === '' || password === ''){
        res.status(401);
        throw new Error("Please fill all fields");
    }

    const user = await User.findOne({ email }).select('+password');
    if(user && await user.matchPassword(password)){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    }else{
        res.status(401);
        throw new Error("A problem occur with your password or email.");
    }
});

// @desc Register a user into the DB
// @route POST /api/user/register
// @access Public
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        res.status(400);
        throw new Error("Please fill all the required fields");
    }

    const emailExists = await User.findOne({email: email});
    if(emailExists){
        res.status(400);
        throw new Error("This email is already in use.");
    }

    const usernameExists = await User.findOne({username: username});
    if(usernameExists){
        res.status(400);
        throw new Error("This username is already taken.");
    }

    // Checks
    if(username.length < 3){
        res.status(400);
        throw new Error("The username must be at least 3 characters.");
    }
    if(username.length > 20){
        res.status(400);
        throw new Error("The username must be under 20 characters.");
    }

    // Creating the new user
    const user = await User.create({
        username,
        email,
        password
    });

    if(user){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
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
    const user = await User.findById(req.user._id);

    if(!user){
        res.status(400);
        throw new Error("The user doesn't exist.");
    }

    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;

    if(user.username.length < 3 || user.username.length > 20){
        res.status(400);
        throw new Error("The username must be at least 3 characters and under 20 characters.");
    }

    if(req.body.password){
        user.password = req.body.password;
    }

    const updatedUser = await user.save();

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
    const user = await User.findById(req.user._id);

    if(!user){
        res.status(400);
        throw new Error("The user doesn't exist.");
    }

    const achievement = await Achievement.findById(req.params._id);
    if(!achievement){
        res.status(400);
        throw new Error("The achievement doesn't exist.");
    }

    user.achievements.push(achievement);
    const updatedUser = await user.save();

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
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({message: 'User has been logged out.'});
});

// @desc Getting a user from the DB using his id
// @route POST /api/user/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params._id);

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
    // We don't delete the messages from the user till it's the policy of the app, everything will be there forever.
    await User.findByIdAndDelete(req.user._id);
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({message: `The user has been deleted successfully.`});
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
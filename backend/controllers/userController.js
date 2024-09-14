const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
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

    const user = await User.findOne({ email });
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
const updateUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'User updated successfully.'});
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
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    }else{
        res.status(400);
        throw new Error("No user found.");
    }
});

module.exports = {
    login,
    register,
    updateUser,
    logout,
    getUserProfile,
}
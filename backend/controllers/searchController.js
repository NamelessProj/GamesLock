const asyncHandler = require("express-async-handler");
const Message = require('../models/messageModel');
const User = require('../models/userModel');

// @desc Getting all messages that talk about a game
// @route GET /api/search/game/:game
// @access Public
const getGameSearch = asyncHandler(async (req, res) => {
    const messages = await Message.find({game: req.params.game}).populate('user');
    res.status(200).json({messages});
});

// @desc Getting all user containing a string
// @route GET /api/search/users/:string
// @access Public
const getUserSearch = asyncHandler(async (req, res) => {
    const users = await User.find().where('username').regex(new RegExp(req.params.string, 'i'));
    res.status(200).json({users});
});

module.exports = {
    getGameSearch,
    getUserSearch
}
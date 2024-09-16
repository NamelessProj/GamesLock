const asyncHandler = require("express-async-handler");
const Message = require('../models/messageModel');

// @desc Getting all messages
// @route GET /api/message/
// @access Public
const getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find().sort({'createdAt': -1});
    res.status(200).json({messages});
});

// @desc Getting all messages of a user
// @route GET /api/message/:_id
// @access Public
const getMessagesFromUser = asyncHandler(async (req, res) => {
    const messages = await Message.find().where({'user': req.params._id}).sort({'createdAt': -1});
    res.status(200).json({messages});
});

// @desc Adding a message
// @route POST /api/message/
// @access Private
const addMessage= asyncHandler(async (req, res) => {
    const { text } = req.body;
    const user = req.user._id;

    if(!text || text === ''){
        res.status(400);
        throw new Error("Please fill all the required fields");
    }

    const message = await Message.create({
        text,
        user
    });

    if(message){
        res.status(201).json({
            _id: message._id,
            text: message.text
        });
    }else{
        res.status(400);
        throw new Error("An error occur while attempting to create the user. Please retry later.");
    }
});

// @desc Deleting a message
// @route DELETE /api/message/:_id
// @access Private
const deleteMessage = asyncHandler(async (req, res) => {
    const message = await Message.findByIdAndDelete(req.params._id);
    if(!message){
        res.status(400);
        throw new Error("The message doesn't exist.");
    }
    res.status(200).json({message: `The message has been deleted successfully.`});
});

module.exports = {
    getMessages,
    getMessagesFromUser,
    addMessage,
    deleteMessage,
}
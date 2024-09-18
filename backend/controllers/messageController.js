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

// @desc Getting random messages
// @route GET /api/message/random/:num
// @access Public
const getRandomMessages = asyncHandler(async (req, res) => {
    const num = parseInt(req.params.num);
    const messages = await Message.aggregate([
        {
            $sample: {size: num}
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        }
    ]);
    res.status(200).json({messages});
});

// @desc Getting a message by his id
// @route GET /api/message/id/:_id
// @access Public
const getMessageById = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params._id).populate('user');
    if(message){
        res.status(200).json({message});
    }else{
        res.status(400);
        throw new Error("No message found.");
    }
});

// @desc Adding a message
// @route POST /api/message/
// @access Private
const addMessage= asyncHandler(async (req, res) => {
    const text = req.body.text;
    const user = req.user._id;

    const image = req.body.image || '';

    if(!text || text === ''){
        res.status(400);
        throw new Error("Please fill all the required fields");
    }

    if(text.length > 250){
        res.status(400);
        throw new Error("Text too long.");
    }

    const message = await Message.create({
        text: text,
        image: image,
        user: user
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
    getRandomMessages,
    getMessageById,
    addMessage,
    deleteMessage,
}
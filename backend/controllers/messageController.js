const asyncHandler = require("express-async-handler");
const Message = require('../models/messageModel');

// @desc Getting all messages
// @route GET /api/message/
// @access Public
const getMessages = asyncHandler(async (req, res) => {
    // Getting all messages sorting and sending those
    const messages = await Message.find().sort({'createdAt': -1});
    res.status(200).json({messages});
});

// @desc Getting all messages of a user
// @route GET /api/message/:_id
// @access Public
const getMessagesFromUser = asyncHandler(async (req, res) => {
    // Getting all messages of a user sorting and sending those
    const messages = await Message.find().where({'user': req.params._id}).sort({'createdAt': -1});
    res.status(200).json({messages});
});

// @desc Getting random messages
// @route GET /api/message/random/:num
// @access Public
const getRandomMessages = asyncHandler(async (req, res) => {
    // Getting the number of messages to send
    const num = parseInt(req.params.num);

    // Getting the messages with the user
    const messages = await Message.aggregate([
        {
            $sample: {
                size: num
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unset: "user.password"
        }
    ]);
    res.status(200).json({messages});
});

// @desc Getting a message by his id
// @route GET /api/message/id/:_id
// @access Public
const getMessageById = asyncHandler(async (req, res) => {
    // Getting a message with an id
    const message = await Message.findById(req.params._id).populate('user');

    // Sending the message or an error if the message doesn't exist
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
    // Getting the user id
    const user = req.user._id;

    // Getting all the information of the message
    const text = req.body.text;
    const image = req.body.image || '';
    const game = req.body.game || '';

    // Check if a text is filled
    if(!text || text === ''){
        res.status(400);
        throw new Error("Please fill all the required fields");
    }

    // Check if the text is too long
    if(text.length > 250){
        res.status(400);
        throw new Error("Text too long.");
    }

    // Creation of the new message
    const message = await Message.create({
        text: text,
        image: image,
        game: game,
        user: user
    });

    // Sending the new message or an error
    if(message){
        res.status(201).json({message});
    }else{
        res.status(400);
        throw new Error("An error occur while attempting to create the user. Please retry later.");
    }
});

// @desc Deleting a message
// @route DELETE /api/message/:_id
// @access Private
const deleteMessage = asyncHandler(async (req, res) => {
    // Deleting a message using his id
    const message = await Message.findByIdAndDelete(req.params._id);
    if(!message){
        res.status(400);
        throw new Error("The message doesn't exist.");
    }

    // Sending a confirmation response
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
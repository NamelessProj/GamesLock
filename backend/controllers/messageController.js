const asyncHandler = require("express-async-handler");
const Message = require('../models/messageModel');
const User = require('../models/userModel');

const getMessages = asyncHandler(async (req, res) => {
    res.status(200).json({'message': 'lol'});
});

// @desc Adding a message and linked it to the user
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

    const userRelated = await User.findById(user);
    userRelated.messages.push(message);
    await userRelated.save();

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

module.exports = {
    getMessages,
    addMessage,
}
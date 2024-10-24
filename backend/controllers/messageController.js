const asyncHandler = require("express-async-handler");
const Message = require('../models/messageModel');
const Comment = require('../models/commentModel');
const Notification = require('../models/notificationModel');
const Achievement = require('../models/achievementModel');
const mongoose = require("mongoose");

// @desc Getting all messages
// @route GET /api/message/
// @access Public
const getMessages = asyncHandler(async (req, res) => {
    // Getting all messages sorting and sending those
    const messages = await Message.find().where({isReported: 0}).sort({'createdAt': -1}).populate('user').limit(10);
    res.status(200).json({messages});
});

// @desc Getting all messages reported
// @route GET /api/message/reported
// @access Private (admin)
const getMessagesReported = asyncHandler(async (req, res) => {
    const messages = await Message.find({isReported: 1}).populate('user');
    res.status(200).json({messages});
});

// @desc Getting all messages of a user
// @route GET /api/message/:_id
// @access Public
const getMessagesFromUser = asyncHandler(async (req, res) => {
    // Getting all messages of a user sorting and sending those
    const messages = await Message.find().where({user: req.params._id, isReported: 0}).sort({'createdAt': -1}).populate('user').limit(10);
    res.status(200).json({messages});
});

// @desc Getting random messages
// @route GET /api/message/random/:num
// @access Public
const getRandomMessages = asyncHandler(async (req, res) => {
    // Getting the number of messages to send
    const num = parseInt(req.params.num);

    // Getting the messages with the user
    let messages;
    const maxTurn = 10;
    let currentTurn = 0;
    do{
        messages = await Message.aggregate([
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
                $match: {
                    isReported: 0
                }
            },
            {
                $unset: "user.password"
            }
        ]);
        currentTurn += 1;
    }while(messages.length === 0 && currentTurn < maxTurn);

    if(messages.length === 0){
        res.status(404);
        throw new Error("An error occurred while trying to get messages. Please retry later.");
    }

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
        const comments = await Comment.find({message: req.params._id}).sort({'createdAt': -1}).populate('user');
        res.status(200).json({message, comments});
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
    const user = req.user;

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

    // Checking if it's the first message of the user
    const isNotTheFirstMessage = await Message.findOne({user: user._id});
    let newAchievement= '';
    if(!isNotTheFirstMessage){
        await user.addingAchievement('66f12a330b331bb69a874164');
        newAchievement = await Achievement.findById('66f12a330b331bb69a874164');
    }

    // Giving 1 xp to the user for each message send
    await user.addXp();

    // Creation of the new message
    const message = await Message.create({
        text: text,
        image: image,
        game: game,
        user: user
    });

    // Sending the new message or an error
    if(message){
        res.status(201).json({message, newAchievement});
    }else{
        res.status(400);
        throw new Error("An error occur while attempting to post the message. Please retry later.");
    }
});

// @desc Toggle like message
// @route PATCH /api/message/like/:_id
// @access Private
const toggleMessageLike = asyncHandler(async (req, res) => {
    const messageId = req.params._id;
    const user = req.user;
    const message = await Message.findById(messageId);

    if(!message){
        res.status(400);
        throw new Error("No message found.");
    }
    
    const messageLikeCount = message.likeCount;

    let index = -1;
    const messageIdObject = new mongoose.Types.ObjectId(messageId);
    const arrayLength = user.messagesLiked.length - 1;
    for(let i = arrayLength; i >= 0; i--){
        if(user.messagesLiked[i].equals(messageIdObject)){
            index = i;
            break;
        }
    }
    if(index >= 0){
        message.likeCount = messageLikeCount <= 0 ? 0 : messageLikeCount - 1;
        user.messagesLiked.splice(index, 1);

        // Deleting the notification if it exists
        await Notification.findOneAndDelete({from: user._id, user: message.user, message: message._id, view: false, type: 'like'});
    }else{
        message.likeCount = messageLikeCount + 1;
        user.messagesLiked.push(message);

        // If the message wasn't send by the user, we create a notification
        if(!message.user.equals(user._id)){
            await Notification.create({
                text: 'Liked your message.',
                message: message._id,
                from: user._id,
                user: message.user
            });
        }
    }

    const messageUpdated = await message.save();
    const userUpdated = await user.save();

    if(!messageUpdated || !userUpdated){
        res.status(400);
        throw new Error("An error occur while attempting to update the message. Please retry later.");
    }
    
    res.status(201).json({messageUpdated});
});

// @desc Deleting a message
// @route DELETE /api/message/:_id
// @access Private (admin)
const deleteMessage = asyncHandler(async (req, res) => {
    // Deleting a message using his id
    await Message.findByIdAndDelete(req.params._id);

    // Sending a confirmation response
    res.status(200).json({message: `The message has been deleted successfully.`});
});

module.exports = {
    getMessages,
    getMessagesReported,
    getMessagesFromUser,
    getRandomMessages,
    getMessageById,
    addMessage,
    toggleMessageLike,
    deleteMessage,
}
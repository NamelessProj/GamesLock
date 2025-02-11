const asyncHandler = require("express-async-handler");
const Message = require('../models/messageModel');
const Comment = require('../models/commentModel');
const Report = require('../models/reportModel');
const Follow = require('../models/followModel');
const Notification = require('../models/notificationModel');
const Achievement = require('../models/achievementModel');
const mongoose = require("mongoose");
const {sendEmail, sendEmailBcc} = require('../utils/sendEmail');
const getRandomColorSeeded = require('../utils/getRandomColorSeeded');
const {uploadImage} = require('../utils/uploadImage');
const {deleteImage} = require('../utils/deleteImage');

// @desc Getting all messages
// @route GET /api/message/
// @access Public
const getMessages = asyncHandler(async (req, res) => {
    // Getting all messages sorting and sending those
    const messages = await Message.find().where({isReported: 0}).sort({'createdAt': -1}).populate('user');
    res.status(200).json({messages});
});

// @desc Getting the number of messages
// @route GET /api/message/count
// @access Public
const getMessageCount = asyncHandler(async (req, res) => {
    const count = await Message.find({isFromUser: true, isReported: 0}).countDocuments();
    res.status(200).json({count});
});

// @desc Getting the number of messages sent by a user
// @route GET /api/message/:_id/count
// @access Public
const getMessageCountOfAUser = asyncHandler(async (req, res) => {
    const count = await Message.find({user: req.params._id, isFromUser: true, isReported: 0}).countDocuments();
    res.status(200).json({count});
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
    const messages = await Message.find().where({user: req.params._id, isReported: 0}).sort({'createdAt': -1}).populate('user');
    res.status(200).json({messages});
});

// @desc Getting all messages from followed users
// @route GET /api/message/followed/:_id
// @access Public
const getMessagesFromFollowedUsers = asyncHandler(async (req, res) => {
    // Getting all users followed by the user
    const followed = await Follow.find().where({user: req.params._id}).select('follow');

    let followArray = [];
    followed.forEach((follow) => {
        followArray.push(follow.follow);
    });

    // Getting all messages of a user sorting and sending those
    const messages = await Message.find().where('user').in(followArray).sort({'createdAt': -1}).populate('user');
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
        res.status(404).json({message: "An error occurred while trying to get messages. Please retry later."});
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
        res.status(400).json({message: "No message found."});
        throw new Error("No message found.");
    }
});

// @desc Adding a message
// @route POST /api/message/
// @access Private
const addMessage= asyncHandler(async (req, res) => {
    // Getting the user id
    const user = req.user;

    const AUTHORIZED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

    // Getting all the information of the message
    const text = req.body.text;
    const {mimetype} = req.file ? req.file : {mimetype: ''};
    const game = req.body.game || '';
    const alt = req.body.alt || '';

    let filename = '';
    let isSensitive = false;
    if(req.file){
        filename = await uploadImage(req.file);
        isSensitive = req.body.isSensitive || false;
    }

    const imagePath = mimetype && AUTHORIZED_MIME_TYPES.includes(mimetype.toLowerCase()) ? filename : '';

    // Check if a text is filled
    if(!text || text === ''){
        res.status(400).json({message: "Please fill all the required fields."});
        throw new Error("Please fill all the required fields.");
    }

    // Check if the text is too long
    if(text.length > 250){
        res.status(400).json({message: "Text too long."});
        throw new Error("Text too long.");
    }

    // Checking if it's the first message of the user
    const isNotTheFirstMessage = await Message.findOne({user: user._id});
    let newAchievement = '';
    if(!isNotTheFirstMessage){
        await user.addingAchievement('66f12a330b331bb69a874164');
        newAchievement = await Achievement.findById('66f12a330b331bb69a874164');
    }

    let colorA = '';
    let colorB = '';
    if(game !== ''){
        const colorObj = getRandomColorSeeded(game);
        colorA = `hsl(${colorObj.h}, ${colorObj.s}%, ${colorObj.l}%)`;
        colorB = `hsl(${colorObj.h}, ${colorObj.s}%, ${colorObj.l - 30}%)`;
    }

    // Giving 2 xp to the user for each message send
    await user.addXp();

    // Creation of the new message
    const message = await Message.create({
        text,
        image: {
            path: imagePath,
            alt,
            isSensitive
        },
        game,
        color: {
            a: colorA,
            b: colorB
        },
        user,
        userId: user._id
    });

    // Sending the new message or an error
    if(message){
        const messages = await Message.find().where({isReported: 0}).sort({'createdAt': -1}).populate('user');
        res.status(201).json({messages, newAchievement, user});

        // Sending a notification to all the followers of the user if they want to receive a notification for a new message
        const followers = await Follow.find({follow: user._id}).populate('user');
        const emails = followers.filter(follow => follow.user.notification.newMessage);
        const emailsArray = emails.map(follow => follow.user.email);
        await sendEmailBcc(emailsArray, `${user.username} posted a new message`, `<p>${user.username} posted a new message.<br/><a href="${process.env.FRONTEND_URL}lock/${message._id}">Click to see the post.</a></p>`);

        emails.forEach(async (follow) => {
            try{
                await Notification.create({
                    text: 'Posted a new message.',
                    message: message._id,
                    from: user._id,
                    user: follow.user,
                    type: 'message'
                });
            }catch(e){
                console.log(e);
            }
        });

    }else{
        res.status(400).json({message: "An error occur while attempting to post the message. Please retry later."});
        throw new Error("An error occur while attempting to post the message. Please retry later.");
    }
});

// @desc Unreport a message
// @route PATCH /api/message/unreport/:_id
// @access Private (admin)
const unreportMessage = asyncHandler(async (req, res) => {
    const id = req.params._id;
    await Message.findByIdAndUpdate(id, {isReported: 0});
    await Report.deleteMany({message: id});
    res.status(200).json({message: "The message has been unreported."});
});

// @desc Toggle like message
// @route PATCH /api/message/like/:_id
// @access Private
const toggleMessageLike = asyncHandler(async (req, res) => {
    const messageId = req.params._id;
    const user = req.user;
    const message = await Message.findById(messageId);

    if(!message){
        res.status(400).json({message: "No message found."});
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
    }

    const messageUpdated = await message.save();
    const userUpdated = await user.save();

    if(!messageUpdated || !userUpdated){
        res.status(400).json({message: "An error occur while attempting to update the message. Please retry later."});
        throw new Error("An error occur while attempting to update the message. Please retry later.");
    }
    
    res.status(201).json({user: userUpdated});

    // If the message wasn't send by the user, we create a notification, we also checked if the user wants to receive a notification for a like
    if(index === -1 && !message.user.equals(user._id) && message.user.notification.like){
        await Notification.create({
            text: 'Liked your message.',
            message: message._id,
            from: user._id,
            user: message.user
        });
        await sendEmail(message.user.email, `${user.username} liked one of your post`, `<p>${user.username} liked your post. <a href="${process.env.FRONTEND_URL}lock/${message._id}">Click to see your post.</a></p>`);
    }
});

// @desc Deleting a message
// @route DELETE /api/message/:_id
// @access Private (admin)
const deleteMessage = asyncHandler(async (req, res) => {
    // Getting the message
    const msg = await Message.findById(req.params._id);

    if(!msg){
        res.status(400).json({message: "No message found."});
        throw new Error("No message found.");
    }

    // Deleting a message using his id
    await Message.findByIdAndDelete(msg._id);

    // Deleting the image of the message
    if(msg.image.path !== '') await deleteImage(msg.image.path);

    // Deleting all reports of the message
    await Report.deleteMany({message: msg._id});

    // Deleting all comments of the message
    await Comment.deleteMany({message: msg._id});

    // Sending a confirmation response
    res.status(200).json({message: `The message has been deleted successfully.`});
});

module.exports = {
    getMessages,
    getMessageCount,
    getMessageCountOfAUser,
    getMessagesReported,
    getMessagesFromUser,
    getMessagesFromFollowedUsers,
    getRandomMessages,
    getMessageById,
    addMessage,
    unreportMessage,
    toggleMessageLike,
    deleteMessage,
}
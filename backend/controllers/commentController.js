const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const Message = require("../models/messageModel");

// @desc Getting a comment by his id
// @route GET /api/comment/:_id
// @access Public
const getCommentById = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params._id);
    if(!comment){
        res.status(404);
        throw new Error("Could not find comment with id " + req.params._id);
    }else{
        res.status(200).json({comment});
    }
});

// @desc Adding a comment
// @route POST /api/comment
// @access Private
const addComment = asyncHandler(async (req, res) => {
    const text = req.body.text;
    const messageId = req.params.messageId;

    if(!text || text === ''){
        res.status(400);
        throw new Error("Please enter a valid text for comment.");
    }

    // Getting the message
    const message = await Message.findById(messageId);
    if(!message){
        res.status(400);
        throw new Error("Message doesn't exist.");
    }

    // Getting the current number of comments for the message and adding 1
    let currentCommentNum = message.commentCount;
    currentCommentNum = currentCommentNum + 1;
    message.commentCount = currentCommentNum;
    const updatedMessage = await message.save();
    if(!updatedMessage){
        res.status(400);
        throw new Error("An error occurred while attempting to update the message. Please retry later.");
    }

    const comment = await Comment.create({
        text: text,
        user: req.user._id,
        message: messageId
    });

    if(comment){
        res.status(201).json(comment);
    }else{
        res.status(400);
        throw new Error("An error occur while attempting to create the comment. Please retry later.");
    }
});

// @desc Deleting a comment
// @route DELETE /api/comment/:_id
// @access Private (admin)
const deleteComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params._id);
    if(!comment){
        res.status(400);
        throw new Error("The comment doesn't exist.");
    }

    const message = await Message.findById(comment.message);
    if(!message){
        res.status(400);
        throw new Error("The message doesn't exist.");
    }

    let currentCommentNum = message.commentCount;
    currentCommentNum = currentCommentNum === 0 ? 0 : currentCommentNum - 1;
    message.commentCount = currentCommentNum;
    const updatedMessage = await message.save();
    if(!updatedMessage){
        res.status(400);
        throw new Error("An error occur while attempting to update the comment. Please retry later.");
    }

    await Comment.findByIdAndDelete(req.params._id);

    res.status(200).json({message: `The comment has been deleted successfully.`});
});

module.exports = {
    getCommentById,
    addComment,
    deleteComment
}
const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const Message = require("../models/messageModel");

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
// @access Private
const deleteComment = asyncHandler(async (req, res) => {
    await Comment.findByIdAndDelete(req.params._id);
    res.status(200).json({message: `The comment has been deleted successfully.`});
});

module.exports = {
    addComment,
    deleteComment
}
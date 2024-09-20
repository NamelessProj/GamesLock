const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");

const addComment = asyncHandler(async (req, res) => {
    const text = req.body.text;

    if(!text || text === ''){
        res.status(400);
        throw new Error("Please enter a valid text for comment.");
    }

    const comment = await Comment.create({
        text: text,
        user: req.user._id,
        message: req.params.messageId
    });
});

module.exports = {
    addComment
}
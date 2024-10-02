const asyncHandler = require("express-async-handler");
const Report = require("../models/reportModel");
const Message = require("../models/messageModel");

// @desc Creating a report for a message
// @route POST /api/report/:_id
// @access Private
const addReport = asyncHandler(async (req, res) => {
    const messageId = req.params._id;
    const user = req.user;

    // Check if the message exist
    const message = await Message.findById(messageId);
    if(!message){
        res.status(400);
        throw new Error("The message doesn't exist.");
    }

    // Check if the message is from the user
    if(message.user.equals(user._id)){
        res.status(400);
        throw new Error("You cannot report your own message.");
    }

    // Check if there's already a report for this message by this user
    const reportExist = await Report.findOne({user: user._id, message: messageId});
    if(reportExist){
        res.status(400);
        throw new Error(`You have already report this message.`);
    }

    // Creation of the report
    const newReport = await Report.create({
        user: user._id,
        message: messageId
    });
    if(newReport){
        res.status(200).json({newReport});
    }
});

module.exports = {
    addReport,
}
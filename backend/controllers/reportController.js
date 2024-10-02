const asyncHandler = require("express-async-handler");
const Report = require("../models/reportModel");
const Message = require("../models/messageModel");

// @desc Getting all report
// @route GET /api/report/
// @access Private (admin)
const getAllReports = asyncHandler(async (req, res) => {
    const reports = await Report.find().populate('message');
    res.status(200).json({reports});
});

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

    // Checking if the message has 3 or more report
    const numberOfReport = await Report.find({message: messageId}).countDocuments();
    if(numberOfReport >= 3){
        message.isReported = 1;
        await message.save();
    }

    if(newReport){
        res.status(200).json({newReport});
    }
});

// @desc Deleting a report for a message
// @route DELETE /api/report/:_id
// @access Private
const deleteReport = asyncHandler(async (req, res) => {
    const reportId = req.params._id;
    const user = req.user._id;

    // Check if report exist
    const report = await Report.findById(reportId);
    if(!report){
        res.status(400);
        throw new Error("The report doesn't exist.");
    }

    // Check if is user who has created the report
    if(!report.user.equals(user)){
        res.status(400);
        throw new Error("You're not the one who created this report.");
    }

    // Deleting the report
    await Report.findByIdAndDelete(report._id);
    res.status(200).json({message: `The report has been deleted.`});
});

module.exports = {
    getAllReports,
    addReport,
    deleteReport
}
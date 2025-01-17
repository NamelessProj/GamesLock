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

// @desc Getting all report of a user
// @route GET /api/report/:_id
// @access Private (admin)
const getAllReportsOfUser = asyncHandler(async (req, res) => {
    const reports = await Report.find().where({user: req.params._id}).populate('user').populate('message');
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
        res.status(400).json({message: "The message doesn't exist."});
        throw new Error("The message doesn't exist.");
    }

    // Check if the message isn't an achievement
    if(!message.isFromUser){
        res.status(400).json({message: "You cannot report an achievement."});
        throw new Error("You cannot report an achievement.");
    }

    // Check if the message is from the user
    if(message.user.equals(user._id)){
        res.status(400).json({message: "You cannot report your own message."});
        throw new Error("You cannot report your own message.");
    }

    // Check if there's already a report for this message by this user
    const reportExist = await Report.findOne({user: user._id, message: messageId});
    if(reportExist){
        res.status(400).json({message: "You have already report this message."});
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
// @access Private (admin)
const deleteReport = asyncHandler(async (req, res) => {
    const reportId = req.params._id;
    const user = req.user._id;

    // Check if report exist
    const report = await Report.findById(reportId);
    if(!report){
        res.status(400).json({message: "The report doesn't exist."});
        throw new Error("The report doesn't exist.");
    }

    // Check if is user who has created the report
    if(!report.user.equals(user)){
        res.status(400).json({message: "You're not the one who created this report."});
        throw new Error("You're not the one who created this report.");
    }

    // Deleting the report
    await Report.findByIdAndDelete(report._id);

    // Check if there's still more than 3 report for the message
    const reportNumber = await Report.find().where({message: report.message}).countDocuments();
    if(reportNumber < 3){
        await Message.findByIdAndUpdate(report.message, {isReported: 0});
    }

    res.status(200).json({message: `The report has been deleted.`});
});

// @desc Deleting all reports of a message
// @route DELETE /api/report/all/:_id
// @access Private (admin)
const deleteAllReportOfAMessage = asyncHandler(async (req, res) => {
    await Report.deleteMany({message: req.params._id});
    await Message.findByIdAndUpdate(req.params._id, {isReported: 0});
    res.status(200).json({message: `All the reports for this message have been deleted successfully.`});
});

module.exports = {
    getAllReports,
    getAllReportsOfUser,
    addReport,
    deleteReport,
    deleteAllReportOfAMessage
}
const asyncHandler = require("express-async-handler");
const Log = require('../models/logModel');
const cron = require('node-cron');

// @desc Getting all the logs of a user
// @route GET /api/log/
// @access Private
const getLogs = asyncHandler(async (req, res) => {
    const logs = await Log.find({user: req.user._id}).sort({createdAt: -1});
    res.status(200).json({logs});
});

// @desc Deleting a log with an id
// @route DELETE /api/log/delete/:_id
// @access Private
const deleteALog = asyncHandler(async (req, res) => {
    const id = req.params._id;
    const log = await Log.findOne({_id: id, user: req.user._id});
    if(!log){
        res.status(404).json({message: "Log not found."});
        throw new Error(`No log found.`);
    }
    await Log.findByIdAndDelete(id);
    const logs = await Log.find({user: req.user._id});
    res.status(200).json({logs});
});

// @desc Deleting all log of a user
// @route DELETE /api/log/delete
// @access Private
const deleteAllLogs = asyncHandler(async (req, res) => {
    await Log.deleteMany({user: req.user._id});
    res.status(200).json({message: `All the logs have been deleted successfully.`});
});



/*-----------------------------------------*/
/*                  CRON JOB               */
/*-----------------------------------------*/


cron.schedule('0 3 1 * *', asyncHandler(async () => {
    // Deleting all the logs that are older than 3 months every 1st day of the month at 3:00 AM
    const currentDate = new Date();
    await Log.deleteMany({createdAt: {$lt: currentDate.setMonth(currentDate.getMonth() - 3)}});
}));


module.exports = {
    getLogs,
    deleteALog,
    deleteAllLogs
}
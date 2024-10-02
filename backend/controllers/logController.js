const asyncHandler = require("express-async-handler");
const Log = require('../models/logModel');

// @desc Deleting a log with an id
// @route DELETE /api/log/delete/:_id
// @access Private
const deleteALog = asyncHandler(async (req, res) => {
    const id = req.params._id;
    const log = await Log.findOne({_id: id, user: req.user._id});
    if(!log){
        res.status(404);
        throw new Error(`No log found.`);
    }
    await Log.findByIdAndDelete(id);
    res.status(200).json({message: `The log was deleted successfully.`});
});

// @desc Deleting all log of a user
// @route DELETE /api/log/delete
// @access Private
const deleteAllLogs = asyncHandler(async (req, res) => {
    await Log.deleteMany({user: req.user._id});
    res.status(200).json({message: `All the logs have been deleted successfully.`});
});

module.exports = {
    deleteALog,
    deleteAllLogs
}
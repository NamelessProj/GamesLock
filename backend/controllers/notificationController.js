const asyncHandler = require("express-async-handler");
const Notification = require('../models/notificationModel');

// @desc Deleting a notification using his id
// @route DELETE /api/notification/:_id
// @access Public
const deleteANotification = asyncHandler(async (req, res) => {
    const notification = await Notification.findById(req.params._id);
    if(notification.user.equals(req.user._id)){
        await Notification.findByIdAndDelete(req.params._id);
        res.status(200).json({message: `The notification has been deleted successfully.`});
    }else{
        res.status(401);
        throw new Error("You're not authorized to delete this notification.");
    }
});

// @desc Deleting all notifications
// @route DELETE /api/notification/
// @access Public
const deleteAllNotifications = asyncHandler(async (req, res) => {
    await Notification.deleteMany({user: req.user._id});
    res.status(200).json({message: `The notifications has been deleted successfully.`});
});

module.exports = {
    deleteANotification,
    deleteAllNotifications
}
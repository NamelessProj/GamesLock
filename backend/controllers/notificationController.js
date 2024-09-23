const asyncHandler = require("express-async-handler");
const Notification = require('../models/notificationModel');

// @desc Getting the number of notification unread
// @route GET /api/notification/count
// @access Private
const getNotificationCount = asyncHandler(async (req, res) => {
    const notificationNumber = await Notification.find({user: req.user._id, view: false}).countDocuments();
    res.status(200).json({notificationNumber});
});

// @desc Set a notification of a user as read
// @route PATCH /api/notification/read/:_id
// @access Private
const readANotification = asyncHandler(async (req, res) => {
    const notification = await Notification.findOne({user: req.user._id, _id: req.params._id});
    if(!notification){
        res.status(404);
        throw new Error('Notification not found.');
    }
    notification.view = true;
    notification.save();
    res.status(201).json({notification});
});

// @desc Set all the notification of a user as read
// @route PATCH /api/notification/read
// @access Private
const readAllNotifications = asyncHandler(async (req, res) => {
    await Notification.updateMany({user: req.user._id, view: false}, {$set: {view: true}});
    res.status(201).send('successfully updated notifications.');
});

// @desc Deleting a notification using his id
// @route DELETE /api/notification/:_id
// @access Private
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
// @route DELETE /api/notification
// @access Private
const deleteAllNotifications = asyncHandler(async (req, res) => {
    await Notification.deleteMany({user: req.user._id});
    res.status(200).json({message: `The notifications has been deleted successfully.`});
});

module.exports = {
    getNotificationCount,
    readANotification,
    readAllNotifications,
    deleteANotification,
    deleteAllNotifications
}
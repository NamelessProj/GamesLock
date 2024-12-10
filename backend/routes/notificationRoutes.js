const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const {protect} = require('../middleware/authMiddleware');

// @route Notification route (GET)
// @desc Route to get the number of unread notification
// @access Private
router.route('/:_id/count').get(protect, notificationController.getNotificationCount);

// @route Notification route (GET)
// @desc Route to get all user's notifications
// @access Private
router.route('/:_id').get(protect, notificationController.getUserNotifications);

// @route Notification route (PATCH)
// @desc Route to read all notification of a user
// @access Private
router.route('/read').patch(protect, notificationController.readAllNotifications);

// @route Notification route (DELETE)
// @desc Route to delete a notification
// @access Private
router.route('/:_id').delete(protect, notificationController.deleteANotification);

// @route Notification route (DELETE)
// @desc Route to delete all notifications
// @access Private
router.route('/').delete(protect, notificationController.deleteAllNotifications);

module.exports = router;
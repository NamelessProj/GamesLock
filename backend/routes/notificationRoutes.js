const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const {protect} = require('../middleware/authMiddleware');

// @route Notification route (DELETE)
// @desc Route to delete a notification
// @access Private
router.route('/:_id').delete(protect, notificationController.deleteANotification);

// @route Notification route (DELETE)
// @desc Route to delete all notifications
// @access Private
router.route('/').delete(protect, notificationController.deleteAllNotifications);

module.exports = router;
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const {protect} = require("../middleware/authMiddleware");
const {uploadImage} = require('../middleware/uploadImage');

// @route Message route (GET)
// @desc Route to get all message
// @access Public
router.route('/').get(messageController.getMessages);

// @route Message route (GET)
// @desc Route to get the number of messages
// @access Public
router.route('/count').get(messageController.getMessageCount);

// @route Message route (GET)
// @desc Route to get the number of messages of a user
// @access Public
router.route('/:_id/count').get(messageController.getMessageCountOfAUser);

// @route Message route (GET)
// @desc Route to get all message that are reported
// @access Private (admin)
router.route('/reported').get(protect(['admin']), messageController.getMessagesReported);

// @route Message route (GET)
// @desc Route to get all message of a user
// @access Public
router.route('/:_id').get(messageController.getMessagesFromUser);

// @route Message route (GET)
// @desc Route to get all message from followed users
// @access Public
router.route('/followed/:_id').get(messageController.getMessagesFromFollowedUsers);

// @route Message route (GET)
// @desc Route to get random messages
// @access Public
router.route('/random/:num').get(messageController.getRandomMessages);

// @route Message route (GET)
// @desc Route to get a message
// @access Public
router.route('/id/:_id').get(messageController.getMessageById);

// @route Message route (POST)
// @desc Route to add a message
// @access Private
router.route('/').post(protect(), uploadImage.single('image'), messageController.addMessage);

// @route Message route (PATCH)
// @desc Route to toggle like
// @access Private
router.route('/like/:_id').patch(protect(), messageController.toggleMessageLike);

// @route Message route (DELETE)
// @desc Route to delete a message
// @access Private
router.route('/:_id').delete(protect(['admin']), messageController.deleteMessage);

// @route Message route (DELETE)
// @desc Route to delete a reported message
// @access Private
router.route('/report/:_id').delete(protect(['admin']), messageController.deleteReportedMessage);

module.exports = router;
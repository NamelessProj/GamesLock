const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const {protect, adminProtect} = require("../middleware/authMiddleware");

// @route Message route (GET)
// @desc Route to get all message
// @access Public
router.route('/').get(messageController.getMessages);

// @route Message route (GET)
// @desc Route to get all message of a user
// @access Public
router.route('/:_id').get(messageController.getMessagesFromUser);

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
router.route('/').post(protect, messageController.addMessage);

// @route Message route (POST)
// @desc Route to toggle like
// @access Private
router.route('/like/:_id').post(protect, messageController.toggleMessageLike);

// @route Message route (DELETE)
// @desc Route to delete a message
// @access Private
router.route('/:_id').delete(adminProtect, messageController.deleteMessage);

module.exports = router;
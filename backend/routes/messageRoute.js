const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const {protect} = require("../middleware/authMiddleware");

// @route Message route (GET)
// @desc Route to get all message
// @access Public
router.route('/').get(messageController.getMessages);

// @route Message route (POST)
// @desc Route to add a message
// @access Private
router.route('/').post(protect, messageController.addMessage);

router.route('/:_id').delete(protect, messageController.deleteMessage);

module.exports = router;
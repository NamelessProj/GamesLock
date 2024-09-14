const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// @route Message route (GET)
// @desc Route to get all message
// @access Public
router.route('/').get(messageController.getMessages);

module.exports = router;
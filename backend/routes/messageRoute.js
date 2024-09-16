const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const {protect} = require("../middleware/authMiddleware");

// @route Message route (GET)
// @desc Route to get all message
// @access Public
router.route('/').get(messageController.getMessages);

router.route('/').post(protect, messageController.addMessage);

module.exports = router;
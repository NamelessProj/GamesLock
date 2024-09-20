const express = require('express');
const router = express.Router();
const commentController = require("../controllers/commentController");
const {protect} = require("../middleware/authMiddleware");

// @route Comment route (POST)
// @desc Route to add a comment
// @access Private
router.route('/:messageId').post(protect, commentController.addComment);

module.exports = router;
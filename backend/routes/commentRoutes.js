const express = require('express');
const router = express.Router();
const commentController = require("../controllers/commentController");
const {protect, adminProtect} = require("../middleware/authMiddleware");

// @route Comment route (GET)
// @desc Route to get a comment
// @access Public
router.route('/:_id').get(commentController.getCommentById);

// @route Comment route (POST)
// @desc Route to add a comment
// @access Private
router.route('/:messageId').post(protect, commentController.addComment);

// @route Comment route (DELETE)
// @desc Route to delete a comment
// @access Private
router.route('/:_id').delete(adminProtect, commentController.deleteComment);

module.exports = router;
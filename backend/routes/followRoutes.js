const express = require('express');
const router = express.Router();
const FollowController = require('../controllers/followController');
const {protect} = require('../middleware/authMiddleware');

// @route Follow route (GET)
// @desc Route to get all the follows of an account
// @access Private
router.route('/:_id').get(protect, FollowController.getAllFollowOfAUser);

// @route Follow route (POST)
// @desc Route to create a follow relationship between two accounts
// @access Private
router.route('/:_id').post(protect, FollowController.addFollow);

// @route Follow route (DELETE)
// @desc Route to delete a follow relationship between two accounts
// @access Private
router.route('/:_id').delete(protect, FollowController.deletingFollow);

module.exports = router;
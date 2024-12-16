const express = require('express');
const router = express.Router();
const FollowController = require('../controllers/followController');
const {protect} = require('../middleware/authMiddleware');

// @route Follow route (GET)
// @desc Route to get all the follows of an account
// @access Private
router.route('/').get(protect(), FollowController.getAllFollowOfAUser);

// @route Follow route (GET)
// @desc Route to get if a user follow another user
// @access Private
router.route('/:_id').get(protect(), FollowController.getIfAUserFollowAnId);

// @route Follow route (GET)
// @desc Route to get all the users who follow an account using his id
// @access Private
router.route('/user/:_id').get(protect(), FollowController.getAllUserWhoFollow);

// @route Follow route (POST)
// @desc Route to create a follow relationship between two accounts
// @access Private
router.route('/:_id').post(protect(), FollowController.addFollow);

// @route Follow route (DELETE)
// @desc Route to delete a follow relationship between two accounts
// @access Private
router.route('/:_id').delete(protect(), FollowController.deletingFollow);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');
const {upload} = require("../middleware/uploadImage");

// @route User route (POST)
// @desc Route to create a user
// @access Public
router.route('/register').post(userController.register);

// @route User route (POST)
// @desc Route to create a user
// @access Public
router.route('/login').post(userController.login);

// @route User route (POST)
// @desc Route to logout a user
// @access Private
router.route('/logout').post(userController.logout);

// @route User route (PUT)
// @desc Route to edit a user profile
// @access Private
router.route('/profile').put(protect, upload.single('profileImage'), userController.updateUserProfile);

// @route User route (PUT)
// @desc Route to delete a user profile picture
// @access Private
router.route('/profile/deleteImage').put(protect, userController.removeProfilePicture);

// @route User route (PATCH)
// @desc Route to add an achievement to a user
// @access Private
router.route('/profile/:_id').patch(protect, userController.addAchievement);

// @route User route (GET)
// @desc Route to get the profile of a user
// @access Public
router.route('/profile/:_id').get(userController.getUserProfile);

// @route User route (DELETE)
// @desc Route to delete a user
// @access Private
router.route('/delete').delete(protect, userController.deleteUser);

module.exports = router;
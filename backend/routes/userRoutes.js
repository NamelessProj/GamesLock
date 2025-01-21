const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');
const {uploadImage} = require("../middleware/uploadImage");

// @route User route (POST)
// @desc Route to create a user
// @access Public
router.route('/register').post(userController.register);

// @route User route (POST)
// @desc Route to create a user
// @access Public
router.route('/login').post(userController.login);

// @route User route (POST)
// @desc Route to create and sent an OTP to a user
// @access Public
router.route('/otp').post(userController.generateOtp);

// @route User route (POST)
// @desc Route to logout a user
// @access Private
router.route('/logout').post(userController.logout);

// @route User route (PUT)
// @desc Route to edit a user profile
// @access Private
router.route('/profile').put(protect(), uploadImage.single('profileImage'), userController.updateUserProfile);

// @route User route (PUT)
// @desc Route to edit a user notification
// @access Private
router.route('/profile/notification').put(protect(), userController.updateUserNotification);

// @route User route (PUT)
// @desc Route to edit a user password
// @access Private
router.route('/profile/password').put(protect([], true), userController.updateUserPassword);

// @route User route (PUT)
// @desc Route to delete a user profile picture
// @access Private
router.route('/profile/deleteImage').put(protect(), userController.removeProfilePicture);

// @route User route (PATCH)
// @desc Route to add an achievement to a user
// @access Private
router.route('/profile/:_id').patch(protect(), userController.addAchievement);

// @route User route (GET)
// @desc Route to get the profile of a user
// @access Public
router.route('/profile/:_id').get(userController.getUserProfile);

// @route User route (GET)
// @desc Route to get the number of users
// @access Public
router.route('/count').get(userController.getUserCount);

// @route User route (POST)
// @desc Route to generate and send an OTP for deleting a user
// @access Private
router.route('/delete/otp').post(protect(), userController.generateDeleteOtp);

// @route User route (POST)
// @desc Route to delete a user
// @access Private
router.route('/delete').post(protect([], true), userController.deleteUser);

module.exports = router;
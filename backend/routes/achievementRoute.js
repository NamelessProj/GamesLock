const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');
const {protect} = require('../middleware/authMiddleware');

// @route User route (POST)
// @desc Route to create an achievement
// @access Private
router.route('/').post(protect, achievementController.createAchievement);

// @route User route (PUT)
// @desc Route to update an achievement
// @access Private
router.route('/:_id').put(protect, achievementController.updateAchievement);

module.exports = router;
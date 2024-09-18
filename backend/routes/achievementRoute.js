const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');

// @route User route (POST)
// @desc Route to create an achievement
// @access Private
router.route('/').post(achievementController.createAchievement);

// @route User route (PUT)
// @desc Route to update an achievement
// @access Private
router.route('/:_id').put(achievementController.updateAchievement);

module.exports = router;
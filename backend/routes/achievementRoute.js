const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');
const {protect} = require('../middleware/authMiddleware');

// @route Achievement route (GET)
// @desc Route to get all achievements
// @access Public
router.route('/').get(achievementController.getAllAchievements);

// @route Achievement route (POST)
// @desc Route to create an achievement
// @access Private (admin)
router.route('/').post(protect(), achievementController.createAchievement);

// @route Achievement route (PUT)
// @desc Route to update an achievement
// @access Private (admin)
router.route('/:_id').put(protect(), achievementController.updateAchievement);

module.exports = router;
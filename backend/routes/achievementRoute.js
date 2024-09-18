const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');

// @route User route (POST)
// @desc Route to create an achievement
// @access Private
router.route('/add').post(achievementController.createAchievement);

module.exports = router;
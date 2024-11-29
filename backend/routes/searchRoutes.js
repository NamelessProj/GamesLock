const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// @route Search route (GET)
// @desc Route to get all messages that talk about a game
// @access Public
router.route('/game/:game').get(searchController.getGameSearch);

// @route Search route (GET)
// @desc Route to get all user containing a string
// @access Public
router.route('/users/:string').get(searchController.getUserSearch);

module.exports = router;
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const {protect} = require('../middleware/authMiddleware');

// @route Report route (POST)
// @desc Route to add a report for a message
// @access Private
router.route('/:_id').post(protect, reportController.addReport);

module.exports = router;
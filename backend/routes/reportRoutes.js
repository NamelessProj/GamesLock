const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const {protect} = require('../middleware/authMiddleware');

// @route Report route (POST)
// @desc Route to add a report for a message
// @access Private
router.route('/:_id').post(protect, reportController.addReport);

// @route Report route (DELETE)
// @desc Route to delete a report for a message
// @access Private
router.route('/:_id').delete(protect, reportController.deleteReport);

module.exports = router;
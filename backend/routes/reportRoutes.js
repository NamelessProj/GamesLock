const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const {protect} = require('../middleware/authMiddleware');

// @route Report route (GET)
// @desc Route to get all reports
// @access Private (admin)
router.route('/').get(protect(['admin']), reportController.getAllReports);

// @route Report route (GET)
// @desc Route to get all reports of a user
// @access Private (admin)
router.route('/:_id').get(protect(['admin']), reportController.getAllReportsOfUser);

// @route Report route (POST)
// @desc Route to add a report for a message
// @access Private
router.route('/:_id').post(protect(), reportController.addReport);

// @route Report route (DELETE)
// @desc Route to delete a report for a message
// @access Private (admin)
router.route('/:_id').delete(protect(['admin']), reportController.deleteReport);

// @route Report route (DELETE)
// @desc Route to delete all report of a message
// @access Private (admin)
router.route('/all/:_id').delete(protect(['admin']), reportController.deleteAllReportOfAMessage);

module.exports = router;
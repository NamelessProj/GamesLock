const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const {protect} = require('../middleware/authMiddleware');

// @route Log route (GET)
// @desc Route to get all the logs of a user
// @access Private
router.route('/').get(protect(), logController.getLogs);

// @route Log route (DELETE)
// @desc Route to delete a log with an id
// @access Private
router.route('/delete/:_id').delete(protect(), logController.deleteALog);

// @route Log route (DELETE)
// @desc Route to delete all log of the user
// @access Private
router.route('/delete').delete(protect(), logController.deleteAllLogs);

module.exports = router;
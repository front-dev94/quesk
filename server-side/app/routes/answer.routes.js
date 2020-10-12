// Initialize express router
let router = require('express').Router();

// Import user controller
var answerController = require('../controllers/answer.controller');

// User routes
router.route('/questions/:questionId/answers')
    .post(answerController.create);

// Export API routes
module.exports = router;


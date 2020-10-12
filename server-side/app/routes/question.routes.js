// Initialize express router
let router = require('express').Router();

// Import question controller
var questionController = require('../controllers/question.controller');
// Question routes
router.route('/questions')
    .get(questionController.getAllQuestions)
    .post(questionController.create);

router.route('/questions/:id')
    .get(questionController.getQuestion)
    .put(questionController.updateQuestion)
    .delete(questionController.deleteQuestion);

router.route('/questions/:id/vote-up')
    .post(questionController.voteUp);

router.route('/questions/:id/vote-down')
    .post(questionController.voteDown);

// Export API routes
module.exports = router;
// Initialize express router
let router = require('express').Router();

// Import user controller
var authController = require('../controllers/auth.controller');

// User routes
router.route('/login')
    .post(authController.login);

router.route('/sign-up')
    .post(authController.signUp);

// Export API routes
module.exports = router;


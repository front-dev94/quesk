// Initialize express router
let router = require('express').Router();

// Import user controller
var userController = require('../controllers/user.controller');

// User routes
router.route('/users')
    .get(userController.getAllUsers)
    .post(userController.create);

router.route('/users/:id')
    .get(userController.getSpecificUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

// Export API routes
module.exports = router;


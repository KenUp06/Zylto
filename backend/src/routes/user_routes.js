// user_routes.js
const express = require('express'); 
const userController = require('../controllers/user_controller');
const router = express.Router();

router.post('/', userController.createUser); // ya no tiene /users
router.get('/', userController.getAllUsers); 
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
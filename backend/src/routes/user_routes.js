// user_routes.js
const express = require('express'); 
const userController = require('../controllers/user_controller');
const authMiddleware = require('../middlewares/auth_middleware');

const router = express.Router();

router.post('/', userController.createUser); // ya no tiene /users
router.get('/', authMiddleware,userController.getAllUsers); 
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
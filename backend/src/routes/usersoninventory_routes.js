const express = require('express');
const usersOnInventoryController = require('../controllers/usersoninventory_controller');
const authMiddleware = require('../middlewares/auth_middleware');

const router = express.Router();

router.post('/', authMiddleware, usersOnInventoryController.addUserToInventory);
router.get('/', authMiddleware, usersOnInventoryController.getAllUsersOnInventory);
router.get('/:userId/:inventoryId', authMiddleware, usersOnInventoryController.getUserInventoryPermission);
router.put('/:userId/:inventoryId', authMiddleware, usersOnInventoryController.updateUserInventoryPermission);
router.delete('/:userId/:inventoryId', authMiddleware, usersOnInventoryController.removeUserFromInventory);

module.exports = router;
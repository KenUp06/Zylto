const express = require('express');
const usersOnInventoryController = require('../controllers/usersoninventory_controller');

const router = express.Router();

router.post('/', usersOnInventoryController.addUserToInventory);
router.get('/', usersOnInventoryController.getAllUsersOnInventory);
router.get('/:userId/:inventoryId', usersOnInventoryController.getUserInventoryPermission);
router.put('/:userId/:inventoryId', usersOnInventoryController.updateUserInventoryPermission);
router.delete('/:userId/:inventoryId', usersOnInventoryController.removeUserFromInventory);

module.exports = router;
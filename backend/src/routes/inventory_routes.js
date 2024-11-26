const express = require('express');
const inventoryController = require('../controllers/inventory_controller');

const router = express.Router();

router.post('/', inventoryController.createInventory);
router.get('/', inventoryController.getAllInventories);
router.get('/:id', inventoryController.getInventoryById);
router.put('/:id', inventoryController.updateInventory);
router.delete('/:id', inventoryController.deleteInventory);

module.exports = router;
const express = require('express');
const inventoryController = require('../controllers/inventory_controller');
const authMiddleware = require('../middlewares/auth_middleware');

const router = express.Router();

router.post('/', authMiddleware, inventoryController.createInventory);
router.get('/', authMiddleware, inventoryController.getAllInventories);
router.get('/:id', authMiddleware, inventoryController.getInventoryById);
router.put('/:id', authMiddleware, inventoryController.updateInventory);
router.delete('/:id', authMiddleware, inventoryController.deleteInventory);

module.exports = router;
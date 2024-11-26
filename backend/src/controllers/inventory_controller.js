const Inventory = require('../models/inventory_model');

exports.createInventory = (req, res) => {
    const newInventory = req.body;
    Inventory.createInventory(newInventory, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Inventario creado con éxito', inventoryId: result.insertId });
    });
};

exports.getAllInventories = (req, res) => {
    Inventory.getAllInventories((err, inventories) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(inventories);
    });
};

exports.getInventoryById = (req, res) => {
    const id = req.params.id;
    Inventory.getInventoryById(id, (err, inventory) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!inventory.length) {
            return res.status(404).json({ message: 'Inventario no encontrado' });
        }
        res.status(200).json(inventory[0]);
    });
};

exports.updateInventory = (req, res) => {
    const id = req.params.id;
    const updatedInventory = req.body;
    Inventory.updateInventory(id, updatedInventory, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Inventario no encontrado' });
        }
        res.status(200).json({ message: 'Inventario actualizado con éxito' });
    });
};

exports.deleteInventory = (req, res) => {
    const id = req.params.id;
    Inventory.deleteInventory(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Inventario no encontrado' });
        }
        res.status(200).json({ message: 'Inventario eliminado con éxito' });
    });
};
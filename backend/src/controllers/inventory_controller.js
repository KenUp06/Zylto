const Inventory = require('../models/inventory_model');

exports.getAllInventories = (req, res) => {
    const userId = req.user.id; // ID del usuario autenticado
    Inventory.getInventoriesByUserId(userId, (err, inventories) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(inventories);
    });
};

exports.createInventory = (req, res) => {
    const newInventory = { ...req.body, idadmin: req.user.id }; // Asegúrate de usar `idadmin`
    Inventory.createInventory(newInventory, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Si todo está bien, devolvemos el inventario con su id y nombre
        res.status(201).json({
            message: 'Inventario creado con éxito',
            inventory: {
                idinventory: result.insertId, // Asegúrate de que insertId sea usado para crear el nuevo inventario
                name: newInventory.name,
                idadmin: newInventory.idadmin
            }
        });
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
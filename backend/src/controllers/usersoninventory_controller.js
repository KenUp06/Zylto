// /controllers/usersOnInventoryController.js
const UsersOnInventory = require('../models/usersoninventory_model');

exports.addUserToInventory = (req, res) => {
    const data = req.body;
    UsersOnInventory.addUserToInventory(data, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Usuario agregado al inventario con éxito' });
    });
};

exports.getAllUsersOnInventory = (req, res) => {
    UsersOnInventory.getAllUsersOnInventory((err, usersOnInventory) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(usersOnInventory);
    });
};

exports.getUserInventoryPermission = (req, res) => {
    const data = { iduser: req.params.iduser, idinventory: req.params.idinventory };
    UsersOnInventory.getUserInventoryPermission(data, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!result.length) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }
        res.status(200).json(result[0]);
    });
};

exports.updateUserInventoryPermission = (req, res) => {
    const data = { iduser: req.params.iduser, idinventory: req.params.idinventory, permission: req.body.permission };
    UsersOnInventory.updateUserInventoryPermission(data, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }
        res.status(200).json({ message: 'Permiso actualizado con éxito' });
    });
};

exports.removeUserFromInventory = (req, res) => {
    const data = { iduser: req.params.iduser, idinventory: req.params.idinventory };
    UsersOnInventory.removeUserFromInventory(data, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado en el inventario' });
        }
        res.status(200).json({ message: 'Usuario eliminado del inventario con éxito' });
    });
};

const User = require('../models/user_model');

exports.createUser = (req, res) => {
    const newUser = req.body;
    User.createUser(newUser, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Usuario creado con éxito', userId: result.insertId });
    });
};

exports.getAllUsers = (req, res) => {
    User.getAllUsers((err, users) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(users);
    });
};

exports.getUserById = (req, res) => {
    const id = req.params.id;
    User.getUserById(id, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user.length) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user[0]);
    });
};

exports.updateUser = (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    User.updateUser(id, updatedUser, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado con éxito' });
    });
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;
    User.deleteUser(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    });
};
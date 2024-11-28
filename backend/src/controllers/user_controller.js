const User = require('../models/user_model');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.createUser = async (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;

    if (!firstname || !lastname || !email || !username || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hasheamos la contraseña

        db.query(
            'INSERT INTO users (firstname, lastname, email, username, pass) VALUES (?, ?, ?, ?, ?)',
            [firstname, lastname, email, username, hashedPassword],
            (err, result) => {
                if (err) return res.status(500).json({ message: 'Error al registrar el usuario' });
                res.status(201).json({ message: 'Usuario registrado con éxito', userId: result.insertId });
            }
        );
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
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
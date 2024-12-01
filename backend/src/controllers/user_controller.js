const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const SECRET_KEY = process.env.SECRET_KEY || 'your_jwt_secret_key';

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Error en el servidor' });
    if (results.length === 0) return res.status(401).json({ message: 'Usuario no encontrado' });

    const user = results[0];
    const isValid = await bcrypt.compare(password, user.pass);
    if (!isValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.iduser, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Inicio de sesión exitoso', token });
  });
};

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
    const { firstname, lastname, username, phone, password } = req.body;

    if (!firstname || !lastname || !username) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const updateFields = {
        firstname,
        lastname,
        username,
        phone
    };

    if (password) {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: 'Error al actualizar la contraseña' });
            updateFields.pass = hashedPassword;

            db.query('UPDATE users SET ? WHERE iduser = ?', [updateFields, id], (err, result) => {
                if (err) return res.status(500).json({ message: 'Error al actualizar el usuario' });
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                }
                res.status(200).json({ message: 'Usuario actualizado con éxito' });
            });
        });
    } else {
        db.query('UPDATE users SET ? WHERE iduser = ?', [updateFields, id], (err, result) => {
            if (err) return res.status(500).json({ message: 'Error al actualizar el usuario' });
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.status(200).json({ message: 'Usuario actualizado con éxito' });
        });
    }
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
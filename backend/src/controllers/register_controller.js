const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (firstname, lastname, email, pass) VALUES (?, ?, ?, ?)',
    [firstname, lastname, email, hashedPassword],
    (err) => {
      if (err) return res.status(500).json({ message: 'Error al registrar el usuario' });
      res.status(201).json({ message: 'Usuario registrado con éxito' });
    }
  );
};

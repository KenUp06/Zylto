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
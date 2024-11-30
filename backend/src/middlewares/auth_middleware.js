const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'your_jwt_secret_key';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado: No se proporcionó un token' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Token decodificado:", decoded); // <---- Agregado para verificar el contenido del token
    req.user = { id: decoded.id }; // Asegúrate de que el token contenga un campo `id`
    next();
  } catch (error) {
    console.error("Error de token:", error.message); // <---- Agregado para verificar errores
    res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;

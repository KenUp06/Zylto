// routes.js
const express = require('express');
const router = express.Router();

// Importar rutas específicas
const articleRoutes = require('./article_routes');
const userRoutes = require('./user_routes');
const inventoryRoutes = require('./inventory_routes');
const usersOnInventoryRoutes = require('./usersoninventory_routes');
const authRoutes = require('./auth_routes');

// Ruta de bienvenida
router.get('/', (req, res) => {
    res.send('Bienvenido a la API de Zylto');
});

// Rutas específicas
router.use('/articles', articleRoutes);
router.use('/users', userRoutes);  // usará /api/users para las rutas de usuarios
router.use('/inventories', inventoryRoutes);
router.use('/usersoninventory', usersOnInventoryRoutes);
router.use('/auth', authRoutes);

router.get('/test-routes', (req, res) => {
    res.send('La ruta de prueba en routes.js está funcionando');
});

module.exports = router;
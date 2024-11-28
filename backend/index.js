const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const routes = require('./src/routes/routes'); // Archivo centralizado de rutas

require('dotenv').config();
const db = require('./src/config/db.js');

app.use(cors());
app.use(express.json());

app.use(routes);  

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
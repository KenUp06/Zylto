const mysql = require('mysql2');
require('dotenv').config(); //carga las variables de entorno

//configurar la conexion a la bd con las credenciales en .env
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

//establecer la conexión
connection.connect((err) => {
    if (err){
        console.log("No se ha podido establecer la conexión a la base de datos.", err);
        return;
    }
    else{
        console.log("Conexión a la base de datos establecida exitosamente.")
    }
});

module.exports = connection;

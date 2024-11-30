const db = require('../config/db');

class Inventory {
    // Crear un nuevo inventario asociado al usuario autenticado
    static createInventory(inventory, callback) {
        const query = 'INSERT INTO Inventories (name, idadmin) VALUES (?, ?)';
        db.query(query, [inventory.name, inventory.idadmin], callback);
    }

    // Obtener todos los inventarios de un usuario específico (por idadmin)
    static getInventoriesByUserId(idadmin, callback) {
        const query = 'SELECT * FROM Inventories WHERE idadmin = ?';
        db.query(query, [idadmin], callback);
    }

    // Obtener un inventario específico por su ID
    static getInventoryById(id, callback) {
        const query = 'SELECT * FROM Inventories WHERE idinventory = ?';
        db.query(query, [id], callback);
    }

    // Actualizar un inventario por su ID
    static updateInventory(id, inventory, callback) {
        const query = 'UPDATE Inventories SET name = ?, idadmin = ? WHERE idinventory = ?';
        db.query(query, [inventory.name, inventory.idadmin, id], callback);
    }

    // Eliminar un inventario por su ID
    static deleteInventory(id, callback) {
        const query = 'DELETE FROM Inventories WHERE idinventory = ?';
        db.query(query, [id], callback);
    }
}

module.exports = Inventory;

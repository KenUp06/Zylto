const db = require('../config/db');

class Inventory {
    static createInventory(inventory, callback) {
        const query = 'INSERT INTO Inventories (name, idadmin) VALUES (?, ?)';
        db.query(query, [inventory.name, inventory.idadmin], callback);
    }

    static getAllInventories(callback) {
        const query = 'SELECT * FROM Inventories';
        db.query(query, callback);
    }

    static getInventoryById(id, callback) {
        const query = 'SELECT * FROM Inventories WHERE idinventory = ?';
        db.query(query, [id], callback);
    }

    static updateInventory(id, inventory, callback) {
        const query = 'UPDATE Inventories SET name = ?, idadmin = ? WHERE idinventory = ?';
        db.query(query, [inventory.name, inventory.idadmin, id], callback);
    }

    static deleteInventory(id, callback) {
        const query = 'DELETE FROM Inventories WHERE idinventory = ?';
        db.query(query, [id], callback);
    }
}

module.exports = Inventory;

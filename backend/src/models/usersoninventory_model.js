const db = require('../config/db');

class UsersOnInventory {
    static addUserToInventory(data, callback) {
        const query = 'INSERT INTO UsersOnInventory (iduser, idinventory, permission) VALUES (?, ?, ?)';
        db.query(query, [data.iduser, data.idinventory, data.permission], callback);
    }

    static getAllUsersOnInventory(callback) {
        const query = 'SELECT * FROM UsersOnInventory';
        db.query(query, callback);
    }

    static getUserInventoryPermission(data, callback) {
        const query = 'SELECT permission FROM UsersOnInventory WHERE iduser = ? AND idinventory = ?';
        db.query(query, [data.iduser, data.idinventory], callback);
    }

    static updateUserInventoryPermission(data, callback) {
        const query = 'UPDATE UsersOnInventory SET permission = ? WHERE iduser = ? AND idinventory = ?';
        db.query(query, [data.permission, data.iduser, data.idinventory], callback);
    }

    static removeUserFromInventory(data, callback) {
        const query = 'DELETE FROM UsersOnInventory WHERE iduser = ? AND idinventory = ?';
        db.query(query, [data.iduser, data.idinventory], callback);
    }
}

module.exports = UsersOnInventory;
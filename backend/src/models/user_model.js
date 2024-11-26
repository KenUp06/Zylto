const db = require('../config/db');

class User {
    static createUser(user, callback) {
        const query = 'INSERT INTO Users (firstname, lastname, username, phone, email, pass) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [user.firstname, user.lastname, user.username, user.phone, user.email, user.pass], callback);
    }

    static getAllUsers(callback) {
        const query = 'SELECT * FROM Users';
        db.query(query, callback);
    }

    static getUserById(id, callback) {
        const query = 'SELECT * FROM Users WHERE iduser = ?';
        db.query(query, [id], callback);
    }

    static updateUser(id, user, callback) {
        const query = 'UPDATE Users SET firstname = ?, lastname = ?, username = ?, phone = ?, email = ?, pass = ? WHERE iduser = ?';
        db.query(query, [user.firstname, user.lastname, user.username, user.phone, user.email, user.pass, id], callback);
    }

    static deleteUser(id, callback) {
        const query = 'DELETE FROM Users WHERE iduser = ?';
        db.query(query, [id], callback);
    }
}

module.exports = User;
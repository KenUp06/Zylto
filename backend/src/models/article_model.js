const db = require('../config/db');

class Article {
    static createArticle(article, callback) {
        const query = 'INSERT INTO Articles (name, amount, price, idinventory) VALUES (?, ?, ?, ?)';
        db.query(query, [article.name, article.amount, article.price, article.idinventory], callback);
    }

    static getAllArticles(callback) {
        const query = 'SELECT * FROM Articles';
        db.query(query, callback);
    }

    static getArticleById(id, callback) {
        const query = 'SELECT * FROM Articles WHERE idarticle = ?';
        db.query(query, [id], callback);
    }

    static updateArticle(id, article, callback) {
        const query = 'UPDATE Articles SET name = ?, amount = ?, price = ?, idinventory = ? WHERE idarticle = ?';
        db.query(query, [article.name, article.amount, article.price, article.idinventory, id], callback);
    }

    static deleteArticle(id, callback) {
        const query = 'DELETE FROM Articles WHERE idarticle = ?';
        db.query(query, [id], callback);
    }
}

module.exports = Article;
const Article = require('../models/article_model');

exports.createArticle = (req, res) => {
    const article = req.body;
    Article.createArticle(article, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Artículo creado con éxito', articleId: result.insertId });
    });
};

exports.getArticlesByInventory = (req, res) => {
    const { idinventory } = req.params; // Obtener el ID del inventario desde los parámetros
    Article.getArticlesByInventory(idinventory, (err, articles) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(articles);
    });
};

exports.updateArticle = (req, res) => {
    const { id } = req.params;
    const article = req.body;
    Article.updateArticle(id, article, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Artículo actualizado con éxito' });
    });
};

exports.deleteArticle = (req, res) => {
    const { id } = req.params;
    Article.deleteArticle(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Artículo eliminado con éxito' });
    });
};

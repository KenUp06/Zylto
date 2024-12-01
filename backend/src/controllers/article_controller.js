const Article = require('../models/article_model');

exports.createArticle = (req, res) => {
    const { name, amount, price, idinventory } = req.body;
    Article.createArticle({ name, amount, price, idinventory }, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Artículo creado con éxito', articleId: result.insertId });
    });
};

exports.getArticlesByInventory = (req, res) => {
    const { idinventory } = req.params;
    Article.getArticlesByInventory(idinventory, (err, articles) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(articles);
    });
};

exports.updateArticle = (req, res) => {
    const id = req.params.id;
    const updatedArticle = req.body;

    // Asegúrate de que el idinventory esté incluido
    Article.updateArticle(id, updatedArticle, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
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

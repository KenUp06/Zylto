const Article = require('../models/article_model.js');

exports.createArticle = (req, res) => {
    const newArticle = req.body;
    Article.createArticle(newArticle, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Artículo creado con éxito', articleId: result.insertId });
    });
};

exports.getAllArticles = (req, res) => {
    Article.getAllArticles((err, articles) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(articles);
    });
};

exports.getArticleById = (req, res) => {
    const id = req.params.id;
    Article.getArticleById(id, (err, article) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!article.length) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        res.status(200).json(article[0]);
    });
};

exports.updateArticle = (req, res) => {
    const id = req.params.id;
    const updatedArticle = req.body;
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
    const id = req.params.id;
    Article.deleteArticle(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        res.status(200).json({ message: 'Artículo eliminado con éxito' });
    });
};
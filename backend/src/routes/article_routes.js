const express = require('express');
const articleController = require('../controllers/article_controller');
const authMiddleware = require('../middlewares/auth_middleware');

const router = express.Router();

router.post('/', authMiddleware ,articleController.createArticle);
router.get('/', authMiddleware, articleController.getAllArticles);
router.get('/:id', authMiddleware, articleController.getArticleById);
router.put('/:id', authMiddleware, articleController.updateArticle);
router.delete('/:id', authMiddleware, articleController.deleteArticle);

module.exports = router;
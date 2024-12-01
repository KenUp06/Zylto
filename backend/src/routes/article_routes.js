const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article_controller');
const authMiddleware = require('../middlewares/auth_middleware');

router.post('/', authMiddleware, articleController.createArticle);
router.get('/inventory/:idinventory', authMiddleware, articleController.getArticlesByInventory);
router.put('/:id', authMiddleware, articleController.updateArticle);
router.delete('/:id', authMiddleware, articleController.deleteArticle);

module.exports = router;

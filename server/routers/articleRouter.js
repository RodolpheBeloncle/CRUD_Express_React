const articleRouter = require('express').Router();
const article = require('../models/articleModel');
const isAuthorized = require('../middlewares/isAuthorized');

// Api CRUD routes for Blog
articleRouter.get('/', async (req, res) => {
  article.findAllArticles().then(([articles]) => {
    res.json(articles);
  });
});

articleRouter.get('/:id', async (req, res) => {
  const [[name]] = await article.findOneArticleById(req.params.id);
  if (name) {
    res.json(name);
  } else {
    res.status(404).json();
  }
});

articleRouter.post('/', isAuthorized, async (req, res) => {
  console.log('admin_id', res.locals);
  const adminId = res.locals;
  console.log("admin_id",adminId);

  const [{ insertId: id }] = await article.insertArticle(req.body,adminId);
  const newArticle = req.body;
  res.status(201).json({
    id,
    ...newArticle,
  });
});

articleRouter.delete('/:id', isAuthorized, async (req, res) => {
  await article.deleteArticle(req.params.id);
  res.status(204).json();
});

articleRouter.put('/:id', isAuthorized, async (req, res) => {
  await article.updateArticle(req.body, req.params.id);
  res.status(204).json();
});

module.exports = articleRouter;


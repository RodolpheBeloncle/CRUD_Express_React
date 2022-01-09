const connection = require('../db-config');
const dataBase = connection.promise();

const findAllArticles = () => dataBase.query('SELECT * FROM articles');

const findOneArticleById = (id) => dataBase.query('SELECT * FROM articles WHERE id = ?', [id]);

const insertArticle = ({ name, text, image }, idAdmin) => dataBase.query(
  'INSERT INTO articles (name, text,image, id_admin) VALUES (?, ?, ?, ?)',
  [name, text, image, idAdmin]
);

const deleteArticle = (id) => dataBase.query('DELETE FROM articles WHERE id = ?', [id]);

const updateArticle = (object, id) => dataBase.query('UPDATE articles SET ? WHERE id = ?', [object, id]);

module.exports = {
  findAllArticles,
  findOneArticleById,
  insertArticle,
  deleteArticle,
  updateArticle,
};

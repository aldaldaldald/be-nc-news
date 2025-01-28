const db = require("../db/connection");

const fetchArticleById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id=$1`, [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ message: "Article not found" });
      } else {
        return rows[0];
      }
    });
};

module.exports = { fetchArticleById };

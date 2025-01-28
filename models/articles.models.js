const db = require("../db/connection");

const fetchArticles = () => {
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id)::int AS comment_count
         FROM articles
         FULL JOIN comments
         ON articles.article_id = comments.article_id
         GROUP BY articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url
         ORDER BY articles.created_at DESC
      `
    )
    .then(({ rows }) => {
      return rows;
    });
};

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

const fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id 
       FROM articles
       LEFT JOIN comments
       ON articles.article_id = comments.article_id
       WHERE articles.article_id=$1
       ORDER BY created_at DESC`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ message: "Article not found" });
      } else if (rows[0].comment_id === null) {
        return Promise.reject({ message: "No comments found" });
      } else {
        return rows;
      }
    });
};

module.exports = { fetchArticles, fetchArticleById, fetchCommentsByArticleId };

const db = require("../db/connection");
const { convertTimestampToDate } = require("../db/seeds/utils");

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

const addCommentByArticleId = (newComment, articleId) => {
  const { username, body } = newComment;
  const { article_id } = articleId;
  const votes = 0;
  const { created_at } = convertTimestampToDate({ created_at: new Date() });
  if (body === "") {
    return Promise.reject({ message: "Body is empty" });
  }
  if (!body) {
    return Promise.reject({ message: "Body is missing" });
  }
  if (!username) {
    return Promise.reject({ message: "Username is missing" });
  }
  return db
    .query(
      `INSERT INTO comments (body, votes, author, article_id, created_at) 
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [body, votes, username, article_id, created_at]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

const incrementVotesByArticleId = (article_id, inc_votes) => {
  if (inc_votes === (typeof NaN !== "number")) {
    return Promise.reject({ message: "inc_votes is not a number" });
  }
  if (inc_votes === 0) {
    return Promise.reject({ message: "inc_votes cannot be zero" });
  }
  return db
    .query(
      `
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;
   `,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

module.exports = {
  fetchArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  addCommentByArticleId,
  incrementVotesByArticleId,
};

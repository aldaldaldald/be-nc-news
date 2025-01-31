const db = require("../db/connection");
const { convertTimestampToDate } = require("../db/seeds/utils");

const fetchArticles = (queries) => {
  const sort_by = queries.sort_by;
  const order = queries.order;

  let SQLString = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes,  articles.article_img_url, 
         COUNT(comments.article_id)::int AS comment_count 
         FROM articles
         FULL JOIN comments
         ON articles.article_id = comments.article_id
         GROUP BY articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url
         `;

  if (sort_by) {
    const validColumnNamesToSortBy = ["author", "topic"];
    if (validColumnNamesToSortBy.includes(sort_by)) {
      SQLString += ` ORDER BY articles.${sort_by}`;
    } else {
      return Promise.reject({ message: "Invalid column name" });
    }
    if (order === "desc" || order === "asc") {
      SQLString += " " + order;
    }
    if (!order) {
      SQLString += " desc";
    }
  } else {
    {
      SQLString += ` ORDER BY articles.created_at DESC`;
    }
  }

  return db.query(SQLString).then(({ rows }) => {
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
      `SELECT comment_id, votes, created_at, author, body, article_id 
       FROM comments
       WHERE article_id=$1
       ORDER BY created_at DESC`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ message: "Article not found" });
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

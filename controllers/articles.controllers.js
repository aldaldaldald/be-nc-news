const {
  fetchArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  addCommentByArticleId,
  incrementVotesByArticleId,
} = require("../models/articles.models");

const getArticles = (req, res, next) => {
  const queries = req.query;
  fetchArticles(queries)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

const getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

const postCommentByArticleId = (req, res, next) => {
  const newComment = req.body;
  const articleId = req.params;
  addCommentByArticleId(newComment, articleId)
    .then((newComment) => {
      res.status(201).send({ comment: newComment });
    })
    .catch((err) => {
      next(err);
    });
};

const patchVotesByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  incrementVotesByArticleId(article_id, inc_votes)
    .then((updatedArticle) => {
      res.status(200).send(updatedArticle);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchVotesByArticleId,
};

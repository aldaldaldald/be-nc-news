const express = require("express");
const app = express();
const endpointsJson = require("./endpoints.JSON");

const { getTopics } = require("./controllers/topics.controllers.js");
const {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchVotesByArticleId,
} = require("./controllers/articles.controllers.js");
const {
  deleteCommentByCommentId,
} = require("./controllers/comments.controllers.js");

// middleware

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).send({ endpoints: endpointsJson });
});

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.patch("/api/articles/:article_id", patchVotesByArticleId);

app.delete("/api/comments/:comment_id", deleteCommentByCommentId);

app.all("*", (req, res) => {
  res.status(404).send({ err: "Endpoint not found" });
});

// error-handling middleware
// 400's
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ err: "Bad Request" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(400).send({ err: "User does not exist" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const message = "Body is missing";
  if (err.message === message) {
    res.status(400).send({ err: message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const message = "Username is missing";
  if (err.message === message) {
    res.status(400).send({ err: message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const message = "Body is empty";
  if (err.message === message) {
    res.status(400).send({ err: message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "23502") {
    res.status(400).send({ err: "inc_votes required" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const message = "inc_votes is not a number";
  if (err.message === message) {
    res.status(400).send({ err: message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const message = "inc_votes cannot be zero";
  if (err.message === message) {
    res.status(400).send({ err: message });
  } else {
    next(err);
  }
});

// 404's
app.use((err, req, res, next) => {
  if (err.message === "No comments found") {
    res.status(404).send({ err: "No comments found" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.message === "Article not found") {
    res.status(404).send({ err: "Not found" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  const message = "Comment ID not found";
  if (err.message === message) {
    res.status(404).send({ err: message });
  } else {
    next(err);
  }
});

// 500
app.use((err, req, res, next) => {
  console.log(err, "<<< You have not handled this error yet");
  res.status(500).send({ err: "Internal Server Error" });
});

module.exports = app;

const express = require("express");
const app = express();
const endpointsJson = require("./endpoints.json");

const { getTopics } = require("./controllers/topics.controllers.js");
const { getUsers } = require("./controllers/users.controllers.js");
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

app.get("/api/users", getUsers);

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
// 400
app.use((err, req, res, next) => {
  const errMessages = [
    "Invalid column name",
    "Invalid column ID",
    "Invalid article ID",
    "Invalid filter",
    "User does not exist",
    "Body is missing",
    "Username is missing",
    "Body is empty",
    "inc_votes is not a number",
    "inc_votes cannot be zero",
    "inc_votes required",
    "Comment ID not a number",
  ];
  for (let msg of errMessages) {
    if (msg === err.message) {
      return res.status(400).send({ err: "Bad Request", message: err.message });
    }
  }
  next(err);
});

// 404
app.use((err, req, res, next) => {
  const errMessages = [
    "No comments found",
    "Article not found",
    "Comment ID not found",
  ];
  for (let msg of errMessages) {
    if (msg === err.message) {
      return res.status(404).send({ err: "Not found", message: err.message });
    }
  }
  next(err);
});

// 500
app.use((err, req, res, next) => {
  console.log(err, "<<< You have not handled this error yet");
  res.status(500).send({ err: "Internal Server Error" });
});

module.exports = app;

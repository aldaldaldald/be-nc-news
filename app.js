const express = require("express");
const app = express();
const endpointsJson = require("./endpoints.JSON");

const { getTopics } = require("./controllers/topics.controllers.js");
const {
  getArticles,
  getArticleById,
} = require("./controllers/articles.controllers.js");

// middleware

app.get("/api", (req, res) => {
  res.status(200).send({ endpoints: endpointsJson });
});

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.all("*", (req, res) => {
  res.status(404).send({ error: "Endpoint not found" });
});

// error-handling middleware

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ error: "Bad Request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.message === "Article not found") {
    res.status(404).send({ error: "Not found" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err, "<<< You have not handled this error yet");
  res.status(500).send({ error: "Internal Server Error" });
});

module.exports = app;

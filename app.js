const express = require("express");
const app = express();
const endpointsJson = require("./endpoints.JSON");

app.use(express.json());

app.get("/api", (request, response) => {
  response.status(200).send({ endpoints: endpointsJson });
});

module.exports = app;

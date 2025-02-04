const endpointsJson = require("../endpoints.json");

const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("404", () => {
  test('404: Responds with 404 and a message of "Endpoint not found"', () => {
    return request(app)
      .get("/api/notfound")
      .expect(404)
      .then((res) => {
        expect(res.body.err).toBe("Endpoint not found");
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) => {
        expect(topics.length).toBe(testData.topicData.length);
        topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api/users", () => {
  test("200: Responds with an array of user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users.length).toBe(testData.userData.length);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api/articles", () => {
  test("200: Responds with an array of article objects sorted by created_at date descending as default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles.length).toBe(testData.articleData.length);
        expect(articles).toBeSortedBy("created_at", {
          descending: true,
        });
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
  test("200: Responds with an array of article objects sorted by author descending as default", () => {
    const queries = ["author"];
    return request(app)
      .get("/api/articles?&sort_by=author")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy(queries, {
          descending: true,
        });
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
  test("200: Responds with an array of article objects sorted by topic descending as default", () => {
    const queries = ["topic"];
    return request(app)
      .get("/api/articles?&sort_by=topic")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy(queries, {
          descending: true,
        });
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
  test("200: Responds with an array of article objects sorted by author ascending", () => {
    const queries = ["author"];
    return request(app)
      .get("/api/articles?&sort_by=author&order=asc")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy(queries, {
          descending: false,
        });
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
  test("200: Responds with an array of article objects sorted by topic ascending", () => {
    const queries = ["topic"];
    return request(app)
      .get("/api/articles?&sort_by=topic&order=asc")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy(queries, {
          descending: false,
        });
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
  test("200: Responds with an array of article objects sorted by author descending", () => {
    const queries = ["author"];
    return request(app)
      .get("/api/articles?&sort_by=author&order=desc")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy(queries, {
          descending: true,
        });
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
  test("200: Responds with an array of article objects sorted by topic descending", () => {
    const queries = ["topic"];
    return request(app)
      .get("/api/articles?&sort_by=topic&order=desc")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy(queries, {
          descending: true,
        });
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
  test("200: Responds with an array of article objects filtered by topic", () => {
    const topics = [
      ...new Set(testData.articleData.map((object) => object.topic)),
    ];
    const queries = "cats";
    return request(app)
      .get("/api/articles?&filter_by=cats")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(topics).toContain(queries);
        expect(articles.length).toBe(1);
        expect(articles).toBeSortedBy(queries, {
          descending: true,
        });
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: "cats",
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
  test("400: Invalid filter request", () => {
    const topics = [
      ...new Set(testData.articleData.map((object) => object.topic)),
    ];
    const queries = "invalidfilter";
    return request(app)
      .get("/api/articles?&filter_by=invalidfilter")
      .expect(400)
      .then(({ body: { err, message } }) => {
        expect(topics).not.toContain(queries);
        expect(err).toBe("Bad Request");
        expect(message).toBe("Invalid filter");
      });
  });
  test("400: Invalid column ID", () => {
    return request(app)
      .get("/api/articles?&sort_by=invalidcolumn")
      .expect(400)
      .then(({ body: { err, message } }) => {
        expect(err).toBe("Bad Request");
        expect(message).toBe("Invalid column ID");
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: Responds with an article object", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toEqual(
          expect.objectContaining({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
          })
        );
      });
  });
  test("200: Responds with an article object and its comment_count", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toEqual(
          expect.objectContaining({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number),
          })
        );
      });
  });
  test("400: ID not a number", () => {
    return request(app)
      .get("/api/articles/text")
      .expect(400)
      .then(({ body: { err, message } }) => {
        expect(err).toBe("Bad Request");
        expect(message).toBe("Invalid article ID");
      });
  });
  test("404: Article not found", () => {
    return request(app)
      .get("/api/articles/9000")
      .expect(404)
      .then(({ body: { err } }) => {
        expect(err).toBe("Not found");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: Responds with all comments as an object with most recent comments first", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toBeSortedBy("created_at", {
          descending: true,
        });
        comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              article_id: expect.any(Number),
            })
          );
        });
      });
  });
  test("404: Article not found", () => {
    return request(app)
      .get("/api/articles/9000/comments")
      .expect(404)
      .then(({ body: { err, message } }) => {
        expect(err).toBe("Not found");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: Responds by adding a comment with a username and body to an article", () => {
    const newComment = {
      username: "icellusedkars",
      body: "This is my comment",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body: { comment } }) => {
        expect(comment).toEqual(
          expect.objectContaining({
            author: "icellusedkars",
            votes: 0,
            body: "This is my comment",
            article_id: 1,
            created_at: expect.any(String),
          })
        );
      });
  });
  test("400: Responds error message 'Body is missing' if no body", () => {
    const newComment = {
      username: "icellusedkars",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then(({ body: { err, message } }) => {
        expect(err).toBe("Bad Request");
        expect(message).toBe("Body is missing");
      });
  });
  test("400: Responds error message 'Username is missing' if no username", () => {
    const newComment = {
      body: "This is my comment",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then(({ body: { err, message } }) => {
        expect(err).toBe("Bad Request");
        expect(message).toBe("Username is missing");
      });
  });
  test("400: Responds error message 'Body is empty' if no body content", () => {
    const newComment = {
      username: "icellusedkars",
      body: "",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then(({ body: { err, message } }) => {
        expect(err).toBe("Bad Request");
        expect(message).toBe("Body is empty");
      });
  });
  test("400: Responds with an error when the username does not exist", () => {
    const newComment = {
      username: "userdoesnotexistuserdoesnotexistuserdoesnotexist",
      body: "This is my comment",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then(({ body: { err, message } }) => {
        expect(err).toBe("Bad Request");
        expect(message).toBe("User does not exist");
      });
  });
  test("400: Invalid article ID", () => {
    return request(app)
      .get("/api/articles/invalidarticleid")
      .expect(400)
      .then(({ body: { err, message } }) => {
        expect(err).toBe("Bad Request");
        expect(message).toBe("Invalid article ID");
      });
  });
  test("404: Article not found", () => {
    return request(app)
      .get("/api/articles/9000/comments")
      .expect(404)
      .then(({ body: { err } }) => {
        expect(err).toBe("Not found");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: Patches an article object and increments the vote by 10", () => {
    const newVote = 10;
    const vote = { inc_votes: newVote };
    return request(app)
      .patch("/api/articles/1")
      .send(vote)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("article_id");
        expect(body).toHaveProperty("votes");
        expect(body.votes).toBe(110);
      });
  });
  test("200: Patches an article object and decrements the vote by 10", () => {
    const newVote = -10;
    const vote = { inc_votes: newVote };
    return request(app)
      .patch("/api/articles/1")
      .send(vote)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("article_id");
        expect(body).toHaveProperty("votes");
        expect(body.votes).toBe(90);
      });
  });
  test("400: Responds error message 'inc_votes required' if no vote", () => {
    const newVote = null;
    const vote = { inc_votes: newVote };
    return request(app)
      .patch("/api/articles/1")
      .send(vote)
      .expect(400)
      .then(({ body: { err, message } }) => {
        expect(err).toBe("Bad Request");
        expect(message).toBe("inc_votes required");
      });
  });
  test("400: Responds error message 'inc_votes is not a number' if vote is not an number", () => {
    const newVote = typeof NaN !== "number";
    const vote = { inc_votes: newVote };
    return request(app)
      .patch("/api/articles/1")
      .send(vote)
      .expect(400)
      .then(({ body: { err, message } }) => {
        expect(err).toBe("Bad Request");
        expect(message).toBe("inc_votes is not a number");
      });
  });
  test("400: Responds error message 'inc_votes cannot be zero' if vote is not an number", () => {
    const newVote = 0;
    const vote = { inc_votes: newVote };
    return request(app)
      .patch("/api/articles/1")
      .send(vote)
      .expect(400)
      .then(({ body: { err, message } }) => {
        expect(err).toBe("Bad Request");
        expect(message).toBe("inc_votes cannot be zero");
      });
  });
  test("400: Invalid article ID", () => {
    return request(app)
      .get("/api/articles/invalidarticleid")
      .expect(400)
      .then(({ body: { err, message } }) => {
        expect(err).toBe("Bad Request");
        expect(message).toBe("Invalid article ID");
      });
  });
  test("404: Article not found", () => {
    return request(app)
      .get("/api/articles/9000")
      .expect(404)
      .then(({ body: { err } }) => {
        expect(err).toBe("Not found");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: Deletes a comment object by comment ID ", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
  test("400: Comment ID not a number", () => {
    return request(app)
      .delete("/api/comments/text")
      .expect(400)
      .then(({ body: { err, message } }) => {
        expect(err).toBe("Bad Request");
        expect(message).toBe("Comment ID not a number");
      });
  });
  test("404: Comment ID not found", () => {
    return request(app)
      .delete("/api/comments/9000/")
      .expect(404)
      .then(({ body: { err } }) => {
        expect(err).toBe("Not found");
      });
  });
});

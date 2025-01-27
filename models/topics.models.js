const db = require("../db/connection");

const fetchTopics = () => {
  let SQLString = `SELECT * FROM topics`;
  return db.query(SQLString).then(({ rows }) => {
    return rows;
  });
};

module.exports = { fetchTopics };

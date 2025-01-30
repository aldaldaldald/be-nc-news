const db = require("../db/connection");

const deleteComment = (comment_id) => {
  return db
    .query(
      `DELETE FROM comments
         WHERE comment_id = $1
         RETURNING *;`,
      [comment_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ message: "Comment ID not found" });
      } else {
        return rows[0];
      }
    });
};

module.exports = {
  deleteComment,
};

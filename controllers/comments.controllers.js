const { deleteComment } = require("../models/comments.models");

const deleteCommentByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id)
    .then((response) => {
      res.status(204).send({ response });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  deleteCommentByCommentId,
};

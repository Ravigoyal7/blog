const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  text: String,
  postId: String,

  user: { type: mongoose.Types.ObjectId, ref: "user" },
});
exports.CommentModel = mongoose.model("comment", comment);

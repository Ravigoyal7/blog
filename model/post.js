const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  about: String,
  description: String,
   user: { type: mongoose.Types.ObjectId, ref: "user" },
});
exports.PostModel = mongoose.model("Post", Post);

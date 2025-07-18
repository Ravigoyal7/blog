const mongoose = require("mongoose");

const Todo = new mongoose.Schema({
  title: String,
  isCompleted: { default: false, type: Boolean },
  user: { type: mongoose.Types.ObjectId, ref: "user" },
});
exports.TodoModel = mongoose.model("todos", Todo);

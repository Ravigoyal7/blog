const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  token: String,
});
exports.UserModel = mongoose.model("user", User);

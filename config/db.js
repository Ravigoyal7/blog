const mongoose = require("mongoose");

exports.conenctDb = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/todos")
    .then(() => console.log("connected"));
};

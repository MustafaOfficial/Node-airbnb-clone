const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: String,
  // ref must match the model name in User.js: mongoose.model("User", ...)
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Post", postSchema);

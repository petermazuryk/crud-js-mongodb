const { Schema, model } = require("mongoose");

const postsSchema = new Schema({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
});

module.exports = model("posts", postsSchema);

const Posts = require("../models/postsModel");
const controller = {};

//ROUTES//

// get all posts
controller.getPosts = async (req, res) => {
  try {
    const posts = await Posts.find({});
    res.send(posts);
  } catch (e) {
    console.log("GET Posts Error", e);
  }
};

// create post
controller.createPost = async (req, res) => {
  try {
    const reqBody = {
      title: req.body.title,
      text: req.body.text,
    };
    const post = new Posts(reqBody);
    await post.save();
    res.send(post);
  } catch (e) {
    console.log("GET Posts Error", e);
  }
};

// delete post
controller.deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const removePost = await Posts.findByIdAndDelete(id);
    res.send(removePost);
  } catch (e) {
    console.log("Delete post is error", e);
  }
};

module.exports = controller;

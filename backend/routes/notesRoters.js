const { Router } = require("express");
const router = Router();
const postsControllers = require("../controllers/postsControllers");

router.get("/posts", postsControllers.getPosts);
router.post("/posts", postsControllers.createPost);
router.delete("/posts/:id", postsControllers.deletePost);
module.exports = router;

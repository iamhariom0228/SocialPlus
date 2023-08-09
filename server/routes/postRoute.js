const express = require("express");
const router = express.Router();

const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  deleteComment,
  getPost,
  getTimelinePosts,
} = require("../controllers/postControlller");

router.post("/new", createPost);
router.put("/:id", updatePost).delete("/:id", deletePost).get("/:id", getPost);
router.put("/:id/like", likePost);
router.put("/:id/comment", commentPost).delete("/:id/comment", deleteComment);
router.get("/timeline/all", getTimelinePosts);


module.exports = router;

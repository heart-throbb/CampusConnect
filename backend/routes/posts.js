const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getPosts,
  getPostById,
  createPost,
  deletePost,
  createAnswer,
  deleteAnswer,
  voteAnswer,
} = require("../controllers/postController");

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", authMiddleware, createPost);
router.delete("/:id", authMiddleware, deletePost);
router.post("/:id/answers", authMiddleware, createAnswer);
router.delete("/:id/answers/:answerId", authMiddleware, deleteAnswer);
router.post("/:id/answers/:answerId/vote", authMiddleware, voteAnswer);

module.exports = router;

const Post = require("../models/Post");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email") //getting name and email only of usr
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server Error while fetching posts" });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "name email") //getting name and email only of usr
      .populate("answers.user", "name email"); //getting name and email only of usr
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server Error while fetching the post" });
  }
};

const createPost = async (req, res) => {
  try {
    // destructing only req thigns form bodu
    const { title, content, tags } = req.body;
    const newPost = new Post({
      title,
      content,
      tags,
      user: req.user.userId,
    });
    const savedPost = await newPost.save();
    await savedPost.populate("user", "name email");
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Server Error while creating post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.user.toString() !== req.user.userId) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this post" });
    }
    await post.deleteOne();
    res.json({ message: "Post removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error while deleting post" });
  }
};

const createAnswer = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const newAnswer = { content, user: req.user.userId };
    post.answers.unshift(newAnswer);
    await post.save();
    await post.populate("answers.user", "name email");
    res.status(201).json(post.answers[0]);
  } catch (error) {
    res.status(500).json({ message: "Server Error while submitting answer" });
  }
};

const deleteAnswer = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const answer = post.answers.id(req.params.answerId);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    if (answer.user.toString() !== req.user.userId) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this answer" });
    }
    answer.deleteOne();
    await post.save();
    res.json({ message: "Answer removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error while deleting answer" });
  }
};

const voteAnswer = async (req, res) => {
  try {
    // destructing only req thign form bodu
    const { type } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const answer = post.answers.id(req.params.answerId);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    const currentUserId = req.user.userId;
    const previousVoteType = answer.votesMap.get(currentUserId);
    if (previousVoteType === type) {
      answer.votesMap.delete(currentUserId);
      answer.votes += type === "up" ? -1 : 1;
    } else {
      let voteChange = 0;
      if (!previousVoteType) {
        voteChange = type === "up" ? 1 : -1;
      } else {
        voteChange = type === "up" ? 2 : -2;
      }
      answer.votes += voteChange;
      answer.votesMap.set(currentUserId, type);
    }
    await post.save();
    res.json(answer);
  } catch (error) {
    res.status(500).json({ message: "Server Error while voting" });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  deletePost,
  createAnswer,
  deleteAnswer,
  voteAnswer,
};

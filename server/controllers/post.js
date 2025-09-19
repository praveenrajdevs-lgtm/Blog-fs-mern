const Post = require("../models/Post");
const mongoose = require("mongoose");

// create post
const createPost = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;

    if (!title || !content)
      return res
        .status(400)
        .json({ message: "Title and content are required" });

    const userId = req.user.id;

    const newPost = new Post({
      title,
      content,
      imageUrl,
      author: userId,
    });

    const savedPost = await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: savedPost });
  } catch (error) {
    console.error("Post creation error:", error);
    res.status(500).json({ message: "server error while post creation" });
  }
};

// get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email");

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json({
      message: "Posts retrieved successfully",
      posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server error while getting all posts" });
  }
};

// get single post
const getSinglePost = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }
    console.log("1");
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username email"
    );
    console.log("2");
    if (!post) return res.status(404).json({ message: "No post found" });
    console.log("3");
    res.status(200).json({ message: "Post retrieved successfully", post });
  } catch (error) {
    console.log("Error fetching post : " + error);
    res.status(500).json({ message: "Server error while getting post" });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const postId = req.params.id;
    const userId = req.user.id; // from auth middleware

    // Find post
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check author
    if (post.author.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You can only update your own posts" });
    }

    // Update fields
    if (title) post.title = title;
    if (content) post.content = content;
    if (imageUrl) post.image = imageUrl;
    post.updatedAt = Date.now();

    const updatedPost = await post.save();

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Server error while updating post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id; // from auth middleware

    // Find post
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check author
    if (post.author.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own posts" });
    }

    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error while deleting post" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
};

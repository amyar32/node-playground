const express = require("express");

const blogController = require("../controllers/blog");

const router = express.Router();

// GET /blog/posts
router.get("/posts", blogController.getBlogs);

// POST /blog/post
router.post("/post", blogController.postBlog);

module.exports = router;

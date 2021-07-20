const express = require("express");

// server validation
const { body } = require("express-validator");

const blogController = require("../controllers/blog");

const router = express.Router();

// GET /blog/posts
router.get("/posts", blogController.getBlogs);

// POST /blog/post
router.post(
  "/post",

  // server validation
  [body("title").trim().isLength({ min: 5 })],

  blogController.postBlog
);

module.exports = router;

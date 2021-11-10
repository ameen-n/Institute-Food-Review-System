const express = require("express");
const router = express.Router();

const blog_control = require("../controllers/blogController");


router.get("/blog", blog_control.fetchBlogDefault);

router.get("/blog/:id", blog_control.fetchBlogDefaultPer);

router.get("/blog/blog/:userID", blog_control.fetchBlogByUserID);

router.post("/blog", blog_control.newBlog);

router.put('/blog/:id', blog_control.updateBlog)

router.delete('/blog/:id', blog_control.deleteBlog)

module.exports = router;
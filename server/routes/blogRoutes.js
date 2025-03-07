const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all blogs
router.get('/', blogController.getBlogs);

// Get all tags
router.get('/tags', blogController.getAllTags);

// Get user blogs
router.get('/user/blogs', auth, blogController.getUserBlogs);

// Get single blog
router.get('/:id', blogController.getBlogById);

// Create blog
router.post('/', auth, upload.single('image'), blogController.createBlog);

// Update blog
router.put('/:id', auth, upload.single('image'), blogController.updateBlog);

// Delete blog
router.delete('/:id', auth, blogController.deleteBlog);

module.exports = router; 
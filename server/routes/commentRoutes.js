const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

// Get comments for a blog
router.get('/blog/:blogId', commentController.getBlogComments);

// Create comment
router.post('/blog/:blogId', auth, commentController.createComment);

// Delete comment
router.delete('/:id', auth, commentController.deleteComment);

module.exports = router; 
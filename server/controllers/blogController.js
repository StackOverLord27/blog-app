const Blog = require('../models/Blog');

// Get all blogs with search and filtering
exports.getBlogs = async (req, res) => {
  try {
    const { search, sortBy, author, tag } = req.query;
    
    // Build query
    let query = {};
    
    // Search functionality
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    // Filter by author
    if (author) {
      query.author = author;
    }
    
    // Filter by tag
    if (tag) {
      query.tags = tag;
    }
    
    // Build sort options
    let sortOptions = { createdAt: -1 }; // Default sort by newest
    
    if (sortBy === 'oldest') {
      sortOptions = { createdAt: 1 };
    } else if (sortBy === 'a-z') {
      sortOptions = { title: 1 };
    } else if (sortBy === 'z-a') {
      sortOptions = { title: -1 };
    }
    
    const blogs = await Blog.find(query)
      .sort(sortOptions)
      .populate('author', 'username profilePicture');
    
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single blog
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'username profilePicture');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    
    // Process tags if provided
    let processedTags = [];
    if (tags) {
      // If tags is a string, split by commas and trim
      if (typeof tags === 'string') {
        processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
      } else if (Array.isArray(tags)) {
        processedTags = tags;
      }
    }
    
    const blog = new Blog({
      title,
      content,
      tags: processedTags,
      author: req.user._id,
      image: req.file ? `/uploads/${req.file.filename}` : ''
    });
    
    const savedBlog = await blog.save();
    await savedBlog.populate('author', 'username profilePicture');
    
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // Check if user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    
    // Process tags if provided
    if (tags) {
      // If tags is a string, split by commas and trim
      if (typeof tags === 'string') {
        blog.tags = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
      } else if (Array.isArray(tags)) {
        blog.tags = tags;
      }
    }
    
    if (req.file) {
      blog.image = `/uploads/${req.file.filename}`;
    }
    
    const updatedBlog = await blog.save();
    await updatedBlog.populate('author', 'username profilePicture');
    
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // Check if user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await Blog.deleteOne({ _id: req.params.id });
    
    res.json({ message: 'Blog removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user blogs
exports.getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .populate('author', 'username profilePicture');
    
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tags
exports.getAllTags = async (req, res) => {
  try {
    const blogs = await Blog.find().select('tags');
    
    // Extract all tags and remove duplicates
    const allTags = [...new Set(blogs.flatMap(blog => blog.tags))];
    
    res.json(allTags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 
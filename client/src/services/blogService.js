import api from './api';

// Get all blogs with optional search and filtering
export const getBlogs = async (searchParams = {}) => {
  const { search, sortBy, author, tag } = searchParams;
  
  // Build query string
  let queryString = '';
  if (search) queryString += `search=${encodeURIComponent(search)}&`;
  if (sortBy) queryString += `sortBy=${sortBy}&`;
  if (author) queryString += `author=${author}&`;
  if (tag) queryString += `tag=${encodeURIComponent(tag)}&`;
  
  // Remove trailing '&' if exists
  if (queryString.endsWith('&')) {
    queryString = queryString.slice(0, -1);
  }
  
  const url = queryString ? `/blogs?${queryString}` : '/blogs';
  const response = await api.get(url);
  return response.data;
};

// Get blog by ID
export const getBlogById = async (id) => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
};

// Create blog
export const createBlog = async (blogData) => {
  const formData = new FormData();
  formData.append('title', blogData.title);
  formData.append('content', blogData.content);
  
  // Add tags if they exist
  if (blogData.tags) {
    if (Array.isArray(blogData.tags)) {
      formData.append('tags', blogData.tags.join(','));
    } else {
      formData.append('tags', blogData.tags);
    }
  }
  
  if (blogData.image) {
    formData.append('image', blogData.image);
  }
  
  const response = await api.post('/blogs', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response.data;
};

// Update blog
export const updateBlog = async (id, blogData) => {
  const formData = new FormData();
  formData.append('title', blogData.title);
  formData.append('content', blogData.content);
  
  // Add tags if they exist
  if (blogData.tags) {
    if (Array.isArray(blogData.tags)) {
      formData.append('tags', blogData.tags.join(','));
    } else {
      formData.append('tags', blogData.tags);
    }
  }
  
  if (blogData.image) {
    formData.append('image', blogData.image);
  }
  
  const response = await api.put(`/blogs/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response.data;
};

// Delete blog
export const deleteBlog = async (id) => {
  const response = await api.delete(`/blogs/${id}`);
  return response.data;
};

// Get user blogs
export const getUserBlogs = async () => {
  const response = await api.get('/blogs/user/blogs');
  return response.data;
};

// Get all tags
export const getAllTags = async () => {
  const response = await api.get('/blogs/tags');
  return response.data;
}; 
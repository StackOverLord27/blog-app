import api from './api';

// Get comments for a blog
export const getBlogComments = async (blogId) => {
  const response = await api.get(`/comments/blog/${blogId}`);
  return response.data;
};

// Create comment
export const createComment = async (blogId, content) => {
  const response = await api.post(`/comments/blog/${blogId}`, { content });
  return response.data;
};

// Delete comment
export const deleteComment = async (commentId) => {
  const response = await api.delete(`/comments/${commentId}`);
  return response.data;
}; 
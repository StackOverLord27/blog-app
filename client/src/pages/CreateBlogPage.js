import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlogForm from '../components/Blog/BlogForm';
import { createBlog } from '../services/blogService';

const CreateBlogPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const newBlog = await createBlog(formData);
      navigate(`/blog/${newBlog._id}`);
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Create New Blog</h1>
      <BlogForm onSubmit={handleSubmit} buttonText="Create Blog" />
    </div>
  );
};

export default CreateBlogPage; 
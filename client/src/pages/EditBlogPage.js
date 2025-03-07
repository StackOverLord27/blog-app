import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogForm from '../components/Blog/BlogForm';
import { getBlogById, updateBlog } from '../services/blogService';
import { useAuth } from '../context/AuthContext';

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data);
        
        // Check if user is the author
        if (user && data.author._id !== user._id) {
          setError('You are not authorized to edit this blog');
        }
      } catch (error) {
        setError('Failed to fetch blog');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, user]);

  const handleSubmit = async (formData) => {
    try {
      const updatedBlog = await updateBlog(id, formData);
      navigate(`/blog/${updatedBlog._id}`);
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Loading blog...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="alert alert-danger">
        {error || 'Blog not found'}
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Edit Blog</h1>
      <BlogForm 
        initialData={blog} 
        onSubmit={handleSubmit} 
        buttonText="Update Blog" 
      />
    </div>
  );
};

export default EditBlogPage; 
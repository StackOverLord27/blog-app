import React, { useState, useEffect } from 'react';
import BlogCard from '../components/Blog/BlogCard';
import BlogSearch from '../components/Blog/BlogSearch';
import { getBlogs } from '../services/blogService';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useState({
    sortBy: 'createdAt',
    order: 'desc'
  });

  useEffect(() => {
    fetchBlogs(searchParams);
  }, []);

  const fetchBlogs = async (params) => {
    setLoading(true);
    try {
      const data = await getBlogs(params);
      setBlogs(data);
    } catch (error) {
      setError('Failed to fetch blogs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (params) => {
    setSearchParams(params);
    fetchBlogs(params);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Latest Blogs</h1>
      
      <BlogSearch onSearch={handleSearch} />
      
      {blogs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>No blogs found</h2>
          <p>Try adjusting your search criteria or be the first to create a blog!</p>
        </div>
      ) : (
        <div className="blog-grid">
          {blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
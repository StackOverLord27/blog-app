import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserBlogs, deleteBlog } from '../services/blogService';
import BlogCard from '../components/Blog/BlogCard';
import BlogSearch from '../components/Blog/BlogSearch';

const ProfilePage = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const data = await getUserBlogs();
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (error) {
        setError('Failed to fetch your blogs');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog(blogId);
        setBlogs(blogs.filter(blog => blog._id !== blogId));
        setFilteredBlogs(filteredBlogs.filter(blog => blog._id !== blogId));
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog');
      }
    }
  };

  const handleSearch = (params) => {
    const { search, sortBy, order } = params;
    
    // Filter blogs based on search term
    let filtered = [...blogs];
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchLower) || 
        blog.content.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort blogs
    filtered.sort((a, b) => {
      if (sortBy === 'title') {
        return order === 'asc' 
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else {
        // Sort by date
        return order === 'asc'
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    
    setFilteredBlogs(filtered);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Loading your blogs...</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Your Profile</h1>
        <Link to="/create-blog" className="btn btn-primary">
          Create New Blog
        </Link>
      </div>
      
      <div className="card" style={{ marginBottom: '30px' }}>
        <div className="card-body">
          <h2 style={{ marginBottom: '10px' }}>Account Information</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
      
      <div>
        <h2 style={{ marginBottom: '20px' }}>Your Blogs</h2>
        
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}
        
        {blogs.length === 0 ? (
          <div className="card">
            <div className="card-body" style={{ textAlign: 'center', padding: '30px' }}>
              <p>You haven't created any blogs yet.</p>
              <Link to="/create-blog" className="btn btn-primary" style={{ marginTop: '15px' }}>
                Create Your First Blog
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <BlogSearch onSearch={handleSearch} />
            
            {filteredBlogs.length === 0 ? (
              <div className="card">
                <div className="card-body" style={{ textAlign: 'center', padding: '30px' }}>
                  <p>No blogs match your search criteria.</p>
                </div>
              </div>
            ) : (
              <div>
                {filteredBlogs.map(blog => (
                  <div key={blog._id} style={{ marginBottom: '20px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10, display: 'flex', gap: '10px' }}>
                      <Link to={`/edit-blog/${blog._id}`} className="btn btn-secondary">
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(blog._id)} 
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                    <BlogCard blog={blog} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 
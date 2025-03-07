import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBlogById, deleteBlog } from '../services/blogService';
import { getBlogComments } from '../services/commentService';
import { useAuth } from '../context/AuthContext';
import CommentForm from '../components/Comment/CommentForm';
import CommentList from '../components/Comment/CommentList';

const BlogDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogAndComments = async () => {
      try {
        const [blogData, commentsData] = await Promise.all([
          getBlogById(id),
          getBlogComments(id)
        ]);
        
        setBlog(blogData);
        setComments(commentsData);
      } catch (error) {
        setError('Failed to fetch blog details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndComments();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog(id);
        navigate('/');
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog');
      }
    }
  };

  const handleCommentAdded = (newComment) => {
    setComments([newComment, ...comments]);
  };

  const handleCommentDeleted = (commentId) => {
    setComments(comments.filter(comment => comment._id !== commentId));
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  const isAuthor = user && blog.author._id === user._id;

  return (
    <div>
      {/* Blog Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ marginBottom: '15px' }}>{blog.title}</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', color: '#6b7280' }}>
          <span>By {blog.author.username}</span>
          <span style={{ margin: '0 10px' }}>•</span>
          <span>{formatDate(blog.createdAt)}</span>
        </div>
        
        {isAuthor && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to={`/edit-blog/${blog._id}`} className="btn btn-secondary">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </div>
        )}
      </div>
      
      {/* Blog Image */}
      {blog.image && (
        <div style={{ marginBottom: '30px', maxHeight: '500px', overflow: 'hidden', borderRadius: '10px' }}>
          <img 
            src={blog.image} 
            alt={blog.title} 
            style={{ width: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
      
      {/* Blog Content */}
      <div 
        style={{ marginBottom: '40px', lineHeight: '1.8' }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      
      {/* Comments Section */}
      <div style={{ marginTop: '40px', borderTop: '1px solid #e5e7eb', paddingTop: '30px' }}>
        <CommentForm blogId={blog._id} onCommentAdded={handleCommentAdded} />
        <CommentList comments={comments} onCommentDeleted={handleCommentDeleted} />
      </div>
    </div>
  );
};

export default BlogDetailPage; 
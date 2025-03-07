import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Truncate content for preview
  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <div className="card">
      {blog.image && (
        <div style={{ height: '200px', overflow: 'hidden' }}>
          <img 
            src={blog.image} 
            alt={blog.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
      
      <div className="card-body">
        <h2 style={{ marginBottom: '10px' }}>
          <Link to={`/blog/${blog._id}`} style={{ color: '#1f2937', fontWeight: '600' }}>
            {blog.title}
          </Link>
        </h2>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', color: '#6b7280', fontSize: '14px' }}>
          <span>By {blog.author.username}</span>
          <span style={{ margin: '0 10px' }}>•</span>
          <span>{formatDate(blog.createdAt)}</span>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <div dangerouslySetInnerHTML={{ __html: truncateContent(blog.content) }} />
        </div>
        
        <Link to={`/blog/${blog._id}`} className="btn btn-primary">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard; 
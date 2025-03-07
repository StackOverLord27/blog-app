import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../quill.css'; // Using our custom CSS file
import { getAllTags } from '../../services/blogService';

const BlogForm = ({ initialData = {}, onSubmit, buttonText = 'Submit' }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    content: initialData.content || '',
    tags: initialData.tags || '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(initialData.image || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    // Fetch available tags
    const fetchTags = async () => {
      try {
        const tags = await getAllTags();
        setAvailableTags(tags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <ReactQuill
          value={formData.content}
          onChange={handleContentChange}
          theme="snow"
          style={{ height: '300px', marginBottom: '50px' }}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="tags">Tags (comma separated)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          className="form-control"
          value={formData.tags}
          onChange={handleChange}
          placeholder="e.g. technology, programming, web development"
        />
        {availableTags.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <small className="text-muted">Available tags:</small>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
              {availableTags.map(tag => (
                <span 
                  key={tag} 
                  style={{ 
                    backgroundColor: '#e9ecef', 
                    padding: '2px 8px', 
                    borderRadius: '15px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    const currentTags = formData.tags ? formData.tags.split(',').map(t => t.trim()) : [];
                    if (!currentTags.includes(tag)) {
                      const newTags = [...currentTags, tag].join(', ');
                      setFormData({
                        ...formData,
                        tags: newTags
                      });
                    }
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          className="form-control"
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      
      {imagePreview && (
        <div style={{ marginBottom: '20px' }}>
          <label>Image Preview</label>
          <div style={{ height: '200px', overflow: 'hidden', borderRadius: '5px' }}>
            <img 
              src={imagePreview} 
              alt="Preview" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      )}
      
      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? 'Submitting...' : buttonText}
      </button>
    </form>
  );
};

export default BlogForm; 
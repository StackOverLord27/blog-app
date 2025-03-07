import React, { useState, useEffect } from 'react';
import { getAllTags } from '../../services/blogService';

const BlogSearch = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    search: '',
    sortBy: 'newest',
    tag: ''
  });
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
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleReset = () => {
    setSearchParams({
      search: '',
      sortBy: 'newest',
      tag: ''
    });
    onSearch({});
  };

  return (
    <div className="card" style={{ marginBottom: '20px' }}>
      <div className="card-body">
        <h5 className="card-title" style={{ marginBottom: '15px' }}>Search & Filter Blogs</h5>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="search">Search</label>
            <input
              type="text"
              id="search"
              name="search"
              className="form-control"
              placeholder="Search by title or content..."
              value={searchParams.search}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="tag">Filter by Tag</label>
            <select
              id="tag"
              name="tag"
              className="form-control"
              value={searchParams.tag}
              onChange={handleChange}
            >
              <option value="">All Tags</option>
              {availableTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="sortBy">Sort By</label>
            <select
              id="sortBy"
              name="sortBy"
              className="form-control"
              value={searchParams.sortBy}
              onChange={handleChange}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="a-z">Title (A-Z)</option>
              <option value="z-a">Title (Z-A)</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogSearch; 
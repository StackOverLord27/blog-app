import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { deleteComment } from '../../services/commentService';

const CommentList = ({ comments, onCommentDeleted }) => {
  const { user } = useAuth();

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteComment(commentId);
        onCommentDeleted(commentId);
      } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Failed to delete comment');
      }
    }
  };

  if (!comments || comments.length === 0) {
    return <p>No comments yet. Be the first to comment!</p>;
  }

  return (
    <div>
      <h3 style={{ marginBottom: '20px' }}>Comments ({comments.length})</h3>
      
      {comments.map(comment => (
        <div 
          key={comment._id} 
          style={{ 
            marginBottom: '20px', 
            padding: '15px', 
            backgroundColor: 'white', 
            borderRadius: '5px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <div>
              <strong>{comment.author.username}</strong>
              <span style={{ marginLeft: '10px', color: '#6b7280', fontSize: '14px' }}>
                {formatDate(comment.createdAt)}
              </span>
            </div>
            
            {user && user._id === comment.author._id && (
              <button 
                onClick={() => handleDelete(comment._id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Delete
              </button>
            )}
          </div>
          
          <p style={{ whiteSpace: 'pre-wrap' }}>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList; 
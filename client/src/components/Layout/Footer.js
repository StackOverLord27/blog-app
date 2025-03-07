import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'white',
      boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
      padding: '20px 0',
      textAlign: 'center'
    }}>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} BlogApp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 
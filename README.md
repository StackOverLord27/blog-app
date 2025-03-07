# Blog Website

A full-stack blog application built with Node.js and React.js.

## Features

- User authentication (sign in/sign up)
- Create, read, update, and delete blog posts
- Comment on blog posts
- Support for text and image content in blog posts
- User-specific blog management

## Project Structure

- `client/` - React.js frontend
- `server/` - Node.js backend

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Backend Setup

1. Navigate to the server directory:
   ```
   cd blog-app/server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/blog-app
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd blog-app/client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React app:
   ```
   npm start
   ```

## Technologies Used

- **Frontend**:
  - React.js
  - React Router
  - Axios
  - React Quill (rich text editor)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JSON Web Tokens (JWT) for authentication
  - Multer for file uploads

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/profile` - Get user profile

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get a single blog
- `POST /api/blogs` - Create a new blog
- `PUT /api/blogs/:id` - Update a blog
- `DELETE /api/blogs/:id` - Delete a blog
- `GET /api/blogs/user/blogs` - Get user's blogs

### Comments
- `GET /api/comments/blog/:blogId` - Get comments for a blog
- `POST /api/comments/blog/:blogId` - Create a comment
- `DELETE /api/comments/:id` - Delete a comment 
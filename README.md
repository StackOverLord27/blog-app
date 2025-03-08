# Blog Application

A full-stack blog application built with Node.js, Express, MongoDB, and React.

## Features

- User authentication (sign in/sign up)
- Create, read, update, and delete blog posts
- Comment on blog posts
- Upload images for blog posts
- Search and filter blogs by title, content, and tags
- Responsive design

## Local Development

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Setup

1. Clone the repository
2. Install dependencies:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the server directory with the following variables:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     NODE_ENV=development
     CLIENT_URL=http://localhost:3001
     ```
   - Create a `.env` file in the client directory with the following variables:
     ```
     REACT_APP_API_URL=http://localhost:5000/api
     PORT=3001
     ```

4. Start the development servers:

```bash
# Start the server
cd server
npm run dev

# Start the client (in a new terminal)
cd client
npm run start:legacy
```

5. Open [http://localhost:3001](http://localhost:3001) in your browser

## Deployment to Vercel

### Prerequisites

- Vercel account
- MongoDB Atlas account (for the database)

### Steps

1. Create a MongoDB Atlas cluster and get the connection string

2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Update the environment variables:
   - Update the `.env.production` file in the client directory with your Vercel app URL
   - Set up environment variables in the Vercel dashboard:
     - MONGO_URI: Your MongoDB Atlas connection string
     - JWT_SECRET: Your JWT secret
     - NODE_ENV: production
     - CLIENT_URL: Your Vercel app URL

5. Deploy the application:
   ```bash
   vercel
   ```

6. Follow the prompts to deploy your application

7. Once deployed, you can access your application at the URL provided by Vercel

## License

MIT

## Project Structure

- `client/` - React.js frontend
- `server/` - Node.js backend

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
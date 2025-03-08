# Deploying the Blog Application to Vercel

This guide will walk you through the process of deploying the blog application to Vercel.

## Prerequisites

1. [Vercel Account](https://vercel.com/signup)
2. [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas/register)
3. [Git](https://git-scm.com/downloads)
4. [Node.js](https://nodejs.org/) (v14 or later)
5. [Vercel CLI](https://vercel.com/download) (optional)

## Step 1: Prepare MongoDB Atlas

1. Create a MongoDB Atlas account if you don't have one
2. Create a new cluster (the free tier is sufficient for this application)
3. Create a database user with read and write permissions
4. Add your IP address to the IP access list (or allow access from anywhere for development)
5. Get your MongoDB connection string by clicking "Connect" > "Connect your application"
6. Replace `<password>` in the connection string with your database user's password

## Step 2: Prepare Your Application for Deployment

1. Update the MongoDB connection string in `.env` file:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

2. Update the JWT secret in `.env` file:
   ```
   JWT_SECRET=your-secure-jwt-secret
   ```

3. Update the client URL in `.env` file:
   ```
   CLIENT_URL=https://your-vercel-app-name.vercel.app
   ```

4. Update the API URL in `.env.production` file:
   ```
   REACT_APP_API_URL=https://your-vercel-app-name.vercel.app/api
   ```

## Step 3: Deploy to Vercel

### Option 1: Deploy using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Navigate to your project directory:
   ```bash
   cd blog-app
   ```

4. Deploy the application:
   ```bash
   vercel
   ```

5. Follow the prompts to deploy your application
   - When asked for the build command, use: `cd client && npm run build`
   - When asked for the output directory, use: `client/build`

6. Set up environment variables in the Vercel dashboard:
   - MONGO_URI: Your MongoDB Atlas connection string
   - JWT_SECRET: Your JWT secret
   - NODE_ENV: production
   - CLIENT_URL: Your Vercel app URL

### Option 2: Deploy using Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Go to the [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "New Project"

4. Import your Git repository

5. Configure the project:
   - Root Directory: `./`
   - Build Command: `cd client && npm run build`
   - Output Directory: `client/build`

6. Add environment variables:
   - MONGO_URI: Your MongoDB Atlas connection string
   - JWT_SECRET: Your JWT secret
   - NODE_ENV: production
   - CLIENT_URL: Your Vercel app URL

7. Click "Deploy"

## Step 4: Verify the Deployment

1. Once the deployment is complete, Vercel will provide you with a URL for your application

2. Open the URL in your browser to verify that the application is working correctly

3. Test the following functionality:
   - User registration and login
   - Creating, editing, and deleting blog posts
   - Adding comments to blog posts
   - Searching and filtering blogs

## Troubleshooting

### MongoDB Connection Issues

If you're having issues connecting to MongoDB, check the following:

1. Make sure your MongoDB Atlas cluster is running
2. Verify that your IP address is in the IP access list
3. Check that your database user has the correct permissions
4. Verify that your connection string is correct

### API Connection Issues

If the frontend can't connect to the API, check the following:

1. Make sure the `REACT_APP_API_URL` environment variable is set correctly
2. Verify that the API routes are working correctly
3. Check the CORS configuration in the server

### Deployment Issues

If you're having issues with the deployment, check the following:

1. Check the Vercel deployment logs for errors
2. Verify that all environment variables are set correctly
3. Make sure the build command and output directory are configured correctly

## Updating Your Deployment

To update your deployment after making changes to your code:

1. Push your changes to your Git repository
2. Vercel will automatically redeploy your application

Or, if you're using the Vercel CLI:

```bash
vercel --prod
```

## Custom Domain

To use a custom domain with your Vercel deployment:

1. Go to the Vercel Dashboard
2. Select your project
3. Click on "Domains"
4. Add your custom domain
5. Follow the instructions to configure your DNS settings 
#!/bin/bash

# Navigate to client directory
cd client

# Install dependencies
npm install

# Set permissions for react-scripts
chmod +x ./node_modules/.bin/react-scripts

# Build the client
npm run build

# Return to root directory
cd ..

# Navigate to server directory
cd server

# Install server dependencies
npm install 
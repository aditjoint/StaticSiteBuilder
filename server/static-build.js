// This file is used to build a static version of the site for GitHub Pages
const fs = require('fs');
const path = require('path');
const express = require('express');
const { serveStatic } = require('./vite');

// Create Express app
const app = express();

// Set up static file serving
serveStatic(app);

// Define routes - since this is a static site, we only need client-side routes
app.get('*', (req, res) => {
  const indexPath = path.resolve('./dist/public/index.html');
  res.sendFile(indexPath);
});

console.log('Static build server configuration completed');
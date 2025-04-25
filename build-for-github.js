const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Build the project
console.log('Building the project...');
execSync('npm run build', { stdio: 'inherit' });

// Create a 404.html that redirects to index.html for SPA routing
console.log('Creating 404.html for GitHub Pages SPA routing...');
const notFoundContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>ADIT Joint</title>
    <script type="text/javascript">
        // Single Page Apps for GitHub Pages
        // MIT License - https://github.com/rafgraph/spa-github-pages
        // This script takes the current URL and constructs a new URL
        // for GitHub Pages to properly handle Single Page Apps
        var segmentCount = 1;
        var l = window.location;
        l.replace(
            l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
            l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?p=/' +
            l.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&/g, '~and~') +
            (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') +
            l.hash
        );
    </script>
</head>
<body>
    <h2>Redirecting...</h2>
</body>
</html>
`;

// Update index.html for GitHub Pages SPA routing
console.log('Updating index.html for GitHub Pages SPA routing...');
const indexHtmlPath = path.join(__dirname, 'dist', 'public', 'index.html');
let indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Add SPA routing script to index.html
const scriptToAdd = `
    <!-- Start Single Page Apps for GitHub Pages -->
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // MIT License - https://github.com/rafgraph/spa-github-pages
      (function(l) {
        if (l.search[1] === '/' ) {
          var decoded = l.search.slice(1).split('&').map(function(s) { 
            return s.replace(/~and~/g, '&')
          }).join('?');
          window.history.replaceState(null, null,
              l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      }(window.location))
    </script>
    <!-- End Single Page Apps for GitHub Pages -->
`;

// Insert the script before the closing </head> tag
indexHtmlContent = indexHtmlContent.replace('</head>', scriptToAdd + '\n</head>');
fs.writeFileSync(indexHtmlPath, indexHtmlContent);

// Create 404.html in the dist directory
fs.writeFileSync(path.join(__dirname, 'dist', 'public', '404.html'), notFoundContent);

// Create a .nojekyll file to tell GitHub Pages not to use Jekyll
fs.writeFileSync(path.join(__dirname, 'dist', 'public', '.nojekyll'), '');

// Create CNAME file if a custom domain is used
// Uncomment and modify the line below if you have a custom domain
// fs.writeFileSync(path.join(__dirname, 'dist', 'public', 'CNAME'), 'www.yourdomain.com');

console.log('GitHub Pages build completed successfully!');
console.log('Upload the contents of the dist/public directory to your GitHub repository.');
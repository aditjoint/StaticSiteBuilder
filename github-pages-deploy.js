const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create a directory for GitHub Pages output
const outputDir = path.join(__dirname, 'github-pages');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Execute the regular build command
console.log('Building the project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully.');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}

// Copy the build output to the GitHub Pages directory
console.log('Copying build output to GitHub Pages directory...');
const sourceDir = path.join(__dirname, 'dist', 'public');
copyDirectoryRecursiveSync(sourceDir, outputDir);

// Create the 404.html file for GitHub Pages SPA routing
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
fs.writeFileSync(path.join(outputDir, '404.html'), notFoundContent);

// Update the index.html for GitHub Pages SPA routing
console.log('Updating index.html for GitHub Pages SPA routing...');
const indexHtmlPath = path.join(outputDir, 'index.html');
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

// Create a .nojekyll file to tell GitHub Pages not to use Jekyll
fs.writeFileSync(path.join(outputDir, '.nojekyll'), '');

// Create CNAME file if a custom domain is used (uncomment and modify if needed)
// fs.writeFileSync(path.join(outputDir, 'CNAME'), 'www.yourdomain.com');

console.log('GitHub Pages preparation completed successfully!');
console.log('Your static site is ready in the "github-pages" directory.');
console.log('Instructions for deploying to GitHub Pages:');
console.log('1. Create a new GitHub repository');
console.log('2. Push the contents of the "github-pages" directory to the repository');
console.log('3. Enable GitHub Pages in the repository settings (Settings > Pages)');
console.log('4. Set the source to the branch where you pushed the files');

// Helper function to copy a directory recursively
function copyDirectoryRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);
  
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      copyDirectoryRecursiveSync(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}
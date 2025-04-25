const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create output directory
const outputDir = path.join(__dirname, 'static-site');
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}
fs.mkdirSync(outputDir, { recursive: true });

console.log('Creating a completely static version of the site...');

// Build the React app - simplified build process 
// that only builds the client app without server dependencies
try {
  console.log('Building client application...');
  execSync('cd client && npx vite build --config vite.static.config.js --outDir=../static-site', { stdio: 'inherit' });
} catch (error) {
  console.error('Error building client:', error);
  process.exit(1);
}

// Create 404.html for GitHub Pages SPA routing
console.log('Creating GitHub Pages SPA routing...');
const notFoundContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ADIT Joint</title>
  <script type="text/javascript">
    // Single Page Apps for GitHub Pages
    // MIT License - https://github.com/rafgraph/spa-github-pages
    var pathSegmentsToKeep = 1;
    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
      l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
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

// Add SPA routing to index.html
console.log('Updating index.html...');
const indexPath = path.join(outputDir, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');
const routingScript = `
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
indexContent = indexContent.replace('</head>', `${routingScript}</head>`);
fs.writeFileSync(indexPath, indexContent);

// Create .nojekyll file to prevent GitHub Pages from using Jekyll
fs.writeFileSync(path.join(outputDir, '.nojekyll'), '');

// Add GitHub Pages CNAME (uncomment and modify if needed)
// fs.writeFileSync(path.join(outputDir, 'CNAME'), 'your-domain.com');

// Create simplified package.json for the static site
console.log('Creating simplified package.json...');
const staticPackageJson = {
  "name": "adit-joint-static",
  "version": "1.0.0",
  "description": "Static website for ADIT Joint",
  "private": true,
  "scripts": {
    "deploy": "gh-pages -d ."
  },
  "devDependencies": {
    "gh-pages": "^6.1.1"
  }
};
fs.writeFileSync(
  path.join(outputDir, 'package.json'),
  JSON.stringify(staticPackageJson, null, 2)
);

// Create a simplified README with deployment instructions
console.log('Creating README with deployment instructions...');
const readmeContent = `# ADIT Joint Static Website

This is a completely static version of the ADIT Joint website, ready for GitHub Pages deployment.

## Deployment Instructions

### Option 1: Manual Deployment
1. Push the contents of this directory to a GitHub repository
2. Go to Settings > Pages in your repository
3. Select the branch that contains these files as the source
4. Your site will be available at https://yourusername.github.io/repository-name/

### Option 2: Using gh-pages
1. Install dependencies: \`npm install\`
2. Deploy to GitHub Pages: \`npm run deploy\`

## Notes
- This site is completely static with no server-side dependencies
- All interactivity is client-side only
`;
fs.writeFileSync(path.join(outputDir, 'README.md'), readmeContent);

console.log('\nStatic site generation complete!');
console.log('The static site is available in the "static-site" directory.');
console.log('You can deploy this directory to GitHub Pages for free hosting.');
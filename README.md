# ADIT Joint Website

A professional website for ADIT Joint showcasing their services in facility infrastructure, data centers, digital transformation, and other verticals.

## Features

- Dynamic video background hero section with fallback to static image
- Rolling-type design with page-wise scrolling
- Comprehensive services showcase with standout card designs
- Resources and Current Affairs sections
- News & Events section
- Advisory Panel, Technology Partner, and Investor Portfolio sections
- Legal section with Privacy Policy, Terms of Use, and Cookie Policy

## Technology Stack

- React
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- Shadcn/UI components

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Deployment to GitHub Pages

This project can be deployed to GitHub Pages as a static website. Follow these steps:

1. Run the GitHub Pages deploy script:
   ```
   node github-pages-deploy.js
   ```

2. Create a new GitHub repository for your website.

3. Push the contents of the "github-pages" directory to your repository:
   ```
   cd github-pages
   git init
   git add .
   git commit -m "Initial GitHub Pages deployment"
   git remote add origin https://github.com/yourusername/yourrepository.git
   git push -u origin main
   ```

4. Go to your repository settings on GitHub:
   - Navigate to "Settings" > "Pages"
   - Select your main branch as the source
   - Click "Save"

5. Your site will be published at `https://yourusername.github.io/yourrepository/`

## Customization

- Modify content in the client/src/pages directory
- Update styles in client/src/index.css
- Add or modify components in client/src/components

## License

MIT
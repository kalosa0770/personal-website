#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Deploying React app from submodule to GitHub Pages..."

# 1. Navigate into the submodule directory
# Replace 'your-react-app-folder' with the name of your submodule
cd portfolio

# 2. Install dependencies and build the React app
npm install
npm run build

# 3. Navigate back to the root of the main repository
cd ..

# 4. Clean up any previous build folder and copy the new one
rm -rf build
cp -R portfolio/build .

echo "Build folder copied to root directory."

# 5. Push the build folder to the 'gh-pages' branch of the main repo
# The 'git init' and other commands are to create a new branch containing only the build files.

cd build
git init
git add -A
git commit -m "Deploy to GitHub Pages"

# Replace 'your-username' and 'your-portfolio-repo' with your details
git push -f https://github.com/kalosa0770/personal-website.git master:gh-pages

echo "Deployment complete! Your site should be live shortly."
#!/bin/zsh
# Builds the app and publishes it to GitHub Pages (the gh-pages branch).
# Usage: npm run deploy
set -e
cd "$(dirname "$0")/.."
REMOTE=$(git remote get-url origin)
npm run build
cd dist
touch .nojekyll
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C .. config user.name)" -c user.email="$(git -C .. config user.email)" commit -q -m "Deploy site"
git push -q -f "$REMOTE" gh-pages
rm -rf .git
echo "Published. The live site updates in about a minute."

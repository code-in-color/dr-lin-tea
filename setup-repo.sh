#!/bin/bash

# Setup script for Dr. Lin Tea repository
# Run this after accepting the Xcode license with: sudo xcodebuild -license

echo "🍵 Setting up Dr. Lin Tea repository..."

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Dr. Lin Tea landing page

- Minimalist Utrecht-inspired design
- Floating product animation
- Editorial typography
- 5-ingredient showcase
- Brand story section
- Responsive layout"

# Create GitHub repo and push
gh repo create dr-lin-tea --public --source=. --description="Minimalist landing page for Dr. Lin Tea's Hibiscus Fizz sparkling botanical tea" --push

echo "✅ Repository created and pushed!"
echo ""
echo "🚀 Next steps:"
echo "1. Deploy to Vercel: vercel --prod"
echo "2. View repo: gh repo view --web"

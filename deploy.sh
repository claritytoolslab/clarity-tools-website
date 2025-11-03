#!/bin/bash

# Clarity Tools Lab Website - Quick Deploy Script
# This script helps you quickly deploy changes to GitHub Pages

set -e

echo "🚀 Clarity Tools Lab - Website Deployment"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Are you in the right directory?"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git repository not initialized"
    exit 1
fi

# Check git status
echo "📋 Checking git status..."
git status

echo ""
read -p "📝 Enter commit message: " commit_message

if [ -z "$commit_message" ]; then
    commit_message="Update website content"
fi

echo ""
echo "📦 Staging changes..."
git add .

echo "💾 Creating commit..."
git commit -m "$commit_message

🤖 Generated with Claude Code
https://claude.com/claude-code

Co-Authored-By: Claude <noreply@anthropic.com>" || {
    echo "⚠️  No changes to commit"
}

echo "🌐 Pushing to GitHub..."
git push origin main || {
    echo ""
    echo "⚠️  Remote not configured yet!"
    echo ""
    echo "Please run these commands first:"
    echo ""
    echo "  git remote add origin https://github.com/claritytoolslab/clarity-tools-website.git"
    echo "  git push -u origin main"
    echo ""
    exit 1
}

echo ""
echo "✅ Deployment successful!"
echo ""
echo "🌍 Your site will be live in 1-2 minutes at:"
echo "   https://claritytoolslab.github.io/clarity-tools-website/"
echo ""
echo "📊 Check deployment status:"
echo "   https://github.com/claritytoolslab/clarity-tools-website/actions"
echo ""

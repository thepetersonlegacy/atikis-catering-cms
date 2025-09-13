# GitHub Repository Setup Commands

After creating the repository on GitHub, run these commands:

## 1. Add GitHub Remote
```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/atikis-catering-cms.git
```

## 2. Push to GitHub
```bash
# Push the main branch
git branch -M main
git push -u origin main
```

## 3. Alternative: If you get authentication errors
GitHub now requires Personal Access Tokens instead of passwords. If you get authentication errors:

1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Generate new token with `repo` permissions
3. Use the token as your password when prompted

## 4. Or use GitHub CLI (recommended)
```bash
# Install GitHub CLI if not already installed
brew install gh

# Authenticate with GitHub
gh auth login

# Create repository directly from command line
gh repo create atikis-catering-cms --public --source=. --remote=origin --push
```

## Next Steps After GitHub Setup
1. Verify the repository is created and code is pushed
2. Set up Tina Cloud connection
3. Configure environment variables in Netlify

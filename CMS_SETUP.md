# Content Management System Setup Guide

This guide will help you set up and use the Tina CMS for managing your website content.

## 🚀 Quick Start

### 1. Access the CMS
- **Local Development**: Visit `http://localhost:3000/admin` when running `npm run dev`
- **Production**: Visit `https://your-domain.com/admin`

### 2. Authentication Setup

#### Step 1: Create a Tina Cloud Account
1. Go to [https://app.tina.io](https://app.tina.io)
2. Sign up with your GitHub account
3. Create a new project
4. Connect it to your GitHub repository

#### Step 2: Get Your Credentials
1. In Tina Cloud dashboard, go to your project settings
2. Copy the `Client ID` and `Token`
3. Add them to your environment variables:

```bash
# Create .env.local file (never commit this file)
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id_here
TINA_TOKEN=your_token_here
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repo_name
GITHUB_BRANCH=main
```

#### Step 3: Configure Netlify Environment Variables
1. Go to your Netlify dashboard
2. Navigate to Site settings > Environment variables
3. Add the same environment variables from above

## 📝 Content Management

### Site Settings
- **Contact Information**: Update email, phone, and address
- **Hero Section**: Modify homepage title, subtitle, and background image

### Menu Management
- **Add Items**: Create new menu items with descriptions and prices
- **Categories**: Organize items by appetizers, entrees, desserts, beverages
- **Images**: Upload food photos for each item
- **Featured Items**: Mark special items to highlight

### Gallery Management
- **Upload Images**: Add new photos to the gallery
- **Captions**: Add descriptive captions for each image
- **Albums**: Organize images into categories/albums

### Testimonials
- **Customer Reviews**: Add customer testimonials
- **Ratings**: Include star ratings (1-5)
- **Photos**: Add customer photos or avatars

### Translations
- **Multi-language Support**: Edit text in different languages
- **Navigation**: Update menu labels
- **Content**: Modify page content and buttons

## 🖼️ Image Management

### Uploading Images
1. Click on any image field in the CMS
2. Upload new images (JPG, PNG, WebP supported)
3. Images are automatically optimized for web use

### Image Organization
- Images are stored in `/public/images/`
- Organized by type: hero, gallery, menu, testimonials
- Automatic responsive variants are generated

### Best Practices
- **Size**: Upload high-quality images (at least 1920px wide)
- **Format**: JPG for photos, PNG for graphics with transparency
- **Naming**: Use descriptive filenames
- **Alt Text**: Always add descriptive alt text for accessibility

## 🔄 Publishing Changes

### How It Works
1. Make changes in the CMS interface
2. Click "Save" to commit changes to GitHub
3. Netlify automatically detects changes and rebuilds the site
4. Changes go live in 2-3 minutes

### Version Control
- All changes are tracked in Git
- You can see the history of changes in GitHub
- Easy to revert changes if needed

## 🛡️ Security Features

### Authentication
- Only authorized GitHub users can access the CMS
- Secure OAuth authentication
- No passwords to manage

### Content Validation
- File type restrictions for uploads
- Size limits to prevent large files
- Automatic malware scanning

### Backup & Recovery
- All content is stored in Git (automatic backup)
- Version history for all changes
- Easy to restore previous versions

## 🚨 Troubleshooting

### Common Issues

#### "Authentication Failed"
- Check that environment variables are set correctly
- Verify GitHub repository permissions
- Ensure Tina Cloud project is connected to the right repo

#### "Images Not Loading"
- Check file size (max 10MB recommended)
- Verify file format (JPG, PNG, WebP only)
- Ensure proper file permissions

#### "Changes Not Appearing"
- Wait 2-3 minutes for Netlify build to complete
- Check Netlify build logs for errors
- Verify environment variables in Netlify

### Getting Help
1. Check the build logs in Netlify dashboard
2. Review the GitHub commit history
3. Contact your developer for technical issues

## 📱 Mobile Usage

The CMS interface is mobile-friendly and can be used on:
- Desktop computers
- Tablets
- Smartphones

For the best experience, use a desktop or tablet when uploading multiple images or making extensive edits.

## ⚡ Performance Tips

### Image Optimization
- Upload high-quality source images
- The system automatically creates optimized versions
- Use WebP format when possible for better compression

### Content Updates
- Make multiple changes before saving to reduce build frequency
- Preview changes locally when possible
- Batch similar updates together

## 🔧 Advanced Features

### Custom Fields
The CMS supports various field types:
- Text fields for short content
- Textarea for longer descriptions
- Rich text editor for formatted content
- Image uploads with automatic optimization
- Number fields for prices and ratings
- Boolean toggles for featured items

### Content Relationships
- Link menu items to categories
- Associate images with albums
- Connect testimonials to specific services

This CMS provides a user-friendly interface for managing all aspects of your website content while maintaining the security and performance of your static site.

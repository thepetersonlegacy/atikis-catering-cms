# Tina CMS Access Guide
## Atikis Minnesota Aviation Catering Website

---

## ✅ **System Status: OPERATIONAL**

All Tina CMS services are properly configured and accessible!

---

## 🔐 **Access URLs**

### **Local Development (Recommended for Editing)**
- **Admin Interface**: http://localhost:3000/admin/index.html
- **GraphQL API**: http://localhost:4001/graphql
- **GraphQL Playground**: http://localhost:3000/admin/index.html#/graphql
- **Website Preview**: http://localhost:3000

### **Production (View Only - Requires Authentication)**
- **Admin Interface**: https://atikis-flight-catering.netlify.app/admin/index.html
- **Live Website**: https://atikis-flight-catering.netlify.app

---

## 🚀 **How to Access Tina CMS**

### **Step 1: Start the Development Server**

Open your terminal in the project directory and run:

```bash
npm run dev
```

You should see output like this:
```
🦙 TinaCMS Dev Server is active:
   CMS:                <your-dev-server-url>/admin/index.html
   API url:            http://localhost:4001/graphql

▲ Next.js 14.2.32
  - Local:        http://localhost:3000
  ✓ Ready in 2.1s
```

### **Step 2: Open the Admin Interface**

Once the server is running, open your browser and navigate to:

**http://localhost:3000/admin/index.html**

The Tina CMS admin interface should load automatically.

---

## 📝 **What You Can Edit in Tina CMS**

### **1. 🍽️ Menu Management**
- **Menu Categories**: Create and organize menu categories
- **Menu Items**: Add, edit, or remove menu items with descriptions, images, and pricing
- **Box Options**: Manage collection boxes and their contents

### **2. 📸 Photo Gallery**
- **Upload Images**: Add new photos to the gallery
- **Edit Captions**: Update image descriptions and alt text
- **Organize Albums**: Group photos into different albums (Food & Catering, Events, Behind the Scenes)

### **3. 💬 Testimonials**
- **Add Reviews**: Create new customer testimonials
- **Edit Content**: Update existing testimonials
- **Manage Display**: Control which testimonials appear on the website

### **4. ⚙️ Site Settings**
- **Company Information**: Update business details, contact info
- **Social Media Links**: Manage social media profiles
- **SEO Settings**: Configure meta descriptions and keywords

### **5. 🌐 Translations**
- **Multi-language Support**: Edit text in different languages
- **UI Labels**: Update button text, navigation labels, and messages

---

## 🔧 **Environment Variables (Already Configured)**

Your `.env.local` file contains the following Tina CMS configuration:

```bash
# Tina CMS Configuration
TINA_PUBLIC_IS_LOCAL=true
NEXT_PUBLIC_TINA_CLIENT_ID=c83f7fe8-ad3a-430e-aa1b-90a1305200eb
TINA_TOKEN=4af5b88b90aebcdf4fba28445161da3d547a4b08
GITHUB_OWNER=thepetersonlegacy
GITHUB_REPO=atikis-catering-cms
GITHUB_BRANCH=main
```

✅ **All environment variables are properly configured!**

---

## 🛠️ **Troubleshooting**

### **Issue: "Cannot access admin interface"**

**Solution:**
1. Make sure the development server is running: `npm run dev`
2. Wait for the message "✓ Ready in X.Xs" before accessing the admin
3. Use the correct URL: http://localhost:3000/admin/index.html

### **Issue: "GraphQL API not responding"**

**Solution:**
1. Check that port 4001 is not being used by another application
2. Restart the development server: Stop with `Ctrl+C`, then run `npm run dev` again
3. Verify the API is running: http://localhost:4001/graphql

### **Issue: "Changes not appearing on the website"**

**Solution:**
1. After editing in Tina CMS, save your changes
2. Refresh the website preview at http://localhost:3000
3. For production, you need to deploy: `npm run build` then deploy to Netlify

### **Issue: "Authentication errors in production"**

**Solution:**
1. Production admin requires Tina Cloud authentication
2. For local editing, always use the local development server
3. Ensure Netlify environment variables are set correctly

---

## 📦 **Deployment Workflow**

### **After Making Changes in Tina CMS:**

1. **Save your changes** in the Tina CMS admin interface
2. **Commit to Git**:
   ```bash
   git add .
   git commit -m "Update content via Tina CMS"
   git push origin main
   ```
3. **Build and deploy**:
   ```bash
   npm run build
   npx netlify deploy --prod --dir=out
   ```

---

## 📚 **Useful Commands**

```bash
# Start development server with Tina CMS
npm run dev

# Build for production
npm run build

# Build with Tina CMS regeneration
npm run build:tina

# Deploy to Netlify production
npx netlify deploy --prod --dir=out

# Check TypeScript types
npm run type-check

# Optimize images
npm run optimize:images
```

---

## 🎯 **Quick Start Checklist**

- [x] ✅ Tina CMS is installed and configured
- [x] ✅ Environment variables are set in `.env.local`
- [x] ✅ Admin folder exists in `public/admin/`
- [x] ✅ Development server script is configured
- [x] ✅ GraphQL API is accessible
- [x] ✅ Admin interface is accessible locally
- [x] ✅ Production deployment is configured

---

## 📞 **Support Resources**

- **Tina CMS Documentation**: https://tina.io/docs/
- **Next.js Documentation**: https://nextjs.org/docs
- **Project Repository**: https://github.com/thepetersonlegacy/atikis-catering-cms

---

## 🎉 **You're All Set!**

Your Tina CMS admin interface is now accessible and ready to use. Simply run `npm run dev` and navigate to http://localhost:3000/admin/index.html to start editing your website content!

**Happy editing! 🚀**


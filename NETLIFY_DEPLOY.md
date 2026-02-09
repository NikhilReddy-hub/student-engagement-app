# 🚀 Netlify Deployment Guide

## ⚠️ Important Note

**Netlify has limited support for Next.js App Router with API routes.** For best results with this app, Vercel is recommended. However, if you prefer Netlify, follow these steps:

---

## 📋 Deployment Steps

### 1. Sign Up/Login to Netlify

1. Go to **[netlify.com](https://www.netlify.com)**
2. Click **"Sign up"** and use your GitHub account

---

### 2. Deploy Your Site

#### Option A: Via Netlify Dashboard (Recommended)

1. **Import from Git**
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **"Deploy with GitHub"**
   - Authorize Netlify to access your GitHub
   - Select your `Student-engagement-app-` repository

2. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Base directory**: (leave empty)

3. **Add Environment Variables**
   Click **"Add environment variables"** and add these 3:

   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | `mongodb+srv://studentapp:12345678%401@cluster0.ksdsi2r.mongodb.net/student_engagement_db?retryWrites=true&w=majority` |
   | `JWT_SECRET` | `ec2a837f5a8192e83a049bd684aa0229e270aa4bf2476d2d4d2084a` |
   | `NODE_ENV` | `production` |

4. **Deploy**
   - Click **"Deploy"**
   - Wait 3-5 minutes for build to complete

---

#### Option B: Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize and deploy
netlify init

# Follow the prompts:
# - Create & configure a new site
# - Choose your team
# - Site name: student-engagement-app
# - Build command: npm run build
# - Publish directory: .next

# Add environment variables
netlify env:set DATABASE_URL "mongodb+srv://studentapp:12345678%401@cluster0.ksdsi2r.mongodb.net/student_engagement_db?retryWrites=true&w=majority"
netlify env:set JWT_SECRET "ec2a837f5a8192e83a049bd684aa0229e270aa4bf2476d2d4d2084a"
netlify env:set NODE_ENV "production"

# Deploy
netlify deploy --prod
```

---

### 3. Install Next.js Plugin (Required!)

After your first deployment:

1. Go to your site dashboard on Netlify
2. Click **"Plugins"** in the top menu
3. Search for **"Next.js Runtime"** or **"Essential Next.js"**
4. Click **"Install"**
5. Trigger a new deploy (Site overview → Deploys → Trigger deploy)

**This plugin is essential for Next.js API routes to work on Netlify!**

---

## ✅ Post-Deployment

### Your Live URL
You'll get a URL like: `https://student-engagement-app.netlify.app`

### Test Your App
- [ ] User registration
- [ ] Login functionality
- [ ] Create projects
- [ ] Add tasks
- [ ] Submit feedback
- [ ] Dashboard displays data

---

## 🔧 Troubleshooting

### API Routes Not Working
**Problem**: API routes return 404 or don't work
**Solution**: 
1. Ensure **Next.js plugin** is installed
2. Check build logs for errors
3. Verify `netlify.toml` is in repository root

### Database Connection Fails
**Problem**: Can't connect to MongoDB
**Solution**:
1. Verify environment variables are set correctly
2. Check MongoDB Atlas Network Access (0.0.0.0/0)
3. Ensure password is URL-encoded (`%401` for `@`)

### Build Failures
**Problem**: Build fails on Netlify
**Solution**:
1. Check build logs in Netlify dashboard
2. Ensure Node version is 18+ (set in netlify.toml)
3. Run `npm run build` locally first to catch errors

---

## 🎯 Alternative: Vercel (Recommended)

If you encounter issues with Netlify, **Vercel is the recommended platform** for Next.js apps because:
- ✅ Built by the creators of Next.js
- ✅ Zero-config deployment for Next.js
- ✅ Perfect support for App Router and API routes
- ✅ Better performance for Next.js apps
- ✅ Free tier is very generous

**Deploy to Vercel instead**: See `DEPLOYMENT.md` for Vercel instructions.

---

## 📞 Support

- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Next.js on Netlify**: [docs.netlify.com/frameworks/next-js](https://docs.netlify.com/frameworks/next-js)
- **Netlify Community**: [answers.netlify.com](https://answers.netlify.com)

---

Good luck with your deployment! 🚀

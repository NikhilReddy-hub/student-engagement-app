# Quick Deployment Fix Guide

## 🚨 Immediate Action Required

Your app is failing because the **database is not configured**. Follow these steps:

## Step 1: Set Up Database (5 minutes)

**Easiest Option - Vercel Postgres:**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Storage** tab → **Create Database** → **Postgres**
4. Copy the `DATABASE_URL` shown

**Alternative - Neon (Free):**
1. Sign up at [neon.tech](https://neon.tech)
2. Create project → Copy connection string

## Step 2: Generate JWT Secret (30 seconds)

Run in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output.

## Step 3: Add Environment Variables to Vercel (2 minutes)

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add these variables (select **all environments**):

```
DATABASE_URL = [paste your database URL from Step 1]
JWT_SECRET = [paste the secret from Step 2]
NODE_ENV = production
```

## Step 4: Redeploy (1 minute)

1. Go to **Deployments** tab
2. Click the **⋯** menu on latest deployment → **Redeploy**

**OR** push a new commit:
```bash
git add .
git commit -m "Fix deployment configuration"
git push
```

## Step 5: Test

Visit: `https://your-app.vercel.app/signup`

Try creating an account. It should work now! ✅

---

## Still Having Issues?

Check the detailed guide: [DEPLOYMENT.md](./DEPLOYMENT.md)

### Common Errors:

**"Can't reach database"**
- Verify `DATABASE_URL` is correct
- Add `?sslmode=require` to the end of your database URL

**"Prisma Client not found"**
- Redeploy the app (Vercel will regenerate Prisma client)

**Still 500 error?**
- Check Vercel logs: Project → Deployments → Click deployment → Functions tab
- Look for specific error messages
